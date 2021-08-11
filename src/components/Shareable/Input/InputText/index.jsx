import PropTypes from "prop-types";
import React from "react";
import { InputErroMensagem } from "../InputErroMensagem";
import { HelpText } from "../../../Shareable/HelpText";
import { ContadorCaracteres } from "../../ContadorCaracteres";
import "../style.scss";
import TooltipIcone from "../../TooltipIcone";

export const InputText = props => {
  const {
    acrescentarAppend,
    className,
    disabled,
    esconderAsterisco,
    helpText,
    input,
    label,
    labelClassName,
    meta,
    min,
    max,
    name,
    placeholder,
    required,
    type,
    inputType,
    title,
    tooltipText,
    maxlength,
    pattern,
    icone,
    contador,
    toUppercaseActive
  } = props;
  return (
    <div className={`input ${icone && "icon"}`}>
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
      <input
        {...input}
        className={`form-control ${className} ${meta &&
          meta.touched &&
          (meta.error || meta.warning) &&
          "invalid-field"}`}
        disabled={disabled}
        min={min}
        max={max}
        name={name}
        data-cy={input.name}
        placeholder={placeholder}
        required={required}
        type={inputType ? inputType : type}
        title={title}
        pattern={pattern}
        maxLength={maxlength}
        onInput={e => {
          e.target.value = toUppercaseActive
            ? e.target.value.toUpperCase()
            : e.target.value;
        }}
      />
      {acrescentarAppend && (
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon1">
            {acrescentarAppend}
          </span>
        </div>
      )}
      {icone && <i className={icone} />}
      {contador && (
        <ContadorCaracteres atual={input.value.length} max={contador} />
      )}
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};

InputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  contador: PropTypes.number
};

InputText.defaultProps = {
  className: "",
  disabled: false,
  esconderAsterisco: false,
  helpText: "",
  input: {},
  label: "",
  labelClassName: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false,
  type: "text"
};

export default InputText;
