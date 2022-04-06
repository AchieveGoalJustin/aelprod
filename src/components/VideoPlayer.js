import React from "react";
import ReactPlayer from "react-player";
import { Flex } from "@chakra-ui/react";

const VideoPlayer = ({ videoUrl, videoTnUrl }) => {
  return (
    <Flex>
      <ReactPlayer
        config={{ file: { attributes: { controlsList: "nodownload" } } }}
        controls
        url={videoUrl}
        light={videoTnUrl}
        playing={true}
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      />
    </Flex>
  );
};

//"https://d2pcg0gydriblr.cloudfront.net/EK3/EK3TN/EK3TN-1.png"
export default VideoPlayer;
