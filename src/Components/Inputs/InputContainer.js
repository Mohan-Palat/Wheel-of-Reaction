import React, { Component } from "react";
import PlayerOptions from "./PlayerOptions";
import LetterSelector from "./LetterSelector";
import SpinWheelModal from "./Modals/SpinWheelModal";
import SolvePhraseModal from "./Modals/SolvePhraseModal";
import {WHEEL_VALS} from "../../js/constants.js";

class InputContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            answer: "",
            showSolvePhraseModal: false,
            showSpinWheelModal: false
        }
    }
  render() {
    return (
      <>
        {this.props.board.currentSpin !== -1 ? 
           <LetterSelector
            usedLetters={this.props.board.usedLetters}
            inputLetter={this.props.inputLetter}
           /> :
           <PlayerOptions
            openAndSolve={this.openAndSolve}
            spinWheel={this.openAndSpin}
            newRound={this.props.newRound}
            board={this.props.board}
           />
        }
        
        
        
        <SpinWheelModal
          open={this.state.showSpinWheelModal}
          handleAssignSpin={this.handleAssignSpin}
          triggerSound={this.props.triggerSound}
        />
        <SolvePhraseModal
          solveAnswerChange={this.solveAnswerChange}
          open={this.state.showSolvePhraseModal}
          solve={this.handleSolve}
        />
      </>
    );
  }

  openAndSolve = () => {
    this.setState({
      showSolvePhraseModal: true,
    });
  };
  openAndSpin = () => {
    this.setState({
      showSpinWheelModal: true,
    });
  };

  handleAssignSpin = (position) => {
    this.setState({
      showSpinWheelModal: false,
    });
    let value = WHEEL_VALS.get(position);
    this.props.spinWheel(value);
  };



  handleSolve = (e) => {
    //let answer = prompt("Please solve the puzzle");
    e.preventDefault();
    this.setState({
      showSolvePhraseModal: false,
    });

    if (this.state.answer != null) {
      let answer = this.state.answer.toLowerCase();
      answer.trim();
      answer = answer.split(" ").join("");
      let phrase = this.props.board.currentPhrase.toLowerCase();
      phrase = phrase.split(" ").join("");

      this.props.solve(answer, phrase);
    }
  };

  solveAnswerChange = (e) => {
    this.setState({
      answer: e.currentTarget.value,
    });
  };

}

export default InputContainer;
