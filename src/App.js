import axios from 'axios'
import React, { Component } from "react";
import './App.css';
import BoardContainer from './BoardContainer';
import InputContainer from './InputContainer';
import WheelContainer from './WheelContainer';

class App extends Component {
  constructor(props) {
    super(props);
    let puzzle = [
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "A", "L", "M", "O", "N", "D", "", "", "", "", ""],
        ["", "", "", "C", "A", "K", "E", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""]
      ]
    let phrase = "ALMOND CAKE"
    let lettersLeft = phrase.split(" ").join("");
    this.state = {
      round: 1,
      players: {
        name: ['red', 'yellow', 'blue'],
        scores: [0, 0, 0],
        roundScores: [0, 0, 0],
        currentPlayerIndex: 0,
        getCurrentPlayer: function(){ return this.name[this.currentPlayerIndex]},
        scorePoints: function(amount){ this.roundScores[this.currentPlayerIndex] += amount; },
        winRound: function(){ this.scores[this.currentPlayerIndex] += this.roundScores[this.currentPlayerIndex]}
      },
      board: {
        currentSpin: -1,
        currentCategory: 'Food and Drink',
        currentPhrase: phrase,
        lettersLeft: lettersLeft,
        currentPuzzle: puzzle,
        usedLetters: [],
        revealAll: false

      },
      playerInput: ""
    };
    
  }
  componentDidMount() {
    this.getPuzzle();
  
  }
  render() {
    return (
      <div className="App">
        <WheelContainer/>
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
    if (input.length < 2){
      this.setState({
        playerInput: input
      })
    }
  }
  solve = () =>{
    let answer = prompt("Please solve the puzzle");

    if (answer != null) {
      answer = answer.toLowerCase();
      answer.trim();
      answer = answer.split(" ").join("");
      let phrase = this.state.board.currentPhrase.toLowerCase();
      phrase = phrase.split(" ").join("");

      if (answer === phrase){
        this.endRound();
      }
      else{
        alert("Incorrect guess!");
        this.nextPlayer();
      }
    }
  }

  endRound(){
    let players = this.state.players;
    let board = this.state.board;
    players.winRound();
    board.revealAll = true;
    players.roundScores = [0, 0, 0];
    players.currentPlayerIndex = 0;
    this.setState({players, board})

  }

  newRound = () =>{
    let players = this.state.players;
    let board = this.state.board;
    board.usedLetters = [];
    board.revealAll = false;

    this.setState({
      players: players,
      round: this.state.round + 1,
      board: board
    })
    this.getPuzzle();
  }
  
  nextPlayer(){
    let players = this.state.players;
    players.currentPlayerIndex++;
    console.log(players);
    if (players.currentPlayerIndex > 2){
      players.currentPlayerIndex = 0;
    }
    this.setState({players});
  }

  inputVowel=(e)=>{
    let players = this.state.players;
    let board = this.state.board;
    const VOWELS = ['A', 'E', 'I', 'O', 'U'];
    const letter = this.state.playerInput.toUpperCase();
    if ( VOWELS.includes(letter) && !board.usedLetters.includes(letter)){
      if( players.roundScores[players.currentPlayerIndex] - 250 < 0){
        alert("Not enough money to purchase vowel")
      }
      else{
        players.roundScores[players.currentPlayerIndex] -= 250;
        board.lettersLeft = board.lettersLeft.split(letter).join("")
        board.usedLetters.push(letter);
        this.setState({
          players: players,
          board: board
        })

        if (board.lettersLeft === 0){
          this.endRound();
        }

      }
    }

  }

  inputLetter=(e)=>{
    let players = this.state.players;
    let board = this.state.board;
    const VOWELS = ['A', 'E', 'I', 'O', 'U'];
    const letter = this.state.playerInput.toUpperCase();
    board.currentPhrase = board.currentPhrase.toUpperCase();
    

    if ( VOWELS.includes(letter) ){
      alert("Vowels must be bought")
    }
    else if ( board.usedLetters.includes(letter) ){
      board.currentSpin = -1;
      this.nextPlayer();
    }
    else if ( !board.currentPhrase.includes(letter) ){
      board.usedLetters.push(letter);
      board.currentSpin = -1;
      this.setState({board})
      this.nextPlayer();
    }
    else {
      
      const rgxp = new RegExp(letter, "g");
      const count = (board.currentPhrase.match(rgxp) || []).length;
      players.scorePoints( board.currentSpin * count );
      board.usedLetters.push(letter);
      board.lettersLeft = board.lettersLeft.split(letter).join("")
      board.currentSpin = -1;

      this.setState({
        board: board,
        players: players
      })

      if (board.lettersLeft === 0){
        this.endRound();
      }
    }

  }

  bankruptPlayer(){
    let players = this.state.players;
    players.roundScores[players.currentPlayerIndex] = 0;
    this.setState({players});
    this.nextPlayer();
  }

  async getPuzzle(){
    try {
      const parsedCategories = await axios(
        process.env.REACT_APP_MONGO_API_URL + "/getRanCat"
      );

      let random = Math.floor(Math.random() * Math.floor(parsedCategories.data.phrases.length));
      if (random !== 0 && random % 2 === 1){
        if (random + 1 === parsedCategories.data.phrases.length)
          random--;
        else random++;
      }
      let phrases = parsedCategories.data.phrases;
      let board = this.state.board;

      board.currentPuzzle = phrases[random+1];
      board.currentCategory = parsedCategories.data.name;
      board.currentPhrase =  phrases[random][0];
      board.lettersLeft =  phrases[random][0].split(" ").join("");
      this.setState({board});

    } catch (err) {
      console.log(err);
    }
    
  }

  spinWheel = () =>{
    const WHEEL_VALS = [2500, 'WILD', 900, 700, 600, 650, 500, 700, 'BANK-MILLION', 
    600, 550, 500, 600, 'BANKRUPT', 650, 'FREE', 700, 'LOSE', 800, 500, 650, 500, 900, 'BANKRUPT'];
  
    let landed = WHEEL_VALS[ Math.floor(Math.random() * Math.floor(WHEEL_VALS.length)) ]
    let board = this.state.board;

    switch(landed){
      case "BANKRUPT":
        alert(this.state.players.getCurrentPlayer() + " has gone bankrupt!")
        this.bankruptPlayer();
        break;
      case "LOSE":
        alert(this.state.players.getCurrentPlayer() + " has lost their turn!")
        this.nextPlayer();
        break;
      case "BANK-MILLION":
        let thirds = Math.floor(Math.random() * Math.floor(3));
        let players = this.state.players;
        if (thirds === 0){
          players.roundScores[players.currentPlayerIndex] += 1000000
          this.setState({players})
        } else { this.bankruptPlayer(); }
        break;
      case "WILD":
        board.currentSpin = 777;
        this.setState({board});
        break;
      case "FREE":
        break;

      default:
        
        board.currentSpin = landed;
        this.setState({board})
    }
  }
}

export default App;
