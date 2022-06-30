import { createContext, useState } from "react";

const UserPanelContext = createContext();

export const UserPanelProvider = ({ children }) => {
  const [reloadUserPanel, setReloadUserPanel] = useState(false);

  return (
    <UserPanelContext.Provider
      value={{
        reloadUserPanel,
        setReloadUserPanel,
      }}
    >
      {children}
    </UserPanelContext.Provider>
  );
};

export default UserPanelContext;
