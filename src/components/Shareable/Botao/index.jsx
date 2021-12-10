import PropTypes from "prop-types";
import React from "react";
import { BUTTON_STYLE, BUTTON_TYPE } from "./constants";
import "./style.scss";

export const Botao = props => {
  const {
    accept,
    className,
    disabled,
    icon,
    iconPosition,
    onClick,
    style,
    titulo,
    texto,
    type,
    tabindex
  } = props;
  return (
    <button
      type={type}
      title={titulo}
      data-cy={texto}
      className={`general-button ${style} ${className}`}
      onClick={onClick}
      disabled={disabled}
      accept={accept}
      tabIndex={tabindex}
    >
      {iconPosition !== "right" && icon && (
        <i className={`${icon} ${texto && "text-and-icon-left"}`} />
      )}
      {texto}
      {iconPosition === "right" && icon && (
        <i className={`${icon} ${texto && "text-and-icon-right"}`} />
      )}
    </button>
  );
};

Botao.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  style: PropTypes.string,
  texto: PropTypes.string,
  titulo: PropTypes.string,
  type: PropTypes.string
};

Botao.defaultProps = {
  className: "",
  disabled: false,
  style: BUTTON_STYLE.GREEN,
  texto: "",
  titulo: "",
  type: BUTTON_TYPE.BUTTON
};

export default Botao;
