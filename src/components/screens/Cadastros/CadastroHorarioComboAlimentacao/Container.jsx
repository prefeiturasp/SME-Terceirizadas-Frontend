import React, { Component } from "react";
import { meusDados } from "../../../../services/perfil.service";
import {
  getHorariosCombosPorEscola,
  getVinculosTipoAlimentacaoPorEscola
} from "../../../../services/cadastroTipoAlimentacao.service";
import { montavinculosDeCombosInicial } from "./helper";

import CadastroHorarioComboAlimentacao from ".";
import { getQuantidaDeAlunosPorPeriodoEEscola } from "../../../../services/escola.service";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      vinculosTipoDeAlimentacao: null,
      horariosDosCombos: null,
      vinculosDeCombos: null,
      uuidEscola: null,
      naoPermitido: false,
      periodosEQuantidadeAlunos: null
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
      vinculosDeCombos,
      periodosEQuantidadeAlunos
    } = this.state;
    if (meusDados !== prevState.meusDados) {
      const TipoUnidadeEscolar =
        meusDados.vinculo_atual.instituicao.tipo_unidade_escolar;
      const uuidEscola = meusDados.vinculo_atual.instituicao.uuid;
      this.buscaHorariosDosCombos(meusDados.vinculo_atual.instituicao.uuid);
      if (TipoUnidadeEscolar !== null) {
        this.buscaQuantidadeDosAlunosPorPeriodoEscolar(uuidEscola);
        this.buscaVinculosTipoAlimentacaoPorUnidadeEscolar(uuidEscola);
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
        uuidEscola &&
        periodosEQuantidadeAlunos
      ) {
        vinculosDeCombos = montavinculosDeCombosInicial(
          vinculosTipoDeAlimentacao,
          horariosDosCombos,
          uuidEscola,
          periodosEQuantidadeAlunos
        );
        this.setState({ vinculosDeCombos });
      }
    }
  }

  buscaQuantidadeDosAlunosPorPeriodoEscolar = uuidEscola => {
    getQuantidaDeAlunosPorPeriodoEEscola(uuidEscola).then(response => {
      let { periodosEQuantidadeAlunos } = this.state;
      if (!periodosEQuantidadeAlunos) {
        this.setState({ periodosEQuantidadeAlunos: response.results });
      }
    });
  };

  buscaVinculosTipoAlimentacaoPorUnidadeEscolar = uuidEscola => {
    let vinculosTipoDeAlimentacao = this.state.vinculosTipoDeAlimentacao;
    getVinculosTipoAlimentacaoPorEscola(uuidEscola).then(response => {
      vinculosTipoDeAlimentacao = response.results;
      this.setState({ vinculosTipoDeAlimentacao });
    });
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
