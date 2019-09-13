import PropTypes from "prop-types";
import React from "react";
import "./style.scss";
import { InputErroMensagem } from "../Input/InputErroMensagem";
import { HelpText } from "../../Shareable/HelpText";

export const Select = props => {
  const {
    className,
    disabled,
    helpText,
    input,
    label,
    meta,
    name,
    onChange,
    options,
    required
  } = props;

  return (
    <div className="select">
      {label && [
        required && <span className="required-asterisk">*</span>,
        <label htmlFor={name} className="col-form-label">
          {label}
        </label>
      ]}
      <select
        {...input}
        className={`form-control ${className} ${meta.touched &&
          meta.error &&
          "invalid-field"}`}
        disabled={disabled}
        onChange={input ? input.onChange : onChange}
        name={name}
        required={required}
      >
        {options.map((e, key) => {
          return (
            <option
              key={key}
              value={e.uuid}
              selected={key === 0}
              disabled={e.disabled || key === 0}
            >
              {e.nome}
            </option>
          );
        })}
      </select>
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      uuid: PropTypes.string,
      disable: PropTypes.bool,
      selected: PropTypes.bool
    })
  ),
  name: PropTypes.string
};
Select.defaultProps = {
  options: [{ nome: "Selecione", uuid: "" }],
  disabled: false
};

export default Select;
