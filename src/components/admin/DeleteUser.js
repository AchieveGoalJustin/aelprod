import React, { useEffect, useContext, useState } from "react";

import { Text } from "@chakra-ui/react";

import { deleteUser, updateAccount } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import ModalFormInnerScaffold from "./forms/ModalFormInnerScaffold";
import UserFormContext from "../../context/UserFormContext";
import AdminContext from "../../context/AdminContext";

const DeleteUser = ({ buttonKeyword, account, onClose }) => {
  const { setFormIsValid, formIsValid } = useContext(UserFormContext);
  const { deleteList } = useContext(AdminContext);

  const [showPassword, setShowPassword] = useState(false);

  async function deleteUserFromList(id) {
    let deletedUser = await API.graphql(
      graphqlOperation(deleteUser, {
        input: {
          id: id,
        },
      })
    );

    let updatedAccount = await API.graphql(
      graphqlOperation(updateAccount, {
        input: { id: account.id, usercount: account.usercount - 1 },
      })
    );
  }

  function cycleDelete(deleteArr) {
    deleteArr.forEach((id) => {
      deleteUserFromList(id);
    });
  }

  useEffect(() => {
    if (deleteList.length > 0) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [deleteList]);

  useEffect(() => {
  });
  return (
    <ModalFormInnerScaffold
      account={account}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      gqlSubmit={cycleDelete}
      buttonKeyword={buttonKeyword}
      onClose={onClose}
    >
      {!formIsValid ? (
        <Text color="red.500">You must select at least one user to delete</Text>
      ) : (
        ""
      )}
    </ModalFormInnerScaffold>
  );
};
export default DeleteUser;
