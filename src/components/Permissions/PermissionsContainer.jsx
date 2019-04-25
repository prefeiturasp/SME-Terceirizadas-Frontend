import React,{Component} from 'react'
import Permissions from './Permissions';

class PermissionsContainer extends Component {

  constructor(props){
    super(props)

    this.state = {

    }


  }

  render(){
    return (
      <Permissions {...this.state}  />
    )
  }

}

export default PermissionsContainer;
