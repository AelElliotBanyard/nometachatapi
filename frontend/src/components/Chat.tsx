import React, { FC, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { ChatData } from "@/types";
import { useUserContext } from "@/context/UserContext";
import api from "@/utils/api";
import socketIOClient from "socket.io-client";

type ChatProps = {
  chatId: string;
};

const Chat: FC<ChatProps> = ({ chatId }) => {
  const messageContainerRef = useRef(null);
  const socket = socketIOClient("http://localhost:5001");
  const { user } = useUserContext();
  const [data, setData] = React.useState<ChatData | undefined>(undefined);

  useEffect(() => {
    getData();
  }, [chatId]);

  const getData = async () => {
    if (chatId === "") return;
    const response = await api.getChat({ chatId: chatId });
    setData(response.data.chat);
  };

  socket.on("messageNew", (message) => {
    console.log(message);
    getData();
  });

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight + 100;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <div className="flex-grow">
      {data && (
        <>
          <ChatHeader chatName={data.name} chatCode={data.join_code} />
          <div
            className="px-2 py-2 h-[calc(100vh-5rem-0.5rem-4rem)] overflow-y-scroll"
            ref={messageContainerRef}
          >
            {data.messages.map((message) => {
              return (
                <Message
                  sender={message.sender}
                  time={new Date(message.created_ts)}
                  content={message.content}
                  side={message.userId === user._id ? "right" : "left"}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
