import React from 'react';

function BoardTile(props) {
    console.log("This is being re-drawn for some reason");

    let show = '__';
    if ( props.usedLetters.includes(props.letter) || props.letter === '*'){
        show = props.letter;

    }

    return (
        <div>
            {show}
        </div>
    )


  

}


export default BoardTile;