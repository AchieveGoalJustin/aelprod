import React, { useContext } from "react";

import { Box, Heading, Divider, Flex } from "@chakra-ui/react";

import Card from "../cards/Card";

import CourseContext from "../../context/CourseContext";

const CourseList = () => {
  const { courseList } = useContext(CourseContext);

  return (
    <>
      <Heading size={"2xl"} color="red.500">
        コースの一覧
      </Heading>
      <Divider my={3} />
      <Box>
        <Flex flexWrap="wrap">
          {courseList.map((course) => {
            return (
              <Card
                course={course[Object.keys(course)[0]].courseTest}
                key={course[Object.keys(course)[0]].id}
                titletext={course[Object.keys(course)[0]].coursename}
                imgname={course[Object.keys(course)[0]].tnurl}
                themecolor={course[Object.keys(course)[0]].theme}
                text={course[Object.keys(course)[0]].courseShortDesc}
              />
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default CourseList;
