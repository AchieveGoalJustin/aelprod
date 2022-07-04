import React, { useContext, useState, useEffect } from "react";

import {
  Box,
  Flex,
  Heading,
  Select,
  Spacer,
  Button,
  Text,
  Modal,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import UserTable from "./layout/UserTable";
import CreateUser from "./CreateUser";
import GenerateUsers from "./GenerateUsers";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

import AdminContext from "../../context/AdminContext";

const UserPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userList, accountId, currentAccount } = useContext(AdminContext);

  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [createUserActive, setCreateUserActive] = useState(false);
  const [tableMode, setTableMode] = useState("disabled");

  const showSelect = (e) => {
    switch (e.target.value) {
      case "delete":
        setModalContent(
          <DeleteUser onClose={onClose} buttonKeyword="Delete" />
        );
        setButtonEnabled(true);
        setTableMode("delete");
        break;
      case "update":
        setModalContent(
          <UpdateUser onClose={onClose} buttonKeyword="Update" />
        );
        setButtonEnabled(true);
        setTableMode("update");
        break;
      case "generate":
        setModalContent(
          <GenerateUsers
            onClose={onClose}
            buttonKeyword="Generate"
            account={currentAccount}
            userList={userList}
          />
        );
        setTableMode("disabled");
        setButtonEnabled(true);
        break;
      case "create":
        setModalContent(
          <CreateUser
            onClose={onClose}
            account={currentAccount}
            userList={userList}
            buttonKeyword="Create"
          />
        );
        setTableMode("disabled");
        setButtonEnabled(true);
        break;
      default:
        setButtonEnabled(false);
    }
  };

  return (
    <Box p="5" w="100%" boxShadow={"md"} bgColor="white">
      <Flex>
        <Heading mb={"5"}>User Data:</Heading>
        <Spacer />
        <Flex me={5}>
          <Box me={5}>
            <Select
              placeholder="Select Operation"
              onChange={(e) => showSelect(e)}
            >
              <option value="delete">{"Delete User(s)"}</option>
              <option value="update">{"Update User"}</option>
              <option value="generate">{"Generate Users"}</option>
              <option value="create">{"Create User"}</option>
            </Select>
          </Box>
          <Button
            colorScheme={"green"}
            onClick={onOpen}
            isDisabled={!buttonEnabled}
          >
            Make Changes
          </Button>
        </Flex>
      </Flex>
      <UserTable
        data={userList}
        tableMode={tableMode}
        setTableMode={setTableMode}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        {modalContent}
        {/* <CreateUser account={currentAccount} userList={userList} /> */}
      </Modal>
    </Box>
  );
};

export default UserPanel;
