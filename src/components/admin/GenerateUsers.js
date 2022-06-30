import React, { useEffect, useContext, useState } from "react";
import {
  getRandomWord,
  getRandomDigits,
  getRandomPassword,
} from "../../utils/passnounlist";
import * as parsers from "../../utils/database/numberParsers";

import { FormLabel, Input, Text } from "@chakra-ui/react";

import ModalFormInnerScaffold from "./forms/ModalFormInnerScaffold";
import UserFormContext from "../../context/UserFormContext";

const GenerateUsers = ({ buttonKeyword, userList, account, onClose }) => {
  const { setFormIsValid } = useContext(UserFormContext);

  const userNumbers = userList.map((user) => {
    return parsers.stringToInt(user.number);
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [numberIsValid, setNumberIsValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function checkFormIsValid() {
    if (numberIsValid && passwordIsValid && usernameIsValid) {
      setFormIsValid(true);
    }
  }

  function checkNumberIsValid() {
    if (
      userNumbers.includes(parsers.stringToInt(number)) ||
      number.length < 4 ||
      !parsers.stringToInt(number)
    ) {
      setNumberIsValid(false);
      setFormIsValid(false);
    } else {
      setNumberIsValid(true);
    }
  }

  function checkUsernameIsValid() {
    if (username.length <= 0) {
      setUsernameIsValid(false);
      setFormIsValid(false);
    } else {
      setUsernameIsValid(true);
    }
  }

  function checkPasswordIsValid() {
    if (password.length <= 0) {
      setPasswordIsValid(false);
      setFormIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  }

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

  useEffect(() => {
    checkNumberIsValid();
    checkUsernameIsValid();
    checkPasswordIsValid();
  }, [number, username, password]);

  useEffect(() => {
    checkFormIsValid();
  }, [numberIsValid, passwordIsValid, usernameIsValid]);

  useEffect(() => {
    console.log("getting random word");
    console.log(getRandomWord());
    console.log(getRandomPassword(4));
  });

  return (
    <ModalFormInnerScaffold
      account={account}
      userList={userList}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      gqlSubmit={createNewUser}
      buttonKeyword={buttonKeyword}
      onClose={onClose}
    >
      <FormLabel>Username</FormLabel>
      <Input
        isInvalid={!usernameIsValid}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        isDisabled={showPassword}
      />
      <FormLabel>Password</FormLabel>
      <Input
        isInvalid={!passwordIsValid}
        type="text"
        isDisabled={showPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormLabel>User Number</FormLabel>
      <Input
        type="text"
        maxLength={4}
        isInvalid={!numberIsValid}
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
      {!numberIsValid ? (
        <Text color="red">
          Number must be 4 digits and not already be held by another user
        </Text>
      ) : (
        <></>
      )}
    </ModalFormInnerScaffold>
  );
};

export default GenerateUsers;
