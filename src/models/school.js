const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  id: String,
  schoolName: String,
});

module.exports =
  mongoose.models.School || mongoose.model("School", SchoolSchema);
