import React, { Component } from "react";

export default class LinhaSolicitacao extends Component {
  render() {
    const { titulo, children } = this.props;
    return (
      <div>
        <div className="row title">
          <div className="col-12">{titulo}</div>
        </div>
        {children ? <div className="row">{children}</div> : ""}
      </div>
    );
  }
}
