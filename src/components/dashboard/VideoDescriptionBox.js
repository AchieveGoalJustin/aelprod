import React from "react";

import VideoContext from "../../context/VideoContext";

import VideoScroller from "../videos/VideoScroller";

import { useContext } from "react";

import { Flex, Heading, Box, Spacer, Divider } from "@chakra-ui/react";
import PlayerScaffold from "../audio/PlayerScaffold";

const VideoDescriptionBox = () => {
  const { currentVideo, courseVideoList } = useContext(VideoContext);
  const courseData = courseVideoList[Object.keys(courseVideoList)[0]].testid;

  return (
    <Flex p={5} w="100%" justifyContent={"space-around"}>
      <Flex>
        <Flex flexDir="column" w="100%" alignItems="center">
          <Heading size="2xl" my={5} p={7} boxShadow="lg" bg="blue.50">
            Day {currentVideo.day} - {currentVideo.title}
          </Heading>
          <VideoScroller />
          {currentVideo.listening && (
            <Box width={"100%"}>
              <Divider height="10px" p={3} />
              <Flex>
                <Spacer />
                <Heading mt={50} size={"2xl"} p={7} boxShadow="lg" bg="blue.50">
                  リスニング予習・復習
                </Heading>
                <Spacer />
              </Flex>
              <PlayerScaffold
                courseData={courseData}
                videoData={currentVideo}
                audioData={currentVideo.listening}
              />
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoDescriptionBox;
