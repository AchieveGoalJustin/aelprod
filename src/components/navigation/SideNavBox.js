import React from "react";

import { Box, Button, Text, Flex, Icon } from "@chakra-ui/react";
import { CopyIcon, InfoIcon } from "@chakra-ui/icons";

import { useContext } from "react";

import CourseContext from "../../context/CourseContext";
import VideoContext from "../../context/VideoContext";

const SideNavBox = ({ box, tests }) => {
  const content = box.links;

  const { currentCourse, setCurrentCourse, courseList, setViewMode } =
    useContext(CourseContext);

  const { setCourseVideoList, videoList } = useContext(VideoContext);

  const comparator = (first, second) => {
    return first === second;
  };

  const buttonHandler = (target) => {
    if (tests[0].text === target) {
      setViewMode("test");
    } else {
      setViewMode("course");
      const filteredCourses = courseList.filter((course) => {
        return comparator(course.courseTest, target);
      });
      const filteredVideos = videoList.filter((course) => {
        return comparator(course.title, target);
      });
      setCourseVideoList(filteredVideos[0]);
      setCurrentCourse(filteredCourses[0]);
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
      {content.map((item) => (
        <Button
          key={item.key}
          variant="ghost"
          colorScheme="blue"
          my={2}
          mx={2}
          _hover={
            currentCourse.courseTest === item.text && { cursor: "default" }
          }
          color={currentCourse.courseTest === item.text ? "white" : "#3182CE"}
          bgColor={currentCourse.courseTest === item.text ? "#3182CE" : "none"}
          onClick={() => buttonHandler(item.text)}
          outline={
            currentCourse.courseTest === item.text
              ? "3px solid #2B6CB0"
              : "none"
          }
        >
          {item.text}
        </Button>
      ))}
    </Flex>
  );
};

export default SideNavBox;
