import React, { Component } from "react";
import {
  getSolicitacoesPendentesNutricionista,
  getSolicitacoesAutorizadasNutricionista,
  getSolicitacoesNegadasNutricionista
} from "../../../services/painelNutricionista.service";
import * as constants from "../../../configs/constants";
import { meusDados } from "../../../services/perfil.service";
import { truncarString } from "../../../helpers/utilities";
import DashboardNutricionista from "./DashboardNutricionista";

export default class DashboardNutricionistaContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      meusDados: {},
      autorizadas: [],
      pendentes: [],
      negadas: []
    };
  }

  ajustaSolicitacoes(solicitacoes) {
    return solicitacoes.map(s => {
      const ultimoLog = s.logs[s.logs.length - 1];
      return {
        text: truncarString(`${s.id_externo} - ${s.nome_completo_aluno}`, 48),
        date: ultimoLog.criado_em.slice(0, ultimoLog.criado_em.length - 3),
        link: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO}/?uuid=${
          s.uuid
        }`
      };
    });
  }

  async componentDidMount() {
    const dadosMeus = await meusDados();
    const vinculoAtual = dadosMeus.vinculo_atual;
    if (!vinculoAtual) return;
    let pendentes = await getSolicitacoesPendentesNutricionista();
    let autorizadas = await getSolicitacoesAutorizadasNutricionista();
    let negadas = await getSolicitacoesNegadasNutricionista();

    autorizadas = this.ajustaSolicitacoes(
      autorizadas.results,
      constants.VISUALIZAR
    );
    pendentes = this.ajustaSolicitacoes(pendentes.results);
    negadas = this.ajustaSolicitacoes(negadas.results);
    this.setState({
      autorizadas,
      pendentes,
      negadas
    });
  }

  render() {
    const { autorizadas, pendentes, negadas } = this.state;
    return (
      <div>
        <DashboardNutricionista
          autorizadas={autorizadas}
          pendentes={pendentes}
          negadas={negadas}
        />
      </div>
    );
  }
}
