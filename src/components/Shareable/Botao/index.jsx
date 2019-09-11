import PropTypes from "prop-types";
import React from "react";
import { BUTTON_STYLE, BUTTON_TYPE } from "./constants";
import "./style.scss";

export const Botao = props => {
  const { className, disabled, onClick, style, titulo, texto, type } = props;
  return (
    <button
      type={type}
      title={titulo}
      className={`general-button ${style} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
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
