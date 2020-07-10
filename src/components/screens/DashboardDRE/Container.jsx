import React, { Component } from "react";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import { TIPOS_SOLICITACAO_LISTA_DRE } from "../../../constants/shared";
import { formatarLotesParaVisao } from "../../../helpers/utilities";
import DashboardDRE from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ],
      meusDados: null,
      cards: TIPOS_SOLICITACAO_LISTA_DRE,
      tiposSolicitacao: TIPOS_SOLICITACAO_LISTA_DRE,
      lotes: null
    };
  }

  componentDidMount() {
    getMeusDados().then(response => {
      this.setState({
        meusDados: response,
        lotes: formatarLotesParaVisao(response.vinculo_atual.instituicao.lotes)
      });
    });
  }

  render() {
    return <DashboardDRE {...this.state} {...this.props} />;
  }
}

export default Container;
