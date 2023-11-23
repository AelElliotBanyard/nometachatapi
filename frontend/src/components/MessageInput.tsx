import React, { FC, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

type MessageInputProps = {
  onSend: (message: string) => void;
};

const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="w-full flex h-20 items-center px-2 py-2 border-t border-gray-400">
      <input
        type="text"
        placeholder="Type Message..."
        className=" bg-gray-600 text-white border border-gray-600 px-2 py-4 rounded-md flex-grow"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <RiSendPlaneFill
        className="text-gray-600 mx-2"
        size={28}
        onClick={() => {
          onSend(message);
          setMessage("");
        }}
      />
    </div>
  );
};

export default MessageInput;
