const mongoose = require("mongoose");
import { nanoid } from "nanoid";
import generator from "generate-password";

import Account from "../../../models/schoolAccounts";
import User from "../../../models/user";

mongoose.connect(process.env.MONGO_DB_LINK, () => {
  console.log("connected");
  (e) => console.log(e);
});

const createInitialUsers = (account) => {
  try {
    for (let i = 0; i < parseInt(account.userNo); i++) {
      console.log("Creating user number", i);
      let appendNo = nanoid(4);
      let user = {
        account: account.id,
        id: `${account.id}-${appendNo}`,
        username: `${account.schoolName}-${appendNo}`,
        courses: account.permissions,
        password: generator.generate({ length: 8, numbers: true }),
      };
      User.create(user);
      console.log("User number " + i + " successfully created");
    }
  } catch (err) {
    console.log("error: user not created: " + err);
  }
};

export default async function handler(req, res) {
  if (req.method === "GET")
    try {
      console.log("Get method accessed");
      let accountList = await Account.find({});
      console.log("account list: " + accountList);
      res.status(201).json({ success: true, data: accountList });
    } catch {
      res.status(400).json({ success: false });
    }
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const account = Account.create(req.body);
      createInitialUsers(req.body);
      res.status(201).json({ success: true, data: account });
    } catch (err) {
      res.status(400).json({ success: false });
      console.log(err);
    }
  }
}
