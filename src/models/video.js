const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  id: String,
  videoAbr: String,
  videoName: String,
  videoShortDesc: String,
  videoLongDesc: String,
});

module.exports = mongoose.models.Video || mongoose.model("Video", VideoSchema);
