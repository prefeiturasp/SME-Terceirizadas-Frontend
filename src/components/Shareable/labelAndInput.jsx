import React from 'react'
import { Grid, Input } from './responsiveBs4'
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import './custom.css'

export function LabelAndInput(props) {
  // TODO: add calendar icon case type=date
  return (
    <Grid cols={props.cols || ''}
      classNameArgs={props.classNameArgs || ''}>
      <label
        htmlFor={props.name}
        className={"col-form-label"}>
        {props.label}
      </label>
      <input
        name={props.name}
        id={props.name}
        className='form-control'
        value={props.value}
        placeholder={props.placeholder}





        readOnly={props.readOnly || false}
        type={props.type}
        onChange={props.onChange} />
    </Grid>)
}

export function LabelAndTextArea(props) {
  return (<Grid cols={props.cols}>
    <label htmlFor={props.name} className={"col-form-label"}>
      {props.label}</label>
    <textarea
      className="form-control"
      rows="4"
      value={props.value} name={props.name}>
    </textarea>
  </Grid>
  )
}

export function LabelAndCombo(props) {
  return (
    <Grid cols={props.cols || ''}>
      <label htmlFor={props.name} className={"col-form-label"}>{props.label}</label>
      <select name={props.name} className="form-control">
        <option selected>Selecione</option>
        <option>...</option>
      </select>
    </Grid>)
}


export const LabelWithDate = (props) => {
  return (
    <Grid cols={props.cols || ''} className="input-group">
      <div className="input-group-prepend">
        <span class="input-group-text">{props.label}</span>
      </div>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={props.selected}
        onChange={props.onChange}
        className="form-control"
        locale={ptBR} />
      <i className="fa fa-calendar fa-lg"></i>
    </Grid>)
}
