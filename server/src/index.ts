import path from "path";
import express, { Express } from "express";
import Websocket from "ws";

const players: any = {};

const app: Express = express();

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

const wsServer = new Websocket.Server({ port: 8080 }, () => {
  console.log("Websocket server ready");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
