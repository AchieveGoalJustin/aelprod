import React from "react";
import datacollator from "../../utils/datacollator";
import dataParser from "../../utils/parseCourseData";
import fetchUser from "../../utils/fetchUser";

import { Heading } from "@chakra-ui/react";

import { useState, useEffect } from "react";

const cData = datacollator();

const dataparse = () => {
  const [data, setData] = useState(cData);
  const [userData, setUserData] = useState({ data: "Loading data..." });
  const testArray = ["EKJ2", "EK3"];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchUser(inputData);
      setUserData(fetchedData);
    };

    fetchData().catch("FetchDataError:", console.error);
  }, []);

  return (
    <>
      <Heading>AuthDataFull:</Heading>
      <pre>{JSON.stringify(userData, 0, 2)}</pre>
      <Heading>AuthDataFiltered:</Heading>
      <pre>{JSON.stringify(userData.filtered, 0, 2)}</pre>
      <Heading>Full Dataset:</Heading>
      <pre>{JSON.stringify(data, 0, 2)}</pre>
      <Heading>Parsed Courses:</Heading>
      <pre>
        {JSON.stringify(dataParser.parseCourseList(testArray, data), 0, 2)}
      </pre>
      <Heading>Parsed Videos:</Heading>
      <pre>
        {JSON.stringify(dataParser.parseVideoList(testArray, data), 0, 2)}
      </pre>
    </>
  );
};

export default dataparse;
