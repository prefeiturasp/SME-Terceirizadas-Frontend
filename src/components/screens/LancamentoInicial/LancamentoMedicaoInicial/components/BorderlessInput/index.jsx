import React from "react";

import "./styles.scss";

export default ({ input }) => (
  <div className="borderless-input">
    <input {...input} />
  </div>
);
