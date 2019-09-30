import { FILTRO } from "../const";
import { FILTRO_VISAO } from "../../../constants/filtroVisao";

const ESTADO_INICIAL = {
  resumoPendenciasInversoesCardapio: {
    total: 0,
    limite: 0,
    prioritario: 0,
    regular: 0
  },
  resumoPendenciasInclusaoAlimentacao: {
    total: 0,
    limite: 0,
    prioritario: 0,
    regular: 0
  },
  resumoPendenciasKitLancheAvulsa: {
    total: 0,
    limite: 0,
    prioritario: 0,
    regular: 0
  },
  resumoPendenciasKitLancheUnificado: {
    total: 0,
    limite: 0,
    prioritario: 0,
    regular: 0
  },
  resumoPendenciasAlteracaoCardapio: {
    total: 0,
    limite: 0,
    prioritario: 0,
    regular: 0
  },
  resumoSuspensoesCardapio: {
    total: 0,
    informados: 0,
    ciencia: 0
  },
  loadingUnificado: true,
  loadingKitLancheAvulso: true,
  loadingInversao: true,
  loadingSuspensao: true,
  loadingAlteracao: true,
  loadingInclusao: true,
  collapsed: true,
  dre: false,
  filtro: FILTRO.SEM_FILTRO,
  visao: FILTRO_VISAO.TIPO_SOLICITACAO,

  solicitacoesAprovadasFiltradas: [],
  solicitacoesPendentesAprovacaoFiltradas: [],
  solicitacoesCanceladasFiltradas: [],
  solicitacoesRevisaoFiltradas: [],

  loadingPainelSolicitacoes: true,

  resumoPorDRE: [],
  resumoPorLote: []
};
