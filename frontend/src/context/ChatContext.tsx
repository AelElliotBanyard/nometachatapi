"use client";
import { useContext, useState, createContext } from "react";
import { Dispatch, SetStateAction } from "react";

export type chatContextType = {
  setShowJoin: Dispatch<SetStateAction<boolean>>;
  setShowCreate: Dispatch<SetStateAction<boolean>>;
  showJoin: boolean;
  showCreate: boolean;
};
export type chatProviderProps = { children: React.ReactNode };

const chatContextDefaultValues = {
  setShowJoin: () => {},
  setShowCreate: () => {},
  showJoin: false,
  showCreate: false,
};

export const ChatContext = createContext<chatContextType>(
  chatContextDefaultValues
);

export function useChatContext() {
  return useContext(ChatContext);
}

const ChatProvider = ({ children }: chatProviderProps) => {
  const [showJoin, setShowJoin] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{ showJoin, showCreate, setShowJoin, setShowCreate }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
