import React from 'react';
import BoardTile from './BoardTile';
import {IMAGES} from '../../imports/images.js';




function BoardContainer(props) {
    console.log(props);
    const displayBoard = props.board.currentPuzzle.map(puzzle => {
        const displayedRow = puzzle.map(letter =>{
            if (letter === ""){
                return <BoardTile letter="*" board={props.board}/>
            }
            return <BoardTile letter={letter} board={props.board}/>
            }) 
        return displayedRow;

    })
   
    return (
            <div id="board-container">
                <img id="board-backdrop" src={IMAGES.boardBackdrop} alt="board backdrop"/>
                <img id="mute-icon" src={props.sounds.muteIcon} alt="mute" onClick={props.toggleSounds}/>
                <div id="board-rows">
                    <div id="display-1">
                        {displayBoard[0]}
                    </div>
                    <div id="display-2">
                        {displayBoard[1]}
                    </div>
                    <div id="display-3">
                        {displayBoard[2]}
                    </div>
                    <div id="display-4">
                        {displayBoard[3]}
                    </div>
                    
                </div>
                <div id="category">
                    {props.board.currentCategory.toUpperCase()}
                </div>
            </div>
    )

    
  

}


export default BoardContainer;
