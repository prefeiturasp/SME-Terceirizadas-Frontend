import PropTypes from "prop-types";
import React, { Component } from "react";
import { Field } from "redux-form";
import { ErrorAlert } from "./Alert";

export const field = ({
  input,
  meta,
  options,
  choicesNumberLimit,
  checkAll
}) => {
  const { name, onChange, onBlur, onFocus } = input;
  const inputValue = input.value;

  const checkboxes = options.map(({ label, value }, index) => {
    const handleChange = event => {
      const arr = [...inputValue];
      if (event.target.checked) {
        arr.push(value);
      } else {
        arr.splice(arr.indexOf(value), 1);
      }
      onBlur(arr);
      return onChange(arr);
    };
    const checked = inputValue.includes(value);
    const style = {
      width: "2em",
      height: "2em"
    };
    return (
      <div className="form-check  form-check-inline">
        <input
          className="compare_items form-check-input"
          type="checkbox"
          value={value}
          style={style}
          name={`${name}[${index}]`}
          id={`checkbox-${index}`}
          checked={checked}
          onChange={handleChange}
          onFocus={onFocus}
        />
        <label className="form-check-label ml-2" htmlFor={`checkbox-${index}`}>
          {`${label}`}
        </label>
      </div>
    );
  });

  return (
    <div>
      <div>{checkboxes}</div>
      <ErrorAlert meta={meta} />
    </div>
  );
};

//Thanks community: https://github.com/erikras/redux-form/issues/1037
export default class CheckboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    return <Field {...this.props} component={field} />;
  }
}
