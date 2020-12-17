import React from 'react';
import {ALPHABET, VOWELS} from "../../js/constants.js"

function LetterSelector(props) {

    const inputLetter = (e) => {

        if(e.target.classList.contains('used')){
            return alert("Letter already used");
        }
        props.inputLetter(e.target.id);
    }
    
    const resolveClass = (letter) => {
        let className = ""
        if (VOWELS.includes(letter))
            className = "button vowel"
        else className = "button cons"
    
        if (props.usedLetters.includes(letter))
            className += " used"
        return className;
    
    }

    return (
        <div id="button-container">
            {ALPHABET.map(letter => (
                <div className={resolveClass(letter)} onClick={inputLetter} key={letter} id={letter}>{letter}</div>
            ))}
        </div>
    )

}

export default LetterSelector;