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
  Input,
  FormLabel,
  Text,
  Flex,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import { getAccount } from "../../graphql/queries";
import { createUser, updateAccount } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import * as parsers from "../../utils/database/numberParsers";

const CreateUser = ({ account, userList }) => {
  const superSecretPassword = "hunter02";

  const userNumbers = userList.map((user) => {
    return parsers.stringToInt(user.number);
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [numberIsInvalid, setNumberIsInvalid] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminPassIsValid, setAdminPassIsValid] = useState(false);

  useEffect(() => {
    console.log(number.length);
  });

  function checkNumberIsValid() {
    if (
      userNumbers.includes(parsers.stringToInt(number)) ||
      number.length < 4
    ) {
      setNumberIsInvalid(true);
    } else {
      setNumberIsInvalid(false);
    }
  }

  useEffect(() => {
    checkNumberIsValid(number);
  }, [number]);

  useEffect(() => {
    if (adminPass === superSecretPassword) {
      setAdminPassIsValid(true);
    }
  }, [adminPass]);

  const handleValidation = () => {
    if (!numberIsInvalid) {
      setShowPassword(true);
    }
  };

  const createNewUser = async (e) => {
    e.preventDefault();

    let updatedAccount = await API.graphql(
      graphqlOperation(updateAccount, {
        input: { id: account.id, usercount: account.usercount + 1 },
      })
    );

    let newUser = await API.graphql(
      graphqlOperation(createUser, {
        input: {
          number: number,
          password: password,
          username: username,
          accountUsersId: account.id,
        },
      })
    );
  };

  const handleCreateUser = (e) => {
    if (adminPassIsValid) {
      createNewUser(e);
    }
  };

  const handleAbort = () => {
    setShowPassword(false);
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalHeader>Create User</ModalHeader>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          isDisabled={showPassword}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          isDisabled={showPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormLabel>User Number</FormLabel>
        <Input
          type="text"
          maxLength={4}
          isInvalid={numberIsInvalid}
          errorBorderColor="red.300"
          placeholder={
            "Suggested: " + parsers.intToString(account.usercount + 1, 4)
          }
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          value={number}
          isDisabled={showPassword}
        />
        {numberIsInvalid ? (
          <Text color="red">
            Number must be 4 digits and not already be held by another user
          </Text>
        ) : (
          <></>
        )}
        <Button colorScheme={"green"} m={5} onClick={handleValidation}>
          Create
        </Button>
        {showPassword ? (
          <>
            <FormLabel>Enter Password to Confirm Update</FormLabel>
            <Text color="red" fontWeight="bold">
              !!THIS OPERATION CANNOT BE UNDONE!!
            </Text>
            <Input
              type="text"
              value={adminPass}
              onChange={(e) => {
                setAdminPass(e.target.value);
              }}
            />
            <Flex>
              <Button colorScheme={"orange"} m={3} onClick={handleCreateUser}>
                Create
              </Button>
              <Button colorScheme={"red"} m={3} onClick={handleAbort}>
                Abort
              </Button>
            </Flex>
          </>
        ) : (
          <></>
        )}
        <ModalCloseButton />
      </ModalContent>
    </>
  );
};

export default CreateUser;
