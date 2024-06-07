<template>
  <div>
    <h1>WebSocket Time</h1>
    <p>{{ currentTime }}</p>
    <img :src="imageURL" alt="" />
    <button type="button" @click="sendDataToServer('deleteimage')">
      Delete image
    </button>
    <div>{{ licensePlate }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentTime = ref("");
const imageURL = ref("");
const licensePlate = ref("");
let socket = null;

onMounted(() => {
  // Kết nối với WebSocket server
  socket = new WebSocket("ws://localhost:8765");

  // Xử lý sự kiện khi nhận dữ liệu từ server
  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      const { image_data, license_plate } = data;
      const binaryData = atob(image_data); // Giải mã chuỗi base64 thành dữ liệu nhị phân
      const bytes = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "image/jpeg" }); // Tạo một đối tượng Blob từ dữ liệu nhị phân
      const imageUrlBlob = URL.createObjectURL(blob);
      imageURL.value = imageUrlBlob;
      licensePlate.value = license_plate;
      // // Check if it's the image data
      // if (event.data instanceof Blob) {
      //   const licensePlateURL = window.URL.createObjectURL(event.data);
      //   imageURL.value = licensePlateURL;
      //   return; // Exit after handling image data
      // } else {
      //   // Otherwise, it's the license plate
      //   const licensePlateText = JSON.parse(event.data); // Parse license plate as JSON
      //   licensePlate.value = licensePlateText;
      // }
    } catch (error) {
      console.error("Error parsing server message:", error);
    }
  });
  socket.addEventListener("takephoto", (data) => {
    var imageUri = URL.createObjectURL(data.image);
    imageURL.value = imageUri;
  });
});

// Sự kiện gửi dữ liệu đến server
function sendDataToServer(data) {
  // Kiểm tra kết nối WebSocket
  if (socket.readyState === WebSocket.OPEN) {
    // Gửi dữ liệu đến server
    socket.send(data);
  } else {
    console.error("WebSocket không được kết nối!");
  }
}

onUnmounted(() => {
  // Đóng kết nối WebSocket khi component bị unmount
  if (socket) {
    socket.close();
  }
});
</script>
