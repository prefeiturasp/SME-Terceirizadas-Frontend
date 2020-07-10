import React, { Component } from "react";
import {
  ESCOLA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS
} from "../../../../../configs/constants";
import { getRelatorioResumoMesAno } from "../../../../../services/relatorios";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../Shareable/Botao/constants";
import "./style.scss";

export const ICON_CARD_TYPE_ENUM = {
  CANCELADO: "fa-times-circle",
  PENDENTE: "fa-exclamation-triangle",
  AUTORIZADO: "fa-check",
  NEGADO: "fa-ban"
};

const TIPO_CARD = {
  CANCELADO: 0,
  PENDENTE: 1,
  AUTORIZADO: 2,
  NEGADO: 3
};

function CardTotalSolicitacaoPorStatus(props) {
  const { quantidade, quantidadeMesPassado, tipo, href } = props;
  let texto = "Autorizadas";
  let icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
  let cardClass = "";
  switch (tipo) {
    case TIPO_CARD.AUTORIZADO:
      texto = "Autorizadas";
      icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
      cardClass = "card-authorized";
      break;
    case TIPO_CARD.NEGADO:
      texto = "Negadas";
      icon = ICON_CARD_TYPE_ENUM.NEGADO;
      cardClass = "card-denied";
      break;
    case TIPO_CARD.PENDENTE:
      texto = "Aguardando Autorização";
      icon = ICON_CARD_TYPE_ENUM.PENDENTE;
      cardClass = "card-pending";
      break;
    case TIPO_CARD.CANCELADO:
      texto = "Canceladas";
      icon = ICON_CARD_TYPE_ENUM.CANCELADO;
      cardClass = "card-cancelled";
      break;

    default:
      texto = "Autorizadas";
      icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
      break;
  }
  return (
    <section className="card-solicitacoes">
      <div className="header-card">
        <i className={`fas ${icon} ${cardClass}`} />{" "}
        <nav className="titulo-texto">{texto}</nav>{" "}
        <div className="bandeira">{quantidade - quantidadeMesPassado}</div>
      </div>
      <div className="fonte-grande">{quantidade} solicitações.</div>
      <a href={href} className="card-link alinha-centro">
        Ver mais
      </a>
    </section>
  );
}

class CardsComBandeira extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legend: null,
      totais_tipo_solicitacao: {
        total_autorizados: "...",
        total_cancelados: "...",
        total_negados: "...",
        total_pendentes: "...",
        total_autorizados_mes_passado: "...",
        total_negados_mes_passado: "...",
        total_cancelados_mes_passado: "...",
        total_pendentes_mes_passado: "..."
      }
    };
  }

  componentDidMount() {
    this.props.getResumoTotaisPorMes().then(totais => {
      this.setState({ totais_tipo_solicitacao: totais.data });
    });
  }

  render() {
    const { totais_tipo_solicitacao } = this.state;
    const { visao } = this.props;
    return (
      <div className="cards-with-flag">
        <div className="row p-4">
          <div className="col-12">
            <p className="float-right">
              <Botao
                className="ml-2"
                style={BUTTON_STYLE.BLUE_OUTLINE}
                icon={BUTTON_ICON.PRINT}
                texto={"Imprimir"}
                onClick={() => getRelatorioResumoMesAno(visao)}
                type={BUTTON_TYPE.BUTTON}
              />
            </p>
          </div>
          <div className="col-12">
            <p className="fonte-titulo">Solicitações por status</p>
          </div>
          <div className="col-4">
            <CardTotalSolicitacaoPorStatus
              quantidade={totais_tipo_solicitacao.total_autorizados}
              quantidadeMesPassado={
                totais_tipo_solicitacao.total_autorizados_mes_passado
              }
              href={`/${ESCOLA}/${SOLICITACOES_AUTORIZADAS}`}
              tipo={TIPO_CARD.AUTORIZADO}
            />
          </div>
          <div className="col-4">
            <CardTotalSolicitacaoPorStatus
              quantidade={totais_tipo_solicitacao.total_negados}
              quantidadeMesPassado={
                totais_tipo_solicitacao.total_negados_mes_passado
              }
              href={`/${ESCOLA}/${SOLICITACOES_NEGADAS}`}
              tipo={TIPO_CARD.NEGADO}
            />
          </div>
          <div className="col-4">
            <CardTotalSolicitacaoPorStatus
              quantidade={totais_tipo_solicitacao.total_pendentes}
              quantidadeMesPassado={
                totais_tipo_solicitacao.total_pendentes_mes_passado
              }
              href={`/${ESCOLA}/${SOLICITACOES_PENDENTES}`}
              tipo={TIPO_CARD.PENDENTE}
            />
          </div>
          <div className="col-4 pt-4">
            <CardTotalSolicitacaoPorStatus
              quantidade={totais_tipo_solicitacao.total_cancelados}
              quantidadeMesPassado={
                totais_tipo_solicitacao.total_cancelados_mes_passado
              }
              href={`/${ESCOLA}/${SOLICITACOES_CANCELADAS}`}
              tipo={TIPO_CARD.CANCELADO}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CardsComBandeira;
