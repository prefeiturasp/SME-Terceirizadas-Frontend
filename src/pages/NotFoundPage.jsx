import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class NotFoundPage extends Component {
  render() {
    return (
      <div class="text-center">
        <div class="error mx-auto" data-text="404">404</div>
        <p class="lead text-gray-800 mb-5">Página não encontrada</p>
        <p class="text-gray-500 mb-0">Parece que você encontrou um bug na matrix...</p>
        <Link to="/">← Voltar para a página inicial</Link>
      </div>
    );
  }
}

export default NotFoundPage;
