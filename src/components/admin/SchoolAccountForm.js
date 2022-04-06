import React from "react";

import { useState, useEffect } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  CheckboxGroup,
  Checkbox,
  Button,
  Container,
  Select,
  Alert,
  AlertDescription,
  AlertTitle,
  useCheckboxGroup,
} from "@chakra-ui/react";

const SchoolAccountForm = ({ schools }) => {
  const [accountId, setAccountId] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [displaySchool, setDisplaySchool] = useState("");
  const [schoolSelected, setSchoolSelected] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [userAmt, setUserAmt] = useState("");
  const [dbRes, setDbRes] = useState("");
  const [userList, setUserList] = useState([]);

  const submitAccount = async () => {
    const response = await fetch("/api/db/addAccount", {
      method: "POST",
      body: JSON.stringify({
        id: `${selectedSchoolId}-${accountId}`,
        accountNo: accountId,
        schoolId: selectedSchoolId,
        schoolName: displaySchool.schoolName,
        permissions: checkedItems,
        userNo: userAmt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setDbRes(data.success);
    setUserList(data.users);
    console.log(data.users);
  };

  const handleSelectMenu = (e) => {
    setSelectedSchoolId(e.target.value);
    if (e.target.value === "") {
      setSchoolSelected(false);
    } else {
      setSchoolSelected(true);
    }
  };

  //Manage the setCheckedItems array - add checked items and remove unchecked items
  const checkedItemHandler = (checkVal, checkBool, checkedItems) => {
    if (checkBool === true && !checkedItems.includes(checkVal)) {
      let newItems = [...checkedItems, checkVal];
      return newItems;
    } else if (checkBool === false && checkedItems.includes(checkVal)) {
      let newItems = checkedItems.filter((item) => item !== checkVal);
      console.log("from checkedItemHandler - ", newItems);
      return newItems;
    }
  };

  const handleAccountId = (e) => {
    setAccountId(e.target.value);
  };

  const handleCheckBox = (e) => {
    switch (e.target.value) {
      case "EK3":
        try {
          let checkedVal = checkedItemHandler(
            e.target.value,
            e.target.checked,
            checkedItems
          );
          setCheckedItems(checkedVal);
        } catch (err) {
          console.log(err);
        }
        break;
      case "EKJ2":
        try {
          let checkedVal = checkedItemHandler(
            e.target.value,
            e.target.checked,
            checkedItems
          );
          setCheckedItems(checkedVal);
        } catch (err) {
          console.log(err);
        }
      case "EK2":
        try {
          let checkedVal = checkedItemHandler(
            e.target.value,
            e.target.checked,
            checkedItems
          );
          setCheckedItems(checkedVal);
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        console.log("No action taken");
    }
    console.log("From the handle CheckBox ", checkedItems);
  };

  useEffect(() => {
    const school = schools.filter((school) => school.id === selectedSchoolId);
    setDisplaySchool(school[0]);
  }, [selectedSchoolId]);

  return (
    <Container>
      <Heading>Add New Account</Heading>
      <FormControl>
        <FormLabel>Choose School</FormLabel>

        <Select placeholder="Select a school code" onChange={handleSelectMenu}>
          {schools.map((school) => (
            <option value={school.id} key={school.id}>
              {school.id}
            </option>
          ))}
        </Select>

        {schoolSelected ? (
          <Alert status="success">
            <AlertTitle>School Name:</AlertTitle>
            <AlertDescription>
              {displaySchool ? displaySchool.schoolName : ""}
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}

        <FormLabel>Create New Account ID</FormLabel>
        <Input
          maxWidth="4em"
          type="text"
          value={accountId}
          onChange={handleAccountId}
        />
        <FormLabel>Set User Amount</FormLabel>
        <Input
          maxWidth="8em"
          value={userAmt}
          onChange={(e) => setUserAmt(e.target.value)}
        />
        <FormLabel>Permissions</FormLabel>
        <CheckboxGroup>
          <Checkbox value="EK3" onChange={handleCheckBox}>
            EK3
          </Checkbox>
          <Checkbox value="EKJ2" onChange={handleCheckBox}>
            EKJ2
          </Checkbox>
          <Checkbox value="EK2" onChange={handleCheckBox}>
            EK2
          </Checkbox>
        </CheckboxGroup>
        <Button my={5} onClick={submitAccount}>
          Submit
        </Button>
      </FormControl>
      <Text>{dbRes.status}</Text>
    </Container>
  );
};

export default SchoolAccountForm;
