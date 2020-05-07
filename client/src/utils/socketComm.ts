import React from "react";

export const createSocketComm = (inParentComponent: React.Component) => {
  const connection: WebSocket = new WebSocket("ws://localhost:8080");
  connection.onopen = () => console.log("Connection to server opened");
  connection.onerror = (error) => console.log(`Websocket error: ${error}`);
  connection.onmessage = (inMessage: any) => {
    console.log(`WS received: ${inMessage.data}`);
    const msgParts: string[] = inMessage.data.split("_");
    const message = msgParts[0];
    switch (message) {
      case "connected":
        state.handleMessage_connected(msgParts[1]);
        break;
      case "start":
        state.handleMessage_start(JSON.parse(msgParts[1]));
        break;
      case "update":
        state.handleMessage_update(msgParts[1], parseInt(msgParts[2]));
        break;
      case "gameOver":
        state.handleMessage_gameOver(msgParts[1]);
        break;
      default:
        break;
    }
  }.bind(inParentComponent);
};
