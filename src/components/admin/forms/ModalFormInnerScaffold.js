import React, { useState, useEffect, useContext } from "react";

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

import UserFormContext from "../../../context/UserFormContext";
import UserPanelContext from "../../../context/UserPanelContext";
import AdminContext from "../../../context/AdminContext";

import { getSchool, getAccount, listUsers } from "../../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const ModalFormInnerScaffold = ({
  gqlSubmit,
  buttonKeyword,
  children,
  showPassword,
  setShowPassword,
  onClose,
}) => {
  const superSecretPassword = "hunter02";

  const { formIsValid } = useContext(UserFormContext);

  const { setUserListIsLoaded, setRetrieveUsers } = useContext(AdminContext);

  const [adminPass, setAdminPass] = useState("");
  const [adminPassIsValid, setAdminPassIsValid] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  // const refreshData = () => {
  //   setReloadUserPanel(true);
  //   setReloadedData(refreshUsers());
  // };

  // const refreshSchool = async () => {
  //   let newSchool = await API.graphql(
  //     graphqlOperation(getSchool, { input: { id: currentSchool.id } })
  //   );
  //   return newSchool;
  // };

  // const refreshAccount = async () => {
  //   let newAccount = await API.graphql(
  //     graphqlOperation(getAccount, { input: { id: currentAccount.id } })
  //   );
  //   return newAccount;
  // };

  const handleValidation = () => {
    if (formIsValid) {
      setShowPassword(true);
    }
  };

  const handleFormSubmit = (e) => {
    if (adminPassIsValid) {
      setUserListIsLoaded(false);
      setRetrieveUsers(false);
      gqlSubmit(e);
      onClose();
    }
  };

  const handleAbort = () => {
    setShowPassword(false);
  };

  useEffect(() => {
    if (formIsValid) {
      setButtonActive(true);
    } else if (!formIsValid) {
      setButtonActive(false);
    }
  }, [formIsValid]);

  useEffect(() => {
    if (adminPass === superSecretPassword) {
      setAdminPassIsValid(true);
    }
  }, [adminPass]);

  return (
    <>
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalHeader>{buttonKeyword + " User"}</ModalHeader>
        {children}
        <Button
          colorScheme={"green"}
          m={5}
          onClick={handleValidation}
          isDisabled={!buttonActive}
        >
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
