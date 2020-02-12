import React, { Component } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Shareable/Page/Page";

class NotFoundPage extends Component {
  render() {
    return (
      <Page>
        <div />
        <div className="text-center">
          <div className="error mx-auto" data-text="403">
            403
          </div>
          <p className="lead text-gray-800 mb-5">
            Sem permissão para acessar esta página
          </p>
          <Link to="/">← Voltar para a página inicial</Link>
        </div>
      </Page>
    );
  }
}

export default NotFoundPage;
