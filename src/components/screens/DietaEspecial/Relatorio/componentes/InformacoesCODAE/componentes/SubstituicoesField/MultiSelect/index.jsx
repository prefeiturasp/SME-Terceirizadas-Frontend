import React from "react";
import StatefuMultiSelect from "@khanacademy/react-multi-select";
import "./style.scss";
import { HelpText } from "../../../../../../../../Shareable/HelpText";
import InputErroMensagem from "../../../../../../../../Shareable/Input/InputErroMensagem";

const MultiSelect = props => {
  const {
    helpText,
    label,
    input: { value, onChange },
    meta,
    name,
    required,
    ...rest
  } = props;
  return (
    <div className="select">
      {label && [
        required && (
          <span key={1} className="required-asterisk">
            *
          </span>
        ),
        <label key={2} htmlFor={name} className="col-form-label">
          {label}
        </label>
      ]}
      <StatefuMultiSelect
        selected={value || []}
        onSelectedChanged={selected => {
          onChange(selected);
        }}
        overrideStrings={{
          selectSomeItems: "Selecione",
          allItemsAreSelected: "Todos os itens estão selecionados",
          selectAll: "Todos"
        }}
        {...rest}
      />
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};
export default MultiSelect;
