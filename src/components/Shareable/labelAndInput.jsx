import React from 'react'
import { Grid } from './responsiveBs4'
import './custom.css'

export function LabelAndInput(props) {
  // TODO: add calendar icon case type=date
  return (
    <Grid cols={props.cols || ''} classNameArgs={props.classNameArgs || ''}>
      <label htmlFor={props.name} className={"col-form-label"}>{props.label}</label>
      <input className="form-control" value={props.value} type={props.type} name={props.name}></input>
    </Grid>)
}

export function LabelAndTextArea(props) {
  return (<Grid cols={props.cols}>
    <label htmlFor={props.name} className={"col-form-label"}>
      {props.label}</label>
    <textarea className="form-control" rows="4" name={props.name}></textarea>
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
