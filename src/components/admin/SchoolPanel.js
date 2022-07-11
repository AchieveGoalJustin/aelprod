import React, { useState, useEffect, useContext } from "react";

import {
  Select,
  Box,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Heading,
  Flex,
  Container,
  Button,
} from "@chakra-ui/react";

import { API, graphqlOperation } from "aws-amplify";
import { listSchools } from "../../graphql/queries";
import {
  createSchool,
  updateSchool,
  deleteSchool,
} from "../../graphql/mutations";

import UpdateSchool from "./UpdateSchool";
import CreateSchool from "./CreateSchool";
import DeleteSchool from "./DeleteSchool";

import AdminContext from "../../context/AdminContext";

const SchoolPanel = () => {
  const {
    setSchoolName,
    setSchoolId,
    setAccountIsLoaded,
    setUserListIsLoaded,
    setCurrentSchool,
    currentSchool,
    userListIsLoaded,
  } = useContext(AdminContext);

  const [schoolList, setSchoolList] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [operationInput, setOperationInput] = useState("create");
  const [currentOperationComponent, setCurrentOperationComponent] = useState();

  const updateSchoolComponent = (
    <UpdateSchool school={isLoaded ? currentSchool : "No School Selected"} />
  );
  const createSchoolComponent = (
    <CreateSchool school={isLoaded ? currentSchool : "No School Selected"} />
  );
  const deleteSchoolComponent = (
    <DeleteSchool school={isLoaded ? currentSchool : "No School Selected"} />
  );

  useEffect(() => {
    setAccountIsLoaded(false);
    setCurrentOperationComponent(createSchoolComponent);

    const getSchoolData = async () => {
      const data = await API.graphql(graphqlOperation(listSchools));
      setSchoolList(data.data.listSchools.items);
      setIsLoaded(true);
    };

    getSchoolData();
  }, []);

  useEffect(() => {
    setAccountIsLoaded(false);
    setUserListIsLoaded(false);

    currentSchool && setSchoolId(currentSchool.id);
    currentSchool && setSchoolName(currentSchool.name);
  }, [isLoaded, currentSchool]);

  useEffect(() => {
    switch (operationInput) {
      case "create":
        setCurrentOperationComponent(createSchoolComponent);
        break;
      case "update":
        setCurrentOperationComponent(updateSchoolComponent);
        break;
      case "delete":
        setCurrentOperationComponent(deleteSchoolComponent);
        break;
    }
  }, [operationInput, currentSchool]);

  const handleLoadAccounts = () => {
    if (currentSchool) {
      setAccountIsLoaded(true);
    }
  };

  return (
    <>
      <Box p={5} w="100%" boxShadow={"md"} bgColor="white">
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
          <Container
            bgColor="gray.50"
            px={5}
            py={3}
            my={5}
            outline={"#C8C8C8 solid 2px"}
          >
            <Text fontSize="xl" fontWeight={"bold"}>
              School Data:
            </Text>
            <Container>
              <Flex flexDir={"column"}>
                <Text mt={2} fontStyle={"italic"}>
                  Name:
                </Text>
                <Text color="blue">{currentSchool.name}</Text>
                <Text mt={2} fontStyle={"italic"}>
                  Number:
                </Text>
                <Text color="blue">{currentSchool.number}</Text>
                <Text mt={2} fontStyle={"italic"}>
                  Created On:
                </Text>
                <Text color="blue">{currentSchool.createdAt}</Text>
                <Text mt={2} fontStyle={"italic"}>
                  Updated On:
                </Text>
                <Text color="blue">{currentSchool.updatedAt}</Text>
                <Text mt={2} fontStyle={"italic"}>
                  ID:
                </Text>
                <Text color="blue">{currentSchool.id}</Text>
              </Flex>
            </Container>
          </Container>
        )}
        <Text mb={3}>Select Operation:</Text>
        <RadioGroup mb={3} onChange={setOperationInput}>
          <Stack direction="row">
            <Radio value="create">Create New</Radio>
            <Radio value="update">Update Selected</Radio>
            <Radio value="delete">Delete Selected</Radio>
          </Stack>
        </RadioGroup>
        {currentOperationComponent && currentOperationComponent}
        <Flex flexDir="row-reverse">
          <Button
            colorScheme={"blue"}
            onClick={handleLoadAccounts}
            isDisabled={!currentSchool ? true : false}
          >
            Load Accounts for This School
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default SchoolPanel;
