import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import { ErrorAlert } from "./Alert";
import jq from "jquery";

function selectAll(onBlur, onChange) {
  const arr = [];
  const allCheckboxes = [];
  const checks = jq("input.compare_items").each(() => {
    allCheckboxes.push(jq(this).val());
  });
  checks.map(index => {
    arr.push(checks[index].value);
  });
  onBlur(arr);
  return onChange(arr);
}

function checkboxesSensitivity(choicesNumberLimit) {
  const checkedArr = [];
  const unCheckedArr = [];
  let checked = jq("input.compare_items:checked").each(() => {
    checkedArr.push(jq(this).val());
  });
  let unchecked = jq("input.compare_items:not(:checked)").each(() => {
    unCheckedArr.push(jq(this).val());
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
      if (checkAll) {
        return selectAll(onBlur, onChange);
      }
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
