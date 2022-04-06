/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSchool = /* GraphQL */ `
  mutation CreateSchool(
    $input: CreateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    createSchool(input: $input, condition: $condition) {
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
export const updateSchool = /* GraphQL */ `
  mutation UpdateSchool(
    $input: UpdateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    updateSchool(input: $input, condition: $condition) {
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
export const deleteSchool = /* GraphQL */ `
  mutation DeleteSchool(
    $input: DeleteSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    deleteSchool(input: $input, condition: $condition) {
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
export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
      number
      permissions
      usercount
      users {
        items {
          number
          username
          password
          id
          createdAt
          updatedAt
          accountUsersId
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      schoolAccountsId
    }
  }
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
      number
      permissions
      usercount
      users {
        items {
          number
          username
          password
          id
          createdAt
          updatedAt
          accountUsersId
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      schoolAccountsId
    }
  }
`;
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
      number
      permissions
      usercount
      users {
        items {
          number
          username
          password
          id
          createdAt
          updatedAt
          accountUsersId
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      schoolAccountsId
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      number
      username
      password
      id
      createdAt
      updatedAt
      accountUsersId
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      number
      username
      password
      id
      createdAt
      updatedAt
      accountUsersId
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      number
      username
      password
      id
      createdAt
      updatedAt
      accountUsersId
    }
  }
`;
