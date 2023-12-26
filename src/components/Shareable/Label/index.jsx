import React from "react";
import "./style.scss";

export default ({ content, required, htmlFor }) => {
  return (
    <div className="custom-label">
      {required && <span className="required-asterisk">*</span>}
      <label htmlFor={htmlFor} className="col-form-label">
        {content}
      </label>
    </div>
  );
};
