import React from "react";
import "./style.scss";

export const CleanCheckbox = props => {
  const { name, onClick, texto } = props;
  return (
    <div className="clean-checkbox-component">
      <label htmlFor="check" className="checkbox-label">
        <input component={"input"} type="checkbox" name={name} />
        <span onClick={onClick} className="checkbox-custom" /> {texto || props.children}
      </label>
    </div>
  );
};
