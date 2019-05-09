import React, { Component } from 'react'
import {Collapse} from 'react-bootstrap'
import CollapseProfile from './CollapseProfile';

class CollapseWithCheck extends Component {

  constructor(props, context){
    super(props, context)

    this.state = {
      open : false
    }
  }

  handleClick = ()=>{
    this.setState({
      open : !this.state.open
    })
  }


  render() {
    const { idHeading, dataTarget, labelLink } = this.props
    const styling = { color: "#686868", fontSize: "14px" }
    
    const {open} = this.state

    return (
      <div className="card mb-2">
        <div className="card-header" id={idHeading}>
          <h5 className="mt-2 float-left">{labelLink}</h5>
          <h5 className="mb-0 float-right">


            <button className="btn btn-link" 
                    arial-expanded={open}
                    aria-controls={dataTarget}
                    onClick={this.handleClick.bind(this)}>
              <span style={styling} >
                <i className="fas fa-chevron-down"></i>
              </span>
            </button>


          </h5>
        </div>

        <Collapse in={open}>  
          
          
          <div id={dataTarget} className="card-body">

            <CollapseProfile 
                labelProfile={"Adminstrador"} 
                idProfile={"teste"}
              />
          </div>

          </Collapse>
      </div>
    );
  }
}

export default CollapseWithCheck;
