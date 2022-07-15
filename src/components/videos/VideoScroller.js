import React, { useContext, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

import VideoContext from "../../context/VideoContext";

import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const VideoScroller = () => {
  const { currentVideo, courseVideoList, setCurrentVideo } =
    useContext(VideoContext);

  const videoList =
    courseVideoList[Object.keys(courseVideoList)[0]].videoContent;
  const video = currentVideo;

  const handleLeft = () => {
    setCurrentVideo(videoList[parseInt(currentVideo.day) - 2]);
  };

  const handleRight = () => {
    setCurrentVideo(videoList[parseInt(currentVideo.day)]);
  };

  useEffect(() => {
    console.log(
      `${process.env.NEXT_PUBLIC_EK3_ROOT}${
        courseVideoList[Object.keys(courseVideoList)[0]].slug
      }/${courseVideoList[Object.keys(courseVideoList)[0]].testid}D${
        video.day
      }.mp4`
    );
  });

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
            videoUrl={`${process.env.NEXT_PUBLIC_EK3_ROOT}${
              courseVideoList[Object.keys(courseVideoList)[0]].slug
            }/${courseVideoList[Object.keys(courseVideoList)[0]].testid}D${
              video.day
            }.mp4`}
            videoTnUrl={`${process.env.NEXT_PUBLIC_EK3_ROOT}${
              courseVideoList[Object.keys(courseVideoList)[0]].tnslug
            }${video.day}.png`}
          />
        </Flex>

        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {parseInt(video.day) < videoList.length ? (
            <Flex flexDir={"column"} m={3}>
              <Text fontWeight={"extrabold"} color="blue.600">{`Day ${
                parseInt(video.day) + 1
              } へ`}</Text>
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
