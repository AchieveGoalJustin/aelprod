import React, { useState, useEffect, useContext } from "react";

import { Input, FormLabel, Text, Flex } from "@chakra-ui/react";

import { updateUser } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import ModalFormInnerScaffold from "./forms/ModalFormInnerScaffold";

import UserFormContext from "../../context/UserFormContext";
import AdminContext from "../../context/AdminContext";

import * as parsers from "../../utils/database/numberParsers";

const UpdateUser = ({ account, buttonKeyword, onClose }) => {
  const { setFormIsValid, formIsValid } = useContext(UserFormContext);
  const { userToUpdate, userList } = useContext(AdminContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [oldIsDifferent, setOldIsDifferent] = useState(false);
  const [userNumbers, setUserNumbers] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [numberIsValid, setNumberIsValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldData, setOldData] = useState({});

  function checkFormIsValid() {
    if (numberIsValid && passwordIsValid && usernameIsValid && oldIsDifferent) {
      setFormIsValid(true);
    }
  }

  function checkNumberIsValid() {
    const exclusiveList = userNumbers.filter((userNumber) => {
      return userNumber !== parsers.stringToInt(oldData.number);
    });
    if (
      exclusiveList.includes(parsers.stringToInt(number)) ||
      number.length < 4 ||
      !parsers.stringToInt(number) ||
      (userNumbers.includes(parsers.stringToInt(number)) &&
        oldData.number !== number)
    ) {
      setNumberIsValid(false);
      setFormIsValid(false);
    } else {
      setNumberIsValid(true);
    }
  }

  function checkUsernameIsValid() {
    const exclusiveList = userNames.filter((userName) => {
      return userName !== oldData.username;
    });
    if (username.length <= 0 || exclusiveList.includes(username)) {
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

  function checkOldIsDifferentFromNew() {
    let diffNumber = 3;
    if (username === oldData.username) {
      diffNumber--;
    }
    if (password === oldData.password) {
      diffNumber--;
    }
    if (number === oldData.number) {
      diffNumber--;
    }
    return Boolean(diffNumber);
  }

  const getOldUser = async (id) => {
    let userData = await API.graphql(graphqlOperation(getUser, { id: id }));
    setOldData(userData.data.getUser);
  };

  const updateSelectedUser = async (e) => {
    e.preventDefault();

    let updatedUser = await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: userToUpdate,
          username: username,
          password: password,
          number: number,
        },
      })
    );

    setFormIsValid(false);
  };

  useEffect(() => {
    setUserNumbers(
      userList.map((user) => {
        return parsers.stringToInt(user.number);
      })
    );
    setUserNames(
      userList.map((user) => {
        return user.username;
      })
    );
    getOldUser(userToUpdate);
  }, []);


  useEffect(() => {
    checkNumberIsValid();
    checkUsernameIsValid();
    checkPasswordIsValid();
    setOldIsDifferent(checkOldIsDifferentFromNew);
  }, [number, username, password]);

  useEffect(() => {
    checkFormIsValid();
  }, [numberIsValid, passwordIsValid, usernameIsValid, oldIsDifferent]);

  return (
    <ModalFormInnerScaffold
      account={account}
      userList={userList}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      gqlSubmit={updateSelectedUser}
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
      <Flex ms={2} my={2} p={2} bg={"orange.50"} borderRadius={"sm"}>
        <Text me={1} as={"i"} fontWeight={"bold"}>
          {"was: "}
        </Text>
        <Text color={"blue"} as={"i"}>
          {oldData.username}
        </Text>
      </Flex>
      <FormLabel>Password</FormLabel>
      <Input
        isInvalid={!passwordIsValid}
        type="text"
        isDisabled={showPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Flex ms={2} my={2} p={2} bg={"orange.50"} borderRadius={"sm"}>
        <Text me={1} as={"i"} fontWeight={"bold"}>
          {"was: "}
        </Text>
        <Text color={"blue"} as={"i"}>
          {oldData.password}
        </Text>
      </Flex>
      <FormLabel>User Number</FormLabel>
      <Input
        type="text"
        maxLength={4}
        isInvalid={!numberIsValid}
        errorBorderColor="red.300"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        value={number}
        isDisabled={showPassword}
      />
      <Flex ms={2} my={2} p={2} bg={"orange.50"} borderRadius={"sm"}>
        <Text me={1} as={"i"} fontWeight={"bold"}>
          {"was: "}
        </Text>
        <Text color={"blue"} as={"i"}>
          {oldData.number}
        </Text>
      </Flex>
      {!numberIsValid ? (
        <Text color="red" ms={2} my={2}>
          *Number must be 4 digits and not already be held by another user
        </Text>
      ) : (
        <></>
      )}

      {!oldIsDifferent && (
        <Text color="red" mb={2} ms={2}>
          *At least one field must be different from its original value
        </Text>
      )}
      {!usernameIsValid && (
        <Text color="red" mb={2} ms={2}>
          *Username required. Must be different from other existing usernames
        </Text>
      )}
    </ModalFormInnerScaffold>
  );
};

export default UpdateUser;
