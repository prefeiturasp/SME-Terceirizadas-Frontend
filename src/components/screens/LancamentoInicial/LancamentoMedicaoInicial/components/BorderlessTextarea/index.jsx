import React from "react";

import "./styles.scss";

export default ({ input, disabled, meta }) => (
  <div
    className={`borderless-textarea${
      meta && meta.error && meta.touched ? " borderless-textarea-error" : ""
    }`}
  >
    <textarea {...input} disabled={disabled} rows={2} />
  </div>
);
