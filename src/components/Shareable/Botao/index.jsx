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
    onClick,
    style,
    titulo,
    texto,
    type
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
    >
      {icon && <i className={`${icon} ${texto && "text-and-icon"}`} />}
      {texto}
    </button>
  );
};

Botao.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
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
