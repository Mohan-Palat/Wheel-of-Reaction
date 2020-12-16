import React from "react";
import { Button, Input } from "semantic-ui-react";

function PlayerOptions(props) {
  return (
    <div>
      <Button primary>Spin</Button>
      <Button primary onClick={() => props.openAndSolve()}>
        Solve Phrase
      </Button>
    </div>
  );
}

export default PlayerOptions;
