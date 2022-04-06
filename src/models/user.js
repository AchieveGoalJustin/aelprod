const mongoose = require("mongoose");

//create new schema
const UserSchema = new mongoose.Schema(
  {
    account: String,
    id: String,
    username: {
      type: String,
      required: [true, "name field is required"],
    },
    courses: {
      type: Array,
    },
    password: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

