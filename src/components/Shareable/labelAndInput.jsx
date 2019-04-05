import React from "react";
import { Grid, Input } from "./responsiveBs4";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "./custom.css";

export function LabelAndInput(props) {
  // TODO: add calendar icon case type=date
  return (
    <Grid cols={props.cols || ""} classNameArgs={props.classNameArgs || ""}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <input
        name={props.name}
        id={props.name}
        className="form-control"
        value={props.value}
        placeholder={props.placeholder}
        readOnly={props.readOnly || false}
        type={props.type}
        onChange={props.onChange}
      />
    </Grid>
  );
}

export function LabelAndTextArea(props) {
  return (
    <Grid cols={props.cols}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <textarea
        className="form-control"
        rows="4"
        value={props.value}
        name={props.name}
      />
    </Grid>
  );
}

export function LabelAndCombo(props) {
  const options = props.options || [{ value: "", label: "..." }];
  return (
    <Grid cols={props.cols || ""}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <select name={props.name} className="form-control">
        {options.map((e, key) => {
          return (
            <option
              value={e.value}
              selected={e.selected}
              disabled={e.disabled}
              label={e.label}
            />
          );
        })}
        {/* <option value="opcao1">Opcão1</option>
        <option value="opcao2">Opcão2</option>
        <option value="opcao3">Opcão3</option>
        <option value="opcao4">Opcão4</option>
        <option selected value="opcao5">...</option> */}
      </select>
    </Grid>
  );
}

export const LabelWithDate = props => {
  return (
    <Grid cols={props.cols || ""} className="input-group">
      <div className="input-group-prepend">
        <span class="input-group-text">{props.label}</span>
      </div>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={props.selected}
        onChange={props.onChange}
        className="form-control"
        locale={ptBR}
      />
      <i className="fa fa-calendar fa-lg" />
    </Grid>
  );
};
