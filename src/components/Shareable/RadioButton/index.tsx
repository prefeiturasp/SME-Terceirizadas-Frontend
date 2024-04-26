import React from "react";
import "./styles.scss";
import { Field } from "react-final-form";
import { required } from "helpers/fieldValidators";

export interface Props {
  name: string;
  label: string;
  values: string[];
  labels: string[];
}

const RadioButton: React.FC<Props> = ({
  name,
  label,
  values = [],
  labels = [],
}) => {
  return (
    <div className="radio-button-sigpae">
      <p className="label-radio">
        <span className="required-asterisk">*</span> {label}
      </p>
      {labels.map((label, index) => (
        <label className="container-radio" key={index}>
          {label}
          <Field
            component="input"
            type="radio"
            value={values[index]}
            name={name}
            validate={required}
          />
          <span className="checkmark" />
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
