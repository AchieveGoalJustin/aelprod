import { videos } from "../../data/videodata";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(videos);
  } else if (req.method === "POST") {
    const newVideo = {
      title: req.body.title,
      test: req.body.test,
      testid: req.body.testid,
      id: req.body.id,
      day: req.body.day,
      placeholder_url: req.body.placeholder_url,
    };
    console.log(newVideo.title);
    videos.push(newVideo);
    res.status(201).json(newVideo);
  }
}
