import React, { Component } from "react";
import { meusDados } from "../../../../../services/perfil.service";
import FiltrosDeBusca from "./FiltrosDeBusca";
import {
  usuarioEscola,
  usuarioDiretoriaRegional,
  usuarioCODAEGestaoAlimentacao
} from "../../../../../helpers/utilities";
import { getEscolasSimplissima } from "../../../../../services/escola.service";
import { getDiretoriaregionalSimplissima } from "../../../../../services/diretoriaRegional.service";

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
    if (usuarioCODAEGestaoAlimentacao()) {
      getEscolasSimplissima().then(response => {
        escolas = [{ nome: "TODOS", uuid: "TODOS" }].concat(response.results);
        this.setState({
          escolas
        });
      });
      getDiretoriaregionalSimplissima().then(response => {
        diretoriasRegionais = [{ nome: "TODOS", uuid: "TODOS" }].concat(
          response.data.results
        );
        this.setState({
          diretoriasRegionais
        });
      });
    } else {
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
          escolas = [{ nome: "TODOS", uuid: "TODOS" }].concat(
            meusDados.vinculo_atual.instituicao.escolas
          );
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
  }

  render() {
    const { escolas } = this.state;
    return (
      <div>
        {!escolas ? (
          <div>Carregando filtros...</div>
        ) : (
          <FiltrosDeBusca {...this.state} {...this.props} />
        )}
      </div>
    );
  }
}

export default BuscaPorPeriodo;
