import React, { useState, useEffect, useContext } from "react";
import { Select, Box, Heading, Button, Flex, Spacer } from "@chakra-ui/react";

import { API, graphqlOperation } from "aws-amplify";
import { listAccounts, listUsers } from "../../graphql/queries";
import {
  createAccount,
  updateAccount,
  deleteAccount,
} from "../../graphql/mutations";

import UpdateAcct from "./UpdateAcct";
import CreateAcct from "./CreateAcct";
import DeleteAcct from "./DeleteAcct";

import AdminContext from "../../context/AdminContext";

import DataBox from "./layout/DataBox";

const AcctPanel = () => {
  const {
    schoolId,
    setAccountId,
    accountId,
    setUserList,
    setUserListIsLoaded,
    currentAccount,
    setCurrentAccount,
    retrieveUsers,
    setRetrieveUsers,
  } = useContext(AdminContext);

  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [retrieveUsers, setRetrieveUsers] = useState(false);

  const getUserData = async () => {
    const userData = await API.graphql(
      graphqlOperation(listUsers, {
        limit: 5000,
        filter: { accountUsersId: { eq: accountId } },
      })
    );
    const filtered = filterUsers(userData.data.listUsers.items, accountId);
    if (filtered) {
      setUserListIsLoaded(true);
    }
    console.log(userData);
    setUserList(filtered);
  };

  const getAccountData = async () => {
    const data = await API.graphql({
      query: listAccounts,
      variables: {
        filter: { schoolAccountsId: { eq: schoolId } },
        limit: 5000,
      },
    });

    const extracted = data.data.listAccounts.items

    extracted.forEach((item) => {
      delete item.users;
    });
    setFilteredAccounts(extracted);
    setIsLoaded(true);
  };

  const filterUsers = (users, id) => {
    return users.filter((user) => user.accountUsersId === id);
  };

  const handleSelectAccount = (e) => {
    setCurrentAccount(
      filteredAccounts?.filter((account) => e.target.value === account.id)[0]
    );
    setAccountId(
      filteredAccounts?.filter((account) => e.target.value === account.id)[0]
        ?.id
    );
  };

  useEffect(() => {
    setUserListIsLoaded(false);
  }, [accountId]);

  useEffect(() => {
    getAccountData();
  }, []);

  useEffect(() => {
    setUserListIsLoaded(false);
    currentAccount && setAccountId(currentAccount.id);
  }, [isLoaded && currentAccount]);

  useEffect(() => {
    if (retrieveUsers) {
      setUserListIsLoaded(false);
      getUserData();
      setRetrieveUsers(false);
    }
  }, [retrieveUsers]);

  useEffect(() => {
    console.log(filteredAccounts);
  });
  return (
    <Box p={5} boxShadow={"md"} bgColor="white" w="100%">
      <Heading>Accounts</Heading>
      <Select
        mb={3}
        placeholder="Select Account"
        onChange={(e) => handleSelectAccount(e)}
        maxW={300}
      >
        {isLoaded &&
          filteredAccounts.map((account) => {
            return (
              <option key={account.id} value={account.id}>
                {account.number}
                {() => setAccountId(account.id)}
                {() => setRetrieveUsers(false)}
              </option>
            );
          })}
      </Select>
      <DataBox
        title={"Account Data:"}
        data={currentAccount}
        datatype={"account"}
      />
      <Flex>
        <Spacer />
        <Button
          colorScheme={"blue"}
          onClick={() => setRetrieveUsers(true)}
          isDisabled={!currentAccount ? true : false}
        >
          Load Users for This Account
        </Button>
      </Flex>
    </Box>
  );
};

export default AcctPanel;
