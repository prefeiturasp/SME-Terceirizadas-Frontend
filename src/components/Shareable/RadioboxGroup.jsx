import React from "react";
import { Grid } from "./responsiveBs4";
import "./custom.css";
import "react-datepicker/dist/react-datepicker.css";
import { Field } from "redux-form";

export const RadioboxGroup = props => {
  // Thanks! https://codeburst.io/forms-with-redux-form-v7-part-2-of-2-f44ffee4a34d
  if (props && props.input && props.options) {
    const renderRadioButtons = (key, index) => {
      return (
        <label
          className="sans-serif w-100"
          key={`${index}`}
          htmlFor={`${props.input.name}-${index}`}
        >
          <Field
            id={`${props.input.name}`}
            component="input"
            name={props.input.name}
            type="radio"
            value={key}
            className="mh2"
          />
          {props.options[key]}
        </label>
      );
    };
    return (
      <Grid cols={props.cols || ""}>
        {props.options && Object.keys(props.options).map(renderRadioButtons)}
      </Grid>
    );
  }
  return <div />;
};
