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
        size={size}
        onChange={onChange}
        placeholder={nameEmpty}
        onBlur={onBlur}
        disabled={disabled}
        format={format}
        value={horaAtual === "00:00" ? null : moment(horaAtual, "HH:mm")}
      />

      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};
