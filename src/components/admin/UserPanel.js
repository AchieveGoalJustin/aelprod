import React, { useContext, useState, useEffect } from "react";

import {
  Box,
  Flex,
  Heading,
  Select,
  Spacer,
  Button,
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

  const {
    userList,
    currentAccount,
    setTableMode,
    deleteList,
    updateUser,
    tableMode,
  } = useContext(AdminContext);

  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const showSelect = (e) => {
    switch (e.target.value) {
      case "delete":
        setModalContent(
          <DeleteUser
            onClose={onClose}
            buttonKeyword="Delete Selected"
            account={currentAccount}
          />
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
        setTableMode("generate");
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
        setTableMode("create");
        setButtonEnabled(true);
        break;
      default:
        setTableMode("reset");
        setButtonEnabled(false);
    }
  };

  useEffect(() => {
    setTableMode("reset");
  }, []);

  useEffect(() => {
    console.log(deleteList);
    console.log(tableMode);
    console.log(deleteList.length);
    switch (tableMode) {
      case "delete":
        console.log("evaluating delete");
        if (deleteList.length == 0) {
          console.log(false);
          setButtonEnabled(false);
          break;
        } else if (deleteList.length >= 1) {
          setButtonEnabled(true);
          console.log(true);
          break;
        }
      case "update":
        console.log("evaluating update");
        if (!updateUser) {
          console.log(false);
          setButtonEnabled(false);
          break;
        } else if (updateUser) {
          console.log(true);
          setButtonEnabled(true);
          break;
        }
    }
  }, [deleteList, updateUser]);

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
      <UserTable data={userList} />
      <Modal isOpen={isOpen} onClose={onClose}>
        {modalContent}
        {/* <CreateUser account={currentAccount} userList={userList} /> */}
      </Modal>
    </Box>
  );
};

export default UserPanel;
