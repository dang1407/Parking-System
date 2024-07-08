import os
import asyncio
import threading

import websockets
import random
import json
import base64
connected_clients = []
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
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
