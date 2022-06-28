import React, { useState, useEffect } from "react";

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { button } from "aws-amplify";

const ModalFormInnerScaffold = ({
  account,
  userList,
  formIsValid,
  gqlSubmit,
  buttonKeyword,
  children,
}) => {
  const superSecretPassword = "hunter02";

  const [showPassword, setShowPassword] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminPassIsValid, setAdminPassIsValid] = useState(false);

  useEffect(() => {
    console.log(buttonKeyword);
  }, []);

  useEffect(() => {
    if (adminPass === superSecretPassword) {
      setAdminPassIsValid(true);
    }
  }, [adminPass]);

  const handleValidation = () => {
    if (formIsValid) {
      setShowPassword(true);
    }
  };

  const handleFormSubmit = (e) => {
    if (adminPassIsValid) {
      gqlSubmit(e);
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
        {children}
        <Button colorScheme={"green"} m={5} onClick={handleValidation}>
          {buttonKeyword}
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
              <Button colorScheme={"orange"} m={3} onClick={handleFormSubmit}>
                {buttonKeyword}
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

export default ModalFormInnerScaffold;
