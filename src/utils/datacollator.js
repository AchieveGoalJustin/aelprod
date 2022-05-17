import ek2course from "../data/tests/eiken/ek2/coursedata";
import ek2video from "../data/tests/eiken/ek2/videodata";

import ekj2course from "../data/tests/eiken/ekj2/coursedata";
import ekj2video from "../data/tests/eiken/ekj2/videodata";

import ek3course from "../data/tests/eiken/ek3/coursedata";
import ek3video from "../data/tests/eiken/ek3/videodata";

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
  };

  return data;
};

export default datacollator;
