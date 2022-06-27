import React, { useContext, useState } from "react";

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

import AdminContext from "../../context/AdminContext";

const UserPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userList, accountId } = useContext(AdminContext);
  const [createUserActive, setCreateUserActive] = useState(false);

  return (
    <Box p="5" w="100%" maxH={"100vh"} boxShadow={"md"} bgColor="white">
      <Flex>
        <Heading mb={"5"}>User Data:</Heading>
        <Spacer />
        <Flex me={5}>
          <Box me={5}>
            <Select placeholder="Select Operation">
              <option>{"Delete User(s)"}</option>
              <option>{"Update User"}</option>
              <option>{"Generate Users"}</option>
              <option>{"Create User"}</option>
            </Select>
          </Box>
          <Button colorScheme={"green"} onClick={onOpen}>
            Make Changes
          </Button>
        </Flex>
      </Flex>
      <UserTable data={userList} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <CreateUser accountId={accountId} />
      </Modal>
    </Box>
  );
};

export default UserPanel;
