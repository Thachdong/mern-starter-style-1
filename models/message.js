const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Owner is required",
  },
  room: mongoose.Schema.Types.ObjectId,
  ref: "ChatRoom",
  required: "Chatroom is required",
});

module.exports = mongoose.model("Message", MessageSchema);
