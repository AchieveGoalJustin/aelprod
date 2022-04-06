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

  console.log('CourseVideoList')
  console.log(courseVideoList)
  console.log('CourseVideoList.videoContent')
  console.log(courseVideoList.list.videoContent)


  const handleLeft = () => {
    setCurrentVideo(courseVideoList.list.videoContent[parseInt(currentVideo.day) - 2]);
  };

  const handleRight = () => {
    setCurrentVideo(courseVideoList.list.videoContent[parseInt(currentVideo.day)]);
  };

  console.log(`${process.env.NEXT_PUBLIC_EK3_ROOT}/EK3TN/EK3TN-${video.day}.png`)
  return (
    <Flex w={"100%"}>
      <Flex justifyContent={"space-around"}>
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {video.day !== "1" ? (
            <IconButton onClick={handleLeft} icon={<ArrowLeftIcon />} />
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
            <IconButton onClick={handleRight} icon={<ArrowRightIcon />} />
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoScroller;
