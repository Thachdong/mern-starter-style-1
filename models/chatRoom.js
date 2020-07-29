const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: "RoomName is required",
  },
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
