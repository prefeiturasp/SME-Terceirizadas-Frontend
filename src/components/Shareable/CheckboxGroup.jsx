import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import { ErrorAlert } from "./Alert";

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

  field = ({ input, meta, options, choicesNumberLimit }) => {
    const { name, onChange, onBlur, onFocus } = input;
    const inputValue = input.value;
    console.log(`pode escolher ate ${choicesNumberLimit} lanches... `)

    const checkboxes = options.map(({ label, value }, index) => {
      const checkHowManyWasClicked = ()=>{
        const arr = [...inputValue];
      }

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
      return (
        <label key={`checkbox-${index}`}>
          <input
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

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}
