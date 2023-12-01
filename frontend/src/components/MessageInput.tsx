import { useUserContext } from "@/context/UserContext";
import { Chat, ChatData } from "@/types";
import api from "@/utils/api";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import socketIOClient from "socket.io-client";

type MessageInputProps = {
  chatId: string;
};

const MessageInput: FC<MessageInputProps> = ({ chatId }) => {
  const socket = socketIOClient("http://localhost:5001");
  const [message, setMessage] = useState("");
  const { user } = useUserContext();

  const [data, setData] = React.useState<Chat | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      const response = await api.getChat({ chatId: chatId });
      setData(response.data.chat);
    };
    getData();
  }, [chatId]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (chatId !== "" && data) {
      socket.emit("messageSend", {
        sender: user.email,
        chat: data.join_code,
        message: message,
      });
      setMessage("");
    }
  };
  return (
    <div className="w-full flex h-20 items-center px-2 py-2 border-t border-gray-400">
      <form onSubmit={sendMessage} className="w-full flex items-center gap-2">
        <input
          type="text"
          placeholder="Type Message..."
          className=" bg-gray-600 text-white border border-gray-600 px-2 py-4 rounded-md flex-grow"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button type="submit">
          <RiSendPlaneFill className="text-gray-600 mx-2" size={28} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
