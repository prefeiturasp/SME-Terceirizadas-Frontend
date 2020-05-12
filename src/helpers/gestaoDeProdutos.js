import { TIPO_PERFIL } from "constants/shared";
import { ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO } from "configs/constants";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";
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

const CARDS_BASE = [
  {
    titulo: "Reclamação de produto",
    icon: "fa-bullhorn",
    style: "card-complained",
    rota: ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.RECLAMACAO_DE_PRODUTO,
    incluir_status: [CODAE_PEDIU_ANALISE_RECLAMACAO]
  },
  {
    titulo: "Produtos suspensos",
    icon: "fa-hand-paper",
    style: "card-cancelled",
    rota: ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.PRODUTOS_SUSPENSOS,
    incluir_status: [CODAE_SUSPENDEU]
  },
  {
    titulo: "Homologados",
    icon: "fa-check",
    style: "card-authorized",
    rota: ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_HOMOLOGADAS,
    incluir_status: [CODAE_HOMOLOGADO]
  },
  {
    titulo: "Não homologados",
    icon: "fa-ban",
    style: "card-denied",
    rota: ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_NAO_HOMOLOGADAS,
    incluir_status: [CODAE_NAO_HOMOLOGADO]
  }
];
const CARDS_GESTAO = [
  {
    titulo: "Correção de produto",
    icon: "fa-pencil-alt",
    style: "card-product-correction",
    rota: ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.CORRECAO_DE_PRODUTO,
    incluir_status: [CODAE_AUTORIZOU_RECLAMACAO]
  },
  {
    titulo: "Aguardando análise de reclamação",
    titulo_menu: "Ag. análise de reclamação", // FIXME: Confirmar nome no menu
    icon: "fa-history",
    style: "card-awaiting-complain",
    rota: ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.AGUARDANDO_ANALISE_RECLAMACAO,
    incluir_status: [CODAE_QUESTIONADO]
  },
  {
    titulo: "Aguardando análise sensorial",
    titulo_menu: "Ag. análise sensorial",
    icon: "fa-search",
    style: "card-awaiting-sensory",
    rota: ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.AGUARDANDO_ANALISE_SENSORIAL,
    incluir_status: [CODAE_PEDIU_ANALISE_SENSORIAL]
  },
  {
    titulo: "Pendente homologação",
    icon: "fa-exclamation-triangle",
    style: "card-pending",
    rota:
      ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_PENDENTE_HOMOLOGACAO,
    incluir_status: [CODAE_PENDENTE_HOMOLOGACAO]
  }
];

export const listarCardsPermitidos = () => {
  const perfil = localStorage.getItem("tipo_perfil");

  switch (perfil) {
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return CARDS_BASE.concat(CARDS_GESTAO);
    case TIPO_PERFIL.DIETA_ESPECIAL:
      return CARDS_BASE.concat(CARDS_GESTAO);
    case TIPO_PERFIL.GESTAO_PRODUTO:
      return CARDS_BASE.concat(CARDS_GESTAO);
    default:
      return CARDS_BASE;
  }
};
