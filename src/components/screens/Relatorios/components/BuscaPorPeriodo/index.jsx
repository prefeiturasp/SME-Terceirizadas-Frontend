import React, { Component } from "react";
import { meusDados } from "../../../../../services/perfil.service";
import FiltrosDeBusca from "./FiltrosDeBusca";
import {
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhDRE,
  usuarioEhCODAEGestaoAlimentacao,
} from "../../../../../helpers/utilities";
import { getDiretoriaregionalSimplissima } from "../../../../../services/diretoriaRegional.service";
import { TODOS } from "../../../../../constants/shared";
import { getEscolasTercTotal } from "services/escola.service";

class BuscaPorPeriodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      escolas: null,
      diretoriasRegionais: null,
    };
  }

  componentDidMount() {
    let escolas = null;
    let diretoriasRegionais = null;
    if (usuarioEhCODAEGestaoAlimentacao()) {
      getDiretoriaregionalSimplissima().then((response) => {
        diretoriasRegionais = [{ nome: TODOS, uuid: TODOS }].concat(
          response.data.results
        );
        escolas = [{ nome: TODOS, uuid: TODOS }];
        this.setState({
          diretoriasRegionais,
          escolas,
        });
      });
    } else {
      meusDados().then((meusDados) => {
        if (
          usuarioEhEscolaTerceirizada() ||
          usuarioEhEscolaTerceirizadaDiretor()
        ) {
          escolas = [
            {
              nome: meusDados.vinculo_atual.instituicao.nome,
              uuid: meusDados.vinculo_atual.instituicao.uuid,
            },
          ];
          diretoriasRegionais = [
            meusDados.vinculo_atual.instituicao.diretoria_regional,
          ];
        } else if (usuarioEhDRE()) {
          const dre_uuid = meusDados.vinculo_atual.instituicao.uuid;
          getEscolasTercTotal({ dre: dre_uuid }).then((response) => {
            escolas = [{ nome: TODOS, uuid: TODOS }].concat(response.data);
          });

          diretoriasRegionais = [
            {
              nome: meusDados.vinculo_atual.instituicao.nome,
              uuid: meusDados.vinculo_atual.instituicao.uuid,
            },
          ];
        }
        this.setState({
          meusDados,
          escolas,
          diretoriasRegionais,
        });
      });
    }
  }

  render() {
    const { escolas } = this.state;
    return (
      <div className="busca-por-produto">
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
