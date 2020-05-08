import React from "react";
import "./style.css";
import PlayerBoard from "../PlayerBoard/PlayerBoard";
import ControlArea from "../ControlArea/ControlArea";

class BaseLayout extends React.Component {
  state = createState(this);

  render() {
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
  }
}

export default BaseLayout;
