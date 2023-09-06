import React from "react";

export default ({ content, required, htmlFor }) => {
  return (
    <>
      {required && <span className="required-asterisk">*</span>}
      <label htmlFor={htmlFor} className="col-form-label">
        {content}
      </label>
    </>
  );
};
