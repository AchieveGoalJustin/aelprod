//React
import React from "react";
import { useContext, useEffect } from "react";

//Next
import Head from "next/head";

//Chakra
import { Flex, Heading } from "@chakra-ui/react";

//Context
import CourseContext from "../../../context/CourseContext";
import VideoContext from "../../../context/VideoContext";
import SessionContext from "../../../context/SessionContext";

//Utils
import datacollator from "../../../utils/datacollator";
import dataParser from "../../../utils/parseCourseData";
// import parseCourses from "../../../utils/parseCourses";    **deprecated**
import jwt from "jsonwebtoken";

//HOC
import { requireAuthentication } from "../../../components/HOC/ProtectPath";

//Components
import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/structure/Footer";
import VideoDashboard from "../../../components/videos/VideoDashboard";
import VideoDescriptionBox from "../../../components/dashboard/VideoDescriptionBox";
import ContentSegment from "../../../components/structure/ContentSegment";
import CourseDescriptionBox from "../../../components/dashboard/CourseDescriptionBox";

// import { courses } from "../../../data/coursedata";    **deprecated**
// import { ekj2 } from "../../../data/videodata/ekj2";
// import { ek2 } from "../../../data/videodata/ek2";
// import { ek3 } from "../../../data/videodata/ek3";

const userDashboard = ({ perm, username }) => {
  //Data
  // const videoData = [ek3, ekj2, ek2]; **deprecated**

  // const fullVideoList = [
  //   {
  //     title: "英検3級",
  //     list: ek3,
  //   },
  //   {
  //     title: "英検2級",
  //     list: ek2,
  //   },
  //   {
  //     title: "英検準2級",
  //     list: ekj2,
  //   },
  // ];

  //Parsing data to be consumed by context
  const fullData = datacollator();

  const permArray = Array.from(perm);
  const videoList = dataParser.parseVideoList(permArray, fullData);
  const courseList = dataParser.parseCourseList(permArray, fullData);
  console.log(videoList);
  console.log(courseList);

  // const content = {     **deprecated**
  //   courses: parsed.courses,
  //   tests: parsed.tests,
  // };

  //Context
  const { VIEWMODES, viewMode, setViewmode } = useContext(SessionContext);

  const { setCurrentCourse, setCourseList } = useContext(CourseContext);

  const { setCurrentVideo, setVideoList, setCourseVideoList } =
    useContext(VideoContext);

  //On Render
  // useEffect(() => {
  //   setCourseList(courses);
  //   setCurrentCourse(courses[0]);
  //   setVideoList(fullVideoList);
  //   setCourseVideoList(fullVideoList[0]);
  //   setCurrentVideo(fullVideoList[0].list[0]);
  // }, []);

  try {
    return (
      <>
        <Heading>Hello There</Heading>
        {/* <Head>
          <title>AEL - レッスン選択</title>
        </Head>
        <Flex flexDir={"column"} height={"100vh"}>
          <Navbar perms={perm} username={username} />
          {courses ? (
            <ContentSegment grow={1} basis="auto" content={content}>
              {viewMode === "video" ? (
                <VideoDescriptionBox />
              ) : (
                <>
                  <CourseDescriptionBox content={content} />
                  <VideoDashboard content={content} videos={videoData[0]} />
                </>
              )}
            </ContentSegment>
          ) : (
            <ContentSegment>
              <Heading>
                申し訳ございません。閲覧出来るコースはないようです。
              </Heading>
            </ContentSegment>
          )}
          <Footer />
        </Flex> */}
      </>
    );
  } catch (err) {
    return <Flex>{err}</Flex>;
  }
};

export const getServerSideProps = requireAuthentication(async (context) => {
  const user = context.req.cookies.AELJWT;
  let perm = [];
  let username = "";
  if (user) {
    const decUser = jwt.decode(user);
    if (decUser.courses.length > 0) {
      perm = decUser.courses;
      username = decUser.username;
    } else {
      perm = "No available courses";
    }
  }
  return {
    props: {
      username: username,
      perm: perm,
    },
  };
});

export default userDashboard;
