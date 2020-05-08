import React, { ReactElement } from "react";
import "./style.css";

const PlayerBoard: React.FC = ({ state }: any) => {
  // tile defaults
  const tileWidth: number = 72;
  const tileHeight: number = 88;
  const tileShadowWidth: number = 11;
  const tileShadowHeight: number = 11;

  // x / yAdjust to push tiles up and to the right
  const xAdjust: number = 10;
  const yAdjust: number = 36;

  const tiles: ReactElement[] = [];

  let xOffset: number = 0;
  let yOffset: number = 0;

  for (let l: number = 0; l < state.layout.length; l++) {
    // keep adjusting the x and y offset for 3d effect
    xOffset = xOffset + tileShadowWidth;
    yOffset = yOffset - tileShadowHeight;
    const layer: number[][] = state.layout[l];
    for (let r: number = 0; r < layer.length; r++) {
      const row: number[] = layer[r];
      for (let c: number = row.length; c >= 0; c--) {
        let tileVal: number = row[c];
        if (tileVal > 0) {
          // to place tile absolutely
          // find x and y Loc
          // x and yLoc = column/row# * tileWidth/height + offsets
          const xLoc: number =
            c * tileWidth - c * tileShadowWidth + xOffset + xAdjust;
          const yLoc: number =
            r * tileHeight - r * tileShadowHeight + yOffset + yAdjust;
          const style: React.CSSProperties = {
            position: "absolute",
            left: `${xLoc}px`,
            top: `${yLoc}px`,
          };
          let className: string = "";
          if (tileVal > 1000) {
            className = "highlightTile";
            tileVal = tileVal - 1000;
          }
          // push tile onto tiles
          // 42 different types
          tiles.push(
            <img
              style={style}
              className={className}
              onClick={() => state.tileClick(l, r, c)}
              src={`/images/tile${tileVal}.png`}
            />
          );
        }
      }
    }
  }

  return <React.Fragment>{tiles}</React.Fragment>;
};

export default PlayerBoard;
