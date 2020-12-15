//WHEEL OF FORTUNE SPINNER BUILT WITH CODE FROM THE FOLLOWING PROJECTS
//https://codepen.io/twentysix/pen/abopqNp
//https://codepen.io/andere_s/pen/oqvroJ

import React, {Component} from "react";
import './Wheel.scss';
import gsap from "gsap";
import { Controls, PlayState, Tween } from 'react-gsap';

class WheelContainer extends Component {
  constructor(props){
      super(props);

      this.state = {
        myStyle: {
            width: '800px', 
            height: '800px',  
            transform: 'rotate(0deg)',
            transition: 'transform 10s cubic-bezier(.08,.1,.15,1)'
        },
        arrow : "stop"

      }

  }

  spinWheel = () => {
    //spins wheel randomly 
    let myStyle = this.state.myStyle;
    let randomNum = 7.5;
    randomNum +=  180 + (15 * Math.round(Math.random() * 24));
    let transform = 'rotate('+ randomNum + 'deg)';
    this.setState({
      myStyle: {
        width: '800px', 
        height: '800px',  
        transform: transform,
        transition: '5s'
      },
      arrow :"play"
    });
    let position = randomNum % 360;
    console.log("Our position: "+position);
    this.onAssignSpin(position);
  };


  render (){
    return (
        <div className="container-fluid">
        <div onClick={this.spinWheel} className="game-btn spin-btn">Spin Wheel</div>

        <div className="wheel-container">
        
        <Tween playState={PlayState[this.state.arrow]}
          from={{rotation: 0 }}
          to={{ yoyo: true, rotation: -20, repeat: 40 }}
            duration={.1} >
            <div className="picker"></div>
        </Tween>
       
            <img
            className="wheel"
            src="https://wheel.fhtl.byu.edu/images/wheel.png"
            alt=""
            style={this.state.myStyle}
            />
        </div>
        </div>
    );
  }

onAssignSpin(position){
 this.props.handleAssignSpin(position)
}
  
}



export default WheelContainer;

