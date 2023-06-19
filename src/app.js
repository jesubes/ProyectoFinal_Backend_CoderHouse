import express from "express";
import {Server} from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.router.js";
import messageModel from "./dao/models/messages.model.js";
import passport from "passport";
import initPassport from "./config/passportConfig.js";
import config from "./config/config.js";
import handleError from "./middlewares/handleError.js";
import {addLogger} from "./logger/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const httpServer = app.listen(config.port, () =>
  console.log("App listen on port", config.port)
);

const io = new Server(httpServer);

const swaggerOption = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Documentation",
      description: "Apis que contiene el proyecto",
    },
  },
  apis: ["./src/docs/**.yaml"],
};

const specs = swaggerJSDoc(swaggerOption);

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({extended: true, limit: "25mb"}));
app.use(express.static(__dirname + "/public"));
app.use(addLogger);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(specs));

initPassport();
app.use(passport.initialize());

app.use("/", indexRouter);

app.use(handleError);

io.on("connection", async (socket) => {
  console.log("New client connected");

  const logs = await messageModel.find();
  io.emit("log", {logs});
  socket.on("message", async (data) => {
    await messageModel.create({
      user: data.user,
      message: data.message,
      time: data.time,
    });
    const logs = await messageModel.find();
    io.emit("log", {logs});
  });
  socket.on("userAuth", (data) => {
    socket.broadcast.emit("newUser", data);
  });
});
