import React from "react";
import { Field } from "redux-form";
import "./style.scss";

export const Checkbox = props => {
  const { input, onClick, texto } = props;
  console.log(input.name);
  return (
    <div className="checkbox-component">
      <label htmlFor="check" className="checkbox-label">
        <Field {...input} component={"input"} type="checkbox" name={input.name} />
        <span onClick={onClick} className="checkbox-custom" /> {texto}
      </label>
    </div>
  );
};
