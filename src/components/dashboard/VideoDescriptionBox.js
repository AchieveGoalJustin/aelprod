import React from "react";

import VideoContext from "../../context/VideoContext";

import VideoScroller from "../videos/VideoScroller";

import { useContext } from "react";

import { Flex, Heading } from "@chakra-ui/react";
import PlayerScaffold from "../audio/PlayerScaffold";

const VideoDescriptionBox = () => {
  const { currentVideo, courseVideoList } = useContext(VideoContext);
  const courseData = courseVideoList[Object.keys(courseVideoList)[0]].testid;
  console.log("VC audio");
  console.log(currentVideo.listening);

  return (
    <Flex p={5} w="100%" justifyContent={"space-around"}>
      <Flex>
        <Flex flexDir="column" w="100%">
          <Heading size="2xl" my={5}>
            Day {currentVideo.day} - {currentVideo.title}
          </Heading>
          <VideoScroller />
          {currentVideo.listening && (
            <PlayerScaffold
              courseData={courseData}
              videoData={currentVideo}
              audioData={currentVideo.listening}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoDescriptionBox;
