import { type } from "os";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  user_credentials: string;
};

export type Chat = {
  id: string;
  name: string;
  description: string;
  created_date: number;
  join_code: string;
};

export type Message = {
  id: string;
  content: string;
  created_date: number;
  chatId: string;
  userId: string;
};

export type ChatData = {
  id: string;
  name: string;
  description: string;
  created_date: number;
  join_code: string;
  messages: {
    id: string;
    content: string;
    created_date: number;
    chatId: string;
    userId: string;
    sender: string;
  }[];
};

