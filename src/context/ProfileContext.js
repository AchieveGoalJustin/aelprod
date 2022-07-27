import { createContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [historyPage, setHistoryPage] = useState(0);

  function resetProfileContext() {
    setHistoryPage(0);
  }

  return (
    <ProfileContext.Provider
      value={{
        resetProfileContext,
        historyPage,
        setHistoryPage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
