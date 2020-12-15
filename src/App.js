import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import BoardContainer from "./BoardContainer";
import InputContainer from "./InputContainer";
import WheelContainer from "./WheelContainer";

class App extends Component {
  constructor(props) {
    super(props);
    let puzzle = [
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "A", "L", "M", "O", "N", "D", "", "", "", "", ""],
      ["", "", "", "C", "A", "K", "E", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
    ];
    let phrase = "ALMOND CAKE";
    let lettersLeft = phrase.split(" ").join("");
    this.state = {
      round: 1,
      players: {
        name: ["red", "yellow", "blue"],
        scores: [0, 0, 0],
        roundScores: [0, 0, 0],
        currentPlayerIndex: 0,
        getCurrentPlayer: function () {
          return this.name[this.currentPlayerIndex];
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
        currentCategory: "Food and Drink",
        currentPhrase: phrase,
        lettersLeft: lettersLeft,
        currentPuzzle: puzzle,
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
        <WheelContainer handleAssignSpin={this.handleAssignSpin} />
        {/* <h1> Wheel of Fortune!!! - Round {this.state.round}</h1>
        <BoardContainer board={this.state.board}/>
        <h3>{this.state.currentCategory}</h3>
        <InputContainer
                        inputLetter={this.inputLetter}
                        inputVowel={this.inputVowel}
                        newRound={this.newRound}
                        players={this.state.players}
                        board={this.state.board}
                        handleAnswerChange={this.handleAnswerChange}
                        spinWheel = {this.spinWheel}
                        solve = {this.solve}
        
        /> */}
      </div>
    );
  }

  handleAnswerChange = (e) => {
    const input = e.target.value;
    if (input.length < 2) {
      this.setState({
        playerInput: input,
      });
    }
  };
  solve = () => {
    let answer = prompt("Please solve the puzzle");

    if (answer != null) {
      answer = answer.toLowerCase();
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
    players.currentPlayerIndex++;
    console.log(players);
    if (players.currentPlayerIndex > 2) {
      players.currentPlayerIndex = 0;
    }
    this.setState({ players });
  }

  inputVowel = (e) => {
    let players = this.state.players;
    let board = this.state.board;
    const VOWELS = ["A", "E", "I", "O", "U"];
    const letter = this.state.playerInput.toUpperCase();
    if (VOWELS.includes(letter) && !board.usedLetters.includes(letter)) {
      if (players.roundScores[players.currentPlayerIndex] - 250 < 0) {
        alert("Not enough money to purchase vowel");
      } else {
        players.roundScores[players.currentPlayerIndex] -= 250;
        board.lettersLeft = board.lettersLeft.split(letter).join("");
        board.usedLetters.push(letter);
        this.setState({
          players: players,
          board: board,
        });

        if (board.lettersLeft === 0) {
          this.endRound();
        }
      }
    }
  };

  inputLetter = (e) => {
    let players = this.state.players;
    let board = this.state.board;
    const VOWELS = ["A", "E", "I", "O", "U"];
    const letter = this.state.playerInput.toUpperCase();
    board.currentPhrase = board.currentPhrase.toUpperCase();

    if (VOWELS.includes(letter)) {
      alert("Vowels must be bought");
    } else if (board.usedLetters.includes(letter)) {
      board.currentSpin = -1;
      this.nextPlayer();
    } else if (!board.currentPhrase.includes(letter)) {
      board.usedLetters.push(letter);
      board.currentSpin = -1;
      this.setState({ board });
      this.nextPlayer();
    } else {
      const rgxp = new RegExp(letter, "g");
      const count = (board.currentPhrase.match(rgxp) || []).length;
      players.scorePoints(board.currentSpin * count);
      board.usedLetters.push(letter);
      board.lettersLeft = board.lettersLeft.split(letter).join("");
      board.currentSpin = -1;

      this.setState({
        board: board,
        players: players,
      });

      if (board.lettersLeft === 0) {
        this.endRound();
      }
    }
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
      board.currentPhrase = phrases[random][0];
      board.lettersLeft = phrases[random][0].split(" ").join("");
      this.setState({ board });
    } catch (err) {
      console.log(err);
    }
  }

  spinWheel = (landed) => {
  
    let board = this.state.board;

    switch (landed) {
      case "BANKRUPT":
        alert(this.state.players.getCurrentPlayer() + " has gone bankrupt!");
        this.bankruptPlayer();
        break;
      case "LOSE":
        alert(this.state.players.getCurrentPlayer() + " has lost their turn!");
        this.nextPlayer();
        break;
      case "FREE":
        break;

      default:
        board.currentSpin = landed;
        this.setState({ board });
    }
  };
  handleAssignSpin = (position) => {
    console.log("Assign spin position", position);
    let WHEEL_VALS = new Map();
    WHEEL_VALS.set(7.5, 5000);
    WHEEL_VALS.set(22.5, "BANKRUPT");
    WHEEL_VALS.set(37.5, 300);
    WHEEL_VALS.set(52.5, 500);
    WHEEL_VALS.set(67.5, 450);
    WHEEL_VALS.set(82.5, 500);
    WHEEL_VALS.set(97.5, 800);
    WHEEL_VALS.set(112.5, "LOSE");
    WHEEL_VALS.set(127.5, 700);
    WHEEL_VALS.set(142.5, "FREE");
    WHEEL_VALS.set(157.5, 650);
    WHEEL_VALS.set(172.5, "BANKRUPT");
    WHEEL_VALS.set(187.5, 900);
    WHEEL_VALS.set(202.5, 500);
    WHEEL_VALS.set(217.5, 350);
    WHEEL_VALS.set(232.5, 600);
    WHEEL_VALS.set(247.5, 500);
    WHEEL_VALS.set(262.5, 400);
    WHEEL_VALS.set(277.5, 550);
    WHEEL_VALS.set(292.5, 800);
    WHEEL_VALS.set(307.5, 300);
    WHEEL_VALS.set(322.5, 700);
    WHEEL_VALS.set(337.5, 900);
    WHEEL_VALS.set(352.5, 500);

   let value = WHEEL_VALS.get(position)
    console.log("Value is ", value)

    this.spinWheel(value)
  };
}

export default App;
