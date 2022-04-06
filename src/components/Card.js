import React from "react";
import { VStack, Divider, Text, Image, Container, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useContext } from "react";
import CourseContext from "../context/CourseContext";
import VideoContext from "../context/VideoContext";

const Card = (props) => {
  const { setCurrentCourse, courseList, setViewMode } =
    useContext(CourseContext);

  const { setCourseVideoList, videoList } = useContext(VideoContext);

  const comparator = (first, second) => {
    return first === second;
  };

  const clickHandler = (target) => {
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
  };

  return (
    <Box
      onClick={() => {
        clickHandler(props.course);
      }}
      as="button"
      background={props.themecolor + ".100"}
      boxShadow="md"
      maxWidth="30ch"
      p={5}
      m={5}
      borderRadius="md"
      _hover={{
        background: props.themecolor + ".200",
        color: "gray.700",
        cursor: "pointer",
        transform: "scale(1.03)",
      }}
    >
      <VStack>
        <Image
          borderRadius="md"
          src={`${process.env.NEXT_PUBLIC_BRANDING_ROOT}/course-thumbnails/${props.imgname}`}
        />
        <Text fontSize="xl" fontWeight="bold">
          {props.titletext}
        </Text>
        <Divider borderColor={props.themecolor + ".600"} />
        <Text>
          {props.text
            ? props.text
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nunc ligula, volutpat at bibendum sed, scelerisque vitae nibh. Pellentesque congue ligula rutrum nisl semper venenatis. Fusce eget faucibus libero. Etiam"}
        </Text>
      </VStack>
    </Box>
  );
};

export default Card;
