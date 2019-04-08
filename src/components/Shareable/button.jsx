import React, { Component } from "react";

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
  CLOSE: "close",
  FOLDER: "folder"
};

export var ButtonType = {
  SUBMIT: "submit",
  BUTTON: "button",
  RESET: "reset"
};

export default class BaseButton extends Component {
  // TODO: desabilitar o botao quando estiver fazendo uma ação.
  // TODO incrementar a logica de icone
  // VER> https://redux-form.com/8.1.0/examples/fieldlevelvalidation/
  render() {
    return (
      <button
        type={this.props.type || ButtonType.BUTTON}
        className={"btn btn-" + this.props.style + " " + this.props.className}
        onClick={this.props.onClick}
      >
        {this.props.label}
        <i class={"fa fa-" + this.props.icon} />
      </button>
    );
  }
}
// <button class="btn"><i class="fa fa-trash"></i> Trash</button>
