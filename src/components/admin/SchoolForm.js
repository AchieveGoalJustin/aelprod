import React from "react";

import { useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Text,
  Heading,
  CheckboxGroup,
  Checkbox,
  Button,
  Container,
  useToast,
} from "@chakra-ui/react";

const SchoolForm = () => {
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [dbRes, setDbRes] = useState("");

  const toast = useToast();

  const submitSchool = async (obj) => {
    console.log("Attempting to connect...");
    const response = await fetch("/api/db/addSchool", {
      method: "POST",
      body: JSON.stringify({
        id: schoolId,
        schoolName: schoolName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setDbRes(data.success);
    console.log(data);
  };

  return (
    <Container>
      <Heading>Add New School</Heading>
      <FormControl>
        <FormLabel>School Id</FormLabel>
        <Input
          value={schoolId}
          id="id"
          type="text"
          onChange={(e) => setSchoolId(e.target.value)}
        ></Input>
        <FormLabel>School Name</FormLabel>
        <Input
          value={schoolName}
          id="name"
          type="text"
          onChange={(e) => setSchoolName(e.target.value)}
        ></Input>
        <Button my={5} onClick={submitSchool}>
          Submit
        </Button>
      </FormControl>
      {dbRes && <Text colorScheme={"green"}>Success</Text>}
    </Container>
  );
};

export default SchoolForm;
