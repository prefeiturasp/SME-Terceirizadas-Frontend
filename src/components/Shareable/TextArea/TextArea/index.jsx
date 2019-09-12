import React from "react";
import PropTypes from "prop-types";
import InputErroMensagem from "../../Input/InputErroMensagem";
import "../style.scss";

export const TextArea = props => {
  const {
    className,
    disabled,
    helpText,
    input,
    label,
    meta,
    name,
    placeholder,
    required,
    type
  } = props;
  return (
    <div className="textarea">
      {label && [
        required && <span className="required-asterisk">*</span>,
        <label htmlFor={name} className="col-form-label">
          {label}
        </label>
      ]}
      <textarea
        {...input}
        className={`form-control ${className} ${meta.touched &&
          meta.error &&
          "invalid-field"}`}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      <div className="help-text">{helpText}</div>
      <InputErroMensagem meta={meta} />
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string
};

TextArea.defaultProps = {
  classNameInput: ""
};
