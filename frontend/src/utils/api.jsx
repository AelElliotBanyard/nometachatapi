import axios from "axios";

const uri = "http://localhost:5001";
const login = async ({ email, password }) => {
  const response = await axios.post(`${uri}/login`, {
    email: email,
    password: password,
  });
  return response;
};

const register = async ({ name, email, password }) => {
  const response = await axios.post(`${uri}/register`, {
    name: name,
    email: email,
    password: password,
  });
  return response;
};

const createChat = async ({ userId, name, description }) => {
  const response = await axios.post(`${uri}/createChat`, {
    userId: userId,
    name: name,
    description: description,
  });
  return response;
};

const getChats = async ({ email }) => {
  const response = await axios.post(`${uri}/getChats`, { email: email });
  return response;
};

const getChat = async ({ chatId }) => {
  const response = await axios.post(`${uri}/getChat`, {
    chatId: chatId,
  });
  return response;
};

const joinChat = async ({ userId, joinCode }) => {
  const response = await axios.post(`${uri}/joinChat`, {
    userId: userId,
    chatCode: joinCode,
  });
  return response;
};

const api = {
  login,
  register,
  createChat,
  getChats,
  joinChat,
  getChat,
};

export default api;
