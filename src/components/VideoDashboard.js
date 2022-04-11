//Remove this import when data is called from API!
import { courses } from "../data/coursedata";
import { ek3 } from "../data/videodata/ek3";
import { ekj2 } from "../data/videodata/ekj2";
import { ek2 } from "../data/videodata/ek2";

import { Heading } from "@chakra-ui/react";

import React from "react";
import VideosListSectionAccordion from "./VideosListSectionAccordion";

const VideoDashboard = () => {
  const videoList = ek3.videoContent;
  const videoMetaData = {
    test: ek3.test,
    testid: ek3.testid,
    slug: ek3.slug,
    tnslug: ek3.tnslug,
  };

  const sectionList = Object.values(courses[0].courseSections);

  if (!Object.entries)
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array

      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
    };

  function groupVideosBySection(sectionTitle, videoList) {
    const groupedVideos = [];

    videoList.forEach((video) => {
      if (video.section === sectionTitle) {
        groupedVideos.push(video);
      }
    });
    return groupedVideos;
  }

  let key = 0;
  return (
    <>
      <Heading color="red.500">動画の一覧</Heading>
      {sectionList.map((section) => {
        key++;
        let videos = groupVideosBySection(section, videoList);
        return (
          <VideosListSectionAccordion
            key={key}
            videos={videos}
            sectionTitle={section}
            videoMetaData={videoMetaData}
          />
        );
      })}
    </>
  );
};

export default VideoDashboard;
