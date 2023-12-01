import { type } from "os";

export type User = {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  chats: Array<String>
};

export type Chat = {
  _id: string;
  name: string;
  description: string;
  created_ts: number;
  join_code: string;
};

export type Message = {
  _id: string;
  content: string;
  created_ts: number;
  chatId: string;
  userId: string;
};

export type ChatData = {
  _id: string;
  name: string;
  description: string;
  created_date: number;
  join_code: string;
  messages: {
    _id: string;
    content: string;
    created_ts: number;
    chatId: string;
    userId: string;
    sender: string;
  }[];
};
