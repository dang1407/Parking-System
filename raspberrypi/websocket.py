# import asyncio
# import websockets
# import RPi.GPIO as GPIO

# # Thiết lập GPIO
# GPIO.setmode(GPIO.BCM)
# BUTTON_PIN = 23  # Số chân GPIO cho nút bấm
# GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# # Khởi tạo WebSocket server
# async def server(websocket, path):
#     async for message in websocket:
#         # Xử lý tin nhắn từ client (nếu cần)
#         pass

#     # Gửi ảnh và trạng thái nút bấm qua WebSocket
#     # cap = cv2.VideoCapture(0)  # Mở camera
#     while True:
#         ret, frame = cap.read()
#         if ret:
#             # Đường dẫn tới tệp ảnh cần gửi
#             image_path = "./3.jpg"

#             # Đọc nội dung tệp ảnh thành bytes
#             with open(image_path, "rb") as image_file:
#                 image_data = image_file.read()
#             button_state = GPIO.input(BUTTON_PIN)
#             await websocket.send((image_data.tobytes(), button_state))
#         await asyncio.sleep(0.033)  # Giới hạn tốc độ khung hình (30fps)

# start_server = websockets.serve(server, "0.0.0.0", 8765)

# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()


import asyncio
import socketio
import RPi.GPIO as GPIO
# import cv2

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

GPIO.setmode(GPIO.BCM)
BUTTON_PIN = 23
GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# cap = cv2.VideoCapture(0)

@sio.event
async def connect(sid, environ):
    print('Client connected:', sid)

@sio.on('disconnect')
def disconnect(sid):
    print('Client disconnected:', sid)

async def send_image_and_button_state():
    while True:
        ret, frame = cap.read()
        if ret:
            # image_data = cv2.imencode('.jpg', frame)[1].tobytes()
            button_state = GPIO.input(BUTTON_PIN)
            await sio.emit('image_and_button', (image_data, button_state))
        await asyncio.sleep(0.033)

if __name__ == '__main__':
    asyncio.create_task(send_image_and_button_state())
    socketio.run(app, host='0.0.0.0', port=8765)