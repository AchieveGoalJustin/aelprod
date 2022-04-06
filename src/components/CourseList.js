import React from "react";
import { useContext } from "react";
import CourseContext from "../context/CourseContext";

import { Flex, Heading, Divider } from "@chakra-ui/react";

import Card from "../components/Card";

const CourseList = ({ courses }) => {
  return (
    <>
      <Heading size={"2xl"} color="red.500">
        コースの一覧
      </Heading>
      <Divider my={3} />
      <Flex>
        {courses.map((course) => {
          return (
            <Card
              course={course.courseTest}
              key={course.id}
              titletext={course.coursename}
              imgname={course.tnurl}
              themecolor={course.theme}
              text={course.courseShortDesc}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default CourseList;
