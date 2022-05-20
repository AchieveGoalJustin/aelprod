import { Heading } from "@chakra-ui/react";

import React, { useContext } from "react";

import VideoContext from "../../context/VideoContext";
import CourseContext from "../../context/CourseContext";

import VideosListSectionAccordion from "./VideosListSectionAccordion";

const VideoDashboard = () => {
  const { courseVideoList } = useContext(VideoContext);
  const { currentCourse } = useContext(CourseContext);

  console.log(currentCourse);

  const deconstructedVideoObj =
    courseVideoList[Object.keys(courseVideoList)[0]];

  //Separate path data from video data
  const getVideoPaths = (obj) => {
    let returnData = {};

    Object.entries(obj).forEach((key) => {
      if (key[0] !== "videoContent") {
        returnData[key[0]] = key[1];
      }
    });
    return returnData;
  };

  //Isolate video data
  const getVideoMetaData = (videoObj, courseObj) => {
    console.log("From geVideoMetaData");
    console.log(courseObj);
    let returnData = {};
    Object.entries(videoObj).forEach((key) => {
      if (key[0] === "videoContent") {
        returnData[key[0]] = key[1];
      }

      returnData["theme"] = courseObj[Object.keys(courseObj)[0]].theme;
    });
    return returnData;
  };

  //Isolate section data
  const getSectionList = (array) => {
    const sectionList = [];
    array.forEach((item) => {
      if (!sectionList.includes(item.section)) {
        sectionList.push(item.section);
      }
    });
    return sectionList;
  };

  function groupVideosBySection(section, metadata) {
    const groupedVideos = [];

    metadata.forEach((video) => {
      if (video.section === section) {
        groupedVideos.push(video);
      }
    });
    return groupedVideos;
  }

  const videoPaths = getVideoPaths(deconstructedVideoObj);
  const videoMetaData = getVideoMetaData(deconstructedVideoObj, currentCourse);
  const sectionList = getSectionList(videoMetaData.videoContent);

  let key = 0;
  return (
    <>
      <Heading color="red.500">動画の一覧</Heading>
      {sectionList.map((section) => {
        key++;
        let videos = groupVideosBySection(section, videoMetaData.videoContent);
        return (
          <VideosListSectionAccordion
            key={key}
            videos={videos}
            videoMetaData={videoMetaData}
            sectionTitle={section}
            videoPaths={videoPaths}
          />
        );
      })}
    </>
  );
};

export default VideoDashboard;
