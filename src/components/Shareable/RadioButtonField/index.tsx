import React from "react";
import "./styles.scss";
import { Field } from "react-final-form";
import { required } from "helpers/fieldValidators";

export interface Props {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
}

const RadioButtonField: React.FC<Props> = ({
  name,
  label,
  options = [],
  className,
}) => {
  return (
    <div className={`radio-button-sigpae ${className}`}>
      {label && (
        <p className="label-radio">
          <span className="required-asterisk">*</span> {label}
        </p>
      )}
      {options.map((option, index) => (
        <label className="container-radio" key={index}>
          {option.label}
          <Field
            component="input"
            type="radio"
            value={option.value}
            name={name}
            validate={required}
          />
          <span className="checkmark" />
        </label>
      ))}
    </div>
  );
};

export default RadioButtonField;
