import {
  ALTERACAO_CARDAPIO,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SUSPENSAO_ALIMENTACAO
} from "./configs/constants";

export const ENTER = 13;
export const TAMANHO_RF = 7;
export const TAMANHO_CPF = 11;
export const DOIS_MB = 2097152;
export const DEZ_MB = 10485760;
export const TODOS = "TODOS";

export const PERFIL = {
  DIRETOR: `"DIRETOR"`,
  DIRETOR_CEI: `"DIRETOR CEI"`,
  ADMINISTRADOR_ESCOLA: `"ADMINISTRADOR_ESCOLA"`,
  SUPLENTE: `"SUPLENTE"`,
  COGESTOR: `"COGESTOR"`,
  ADMINISTRADOR_DRE: `"ADMINISTRADOR_DRE"`,
  COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA: `"COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA"`,
  ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA: `"ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA"`,
  COORDENADOR_DIETA_ESPECIAL: `"COORDENADOR_DIETA_ESPECIAL"`,
  ADMINISTRADOR_DIETA_ESPECIAL: `"ADMINISTRADOR_DIETA_ESPECIAL"`,
  NUTRI_ADMIN_RESPONSAVEL: `"NUTRI_ADMIN_RESPONSAVEL"`,
  ADMINISTRADOR_TERCEIRIZADA: `"ADMINISTRADOR_TERCEIRIZADA`
};

export const VISAO = {
  ESCOLA: "escola",
  DIRETORIA_REGIONAL: "dre",
  CODAE: "codae",
  TERCEIRIZADA: "terceirizada",
  ALUNO: "aluno"
};

export const TIPO_PERFIL = {
  ESCOLA: `"escola"`,
  DIRETORIA_REGIONAL: `"diretoriaregional"`,
  GESTAO_ALIMENTACAO_TERCEIRIZADA: `"gestao_alimentacao_terceirizada"`,
  DIETA_ESPECIAL: `"dieta_especial"`,
  TERCEIRIZADA: `"terceirizada"`
};

export const TIPO_USUARIO = {
  ESCOLA: `escola`,
  DIRETORIA_REGIONAL: `diretoriaregional`,
  GESTAO_ALIMENTACAO_TERCEIRIZADA: `gestao_alimentacao_terceirizada`,
  DIETA_ESPECIAL: `dieta_especial`,
  TERCEIRIZADA: `terceirizada`
};

export const TIPODECARD = {
  PRIORIDADE: "priority",
  NO_LIMITE: "on-limit",
  REGULAR: "regular"
};

export const FiltroEnum = {
  SEM_FILTRO: "sem_filtro",
  HOJE: "hoje",
  DAQUI_A_7_DIAS: "daqui_a_7_dias",
  DAQUI_A_30_DIAS: "daqui_a_30_dias"
};

export const FILTRO_VISAO = {
  TIPO_SOLICITACAO: "tipo_solicitacao",
  LOTE: "lote",
  DRE: "dre"
};

export const TEMPO_PASSEIO = {
  QUATRO_HORAS: "0",
  CINCO_A_SETE_HORAS: "1",
  OITO_HORAS_OU_MAIS: "2"
};

export const visaoPorCombo = [
  {
    nome: "Visão por dia",
    uuid: ""
  },
  {
    nome: "Dia",
    uuid: "day"
  },
  {
    nome: "Semana",
    uuid: "week"
  },
  {
    nome: "Mês",
    uuid: "month"
  },
  {
    nome: "Lote",
    uuid: "lote"
  }
];

export const visaoPorComboSomenteDatas = [
  {
    nome: "Sem filtro",
    uuid: "sem_filtro"
  },
  {
    nome: "Daqui a 7 dias",
    uuid: "daqui_a_7_dias"
  },
  {
    nome: "Daqui a 30 dias",
    uuid: "daqui_a_30_dias"
  }
];

export const statusEnum = {
  INFORMADO: "INFORMADO",
  RASCUNHO: "RASCUNHO",
  DRE_A_VALIDAR: "DRE_A_VALIDAR",
  DRE_VALIDADO: "DRE_VALIDADO",
  CODAE_A_AUTORIZAR: "CODAE_A_AUTORIZAR",
  CODAE_AUTORIZADO: "CODAE_AUTORIZADO",
  CODAE_NEGOU_PEDIDO: "CODAE_NEGOU_PEDIDO",
  CODAE_QUESTIONADO: "CODAE_QUESTIONADO",
  TERCEIRIZADA_TOMOU_CIENCIA: "TERCEIRIZADA_TOMOU_CIENCIA",
  TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO:
    "TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO",
  ESCOLA_CANCELOU: "ESCOLA_CANCELOU",
  CANCELADO_AUTOMATICAMENTE: "CANCELADO_AUTOMATICAMENTE",
  DRE_CANCELOU: "DRE_CANCELOU",
  ESCOLA_SOLICITOU_INATIVACAO: "ESCOLA_SOLICITOU_INATIVACAO",
  CODAE_AUTORIZOU_INATIVACAO: "CODAE_AUTORIZOU_INATIVACAO",
  CODAE_NEGOU_INATIVACAO: "CODAE_NEGOU_INATIVACAO",
  TERCEIRIZADA_TOMOU_CIENCIA_INATIVACAO: "TERCEIRIZADA_TOMOU_CIENCIA_INATIVACAO"
};

export const escolaPodeCancelar = status => {
  return (
    status === statusEnum.TERCEIRIZADA_TOMOU_CIENCIA ||
    status === statusEnum.CODAE_AUTORIZADO ||
    status === statusEnum.CODAE_A_AUTORIZAR ||
    status === statusEnum.DRE_VALIDADO ||
    status === statusEnum.DRE_A_VALIDAR ||
    status === statusEnum.CODAE_QUESTIONADO ||
    status === statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO
  );
};

export const TIPOS_SOLICITACAO_LABEL = {
  INCLUSAO_DE_ALIMENTACAO: "Inclusão de Alimentação",
  INCLUSAO_DE_ALIMENTACAO_CONTINUA: "Inclusão de Alimentação Contínua",
  ALTERACAO_DE_CARDAPIO: "Alteração de Cardápio",
  SOLICITACAO_DE_KIT_LANCHE_PASSEIO: "Kit Lanche Passeio",
  INVERSAO_DE_DIA_DE_CARDAPIO: "Inversão de dia de Cardápio",
  SOLICITACAO_UNIFICADA: "Kit Lanche Unificado",
  SUSPENSAO_DE_ALIMENTACAO: "Suspensão de Alimentação"
};

export const TIPOS_SOLICITACAO_LISTA = [
  {
    titulo: TIPOS_SOLICITACAO_LABEL.INCLUSAO_DE_ALIMENTACAO,
    cor: "rgba(205, 100, 2, 1)",
    link: INCLUSAO_ALIMENTACAO
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.ALTERACAO_DE_CARDAPIO,
    cor: "rgba(1, 68, 111, 1)",
    link: ALTERACAO_CARDAPIO
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.SOLICITACAO_DE_KIT_LANCHE_PASSEIO,
    cor: "rgba(173, 0, 7, 1)",
    link: SOLICITACAO_KIT_LANCHE
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.INVERSAO_DE_DIA_DE_CARDAPIO,
    cor: "rgba(41, 120, 5, 1)",
    link: INVERSAO_CARDAPIO
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.SOLICITACAO_UNIFICADA,
    cor: "rgba(244, 77, 167, 1)",
    link: SOLICITACAO_KIT_LANCHE_UNIFICADA
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.SUSPENSAO_DE_ALIMENTACAO,
    cor: "rgba(1, 154, 200, 1)",
    link: SUSPENSAO_ALIMENTACAO
  }
];

export const TIPOS_SOLICITACAO_LISTA_DRE = [
  {
    titulo: TIPOS_SOLICITACAO_LABEL.INCLUSAO_DE_ALIMENTACAO,
    cor: "rgba(205, 100, 2, 1)",
    link: INCLUSAO_ALIMENTACAO
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.ALTERACAO_DE_CARDAPIO,
    cor: "rgba(1, 68, 111, 1)",
    link: ALTERACAO_CARDAPIO
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.SOLICITACAO_DE_KIT_LANCHE_PASSEIO,
    cor: "rgba(173, 0, 7, 1)",
    link: SOLICITACAO_KIT_LANCHE
  },
  {
    titulo: TIPOS_SOLICITACAO_LABEL.INVERSAO_DE_DIA_DE_CARDAPIO,
    cor: "rgba(41, 120, 5, 1)",
    link: INVERSAO_CARDAPIO
  }
];

const ENDPOINT = {
  ALIMENTOS: "alimentos",
  ALTERACOES_CARDAPIO_CEI: "alteracoes-cardapio-cei",
  FAIXAS_ETARIAS: "faixas-etarias",
  INICIO_PEDIDO: "inicio-pedido",
  MINHAS_SOLICITACOES: "minhas-solicitacoes",
  PERIODOS_ESCOLARES: "periodos-escolares",
  QUANTIDADE_ALUNOS_POR_PERIODO: "quantidade-alunos-por-periodo",
  SOLICITACOES_DIETA_ESPECIAL: "solicitacoes-dieta-especial",
  SOLICITACOES_DIETA_ESPECIAL_ATIVAS_INATIVAS:
    "solicitacoes-dieta-especial-ativas-inativas"
};
ENDPOINT.AUTORIZAR_DIETA = uuid =>
  `${ENDPOINT.SOLICITACOES_DIETA_ESPECIAL}/${uuid}/autorizar`;
export { ENDPOINT };
