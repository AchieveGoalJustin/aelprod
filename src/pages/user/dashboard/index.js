//React
import React from "react";
import { useContext, useEffect, useState } from "react";

//Next
import Head from "next/head";

//Chakra
import { Flex, Heading, Spinner } from "@chakra-ui/react";

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

const userDashboard = ({ perm, username }) => {
  //Data

  //Parsing data to be consumed by context
  const fullData = datacollator();

  // console.log(fullData);

  const permArray = Array.from(perm);

  const parsedCourseList = dataParser.parseCourseList(permArray, fullData);
  const parsedVideoList = dataParser.parseVideoList(permArray, fullData);

  //Context
  const { VIEWMODES, viewMode, setViewmode } = useContext(CourseContext);

  const { setCurrentCourse, setCourseList, currentCourse, courseList } =
    useContext(CourseContext);

  const { isLogged, setIsLogged } = useContext(SessionContext);

  const {
    setCurrentVideo,
    setVideoList,
    setCourseVideoList,
    currentVideo,
    videoList,
    courseVideoList,
  } = useContext(VideoContext);

  //State
  const [loaded, setLoaded] = useState(false);

  // On Render
  useEffect(() => {
    if (!isLogged) {
      courseList.error && setCourseList(parsedCourseList);
      currentCourse.error && setCurrentCourse(parsedCourseList[0]);
      videoList.error && setVideoList(parsedVideoList);
      courseVideoList.error && setCourseVideoList(parsedVideoList[0]);
      const m = Object.keys(parsedVideoList[0]);
      currentVideo.error &&
        setCurrentVideo(parsedVideoList[0][m[0]].videoContent[0]);
      setLoaded(true);
      setIsLogged(true);
      console.log("Logged in", isLogged);
    }
  }, []);

  try {
    return (
      <>
        <Head>
          <title>AEL - レッスン選択</title>
        </Head>
        {loaded && isLogged ? (
          <Flex flexDir={"column"} height={"100vh"}>
            <Navbar perms={perm} username={username} />
            {currentCourse ? (
              <ContentSegment grow={1} basis="auto">
                {viewMode === "video" ? (
                  <VideoDescriptionBox />
                ) : (
                  <>
                    <CourseDescriptionBox />
                    <VideoDashboard />
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
          </Flex>
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
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
