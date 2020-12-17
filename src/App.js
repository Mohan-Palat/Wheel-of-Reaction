import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import BoardContainer from "./BoardContainer";
import InputContainer from "./InputContainer";
import WheelContainer from "./WheelContainer";
import PlayerInput from "./PlayerContainer";
import LetterSelector from "./LetterSelector";
import { ALPHABET, VOWELS, WHEEL_VALS } from "./constants.js";
import { Card } from "semantic-ui-react";
import PlayerContainer from "./PlayerContainer";
import PlayerOptions from "./PlayerOptions";
import SolvePhraseModal from "./SolvePhraseModal";
import SpinWheelModal from "./SpinWheelModal";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      showSpinWheelModal: false,
      showSolvePhraseModal: false,
      round: 1,
      players: {
        name: ["red", "yellow", "blue"],
        scores: [0, 0, 0],
        roundScores: [0, 0, 0],
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
        currentSpin: -1,
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
    this.getPuzzle();
  }
  render() {
    return (
      <div className="App">
        <BoardContainer board={this.state.board} />
        <PlayerOptions
          openAndSolve={this.openAndSolve}
          spinWheel={this.openAndSpin}
        />
        <LetterSelector usedLetters={this.state.board.usedLetters} inputLetter={this.inputLetter}/>
        <SpinWheelModal
          open={this.state.showSpinWheelModal}
          handleAssignSpin={this.handleAssignSpin}
        />
        <SolvePhraseModal
          solveAnswerChange={this.solveAnswerChange}
          open={this.state.showSolvePhraseModal}
          solve={this.solve}
        />
        <h3>{this.state.currentCategory}</h3>
           <PlayerContainer
            players={this.state.players}
        />
      </div>
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
    this.setState({
      showSolvePhraseModal: false,
    });

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
    console.log(
      "Round " +
        this.state.round +
        " has been won by " +
        this.state.players.getCurrentPlayer()
    );
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

    if (players.freePlay) {
      console.log(
        `${this.state.players.getCurrentPlayer()} has used their free play!`
      );
      players.freePlay = false;
    } else {
      players.currentPlayerIndex++;
      if (players.currentPlayerIndex > 2) players.currentPlayerIndex = 0;
    }

    this.setState({ players });
  }

  nextSpin() {
    this.setSpinValue(-1);
  }

  setSpinValue(number) {
    let board = this.state.board;
    board.currentSpin = number;
    this.setState({ board });
    console.log(`Current spin set to ${number}`);
  }

  inputLetter = (letter) => {
    VOWELS.includes(letter) ? this.playVowel(letter) : this.playCons(letter);

    if (this.state.board.lettersLeft.length < 1) this.endRound();
  };
  
  //process letter and points input then update game states
  acceptLetter(letter, points) {
    let board = this.state.board;
    let players = this.state.players;
    players.scorePoints(points);      //Tally point gain (or loss for vowels) for letter play
    board.usedLetters.push(letter);
    board.lettersLeft = board.lettersLeft.split(letter).join("");
    this.setState({ players, board });

    if (points === 0) return this.nextPlayer();       //if no points are awarded, letter was not in puzzle, so move to next player

    console.log(
      `Player ${players.getCurrentPlayer()} has played ${letter} for ${points} points!`
    );
  }

  playVowel = (vowel) => {
    if (this.state.players.getPlayerScore() - 250 < 0) {
      return alert("Not enough money to purchase vowel");
    }

    this.acceptLetter(vowel, -250);
  };

  playCons = (cons) => {
    const rgxp = new RegExp(cons, "g");
    const count = (this.state.board.lettersLeft.match(rgxp) || []).length;
    console.log(
      `Count of ${cons} in ${this.state.board.lettersLeft}: ${count}`
    );
    const points = this.state.board.currentSpin * count;
    this.acceptLetter(cons, points);
    this.nextSpin();
  };

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
      let newPhrase = phrases[random][0].toUpperCase();
      board.currentPhrase = newPhrase;
      let lettersLeft = "";
      //clears letters left of non-alphabetical characters
      newPhrase.split("").forEach(character => {
        if ( ALPHABET.includes(character) )
          lettersLeft += character;
      });

      board.lettersLeft = lettersLeft;
      this.setState({ board });
    } catch (err) {
      console.log(err);
    }
  }

  spinWheel = (landed) => {
    let board = this.state.board;
    let players = this.state.players;
    players.freePlay = false;
    this.setState({players});

    switch (landed) {
      case "BANKRUPT":
        console.log(
          this.state.players.getCurrentPlayer() + " has gone bankrupt!"
        );
        this.bankruptPlayer();
        break;
      case "LOSE":
        console.log(
          this.state.players.getCurrentPlayer() + " has lost their turn!"
        );
        this.nextPlayer();
        break;
      case "FREE":
        console.log(
          this.state.players.getCurrentPlayer() + " has earned a Free Play!"
        );
        board.currentSpin = 500;
        players.freePlay = true;
        this.setState({ players, board });
        break;
      default:
        console.log(
          `${this.state.players.getCurrentPlayer()} has spun for $${landed}!`
        );
        board.currentSpin = landed;
        this.setState({ board });
    }
  };
  
  handleAssignSpin = (position) => {
    this.setState({
      showSpinWheelModal: false,
    });
    let value = WHEEL_VALS.get(position);
    this.spinWheel(value);
  };
}

export default App;