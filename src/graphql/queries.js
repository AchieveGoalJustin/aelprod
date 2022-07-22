/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchool = /* GraphQL */ `
  query GetSchool($id: ID!) {
    getSchool(id: $id) {
      number
      name
      accounts {
        items {
          number
          permissions
          usercount
          id
          createdAt
          updatedAt
          schoolAccountsId
        }
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const listSchools = /* GraphQL */ `
  query ListSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        number
        name
        accounts {
          nextToken
        }
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      number
      permissions
      usercount
      users {
        items {
          number
          username
          password
          loginHistory
          id
          createdAt
          updatedAt
          accountUsersId
        }
        nextToken
      }
      school {
        number
        name
        accounts {
          nextToken
        }
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      schoolAccountsId
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        number
        permissions
        usercount
        users {
          nextToken
        }
        school {
          number
          name
          id
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
        schoolAccountsId
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      number
      username
      password
      account {
        number
        permissions
        usercount
        users {
          nextToken
        }
        school {
          number
          name
          id
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
        schoolAccountsId
      }
      loginHistory
      id
      createdAt
      updatedAt
      accountUsersId
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        number
        username
        password
        account {
          number
          permissions
          usercount
          id
          createdAt
          updatedAt
          schoolAccountsId
        }
        loginHistory
        id
        createdAt
        updatedAt
        accountUsersId
      }
      nextToken
    }
  }
`;
