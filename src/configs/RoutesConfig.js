import { Login } from "../components/Login";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import CadastroHorarioComboAlimentacaoPage from "../pages/Cadastros/CadastroHorarioComboAlimentacaoPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import CadastroGeralPage from "../pages/Cadastros/CadastroGeralPage";
import CadastroTipoAlimentacaoPage from "../pages/Cadastros/CadastroTipoAlimentacaoPage";
import FaixasEtariasPage from "../pages/Cadastros/FaixasEtariasPage";
import ConsultaKitLanchePage from "../pages/Cadastros/ConsultaKitLanchePage";
import CadastroKitLanchePage from "../pages/Cadastros/CadastroKitLanchePage";
import EditaisCadastradosPage from "../pages/Cadastros/EditaisCadastradosPage";
import EditaisContratosPage from "../pages/Cadastros/EditaisContratosPage";
import EmpresasCadastradas from "../pages/Cadastros/EmpresasCadastradasPage";
import LotesCadastradosPage from "../pages/Cadastros/LotesCadastradosPage";
import PainelPedidosAlteracaoDeCardapioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/PainelPedidosPage";
import DashboardCODAEDetailDRE from "../pages/CODAE/DashboardCODAEDetailDRE";
import PainelPedidosInclusaoDeAlimentacaoCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioCODAEPage from "../pages/CODAE/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosSolicitacaoUnificadaCODAEPage from "../pages/CODAE/SolicitacaoUnificada/PainelPedidosPage";
import StatusSolicitacoesAutorizadasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesAutorizadasCODAEPage";
import StatusSolicitacoesCanceladasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesCanceladasCODAEPage";
import StatusSolicitacoesPendentesCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesPendentesCODAEPage";
import StatusSolicitacoesRecusadasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesRecusadasCODAEPage";
import StatusSolicitacoesComQuestionamentosCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesComQuestionamentosCODAEPage";
import StatusSolicitacoesAutorizadasNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesAutorizadasNutrisupervisaoPage";
import StatusSolicitacoesCanceladasNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesCanceladasNutrisupervisaoPage";
import StatusSolicitacoesPendentesNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesPendentesNutrisupervisaoPage";
import StatusSolicitacoesRecusadasNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesRecusadasNutrisupervisaoPage";
import StatusSolicitacoesComQuestionamentosNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesComQuestionamentosNutrisupervisaoPage";
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import { DietaEspecialAluno } from "../pages/DietaEspecial/DashboardDietaEspecialPage";
import RelatorioAlunosDietasAtivasInativasPage from "../pages/DietaEspecial/RelatorioAlunosDietasAtivasInativasPage.jsx";
import ProtocoloPadraoDietaEspecialPage from "../pages/DietaEspecial/ProtocoloPadraoDietaEspecialPage.jsx";
import EditaProtocoloPadraoDieta from "pages/DietaEspecial/EditaProtocoloPadraoDieta";
import CriarCopiaProtocoloPadraoDieta from "pages/DietaEspecial/CriarCopiaProtocoloPadraoDieta";
import ConsultaProtocoloPadraoDietaEspecial from "../pages/DietaEspecial/ConsultaProtocoloPadraoDietaEspecial.jsx";
import PainelPedidosAlteracaoDeCardapioDREPage from "../pages/DRE/AlteracaoDeCardapio/PainelPedidosPage";
import PainelPedidosInclusaoDeAlimentacaoDREPage from "../pages/DRE/InclusaoDeAlimentacao/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioDREPage from "../pages/DRE/InversaoDiaCardapio/PainelPedidosPage";
import SolicitacaoUnificadaPage from "../pages/DRE/SolicitacaoUnificadaPage";
import StatusSolicitacoesAutorizadasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesAutorizadasDREPage";
import StatusSolicitacoesCanceladasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesCanceladasDREPage";
import StatusSolicitacoesPendentesDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesPendentesDREPage";
import StatusSolicitacoesRecusadasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesRecusadasDREPage";
import DietaEspecialEscolaPage from "../pages/Escola/DietaEspecial/DietaEspecialEscolaPage";
import DietaEspecialAlteracaoUEPage from "../pages/Escola/DietaEspecial/AlteracaoUEPage";
import StatusSolicitacoesAutorizadasEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesAutorizadasEscolaPage";
import StatusSolicitacoesCanceladasEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesCanceladasEscolaPage";
import StatusSolicitacoesPendentesEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesPendentesEscolaPage";
import StatusSolicitacoesRecusadasEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesRecusadasEscolaPage";
import StatusSolicitacoesPage from "../pages/Escola/StatusSolicitacoesPage";

import * as RelatorioPageInversaoDiaCardapio from "../pages/InversaoDeDiaDeCardapio/RelatorioPage";
import PerfilPage from "../pages/Perfil/PerfilPage";
import * as PainelPageKitLanche from "../pages/SolicitacaoDeKitLanche/ContainerPage";
import PainelPedidosAlteracaoDeCardapioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/PainelPedidosPage";
import PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioTerceirizadaPage from "../pages/Terceirizada/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosSolicitacaoUnificadaTerceirizadaPage from "../pages/Terceirizada/SolicitacaoUnificada/PainelPedidosPage";
import StatusSolicitacoesAutorizadasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesAutorizadas";
import StatusQuestionamentosCodaePage from "../pages/Terceirizada/StatusSolicitacoes/StatusQuestionamentosCodae";
import StatusSolicitacoesCanceladasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesCanceladasTerceirizada";
import StatusSolicitacoesNegadasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesNegadasTerceirizada";
import StatusSolicitacoesPendentesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesPendentes";
import PainelPedidosSuspensaoAlimentacao from "../pages/Terceirizada/SuspensaoAlimentacao/PainelPedidosPage";
import PainelPedidosSuspensaoAlimentacaoRelatorio from "../pages/Terceirizada/SuspensaoAlimentacao/RelatorioPage";
import FaqPage from "../pages/Faq/FaqPage";
import RelatorioProdutosHomologadosPage from "pages/RelatorioProdutosHomologados/RelatorioProdutosHomologadosPage";
import RelatorioSituacaoProduto from "pages/Produto/RelatorioSituacaoProduto";
import RelatorioReclamacaoProduto from "pages/Produto/RelatorioReclamacaoProduto";

import * as constants from "./constants";
import {
  alteracaoCardapio,
  suspensaoAlimentacao,
  dashBoardDietaEspecial,
  painelGestaoAlimentacao,
  painelInicial,
  permissoes,
  relatorios,
  relatoriosAlteracaoDeCardapio,
  relatoriosDietaEspecial,
  relatoriosInclusaoDeAlimentacao,
  relatoriosInversaoDiaCardapio,
  relatoriosSolicitacaoKitLanche,
  relatoriosSolicitacaoUnificada,
  StatusSolicitacoesDietaEspecial,
  inclusaoCardapio
} from "./helper";
import * as statusSolicitacoesPaginas from "./imports/StatusSolicitacoesPaginas";
import {
  usuarioEhEscola,
  usuarioEhEscolaAbastecimento,
  usuarioEhDRE,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhTerceirizada,
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGestaoProduto,
  usuarioEhQualquerCODAE,
  usuarioEhNutricionistaSupervisao,
  usuarioEhLogistica,
  usuarioEhDistribuidora,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEscolaEhGestaoMistaParceira,
  validaPerfilEscolaMistaParceira
} from "../helpers/utilities";
import CadastroProdutoPage from "../pages/Produto/CadastroProdutoPage";
import AtualizacaoProdutoFormPage from "../pages/Produto/AtualizacaoProdutoFormPage";
import HomologacaoProdutoPage from "../pages/Produto/HomologacaoProdutoPage";
import BuscaAvancadaProdutoPage from "../pages/Produto/BuscaAvancadaProdutoPage";
import BuscaProdutoAnaliseSensorial from "../pages/Produto/BuscaProdutoAnaliseSensorial";
import RelatorioAnaliseSensorial from "../pages/Produto/RelatorioAnaliseSensorial";
import AvaliarReclamacaoProdutoPage from "../pages/Produto/AvaliarReclamacaoProdutoPage";
import RelatorioProduto from "../pages/Produto/RelatorioProduto";
import * as StatusSolicitacoesGestaoProduto from "../pages/Produto/StatusSolicitacoesGestaoProduto";
import DashboardGestaoProdutoPage from "../pages/DashboardGestaoProduto/DashboardGestaoProdutoPage";
import BuscaProdutosSuspensos from "../pages/Produto/BuscaProdutosSuspensos";
import BuscaAvancadaProdutoAnaliseSensorial from "../pages/Produto/BuscaAvancadaProdutoAnaliseSensorial";
import {
  ReclamacaoDeProdutoPage,
  ConsultaAtivacaoDeProdutoPage,
  AtivacaoDeProdutoPage,
  ConsultaResponderReclamacaoPage,
  ResponderReclamacaoPage,
  RelatorioQuantitativoPorTerceirizadaPage,
  ResponderQuestionamentoUEPage,
  ResponderQuestionamentoNutrisupervisorPage
} from "../pages/Produto";
import AvaliarSolicitacaoCadastroProdutoPage from "pages/Produto/AvaliarSolicitacaoCadastroProdutoPage";
import AcompanharSolicitacaoCadastroProdutoPage from "pages/Produto/AcompanharSolicitacaoCadastroProdutoPage";
import { podeAcessarRelatorioQuantSolicDietaEsp } from "helpers/permissions";
import RelatorioQuantitativoSolicDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoSolicDietaEspPage";
import RelatorioQuantitativoClassificacaoDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoClassificacaoDietaEspPage";
import RelatorioQuantitativoDiagDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoDiagDietaEspPage";
import RelatorioDietaEspecial from "pages/DietaEspecial/RelatorioDietaEspecial";
import CancelamentoDietaPage from "pages/DietaEspecial/CancelamentoDietaPage";
import LancamentoMedicaoInicialPage from "pages/LancamentoInicial/LancamentoMedicaoInicialPage";
import DisponibilizacaoDeSolicitacoesPage from "pages/Logistica/DisponibilizacaoDeSolicitacoesPage";
import FiltroRequisicaoDilog from "pages/Logistica/FiltroRequisicaoDilog";
import ConsultaRequisicaoEntregaDilog from "pages/Logistica/ConsultaRequisicaoEntregaDilog";
import GestaoRequisicaoEntregaPage from "pages/Logistica/GestaoRequisicaoEntregaPage";
import GestaoSolicitacaoAlteracaoPage from "pages/Logistica/GestaoSolicitacaoAlteracaoPage";
import ConsultaSolicitacaoAlteracaoPage from "pages/Logistica/ConsultaSolicitacaoAlteracaoPage";
import InsucessoEntregaPage from "pages/Logistica/InsucessoEntregaPage";
import ConferenciaInconsistenciasPage from "pages/Logistica/ConferenciaInconsistenciasPage";
import ConferirEntregaPage from "pages/Logistica/ConferirEntregaPage";
import ConferenciaDeGuiaPage from "pages/Logistica/ConferenciaDeGuiaPage";
import ReposicaoDeGuiaPage from "pages/Logistica/ReposicaoDeGuiaPage";
import RegistrarInsucessoEntregaPage from "pages/Logistica/RegistrarInsucessoEntregaPage";
import ConferenciaDeGuiaComOcorrenciaPage from "pages/Logistica/ConferenciaDeGuiaComOcorrenciaPage";
import ConferenciaDeGuiaResumoFinalPage from "pages/Logistica/ConferenciaDeGuiaResumoFinalPage";
import EntregasDilogPage from "pages/Logistica/EntregasDilogPage";
import EntregasDistribuidorPage from "pages/Logistica/EntregasDistribuidorPage";
import EntregasDrePage from "pages/Logistica/EntregasDrePage";
import ReposicaoResumoFinalPage from "pages/Logistica/ReposicaoResumoFinalPage";
import NotificacoesPage from "pages/Notificacoes/NotificacoesPage";

const routesConfig = [
  {
    path: `/${constants.ALUNO}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialAluno,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: "/",
    component: painelInicial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: "/painel-gestao-alimentacao",
    component: painelGestaoAlimentacao(),
    exact: true,
    tipoUsuario:
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()) ||
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhTerceirizada()
  },
  {
    path: "/login",
    component: Login,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },

  {
    path: "/perfil",
    component: PerfilPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: "/relatorios",
    component: relatorios(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialEscolaPage,
    exact: false,
    tipoUsuario: usuarioEhEscola()
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.CANCELAMENTO}`,
    component: CancelamentoDietaPage,
    exact: false,
    tipoUsuario: usuarioEhEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL_ALTERACAO_UE}`,
    component: DietaEspecialAlteracaoUEPage,
    exact: false,
    tipoUsuario: usuarioEhEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasEscolaPage,
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesEscolaPage,
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasEscolaPage,
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasEscolaPage,
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/status-solicitacoes`,
    component: StatusSolicitacoesPage,
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: inclusaoCardapio(),
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: alteracaoCardapio(),
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    //AQUI POW
    component: PainelPageKitLanche.PainelPedidosEscola,
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.INVERSAO_CARDAPIO}`,
    component: RelatorioPageInversaoDiaCardapio.InversaoDeDiaDeCardapioPage,
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: suspensaoAlimentacao(),
    exact: false,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES}`,
    component: statusSolicitacoesPaginas.SolicitacoesTotalDRE,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosDRE,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: SolicitacaoUnificadaPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_COM_QUESTIONAMENTO}`,
    component: StatusSolicitacoesComQuestionamentosCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: PainelPedidosSolicitacaoUnificadaCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao()
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao()
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao()
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao()
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${
      constants.SOLICITACOES_COM_QUESTIONAMENTO
    }`,
    component: StatusSolicitacoesComQuestionamentosNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${
      constants.SOLICITACOES_COM_QUESTIONAMENTO
    }`,
    component: StatusQuestionamentosCodaePage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesNegadasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.DRE}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosTerceirizada,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${
      constants.SOLICITACAO_KIT_LANCHE_UNIFICADA
    }`,
    component: PainelPedidosSolicitacaoUnificadaTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.SUSPENSAO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: PainelPedidosSuspensaoAlimentacaoRelatorio,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: PainelPedidosSuspensaoAlimentacao,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/configuracoes/cadastros/lotes-cadastrados`,
    component: LotesCadastradosPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/configuracoes/cadastros/editais-cadastrados`,
    component: EditaisCadastradosPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE()
  },
  {
    path: `/configuracoes/cadastros/lote`,
    component: CadastroLotePage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao`,
    component: CadastroTipoAlimentacaoPage,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE()
  },
  {
    path: `/configuracoes/cadastros/horario-combos-alimentacao`,
    component: CadastroHorarioComboAlimentacaoPage,
    exact: false,
    tipoUsuario: usuarioEhEscola()
  },
  {
    path: `/configuracoes/cadastros/empresas-cadastradas`,
    component: EmpresasCadastradas,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE() || usuarioEhLogistica()
  },
  {
    path: `/configuracoes/cadastros/empresa`,
    component: CadastroEmpresaPage,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE() || usuarioEhLogistica()
  },
  {
    path: `/configuracoes/cadastros/editais-contratos`,
    component: EditaisContratosPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE()
  },
  {
    path: `/configuracoes/cadastros/faixas-etarias`,
    component: FaixasEtariasPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${
      constants.CONSULTA_KITS
    }`,
    component: ConsultaKitLanchePage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.KITS}`,
    component: CadastroKitLanchePage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.KITS}/:uuid/${
      constants.EDITAR
    }`,
    component: CadastroKitLanchePage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/configuracoes/cadastros`,
    component: CadastrosPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/configuracoes/mensagem`,
    component: MensagemPage,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE()
  },
  {
    path: `/configuracoes/permissoes`,
    component: permissoes(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/configuracoes`,
    component: ConfigEmailPage,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE()
  },
  {
    path: `/${constants.ALTERACAO_TIPO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: relatoriosAlteracaoDeCardapio(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.INCLUSAO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: relatoriosInclusaoDeAlimentacao(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO}`,
    component: relatoriosDietaEspecial(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/ativas-inativas`,
    component: RelatorioAlunosDietasAtivasInativasPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.INVERSAO_CARDAPIO}/${constants.RELATORIO}`,
    component: relatoriosInversaoDiaCardapio(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE}/${constants.RELATORIO}`,
    component: relatoriosSolicitacaoKitLanche(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}/${
      constants.RELATORIO
    }`,
    component: relatoriosSolicitacaoUnificada(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosCODAE,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.DETALHE_DASHBOARD_DRE}`,
    component: DashboardCODAEDetailDRE,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/painel-dieta-especial`,
    component: dashBoardDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscola() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhTerceirizada()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_PENDENTES
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscola() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhTerceirizada()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_NEGADAS
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscola() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhTerceirizada()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_AUTORIZADAS
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscola() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhTerceirizada()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_CANCELADAS
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_AUTORIZADAS_TEMPORARIAMENTE
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_AGUARDANDO_INICIO_VIGENCIA
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_INATIVAS
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_INATIVAS_TEMPORARIAMENTE
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/ajuda`,
    component: FaqPage,
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.PRODUTO}`,
    component: CadastroProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.EDITAR}`,
    component: AtualizacaoProdutoFormPage,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.BUSCA_PRODUTO}`,
    component: BuscaAvancadaProdutoPage,
    exact: true,
    tipoUsuario: validaPerfilEscolaMistaParceira()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.AVALIAR_RECLAMACAO_PRODUTO
    }`,
    component: AvaliarReclamacaoProdutoPage,
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${
      constants.BUSCA_PRODUTO_ANALISE_SENSORIAL
    }`,
    component: BuscaProdutoAnaliseSensorial,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.RELATORIO_ANALISE_SENSORIAL
    }`,
    component: BuscaAvancadaProdutoAnaliseSensorial,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada() || usuarioEhCODAEGestaoProduto()
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${
      constants.RELATORIO_ANALISE_SENSORIAL
    }`,
    component: RelatorioAnaliseSensorial,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${
      constants.RELATORIO_PRODUTO
    }`,
    component: RelatorioProduto,
    exact: true,
    tipoUsuario: validaPerfilEscolaMistaParceira()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.RELATORIO_SITUACAO_PRODUTO
    }`,
    component: RelatorioSituacaoProduto,
    exact: true,
    tipoUsuario: validaPerfilEscolaMistaParceira()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.RELATORIO_RECLAMACAO_PRODUTO
    }`,
    component: RelatorioReclamacaoProduto,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-questionamento-ue`,
    component: ResponderQuestionamentoUEPage,
    exact: true,
    tipoUsuario: usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()
  },
  {
    path: `/${
      constants.GESTAO_PRODUTO
    }/responder-questionamento-nutrisupervisor`,
    component: ResponderQuestionamentoNutrisupervisorPage,
    exact: true,
    tipoUsuario: usuarioEhNutricionistaSupervisao()
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${
      constants.HOMOLOGACAO_PRODUTO
    }`,
    component: HomologacaoProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RELATORIO}`,
    component: HomologacaoProdutoPage,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.RECLAMACAO_DE_PRODUTO
    }`,
    component: StatusSolicitacoesGestaoProduto.ReclamacaoDeProduto,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.PRODUTOS_SUSPENSOS
    }`,
    component: StatusSolicitacoesGestaoProduto.ProdutosSuspensos,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.CORRECAO_DE_PRODUTO
    }`,
    component: StatusSolicitacoesGestaoProduto.CorrecaoDeProduto,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada() || usuarioEhCODAEGestaoProduto()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO
        .AGUARDANDO_ANALISE_RECLAMACAO
    }`,
    component: StatusSolicitacoesGestaoProduto.AguardandoAnaliseReclamacao,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhNutricionistaSupervisao() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO
        .RESPONDER_QUESTIONAMENTOS_DA_CODAE
    }`,
    component: StatusSolicitacoesGestaoProduto.ResponderQuestionamentoDaCodae,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhNutricionistaSupervisao() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO
        .AGUARDANDO_ANALISE_SENSORIAL
    }`,
    component: StatusSolicitacoesGestaoProduto.AguardandoAnaliseSensorial,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada() || usuarioEhCODAEGestaoProduto()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO
        .SOLICITACOES_PENDENTE_HOMOLOGACAO
    }`,
    component: StatusSolicitacoesGestaoProduto.PendenteHomologacao,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada() || usuarioEhCODAEGestaoProduto()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_HOMOLOGADAS
    }`,
    component: StatusSolicitacoesGestaoProduto.Homologados,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhDRE() ||
      usuarioEhNutricionistaSupervisao() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO
        .SOLICITACOES_NAO_HOMOLOGADAS
    }`,
    component: StatusSolicitacoesGestaoProduto.NaoHomologados,
    exact: true,
    tipoUsuario:
      usuarioEhTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhDRE() ||
      usuarioEhNutricionistaSupervisao() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: "/painel-gestao-produto",
    component: DashboardGestaoProdutoPage,
    exact: true,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhTerceirizada() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()) ||
      usuarioEhDRE()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RECLAMACAO_DE_PRODUTO}`,
    component: ReclamacaoDeProdutoPage,
    exact: true,
    tipoUsuario:
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.SUSPENSAO_DE_PRODUTO}`,
    component: BuscaProdutosSuspensos,
    exact: true,
    tipoUsuario:
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhTerceirizada() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira())
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ATIVACAO_DE_PRODUTO
    }/consulta`,
    component: ConsultaAtivacaoDeProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ATIVACAO_DE_PRODUTO
    }/detalhe`,
    component: AtivacaoDeProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/relatorios/produtos-homologados`,
    component: RelatorioProdutosHomologadosPage,
    exact: true,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhTerceirizada() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()) ||
      usuarioEhNutricionistaSupervisao()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-reclamacao/consulta`,
    component: ConsultaResponderReclamacaoPage,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-reclamacao/detalhe`,
    component: ResponderReclamacaoPage,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/cadastro-geral`,
    component: CadastroGeralPage,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada() || usuarioEhCODAEGestaoProduto()
  },
  {
    path: `/${
      constants.GESTAO_PRODUTO
    }/relatorios/quantitativo-por-terceirizada`,
    component: RelatorioQuantitativoPorTerceirizadaPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.AVALIAR_SOLICITACAO_CADASTRO_PRODUTO
    }`,
    component: AvaliarSolicitacaoCadastroProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhTerceirizada()
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${
      constants.ACOMPANHAR_SOLICITACAO_CADASTRO_PRODUTO
    }`,
    component: AcompanharSolicitacaoCadastroProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial()
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${
      constants.RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP
    }`,
    component: RelatorioQuantitativoSolicDietaEspPage,
    exact: true,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${
      constants.RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP
    }`,
    component: RelatorioQuantitativoClassificacaoDietaEspPage,
    exact: true,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${
      constants.RELATORIO_QUANTITATIVO_DIAG_DIETA_ESP
    }`,
    component: RelatorioQuantitativoDiagDietaEspPage,
    exact: true,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_DIETA_ESPECIAL}`,
    component: RelatorioDietaEspecial,
    exact: true,
    tipoUsuario:
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      usuarioEhEscola()
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.PROTOCOLO_PADRAO_DIETA}`,
    component: ProtocoloPadraoDietaEspecialPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial()
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${
      constants.CONSULTA_PROTOCOLO_PADRAO_DIETA
    }`,
    component: ConsultaProtocoloPadraoDietaEspecial,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial()
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/protocolo-padrao/:uuid/editar`,
    component: EditaProtocoloPadraoDieta,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial()
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/protocolo-padrao/:uuid/criar-copia`,
    component: CriarCopiaProtocoloPadraoDieta,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial()
  },
  {
    path: `/${constants.LANCAMENTO_INICIAL}/${
      constants.LANCAMENTO_MEDICAO_INICIAL
    }`,
    component: LancamentoMedicaoInicialPage,
    exact: true,
    tipoUsuario: usuarioEhEscola()
  },
  {
    path: `/${constants.LOGISTICA}/${
      constants.DISPONIBILIZACAO_DE_SOLICITACOES
    }`,
    component: DisponibilizacaoDeSolicitacoesPage,
    exact: true,
    tipoUsuario: usuarioEhLogistica()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENVIO_REQUISICOES_ENTREGA}`,
    component: FiltroRequisicaoDilog,
    exact: true,
    tipoUsuario: usuarioEhLogistica()
  },
  {
    path: `/${constants.LOGISTICA}/${
      constants.ENVIO_REQUISICOES_ENTREGA_AVANCADO
    }`,
    component: ConsultaRequisicaoEntregaDilog,
    exact: true,
    tipoUsuario: usuarioEhLogistica()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_REQUISICAO_ENTREGA}`,
    component: GestaoRequisicaoEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhDistribuidora()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_SOLICITACAO_ALTERACAO}`,
    component: GestaoSolicitacaoAlteracaoPage,
    exact: true,
    tipoUsuario: usuarioEhLogistica()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONSULTA_SOLICITACAO_ALTERACAO}`,
    component: ConsultaSolicitacaoAlteracaoPage,
    exact: true,
    tipoUsuario: usuarioEhDistribuidora()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.INSUCESSO_ENTREGA}`,
    component: InsucessoEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhDistribuidora()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_INCONSISTENCIAS}`,
    component: ConferenciaInconsistenciasPage,
    exact: true,
    tipoUsuario: usuarioEhLogistica()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERIR_ENTREGA}`,
    component: ConferirEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaAbastecimento()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA}`,
    component: ConferenciaDeGuiaPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaAbastecimento()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REGISTRAR_INSUCESSO}`,
    component: RegistrarInsucessoEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhDistribuidora()
  },
  {
    path: `/${constants.LOGISTICA}/${
      constants.CONFERENCIA_GUIA_COM_OCORRENCIA
    }`,
    component: ConferenciaDeGuiaComOcorrenciaPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaAbastecimento()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA_RESUMO_FINAL}`,
    component: ConferenciaDeGuiaResumoFinalPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaAbastecimento()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REPOSICAO_GUIA}`,
    component: ReposicaoDeGuiaPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaAbastecimento()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REPOSICAO_RESUMO_FINAL}`,
    component: ReposicaoResumoFinalPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaAbastecimento()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DILOG}`,
    component: EntregasDilogPage,
    exact: true,
    tipoUsuario:
      usuarioComAcessoTelaEntregasDilog() ||
      usuarioEhCoordenadorNutriSupervisao()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DISTRIBUIDOR}`,
    component: EntregasDistribuidorPage,
    exact: true,
    tipoUsuario: usuarioEhDistribuidora()
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DRE}`,
    component: EntregasDrePage,
    exact: true,
    tipoUsuario: usuarioEhDRE()
  },
  {
    path: `/${constants.NOTIFICACOES}`,
    component: NotificacoesPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO
  }
];

export default routesConfig;
