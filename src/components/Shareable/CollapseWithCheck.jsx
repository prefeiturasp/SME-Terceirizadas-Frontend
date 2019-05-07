import React, { Component } from 'react'
import {Collapse} from 'react-bootstrap'

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

        {/* <div id={dataTarget} className="collapse" aria-labelledby={idHeading} data-parent="#accordion"> */}
        <Collapse in={open}>  
          
          
          <div id={dataTarget} className="card-body">

            <ul className="list-group">
              <li className="list-group-item">
                <a className="btn btn-link" data-toggle="collapse" data-target="#teste" aria-expanded="false" aria-controls="collapsePermission" href="#tio"><i class="fas fa-clipboard-check"></i> Administrador</a>
              </li>


              <li className="list-group-item collapse pl-5" id="teste" aria-labelledby="teste">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" for="exampleCheck1">Permission 1</label>
                </div>
              </li>

              <li className="list-group-item collapse pl-5" id="teste" aria-labelledby="teste">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" for="exampleCheck1">Permission 2</label>
                </div>
              </li>

              <li className="list-group-item collapse pl-5" id="teste" aria-labelledby="teste">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" for="exampleCheck1">Permission 3</label>
                </div>
              </li>
            </ul>
          </div>


          </Collapse>
        {/* </div> */}
      </div>
    );
  }
}

export default CollapseWithCheck;
