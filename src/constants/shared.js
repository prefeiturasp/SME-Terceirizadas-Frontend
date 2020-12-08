import {
  ALTERACAO_CARDAPIO,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA
} from "../configs/constants";

export const ENTER = 13;
export const TAMANHO_RF = 7;
export const TAMANHO_CPF = 11;
export const DOIS_MB = 2097152;
export const DEZ_MB = 10485760;
export const TODOS = "TODOS";

export const PERFIL = {
  DIRETOR: `"DIRETOR"`,
  DIRETOR_CEI: `"DIRETOR CEI"`,
  COORDENADOR_ESCOLA: `"COORDENADOR_ESCOLA"`,
  ADMINISTRADOR_ESCOLA: `"ADMINISTRADOR_ESCOLA"`,
  COORDENADOR_LOGISTICA: `"COORDENADOR_LOGISTICA"`,
  SUPLENTE: `"SUPLENTE"`,
  COGESTOR: `"COGESTOR"`,
  ADMINISTRADOR_DRE: `"ADMINISTRADOR_DRE"`,
  COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA: `"COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA"`,
  ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA: `"ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA"`,
  COORDENADOR_DIETA_ESPECIAL: `"COORDENADOR_DIETA_ESPECIAL"`,
  ADMINISTRADOR_DIETA_ESPECIAL: `"ADMINISTRADOR_DIETA_ESPECIAL"`,
  COORDENADOR_GESTAO_PRODUTO: `"COORDENADOR_GESTAO_PRODUTO"`,
  ADMINISTRADOR_GESTAO_PRODUTO: `"ADMINISTRADOR_GESTAO_PRODUTO"`,
  NUTRI_ADMIN_RESPONSAVEL: `"NUTRI_ADMIN_RESPONSAVEL"`,
  ADMINISTRADOR_TERCEIRIZADA: `"ADMINISTRADOR_TERCEIRIZADA"`,
  COORDENADOR_SUPERVISAO_NUTRICAO: `"COORDENADOR_SUPERVISAO_NUTRICAO"`,
  ADMINISTRADOR_SUPERVISAO_NUTRICAO: `"ADMINISTRADOR_SUPERVISAO_NUTRICAO"`
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
  SUPERVISAO_NUTRICAO: `"supervisao_nutricao"`,
  DIETA_ESPECIAL: `"dieta_especial"`,
  GESTAO_PRODUTO: `"gestao_produto"`,
  TERCEIRIZADA: `"terceirizada"`,
  LOGISTICA: `"coordenador_logistica"`
};

export const TIPO_USUARIO = {
  ESCOLA: `escola`,
  DIRETORIA_REGIONAL: `diretoriaregional`,
  GESTAO_ALIMENTACAO_TERCEIRIZADA: `gestao_alimentacao_terceirizada`,
  DIETA_ESPECIAL: `dieta_especial`,
  GESTAO_PRODUTO: `gestao_produto`,
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
  POR_TIPO_SOLICITACAO: "tipo_solicitacao",
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

export const TIPO_SOLICITACAO = {
  SOLICITACAO_NORMAL: "solicitacao-normal",
  SOLICITACAO_CONTINUA: "solicitacao-continua",
  SOLICITACAO_CEI: "solicitacao-cei"
};

export const TIPOS_SOLICITACAO_LABEL = {
  INCLUSAO_DE_ALIMENTACAO: "Inclusão de Alimentação",
  INCLUSAO_DE_ALIMENTACAO_CEI: "Inclusão de Alimentacao de CEI",
  INCLUSAO_DE_ALIMENTACAO_CONTINUA: "Inclusão de Alimentação Contínua",
  ALTERACAO_DE_CARDAPIO: "Alteração de Cardápio",
  ALTERACAO_DE_CARDAPIO_CEI: "Alteração de Cardápio de CEI",
  SOLICITACAO_DE_KIT_LANCHE_PASSEIO: "Kit Lanche Passeio",
  SOLICITACAO_DE_KIT_LANCHE_PASSEIO_CEI: "Kit Lanche Passeio de CEI",
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
  ALTERACOES_CARDAPIO: "alteracoes-cardapio",
  ALTERACOES_CARDAPIO_CEI: "alteracoes-cardapio-cei",
  CATEGORIA_PERGUNTAS_FREQUENTES: "categorias-pergunta-frequente",
  FAIXAS_ETARIAS: "faixas-etarias",
  INCLUSOES_ALIMENTACAO_DA_CEI: "inclusoes-alimentacao-da-cei",
  SUSPENSAO_ALIMENTACAO_DA_CEI: "suspensao-alimentacao-de-cei",
  INICIO_PEDIDO: "inicio-pedido",
  MINHAS_SOLICITACOES: "minhas-solicitacoes",
  PERGUNTAS_FREQUENTES: "perguntas-frequentes",
  PERIODOS_ESCOLARES: "periodos-escolares",
  QUANTIDADE_ALUNOS_POR_PERIODO: "quantidade-alunos-por-periodo",
  SOLICITACOES_DIETA_ESPECIAL: "solicitacoes-dieta-especial",
  SOLICITACOES_DIETA_ESPECIAL_ATIVAS_INATIVAS:
    "solicitacoes-dieta-especial-ativas-inativas"
};
ENDPOINT.AUTORIZAR_DIETA = uuid =>
  `${ENDPOINT.SOLICITACOES_DIETA_ESPECIAL}/${uuid}/autorizar`;

ENDPOINT.INFORMA_SUSPENSAO_DA_CEI = uuid =>
  `${ENDPOINT.SUSPENSAO_ALIMENTACAO_DA_CEI}/${uuid}/informa-suspensao/`;

export { ENDPOINT };

export const ENDPOINT_RELATORIO_QUANTITATIVO =
  "/terceirizadas/relatorio-quantitativo/";

export const ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS = {
  CODAE_AUTORIZOU_RECLAMACAO: "codae_autorizou_reclamacao",
  CODAE_SUSPENDEU: "codae_suspendeu",
  CODAE_QUESTIONADO: "codae_questionado",
  CODAE_PEDIU_ANALISE_RECLAMACAO: "codae_pediu_analise_reclamacao",
  CODAE_PEDIU_ANALISE_SENSORIAL: "codae_pediu_analise_sensorial",
  CODAE_PENDENTE_HOMOLOGACAO: "codae_pendente_homologacao",
  CODAE_HOMOLOGADO: "codae_homologado",
  CODAE_NAO_HOMOLOGADO: "codae_nao_homologado",
  ESCOLA_OU_NUTRICIONISTA_RECLAMOU: "escola_ou_nutricionista_reclamou",
  TERCEIRIZADA_RESPONDEU_RECLAMACAO: "terceirizada_respondeu_reclamacao"
};

export const RECLAMACAO_PRODUTO_STATUS_EXPLICACAO = {
  CODAE_AUTORIZOU_RECLAMACAO: "CODAE autorizou reclamação",
  CODAE_RECUSOU_RECLAMACAO: "CODAE recusou reclamação",
  CODAE_QUESTIONOU_TERCEIRIZADA:
    "CODAE questionou terceirizada sobre reclamação",
  CODAE_RESPONDEU_RECLAMACAO: "CODAE respondeu ao reclamante da reclamação",
  TERCEIRIZADA_RESPONDEU_RECLAMACAO: "Terceirizada respondeu a reclamação"
};

export const RECLAMACAO_PRODUTO_STATUS = {
  AGUARDANDO_AVALIACAO: "AGUARDANDO_AVALIACAO",
  AGUARDANDO_RESPOSTA_TERCEIRIZADA: "AGUARDANDO_RESPOSTA_TERCEIRIZADA",
  RESPONDIDO_TERCEIRIZADA: "RESPONDIDO_TERCEIRIZADA",
  CODAE_ACEITOU: "CODAE_ACEITOU",
  CODAE_RECUSOU: "CODAE_RECUSOU",
  CODAE_RESPONDEU: "CODAE_RESPONDEU"
};

export const STATUS_RECLAMACAO_PRODUTO = [
  "Aguardando resposta terceirizada",
  "Aguardando avaliação CODAE",
  "Respondido terceirizada"
];

export const TIPO_SOLICITACAO_DIETA = {
  COMUM: "COMUM",
  ALUNO_NAO_MATRICULADO: "ALUNO_NAO_MATRICULADO",
  ALTERACAO_UE: "ALTERACAO_UE"
};
