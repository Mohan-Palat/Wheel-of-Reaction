import React from 'react';

function BoardTile(props) {

    let show = '__';
    if ( props.board.usedLetters.includes(props.letter) || props.letter === '*' || props.board.revealAll === true){
        show = props.letter;
    }

    return (
        <div>
            {show}
        </div>
    )


  

}


export default BoardTile;