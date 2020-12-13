import React from 'react';
import BoardTile from './BoardTile';

function BoardContainer(props) {
    const displayBoard = props.currentPuzzle.map(puzzle => {
        const displayedRow = puzzle.map(letter =>{
            if (letter === ""){
                return <BoardTile letter="*" usedLetters={props.usedLetters}/>
            }
            return <BoardTile letter={letter} usedLetters={props.usedLetters}/>
            }) 
        return displayedRow;

    })
  
   
    return (

        
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
    )


  

}


export default BoardContainer;