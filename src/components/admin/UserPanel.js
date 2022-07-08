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
    userToUpdate,
    tableMode,
    amountSelected,
    setAmountSelected,
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
        setAmountSelected(0);
        break;
      case "update":
        setModalContent(
          <UpdateUser onClose={onClose} buttonKeyword="Update" />
        );
        setButtonEnabled(true);
        setTableMode("update");
        setAmountSelected(0);
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
    switch (tableMode) {
      case "delete":
        if (amountSelected === 0) {
          setButtonEnabled(false);
          break;
        } else if (amountSelected >= 1) {
          setButtonEnabled(true);
          break;
        }
      case "update":
        if (!userToUpdate) {
          setButtonEnabled(false);
          break;
        } else if (userToUpdate) {
          setButtonEnabled(true);
          break;
        }
    }
  }, [deleteList, userToUpdate, amountSelected]);

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
