import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from PIL import Image
import cv2
import torch
import function.utils_rotate as utils_rotate
import argparse
import function.helper as helper
import os
import asyncio
import websockets
import random
import json
import base64
import threading
connected_clients = []
app = Flask(__name__)
CORS(app)
# Load the license plate detection and OCR models
yolo_LP_detect = torch.hub.load('yolov5', 'custom', path='model/LP_detector.pt', force_reload=True, source='local')
yolo_license_plate = torch.hub.load('yolov5', 'custom', path='model/LP_ocr.pt', force_reload=True, source='local')
yolo_license_plate.conf = 0.60

def recognize_license_plate(image):
    plates = yolo_LP_detect(image, size=640)
    list_plates = plates.pandas().xyxy[0].values.tolist()
    list_read_plates = set()

    if len(list_plates) == 0:
        lp = helper.read_plate(yolo_license_plate, image)
        if lp != "unknown":
            list_read_plates.add(lp)
            return lp
    else:
        for plate in list_plates:
            flag = 0
            x = int(plate[0])  # xmin
            y = int(plate[1])  # ymin
            w = int(plate[2] - plate[0])  # xmax - xmin
            h = int(plate[3] - plate[1])  # ymax - ymin
            crop_img = image[y:y+h, x:x+w]
            cv2.imwrite("crop.jpg", crop_img)
            rc_image = cv2.imread("crop.jpg")
            lp = ""
            for cc in range(0, 2):
                for ct in range(0, 2):
                    lp = helper.read_plate(yolo_license_plate, utils_rotate.deskew(crop_img, cc, ct))
                    if lp != "unknown":
                        list_read_plates.add(lp)
                        flag = 1
                        break
                if flag == 1:
                    break
    return list(list_read_plates)

@app.route('/predict_license_plate', methods=['POST'])
def predict_license_plate():
    try:
        print("Math route")
        # Get image data from the request
        image_data = request.files['image'].read()

        # Convert image data to OpenCV format
        nparr = np.fromstring(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        # Save the image to disk
        image_path = 'received_image.jpg'  # Đặt tên tệp ảnh theo ý muốn
        cv2.imwrite(image_path, image)
        # Perform license plate recognition
        result = recognize_license_plate(image)
        f = open("license_plate.txt", "w")
        if(len(result) > 0):
            f.write(str(result[0]))
        else:
            print("Khong thay bien so xe")
        f.close()
        # await send_image()
        # Return the result as JSON
        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/predict_license_plate/<id>', methods=['POST'])
def predict_license_plate_with_id(id):
    try:
        # Get image data from the request
        image_data = request.files['image'].read()

        # Convert image data to OpenCV format
        # nparr = np.fromstring(image_data, np.uint8)
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        # Save the image to disk
        image_path = f'received_image_{id}.jpg'  # Đặt tên tệp ảnh theo ý muốn
        cv2.imwrite(image_path, image)
        # Perform license plate recognition
        result = recognize_license_plate(image)
        f = open("license_plate.txt", "w")
        if(len(result) > 0):
            f.write(str(result[0]))
        else:
            print("Khong thay bien so xe")
        f.close()
        # Return the result as JSON
        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/', methods=['GET'])
def get_license_plate():
        return jsonify({'result': 'test'})


# Websocket để truyền tin
async def send_image(websocket, image_path, license_plate_path):
    while True:
        if os.path.exists(image_path):
            with open(image_path, "rb") as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')
            with open(license_plate_path, "rb") as license_plate_file:
                license_plate = license_plate_file.readline().decode('utf-8').strip()
            # await websocket.send(image_data)
            data = {
                'image_data' : image_data,
                'license_plate': license_plate
            }
            await websocket.send(json.dumps(data))
        # else:
        #     await websocket.send("Không có ảnh")
        await asyncio.sleep(random.random() * 2 + 1)

async def handle_message(websocket, image_path, license_plate_path):
    while True:
        message = await websocket.recv()
        print(message)
        if message == 'deleteimage':
            print(f"Nhận được từ client: {message}")
            if os.path.exists(image_path):
                os.remove(image_path)
                print("Đã xóa tệp tin ảnh thành công.")
            else:
                print("Tệp tin ảnh không tồn tại.")
        if message == 'update_parkslot':
            await broadcast_message("update_parkslot")
async def handle_websocket(websocket):
    try:
        connected_clients.append(websocket)  # Thêm kết nối mới vào danh sách
        image_path = "./received_image.jpg"
        license_plate_path = "./license_plate.txt"
        await asyncio.gather(
            send_image(websocket, image_path, license_plate_path),
            handle_message(websocket, image_path, license_plate_path)
        )
    except websockets.exceptions.ConnectionClosed:
        print("WebSocket connection closed")
        connected_clients.remove(websocket)  # Xóa kết nối khỏi danh sách

async def broadcast_message(message):
    for client in connected_clients:
        try:
            await client.send(message)
        except websockets.exceptions.ConnectionClosed:
            connected_clients.remove(client)
            print("WebSocket connection closed")

async def main():
    async with websockets.serve(handle_websocket, "localhost", 8765):
        print("Start websocker")
        await asyncio.Future()  # run forever

def start_websocket():
    asyncio.run(main())

if __name__ == '__main__':
    threading.Thread(target=start_websocket).start()
    app.run(host='0.0.0.0', port=5000, debug=True)




# app = Flask(__name__)
#
# @app.route('/predict_license_plate', methods=['POST'])
# def predict_license_plate():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part in the request'}), 400
#
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected for uploading'}), 400
#
#     filename = secure_filename(file.filename)
#     filepath = os.path.join('/path/to/save/uploads', filename)
#     file.save(filepath)
#
#     # Call your license plate prediction function here
#     # Replace `predict_license_plate_from_image` with your function
#     # Make sure your function takes in the image file path and returns the predicted license plate
#     predicted_license_plate = "hello"
#
#     return jsonify({'license_plate': predicted_license_plate})
#
# @app.route('/predict_license_plate', methods=['GET'])
# def get_license_plate():
#     # Call your license plate prediction function here
#     # Replace `predict_license_plate_from_image` with your function
#     # Make sure your function takes in the image file path and returns the predicted license plate
#     predicted_license_plate = "hello"
#
#     return jsonify({'license_plate': predicted_license_plate})
#
# if __name__ == '__main__':
#     app.run(host='localhost', port=5000)
#
