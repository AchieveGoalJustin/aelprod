//Remove this import when data is called from API!
import { courses } from "../data/coursedata";
import { ek3 } from "../data/videodata/ek3";
import { ekj2 } from "../data/videodata/ekj2"
import { ek2 } from "../data/videodata/ek2"

import { Heading } from "@chakra-ui/react"

import CourseContext from "../context/CourseContext";
import { useContext } from 'react'

import React from "react";
import VideosListSectionAccordion from "./VideosListSectionAccordion";

const VideoDashboard = ({ videos, content }) => {

  const { currentCourse } = useContext(CourseContext)

  const videoList = ek3.videoContent;
  const videoMetaData = {
    test: ek3.test,
    testid: ek3.testid,
    slug: ek3.slug,
    tnslug: ek3.tnslug,
  }

  // videoList = { videos }

  console.log('Current course')
  console.log(currentCourse)
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

  console.log('Video list first element')
  console.log(videoList[0])

  let key = 0;
  return (
    <>
      <Heading color="red.500">動画の一覧</Heading>
      {sectionList.map((section) => {
        console.log(section)
        key++;
        let videos = groupVideosBySection(section, videoList);
        console.log(videos)
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

//MAKE API CALLS FOR PRODUCTION BUILD

// export async function getStaticProps() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_ROOT}/api/videoapi`, { method: 'GET' });
//   const videodata = await response.json();
//   console.log('API video response from videoslist: ' + JSON.stringify(videodata))
//   const courseresponse = await fetch(`${process.env.NEXT_PUBLIC_PATH_ROOT}/api/courseapi`, { method: 'GET' })
//   const coursedata = await courseresponse.json();
//   console.log('API course response from videoslist: ' + JSON.stringify(courseresponse))
//   return {
//     props: {
//       videos: videodata,
//       course: coursedata,
//     },
//   };
// }
