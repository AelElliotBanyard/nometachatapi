"use client";
import Chat from "@/components/Chat";
import ChatList from "@/components/ChatList";
import MessageInput from "@/components/MessageInput";
import Searchbar from "@/components/Searchbar";
import { chats } from "@/data/data";
import { ChatData } from "@/types";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useChatContext } from "@/context/ChatContext";
import CreateChat from "@/components/CreateChat";
import JoinChat from "@/components/JoinChat";

export default function Home() {

  const { user, setUser } = useUserContext();
  const { setShowCreate, setShowJoin, showCreate, showJoin } = useChatContext();
  const [data, setData] = useState<ChatData[]>([]);
  const router = useRouter();

  const getData = async () => {
    const response = await api.getChats({ email: user.email });
    setData(response.data.chats);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [showCreate, showJoin]);
  const [chatId, setChatId] = useState<string>("");
  const searchForm = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: () => {},
  });
  useEffect(() => {
    if (user._id === "") {
      router.push("/login");
    }
  }, [user]);

  return (
    <main className="h-screen flex max-h-screen">
      <CreateChat />
      <JoinChat />
      <div className="w-1/3 border-r border-gray-400 h-full pt-2 flex flex-col gap-2">
        <Searchbar searchForm={searchForm} />
        <hr className="border-gray-400 mt-1" />
        <div className="flex-grow">
          <ChatList chats={data} setChat={(chat) => setChatId(chat._id)} />
        </div>
        <hr className="border-gray-400 mt-1" />
        <div className="flex flex-row justify-between px-4 pb-2">
          <button
            className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-4 px-2 rounded-md w-1/3"
            onClick={() => {
              setShowCreate(true);
            }}
          >
            Create Chat
          </button>

          <button
            className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-4 px-2 rounded-md w-1/3"
            onClick={() => {
              setShowJoin(true);
            }}
          >
            Join Chat
          </button>
        </div>
        <hr className="border-gray-400 mt-1" />
        <div className="flex flex-row justify-between px-4 pb-2">
          <button
            className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-4 px-2 rounded-md w-full"
            onClick={() => {
              setUser({
                email: "",
                name: "",
                _id: "",
                passwordHash: "",
                chats: [],
              });
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-2/3 flex flex-col pt-2">
        <Chat chatId={chatId} />
        <MessageInput chatId={chatId} />
      </div>
    </main>
  );
}
