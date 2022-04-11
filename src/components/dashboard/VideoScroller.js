import React, { useContext, useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer";

import VideoContext from "../../context/VideoContext";
import CourseContext from "../../context/CourseContext";

import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const VideoScroller = () => {
  const { currentCourse } = useContext(CourseContext);
  const { currentVideo, courseVideoList, setCurrentVideo } =
    useContext(VideoContext);

  const course = currentCourse;
  const video = currentVideo;

  const handleLeft = () => {
    setCurrentVideo(
      courseVideoList.list.videoContent[parseInt(currentVideo.day) - 2]
    );
  };

  const handleRight = () => {
    setCurrentVideo(
      courseVideoList.list.videoContent[parseInt(currentVideo.day)]
    );
  };

  return (
    <Flex w={"100%"}>
      <Flex justifyContent={"space-around"}>
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {video.day !== "1" ? (
            <Flex flexDir={"column"} m={3}>
              <Text fontWeight={"extrabold"} color="blue.600">{`Day ${
                parseInt(video.day) - 1
              }へ`}</Text>
              <IconButton onClick={handleLeft} icon={<ArrowLeftIcon />} />
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <VideoPlayer
            videoUrl={`${process.env.NEXT_PUBLIC_EK3_ROOT}/${course.abbr}/${course.abbr}D${video.day}.mp4`}
            videoTnUrl={`${process.env.NEXT_PUBLIC_EK3_ROOT}/EK3/EK3TN/EK3TN-${video.day}.png`}
          />
        </Flex>

        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {parseInt(video.day) < courseVideoList.list.videoContent.length ? (
            <Flex flexDir={"column"} m={3}>
              <Text fontWeight={"extrabold"} color="blue.600">{`Day ${
                parseInt(video.day) + 1
              }へ`}</Text>
              <IconButton onClick={handleRight} icon={<ArrowRightIcon />} />
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoScroller;
