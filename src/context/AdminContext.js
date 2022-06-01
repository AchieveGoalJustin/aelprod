import { createContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState();
  const [accountId, setAccountId] = useState();
  const [userId, setUserId] = useState();
  const [accountIsLoaded, setAccountIsLoaded] = useState(false);

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
