import { TIPO_PERFIL } from "constants/shared";
import { ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO as ROTA } from "configs/constants";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";
import { GESTAO_PRODUTO_CARDS as CARD_ID } from "configs/constants";
const {
  CODAE_AUTORIZOU_RECLAMACAO,
  CODAE_SUSPENDEU,
  CODAE_QUESTIONADO,
  CODAE_PEDIU_ANALISE_RECLAMACAO,
  CODAE_PEDIU_ANALISE_SENSORIAL,
  CODAE_PENDENTE_HOMOLOGACAO,
  CODAE_HOMOLOGADO,
  CODAE_NAO_HOMOLOGADO
} = ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS;

const CARD_RECLAMACAO_DE_PRODUTO = {
  id: CARD_ID.RECLAMACAO_DE_PRODUTO,
  titulo: "Reclamação de produto",
  icon: "fa-bullhorn",
  style: "card-complained",
  rota: ROTA.RECLAMACAO_DE_PRODUTO,
  incluir_status: [CODAE_PEDIU_ANALISE_RECLAMACAO]
};
const CARD_PRODUTOS_SUSPENSOS = {
  id: CARD_ID.PRODUTOS_SUSPENSOS,
  titulo: "Produtos suspensos",
  icon: "fa-hand-paper",
  style: "card-cancelled",
  rota: ROTA.PRODUTOS_SUSPENSOS,
  incluir_status: [CODAE_SUSPENDEU]
};
const CARD_HOMOLOGADOS = {
  id: CARD_ID.HOMOLOGADOS,
  titulo: "Homologados",
  icon: "fa-check",
  style: "card-authorized",
  rota: ROTA.SOLICITACOES_HOMOLOGADAS,
  incluir_status: [CODAE_HOMOLOGADO]
};
const CARD_NAO_HOMOLOGADOS = {
  id: CARD_ID.NAO_HOMOLOGADOS,
  titulo: "Não homologados",
  icon: "fa-ban",
  style: "card-denied",
  rota: ROTA.SOLICITACOES_NAO_HOMOLOGADAS,
  incluir_status: [CODAE_NAO_HOMOLOGADO]
};
const CARD_AGUARDANDO_ANALISE_RECLAMACAO = {
  id: CARD_ID.AGUARDANDO_ANALISE_RECLAMACAO,
  titulo: "Aguardando análise de reclamação",
  titulo_menu: "Ag. análise de reclamação", // FIXME: Confirmar nome no menu
  icon: "fa-history",
  style: "card-awaiting-complain",
  rota: ROTA.AGUARDANDO_ANALISE_RECLAMACAO,
  incluir_status: [CODAE_QUESTIONADO]
};
const CARD_AGUARDANDO_ANALISE_SENSORIAL = {
  id: CARD_ID.AGUARDANDO_ANALISE_SENSORIAL,
  titulo: "Aguardando análise sensorial",
  titulo_menu: "Ag. análise sensorial",
  icon: "fa-search",
  style: "card-awaiting-sensory",
  rota: ROTA.AGUARDANDO_ANALISE_SENSORIAL,
  incluir_status: [CODAE_PEDIU_ANALISE_SENSORIAL]
};
const CARD_PENDENTE_HOMOLOGACAO = {
  id: CARD_ID.PENDENTE_HOMOLOGACAO,
  titulo: "Pendente homologação",
  icon: "fa-exclamation-triangle",
  style: "card-pending",
  rota: ROTA.SOLICITACOES_PENDENTE_HOMOLOGACAO,
  incluir_status: [CODAE_PENDENTE_HOMOLOGACAO]
};

const CARD_CORRECAO_DE_PRODUTO = {
  id: CARD_ID.CORRECAO_DE_PRODUTO,
  titulo: "Correção de produto",
  icon: "fa-pencil-alt",
  style: "card-product-correction",
  rota: ROTA.CORRECAO_DE_PRODUTO,
  incluir_status: [CODAE_AUTORIZOU_RECLAMACAO]
};

export const listarCardsPermitidos = () => {
  const perfil = localStorage.getItem("tipo_perfil");

  if (perfil === TIPO_PERFIL.GESTAO_PRODUTO) {
    const cardPendenteHomologacao = Object.assign(
      {},
      CARD_PENDENTE_HOMOLOGACAO
    );
    cardPendenteHomologacao.incluir_status.push(CODAE_AUTORIZOU_RECLAMACAO);
    return [
      cardPendenteHomologacao,
      CARD_RECLAMACAO_DE_PRODUTO,
      CARD_AGUARDANDO_ANALISE_SENSORIAL,
      CARD_PRODUTOS_SUSPENSOS,
      CARD_HOMOLOGADOS,
      CARD_NAO_HOMOLOGADOS,
      CARD_AGUARDANDO_ANALISE_RECLAMACAO
    ];
  } else if (
    [
      TIPO_PERFIL.TERCEIRIZADA,
      TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
    ].includes(perfil)
  ) {
    return [
      CARD_RECLAMACAO_DE_PRODUTO,
      CARD_PRODUTOS_SUSPENSOS,
      CARD_CORRECAO_DE_PRODUTO,
      CARD_AGUARDANDO_ANALISE_RECLAMACAO,
      CARD_AGUARDANDO_ANALISE_SENSORIAL,
      CARD_PENDENTE_HOMOLOGACAO,
      CARD_HOMOLOGADOS,
      CARD_NAO_HOMOLOGADOS
    ];
  }
  return [
    CARD_RECLAMACAO_DE_PRODUTO,
    CARD_PRODUTOS_SUSPENSOS,
    CARD_NAO_HOMOLOGADOS,
    CARD_HOMOLOGADOS
  ];
};
