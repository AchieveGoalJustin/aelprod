import React, { useState, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import { getAccount } from "../../graphql/queries";
import { createUser, updateAccount } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import * as parsers from "../../utils/database/numberParsers";

const CreateUser = ({ accountId }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [number, setNumber] = useState();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    console.log(accountId);
    let modAccount = await API.graphql(
      graphqlOperation(getAccount, { id: accountId })
    );

    console.log(modAccount);

    // const accountResult = await API.graphql(
    //   graphqlOperation(updateAccount, { input: { id: accountId } })
    // );

    // const userResult = await API.graphql(
    //   graphqlOperation(createUser, {
    //     input: {
    //       username: username,
    //       number: number,
    //     },
    //   })
    // );
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create User</ModalHeader>
        <Button onClick={handleCreateUser}>Fetch</Button>
        <ModalCloseButton />
      </ModalContent>
    </>
  );
};

export default CreateUser;
