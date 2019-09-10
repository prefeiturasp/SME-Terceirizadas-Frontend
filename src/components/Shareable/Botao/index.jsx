import PropTypes from "prop-types";
import React, { Component } from "react";
import { BUTTON_STYLE, BUTTON_TYPE } from "./constants";
import "./style.scss";

export default class Botao extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.string,
    texto: PropTypes.string,
    titulo: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    className: "",
    disabled: false,
    style: BUTTON_STYLE.GREEN,
    texto: "",
    titulo: "",
    type: BUTTON_TYPE.BUTTON,
  };

  render() {
    const {
      className,
      disabled,
      onClick,
      style,
      titulo,
      texto,
      type
    } = this.props;
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
  }
}
