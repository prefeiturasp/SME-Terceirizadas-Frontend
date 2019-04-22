import React, { Component } from 'react'
import StatefulMultiSelect from '@khanacademy/react-multi-select';
import './custom.css';

export default class InputRowSupension extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEnable: false,
      numberStudents: 0,
      selectedOptions: []
    }
  }

  result(params) {
    console.log(params);
  }

  handleChangeCheck(event) {
    this.setState({ isEnable: event.target.checked })
  }

  handleSelectedChanged = (selectedOptions) => (
    this.setState({ selectedOptions })
  )


  handleClick(e) {
    this.setState({
      numberStudents: e.target.value
    })
  }


  render() {
    const { nameCheck, labelCheck, valueCheck, nameSelect, optionsSelect, nameNumber, multipleSelect, bg } = this.props
    const colors = {
      "1º Período - Matutino":"#FFF7CB",
      "2º Período - Intermediário":"#EAFFE3",
      "3º Período - Vespertino":"#FFEED6",
      "4º Período - Noturno":"#E4F1FF",
      "Integral":"#EBEDFF",
    }
    const { selectedOptions } = this.state;
    const styling = {marginLeft : "-1.4rem",background : colors[labelCheck], borderRadius : "7px"}
    return (
      <div className="form-row">
        <div className="form-check col-md-3 mr-4 ml-4">
          <div className="pl-5 pt-2 pb-2" style={styling}>
            <input
              className="form-check-input"
              type="checkbox"
              name={nameCheck}
              value={valueCheck}
              onChange={this.handleChangeCheck.bind(this)}
            />
            <label className="form-check-label"> {labelCheck}</label>
          </div>
        </div>
          <div className="form-group col-md-5 mr-5">
          {multipleSelect ?
            <div className={!this.state.isEnable ? "multiselect-wrapper-disabled" : "multiselect-wrapper-enabled"}>
              <StatefulMultiSelect
                selected={selectedOptions}
                options={optionsSelect}
                onSelectedChanged={this.handleSelectedChanged}
                disableSearch={true}
                overrideStrings={{
                  selectSomeItems: "--SELECIONE--",
                  allItemsAreSelected: "Todos os itens estão selecionados",
                  selectAll: "Todos"
                }}
                />
            </div>
          :
            <select className="form-control" name={nameSelect} disabled={!this.state.isEnable}>
              <option>--SELECIONE--</option>
              {optionsSelect.map((value, key) => {
                return <option value={value.value}>{value.label}</option>
              })}

            </select>
          }
          </div>

        <div className="form-group col-md-2">
          <input
            onChange={this.handleClick.bind(this)}
            type="number"
            name={nameNumber}
            value={this.state.numberStudents}
            disabled={!this.state.isEnable}
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

