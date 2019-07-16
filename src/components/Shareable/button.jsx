import PropTypes from "prop-types";
import React, { Component } from "react";
import If from "./layout";
import "./style.scss";

// https://getbootstrap.com/docs/4.0/components/buttons/
export var ButtonStyle = {
  Primary: "primary",
  Secondary: "secondary",
  Success: "success",
  Danger: "danger",
  Warning: "warning",
  Info: "info",
  Light: "light",
  Dark: "dark",
  Link: "link",

  OutlinePrimary: "outline-primary",
  OutlineSecondary: "outline-secondary",
  OutlineSuccess: "outline-success",
  OutlineDanger: "outline-danger",
  OutlineWarning: "outline-warning",
  OutlineInfo: "outline-info",
  OutlineLight: "outline-light",
  OutlineDark: "outline-dark",
  OutlineLink: "outline-link"
};

export var ButtonIcon = {
  TRASH: "trash",
  HOME: "home",
  EDIT: "edit",
  CLOSE: "close",
  FOLDER: "folder",
  POWER_OFF: "power-off"
};

export var ButtonType = {
  SUBMIT: "submit",
  BUTTON: "button",
  RESET: "reset"
};

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    type: ButtonType.BUTTON,
    style: ButtonStyle.Link,
    disabled: false
  };

  render() {
    const {
      type,
      style,
      className,
      onClick,
      disabled,
      label,
      title,
      icon
    } = this.props;
    return (
      <button
        type={type}
        title={title}
        className={`btn btn-styled btn-${style} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <If isVisible={icon}>
          <i className={`pr-3 fas fa-${icon}`} />
        </If>
        {label}
      </button>
    );
  }
}
