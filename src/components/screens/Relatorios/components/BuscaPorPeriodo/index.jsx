import React, { Component } from "react";
import { meusDados } from "../../../../../services/perfil.service";
import FiltrosDeBusca from "./FiltrosDeBusca";
import {
  usuarioEscola,
  usuarioDiretoriaRegional
} from "../../../../../helpers/utilities";

class BuscaPorPeriodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      escolas: null,
      diretoriasRegionais: null
    };
  }

  componentDidMount() {
    let escolas = null;
    let diretoriasRegionais = null;
    meusDados().then(meusDados => {
      if (usuarioEscola()) {
        escolas = [
          {
            nome: meusDados.vinculo_atual.instituicao.nome,
            uuid: meusDados.vinculo_atual.instituicao.uuid
          }
        ];
        diretoriasRegionais = [
          meusDados.vinculo_atual.instituicao.diretoria_regional
        ];
      } else if (usuarioDiretoriaRegional()) {
        escolas = meusDados.vinculo_atual.instituicao.escolas;
        diretoriasRegionais = [
          {
            nome: meusDados.vinculo_atual.instituicao.nome,
            uuid: meusDados.vinculo_atual.instituicao.uuid
          }
        ];
      }
      this.setState({
        meusDados,
        escolas,
        diretoriasRegionais
      });
    });
  }

  render() {
    return <FiltrosDeBusca {...this.state} {...this.props} />;
  }
}

export default BuscaPorPeriodo;
