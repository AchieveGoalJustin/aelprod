const mongoose = require("mongoose");

console.log("Accessed school accounts");
const SchoolAccountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please enter a two-digit number"],
    },
    accountNo: String,
    schoolId: String,
    schoolName: String,
    permissions: Array,
    userNo: Number,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// export default Account;

module.exports =
  mongoose.models.Account || mongoose.model("Account", SchoolAccountSchema);
