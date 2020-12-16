import React from 'react';

function BoardTile(props) {

    let show = "hide";
    if ( props.board.usedLetters.includes(props.letter) || props.board.revealAll === true){
        show = "show";
    }
    else if (props.letter === '*')
        show = "green"

    return (
        <div className={"tile " + show}>
            {props.letter.toUpperCase()}
        </div>
    )


  

}


export default BoardTile;