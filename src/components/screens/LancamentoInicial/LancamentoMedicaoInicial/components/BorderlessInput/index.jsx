import React from "react";

import "./styles.scss";

export default ({ input, disabled, meta }) => (
  <div
    className={`borderless-input${
      meta && meta.error && meta.touched ? " borderless-input-error" : ""
    }`}
  >
    <input {...input} disabled={disabled} />
  </div>
);
