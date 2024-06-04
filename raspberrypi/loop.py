import RPi.GPIO as GPIO
import requests
from picamera2 import Picamera2
import time

# Thiết lập cách đọc các chân GPIO
GPIO.setmode(GPIO.BCM)

# Chân GPIO 18 được sử dụng làm đầu vào
GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# URL của server để gửi yêu cầu HTTP
url = 'http://your-server-url.com/upload'

# Khởi tạo camera
camera = Picamera2()

# Hàm xử lý khi có sự kiện nhấn nút
def button_callback(channel):
    print('Nút nhấn được nhấn!')
    
    # Chụp ảnh
    camera.capture('image.jpg')
    
    # Mở file ảnh và gửi yêu cầu HTTP
    with open('image.jpg', 'rb') as f:
        files = {'image': f}
        response = requests.post(url, files=files)
        print(response.status_code)

# Thêm sự kiện callback cho chân GPIO 18
GPIO.add_event_detect(18, GPIO.FALLING, callback=button_callback, bouncetime=300)

try:
    while True:
        # Chờ sự kiện nhấn nút
        time.sleep(0.1)
except KeyboardInterrupt:
    # Giải phóng GPIO khi thoát chương trình
    GPIO.cleanup()