const mongoose = require("mongoose");

import User from "../../../models/user";

mongoose.connect(process.env.MONGO_DB_LINK, () => {
  console.log("connected");
  (e) => console.log(e);
});

export default async function handler(req, res) {
  const account = req.query.usersByAccount;
  console.log(account);
  if (req.method === "GET")
    try {
      let userList = await User.find({ account: account });
      res.status(201).json({ success: true, data: userList });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    }
}
