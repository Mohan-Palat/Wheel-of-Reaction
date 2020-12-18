import React from "react";
import { Button } from "semantic-ui-react";

function PlayerOptions(props) {
  return (
    <div id="player-options">
      {props.board.lettersLeft.length < 1 ? 
           <Button primary onClick={() => props.newRound()}>Next Round</Button> 
           :
           <>
              <Button primary onClick={() => props.spinWheel()}>Spin</Button>
              <Button primary onClick={() => props.openAndSolve()}>
                Solve Phrase
              </Button>
           </>
       }
      
      
    </div>
  );
}

export default PlayerOptions;
