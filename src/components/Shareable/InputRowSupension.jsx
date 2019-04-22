import React, { Component } from 'react'
import StatefulMultiSelect from '@khanacademy/react-multi-select';
import './custom.css';

export default class InputRowSupension extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEnable: false,
      numberStudents: 0,
      type: null,
      period : null
      selectedOptions: [],
      isEnable2: false
    }

    this.handleNumberStudents = this.handleNumberStudents.bind(this)
  }

  handleChangeCheck(event) {

    let checked = event.target.checked
    let value = event.target.value


    if(!checked){
      this.setState({
        isEnable2 : false,
        period : value
      })
    }

    this.setState({
      isEnable: checked,
    })

  }

  handleSelectedChanged = (selectedOptions) => (
    this.setState({ selectedOptions })
  )


  handleNumberStudents(e) {
    let value = e.target.value

    if(value > 0 || value !== null || value !== '' || value !== '0'){
      this.props.verifyChecked(true)
    }else{
      this.props.verifyChecked(false)
    }

    this.setState({
      numberStudents: value
    })
  }

  handleValidSelect(e){
    let value = e.target.value



    if(value > 0){
      this.setState({isEnable2 : true, type : value})
    }else{
      this.setState({isEnable2 : false})
    }
  }

  handleOnBlurNumber(e){
    let select = {
      idPeriod : this.state.period,
      type : this.state.type,
      count : this.state.numberStudents
    }

    this.props.getPeriods(select)
  }


  render() {
    const { nameCheck, labelCheck, valueCheck, nameSelect, optionsSelect, nameNumber, multipleSelect } = this.props
    const colors = {
      "1º Período - Matutino": "#FFF7CB",
      "2º Período - Intermediário": "#EAFFE3",
      "3º Período - Vespertino": "#FFEED6",
      "4º Período - Noturno": "#E4F1FF",
      "Integral": "#EBEDFF",
    }
    const { selectedOptions } = this.state;
    const styling = {marginLeft : "-1.4rem", background : colors[labelCheck], borderRadius : "7px"}
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
          <select className="form-control"
                  name={nameSelect}
                  id={nameSelect}
                  disabled={!this.state.isEnable}
                  onChange={this.handleValidSelect.bind(this)}>
            <option value="0">--SELECIONE--</option>
            {optionsSelect.map((value, key) => {
              return <option key={key} value={value.key}>{value.value}</option>
            })}


            </select>
          }
          </div>
        <div className="form-group col-md-2">
          <input
            onBlur={this.handleOnBlurNumber.bind(this)}
            onChange={this.handleNumberStudents}
            type="number"
            max={this.props.enrolled}
            name={nameNumber}
            value={this.state.numberStudents}
            disabled={!this.state.isEnable2}
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

