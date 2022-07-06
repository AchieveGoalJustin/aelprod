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
  const { setGenerateList } = useContext(AdminContext);

  const userNos = userList.map((user) => {
    return parsers.stringToInt(user.number);
  });

  userNos.sort((a, b) => a - b);
  const [userNumbers, setUserNumbers] = useState(userNos);
  const [number, setNumber] = useState("");
  const [numberIsValid, setNumberIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function setUserData(number, username, password) {
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

  function checkUserNumber() {
    console.log("checking user numbers");
    let returnArray = [];
    let recentVal = 0;
    while (returnArray.length < number) {
      if (userNumbers.includes(recentVal) || returnArray.includes(recentVal)) {
        recentVal++;
      } else {
        returnArray.push(recentVal);
      }
    }
    setGenerateList(returnArray);
  }

  const generateNewUsers = (list, schoolName) => {
    list.forEach((number) => {
      const parsed = parsers.intToString(number, 4);
      const username = schoolName + parsed;
      const password = getRandomPassword(4);

      setUserData(parsed, username, password);
    });
  };

  useEffect(() => {
    console.log(userNumbers);
  }, []);

  useEffect(() => {
    checkUserNumber();
    checkNumberIsValid();
  }, [number]);

  useEffect(() => {
    checkFormIsValid();
  }, [numberIsValid]);

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
