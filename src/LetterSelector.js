import React from 'react';
import {ALPHABET} from "./constants.js"

const inputLetter = (e) => {
    console.log(e.target.id);
}

function LetterSelector(props) {

    return (
        <div id="button-container">
            {ALPHABET.map(letter => (
                <div onClick={inputLetter} key={letter} id={letter}>{letter}</div>
            ))}
        </div>
    )

}

export default LetterSelector;