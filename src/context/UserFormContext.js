import { createContext, useState } from "react";

const UserFormContext = createContext();

export const UserFormProvider = ({ children }) => {
  const [formIsValid, setFormIsValid] = useState(false);

  return (
    <UserFormContext.Provider
      value={{
        formIsValid,
        setFormIsValid,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};

export default UserFormContext;
