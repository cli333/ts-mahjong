import React from "react";
import "./style.css";
import PlayerBoard from "../PlayerBoard/PlayerBoard";
import ControlArea from "../ControlArea/ControlArea";

const BaseLayout: React.FC = () => {
  return (
    <div className="appContainer">
      <div className="playerBoard">
        <PlayerBoard />
      </div>
      <div className="controlArea">
        <ControlArea />
      </div>
    </div>
  );
};

export default BaseLayout;
