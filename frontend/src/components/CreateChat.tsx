import { useChatContext } from "@/context/ChatContext";
import { useUserContext } from "@/context/UserContext";
import api from "@/utils/api";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";

const CreateChat = () => {
  const { showCreate, setShowCreate } = useChatContext();
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const { user } = useUserContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user, name, description);
    const response = await api.createChat({
      userId: user._id,
      name,
      description,
    });
    if (response.data.success) {
      setShowCreate(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div
      className={
        "absolute top-0 bottom-0 left-0 right-0 transition-transform backdrop-blur-md flex justify-center items-center z-50 " +
        (showCreate ? "translate-y-0" : "-translate-y-full")
      }
    >
      <div className="px-4 py-2 flex flex-col justify-center items-center gap-5 bg-black">
        <h1 className="text-2xl">Create a Chat</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="tetx"
            className="outline outline-2 outline-white bg-transparent rounded outline-none focus:outline-white focus:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 focus:placeholder:text-white p-1"
            placeholder="Chat Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tetx"
            className="outline outline-2 outline-white bg-transparent rounded outline-none focus:outline-white focus:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 focus:placeholder:text-white p-1"
            placeholder="Chat Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-row gap-2 items-center justify-center">
            <button
              type="button"
              className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-2 rounded-md w-full"
              onClick={() => {
                setShowCreate(false);
              }}
            >
              <RiArrowLeftLine size={24} />
            </button>

            <button
              type="submit"
              className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-2 rounded-md w-full"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChat;
