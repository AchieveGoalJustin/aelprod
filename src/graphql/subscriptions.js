/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSchool = /* GraphQL */ `
  subscription OnCreateSchool {
    onCreateSchool {
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
export const onUpdateSchool = /* GraphQL */ `
  subscription OnUpdateSchool {
    onUpdateSchool {
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
export const onDeleteSchool = /* GraphQL */ `
  subscription OnDeleteSchool {
    onDeleteSchool {
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
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
