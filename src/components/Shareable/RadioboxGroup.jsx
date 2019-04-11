import PropTypes from "prop-types";
import React, { Component } from "react";
import { Field } from "redux-form";
import { ErrorAlert } from "./Alert";

export const field = ({ input, meta, options }) => {
  const { name, onChange, onBlur, onFocus } = input;
  const inputValue = input.value;

  const radioes = options.map(({ label, value }, index) => {
    const handleChange = event => {
      let selected = "";
      if (event.target.checked) {
        selected = value;
      }
      onBlur(selected);
      return onChange(selected);
    };
    const checked = inputValue.includes(value);
    const style = {
      width: "2em",
      height: "2em"
    };
    return (
      <div className="form-check  form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value={value}
          style={style}
          name={`${name}[${index}]`}
          id={`radio-${index}`}
          checked={checked}
          onChange={handleChange}
          onFocus={onFocus}
        />
        <label className="form-check-label ml-2" htmlFor={`radio-${index}`}>
          {`${label}`}
        </label>
      </div>
    );
  });

  return (
    <div>
      <div>{radioes}</div>
      <ErrorAlert meta={meta} />
    </div>
  );
};

export default class RadioboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    return <Field {...this.props} component={field} />;
  }
}
