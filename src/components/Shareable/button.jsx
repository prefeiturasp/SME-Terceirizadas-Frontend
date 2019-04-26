import React, { Component } from "react";
import If from "./layout";
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

export default class BaseButton extends Component {
  render() {
    return (
      <button
        type={this.props.type || ButtonType.BUTTON}
        className={`btn btn-${this.props.style} ${this.props.className}`}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.label}
        <If isVisible={this.props.icon}>
          <i className={`fa fa-${this.props.icon}`} />
        </If>
      </button>
    );
  }
}
