import {
  usuarioComAcessoTelaDetalharNotificacaoOcorrencia,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEhCODAEGabinete,
  usuarioEhCodaeDilog,
  usuarioEhDRE,
  usuarioEhDilog,
  usuarioEhDilogDiretoria,
  usuarioEhDilogJuridico,
  usuarioEhDilogQualidade,
  usuarioEhEmpresaDistribuidora,
  usuarioEhEscolaAbastecimento,
  usuarioEhEscolaAbastecimentoDiretor,
  usuarioEhLogistica,
} from "helpers/utilities";

import AnalisarAssinarPage from "pages/Logistica/AnalisarAssinarPage";
import CadastroNotificacaoPage from "pages/Logistica/CadastroNotificacao.page";
import ConferenciaDeGuiaComOcorrenciaPage from "pages/Logistica/ConferenciaDeGuiaComOcorrenciaPage";
import ConferenciaDeGuiaPage from "pages/Logistica/ConferenciaDeGuiaPage";
import ConferenciaDeGuiaResumoFinalPage from "pages/Logistica/ConferenciaDeGuiaResumoFinalPage";
import ConferenciaInconsistenciasPage from "pages/Logistica/ConferenciaInconsistenciasPage";
import ConferirEntregaPage from "pages/Logistica/ConferirEntregaPage";
import ConsultaRequisicaoEntregaDilog from "pages/Logistica/ConsultaRequisicaoEntregaDilog";
import ConsultaSolicitacaoAlteracaoPage from "pages/Logistica/ConsultaSolicitacaoAlteracaoPage";
import DetalhamentoGuiaPage from "pages/Logistica/DetalhamentoGuiaPage";
import DetalharNotificacaoPage from "pages/Logistica/DetalharNotificacaoPage";
import DisponibilizacaoDeSolicitacoesPage from "pages/Logistica/DisponibilizacaoDeSolicitacoesPage";
import EditarNotificacaoPage from "pages/Logistica/EditarNotificacaoPage";
import EntregasDilogPage from "pages/Logistica/EntregasDilogPage";
import EntregasDistribuidorPage from "pages/Logistica/EntregasDistribuidorPage";
import EntregasDrePage from "pages/Logistica/EntregasDrePage";
import FiltroRequisicaoDilog from "pages/Logistica/FiltroRequisicaoDilog";
import GestaoRequisicaoEntregaPage from "pages/Logistica/GestaoRequisicaoEntregaPage";
import GestaoSolicitacaoAlteracaoPage from "pages/Logistica/GestaoSolicitacaoAlteracaoPage";
import GuiasNotificacoesFiscalPage from "pages/Logistica/GuiasNotificacoesFiscalPage";
import GuiasNotificacoesPage from "pages/Logistica/GuiasNotificacoesPage";
import InsucessoEntregaPage from "pages/Logistica/InsucessoEntregaPage";
import NotificarEmpresaPage from "pages/Logistica/NotificarEmpresaPage";
import RegistrarInsucessoEntregaPage from "pages/Logistica/RegistrarInsucessoEntregaPage";
import ReposicaoDeGuiaPage from "pages/Logistica/ReposicaoDeGuiaPage";
import ReposicaoResumoFinalPage from "pages/Logistica/ReposicaoResumoFinalPage";

import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasAbastecimento: Array<RotaInterface> = [
  {
    path: `/${constants.LOGISTICA}/${constants.DISPONIBILIZACAO_DE_SOLICITACOES}`,
    component: DisponibilizacaoDeSolicitacoesPage,
    tipoUsuario: usuarioEhLogistica(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENVIO_REQUISICOES_ENTREGA}`,
    component: FiltroRequisicaoDilog,
    tipoUsuario: usuarioEhLogistica(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENVIO_REQUISICOES_ENTREGA_AVANCADO}`,
    component: ConsultaRequisicaoEntregaDilog,
    tipoUsuario:
      usuarioEhLogistica() ||
      usuarioEhCODAEGabinete() ||
      usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_REQUISICAO_ENTREGA}`,
    component: GestaoRequisicaoEntregaPage,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_SOLICITACAO_ALTERACAO}`,
    component: GestaoSolicitacaoAlteracaoPage,
    tipoUsuario:
      usuarioEhLogistica() ||
      usuarioEhCODAEGabinete() ||
      usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONSULTA_SOLICITACAO_ALTERACAO}`,
    component: ConsultaSolicitacaoAlteracaoPage,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.INSUCESSO_ENTREGA}`,
    component: InsucessoEntregaPage,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_INCONSISTENCIAS}`,
    component: ConferenciaInconsistenciasPage,
    tipoUsuario: usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERIR_ENTREGA}`,
    component: ConferirEntregaPage,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA}`,
    component: ConferenciaDeGuiaPage,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REGISTRAR_INSUCESSO}`,
    component: RegistrarInsucessoEntregaPage,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA_COM_OCORRENCIA}`,
    component: ConferenciaDeGuiaComOcorrenciaPage,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA_RESUMO_FINAL}`,
    component: ConferenciaDeGuiaResumoFinalPage,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.DETALHAMENTO_GUIA}`,
    component: DetalhamentoGuiaPage,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REPOSICAO_GUIA}`,
    component: ReposicaoDeGuiaPage,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REPOSICAO_RESUMO_FINAL}`,
    component: ReposicaoResumoFinalPage,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DILOG}`,
    component: EntregasDilogPage,
    tipoUsuario: usuarioComAcessoTelaEntregasDilog(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DISTRIBUIDOR}`,
    component: EntregasDistribuidorPage,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DRE}`,
    component: EntregasDrePage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GUIAS_NOTIFICACAO}`,
    component: GuiasNotificacoesPage,
    tipoUsuario:
      usuarioEhCodaeDilog() ||
      usuarioEhDilogJuridico() ||
      usuarioEhCODAEGabinete() ||
      usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GUIAS_NOTIFICACAO_FISCAL}`,
    component: GuiasNotificacoesFiscalPage,
    tipoUsuario: usuarioEhDilog(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CADASTRO_NOTIFICACAO}`,
    component: CadastroNotificacaoPage,
    tipoUsuario: usuarioEhCodaeDilog() || usuarioEhDilogJuridico(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.NOTIFICAR_EMPRESA}`,
    component: NotificarEmpresaPage,
    tipoUsuario: usuarioEhCodaeDilog() || usuarioEhDilogJuridico(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.EDITAR_NOTIFICACAO}`,
    component: EditarNotificacaoPage,
    tipoUsuario: usuarioEhCodaeDilog() || usuarioEhDilogJuridico(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.DETALHAR_NOTIFICACAO}`,
    component: DetalharNotificacaoPage,
    tipoUsuario: usuarioComAcessoTelaDetalharNotificacaoOcorrencia(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ANALISAR_ASSINAR}`,
    component: AnalisarAssinarPage,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhDilog(),
  },
];
