import React, { Component } from 'react';
import FoodSuspension from './FoodSuspension';

class FoodSuspensionContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      enrolled : 300
    }
  }

  state = {  }
  render() {
    return (
      <FoodSuspension enrolled={this.state.enrolled} />
    );
  }
}

export default FoodSuspensionContainer
