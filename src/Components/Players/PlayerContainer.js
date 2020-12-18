import React from "react";
import { IMAGES } from "../../imports/images.js";

function PlayerContainer(props) {
  return (
    <div id="player-container">
      {props.players.name.map((name, index) => {
        let color = `player ${name}`
        return (
          <div className={color}>
            <div class="round-score">
              <img id="currency" alt="round score" src={IMAGES.reactWhite} />
              <p>{props.players.roundScores[index]}</p>
            </div>
            <div class="total-score">
              <img id="round-money" alt="total score" src={IMAGES.moneyBag} />
              <p>{props.players.scores[index]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlayerContainer;
