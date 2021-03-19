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
    maxLength
  } = props;
  return (
    <div className="textarea">
      {label && [
        required && (
          <span key={1} className="required-asterisk">
            *
          </span>
        ),
        <label key={2} htmlFor={name} className="col-form-label">
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
        maxLength={maxLength}
        required={required}
      />
      <div className="help-text">{helpText}</div>
      <InputErroMensagem meta={meta} />
    </div>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

TextArea.defaultProps = {
  className: "",
  disabled: false,
  helpText: "",
  input: {},
  label: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false
};
