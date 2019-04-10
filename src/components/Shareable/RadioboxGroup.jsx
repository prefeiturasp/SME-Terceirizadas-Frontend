import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import { ErrorAlert } from "./Alert";

export default class RadioboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  };

  field = ({ input, meta, options }) => {
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
      return (
        <label key={`radio-${index}`}>
          <input
            type="radio"
            name={`${name}[${index}]`}
            value={value}
            checked={checked}
            onChange={handleChange}
            onFocus={onFocus}
          />
          <span>{label}</span>
        </label>
      );
    });

    return (
      <div>
        <div>{radioes}</div>
        <ErrorAlert meta={meta} />
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="radio" component={this.field} />;
  }
}
