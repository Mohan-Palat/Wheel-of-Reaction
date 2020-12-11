import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      players: ['red', 'yellow', 'blue'],
      scores: [0, 0, 0, 0],
      roundScores: [0, 0, 0, 0],
      currentPlayer: 0,
      currentSpin: ''
    };
    
  }
  render() {
    return (
      <div className="App">
        <h1>Hi</h1>
      </div>
    );
  }
  
  nextPlayer(){
    let currentPlayer = this.state.currentPlayer + 1;
    if (this.state.currentPlayer === 2){
      currentPlayer = 0;
    }
    this.setState = {currentPlayer};
  }

  bankruptPlayer(){
    let roundScores = this.state.roundScores;
    roundScores[this.state.currentPlayer] = 0;
    this.setState = {roundScores};
    this.nextPlayer();
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
          this.setState = {roundScores}
        } else { this.bankruptPlayer(); }
        break;
      case "WILD":
        this.setState = {
          currentSpin: 500
        }
        break;
      case "FREE":
        break;

      default:
        this.setState = {
          currentSpin: landed
        }

        




      
    }
  }
}

export default App;
