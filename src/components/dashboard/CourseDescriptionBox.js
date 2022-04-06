import React from "react";
import InfoBox from "./InfoBox";

import CourseContext from "../../context/CourseContext";

import { useContext, useEffect } from "react";

import {
  Image,
  Text,
  Heading,
  Box,
  Divider,
  Flex,
  VStack,
  Icon,
} from "@chakra-ui/react";

import { InfoOutlineIcon } from "@chakra-ui/icons";

const CourseDescriptionBox = ({ content }) => {
  const { currentCourse, courseList } = useContext(CourseContext);

  const course = currentCourse;

  return (
    <Box p={5}>
      <Flex flexDir="column">
        <Flex>
          <Box>
            <Heading color="red.500" size="3xl" mb={3}>
              {course.coursename}
            </Heading>
            <Text fontSize="xl" pt={2} mx={"auto"} as={"i"}>
              {course.courseSub}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Divider my={3} />
      <Flex>
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
      <Divider my={5} />
    </Box>
  );
};

export default CourseDescriptionBox;
