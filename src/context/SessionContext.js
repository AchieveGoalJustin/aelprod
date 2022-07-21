import { createContext, useState } from "react";

const SessionContext = createContext();

const VIEWMODES = {
  INIT: "Initial",
  TEST: "Test",
  COURSE: "Course",
  VIDEO: "Video",
};

export const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ error: "No user" });
  const [viewMode, setViewmode] = useState(VIEWMODES.INIT);
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState("");

  const getUser = () => {};

  const getCourses = () => {};

  return (
    <SessionContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        getUser,
        getCourses,
        VIEWMODES,
        viewMode,
        setViewmode,
        isLogged,
        setIsLogged,
        userId,
        setUserId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
