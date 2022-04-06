import { courses } from "../../../data/coursedata";

export default async function (req, res) {
  if (req.method === "GET") {
    console.log("courses API Accessed");
    res.status(200).json(courses);
  }
}
