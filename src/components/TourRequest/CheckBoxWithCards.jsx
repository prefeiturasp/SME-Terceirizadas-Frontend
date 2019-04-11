import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import { ErrorAlert } from "../Shareable/Alert";
import jq from "jquery";
import { Grid } from "../Shareable/responsiveBs4";

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

  const checkboxes = options.map(({ label, value, foodList }, index) => {
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
    const checkStyle = {
      width: "1em",
      height: "1em"
    };
    const headerStyle = {
      "font-style": "normal",
      "font-weight": "bold",
      "font-size": "18px",
      "line-height": "normal",
      color: "#035D96"
    };
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div class="card-header" style={headerStyle}>
          {label}
          <div className="form-check  form-check-inline float-right">
            <input
              className="compare_items form-check-input"
              type="checkbox"
              value={value}
              style={checkStyle}
              name={`${name}[${index}]`}
              id={`checkbox-${index}`}
              checked={checked}
              onChange={handleChange}
              onFocus={onFocus}
            />
          </div>
        </div>
        <ul class="list-group list-group-flush">
          {foodList.map((e, key) => {
            return <li className="list-group-item">{e}</li>;
          })}
        </ul>
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
export default class CheckboxWithCards extends Component {
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
