import { Server } from "socket.io";

const io = new Server(8000, { cors: true });

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", (socket) => {
  console.log("Socket Connected. 🚀", socket.id);

  socket.on("meeting:join", (data) => {
    emailToSocketId.set(data.email, socket.id);
    socketIdToEmail.set(socket.id, data.email);
    io.to(data.meetingId).emit("user-joined", data);
    socket.join(data.meetingId);
    io.to(socket.id).emit("meeting:join", data);
  });
});
