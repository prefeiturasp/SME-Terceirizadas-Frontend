import MultiSelect from "@khanacademy/react-multi-select";
import React from "react";

import { InputErroMensagem } from "components/Shareable/Input/InputErroMensagem";
import { HelpText } from "components/Shareable/HelpText";

export default ({
  input,
  meta,
  label,
  required,
  labelClassName,
  helpText,
  nomeDoItemNoPlural,
  pluralFeminino,
  ...props
}) => {
  const allItemsAreSelectedText = `${
    pluralFeminino ? "Todas as" : "Todos os"
  } ${nomeDoItemNoPlural} estão ${
    pluralFeminino ? "selecionadas" : "selecionados"
  }`;

  return (
    <div className="select">
      {label && [
        required && (
          <span key={0} className="required-asterisk">
            *
          </span>
        ),
        <label
          key={1}
          htmlFor={input.name}
          className={`${labelClassName || "col-form-label"}`}
        >
          {label}
        </label>
      ]}
      <MultiSelect
        {...props}
        {...input}
        //selected={periodo.tipos_alimentacao_selecionados}

        // options={formatarParaMultiselect(
        //   periodo.tipos_alimentacao
        // )}
        onSelectedChanged={input.onChange}
        disableSearch={props.disabled}
        selected={input.value}
        overrideStrings={{
          selectAll: pluralFeminino ? "Todas" : "Todos",
          allItemsAreSelected:
            input.value.length === 1
              ? props.options[0].label
              : allItemsAreSelectedText
        }}
        valueRenderer={(selected, options) => {
          if (selected.length === 0) {
            return "Selecione...";
          }
          if (selected.length === 1) {
            return selected.value;
          }

          if (selected.length === options.length) {
            return allItemsAreSelectedText;
          }

          return `Selecionou ${selected.length} ${nomeDoItemNoPlural}`;
        }}
      />
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};
