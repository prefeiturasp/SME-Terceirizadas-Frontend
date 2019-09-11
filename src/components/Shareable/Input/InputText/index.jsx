import PropTypes from "prop-types";
import React from "react";
import "../style.scss";

export const InputText = props => {
  const {
    className,
    disabled,
    helpText,
    input,
    label,
    labelClassName,
    meta,
    name,
    placeholder,
    required
  } = props;
  return (
    <div className="input">
      {label && (
        <label htmlFor={name} className={`col-form-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        {...input}
        className={`form-control ${className} ${meta.touched &&
          meta.error &&
          "invalid-field"}`}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        required={required}
        type="text"
      />
      <div className="help-text">
        {helpText}
        {meta.touched &&
          ((meta.error && (
            <div className="error-message">{meta.error}</div>
          )) ||
            (meta.warning && (
              <div className="warning-message">{meta.warning}</div>
            )))}
      </div>
    </div>
  );
};

InputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

InputText.defaultProps = {
  className: "",
  disabled: false,
  helpText: "",
  input: {},
  label: "",
  labelClassName: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false
};

export default InputText;
