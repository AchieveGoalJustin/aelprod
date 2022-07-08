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
import AdminContext from "../../../context/AdminContext";

const ModalFormInnerScaffold = ({
  gqlSubmit,
  buttonKeyword,
  children,
  showPassword,
  setShowPassword,
  onClose,
}) => {
  const superSecretPassword = "cpd20210601";

  const { formIsValid } = useContext(UserFormContext);

  const {
    setUserListIsLoaded,
    setRetrieveUsers,
    deleteList,
    setDeleteList,
    tableMode,
    generateList,
    setGenerateList,
    schoolName,
  } = useContext(AdminContext);

  const [adminPass, setAdminPass] = useState("");
  const [adminPassIsValid, setAdminPassIsValid] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  const handleValidation = () => {
    if (formIsValid) {
      setShowPassword(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault;
    if (adminPassIsValid) {
      if (deleteList.length > 0 && tableMode === "delete") {
        setUserListIsLoaded(false);
        setRetrieveUsers(false);
        gqlSubmit(deleteList);
        setDeleteList([]);
        onClose();
      } else if (generateList.length > 0 && tableMode === "generate") {
        setUserListIsLoaded(false);
        setRetrieveUsers(false);
        gqlSubmit(generateList, schoolName);
        setGenerateList([]);
        onClose();
      } else {
        setUserListIsLoaded(false);
        setRetrieveUsers(false);
        gqlSubmit(e);
        onClose();
      }
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
    } else {
      setAdminPassIsValid(false)
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
