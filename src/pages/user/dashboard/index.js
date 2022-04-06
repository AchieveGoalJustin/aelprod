
//React
import React from "react";
import { useContext, useEffect } from "react";

//Next
import { useRouter } from "next/router";
import Head from "next/head";

//Chakra
import { Flex } from "@chakra-ui/react";


//Context
import CourseContext from "../../../context/CourseContext";
import VideoContext from "../../../context/VideoContext";

//Utils
import parseCourses from "../../../utils/parseCourses";
import getUser from "../../../utils/getUser";
import jwt from 'jsonwebtoken'

//HOC
import { requireAuthentication } from "../../../components/HOC/ProtectPath";

//Components
import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/structure/Footer";
import VideoDashboard from "../../../components/VideoDashboard";
import VideoDescriptionBox from "../../../components/dashboard/VideoDescriptionBox";
import ContentSegment from "../../../components/structure/ContentSegment";
import CourseDescriptionBox from "../../../components/dashboard/CourseDescriptionBox";

import { ekj2 } from "../../../data/videodata/ekj2";
import { ek2 } from "../../../data/videodata/ek2";
import { ek3 } from "../../../data/videodata/ek3";

const userDashboard = ({ perm, username }) => {
  //*******************************************************************************START DATA**************************************************************************** */

  const videoData = [ek3, ekj2, ek2]
  const courses = [
    {
      id: "1",
      test: "英検",
      abbr: "EK3",
      tnurl: "TestThumbnails-01.png",
      theme: "blue",
      coursename: "英検®3級絶対合格講座",
      courseSub: "予習必須！全問題形式に対応したコースで、絶対合格！",
      courseMetaTest: "英検",
      courseTest: "英検3級",
      videoNo: "24",
      courseShortDesc:
        "英検®3級は、英作文と二次面接試験が加わることで、最初の登竜門となります。全ての問題形式を、丁寧に解剖・解説します！",
      courseLongDesc: [
        "３級から試験内容は大きく変わります。",
        "３級から、「作文・面接」が追加に！英語が「理解できる」のは当たり前、英語を「作れる」ようにならないと合格できません。",
        "また、ひっかけ問題が当然のように出題されるので、「なぜ正解ではないのか」の理論的な理解が必須！全て丁寧に解説していきます。",
      ],
      courseSections: {
        sectionOne: "コースの紹介",
        sectionTwo: "筆記セクション",
        sectionThree: "リスニングセクション",
        sectionFour: "二次会面接セクション",
        sectionFive: "コースまとめ",
      },
      videoList: [
        { day: "1", title: "Day 1", link: "D1" },
        { day: "2", title: "Day 2", link: "D2" },
        { day: "3", title: "Day 3", link: "D3" },
        { day: "4", title: "Day 4", link: "D4" },
        { day: "5", title: "Day 5", link: "D5" },
        { day: "6", title: "Day 6", link: "D6" },
        { day: "7", title: "Day 7", link: "D7" },
        { day: "8", title: "Day 8", link: "D8" },
        { day: "9", title: "Day 9", link: "D9" },
        { day: "10", title: "Day 10", link: "D10" },
        { day: "11", title: "Day 11", link: "D11" },
        { day: "12", title: "Day 12", link: "D12" },
        { day: "13", title: "Day 13", link: "D13" },
        { day: "14", title: "Day 14", link: "D14" },
        { day: "15", title: "Day 15", link: "D15" },
        { day: "16", title: "Day 16", link: "D16" },
        { day: "17", title: "Day 17", link: "D17" },
        { day: "18", title: "Day 18", link: "D18" },
        { day: "19", title: "Day 19", link: "D19" },
        { day: "20", title: "Day 20", link: "D20" },
        { day: "21", title: "Day 21", link: "D21" },
        { day: "22", title: "Day 22", link: "D22" },
        { day: "23", title: "Day 23", link: "D23" },
        { day: "24", title: "Day 24", link: "D24" },
        { day: "25", title: "Day 25", link: "D25" },
      ],
      infoBoxes: [
        {
          text: "コースの特徴",
          items: [
            { icon: "check", text: "作文・二次面接も解説。" },
            { icon: "check", text: "ひっかけポイントも論理的に。" },
            { icon: "check", text: "勉強法も紹介！" },
          ],
        },
        {
          text: "コースの注意点",
          items: [
            { icon: "warning", text: "予習が必須です。" },
            { icon: "warning", text: "全24回です。" },
          ],
        },
      ],
    },
    {
      id: "2",
      test: "英検",
      abbr: "EKJ2",
      tnurl: "TestThumbnails-02.png",
      theme: "green",
      coursename: "英検®準2級絶対合格講座",
      courseSub: "予習必須！全問題形式に対応したコースで、絶対合格！",
      courseMetaTest: "英検",
      courseTest: "英検準2級",
      videoNo: "15",
      courseShortDesc:
        "全問題形式だけでなく、完了形や仮定法といった新出文法もレッスンで押さえていきます。",
      courseLongDesc: [
        "高校生レベルに入る級のため、必要な語彙・文法事項の複雑さも増す。",
        "それらの内容を定着させるべく、予習・復習の質・量を確保し、多くの演習を行います。英作文の文量・難易度や、二次面接試験で求められるレベルも高くなるため、インプットとアウトプットのどちらも学習しましょう！",
      ],
      courseSections: {
        sectionOne: "コースの紹介",
        sectionTwo: "筆記セクション",
        sectionThree: "リスニングセクション",
        sectionFour: "二次会面接セクション",
        sectionFive: "コースまとめ",
      },
      videoList: [
        { day: "1", title: "Day 1", link: "D1" },
        { day: "2", title: "Day 2", link: "D2" },
        { day: "3", title: "Day 3", link: "D3" },
        { day: "4", title: "Day 4", link: "D4" },
        { day: "5", title: "Day 5", link: "D5" },
        { day: "6", title: "Day 6", link: "D6" },
        { day: "7", title: "Day 7", link: "D7" },
        { day: "8", title: "Day 8", link: "D8" },
        { day: "9", title: "Day 9", link: "D9" },
        { day: "10", title: "Day 10", link: "D10" },
        { day: "11", title: "Day 11", link: "D11" },
        { day: "12", title: "Day 12", link: "D12" },
        { day: "13", title: "Day 13", link: "D13" },
        { day: "14", title: "Day 14", link: "D14" },
        { day: "15", title: "Day 15", link: "D15" },
      ],
      infoBoxes: [
        {
          text: "コースの特徴",
          items: [
            { icon: "check", text: "完了形・仮定法の定着" },
            { icon: "check", text: "充実の予復習問題！" },
            { icon: "check", text: "テクニックも紹介" },
          ],
        },
        {
          text: "コースの注意点",
          items: [
            { icon: "warning", text: "予習が必須です。" },
            { icon: "warning", text: "全15回です。" },
          ],
        },
      ],
    },
    {
      id: "3",
      test: "英検",
      abbr: "EK2",
      tnurl: "TestThumbnails-03.png",
      theme: "brown",
      coursename: "英検®2級絶対合格講座",
      courseSub: "予習必須！全問題形式に対応したコースで、絶対合格！",
      courseTest: "英検2級",
      courseMetaTest: "英検",
      videoNo: "15",
      courseShortDesc:
        "全問題形式・新出文法に加え、回答テクニックもレッスンで押さえていきます。",
      courseLongDesc: [
        "高校卒業レベルとなる２級では、語彙と共に、必要文法事項の難易度が大幅に上昇するため、躓きやすい文法ポイントを詳しく解説します。",
        "級が進むにつれて時間配分の重要性も増すため、素早く回答するテクニックなども演習を通し習得しましょう！",
      ],
      courseSections: {
        sectionOne: "コースの紹介",
        sectionTwo: "筆記セクション",
        sectionThree: "リスニングセクション",
        sectionFour: "二次会面接セクション",
        sectionFive: "コースまとめ",
      },
      videoList: [
        { day: "1", title: "Day 1", link: "D1" },
        { day: "2", title: "Day 2", link: "D2" },
        { day: "3", title: "Day 3", link: "D3" },
        { day: "4", title: "Day 4", link: "D4" },
        { day: "5", title: "Day 5", link: "D5" },
        { day: "6", title: "Day 6", link: "D6" },
        { day: "7", title: "Day 7", link: "D7" },
        { day: "8", title: "Day 8", link: "D8" },
        { day: "9", title: "Day 9", link: "D9" },
        { day: "10", title: "Day 10", link: "D10" },
        { day: "11", title: "Day 11", link: "D11" },
        { day: "12", title: "Day 12", link: "D12" },
        { day: "13", title: "Day 13", link: "D13" },
        { day: "14", title: "Day 14", link: "D14" },
        { day: "15", title: "Day 15", link: "D15" },
      ],
      infoBoxes: [
        {
          text: "コースの特徴",
          items: [
            { icon: "check", text: "不定詞・関係詞の定着" },
            { icon: "check", text: "充実の予復習問題！" },
            { icon: "check", text: "テクニックも紹介" },
          ],
        },
        {
          text: "コースの注意点",
          items: [
            { icon: "warning", text: "予習が必須です。" },
            { icon: "warning", text: "全15回です" },
          ],
        },
      ],
    },
  ];

  //*******************************************************************************END DATA**************************************************************************** */


  const fullVideoList = [
    {
      title: "英検3級",
      list: ek3,
    },
    {
      title: "英検2級",
      list: ek2,
    },
    {
      title: "英検準2級",
      list: ekj2,
    },
  ];

  const permArray = Array.from(perm)
  const parsed = parseCourses(permArray, courses)
  const content = {
    courses: parsed.courses,
    tests: parsed.tests,
  };


  const { setCurrentCourse, setCourseList, viewMode } =
    useContext(CourseContext);

  const { setCurrentVideo, setVideoList, setCourseVideoList } =
    useContext(VideoContext);

  useEffect(() => {
    setCourseList(courses);
    setCurrentCourse(courses[0]);
    setVideoList(fullVideoList);
    setCourseVideoList(fullVideoList[0]);
    setCurrentVideo(fullVideoList[0].list[0]);
  }, []);


  try {
    return (
      <>
        <Head>
          <title>AEL - レッスン選択</title>
        </Head>
        <Flex flexDir={"column"} height={"100vh"}>
          <Navbar perms={perm} username={username} />
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
          <Footer />
        </Flex>
      </>
    );
  } catch (err) {
    return <Flex>{err}</Flex>
  }
}

export const getServerSideProps = requireAuthentication(
  async (context) => {
    const user = context.req.cookies.AELJWT;
    let perm = []
    let username = ''
    if (user) {
      const decUser = jwt.decode(user);
      if (decUser.courses.length > 0) {
        perm = decUser.courses;
        username = decUser.username
      } else {
        perm = "No available courses";
      }
    }
    return {
      props: {
        username: username,
        perm: perm
      },
    };
  }
)

export default userDashboard;
