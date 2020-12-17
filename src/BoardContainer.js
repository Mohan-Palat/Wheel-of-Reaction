import React from 'react';
import BoardTile from './BoardTile';


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

    let usedLetters = ""; 
    props.board.usedLetters.forEach(letter => {
        usedLetters += letter+", "
    });
    usedLetters = usedLetters.slice(0, -2);
  
   
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
                {/* <h2>Used Letters: {usedLetters}</h2>*/}
                <div id="category">
                    {props.board.currentCategory.toUpperCase()}
                </div>
            </div>
    )

    
  

}


export default BoardContainer;
