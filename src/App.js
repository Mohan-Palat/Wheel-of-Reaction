import axios from 'axios'
import React, { Component } from "react";
import './App.css';
import BoardContainer from './BoardContainer';

class App extends Component {
  constructor(props) {
    super(props);
    let puzzle = [
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "A", "L", "M", "M", "M", "D", "", "", "", "", ""],
        ["", "", "", "C", "A", "K", "E", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""]
      ]
    this.state = {
      round: 1,
      players: ['red', 'yellow', 'blue'],
      scores: [0, 0, 0, 0],
      roundScores: [0, 0, 0, 0],
      currentPlayer: 0,
      currentSpin: '',
      currentCategory: 'Food and Drink',
      currentPhrase: 'ALMOND CAKE',
      currentPuzzle: puzzle,
      currentLetterInstances: 0,
      usedLetters: [],
      playerInput: ""
    };
    
  }
  render() {
    return (
      <div className="App">
        <h1> Wheel of Fortune!!! </h1>
        <BoardContainer incrementLetterCount={this.incrementLetterCount} 
                        currentPuzzle={this.state.currentPuzzle} 
                        usedLetters={this.state.usedLetters}
                        />
        <h3>{this.state.currentCategory}</h3>
        <input type="text"
                onChange={this.handleAnswerChange}
                value={this.state.playerInput}
        /> 
        <button onClick={this.inputLetter}> Submit Consonant</button>
        <h4>Active Turn: {this.state.players[this.state.currentPlayer]}</h4>
        <h4>Letter instances: {this.currentLetterInstances}</h4>

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

  newRound(){
    this.setState({
      roundScores: [0, 0, 0, 0],
      round: this.state.round + 1,
      usedLetters: []
    })
  }

  incrementLetterCount=(letter)=>{
    console.log(letter);
    // console.log(this.state.currentLetterInstances);
    // const count = this.state.currentLetterInstances + 1;
    // this.setState({
    //   currentLetterInstances: count
    // })

  }
  
  nextPlayer(){
    let currentPlayer = this.state.currentPlayer + 1;
    if (this.state.currentPlayer === 2){
      currentPlayer = 0;
    }
    this.setState({currentPlayer});
  }

  inputLetter=(e)=>{
    const letter = this.state.playerInput.toUpperCase();
    const currentPhrase = this.state.currentPhrase.toUpperCase();
    const VOWELS = ['A', 'E', 'I', 'O', 'U'];

    if ( VOWELS.includes(letter) ){
      alert("No vowels allowed")
    }
    else if ( this.state.usedLetters.includes(letter) ){
      this.nextPlayer();
    }
    else if ( !currentPhrase.includes(letter) ){
      this.setState({
        usedLetters: [...this.state.usedLetters, letter]
      })
      this.nextPlayer();
    }
    else {
      this.setState({
        usedLetters: [...this.state.usedLetters, letter]
      })
    }

  }

  bankruptPlayer(){
    let roundScores = this.state.roundScores;
    roundScores[this.state.currentPlayer] = 0;
    this.setState({roundScores});
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

  spinWheel(){
    const WHEEL_VALS = [2500, 'WILD', 900, 700, 600, 650, 500, 700, 'BANK-MILLION', 
    600, 550, 500, 600, 'BANKRUPT', 650, 'FREE', 700, 'LOSE', 800, 500, 650, 500, 900, 'BANKRUPT'];
  
    let landed = WHEEL_VALS[ Math.floor(Math.random() * Math.floor(WHEEL_VALS.length)) ]

    switch(landed){
      case "BANKRUPT":
        this.bankruptPlayer();
        break;
      case "LOSE":
        this.nextPlayer();
        break;
      case "BANK-MILLION":
        let thirds = Math.floor(Math.random() * Math.floor(3));
        let roundScores = this.state.roundScores;
        if (thirds === 0){
          roundScores[this.state.currentPlayer] += 1000000
          this.setState({roundScores})
        } else { this.bankruptPlayer(); }
        break;
      case "WILD":
        this.setState({
          currentSpin: 500
        })
        break;
      case "FREE":
        break;

      default:
        this.setState({
          currentSpin: landed
        })
    }
  }
}

export default App;
