import React from "react";

import "./styles.scss";

interface CheckboxComBordaProps {
  input: any;
  meta: any;
  label: string;
  disabled?: boolean;
}

const CheckboxComBorda = ({
  label,
  input,
  meta,
  disabled,
}: CheckboxComBordaProps) => {
  const estiloDaBorda = input.value ? "marcado" : "desmarcado";

  return (
    <div className={`checkbox-com-borda ${estiloDaBorda}`}>
      <input
        type="checkbox"
        className="checkbox-input"
        {...input}
        {...meta}
        id={input.name}
        checked={input.value}
        disabled={disabled}
      />
      <label htmlFor={input.name} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default CheckboxComBorda;
