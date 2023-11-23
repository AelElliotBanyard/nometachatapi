require("dotenv").config();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const databaseName = process.env.MONGO_INITDB_DATABASE;
const uri = process.env.MONGO_URI
const port = process.env.MONGO_PORT

mongoose.connect(
  `mongodb://${username}:${password}@${uri}:${port}/${databaseName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const chatShema = new mongoose.Schema({
  name: String,
  join_code: String,
  description: String,
  created_ts: { type: Date, default: Date.now() },
  messages: [
    {
      id: String,
      content: String,
      created_ts: { type: Date, default: Date.now() },
      userId: String,
      sender: String,
    },
  ],
});
const Chat = mongoose.model("Chat", chatShema);

const userShema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  chats: [String],
});

const User = mongoose.model("User", userShema);

const createChat = async (name, description, userId) => {
  try {
    const newChat = new Chat({
      name: name,
      description: description,
      join_code: generateJoinCode(),
    });
    newChat.save();
    const user = await User.findById(userId).exec();
    let chats = user.chats;

    await User.findByIdAndUpdate(userId, { chats: [...chats, newChat._id] });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const joinChat = async (join_code, userId) => {
  try {
    const chatId = await Chat.findOne({ join_code: join_code }).exec();
    const user = await User.findById(userId).exec();
    let chats = user.chats;

    await User.findByIdAndUpdate(userId, { chats: [...chats, chatId._id] });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createUser = async (name, email, password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      passwordHash: hash,
      chats: [],
    });

    await newUser.save();

    return { success: true, user: newUser };
  } catch (error) {
    console.error(error);
    return { success: false, user: null };
  }
};

const checkLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      const check = await bcrypt
        .compare(password, user.passwordHash)
        .then((result) => {
          return result;
        });
      if (check) {
        return { success: true, message: "Everything Good!" };
      } else {
        return { success: false, message: "Password wrong!" };
      }
    } else {
      return { success: false, message: "User does not exist!" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
};

const getUser = async (email) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    return { success: true, user: user };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const checkEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getChats = async (email) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    const chatIds = user.chats;
    let chats = [];
    for (let index = 0; index < chatIds.length; index++) {
      let chat = await Chat.findById(chatIds[index]).exec();
      chats.push(chat);
    }
    return chats;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const sendMessage = async (message, chatCode, sender) => {
  try {
    const user = await User.findOne({ email: sender }).exec();
    const chat = await Chat.findOne({ join_code: chatCode }).exec();
    if (chat && user && user.chats.includes(chat.id)) {
      let messages = chat.messages;
      const updateChat = await Chat.findByIdAndUpdate(chat.id, {
        messages: [
          ...messages,
          {
            id: messages.length + 1,
            content: message,
            userId: user.id,
            sender: user.name,
          },
        ],
      }).exec();
      if (updateChat) {
        return { success: true, message: "New message added" };
      } else {
        return { success: false, message: "Error creating new Message" };
      }
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
};

const generateJoinCode = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 8) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

module.exports = {
  createChat,
  joinChat,
  createUser,
  checkLogin,
  checkEmail,
  getUser,
  getChats,
  sendMessage,
};
