import React from 'react';

function InputContainer(props) {
    let inputDisplay;

    if(props.board.revealAll === true){
        inputDisplay = <div>
             <button onClick={props.newRound}>New Round</button>
        </div>
    }

    else if(props.board.currentSpin === -1){
        inputDisplay = <div>
             <button onClick={props.spinWheel}> Spin Wheel</button>
             <button onClick={props.solve}> Solve the Puzzle</button>
        </div>
    }
    else{
        inputDisplay = <div>
                <input type="text" onChange={props.handleAnswerChange} value={props.playerInput}/> 
                <button onClick={props.inputLetter}> Submit Consonant</button>
                <button onClick={props.inputVowel}> Buy a Vowel</button>
                <h4>Current Spin: {props.board.currentSpin}</h4>
        </div>
    }
    
    return (

        <>
            {inputDisplay}
            <h4>Active Turn: {props.players.getCurrentPlayer()}</h4>
            
            <h4>Red Score: {props.players.roundScores[0]} - {props.players.scores[0]} </h4>
            <h4>Yellow Score: {props.players.roundScores[1]} - {props.players.scores[1]}</h4>
            <h4>Blue Score: {props.players.roundScores[2]} - {props.players.scores[2]}</h4>
        </>
    )


  

}


export default InputContainer;
