import { createContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ error: "No user" });

  const getUser = () => {};

  const getCourses = () => {};

  return (
    <SessionContext.Provider
      value={{ currentUser, setCurrentUser, getUser, getCourses }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
