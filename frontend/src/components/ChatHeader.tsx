import React, { FC } from "react";

type ChatHeaderProps = {
  chatName: string;
  chatCode: string;
};

const ChatHeader: FC<ChatHeaderProps> = ({ chatName, chatCode }) => {
  return (
    <div className="border-b border-gray-400 h-16 flex items-center px-2">
      <h1 className="text-center w-full">
        {chatName} # {chatCode}
      </h1>
    </div>
  );
};

export default ChatHeader;
