import MultiSelect from "@khanacademy/react-multi-select";
import React from "react";

import { InputErroMensagem } from "components/Shareable/Input/InputErroMensagem";
import { HelpText } from "components/Shareable/HelpText";

import "./styles.scss"

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
  console.log('MultiSelect', {
    input,
    meta,
    label,
    required,
    labelClassName,
    helpText,
    nomeDoItemNoPlural,
    pluralFeminino,
    props
  })
  const allItemsAreSelectedText = `${
    pluralFeminino ? "Todas as" : "Todos os"
  } ${nomeDoItemNoPlural} estão ${
    pluralFeminino ? "selecionadas" : "selecionados"
  }`;

  return (
    <div className="select final-form-multi-select">
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
      {!props.disabled && <MultiSelect
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
      />}
      {props.disabled && <input
        className={`form-control ${meta &&
          meta.touched &&
          (meta.error || meta.warning) &&
          "invalid-field"}`}
        disabled={props.disabled}
        data-cy={input.name}
        required={required}
        value={input.value[0] && props.options.find(e => e.value === input.value[0]).label}
      />}
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};
