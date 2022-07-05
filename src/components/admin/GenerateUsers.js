import React, { useEffect, useContext, useState } from "react";
import { getRandomPassword } from "../../utils/passnounlist";
import * as parsers from "../../utils/database/numberParsers";

import { FormLabel, Input, Text } from "@chakra-ui/react";

import { createUser, updateAccount } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import ModalFormInnerScaffold from "./forms/ModalFormInnerScaffold";
import UserFormContext from "../../context/UserFormContext";
import AdminContext from "../../context/AdminContext";

const GenerateUsers = ({ buttonKeyword, userList, account, onClose }) => {
  const { setFormIsValid } = useContext(UserFormContext);
  const { schoolName } = useContext(AdminContext);

  const userNos = userList.map((user) => {
    return parsers.stringToInt(user.number);
  });

  userNos.sort((a, b) => a - b);
  const [password, setPassword] = useState("");
  const [userNumbers, setUserNumbers] = useState(userNos);
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [numberIsValid, setNumberIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function setUserData(number) {
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

    let updatedAccount = await API.graphql(
      graphqlOperation(updateAccount, {
        input: { id: account.id, usercount: account.usercount + 1 },
      })
    );
  }

  function checkFormIsValid() {
    if (numberIsValid) {
      setFormIsValid(true);
    }
  }

  function checkNumberIsValid() {
    if (
      // userNumbers.includes(parsers.stringToInt(number)) ||
      number.length < 1 ||
      !Number.isSafeInteger(parsers.stringToInt(number))
    ) {
      setNumberIsValid(false);
      setFormIsValid(false);
    } else {
      setNumberIsValid(true);
    }
  }

  function handleNumberInput(e) {
    if (e.target.value.length < 4) {
      if (e.target.value !== NaN) {
        setNumber(parsers.stringToInt(e.target.value));
      }
    }
  }

  function checkUserNumber(index, numberList) {
    let returnNumber = 0;
    let returnIndex = 0;
    let returnArray = numberList;
    let startNumber = numberList[index];
    while (!returnNumber) {
      if (numberList.includes(startNumber)) {
        returnIndex = numberList.indexOf(startNumber);
        startNumber++;
      } else {
        returnNumber = startNumber;
        returnArray.push(returnNumber);
      }
    }
    return { number: returnNumber, index: returnIndex, array: returnArray };
  }

  function cycleUserNumbers(checkObj, setNo) {
    if (setNo) {
      console.log(schoolName + parsers.intToString(setNo));
      console.log(getRandomPassword(4));
      // setUsername(schoolName + parsers.intToString(setNo));
      // setPassword(getRandomPassword(4));
      // setUserData(setNo);
      console.log("api call");
    }
    if (checkObj.number < number) {
      console.log(checkObj);
      let nextCheckObj = checkUserNumber(checkObj.index, checkObj.array);
      cycleUserNumbers(nextCheckObj, nextCheckObj.number);
    }
  }

  const generateNewUsers = async (e) => {
    e.preventDefault();

    let initialSet = checkUserNumber(0, userNumbers);
    cycleUserNumbers(initialSet, initialSet.number);

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
    console.log(userNumbers);
    console.log(checkUserNumber(0, userNumbers));
  }, []);

  useEffect(() => {
    checkNumberIsValid();
  }, [number]);

  useEffect(() => {
    checkFormIsValid();
  }, [numberIsValid]);

  useEffect(() => {
    console.log(getRandomPassword(4));
    console.log(username);
    console.log(password);
  });

  return (
    <ModalFormInnerScaffold
      account={account}
      userList={userList}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      gqlSubmit={generateNewUsers}
      buttonKeyword={buttonKeyword}
      onClose={onClose}
    >
      <FormLabel>User Amount</FormLabel>
      <Input
        maxLength={4}
        isInvalid={!numberIsValid}
        type="number"
        value={number}
        onChange={(e) => handleNumberInput(e)}
        isDisabled={showPassword}
      />
      {!numberIsValid ? (
        <Text color="red">
          Input must be a positive non-zero number between 1 and 1000.
        </Text>
      ) : (
        <></>
      )}
    </ModalFormInnerScaffold>
  );
};

export default GenerateUsers;
