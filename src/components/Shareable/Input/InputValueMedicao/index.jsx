import React from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import "../style.scss";

export const InputText = props => {
  const {
    className,
    disabled,
    esconderAsterisco,
    input,
    label,
    labelClassName,
    meta,
    min,
    step,
    max,
    name,
    placeholder,
    required,
    type,
    inputType,
    title,
    maxlength,
    pattern,
    icone,
    toUppercaseActive,
    apenasNumeros,
    exibeTooltipDiaSobremesaDoce
  } = props;

  let msgTooltip = "";

  const validacaoMeta = () => {
    return meta && (meta.error || meta.warning);
  };

  const validacaoFrequencia = () => {
    if (validacaoMeta() && input.name.includes("frequencia")) {
      msgTooltip = meta.error;
      return true;
    }
    return false;
  };

  const validacaoLancheRefeicaoSobremesa1Oferta = () => {
    if (
      validacaoMeta() &&
      (input.name.includes("refeicao") ||
        input.name.includes("sobremesa") ||
        input.name.includes("lanche")) &&
      !input.name.includes("repeticao")
    ) {
      msgTooltip = meta.error;
      return true;
    }
    return false;
  };

  return (
    <div className={`input ${icone && "icon"}`}>
      {label && [
        required && !esconderAsterisco && (
          <span key={0} className="required-asterisk">
            *
          </span>
        ),
        <label
          key={1}
          htmlFor={name}
          className={`col-form-label ${labelClassName}`}
        >
          {label}
        </label>
      ]}
      {exibeTooltipDiaSobremesaDoce && (
        <Tooltip
          title={
            "Dia de sobremesa doce. Justifique o lançamento de repetição nas observações."
          }
        >
          <i className="fas fa-info icone-info-success" />
        </Tooltip>
      )}
      {(validacaoFrequencia() || validacaoLancheRefeicaoSobremesa1Oferta()) && (
        <Tooltip title={msgTooltip}>
          <i className="fas fa-info icone-info-error" />
        </Tooltip>
      )}

      <input
        {...input}
        className={`form-control ${className} ${(validacaoFrequencia() ||
          validacaoLancheRefeicaoSobremesa1Oferta()) &&
          "invalid-field"}`}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        name={name}
        data-cy={input.name}
        placeholder={placeholder}
        required={required}
        type={inputType ? inputType : type}
        title={title}
        pattern={pattern}
        maxLength={maxlength}
        onInput={e => {
          e.target.value = toUppercaseActive
            ? e.target.value.toUpperCase()
            : e.target.value;
          e.target.value = apenasNumeros
            ? e.target.value.replace(/\D/g, "")
            : e.target.value;
        }}
      />
    </div>
  );
};

InputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  step: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  contador: PropTypes.number
};

InputText.defaultProps = {
  className: "",
  disabled: false,
  esconderAsterisco: false,
  helpText: "",
  input: {},
  label: "",
  step: "0.01",
  labelClassName: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false,
  type: "text"
};

export default InputText;
