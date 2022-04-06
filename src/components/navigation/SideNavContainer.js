import React from "react";

import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { CopyIcon, InfoIcon, EditIcon } from "@chakra-ui/icons";

import SideNavBox from "./SideNavBox";

const SideNavContainer = ({ content }) => {
  const extractCourseNames = (content) => {
    const response = content.courses.map((course, i) => {
      return { key: i, text: course.courseTest };
    });
    return response;
  };

  const extractTests = (content) => {
    const testArray = content.courses.map((course) => {
      return course.test;
    });
    const consolidated = [...new Set(testArray)];
    const response = consolidated.map((test, i) => {
      return { key: i, text: test };
    });
    return response;
  };

  const courseLinks = extractCourseNames(content);
  const testLinks = extractTests(content);

  const boxData = [
    // {
    //   key: "1",
    //   title: "プロフィール",
    //   icon: InfoIcon,
    //   links: [
    //     { key: "1", text: "アカウント情報", link: "#" },
    //     { key: "2", text: "アカウント設定", link: "#" },
    //   ],
    // },
    {
      key: "2",
      title: "テスト一覧",
      icon: EditIcon,
      links: testLinks,
    },
    {
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
