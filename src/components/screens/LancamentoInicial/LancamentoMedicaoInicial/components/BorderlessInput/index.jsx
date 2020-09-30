import React from "react";

import "./styles.scss";

export default ({ input, disabled, meta }) => {
  if (input && input.name === 'obs_diarias_1') console.log('meta', meta)
  return (
  <div className={`borderless-input${meta && meta.error ? " borderless-input-error" : ""}`}>
    <input {...input} disabled={disabled} />
  </div>
)};
