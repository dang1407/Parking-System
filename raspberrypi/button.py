# Rui Santos & Sara Santos - Random Nerd Tutorials
# Complete project details at https://RandomNerdTutorials.com/raspberry-pi-picamera2-python/
 
from picamera2 import Picamera2, Preview
import RPi.GPIO as GPIO
import time
import requests

url = "http://192.168.149.36:5000/predict_license_plate"
picam2 = Picamera2()

camera_config = picam2.create_preview_configuration()
picam2.configure(camera_config)
# Thiết lập chế độ GPIO
GPIO.setmode(GPIO.BCM)

# Định nghĩa chân 23 là chân đầu vào
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
    while True:
        # Đọc trạng thái của nút bấm
        button_state = GPIO.input(23)
        
        # Nếu nút bấm được nhấn (trạng thái là 0)
        if button_state == 0:
            print("Nút bấm đã được nhấn!")
            picam2.start()
            time.sleep(2)
            picam2.capture_file("test_photo.jpg")
            # Thực hiện các hành động khác khi nút bấm được nhấn
            # ...
            # Đường dẫn tới tệp ảnh cần gửi
            image_path = "./test_photo.jpg"

            # Đọc nội dung tệp ảnh thành bytes
            with open(image_path, "rb") as image_file:
                image_data = image_file.read()

            # Tạo dữ liệu đa phần (multipart/form-data) với tệp ảnh
            files = {"image": ("image.jpg", image_data, "image/jpeg")}

            # Gửi yêu cầu HTTP POST với dữ liệu đa phần
            response = requests.post(url, files=files)

            # Xử lý phản hồi từ máy chủ
            if response.status_code == 200:
                print("Yêu cầu thành công!")
                print("Kết quả:", response.text)
            else:
                print("Yêu cầu thất bại với mã lỗi:", response.status_code)
            
        time.sleep(0.1)  # Chờ một khoảng thời gian ngắn

except KeyboardInterrupt:
    # Làm sạch trạng thái GPIO khi thoát chương trình
    GPIO.cleanup()


