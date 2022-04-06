const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  id: String,
  courseAbr: String,
});

module.exports =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
