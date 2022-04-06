const mongoose = require("mongoose");

import School from "../../../models/school";

mongoose.connect(process.env.MONGO_DB_LINK, () => {
  console.log("connected");
  (e) => console.log(e);
});

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      School.find((error, data) => {
        if (error) {
          res.status(400).json({ success: false, error: error });
        } else {
          const response = data;
          res.status(200).json({ success: true, data: response });
        }
      });
      // await res.status(200).json({ success: true, data: "response" });
    } catch {
      // await res.status(400).json({ success: false, error: "error" });
      res.status(400).send("Something went wrong");
    }
  }

  if (req.method === "POST")
    try {
      // const school = new School({
      //   id: schoolId,
      //   schoolName: schoolName,
      // });
      // school.save();
      const school = School.create(req.body);
      res.status(201).json({ success: true, data: school });
    } catch {
      res.status(400).json({ success: false });
    }
}
