import { createContext, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState({ error: "No video" });
  const [videoList, setVideoList] = useState({});
  const [courseVideoList, setCourseVideoList] = useState({});

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        setCurrentVideo,
        videoList,
        setVideoList,
        courseVideoList,
        setCourseVideoList,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
