"use client";
import { useContext, useState, createContext } from "react";
import { User } from "../types";
import { Dispatch, SetStateAction } from "react";

export type userContextType = {
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
};
export type userProviderProps = { children: React.ReactNode };

const userContextDefaultValues = {
  setUser: () => {},
  user: {
    email: "",
    name: "",
    _id: "",
    passwordHash: "",
    chats: [],
  },
};

export const UserContext = createContext<userContextType>(
  userContextDefaultValues
);

export function useUserContext() {
  return useContext(UserContext);
}

const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<User>(userContextDefaultValues.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
