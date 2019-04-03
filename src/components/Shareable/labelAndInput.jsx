import React from 'react'
import { Grid, toCssClasses } from './responsiveBs4'
import './shareable.css'

export function LabelAndInput(props) {
  return (<div className={props.classNameArgs || "form-group row"}>
    <label htmlFor={props.name} className={toCssClasses(props.colsLabel) + "col-form-label"}>
      {props.label}</label>
    <Grid cols={props.colsInput}>
      <input className="form-control" type={props.type} name={props.name}></input>
    </Grid>
  </div>)
}


export function LabelAndTextArea(props) {
  return (<div className="form-group row">
    <label htmlFor={props.name} className={toCssClasses(props.colsLabel) + "col-form-label"}>
      {props.label}</label>
    <Grid cols={props.colsInput}>
      <textarea className="form-control" rows="4" name={props.name}></textarea>
    </Grid>
  </div>)
}
