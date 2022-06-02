import React from "react";

import { courselist, videolist } from "../../data/tests/eiken/courselist";

import { Heading } from "@chakra-ui/react";

const DataDisplay = () => {
  return (
    <>
      <Heading>Course List</Heading>
      <pre>{JSON.stringify(courselist, null, 2)}</pre>;
      <Heading>Video List</Heading>
      <pre>{JSON.stringify(videolist, null, 2)}</pre>
    </>
  );
};

export default DataDisplay;
