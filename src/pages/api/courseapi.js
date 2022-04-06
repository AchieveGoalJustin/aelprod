import { courses } from "../../data/coursedata";

export default function handler(req, res) {
    if (req.method === "GET") {
        console.log('API course response from API: ' + JSON.stringify(courses))
        res.status(200).json(courses);
    }
}
