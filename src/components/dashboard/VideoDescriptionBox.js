import React from "react";

import VideoContext from "../../context/VideoContext";

import VideoScroller from "./VideoScroller";

import { useContext } from "react";

import { Flex, Heading } from "@chakra-ui/react";

const VideoDescriptionBox = () => {
  const { currentVideo } = useContext(VideoContext);

  return (
    <Flex p={5} w="100%" justifyContent={"space-around"}>
      <Flex>
        <Flex flexDir="column" w="100%">
          <Heading size="2xl" my={5}>
            Day {currentVideo.day} - {currentVideo.title}
          </Heading>
          <VideoScroller />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoDescriptionBox;
