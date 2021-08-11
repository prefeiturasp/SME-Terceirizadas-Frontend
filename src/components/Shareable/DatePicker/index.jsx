import ptBR from "date-fns/locale/pt-BR";
import PropTypes from "prop-types";
import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateDelta } from "../../../helpers/utilities";
import "./style.scss";
import { HelpText } from "../HelpText";
import TooltipIcone from "../TooltipIcone";
import InputErroMensagem from "../Input/InputErroMensagem";

export class InputComData extends Component {
  // Thanks community :D
  // https://github.com/Hacker0x01/react-datepicker/issues/543

  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.instanceOf(Date).isRequired
      ])
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool
    }),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    dateFormat: PropTypes.string,
    dateFormatPicker: PropTypes.string,
    tooltipText: PropTypes.string,
    writable: PropTypes.bool,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date)
  };

  static defaultProps = {
    placeholder: "",
    dateFormat: "DD/MM/YYYY",
    dateFormatPicker: "dd/MM/yyyy",
    minDate: dateDelta(0),
    maxDate: dateDelta(360),
    disabled: false,
    fullScreen: false,
    inline: false,
    hasIcon: true,
    writable: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.input.onChange(
      this.props.writable
        ? date
        : moment(date).format(
            this.props.dateFormat || this.defaultProps.dateFormat
          )
    );
  }

  openDatepicker = () => {
    this._calendar.setOpen(true);
    this._calendar.setFocus();
  };

  dataSelecionada(data) {
    if (data.length !== 0) {
      return moment(data, this.props.dateFormat)["_d"];
    } else {
      return null;
    }
  }

  render() {
    const {
      activeCalendar,
      className,
      dateFormatPicker,
      disabled,
      fullScreen,
      hasIcon,
      helpText,
      inline,
      input,
      label,
      labelClassName,
      maxDate,
      meta,
      minDate,
      name,
      placeholder,
      required,
      showMonthDropdown,
      showMonthYearPicker,
      showYearDropdown,
      textoLabel,
      popperPlacement,
      tooltipText,
      visitedError
    } = this.props;
    return (
      <div className="datepicker">
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
        {tooltipText && <TooltipIcone tooltipText={tooltipText} />}
        <div
          className={
            activeCalendar
              ? "input-group active-calendar"
              : textoLabel
              ? "input-group calendar"
              : "input-group"
          }
        >
          {textoLabel && (
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                {textoLabel}
              </span>
            </div>
          )}
          <DatePicker
            {...input}
            placeholderText={placeholder}
            showMonthDropdown={showMonthDropdown}
            showMonthYearPicker={showMonthYearPicker}
            showYearDropdown={showYearDropdown}
            dateFormat={dateFormatPicker}
            isClearable={true}
            withPortal={fullScreen}
            inline={inline}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            selected={this.dataSelecionada(input.value)}
            className={`form-control ${className} ${meta.touched &&
              meta.error &&
              "invalid-field"}`}
            ref={c => (this._calendar = c)}
            onChange={this.handleChange}
            locale={ptBR}
            name={name}
            popperPlacement={popperPlacement || undefined}
          />
          {hasIcon && (
            <i onClick={this.openDatepicker} className="fas fa-calendar-alt" />
          )}
        </div>
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} visitedError={visitedError} />
      </div>
    );
  }
}
