import { createContext, useState } from "react";

const VideoContext = createContext();

const videoContextInit = {
  currentVideo: { error: "No video" },
  videoList: { error: "No video list" },
  courseVideoList: { error: "No course video list" },
};

export const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState({ error: "No video" });
  const [videoList, setVideoList] = useState({ error: "No video list" });
  const [courseVideoList, setCourseVideoList] = useState({
    error: "No course video list",
  });

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        setCurrentVideo,
        videoList,
        setVideoList,
        courseVideoList,
        setCourseVideoList,
        videoContextInit,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
