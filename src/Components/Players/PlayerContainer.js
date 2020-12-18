import React from "react";
import { IMAGES } from "../../imports/images.js";



function PlayerContainer(props) {
  function setColorClass(name, index){
    if(props.players.currentPlayerIndex === index){
      return `player ${name} ${props.players.getCurrentPlayer()}-select`
    }
    return `player ${name}`
  
  }

  return (
    <div id="player-container">
      {props.players.name.map((name, index) => {
        let color = setColorClass(name, index);
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
