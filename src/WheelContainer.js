//WHEEL OF FORTUNE SPINNER BUILT WITH CODE FROM THE FOLLOWING PROJECTS
//https://codepen.io/twentysix/pen/abopqNp
//https://codepen.io/andere_s/pen/oqvroJ

import React, {Component} from "react";
import './Wheel.scss';
import {PlayState, Tween } from 'react-gsap';

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
        arrow : "stop",
        clicked: false
      }

  }

  spinWheel = () => {

    if(this.state.clicked){
      return;
    }

    //spins wheel randomly 
    let randomNum = 7.5;
    randomNum +=  180 + (15 * Math.round(Math.random() * 24));
    let transform = 'rotate('+ randomNum + 'deg)';
    this.setState({
      myStyle: {
        width: '800px', 
        height: '800px',  
        transform: transform,
        transition: '3s'
      },
      arrow :"play",
      clicked: true
    });
    setTimeout(() => { 
      this.setState({arrow:"stop"});
      let position = randomNum % 360;
      console.log("Our position: "+position);
      this.onAssignSpin(position); 
    }, 3000);
    
  };


  render (){
    return (
        <div className="container-fluid">

        <div className="wheel-container">
        
        <Tween playState={PlayState[this.state.arrow]}
          from={{rotation: 0 }}
          to={{ yoyo: true, rotation: -20, repeat: 30}}
            duration={.1} >
            <div className="picker"></div>
        </Tween>
       
            <img
            className="wheel"
            src="https://wheel.fhtl.byu.edu/images/wheel.png"
            alt=""
            style={this.state.myStyle}
            onClick={this.spinWheel}
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


