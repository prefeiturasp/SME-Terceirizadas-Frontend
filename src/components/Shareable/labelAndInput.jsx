import React, { Component } from "react";
import { Grid } from "./responsiveBs4";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "./custom.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import PropTypes from "prop-types";
import If from "./layout";

export const ErrorAlert = ({ meta }) => {
  const isVisible = meta !== undefined;
  var divStyle = {
    color: "red"
  };
  return (
    <If isVisible={isVisible}>
      <div>
        {meta.touched &&
          ((meta.error && <span style={divStyle}>{meta.error}</span>) ||
            (meta.warning && <span style={divStyle}>{meta.warning}</span>))}
      </div>
    </If>
  );
};

export const LabelAndInput = props => {
  return (
    <Grid cols={props.cols || ""} classNameArgs={props.classNameArgs || ""}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <input
        {...props.input}
        className="form-control"
        name={props.name}
        id={props.name}
        value={props.value}
        placeholder={props.placeholder}
        readOnly={props.readOnly || false}
        type={props.type}
        onChange={props.onChange}
      />
      <ErrorAlert meta={props.meta} />
    </Grid>
  );
};

export const LabelAndTextArea = props => {
  return (
    <Grid cols={props.cols}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <textarea
        {...props.input}
        id={props.name}
        className="form-control"
        rows="4"
        value={props.value}
        name={props.name}
      />
      <ErrorAlert meta={props.meta} />
    </Grid>
  );
};

export const LabelAndCombo = props => {
  const options = props.options || [
    { value: "...", label: "...", disable: false },
    { value: "***", label: "***", selected: true }
  ];
  return (
    <Grid cols={props.cols || ""}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <select {...props.input} name={props.name} className="form-control">
        {options.map((e, key) => {
          return (
            <option key={key} value={e.value} disabled={e.disabled}>
              {e.label}
            </option>
          );
        })}
      </select>
      <ErrorAlert meta={props.meta} />
    </Grid>
  );
};

export class LabelAndDate extends Component {
  // Thanks community :D
  // https://github.com/Hacker0x01/react-datepicker/issues/543

  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool
    }),
    placeholder: PropTypes.string
  };

  static defaultProps = {
    placeholder: ""
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.input.onChange(
      moment(date).format(this.props.dateFormat || "DD/MM/YYYY")
    );
  }

  render() {
    const { input, placeholder, meta } = this.props;

    return (
      <Grid cols={this.props.cols || ""} className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{this.props.label}</span>
        </div>
        <DatePicker
          {...input}
          placeholder={placeholder}
          dateFormat={this.props.dateFormat || "DD/MM/YYYY"}
          selected={input.value ? new Date() : null}
          className="form-control"
          onChange={this.handleChange}
          locale={ptBR}
        />
        <i className="fa fa-calendar fa-lg" />
        <ErrorAlert meta={meta} />
      </Grid>
    );
  }
}
