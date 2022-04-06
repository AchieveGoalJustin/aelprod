import React from "react";
import { useState, useEffect } from "react";

import { Container, Text, Select, Heading, Box } from "@chakra-ui/react";

const UserDisplay = ({ schools }) => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [userData, setUserData] = useState([]);
  const [schoolIsSelected, setSchoolIsSelected] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [accountData, setAccountData] = useState([]);

  const handleSchoolSelectMenu = (e) => {
    setSelectedSchool(e.target.value);
    if (e.target.value === "") {
      setSchoolIsSelected(false);
    } else {
      setSchoolIsSelected(true);
      const targetSchool = schools.filter(
        (school) => school.id === e.target.value
      );
      console.log("target school is :" + JSON.stringify(targetSchool));
      setSelectedSchool(targetSchool);
      const data = fetchAccounts();
    }
  };

  const handleAccountSelectMenu = (e) => {
    fetchUsers();
  };

  async function fetchUsers() {
    const users = await fetch("/api/db/userByAccount", {
      method: "GET",
    });
    const response = await users.json();
    const data = response.data;
    console.log("users", response.data);
    setUserData(data);
    return data;
    // setaccountData(filteredData);
  }

  async function fetchAccounts() {
    const accounts = await fetch("/api/db/addAccount", {
      method: "GET",
    });
    const response = await accounts.json();
    const data = response.data;
    setAccountData(data);
    return data;
    // setaccountData(filteredData);
  }

  useEffect(() => {
    const filteredData = accountData.filter(
      (account) => account.schoolId === selectedSchool[0].id
    );
    setAccountList(filteredData);
  }, [accountData]);

  const accountSelector = (
    <Select default="Select Account" onChange={handleAccountSelectMenu}>
      {accountList.map((account) => (
        <option value={account.accountNo} key={account.id}>
          {account.accountNo}
        </option>
      ))}
    </Select>
  );

  const listUsers = (
    <>
      {userData.map((user) => (
        <Box outline="1px solid black" m={2} key={user.id}>
          <Text color="green">Username - {user.username}</Text>
          <Text color="red">Password - {user.password}</Text>
        </Box>
      ))}
    </>
  );

  return (
    <Container>
      <Heading>Account Users</Heading>
      <Select default="Select a school code" onChange={handleSchoolSelectMenu}>
        {schools.map((school) => (
          <option value={school.id} key={school.id}>
            {school.id}
          </option>
        ))}
      </Select>
      {schoolIsSelected ? accountSelector : ""}
      {listUsers}
    </Container>
  );
};

export default UserDisplay;
