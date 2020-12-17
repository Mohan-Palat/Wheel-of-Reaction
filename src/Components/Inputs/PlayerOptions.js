import React from "react";
import { Button } from "semantic-ui-react";

function PlayerOptions(props) {
  return (
    <div>
      <Button primary onClick={() => props.spinWheel()}>Spin</Button>
      <Button primary onClick={() => props.openAndSolve()}>
        Solve Phrase
      </Button>
    </div>
  );
}

export default PlayerOptions;
