import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./style.scss";
import { conferidaClass } from "helpers/terceirizadas";
import { GESTAO_PRODUTO_CARDS, TERCEIRIZADA } from "configs/constants";
import {
  ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS,
  TIPO_PERFIL
} from "constants/shared";

export const CARD_TYPE_ENUM = {
  CANCELADO: "card-cancelled",
  PENDENTE: "card-pending",
  AUTORIZADO: "card-authorized",
  NEGADO: "card-denied",
  RECLAMACAO: "card-complained",
  AGUARDANDO_ANALISE_SENSORIAL: "card-awaiting-sensory",
  CORRECAO: "card-product-correction",
  AGUARDANDO_ANALISE_RECLAMACAO: "card-awaiting-complain"
};

export const ICON_CARD_TYPE_ENUM = {
  CANCELADO: "fa-times-circle",
  PENDENTE: "fa-exclamation-triangle",
  AUTORIZADO: "fa-check",
  NEGADO: "fa-ban",
  RECLAMACAO: "fa-bullhorn",
  AGUARDANDO_ANALISE_SENSORIAL: "fa-search",
  SUSPENSO: "fa-hand-paper",
  CORRECAO: "fa-pencil-alt",
  AGUARDANDO_ANALISE_RECLAMACAO: "fa-history"
};

export const CardStatusDeSolicitacao = props => {
  const {
    cardTitle,
    cardType,
    solicitations,
    icon,
    href,
    loading,
    hrefCard
  } = props;

  const nomeUsuario = localStorage.getItem("nome");
  const tipoPerfil = localStorage.getItem("tipo_perfil");

  let history = useHistory();
  let filteredSolicitations = [];

  if (cardTitle === GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE) {
    if (tipoPerfil === `"${TERCEIRIZADA}"`) {
      filteredSolicitations = solicitations.filter(
        solicitation =>
          ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PEDIU_ANALISE_RECLAMACAO.toUpperCase() ===
          solicitation.status
      );
    } else if (tipoPerfil === TIPO_PERFIL.SUPERVISAO_NUTRICAO) {
      filteredSolicitations = solicitations.filter(
        solicitation =>
          ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONOU_NUTRISUPERVISOR.toUpperCase() ===
          solicitation.status
      );
    } else {
      filteredSolicitations = solicitations.filter(
        solicitation =>
          nomeUsuario === `"${solicitation.nome_usuario_log_de_reclamacao}"` &&
          ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONOU_UE.toUpperCase() ===
            solicitation.status
      );
    }
  }

  const renderSolicitations = solicitations => {
    return solicitations.slice(0, 5).map((solicitation, key) => {
      let conferida = conferidaClass(solicitation, cardTitle);
      return (
        <NavLink
          to={solicitation.link}
          key={key}
          data-cy={`${cardType}-${key}`}
        >
          <p className={`data ${conferida}`}>
            {solicitation.text}
            <span className="float-right">{solicitation.date}</span>
          </p>
        </NavLink>
      );
    });
  };

  const renderVerMais = solicitations => {
    return (
      solicitations.length > 5 && (
        <div className="container-link">
          <NavLink
            to={`${href}`}
            className="see-more"
            data-cy={`ver-mais-${cardType}`}
          >
            Ver Mais
          </NavLink>
        </div>
      )
    );
  };

  return (
    <div className={`card card-panel card-colored ${cardType}`}>
      <div
        className={`card-title-status ajuste-icones ${
          hrefCard ? "card-com-href" : undefined
        }`}
        onClick={() => hrefCard && history.push(hrefCard)}
      >
        <div>
          <i className={"fas " + icon} />
          {cardTitle}
        </div>
        {loading && (
          <img src="/assets/image/ajax-loader.gif" alt="ajax-loader" />
        )}
        <span className="float-right my-auto">Data/Hora</span>
      </div>
      <hr />
      {cardTitle === GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE
        ? renderSolicitations(filteredSolicitations)
        : renderSolicitations(solicitations)}
      {cardTitle === GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE
        ? renderVerMais(filteredSolicitations)
        : renderVerMais(solicitations)}
    </div>
  );
};

export default CardStatusDeSolicitacao;
