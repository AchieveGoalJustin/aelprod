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
import { listAccounts } from "../../graphql/queries";
import {
  createAccount,
  updateAccount,
  deleteAccount,
} from "../../graphql/mutations";

import UpdateAcct from "./UpdateAcct";
import CreateAcct from "./CreateAcct";
import DeleteAcct from "./DeleteAcct";

import AdminContext from "../../context/AdminContext";

const AcctPanel = () => {
  return (
    <Container p={5} mx={"auto"} boxShadow={"md"} bgColor="white">
      <Heading>I am account</Heading>
    </Container>
  );
  //   const { schoolId, setSchoolId } = useContext(AdminContext);

  //   const [schoolList, setSchoolList] = useState("");
  //   const [currentSchool, setCurrentSchool] = useState("");
  //   const [isLoaded, setIsLoaded] = useState(false);
  //   const [operationInput, setOperationInput] = useState("create");
  //   const [currentOperationComponent, setCurrentOperationComponent] = useState();

  //   const updateSchoolComponent = (
  //     <UpdateSchool school={isLoaded ? currentSchool : "No School Selected"} />
  //   );
  //   const createSchoolComponent = (
  //     <CreateSchool school={isLoaded ? currentSchool : "No School Selected"} />
  //   );
  //   const deleteSchoolComponent = (
  //     <DeleteSchool school={isLoaded ? currentSchool : "No School Selected"} />
  //   );

  //   useEffect(() => {
  //     setCurrentOperationComponent(createSchoolComponent);

  //     const getSchoolData = async () => {
  //       const data = await API.graphql(graphqlOperation(listSchools));
  //       setSchoolList(data.data.listSchools.items);
  //       setIsLoaded(true);
  //     };

  //     getSchoolData();
  //   }, []);

  //   useEffect(() => {
  //     setSchoolId(currentSchool.id);
  //     console.log(schoolId);
  //   }, [isLoaded, currentSchool]);

  //   useEffect(() => {
  //     switch (operationInput) {
  //       case "create":
  //         setCurrentOperationComponent(createSchoolComponent);
  //         break;
  //       case "update":
  //         setCurrentOperationComponent(updateSchoolComponent);
  //         break;
  //       case "delete":
  //         setCurrentOperationComponent(deleteSchoolComponent);
  //         break;
  //     }
  //   }, [operationInput, currentSchool]);

  //   return (
  //     <>
  //       <Container p={5} mx={"auto"} boxShadow={"md"} bgColor="white">
  //         <Heading mb={3}>School</Heading>
  //         <Select
  //           mb={3}
  //           placeholder="Select School"
  //           onChange={(e) => {
  //             isLoaded &&
  //               setCurrentSchool(
  //                 schoolList.filter((school) => e.target.value === school.id)[0]
  //               );
  //           }}
  //           maxW={300}
  //         >
  //           {isLoaded &&
  //             schoolList.map((school) => {
  //               return (
  //                 <option key={school.id} value={school.id}>
  //                   {school.name}
  //                 </option>
  //               );
  //             })}
  //         </Select>
  //         {currentSchool && (
  //           <Container bgColor="gray.50" p={10} my={10}>
  //             <Text fontWeight={"bold"}>School Data:</Text>
  //             <Flex flexDir={"column"}>
  //               <Text mt={2} fontStyle={"italic"}>
  //                 Name: <Text color="blue">{currentSchool.name}</Text>
  //               </Text>
  //               <Text mt={2} fontStyle={"italic"}>
  //                 Number: <Text color="blue">{currentSchool.number}</Text>
  //               </Text>
  //               <Text mt={2} fontStyle={"italic"}>
  //                 Created On: <Text color="blue">{currentSchool.createdAt}</Text>
  //               </Text>
  //               <Text mt={2} fontStyle={"italic"}>
  //                 Updated On: <Text color="blue">{currentSchool.updatedAt}</Text>
  //               </Text>
  //             </Flex>
  //           </Container>
  //         )}
  //         <Text mb={3}>Select Operation:</Text>
  //         <RadioGroup mb={3} onChange={setOperationInput}>
  //           <Stack direction="row">
  //             <Radio value="create">Create New</Radio>
  //             <Radio value="update">Update Selected</Radio>
  //             <Radio value="delete">Delete Selected</Radio>
  //           </Stack>
  //         </RadioGroup>
  //         {currentOperationComponent && currentOperationComponent}
  //         <Flex flexDir="row-reverse">
  //           <Button colorScheme={"blue"}>Load Accounts for This School</Button>
  //         </Flex>
  //         <pre>{JSON.stringify(schoolList, null, 2)}</pre>
  //       </Container>
  //     </>
  //   );
};

export default AcctPanel;
