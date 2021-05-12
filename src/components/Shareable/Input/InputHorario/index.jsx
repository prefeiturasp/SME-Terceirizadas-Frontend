import React from "react";
import { TimePicker } from "antd";
import { InputErroMensagem } from "../InputErroMensagem";
import { HelpText } from "../../../Shareable/HelpText";
import TooltipIcone from "../../TooltipIcone";
import "antd/dist/antd.css";
import "./style.scss";
import moment from "moment";

const format = "HH:mm";

export const InputHorario = props => {
  const {
    input: { onChange, onBlur }
  } = props;
  const {
    disabled,
    placeholder,
    size,
    className,
    helpText,
    meta,
    horaAtual,
    required,
    label,
    esconderAsterisco,
    labelClassName,
    name,
    onChangeFunction,
    functionComponent,
    tooltipText
  } = props;
  return (
    <div className={`input-horario ${className}`}>
      {label && [
        required && !esconderAsterisco && (
          <span key={0} className="required-asterisk">
            *
          </span>
        ),
        <label
          key={1}
          htmlFor={name}
          className={`col-form-label ${labelClassName}`}
        >
          {label}
        </label>
      ]}
      {tooltipText && <TooltipIcone tooltipText={tooltipText} />}
      <TimePicker
        defaultOpenValue={moment("00:00", "HH:mm")}
        size={size}
        onChange={!functionComponent ? onChange : onChangeFunction}
        placeholder={placeholder}
        onBlur={onBlur}
        disabled={disabled}
        format={format}
        className={`${meta &&
          meta.touched &&
          (meta.error || meta.warning) &&
          "invalid-field"}`}
        value={horaAtual === "00:00" ? null : moment(horaAtual, "HH:mm")}
      />

      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};
