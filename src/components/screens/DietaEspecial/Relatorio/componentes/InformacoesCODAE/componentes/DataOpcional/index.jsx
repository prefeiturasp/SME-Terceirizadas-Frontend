import ptBR from "date-fns/locale/pt-BR";
import moment from "moment";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import InputErroMensagem from "../../../../../../../Shareable/Input/InputErroMensagem";
import { HelpText } from "../../../../../../../Shareable/HelpText";
import "./style.scss";

export default class DataTermino extends Component {
  static defaultProps = {
    hasIcon: true,
    input: {
      value: new Date()
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      comData: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onComDataTerminoSelected = this.onComDataTerminoSelected.bind(this);
    this.onSemDataTerminoSelected = this.onSemDataTerminoSelected.bind(this);
    this.openDatepicker = this.openDatepicker.bind(this);
  }
  handleChange(data) {
    this.props.input.onChange(data);
  }
  onComDataTerminoSelected() {
    this.setState({ comData: true });
  }
  onSemDataTerminoSelected() {
    this.props.input.onChange("");
    this.setState({ comData: false });
  }
  openDatepicker() {
    this._calendar.setOpen(true);
    this._calendar.setFocus();
  }
  dataSelecionada(data) {
    if (data.length !== 0) {
      return moment(data, "DD/MM/YYYY")["_d"];
    } else {
      return null;
    }
  }
  render() {
    const {
      className,
      hasIcon,
      helpText,
      input,
      label,
      labelClassName,
      labelDesligado,
      labelLigado,
      meta,
      name,
      required,
      ...datePickerProps
    } = this.props;
    const { comData } = this.state;
    return (
      <div className="data-opcional">
        {label && [
          required && <span className="required-asterisk">*</span>,
          <label
            key={1}
            htmlFor={name}
            className={`col-form-label ${labelClassName}`}
          >
            {label}
          </label>
        ]}
        <div className="data-opcional-inner">
          <label className="container-radio">
            {labelDesligado}
            <input
              onChange={this.onSemDataTerminoSelected}
              type="radio"
              checked={!comData}
            />
            <span className="checkmark" />
          </label>
          <label className="container-radio">
            {labelLigado}
            <input
              onChange={this.onComDataTerminoSelected}
              type="radio"
              checked={comData}
            />
            <span className="checkmark" />
          </label>
          <DatePicker
            {...datePickerProps}
            isClearable={true}
            selected={this.dataSelecionada(input.value)}
            className={`form-control ${className} ${meta.touched &&
              meta.error &&
              "invalid-field"}`}
            ref={c => (this._calendar = c)}
            onChange={this.handleChange}
            locale={ptBR}
            name={name}
            disabled={!comData}
            dateFormat="dd/MM/yyyy"
            strictParsing
          />
          {hasIcon && (
            <i onClick={this.openDatepicker} className="fas fa-calendar-alt" />
          )}
        </div>
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
