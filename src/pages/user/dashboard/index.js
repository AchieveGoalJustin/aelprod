//React
import React from "react";
import { useContext, useEffect, useState } from "react";

//Next
import Head from "next/head";
import { useRouter } from "next/router";

//Chakra
import { Flex, Heading, Spinner, Spacer } from "@chakra-ui/react";

//Context
import CourseContext from "../../../context/CourseContext";
import VideoContext from "../../../context/VideoContext";
import SessionContext from "../../../context/SessionContext";

//Utils
import { handleLoginHistory } from "../../../utils/loginHistoryHandler";
import { parseVideoViewData } from "../../../utils/parseVideoViewData";
import datacollator from "../../../utils/datacollator";
import dataParser from "../../../utils/parseCourseData";
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

const userDashboard = ({ perm, username, currentUserId }) => {
  //Parsing data to be consumed by context
  const fullData = datacollator();

  const permArray = Array.from(perm);

  const parsedCourseList = dataParser.parseCourseList(permArray, fullData);
  const parsedVideoList = dataParser.parseVideoList(permArray, fullData);

  //Context
  const { VIEWMODES, viewMode, setViewmode } = useContext(CourseContext);

  const { setCurrentCourse, setCourseList, currentCourse, courseList } =
    useContext(CourseContext);

  const { isLogged, setIsLogged, setUserId } = useContext(SessionContext);

  const {
    setCurrentVideo,
    setVideoList,
    setCourseVideoList,
    currentVideo,
    videoList,
    courseVideoList,
  } = useContext(VideoContext);

  //Router
  const router = useRouter();

  //State
  const [loaded, setLoaded] = useState(false);

  // On Render
  useEffect(() => {
    setUserId(currentUserId);
    parseVideoViewData(fullData);
    if (!isLogged || !loaded) {
      courseList.error && setCourseList(parsedCourseList);
      currentCourse.error && setCurrentCourse(parsedCourseList[0]);
      videoList.error && setVideoList(parsedVideoList);
      courseVideoList.error && setCourseVideoList(parsedVideoList[0]);
      const m = Object.keys(parsedVideoList[0]);
      currentVideo.error &&
        setCurrentVideo(parsedVideoList[0][m[0]].videoContent[0]);
      setLoaded(true);
      setIsLogged(true);
      // router.events.on("routeChangeStart", () => {
      //   setLoaded(false)
      // });
    }
  }, []);

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
        <Flex flexDir="column" alignItems="center" w="100%" h="100vh">
          <Spacer />
          <Spinner
            m={"auto"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Spacer />
        </Flex>
      )}
    </>
  );
};

export const getServerSideProps = requireAuthentication(async (context) => {
  const user = context.req.cookies.AELJWT;
  let perm = [];
  let username = "";
  let currentUserId = "";
  if (user) {
    const decUser = jwt.decode(user);
    if (decUser.courses.length > 0) {
      perm = decUser.courses;
      username = decUser.username;
      currentUserId = decUser.id;
    } else {
      perm = "No available courses";
    }
  }

  return {
    props: {
      username: username,
      perm: perm,
      currentUserId: currentUserId,
    },
  };
});

export default userDashboard;
