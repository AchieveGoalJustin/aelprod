import React from "react";
import InfoBox from "./InfoBox";

import CourseContext from "../../context/CourseContext";

import { useContext } from "react";

import { Text, Heading, Box, Divider, Flex } from "@chakra-ui/react";

import { InfoOutlineIcon } from "@chakra-ui/icons";

const TestDescriptionBox = ({ content }) => {
    
  const { currentCourse } = useContext(CourseContext);

  const getCourse = (content, currentCourse) => {
    return content.courses.filter(
      (course) => course.courseTest === currentCourse
    );
  };

  const course = getCourse(content, currentCourse);

  return (
    <Box p={5}>
      <Flex flexDir="column">
        <Flex>
          <Box>
            <Heading color="red.500" size="3xl" mb={3}>
              {course[0].testNameFull}
            </Heading>
          </Box>
        </Flex>
      </Flex>
      <Divider mt={5} mb={3} />
      <Flex alignItems={"center"}>
        <InfoOutlineIcon h={8} w={8} me={3} color="blue.600" />
        <Text fontWeight="bold" fontSize={"3xl"} color="blue.600">
          テスト詳細
        </Text>
      </Flex>
      {test[0].longDesc.map((para) => (
        <Text fontSize={"xl"} my={3}>
          {para}
        </Text>
      ))}
      <Divider my={5} />
    </Box>
  );
};

export default TestDescriptionBox;
