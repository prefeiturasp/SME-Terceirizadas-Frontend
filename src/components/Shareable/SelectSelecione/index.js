import React from "react";
import Select from "../Select";

const SelectSelecione = props => {
  const {
    input: { onChange, value },
    options,
    ...rest
  } = props;
  return (
    <Select
      naoDesabilitarPrimeiraOpcao={value !== undefined}
      options={
        value === ""
          ? [{ uuid: "0", nome: "Selecione..." }].concat(options)
          : options
      }
      input={{ value: value || "0", onChange }}
      {...rest}
    />
  );
};

export default SelectSelecione;
