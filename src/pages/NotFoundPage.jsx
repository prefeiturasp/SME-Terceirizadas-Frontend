import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-5">Página não encontrada</p>
        <p className="text-gray-500 mb-0">
          Parece que você encontrou um bug na matrix...
        </p>
        <Link to="/">← Voltar para a página inicial</Link>
      </div>
    );
  }
}

export default NotFoundPage;
