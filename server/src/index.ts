import path from "path";
import express, { Express } from "express";
import Websocket from "ws";
import { shuffle } from "./utils";

const players: any = {};

const app: Express = express();

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

const wsServer = new Websocket.Server({ port: 8080 }, () => {
  console.log("Websocket server ready");
});

wsServer.on("connection", (socket: Websocket) => {
  // generate pid and send to player
  const pid: string = `pid${new Date().getTime()}`;
  // add to players object
  players[pid] = { score: 0, stillPlaying: true };
  socket.send(`connected_${pid}`);

  // check if there are two players
  if (Object.keys(players).length === 2) {
    const shuffledLayout: number[][][] = shuffle();
    wsServer.clients.forEach((inClient: Websocket) => {
      inClient.send(`start_${JSON.stringify(shuffledLayout)}`);
    });
  }

  socket.on("message", (inMsg: string) => {
    // <message>_<pid>_<additional data>

    const msgParts: string[] = inMsg.toString().split("_");
    // message
    const message: string = msgParts[0];
    // player id
    const pid: string = msgParts[1];
    switch (message) {
      case "match":
        // match start
        // broadcast both players their scores
        players[pid].score += +msgParts[2];
        wsServer.clients.forEach((inClient: Websocket) => {
          inClient.send(`update_${pid}_${players[pid].score}`);
        });
        break;
      case "done":
        // board is cleared or no more valid moves
        // set stillPlaying for the player = false
        players[pid].stillPlaying = false;
        let playersDone: number = 0;
        for (let player in players) {
          // check for player prop on the players object itself!
          // not its prototype
          if (players.hasOwnProperty(player)) {
            if (!players[player].stillPlaying) {
              playersDone++;
            }
          }
        }
        // if both done
        if (playersDone === 2) {
          let winningPID: string;
          const pids: string[] = Object.keys(players);
          if (players[pids[0]].score > players[pids[1]].score) {
            winningPID = pids[0];
          } else {
            winningPID = pids[1];
          }
          wsServer.clients.forEach((inClient: Websocket) => {
            inClient.send(`gameOver_${winningPID}`);
          });
        }
        break;
      default:
        break;
    }
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
