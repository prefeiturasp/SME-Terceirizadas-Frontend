import React from "react";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import "./style.scss";
import { HelpText } from "../HelpText";
import InputErroMensagem from "../Input/InputErroMensagem";

export const MultiSelect = props => {
  const {
    disableSearch,
    helpText,
    label,
    meta,
    name,
    options,
    onSelectedChange,
    required,
    selected
  } = props;
  return (
    <div className="select">
      {label && [
        required && <span key={1} className="required-asterisk">*</span>,
        <label key={2} htmlFor={name} className="col-form-label">
          {label}
        </label>
      ]}
      <StatefulMultiSelect
        name={name}
        selected={selected}
        options={options}
        onSelectedChanged={onSelectedChange}
        disableSearch={disableSearch}
        overrideStrings={{
          selectSomeItems: "Selecione",
          allItemsAreSelected: "Todos os itens estão selecionados",
          selectAll: "Todos"
        }}
      />
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};
