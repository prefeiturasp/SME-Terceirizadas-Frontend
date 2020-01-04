import React from "react";
import { TimePicker } from "antd";
import { InputErroMensagem } from "../InputErroMensagem";
import { HelpText } from "../../../Shareable/HelpText";
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
    nameEmpty,
    size,
    className,
    helpText,
    meta,
    horaAtual
  } = props;
  return (
    <div className={`input-horario ${className}`}>
      <TimePicker
        defaultValue={moment(horaAtual ? horaAtual : "00:00", format)}
        size={size}
        placeholder={nameEmpty}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        format={format}
      />
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};
