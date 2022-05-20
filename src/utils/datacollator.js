import ekj1course from "../data/tests/eiken/ekj1/coursedata";
import ekj1video from "../data/tests/eiken/ekj1/videodata";

import ek2course from "../data/tests/eiken/ek2/coursedata";
import ek2video from "../data/tests/eiken/ek2/videodata";

import ekj2course from "../data/tests/eiken/ekj2/coursedata";
import ekj2video from "../data/tests/eiken/ekj2/videodata";

import ek3course from "../data/tests/eiken/ek3/coursedata";
import ek3video from "../data/tests/eiken/ek3/videodata";

import ek4course from "../data/tests/eiken/ek4/coursedata";
import ek4video from "../data/tests/eiken/ek4/videodata";

import ek5course from "../data/tests/eiken/ek5/coursedata";
import ek5video from "../data/tests/eiken/ek5/videodata";

const datacollator = () => {
  const data = {
    ek3: {
      course: ek3course,
      videos: ek3video,
    },
    ekj2: {
      course: ekj2course,
      videos: ekj2video,
    },
    ek2: {
      course: ek2course,
      videos: ek2video,
    },
    ek5: {
      course: ek5course,
      videos: ek5video,
    },
    ek4: {
      course: ek4course,
      videos: ek4video,
    },
    ekj1: {
      course: ekj1course,
      videos: ekj1video,
    },
  };
  return data;
};

export default datacollator;
