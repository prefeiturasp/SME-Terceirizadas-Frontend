import React, { Component } from "react";
import DashboardDRE from "./DashboardDRE";
import { getSolicitacoesAutorizadasPelaDRE, getSolicitacoesPendentesParaDRE } from "../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";

class DashboardDREContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4050,
      autorizadasList: [],
      pendentesList: [],
      recusadasList: [],
      canceladasList:[],
      autorizadasListFiltered: [],
      pendentesListFiltered: [],
      recusadasListFiltered: [],
      canceladasListFiltered:[],
      resumoPendenciasDREAlteracoesDeCardapio: {},
      meusDados: [],
      loadingAutorizadas: true,
      loadingPendentes: true,
      solicitations: [],
      vision_by: [
        {
          nome: "Tipo de Solicitação",
          uuid: "tipo_solicitacao"
        },
        {
          nome: "Lote",
          uuid: "lote"
        }
      ],
      filtro_por: [
        {
          nome: "Sem filtro",
          uuid: "sem_filtro"
        },
        {
          nome: "Semana",
          uuid: "daqui_a_7_dias"
        },
        {
          nome: "Mês",
          uuid: "daqui_a_30_dias"
        }
      ]
    };
  }

  async componentDidMount() {
    const meusDados = await getMeusDados()
    const autorizadas = await getSolicitacoesAutorizadasPelaDRE(meusDados.diretorias_regionais[0].uuid)
    const pendentes = await getSolicitacoesPendentesParaDRE(meusDados.diretorias_regionais[0].uuid)
    this.setState({
      autorizadasList:autorizadas.results,
      pendentesList:pendentes.results,
      autorizadasListFiltered:autorizadas.results,
      pendentesListFiltered:pendentes.results,
      meusDados,
      loadingAutorizadas: false,
      loadingPendentes: false,
      enrolled: meusDados.diretorias_regionais[0].quantidade_alunos
    });
  }


  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
