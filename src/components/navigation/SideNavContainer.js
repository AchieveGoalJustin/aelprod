import React, { useContext } from "react";

import CourseContext from "../../context/CourseContext";

import { Flex } from "@chakra-ui/react";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";

import SideNavBox from "./SideNavBox";
import course from "../../data/tests/eiken/ek2/coursedata";

const SideNavContainer = () => {
  const { courseList } = useContext(CourseContext);

  const extractCourseNames = (courseList) => {
    const response = courseList.map(
      (course) => course[Object.keys(course)[0]].courseTest
    );
    return response;
  };

  // const extractTests = (content) => {
  //   const testArray = content.courses.map((course) => {
  //     return course.test;
  //   });
  //   const consolidated = [...new Set(testArray)];
  //   const response = consolidated.map((test, i) => {
  //     return { key: i, text: test };
  //   });
  //   return response;
  // };

  const courseLinks = extractCourseNames(courseList);
  // const testLinks = extractTests(content);
  const testLinks = [{ text: "英検" }];

  const boxData = [
    {
      type: "test",
      key: "2",
      title: "テスト一覧",
      icon: EditIcon,
      links: testLinks,
    },
    {
      type: "course",
      key: "3",
      title: "コース一覧",
      icon: CopyIcon,
      links: courseLinks,
    },
  ];

  return (
    <Flex flexDir="row" justifyContent={"center"} px={5}>
      <Flex flexDir="column">
        {boxData.map((box) => (
          <SideNavBox key={box.key} box={box} tests={testLinks} />
        ))}
      </Flex>
    </Flex>
  );
};

export default SideNavContainer;
