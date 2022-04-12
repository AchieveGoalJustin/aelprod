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

export default VideoPlayer;
