import React, { FC } from "react";

type MessageProps = {
  sender: string;
  time: Date;
  content: string;
  side: "left" | "right";
};

const Message: FC<MessageProps> = ({ sender, time, content, side }) => {
  if (side === "left") {
    return (
      <div className="px-2 py-4 flex">
        <svg
          width="200"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
          className=" fill-gray-400 w-4 h-auto"
        >
          <path d="M 200 200 L 10 10 A 5,5 0 0 1 15,0 L 200 0 Z"></path>
        </svg>
        <div className="bg-gray-400 px-4 py-2 rounded-e-md rounded-bl-md relative pr-14">
          <p className=" text-gray-600">{sender}</p>
          <p>{content}</p>
          <p className="absolute bottom-1 right-2 text-sm opacity-50">
            {time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:
            {time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}
          </p>
        </div>
      </div>
    );
  } else if (side === "right") {
    return (
      <div className="px-2 py-4 flex justify-end">
        <div className=" bg-green-700 px-4 py-2 rounded-s-md rounded-br-md relative pl-14">
          <p>{content}</p>
          <p className="absolute bottom-1 left-2 text-sm opacity-50">
            {time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:
            {time.getMinutes() < 10
              ? "0" + time.getMinutes()
              : time.getMinutes()}
          </p>
        </div>
        <svg
          width="200"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
          className=" fill-green-700 w-4 h-auto"
          viewBox="184 12 16 16"
        >
          <path d="M 0 200 L 190 10 A 5,5 0 0 0 185,0 L 0 0 Z"></path>
        </svg>
      </div>
    );
  } else {
    return;
  }
};

export default Message;
