import React from "react";
import InputContainer from "./InputContainer";

function PlayerContainer(props) {
  let inputDisplay;
  return (
    <div>
      {inputDisplay}
      <h4>Active Turn: {props.players.getCurrentPlayer()}</h4>
      <div className="playerscores">
        <div className="row">
          <div className="column">
            <div className="team-column">Red  </div>
            <div className="team-column">Round: <label className="score">{props.players.roundScores[0]} </label></div>
            <div className="team-column">Totals: {props.players.scores[0]}</div>
            
          </div>
          <div className="column">
            <div className="team-column">Yellow </div>
            <div className="team-column">Round: {props.players.roundScores[1]}</div> 
            <div className="team-column">Totals: {props.players.scores[1]}</div>
          </div>
          <div className="column">
            <div className="team-column">Blue </div>
            <div className="team-column">Round: {props.players.roundScores[2]} </div>
            <div className="team-column">Totals: {props.players.scores[2]}</div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerContainer;
