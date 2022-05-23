import React, { useState, useEffect } from "react";
import {
  Select,
  Box,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Heading,
  Flex,
} from "@chakra-ui/react";

import { API, graphqlOperation } from "aws-amplify";
import { listSchools } from "../../graphql/queries";
import {
  createSchool,
  updateSchool,
  deleteSchool,
} from "../../graphql/mutations";
import { create } from "lodash";

const SchoolPanel = () => {
  const [schoolList, setSchoolList] = useState("");
  const [currentSchool, setCurrentSchool] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [operation, setOperation] = useState("create");

  useEffect(() => {
    const getSchoolData = async () => {
      const data = await API.graphql(graphqlOperation(listSchools));
      setSchoolList(data.data.listSchools.items);
      setIsLoaded(true);
    };

    getSchoolData();
  }, []);

  useEffect(() => {}, [isLoaded, currentSchool]);

  return (
    <>
      <Box my={50} mx={"20%"}>
        <Heading mb={3}>School</Heading>
        <Select
          mb={3}
          placeholder="Select School"
          onChange={(e) => {
            isLoaded &&
              setCurrentSchool(
                schoolList.filter((school) => e.target.value === school.id)[0]
              );
          }}
          maxW={300}
        >
          {isLoaded &&
            schoolList.map((school) => {
              return (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              );
            })}
        </Select>
        {currentSchool && (
          <Box bgColor="gray.50" m={10} p={3}>
            <Flex flexDir={"column"}>
              <Text>School Name: {currentSchool.name}</Text>
              <Text>School Number: {currentSchool.number}</Text>
            </Flex>
          </Box>
        )}
        <Text mb={3}>Select Operation:</Text>
        <RadioGroup mb={3}>
          <Stack direction="row">
            <Radio value="create">Create New</Radio>
            <Radio value="update">Update Existing</Radio>
            <Radio value="delete">Delete Selected</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <pre>{JSON.stringify(schoolList, null, 2)}</pre>
    </>
  );
};

export default SchoolPanel;
