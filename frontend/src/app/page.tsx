"use client";
import Chat from "@/components/Chat";
import ChatList from "@/components/ChatList";
import MessageInput from "@/components/MessageInput";
import Searchbar from "@/components/Searchbar";
import { chats } from "@/data/data";
import { ChatData } from "@/types";
import { useFormik } from "formik";
import { useState } from "react";

export default function Home() {
  const data = chats;
  const [chat, setChat] = useState<ChatData>()
  const searchForm = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: () => {},
  });
  const sendMessage = () => {};
  return (
    <main className="h-screen flex max-h-screen">
      <div className="w-1/3 border-r border-gray-400 h-full pt-2">
        <Searchbar searchForm={searchForm} />
        <hr className="border-gray-400 mt-1" />
        <ChatList chats={data} setChat={(chat) => setChat(chat)} />
      </div>
      <div className="w-2/3 flex flex-col pt-2">
        <Chat data={chat} />
        <MessageInput onSend={sendMessage} />
      </div>
    </main>
  );
}
