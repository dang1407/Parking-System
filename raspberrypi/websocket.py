# #!/usr/bin/env python

# import asyncio
# import datetime
# import random
# import websockets
# import os
# # ... rest of your server code

# async def show_time(websocket, path):
#     try:
#         while True: 
#             image_path = "./1045-2.jpg"
#             # Đọc nội dung tệp ảnh thành bytes
#             if(os.path.exists(image_path)):
#                 with open(image_path, "rb") as image_file:
#                     image_data = image_file.read()
#                 await websocket.send(image_data)
#             else:
#                 await websocket.send("Không có ảnh")
#             async for message in websocket:
                
#                 # Xử lý dữ liệu nhận được từ client
#                 if message == 'deleteimage':
#                     print(f"Nhận được từ client: {message}")
#                     # os.remove("C:\\DATN\\Parking-System\\raspberrypi\\1045.jpg")
#                     # Thực hiện xử lý dữ liệu tại đây

            
#             await asyncio.sleep(random.random() * 2 + 1)
#     except websockets.exceptions.ConnectionClosed:
#         print("WebSocket connection closed")

# async def handle_websocket(websocket):
#     try:
#         while True:
#             image_path = "./1045-2.jpg"

#             if os.path.exists(image_path):
#                 with open(image_path, "rb") as image_file:
#                     image_data = image_file.read()
#                 await websocket.send(image_data)
#             else:
#                 await websocket.send("Không có ảnh")

#             message = await websocket.recv()

#             if message == 'deleteimage':
#                 print(f"Nhận được từ client: {message}")
#                 if os.path.exists(image_path):
#                     os.remove(image_path)
#                     print("Đã xóa tệp tin ảnh thành công.")
#                 else:
#                     print("Tệp tin ảnh không tồn tại.")

#             await asyncio.sleep(random.random() * 2 + 1)
#     except websockets.exceptions.ConnectionClosed:
#         print("WebSocket connection closed")

# async def main():
#     async with websockets.serve(handle_websocket, "localhost", 5678):
#         await asyncio.Future()  # run forever

# if __name__ == "__main__":
#     asyncio.run(main())

import os
import asyncio
import websockets
import random
import json
import base64

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
        if message == 'deleteimage':
            print(f"Nhận được từ client: {message}")
            if os.path.exists(image_path):
                os.remove(image_path)
                print("Đã xóa tệp tin ảnh thành công.")
            else:
                print("Tệp tin ảnh không tồn tại.")

async def handle_websocket(websocket):
    try:
        image_path = "./1045-2.jpg"
        license_plate_path = "./licenseplate.txt"
        await asyncio.gather(
            send_image(websocket, image_path, license_plate_path),
            handle_message(websocket, image_path, license_plate_path)
        )
    except websockets.exceptions.ConnectionClosed:
        print("WebSocket connection closed")

async def main():
    async with websockets.serve(handle_websocket, "localhost", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())