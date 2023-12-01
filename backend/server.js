const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const {
  checkEmail,
  createUser,
  getUser,
  getChats,
  sendMessage,
  checkLogin,
  createChat,
  joinChat,
  getChat,
} = require("./db");

const app = express();
const port = 5001;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const login = await checkLogin(email, password);

  if (login.success) {
    const user = await getUser(email);
    return res.json(user).send();
  } else {
    return res.send(login.message);
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await checkEmail(email);
    if (!userExists) {
      const user = await createUser(name, email, password);
      if (user) {
        return res
          .json({ success: true, user: user.user.toJSON() })
          .status(200)
          .send();
      } else {
        return res
          .json({
            success: false,
            message: "User creation failed. Try again!",
          })
          .send();
      }
    } else {
      return res
        .json({
          success: false,
          message: "User already exists!",
        })
        .send();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        message: "Something went wrong!",
      })
      .send();
  }
});

app.post("/createChat", async (req, res) => {
  const { userId, name, description } = req.body;
  try {
    const newChat = await createChat(name, description, userId);
    if (newChat) {
      return res.json({ success: true, message: "New Chat created" });
    } else {
      return res.json({ success: false, message: "Creation of chat failed!" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Somethin went wrong!" });
  }
});

app.post("/getChats", async (req, res) => {
  const { email } = req.body;
  try {
    const chats = await getChats(email);
    return res.json({
      success: true,
      chats: chats,
    });
  } catch (error) {
    console.log(error);
    return res
      .json({ success: false, message: "Something went wrong!" })
      .status(500)
      .send();
  }
});

app.post("/getChat", async (req, res) => {
  const { chatId } = req.body;

  try {
    const chat = await getChat(chatId);
    return res.json({
      success: true,
      chat: chat,
    });
  } catch (error) {
    console.log(error);
    return res
      .json({ success: false, message: "Something went wrong!" })
      .status(500)
      .send();
  }
});

app.post("/joinChat", async (req, res) => {
  const { chatCode, userId } = req.body;
  try {
    const join = await joinChat({ join_code: chatCode, userId: userId });
    if (join) {
      return res.json({ success: true, message: "Successfully joined chat!" });
    } else {
      return res.json({ success: false, message: "Could not join chat!" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong!" });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("messageSend", async ({ message, chat, sender }) => {
    try {
      const sendMsg = await sendMessage({ message, chatCode: chat, sender });
      if (sendMsg.success) {
        io.emit(`messageNew`, sendMsg);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
