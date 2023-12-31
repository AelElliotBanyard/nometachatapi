import { Chat, ChatData } from "@/types";
import React, { FC } from "react";

type ChatListProps = {
  chats: ChatData[];
  setChat: (chat: ChatData) => void;
};
const ChatList: FC<ChatListProps> = ({ chats, setChat }) => {
  return (
    <div>
      {chats.map((chat) => {
        return (
          <div
            className=" h-12 border-b border-gray-400 flex items-center"
            onClick={() => {
              setChat(chat);
            }}
          >
            <p className="font-bold mx-2">{chat.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
