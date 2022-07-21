import React from "react";
import { useContext } from "react";

import cookie from "js-cookie";

import { useRouter } from "next/router";

import { Button } from "@chakra-ui/react";

import SessionContext from "../../context/SessionContext";
import CourseContext from "../../context/CourseContext";
import VideoContext from "../../context/VideoContext";

const SignOutButton = () => {
  const { setIsLogged, setUserId } = useContext(SessionContext);
  const {
    setCurrentCourse,
    setCurrentTest,
    setCourseList,
    setViewMode,
    courseContextInit,
  } = useContext(CourseContext);
  const {
    setCurrentVideo,
    setVideoList,
    setCourseVideoList,
    videoContextInit,
  } = useContext(VideoContext);

  const reinitContext = () => {
    setUserId("");
    setCurrentCourse(courseContextInit.currentCourse);
    setCurrentTest(courseContextInit.currentTest);
    setCourseList(courseContextInit.courseList);
    setViewMode(courseContextInit.viewMode);

    setCurrentVideo(videoContextInit.currentVideo);
    setVideoList(videoContextInit.videoList);
    setCourseVideoList(videoContextInit.courseVideoList);
  };

  const router = useRouter();

  const handleLogout = async () => {
    reinitContext();
    setIsLogged(false);
    cookie.remove("AELJWT");
    cookie.set(
      "message",
      "ログアウトしました。今日もお疲れ様でした。引き続き頑張りましょう！"
    );
    router.replace("/");
  };

  return (
    <Button
      ms={3}
      colorScheme="red"
      variant="outline"
      fontWeight="bold"
      size="md"
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
};

export default SignOutButton;
