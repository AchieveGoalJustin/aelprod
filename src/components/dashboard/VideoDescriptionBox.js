import React from "react";

import CourseContext from "../../context/CourseContext";
import VideoContext from "../../context/VideoContext";

import VideoPlayer from "../VideoPlayer";
import VideoScroller from "./VideoScroller";

import { useContext, useEffect } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

const VideoDescriptionBox = () => {
  const { currentCourse, courseList } = useContext(CourseContext);
  const { currentVideo } = useContext(VideoContext);

  console.log('Current video')
  console.log(currentVideo)
  return (
    <Flex p={5} w="100%">
      <Flex flexDir="column" w="100%">
        <Heading size="2xl" my={5}>

          Day {currentVideo.day} - {currentVideo.title}
        </Heading>
        <Flex w="100%">
          <VideoScroller />
        </Flex>
      </Flex>
      {/* <Divider my={3} /> */}
      {/* <Flex>
        <Box width="60%" my={5}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BRANDING_ROOT}/course-thumbnails/${course.tnurl}`}
          />
        </Box>
        <VStack height="100%" m="auto" spacing={5} maxW={"16vw"}>
          {course.infoBoxes.map((box, i) => (
            <InfoBox key={i} box={box} />
          ))}
        </VStack>
      </Flex>
      <Divider mt={5} mb={3} />
      <Flex alignItems={"center"}>
        <InfoOutlineIcon h={8} w={8} me={3} color="blue.600" />
        <Text fontWeight="bold" fontSize={"3xl"} color="blue.600">
          コース詳細
        </Text>
      </Flex>
      {course.courseLongDesc.map((para) => (
        <Text fontSize={"xl"} my={3}>
          {para}
        </Text>
      ))}
      <Divider my={5} /> */}
    </Flex>
  );
};

export default VideoDescriptionBox;
