import React from 'react';

function InputContainer(props) {
    let inputDisplay;
    if(props.board.currentSpin === -1){
        inputDisplay = <button onClick={props.spinWheel}> Spin Wheel</button>
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
            
            <h4>Red Score: {props.players.roundScores[0]}</h4>
            <h4>Yellow Score: {props.players.roundScores[1]}</h4>
            <h4>Blue Score: {props.players.roundScores[2]}</h4>
        </>
    )


  

}


export default InputContainer;
