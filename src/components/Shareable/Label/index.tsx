import React, { ReactNode } from "react";

import "./style.scss";

interface LabelProps {
  content: ReactNode | string;
  required?: boolean;
  htmlFor?: string;
  disabled?: boolean;
}

export default ({ content, required, htmlFor }: LabelProps) => {
  return (
    <span className="custom-label">
      {required && <span className="required-asterisk">*</span>}
      <label htmlFor={htmlFor} className="col-form-label">
        {content}
      </label>
    </span>
  );
};
