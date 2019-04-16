import React, { Component } from 'react'

class InputRowSupension extends Component {

  constructor(props) {
    super(props)

    this.state = {
      labelCheck: this.props.labelCheck,
      nameCheck: this.props.nameCheck,
      valueCheck: this.props.valueCheck,
      nameSelect: this.props.nameSelect,
      optionsSelect: this.props.optionsSelect,
      nameNumber: this.props.nameNumber,
      valueNumber: this.props.valueNumber,
    }
  }
  render() {
    return (
      <div className="form-row">
        <div className="form-check col-md-3 mr-4 ml-4">
          <input className="form-check-input" type="checkbox" name={this.state.nameCheck} value={this.props.valueCheck} />
          <label className="form-check-label"> {this.state.labelCheck}</label>
        </div>

        <div className="form-group col-md-5 mr-5">
          <select className="form-control" name={this.state.nameSelect}>
            <option>--SELECIONE--</option>
            {this.state.optionsSelect.map((value,key) =>{
              return <option value={value.key}>{value.value}</option>
            })}

          </select>
        </div>
        <div className="form-group col-md-2">
          <input type="number" name={this.state.nameNumber} required value={this.state.valueNumber} className="form-control" />
        </div>
      </div>
    );
  }
}

export default InputRowSupension;
