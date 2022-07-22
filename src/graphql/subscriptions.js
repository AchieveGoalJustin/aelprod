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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
