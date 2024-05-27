import React, { ReactNode } from "react";

import "./style.scss";

interface LabelProps {
  content: ReactNode | string;
  required?: boolean;
  htmlFor?: string;
  disabled?: boolean;
  className?: string;
}

export default ({ content, required, htmlFor, className }: LabelProps) => {
  return (
    <span className={`custom-label ${className}`}>
      {required && <span className="required-asterisk">*</span>}
      <label htmlFor={htmlFor} className="col-form-label">
        {content}
      </label>
    </span>
  );
};
