import React, { Component } from "react";
import {
  getSolicitacoesAutorizadasEscola,
  getSolicitacoesCanceladasEscola,
  getSolicitacoesNegadasEscola,
  getSolicitacoesPendentesEscola
} from "../../../services/painelEscola.service";
import { meusDados } from "../../../services/perfil.service";
import { ajustarFormatoLog } from "../helper";
import DashboardEscola from "./DashboardEscola";

export default class DashboardEscolaContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      numeroAlunos: 0,
      meusDados: {},
      autorizadas: [],
      pendentes: [],
      negadas: [],
      canceladas: [],
      theadList: [
        "Nº Solicitação",
        "Escola",
        "Quantidade de Alimentações solicitadas"
      ],
      trs: []
    };
  }

  async componentDidMount() {
    const dadosMeus = await meusDados();
    const vinculoAtual = dadosMeus.vinculo_atual;
    if (!vinculoAtual) return;
    const numeroAlunos = vinculoAtual.instituicao.quantidade_alunos;
    const [pendentes, autorizadas, negadas, canceladas] = await Promise.all([
      getSolicitacoesPendentesEscola(),
      getSolicitacoesAutorizadasEscola(),
      getSolicitacoesNegadasEscola(),
      getSolicitacoesCanceladasEscola()
    ]);
    this.setState({
      dadosMeus,
      autorizadas: ajustarFormatoLog(autorizadas.data.results),
      pendentes: ajustarFormatoLog(pendentes.data.results),
      negadas: ajustarFormatoLog(negadas.data.results),
      canceladas: ajustarFormatoLog(canceladas.data.results),
      numeroAlunos
    });
  }

  render() {
    const {
      autorizadas,
      pendentes,
      negadas,
      canceladas,
      theadList,
      trs,
      dadosMeus,
      numeroAlunos
    } = this.state;
    return (
      <div>
        <DashboardEscola
          numeroAlunos={numeroAlunos}
          meusDados={dadosMeus}
          autorizadas={autorizadas}
          pendentes={pendentes}
          negadas={negadas}
          theadList={theadList}
          canceladas={canceladas}
          trs={trs}
        />
      </div>
    );
  }
}
