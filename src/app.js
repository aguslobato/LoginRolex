import express from "express";
import { Server } from "socket.io";
import productRouter from "./Routes/products.js";
import { normalize, schema } from "normalizr";
import moment from "moment";
// const mockProducts = require("./Mocks/mockProducts.js");
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import ProductManagerDB from "./Manager/ProductManagerDB.js";
import MsgManager from "./Manager/MsgManager.js";

//services
const productService = new ProductManagerDB();
const msgService = new MsgManager();
const app = express();
const server = app.listen(8080, () => console.log("Listening on 8080"));
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

app.use("/api/productos-test", productRouter);

io.on("connection", async (socket) => {
  console.log("a user connected");
  let products = await productService.getAll();
  io.emit("productLog", products);
  socket.on("sendProduct", async (data) => {
    await productService.add(data);
    let products = await productService.getAll();
    io.emit("productLog", products);
  });
});

let log = [];
const indexLog = [];
const generalLog = {
  id: "200",
  name: "General chat",
  log: log,
};

io.on("connection", (socket) => {
  socket.emit("chatLog", indexLog);
  socket.on("message", (data) => {
    console.log(data);
    data.time = moment().format("HH:mm:ss DD/MM/YYYY");
    indexLog.push(data);
    io.emit("chatLog", indexLog);
  });
  socket.on("userInfo", (data) => {
    data.text.time = moment().format("HH:mm:ss DD/MM/YYYY");
    // console.log(data)
    log.push(data);
    // console.log(JSON.stringify(normalizedData, null, '\t'));
  });
});

const author = new schema.Entity("author");
const chatSchema = new schema.Entity("generalChat", {
  author: author,
  messages: [author],
});

const normalizedData = normalize(generalLog, chatSchema);
