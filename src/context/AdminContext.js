import { createContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState();
  const [accountId, setAccountId] = useState();
  const [userId, setUserId] = useState();
  const [accountIsLoaded, setAccountIsLoaded] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userListIsLoaded, setUserListIsLoaded] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({});
  const [currentSchool, setCurrentSchool] = useState({});

  return (
    <AdminContext.Provider
      value={{
        schoolId,
        accountId,
        userId,
        setSchoolId,
        setAccountId,
        setUserId,
        accountIsLoaded,
        setAccountIsLoaded,
        userList,
        setUserList,
        userListIsLoaded,
        setUserListIsLoaded,
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
