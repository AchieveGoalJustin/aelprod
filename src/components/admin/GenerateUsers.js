import React, { useEffect, useContext, useState } from "react";
import { getRandomPassword } from "../../utils/passnounlist";
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
  const [showPassword, setShowPassword] = useState(false);

  function checkFormIsValid() {
    if (numberIsValid) {
      setFormIsValid(true);
    }
  }

  function checkNumberIsValid() {
    if (
      userNumbers.includes(parsers.stringToInt(number)) ||
      number.length < 1 ||
      !parsers.stringToInt(number)
    ) {
      setNumberIsValid(false);
      setFormIsValid(false);
    } else {
      setNumberIsValid(true);
    }
  }

  const generateNewUsers = async (e) => {
    e.preventDefault();

    // let updatedAccount = await API.graphql(
    //   graphqlOperation(updateAccount, {
    //     input: { id: account.id, usercount: account.usercount + 1 },
    //   })
    // );

    // let newUser = await API.graphql(
    //   graphqlOperation(createUser, {
    //     input: {
    //       number: number,
    //       password: password,
    //       username: username,
    //       accountUsersId: account.id,
    //     },
    //   })
    // );
  };

  useEffect(() => {
    checkNumberIsValid();
  }, [number, username, password]);

  useEffect(() => {
    checkFormIsValid();
  }, [numberIsValid]);

  useEffect(() => {
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
      <FormLabel>User Amount</FormLabel>
      <Input
        isInvalid={!usernameIsValid}
        type="text"
        value={username}
        onChange={(e) => setNumber(Math.floor(e.target.value))}
        isDisabled={showPassword}
      />
      {!numberIsValid ? (
        <Text color="red">Input must be a positive non-zero number.</Text>
      ) : (
        <></>
      )}
    </ModalFormInnerScaffold>
  );
};

export default GenerateUsers;
