import { createContext, useEffect, useState } from "react";
import { SystemContextProps, User } from "../interfaces/user";
const SystemContext = createContext<SystemContextProps>(
  {} as SystemContextProps
);
const INITIAL_DATA: User = {
  id: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  cpf: "",
  email: "",
  city: [],
  country: [],
  createdAt: new Date(),
};
export const SystemProvider = ({ children }: any) => {
  const [currentData, setCurrentData] = useState<User>(INITIAL_DATA);
  const getCurrentData = () => {
    return currentData;
  };
  const postCurrentData = (data: User) => {
    setCurrentData(data);
  };
  return (
    <SystemContext.Provider
      value={{
        postCurrentData,
        getCurrentData,
        INITIAL_DATA,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemContext;
