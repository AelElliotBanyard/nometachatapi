import React, { FC } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { ChatData } from "@/types";

type ChatProps = {
  data: ChatData | undefined;
};

const Chat: FC<ChatProps> = ({ data }) => {
  return (
    <div>
      {data && (
        <>
          <ChatHeader chatName={data.name} />
          <div className="px-2 py-2 h-[calc(100vh-5rem-0.5rem-4rem)] overflow-y-scroll">
            {data.messages.map((message) => {
              return (
                <Message
                  sender={message.sender}
                  time={new Date(message.created_date)}
                  content={message.content}
                  side={"right"}
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
