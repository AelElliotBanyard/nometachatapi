import { useChatContext } from "@/context/ChatContext";
import { useUserContext } from "@/context/UserContext";
import api from "@/utils/api";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";

const JoinChat = () => {
  const { showJoin, setShowJoin } = useChatContext();
  const [joinCode, setJoinCode] = React.useState<string>("");
  const { user } = useUserContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await api.joinChat({ joinCode, userId: user._id });
    if (response.data.success) {
      setShowJoin(false);
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div
      className={
        "absolute top-0 bottom-0 left-0 right-0 transition-transform backdrop-blur-md flex justify-center items-center z-50 " +
        (showJoin ? "translate-y-0" : "-translate-y-full")
      }
    >
      <div className="w-3/4 h-3/4 flex flex-col justify-center items-center gap-5">
        <h1 className="text-2xl">Join a Chat</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            className="outline outline-2 outline-white bg-transparent rounded outline-none focus:outline-white focus:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 focus:placeholder:text-white p-1"
            placeholder="Join Code..."
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />

          <div className="flex flex-row gap-2 items-center justify-center">
            <button
              type="button"
              className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-2 rounded-md w-full"
              onClick={() => {
                setShowJoin(false);
              }}
            >
              <RiArrowLeftLine size={24} />
            </button>
            <button
              type="submit"
              className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-2 rounded-md w-full"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinChat;
