import React from 'react';
import {ALPHABET} from "../../imports/constants.js"

function BoardTile(props) {

    let show = "hide";
    if ( !ALPHABET.includes(props.letter.toUpperCase()) || props.board.usedLetters.includes(props.letter) || props.board.revealAll === true){
        show = "show";
    }
    if (props.letter === '*')
        show = "green"

    return (
        <div className={"tile " + show}>
            {props.letter.toUpperCase()}
        </div>
    )


  

}


export default BoardTile;