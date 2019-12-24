import React, { Component } from "react";
import { meusDados } from "../../../../services/perfil.service";
import {
  getHorariosCombosPorEscola,
  getVinculosTipoAlimentacaoPorUnidadeEscolar
} from "../../../../services/cadastroTipoAlimentacao.service";
import { montavinculosDeCombosInicial } from "./helper";

import CadastroHorarioComboAlimentacao from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      vinculosTipoDeAlimentacao: null,
      horariosDosCombos: null,
      vinculosDeCombos: null,
      uuidEscola: null
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      this.setState({
        meusDados: response
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { meusDados } = this.state;
    let {
      vinculosDeCombos,
      vinculosTipoDeAlimentacao,
      horariosDosCombos,
      uuidEscola
    } = this.state;
    if (meusDados !== prevState.meusDados) {
      this.buscaHorariosDosCombos(meusDados.vinculo_atual.instituicao.uuid);
      this.buscaVinculosTipoAlimentacaoPorUnidadeEscolar(
        meusDados.vinculo_atual.instituicao.tipo_unidade_escolar
      );
      this.setState({
        uuidEscola: meusDados.vinculo_atual.instituicao.uuid
      });
    } else {
      if (vinculosDeCombos === prevState.vinculosDeCombos) {
        vinculosTipoDeAlimentacao &&
          horariosDosCombos &&
          uuidEscola &&
          (vinculosDeCombos = montavinculosDeCombosInicial(
            vinculosTipoDeAlimentacao,
            horariosDosCombos,
            uuidEscola
          ));
        this.setState({ vinculosDeCombos });
      }
    }
  }

  buscaVinculosTipoAlimentacaoPorUnidadeEscolar = tipoUnidadeUuid => {
    let vinculosTipoDeAlimentacao = this.state.vinculosTipoDeAlimentacao;
    getVinculosTipoAlimentacaoPorUnidadeEscolar(tipoUnidadeUuid).then(
      response => {
        vinculosTipoDeAlimentacao = response.results;
        this.setState({ vinculosTipoDeAlimentacao });
      }
    );
  };

  buscaHorariosDosCombos = escolaUuid => {
    let horariosDosCombos = this.state.horariosDosCombos;
    getHorariosCombosPorEscola(escolaUuid).then(response => {
      horariosDosCombos = response.results;
      this.setState({ horariosDosCombos });
    });
  };

  render() {
    return <CadastroHorarioComboAlimentacao {...this.state} />;
  }
}

export default Container;
