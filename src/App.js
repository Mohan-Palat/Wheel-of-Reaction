import axios from 'axios'
import React, { Component } from "react";
import './App.css';
import BoardContainer from './BoardContainer';
import InputContainer from './InputContainer';
class App extends Component {
  constructor(props) {
    super(props);
    let puzzle = [
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "A", "L", "M", "O", "N", "D", "", "", "", "", ""],
        ["", "", "", "C", "A", "K", "E", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""]
      ]
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
        currentPhrase: 'ALMOND CAKE',
        currentPuzzle: puzzle,
        usedLetters: [],

      },
      playerInput: ""
    };
    
  }
  render() {
    return (
      <div className="App">
        <h1> Wheel of Fortune!!! </h1>
        <BoardContainer board={this.state.board}/>
        <h3>{this.state.currentCategory}</h3>
        <InputContainer
                        inputLetter={this.inputLetter}
                        inputVowel={this.inputVowel}
                        players={this.state.players}
                        board={this.state.board}
                        handleAnswerChange={this.handleAnswerChange}
                        spinWheel = {this.spinWheel}
        
        />
        
        
        

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

  solve(){
    const answer = prompt("Please solve the puzzle");

    if (answer != null) {
      answer = answer.toLowerCase();
      answer.answer.trim();
      answer.split(" ").join("");
      phrase = this.state.board.currentPhrase.toLowerCase();
      phrase.split(" ").join("");

      if (answer === phrase){
        let players = this.state.players;
        players.winRound();
        this.setState({players})
        this.newRound();
      }



    }
  }

  newRound(){
    let players = this.state.players;
    let board = this.state.board;
    players.roundScores = [0, 0, 0];
    board.usedLetters = [];

    this.setState({
      players: players,
      round: this.state.round + 1,
      board: board
    })
  }
  
  nextPlayer(){
    let players = this.state.players;
    players.currentPlayerIndex = this.state.players.currentPlayerIndex + 1;
    if (players.currentPlayerIndex === 2){
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
        board.usedLetters.push(letter);
        this.setState({
          players: players,
          board: board
        })

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
      this.nextPlayer();
    }
    else if ( !board.currentPhrase.includes(letter) ){
      board.usedLetters.push(letter);
      this.setState({board})
      this.nextPlayer();
    }
    else {
      
      const rgxp = new RegExp(letter, "g");
      const count = (board.currentPhrase.match(rgxp) || []).length;
      players.roundScores[players.currentPlayerIndex] += board.currentSpin * count 
      console.log(players.scores);
      board.usedLetters.push(letter);
      board.currentSpin = -1;

      this.setState({
        board: board,
        players: players
      })
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
        process.env.REACT_APP_MONGO_API_URL
      );
      console.log(parsedCategories.data.data);

    } catch (err) {
      console.log(err);
    }

    // this.setState = {
    //   currentPuzzle: puzzle
    // }
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
