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
      uuidEscola: null,
      naoPermitido: false
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
      vinculosTipoDeAlimentacao,
      horariosDosCombos,
      uuidEscola,
      vinculosDeCombos
    } = this.state;
    if (meusDados !== prevState.meusDados) {
      const uuidDaEscola =
        meusDados.vinculo_atual.instituicao.tipo_unidade_escolar;
      this.buscaHorariosDosCombos(meusDados.vinculo_atual.instituicao.uuid);
      if (uuidDaEscola !== null) {
        this.buscaVinculosTipoAlimentacaoPorUnidadeEscolar(
          meusDados.vinculo_atual.instituicao.tipo_unidade_escolar
        );
      } else {
        this.setState({ naoPermitido: true });
      }

      this.setState({
        uuidEscola: meusDados.vinculo_atual.instituicao.uuid
      });
    } else {
      if (
        !vinculosDeCombos &&
        vinculosTipoDeAlimentacao &&
        horariosDosCombos &&
        uuidEscola
      ) {
        vinculosDeCombos = montavinculosDeCombosInicial(
          vinculosTipoDeAlimentacao,
          horariosDosCombos,
          uuidEscola
        );
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
