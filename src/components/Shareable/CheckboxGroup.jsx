import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import { ErrorAlert } from "./Alert";
import $ from "jquery";

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
      checkboxesSensitivity(choicesNumberLimit);
      const arr = [...inputValue];
      if (checkAll) {
        const allCheckboxes = [];
        const checks = $("input.compare_items").each(() => {
          allCheckboxes.push($(this).val());
        });
        checks.map(index => {
          arr.push(checks[index].value);
        });
      } else {
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
      }
      onBlur(arr);
      return onChange(arr);
    };

    const checked = inputValue.includes(value);
    return (
      <label key={`checkbox-${index}`}>
        <input
          className="compare_items"
          type="checkbox"
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

function checkboxesSensitivity(choicesNumberLimit) {
  const checkedArr = [];
  const unCheckedArr = [];
  let checked = $("input.compare_items:checked").each(() => {
    checkedArr.push($(this).val());
  });
  let unchecked = $("input.compare_items:not(:checked)").each(() => {
    unCheckedArr.push($(this).val());
  });
  if (checked.length >= choicesNumberLimit) {
    unchecked.map(index => {
      unchecked[index].disabled = true;
    });
  } else {
    unchecked.map(index => {
      unchecked[index].disabled = false;
    });
  }
}
