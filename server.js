const WebSocket = require("ws");

// Tạo WebSocket server chạy ở port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log("🚀 WebRTC Signaling Server đang chạy tại ws://localhost:8080");

wss.on("connection", function connection(ws) {
  console.log("⚡ New client connected!");

  // Nhận message từ client
  ws.on("message", function incoming(message) {
    // Forward message tới tất cả client khác
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
