import React from "react";

function PlayerContainer(props) {
  let inputDisplay;
  return (
    <div>
      {inputDisplay}
      <h4>Active Turn: {props.players.getCurrentPlayer()}</h4>

      <table>
        <tr>
          <th>&nbsp;</th>
          <th>Red</th>
          <th>Yellow</th>
          <th>Blue</th>
        </tr>

        <tr>
          <td>Round</td>
          <td class="round-red-td">
            <b class="check">${props.players.roundScores[0]}</b>
          </td>
          <td class="round-yellow-td">
            <b class="check">${props.players.roundScores[1]}</b>
          </td>
          <td class="round-blue-td">
            <b class="check">${props.players.roundScores[2]}</b>
          </td>
        </tr>
        <tr>
          <td>Totals</td>
          <td class="total-red-td">
            <b class="check">${props.players.scores[0]}</b>
          </td>
          <td class="total-yellow-td">
            <b class="check">${props.players.scores[1]}</b>
          </td>
          <td class="total-blue-td">
            <b class="check">${props.players.scores[2]}</b>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default PlayerContainer;
