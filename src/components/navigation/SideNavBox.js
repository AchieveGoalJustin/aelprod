import React from "react";

import { Box, Button, Text, Flex, Icon } from "@chakra-ui/react";

import { useContext } from "react";

import CourseContext from "../../context/CourseContext";
import VideoContext from "../../context/VideoContext";

const SideNavBox = ({ box, tests }) => {
  const { currentCourse, setCurrentCourse, courseList, setViewMode, viewMode } =
    useContext(CourseContext);

  const { setCourseVideoList, videoList, courseVideoList } =
    useContext(VideoContext);

  //Destructure course for easier access in component
  const extractedCurrentCourse = currentCourse[Object.keys(currentCourse)[0]];

  const buttonHandler = (target) => {
    if (box.type === "test") {
      setViewMode("test");
    } else {
      setViewMode("course");
      const filteredCourses = courseList.filter((course) => {
        return course[Object.keys(course)[0]].courseTest === target;
      });
      setCurrentCourse(filteredCourses[0]);
      const filteredVideos = videoList.filter((videos) => {
        return videos[Object.keys(videos)[0]].test === target;
      });
      setCourseVideoList(filteredVideos[0]);
      setViewMode("course");
    }
  };

  return (
    <Flex
      flexDir={"column"}
      outline="4px solid"
      outlineColor={"blue.300"}
      borderRadius={"sm"}
      mt={"5vh"}
      width="100%"
      bgColor="white"
    >
      <Box bgColor="red.500" py={2} px={4}>
        <Flex alignContent={"center"} width={"100%"} justifyContent={"center"}>
          <Icon as={box.icon} me={2} w={7} h={7} color="white" />
          <Text fontSize="lg" fontWeight={"bold"} color="white">
            {box.title}
          </Text>
        </Flex>
      </Box>
      {box.links.map((item, i) => (
        <Button
          key={i}
          variant="ghost"
          colorScheme="blue"
          my={2}
          mx={2}
          _hover={
            extractedCurrentCourse.courseTest === item && {
              cursor: "default",
            }
          }
          color={
            extractedCurrentCourse.courseTest === item ? "white" : "#3182CE"
          }
          bgColor={
            extractedCurrentCourse.courseTest === item ? "#3182CE" : "none"
          }
          onClick={() => buttonHandler(item)}
          outline={
            extractedCurrentCourse.courseTest === item
              ? "3px solid #2B6CB0"
              : "none"
          }
        >
          {item.text ? item.text : item}
        </Button>
      ))}
    </Flex>
  );
};

export default SideNavBox;
