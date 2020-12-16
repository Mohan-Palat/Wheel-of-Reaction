import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import BoardContainer from "./BoardContainer";
import InputContainer from "./InputContainer";
import WheelContainer from "./WheelContainer";
import PlayerInput from "./PlayerContainer"
import LetterSelector from './LetterSelector';
import {VOWELS, WHEEL_VALS} from "./constants.js"
import { Card } from "semantic-ui-react";
import PlayerContainer from "./PlayerContainer";
import PlayerOptions from "./PlayerOptions"
import SolvePhraseModal from "./SolvePhraseModal"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer :"",
      showSolvePhraseModal: false,
      round: 1,
      players: {
        name: ["red", "yellow", "blue"],
        scores: [0, 0, 0],
        roundScores: [500, 500, 500],
        currentPlayerIndex: 0,
        freePlay: false,
        getCurrentPlayer: function () {
          return this.name[this.currentPlayerIndex];
        },
        getPlayerScore: function () {
          return this.roundScores[this.currentPlayerIndex];
        },
        scorePoints: function (amount) {
          this.roundScores[this.currentPlayerIndex] += amount;
        },
        winRound: function () {
          this.scores[this.currentPlayerIndex] += this.roundScores[
            this.currentPlayerIndex
          ];
        },
      },
      board: {
        currentSpin: 500,
        currentCategory: "",
        currentPhrase: "",
        lettersLeft: "TEST",
        currentPuzzle: [],
        usedLetters: [],
        revealAll: false,
      },
      playerInput: "",
    };
  }
  componentDidMount() {
    //this.getPuzzle();
  }
  render() {
    return (
      <div className="App">
        <LetterSelector usedLetters={this.state.board.usedLetters} inputLetter={this.inputLetter}/>
        {/* <WheelContainer handleAssignSpin={this.handleAssignSpin} /> */}
        {/* <h1> Wheel of Fortune!!! - Round {this.state.round}</h1> */}
        {/* <BoardContainer board={this.state.board}/>
        <PlayerOptions openAndSolve={this.openAndSolve}/>
        <SolvePhraseModal solveAnswerChange={this.solveAnswerChange} open={this.state.showSolvePhraseModal} solve={this.solve}/>
        <h3>{this.state.currentCategory}</h3> */}
        {/* <InputContainer
                        inputLetter={this.inputLetter}
                        inputVowel={this.inputVowel}
                        newRound={this.newRound}
                        players={this.state.players}
                        board={this.state.board}
                        handleAnswerChange={this.handleAnswerChange}
                        spinWheel = {this.spinWheel}
                        solve = {this.solve}
        
        />   */}
        {/* <PlayerContainer
            players={this.state.players}
        /> */}
       
      </div>
    );
  }
  openAndSolve = () => {
    this.setState({
      showSolvePhraseModal: true,
    });
  };
 
  handleAnswerChange = (e) => {
    const input = e.target.value;
    if (input.length < 2) {
      this.setState({
        playerInput: input,
      });
    }
  };

  solveAnswerChange = (e) => {
    this.setState({
       answer: e.currentTarget.value,
    });
  };
  solve = (e) => {
    //let answer = prompt("Please solve the puzzle");
    e.preventDefault();

    if (this.state.answer != null) {
      let answer = this.state.answer.toLowerCase();
      answer.trim();
      answer = answer.split(" ").join("");
      let phrase = this.state.board.currentPhrase.toLowerCase();
      phrase = phrase.split(" ").join("");

      if (answer === phrase) {
        this.endRound();
      } else {
        alert("Incorrect guess!");
        this.nextPlayer();
      }
    }
  };

  endRound() {
    console.log("Round "+this.state.round+" has been won by "+this.state.players.getCurrentPlayer());
    let players = this.state.players;
    let board = this.state.board;
    players.winRound();
    board.revealAll = true;
    players.roundScores = [0, 0, 0];
    players.currentPlayerIndex = 0;
    this.setState({ players, board });
  }

  newRound = () => {
    let players = this.state.players;
    let board = this.state.board;
    board.usedLetters = [];
    board.revealAll = false;

    this.setState({
      players: players,
      round: this.state.round + 1,
      board: board,
    });
    this.getPuzzle();
  };

  nextPlayer() {
    let players = this.state.players;

    if (players.freePlay){
      console.log(`${this.state.players.getCurrentPlayer()} has used their free play!`);
      players.freePlay = false;
    }
    else{
      players.currentPlayerIndex++;
      if (players.currentPlayerIndex > 2) 
        players.currentPlayerIndex = 0;
    }

    this.setState({ players });
  }

  nextSpin(){ this.setSpinValue(-1)}

  setSpinValue(number){
    let board = this.state.board;
    board.currentSpin = number;
    this.setState({board})
    console.log(`Current spin set to ${number}`);
  }


  inputLetter = (letter) =>{ 
    VOWELS.includes(letter) ? this.playVowel(letter) : this.playCons(letter);

    if (this.state.board.lettersLeft.length < 1) 
      this.endRound();

    
  }

  acceptLetter(letter, points){
    let board = this.state.board;
    let players = this.state.players;
    players.scorePoints(points);
    board.usedLetters.push(letter);
    board.lettersLeft = board.lettersLeft.split(letter).join("");
    this.setState({players,board});

    if(points === 0)
      return this.nextPlayer();

    console.log(`Player ${players.getCurrentPlayer()} has played ${letter} for ${points} points!`);

  }
 
  playVowel = (vowel) => {

    if( this.state.players.getPlayerScore() - 250 < 0 ){
      return alert("Not enough money to purchase vowel");
    }

    this.acceptLetter(vowel, -250);
    
  };

  playCons = (cons) => {

    const rgxp = new RegExp(cons, "g");
    const count = (this.state.board.lettersLeft.match(rgxp) || []).length;
    console.log(`Count of ${cons} in ${this.state.board.lettersLeft}: ${count}`);
    const points = this.state.board.currentSpin * count;
    this.acceptLetter(cons, points);
    this.nextSpin();
    
  }

  bankruptPlayer() {
    let players = this.state.players;
    players.roundScores[players.currentPlayerIndex] = 0;
    this.setState({ players });
    this.nextPlayer();
  }

  async getPuzzle() {
    try {
      const parsedCategories = await axios(
        process.env.REACT_APP_MONGO_API_URL + "/getRanCat"
      );

      let random = Math.floor(
        Math.random() * Math.floor(parsedCategories.data.phrases.length)
      );
      if (random !== 0 && random % 2 === 1) {
        if (random + 1 === parsedCategories.data.phrases.length) random--;
        else random++;
      }
      let phrases = parsedCategories.data.phrases;
      let board = this.state.board;

      board.currentPuzzle = phrases[random + 1];
      board.currentCategory = parsedCategories.data.name;
      board.currentPhrase = phrases[random][0];
      board.lettersLeft = phrases[random][0].split(" ").join("");
      this.setState({ board });
    } catch (err) {
      console.log(err);
    }
  }

  spinWheel = (landed) => {
  
    let board = this.state.board;
    let players = this.state.players;
    players.freePlay = false;

    switch (landed) {
      case "BANKRUPT":
        console.log(this.state.players.getCurrentPlayer() + " has gone bankrupt!");
        this.bankruptPlayer();
        break;
      case "LOSE":
        console.log(this.state.players.getCurrentPlayer() + " has lost their turn!");
        this.nextPlayer();
        break;
      case "FREE":
        console.log(this.state.players.getCurrentPlayer() + " has earned a Free Play!");
        board.currentSpin = 500;
        players.freePlay = true;
        this.setState({players, board});
        break;
      default:
        console.log(`${this.state.players.getCurrentPlayer()} has spun for $${landed}!`);
        board.currentSpin = landed;
        this.setState({ board });
    }
  };
  handleAssignSpin = (position) => {
    let value = WHEEL_VALS.get(position)
    this.spinWheel(value)
  };
}

export default App;
