//Fetch user data from Appsync Endpoint first authenticating school, then account number, then username/password,
//finally returning the data as an object

import { API, graphqlOperation } from "aws-amplify";
import {
  listAccounts,
  listSchools,
  listUsers,
  getUser,
  getAccount,
} from "../graphql/queries";

const fetchUser = async (inputData) => {
  let accountUsers = { error: "data not retrieved" };
  let nextTokenList = {};
  let message = "not evaluated";
  let authData = {};

  //Fetch All Schools

  const schoolList = await API.graphql(graphqlOperation(listSchools));

  const filteredSchool = schoolList.data.listSchools.items.filter(
    (school) => school.number === inputData.school
  );

  //Filter schools and return error if data provided is invalid

  if (filteredSchool.length === 0) {
    authData = {
      error: "入力された学校番号は登録されておりません。",
      code: 1,
    };
    return authData;
  }

  //List all accounts using the filtered school ID

  const accountList = await API.graphql({
    query: listAccounts,
    variables: { filter: { schoolAccountsId: { eq: filteredSchool[0].id } } },
  });

  //Filter accounts and return error if data provided is invalid

  const filteredAcct = accountList.data.listAccounts.items.filter(
    (acct) => acct.number === inputData.account
  );

  if (filteredAcct.length === 0) {
    authData = {
      error: "入力された講座番号は、学校番号と連携されていません。",
      code: 2,
    };
    return authData;
  }

  //List all users using the filtered user ID

  const userList = await API.graphql({
    query: listUsers,
    variables: { filter: { accountUsersId: { eq: filteredAcct[0].id } } },
  });

  accountUsers = await API.graphql({
    query: getAccount,
    variables: { id: filteredAcct[0].id },
  });

  if (
    userList.data.listUsers.nextToken &&
    userList.data.listUsers.items.length === 0
  ) {
    nextTokenList = await API.graphql({
      query: listUsers,
      variables: {
        nextToken: userList.data.listUsers.nextToken,
        filter: { accountUsersId: { eq: filteredAcct[0].id } },
      },
    });
    message = "NextToken, no length";
  } else {
    message = "No nextToken";
  }

  //Filter users and return error if data provided is invalid

  const filteredUser = accountUsers.data.getAccount.users.items.filter(
    (user) =>
      user.username === inputData.username &&
      user.password === inputData.password
  );

  if (filteredUser.length === 0) {
    authData = {
      error: "入力されたユーザー名、またはパスワードが間違っています。",
      code: 3,
      data: {
        userList,
        accountList,
        schoolList,
        filteredAcct,
        message,
        nextTokenList,
        accountUsers: accountUsers.data.getAccount.users.items,
        filteredUser,
        filteredSchool,
        filteredSchoolNo: filteredSchool[0].number,
        filteredAcctNo: filteredAcct[0].number,
        filteredUserNo: filteredUser[0].number,
        perm: filteredAcct[0].permissions,
        id:
          filteredSchool[0].number +
          "-" +
          filteredAcct[0].number +
          "-" +
          filteredUser[0].number,
        username: filteredUser[0].username,
      },
    };
    return authData;
  }

  if (Object.keys(authData).length === 0) {
    authData = { error: "サーバーに接続できませんでした。" };
  }

  authData = {
    username: filteredUser[0].username,
    id:
      filteredSchool[0].number +
      "-" +
      filteredAcct[0].number +
      "-" +
      filteredUser[0].number,
    perm: filteredAcct[0].permissions,
  };

  return authData;
};

export default fetchUser;
