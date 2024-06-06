<template>
  <div>
    <h1>WebSocket Time</h1>
    <p>{{ currentTime }}</p>
    <img :src="imageURL" alt="" />
    <button type="button" @click="sendDataToServer('deleteimage')">
      Delete image
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentTime = ref("");
const imageURL = ref("");
let socket = null;

onMounted(() => {
  // Kết nối với WebSocket server
  socket = new WebSocket("ws://localhost:8765");

  // Xử lý sự kiện khi nhận dữ liệu từ server
  socket.addEventListener("message", (event) => {
    const blob = new Blob([event.data]);

    // Tạo URL cho Blob
    const url = window.URL.createObjectURL(blob);
    currentTime.value = url;
    imageURL.value = url;
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
