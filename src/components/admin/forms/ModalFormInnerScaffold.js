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
  const { reloadUserPanel, setReloadUserPanel } = useContext(UserPanelContext);

  const { currentAccount, setUserList } = useContext(AdminContext);

  const [adminPass, setAdminPass] = useState("");
  const [adminPassIsValid, setAdminPassIsValid] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [reLoadedData, setReloadedData] = useState({});

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

  const filterUsers = (users, id) => {
    return users.filter((user) => user.accountUsersId === id);
  };

  const refreshUsers = async () => {
    const newUserData = await API.graphql(graphqlOperation(listUsers));
    const filtered = filterUsers(
      newUserData.data.listUsers.items,
      currentAccount.id
    );
    console.log("Refreshing users:");
    console.log(filtered);
    return filtered;
  };

  const handleValidation = () => {
    if (formIsValid) {
      setShowPassword(true);
    }
  };

  const handleFormSubmit = (e) => {
    if (adminPassIsValid) {
      gqlSubmit(e);
      onClose();
      setReloadUserPanel(true);
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

  useEffect(() => {
    if (reloadUserPanel) {
      console.log("refreshing users...");
      setReloadedData(refreshUsers());
    }
  }, [reloadUserPanel]);

  useEffect(() => {
    console.log("From reLoadedData UE:");
    if (reLoadedData && reloadUserPanel) {
      console.log("setting UserList to :");
      console.log(reLoadedData);
      setUserList(reLoadedData);
      console.log("setting ReloadUserPanel to false");
      setReloadUserPanel(false);
    }
  }, [reLoadedData]);

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
