import React from "react";

import "./styles.scss";

interface CheckboxComBordaProps {
  input: any;
  meta: any;
  label: string;
}

const CheckboxComBorda = ({ input, meta, label }: CheckboxComBordaProps) => {
  const estiloDaBorda = input.value ? "marcado" : "desmarcado";

  return (
    <div className={`checkbox-com-borda ${estiloDaBorda}`}>
      <input
        type="checkbox"
        className="checkbox-input"
        id={input.name}
        {...input}
        {...meta}
      />
      <label htmlFor={input.name} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default CheckboxComBorda;
