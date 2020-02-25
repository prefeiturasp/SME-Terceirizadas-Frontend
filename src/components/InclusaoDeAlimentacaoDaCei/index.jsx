import React, { Component } from "react";
import { reduxForm } from "redux-form";

const ENTER = 13;

class InclusaoDeAlimentacaoDaCei extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form
            onSubmit={this.props.handleSubmit}
            onKeyPress={this.onKeyPress}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "inclusaoAlimentacaoDaCei"
})(InclusaoDeAlimentacaoDaCei);
