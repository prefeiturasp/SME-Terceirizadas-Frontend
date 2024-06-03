import CriarCopiaProtocoloPadraoDieta from "pages/DietaEspecial/CriarCopiaProtocoloPadraoDieta";
import EditaProtocoloPadraoDieta from "pages/DietaEspecial/EditaProtocoloPadraoDieta";
import { Login } from "../components/Login";
import CadastroGeralPage from "../pages/Cadastros/CadastroGeralPage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import VincularProdutosEditaisPage from "../pages/Cadastros/VincularProdutosEditaisPage";
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import GerenciamentoEmailsPage from "../pages/Configuracoes/GerenciamentoEmailsPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import ConsultaProtocoloPadraoDietaEspecial from "../pages/DietaEspecial/ConsultaProtocoloPadraoDietaEspecial.jsx";
import ProtocoloPadraoDietaEspecialPage from "../pages/DietaEspecial/ProtocoloPadraoDietaEspecialPage.jsx";
import RelatorioAlunosDietasAtivasInativasPage from "../pages/DietaEspecial/RelatorioAlunosDietasAtivasInativasPage.jsx";

import CadastroProdutosEdital from "pages/Cadastros/CadastroProdutosEdital";
import RelatorioReclamacaoProduto from "pages/Produto/RelatorioReclamacaoProduto";
import RelatorioProdutosHomologadosPage from "pages/RelatorioProdutosHomologados/RelatorioProdutosHomologadosPage";
import FaqPage from "../pages/Faq/FaqPage";
import PerfilPage from "../pages/Perfil/PerfilPage";
import * as PainelPageKitLanche from "../pages/SolicitacaoDeKitLanche/ContainerPage";
import PainelPedidosAlteracaoDeCardapioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/PainelPedidosPage";

import { podeAcessarRelatorioQuantSolicDietaEsp } from "helpers/permissions";

import CentralDownloadsPage from "pages/CentralDownloads/CentralDownloadsPage";
import AtualizacaoEmailEOLPage from "pages/Configuracoes/AtualizacaoEmailEOLPage";
import CargasUsuariosPage from "pages/Configuracoes/CargasUsuariosPage";
import CargasUsuariosServidoresPage from "pages/Configuracoes/CargasUsuariosServidoresPage";
import GestaoAcessoCodaeDilogPage from "pages/Configuracoes/GestaoAcessoCodaeDilogPage";
import GestaoAcessoCogestorPage from "pages/Configuracoes/GestaoAcessoCogestorPage";
import GestaoAcessoDiretorEscolaPage from "pages/Configuracoes/GestaoAcessoDiretorEscolaPage";
import GestaoAcessoEmpresaPage from "pages/Configuracoes/GestaoAcessoEmpresaPage";
import GestaoAcessoGeralPage from "pages/Configuracoes/GestaoAcessoGeralPage";
import GestaoAcessoMasterPage from "pages/Configuracoes/GestaoAcessoMasterPage";
import RelatorioDietasAutorizadas from "pages/DietaEspecial/RelatorioDietasAutorizadas";
import RelatorioDietasCanceladas from "pages/DietaEspecial/RelatorioDietasCanceladas";
import RelatorioGestaoDietaEspecial from "pages/DietaEspecial/RelatorioGestaoDietaEspecial";
import RelatorioQuantitativoClassificacaoDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoClassificacaoDietaEspPage";
import RelatorioQuantitativoDiagDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoDiagDietaEspPage";
import RelatorioQuantitativoSolicDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoSolicDietaEspPage";
import StatusCronogramasAguardandoDilog from "pages/Dinutre/Cronogramas/StatusCronogramasAguardandoDilog";
import StatusCronogramasAssinadoCODAE from "pages/Dinutre/Cronogramas/StatusCronogramasAssinadoCODAE";
import StatusCronogramasPendentesDinutre from "pages/Dinutre/Cronogramas/StatusCronogramasPendentesDinutre";
import StatusSolicitacoesAlteracoesAprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDilog";
import StatusSolicitacoesAlteracoesAprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDinutre";
import StatusSolicitacoesAlteracoesDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDilog";
import StatusSolicitacoesAlteracoesDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDinutre";
import StatusSolicitacoesAlteracoesReprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDilog";
import StatusSolicitacoesAlteracoesReprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDinutre";
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
import NotificacoesPage from "pages/Notificacoes/NotificacoesPage";
import AlterarCronogramaPage from "pages/PreRecebimento/AlterarCronogramaPage";
import CadastroCronogramaPage from "pages/PreRecebimento/CadastroCronogramaPage";
import CronogramaEntregaPage from "pages/PreRecebimento/CronogramaEntregaPage";
import DetalharCronogramaPage from "pages/PreRecebimento/DetalharCronogramaPage";
import AnaliseDilogCronogramaPage from "pages/PreRecebimento/DetalharSolicitacaoCronograma";
import EditarCronogramaPage from "pages/PreRecebimento/EditarCronogramaPage";
import PainelAprovacoesPage from "pages/PreRecebimento/PainelAprovacoesPage";
import SolicitacaoAlteracaoCronogramaFornecedorPage from "pages/PreRecebimento/SolicitacaoAlteracaoCronogramaFornecedorPage";
import SolicitacaoAlteracaoCronogramaPage from "pages/PreRecebimento/SolicitacaoAlteracaoCronogramaPage";
import AcompanharSolicitacaoCadastroProdutoPage from "pages/Produto/AcompanharSolicitacaoCadastroProdutoPage";
import AvaliarSolicitacaoCadastroProdutoPage from "pages/Produto/AvaliarSolicitacaoCadastroProdutoPage";
import RelatorioAlunosMatriculadosPage from "pages/Relatorios/RelatorioAlunosMatriculadosPage";
import RelatorioSolicitacoesAlimentacaoPage from "pages/Relatorios/RelatorioSolicitacoesAlimentacaoPage";
import {
  ehUsuarioRelatorios,
  usuarioComAcessoAoCalendarioCronograma,
  usuarioComAcessoAoPainelAprovacoes,
  usuarioComAcessoAoPainelDocumentos,
  usuarioComAcessoAoPainelEmbalagens,
  usuarioComAcessoAoPainelFichasTecnicas,
  usuarioComAcessoAoRelatorioCronogramas,
  usuarioComAcessoTelaDetalharNotificacaoOcorrencia,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEhAdmQualquerEmpresa,
  usuarioEhAdministradorNutriCODAE,
  usuarioEhAdministradorRepresentanteCodae,
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGabinete,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEGestaoProduto,
  usuarioEhCODAENutriManifestacao,
  usuarioEhCodaeDilog,
  usuarioEhCogestorDRE,
  usuarioEhCoordenadorCODAE,
  usuarioEhCoordenadorGpCODAE,
  usuarioEhCoordenadorNutriCODAE,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEhCronograma,
  usuarioEhDRE,
  usuarioEhDilog,
  usuarioEhDilogDiretoria,
  usuarioEhDilogJuridico,
  usuarioEhDilogQualidade,
  usuarioEhDinutreDiretoria,
  usuarioEhDiretorUE,
  usuarioEhEmpresaDistribuidora,
  usuarioEhEmpresaFornecedor,
  usuarioEhEmpresaTerceirizada,
  usuarioEhEscolaAbastecimento,
  usuarioEhEscolaAbastecimentoDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhGticCODAE,
  usuarioEhLogistica,
  usuarioEhMedicao,
  usuarioEhNutricionistaSupervisao,
  usuarioEhOrgaoFiscalizador,
  usuarioEhPreRecebimento,
  usuarioEhQualquerCODAE,
  usuarioEhRecebimento,
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoParceira,
  validaPerfilEscolaMistaParceira,
} from "../helpers/utilities";
import DashboardGestaoProdutoPage from "../pages/DashboardGestaoProduto/DashboardGestaoProdutoPage";
import RelatorioGerencialDietas from "../pages/DietaEspecial/RelatorioGerencialDietas.jsx";
import StatusAguardandoAssinaturasCronograma from "../pages/Dinutre/Cronogramas/StatusAguardandoAssinaturasCronograma";
import StatusCronogramasPendentesDilog from "../pages/Dinutre/Cronogramas/StatusCronogramasPendentesDilog";
import StatusSolicitacoesAlteracoesCodae from "../pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesCodae";
import StatusSolicitacoesAlteracoesCronograma from "../pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesCronograma";
import AnalisarDocumentosRecebimentoPage from "../pages/PreRecebimento/AnalisarDocumentosRecebimentoPage";
import AnalisarLayoutEmbalagemPage from "../pages/PreRecebimento/AnalisarLayoutEmbalagemPage";
import AtualizarLayoutEmbalagemPage from "../pages/PreRecebimento/AtualizarLayoutEmbalagemPage";
import CadastroDocumentosRecebimentoPage from "../pages/PreRecebimento/CadastroDocumentosRecebimentoPage";
import CadastroLayoutEmbalagemPage from "../pages/PreRecebimento/CadastroLayoutEmbalagemPage";
import CalendarioCronogramaPage from "../pages/PreRecebimento/CalendarioCronogramaPage";
import StatusDocumentoAprovados from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoAprovados";
import StatusDocumentoEnviadosParaCorrecao from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoEnviadosParaCorrecao";
import StatusDocumentoPendenteAprovacao from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoPendenteAprovacao";
import StatusFichasTecnicasAprovadas from "../pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasAprovadas";
import StatusFichasTecnicasEnviadosParaCorrecao from "../pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasEnviadosParaCorrecao";
import StatusFichasTecnicasPendenteAprovacao from "../pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasPendenteAprovacao";
import StatusLayoutAprovados from "../pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutAprovados";
import StatusLayoutEnviadosParaCorrecao from "../pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutEnviadosParaCorrecao";
import StatusLayoutPendenteAprovacao from "../pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutPendenteAprovacao";
import CorrigirDocumentosRecebimentoPage from "../pages/PreRecebimento/CorrigirDocumentosRecebimentoPage";
import CorrigirLayoutEmbalagemPage from "../pages/PreRecebimento/CorrigirLayoutEmbalagemPage";
import DetalharCodaeDocumentosRecebimentoPage from "../pages/PreRecebimento/DetalharCodaeDocumentosRecebimentoPage";
import DetalharFornecedorDocumentosRecebimentoPage from "../pages/PreRecebimento/DetalharFornecedorDocumentosRecebimentoPage";
import DetalharLayoutEmbalagemPage from "../pages/PreRecebimento/DetalharLayoutEmbalagemPage";
import DetalharSolicitacaoAlteracaoLayoutEmbalagemPage from "../pages/PreRecebimento/DetalharSolicitacaoAlteracaoLayoutEmbalagemPage";
import DocumentosRecebimentoPage from "../pages/PreRecebimento/DocumentosRecebimentoPage";
import AlterarFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/AlterarFichaTecnicaPage";
import AnalisarFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/AnalisarFichaTecnicaPage";
import AtualizarFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/AtualizarFichaTecnicaPage";
import CadastroFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/CadastroFichaTecnicaPage";
import DetalharFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/DetalharFichaTecnicaPage";
import FichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/FichaTecnicaPage";
import LayoutEmbalagemPage from "../pages/PreRecebimento/LayoutEmbalagemPage";
import PainelDocumentosRecebimentoPage from "../pages/PreRecebimento/PainelDocumentosRecebimentoPage";
import PainelFichasTecnicasPage from "../pages/PreRecebimento/PainelFichasTecnicasPage";
import PainelLayoutEmbalagemPage from "../pages/PreRecebimento/PainelLayoutEmbalagemPage";
import RelatorioCronogramaPage from "../pages/PreRecebimento/Relatorios/RelatorioCronogramaPage";
import {
  AtivacaoDeProdutoPage,
  ConsultaAtivacaoDeProdutoPage,
  ConsultaResponderReclamacaoPage,
  ReclamacaoDeProdutoPage,
  RelatorioQuantitativoPorTerceirizadaPage,
  ResponderQuestionamentoNutrisupervisorPage,
  ResponderQuestionamentoUEPage,
  ResponderReclamacaoPage,
} from "../pages/Produto";
import AtualizacaoProdutoFormPage from "../pages/Produto/AtualizacaoProdutoFormPage";
import AvaliarReclamacaoProdutoPage from "../pages/Produto/AvaliarReclamacaoProdutoPage";
import BuscaAvancadaProdutoAnaliseSensorial from "../pages/Produto/BuscaAvancadaProdutoAnaliseSensorial";
import BuscaAvancadaProdutoPage from "../pages/Produto/BuscaAvancadaProdutoPage";
import BuscaProdutoAnaliseSensorial from "../pages/Produto/BuscaProdutoAnaliseSensorial";
import BuscaProdutosSuspensos from "../pages/Produto/BuscaProdutosSuspensos";
import CadastroProdutoPage from "../pages/Produto/CadastroProdutoPage";
import HomologacaoProdutoPage from "../pages/Produto/HomologacaoProdutoPage";
import RelatorioAnaliseSensorial from "../pages/Produto/RelatorioAnaliseSensorial";
import RelatorioProduto from "../pages/Produto/RelatorioProduto";
import * as StatusSolicitacoesGestaoProduto from "../pages/Produto/StatusSolicitacoesGestaoProduto";
import CadastroFichaRecebimentoPage from "../pages/Recebimento/FichaRecebimento/CadastroFichaRecebimentoPage";
import FichaRecebimentoPage from "../pages/Recebimento/FichaRecebimento/FichaRecebimentoPage";
import AtribuirQuestoesPage from "../pages/Recebimento/QuestoesPorProduto/AtribuirQuestoesPage";
import CopiarAtribuicaoQuestoesPage from "../pages/Recebimento/QuestoesPorProduto/CopiarAtribuicaoQuestoesPage";
import EditarAtribuicaoQuestoesPage from "../pages/Recebimento/QuestoesPorProduto/EditarAtribuicaoQuestoesPage";
import QuestoesPorProdutoPage from "../pages/Recebimento/QuestoesPorProduto/QuestoesPorProdutoPage";
import * as constants from "./constants";
import {
  StatusSolicitacoesDietaEspecial,
  dashBoardDietaEspecial,
  painelInicial,
  relatoriosAlteracaoDeCardapio,
  relatoriosAlteracaoDeCardapioCEMEI,
  relatoriosDietaEspecial,
  relatoriosInclusaoDeAlimentacao,
  relatoriosInclusaoDeAlimentacaoCEMEI,
  relatoriosInversaoDiaCardapio,
  relatoriosSolicitacaoKitLanche,
  relatoriosSolicitacaoKitLancheCEMEI,
  relatoriosSolicitacaoUnificada,
} from "./helper";
import { rotasCadastros } from "./rotas/cadastros";
import { rotasDietaEspecial } from "./rotas/dietaEspecial";
import { rotasGestaoDeAlimentacao } from "./rotas/gestaoDeAlimentacao";
import { rotasMedicaoInicial } from "./rotas/medicaoInicial";
import { rotasRelatorios } from "./rotas/relatorios";
import { rotasSupervisao } from "./rotas/supervisao";

let routesConfig = [
  {
    path: "/",
    component: painelInicial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },

  {
    path: "/login",
    component: Login,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },

  {
    path: "/perfil",
    component: PerfilPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/configuracoes/cadastros`,
    component: CadastrosPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/configuracoes/gerenciamento-emails`,
    component: GerenciamentoEmailsPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/mensagem`,
    component: MensagemPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_CODAE_DILOG}`,
    component: GestaoAcessoCodaeDilogPage,
    tipoUsuario: usuarioEhAdministradorRepresentanteCodae(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_MASTER}`,
    component: GestaoAcessoMasterPage,
    tipoUsuario:
      usuarioEhCoordenadorCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_DIRETOR_ESCOLA}`,
    component: GestaoAcessoDiretorEscolaPage,
    tipoUsuario: usuarioEhDiretorUE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_EMPRESA}`,
    component: GestaoAcessoEmpresaPage,
    tipoUsuario: usuarioEhAdmQualquerEmpresa(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_COGESTOR}`,
    component: GestaoAcessoCogestorPage,
    tipoUsuario: usuarioEhCogestorDRE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_GERAL}`,
    component: GestaoAcessoGeralPage,
    tipoUsuario:
      usuarioEhCoordenadorNutriSupervisao() ||
      usuarioEhCoordenadorNutriCODAE() ||
      usuarioEhCoordenadorGpCODAE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CARGAS_USUARIOS}`,
    component: CargasUsuariosPage,
    tipoUsuario:
      usuarioEhCoordenadorCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CARGAS_USUARIOS_SERVIDORES}`,
    component: CargasUsuariosServidoresPage,
    tipoUsuario: usuarioEhAdministradorRepresentanteCodae(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.ATUALIZACAO_EMAIL_EOL}`,
    component: AtualizacaoEmailEOLPage,
    tipoUsuario:
      usuarioEhCoordenadorCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/configuracoes`,
    component: ConfigEmailPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/${constants.ALTERACAO_TIPO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: relatoriosAlteracaoDeCardapio(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.ALTERACAO_TIPO_ALIMENTACAO_CEMEI}/${constants.RELATORIO}`,
    component: relatoriosAlteracaoDeCardapioCEMEI(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.INCLUSAO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: relatoriosInclusaoDeAlimentacao(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.INCLUSAO_ALIMENTACAO_CEMEI}/${constants.RELATORIO}`,
    component: relatoriosInclusaoDeAlimentacaoCEMEI(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO}`,
    component: relatoriosDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/ativas-inativas`,
    component: RelatorioAlunosDietasAtivasInativasPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.INVERSAO_CARDAPIO}/${constants.RELATORIO}`,
    component: relatoriosInversaoDiaCardapio(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE}/${constants.RELATORIO}`,
    component: relatoriosSolicitacaoKitLanche(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}/${constants.RELATORIO}`,
    component: relatoriosSolicitacaoUnificada(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE_CEMEI}/${constants.RELATORIO}`,
    component: relatoriosSolicitacaoKitLancheCEMEI(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosCODAE,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/painel-dieta-especial`,
    component: dashBoardDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhMedicao() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AUTORIZADAS_TEMPORARIAMENTE}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AGUARDANDO_INICIO_VIGENCIA}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_INATIVAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_INATIVAS_TEMPORARIAMENTE}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/ajuda`,
    component: FaqPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.PRODUTO}`,
    component: CadastroProdutoPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.EDITAR}`,
    component: AtualizacaoProdutoFormPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.BUSCA_PRODUTO}`,
    component: BuscaAvancadaProdutoPage,
    tipoUsuario:
      validaPerfilEscolaMistaParceira() && !usuarioEscolaEhGestaoDireta(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.AVALIAR_RECLAMACAO_PRODUTO}`,
    component: AvaliarReclamacaoProdutoPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.BUSCA_PRODUTO_ANALISE_SENSORIAL}`,
    component: BuscaProdutoAnaliseSensorial,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RELATORIO_ANALISE_SENSORIAL}`,
    component: BuscaAvancadaProdutoAnaliseSensorial,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.RELATORIO_ANALISE_SENSORIAL}`,
    component: RelatorioAnaliseSensorial,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.RELATORIO_PRODUTO}`,
    component: RelatorioProduto,
    tipoUsuario: validaPerfilEscolaMistaParceira(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RELATORIO_RECLAMACAO_PRODUTO}`,
    component: RelatorioReclamacaoProduto,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhDRE() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-questionamento-ue`,
    component: ResponderQuestionamentoUEPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-questionamento-nutrisupervisor`,
    component: ResponderQuestionamentoNutrisupervisorPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.HOMOLOGACAO_PRODUTO}`,
    component: HomologacaoProdutoPage,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RELATORIO}`,
    component: HomologacaoProdutoPage,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.RECLAMACAO_DE_PRODUTO}`,
    component: StatusSolicitacoesGestaoProduto.ReclamacaoDeProduto,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.PRODUTOS_SUSPENSOS}`,
    component: StatusSolicitacoesGestaoProduto.ProdutosSuspensos,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.CORRECAO_DE_PRODUTO}`,
    component: StatusSolicitacoesGestaoProduto.CorrecaoDeProduto,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.AGUARDANDO_ANALISE_RECLAMACAO}`,
    component: StatusSolicitacoesGestaoProduto.AguardandoAnaliseReclamacao,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhCogestorDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.RESPONDER_QUESTIONAMENTOS_DA_CODAE}`,
    component: StatusSolicitacoesGestaoProduto.ResponderQuestionamentoDaCodae,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhCogestorDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.AGUARDANDO_ANALISE_SENSORIAL}`,
    component: StatusSolicitacoesGestaoProduto.AguardandoAnaliseSensorial,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_PENDENTE_HOMOLOGACAO}`,
    component: StatusSolicitacoesGestaoProduto.PendenteHomologacao,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_HOMOLOGADAS}`,
    component: StatusSolicitacoesGestaoProduto.Homologados,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhDRE() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_NAO_HOMOLOGADAS}`,
    component: StatusSolicitacoesGestaoProduto.NaoHomologados,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhDRE() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: "/painel-gestao-produto",
    component: DashboardGestaoProdutoPage,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RECLAMACAO_DE_PRODUTO}`,
    component: ReclamacaoDeProdutoPage,
    tipoUsuario:
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.SUSPENSAO_DE_PRODUTO}`,
    component: BuscaProdutosSuspensos,
    tipoUsuario:
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhDRE() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ATIVACAO_DE_PRODUTO}/consulta`,
    component: ConsultaAtivacaoDeProdutoPage,
    tipoUsuario: usuarioEhCODAEGestaoProduto,
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ATIVACAO_DE_PRODUTO}/detalhe`,
    component: AtivacaoDeProdutoPage,
    tipoUsuario: usuarioEhCODAEGestaoProduto,
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/relatorios/produtos-homologados`,
    component: RelatorioProdutosHomologadosPage,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhDRE() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-reclamacao/consulta`,
    component: ConsultaResponderReclamacaoPage,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCogestorDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhOrgaoFiscalizador() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-reclamacao/detalhe`,
    component: ResponderReclamacaoPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/cadastro-geral`,
    component: CadastroGeralPage,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/vincular-produto-edital`,
    component: VincularProdutosEditaisPage,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/cadastro-produtos-provinientes-edital`,
    component: CadastroProdutosEdital,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/relatorios/quantitativo-por-terceirizada`,
    component: RelatorioQuantitativoPorTerceirizadaPage,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.AVALIAR_SOLICITACAO_CADASTRO_PRODUTO}`,
    component: AvaliarSolicitacaoCadastroProdutoPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ACOMPANHAR_SOLICITACAO_CADASTRO_PRODUTO}`,
    component: AcompanharSolicitacaoCadastroProdutoPage,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP}`,
    component: RelatorioQuantitativoSolicDietaEspPage,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP}`,
    component: RelatorioQuantitativoClassificacaoDietaEspPage,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_DIAG_DIETA_ESP}`,
    component: RelatorioQuantitativoDiagDietaEspPage,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_DIETAS_AUTORIZADAS}`,
    component: RelatorioDietasAutorizadas,
    tipoUsuario:
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhAdministradorNutriCODAE() ||
      usuarioEhCoordenadorNutriSupervisao() ||
      usuarioEhAdministradorNutriCODAE() ||
      usuarioEhCoordenadorNutriCODAE() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete() ||
      usuarioEhEmpresaTerceirizada() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_DIETAS_CANCELADAS}`,
    component: RelatorioDietasCanceladas,
    tipoUsuario:
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhAdministradorNutriCODAE() ||
      usuarioEhCoordenadorNutriSupervisao() ||
      usuarioEhAdministradorNutriCODAE() ||
      usuarioEhCoordenadorNutriCODAE() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete() ||
      usuarioEhEmpresaTerceirizada() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_GERENCIAL_DIETAS}`,
    component: RelatorioGerencialDietas,
    tipoUsuario:
      usuarioEhAdministradorNutriCODAE() ||
      usuarioEhCoordenadorNutriCODAE() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_GESTAO_DIETA_ESPECIAL}`,
    component: RelatorioGestaoDietaEspecial,
    tipoUsuario:
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhDRE() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.PROTOCOLO_PADRAO_DIETA}`,
    component: ProtocoloPadraoDietaEspecialPage,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.CONSULTA_PROTOCOLO_PADRAO_DIETA}`,
    component: ConsultaProtocoloPadraoDietaEspecial,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/protocolo-padrao/:uuid/editar`,
    component: EditaProtocoloPadraoDieta,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/protocolo-padrao/:uuid/criar-copia`,
    component: CriarCopiaProtocoloPadraoDieta,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.RELATORIO_SOLICITACOES_ALIMENTACAO}`,
    component: RelatorioSolicitacoesAlimentacaoPage,
    tipoUsuario:
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhMedicao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhCODAEGabinete() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
  {
    path: `/${constants.RELATORIO_ALUNOS_MATRICULADOS}`,
    component: RelatorioAlunosMatriculadosPage,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhDRE() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete() ||
      ehUsuarioRelatorios() ||
      usuarioEhGticCODAE(),
  },
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
  {
    path: `/${constants.NOTIFICACOES}`,
    component: NotificacoesPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.CENTRAL_DOWNLOADS}`,
    component: CentralDownloadsPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CRONOGRAMA_ENTREGA}`,
    component: CronogramaEntregaPage,
    tipoUsuario:
      usuarioEhPreRecebimento() ||
      usuarioEhEmpresaFornecedor() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.SOLICITACAO_ALTERACAO_CRONOGRAMA}`,
    component: SolicitacaoAlteracaoCronogramaPage,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhDinutreDiretoria() ||
      usuarioEhCodaeDilog() ||
      usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR}`,
    component: SolicitacaoAlteracaoCronogramaFornecedorPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHE_CRONOGRAMA}`,
    component: DetalharCronogramaPage,
    tipoUsuario:
      usuarioEhPreRecebimento() ||
      usuarioEhEmpresaFornecedor() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ALTERACAO_CRONOGRAMA}`,
    component: AlterarCronogramaPage,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhPreRecebimento() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_ALTERACAO_CRONOGRAMA}`,
    component: AnaliseDilogCronogramaPage,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhDinutreDiretoria() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhEmpresaFornecedor() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_CRONOGRAMA}`,
    component: CadastroCronogramaPage,
    tipoUsuario: usuarioEhCronograma() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_CRONOGRAMA}/${constants.EDITAR}`,
    component: EditarCronogramaPage,
    tipoUsuario: usuarioEhCronograma() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_APROVACOES}`,
    component: PainelAprovacoesPage,
    tipoUsuario: usuarioComAcessoAoPainelAprovacoes(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusCronogramasPendentesDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.AGUARDANDO_DILOG}`,
    component: StatusCronogramasAguardandoDilog,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.ALTERACOES_APROVADAS}`,
    component: StatusSolicitacoesAlteracoesAprovadasDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.ALTERACOES_REPROVADAS}`,
    component: StatusSolicitacoesAlteracoesReprovadasDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusCronogramasPendentesDilog,
    tipoUsuario: usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesDilog,
    tipoUsuario: usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.ALTERACOES_APROVADAS}`,
    component: StatusSolicitacoesAlteracoesAprovadasDilog,
    tipoUsuario:
      usuarioEhDilogDiretoria() ||
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.DILOG}/${constants.ALTERACOES_REPROVADAS}`,
    component: StatusSolicitacoesAlteracoesReprovadasDilog,
    tipoUsuario:
      usuarioEhDilogDiretoria() ||
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.AGUARDANDO_ASSINATURAS}`,
    component: StatusAguardandoAssinaturasCronograma,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.ASSINADO_CODAE}`,
    component: StatusCronogramasAssinadoCODAE,
    tipoUsuario:
      usuarioEhDinutreDiretoria() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesCronograma,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.ALTERACOES_CODAE}`,
    component: StatusSolicitacoesAlteracoesCodae,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhCodaeDilog() ||
      usuarioEhDinutreDiretoria() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.LAYOUT_EMBALAGEM}`,
    component: LayoutEmbalagemPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_LAYOUT_EMBALAGEM}`,
    component: CadastroLayoutEmbalagemPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_LAYOUT_EMBALAGEM}`,
    component: DetalharLayoutEmbalagemPage,
    tipoUsuario:
      usuarioEhEmpresaFornecedor() || usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_LAYOUT_EMBALAGEM_SOLICITACAO_ALTERACAO}`,
    component: DetalharSolicitacaoAlteracaoLayoutEmbalagemPage,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}`,
    component: PainelLayoutEmbalagemPage,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}/${constants.PENDENTES_APROVACAO}/`,
    component: StatusLayoutPendenteAprovacao,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}/${constants.APROVADOS}/`,
    component: StatusLayoutAprovados,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}/${constants.ENVIADOS_PARA_CORRECAO}/`,
    component: StatusLayoutEnviadosParaCorrecao,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ANALISAR_LAYOUT_EMBALAGEM}`,
    component: AnalisarLayoutEmbalagemPage,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CORRIGR_LAYOUT_EMBALAGEM}`,
    component: CorrigirLayoutEmbalagemPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ATUALIZAR_LAYOUT_EMBALAGEM}`,
    component: AtualizarLayoutEmbalagemPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DOCUMENTOS_RECEBIMENTO}`,
    component: DocumentosRecebimentoPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_DOCUMENTOS_RECEBIMENTO}`,
    component: CadastroDocumentosRecebimentoPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_FORNECEDOR_DOCUMENTO_RECEBIMENTO}`,
    component: DetalharFornecedorDocumentosRecebimentoPage,
    tipoUsuario:
      usuarioEhEmpresaFornecedor() || usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_CODAE_DOCUMENTO_RECEBIMENTO}`,
    component: DetalharCodaeDocumentosRecebimentoPage,
    tipoUsuario:
      usuarioEhEmpresaFornecedor() || usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_DOCUMENTOS_RECEBIMENTO}`,
    component: PainelDocumentosRecebimentoPage,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_DOCUMENTOS_RECEBIMENTO}/${constants.PENDENTES_APROVACAO}/`,
    component: StatusDocumentoPendenteAprovacao,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_DOCUMENTOS_RECEBIMENTO}/${constants.APROVADOS}/`,
    component: StatusDocumentoAprovados,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_DOCUMENTOS_RECEBIMENTO}/${constants.ENVIADOS_PARA_CORRECAO}/`,
    component: StatusDocumentoEnviadosParaCorrecao,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ANALISAR_DOCUMENTO_RECEBIMENTO}`,
    component: AnalisarDocumentosRecebimentoPage,
    tipoUsuario: usuarioEhDilogQualidade(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CORRIGIR_DOCUMENTOS_RECEBIMENTO}`,
    component: CorrigirDocumentosRecebimentoPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.FICHA_TECNICA}`,
    component: FichaTecnicaPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRAR_FICHA_TECNICA}`,
    component: CadastroFichaTecnicaPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_FICHAS_TECNICAS}`,
    component: PainelFichasTecnicasPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelFichasTecnicas(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_FICHAS_TECNICAS}/${constants.PENDENTES_APROVACAO}/`,
    component: StatusFichasTecnicasPendenteAprovacao,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelFichasTecnicas(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_FICHAS_TECNICAS}/${constants.APROVADOS}/`,
    component: StatusFichasTecnicasAprovadas,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelFichasTecnicas(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_FICHAS_TECNICAS}/${constants.ENVIADOS_PARA_CORRECAO}/`,
    component: StatusFichasTecnicasEnviadosParaCorrecao,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelFichasTecnicas(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ANALISAR_FICHA_TECNICA}`,
    component: AnalisarFichaTecnicaPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelFichasTecnicas(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_FICHA_TECNICA}/`,
    component: DetalharFichaTecnicaPage,
    tipoUsuario:
      usuarioEhEmpresaFornecedor() || usuarioComAcessoAoPainelFichasTecnicas(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ALTERAR_FICHA_TECNICA}/`,
    component: AlterarFichaTecnicaPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ATUALIZAR_FICHA_TECNICA}/`,
    component: AtualizarFichaTecnicaPage,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CALENDARIO_CRONOGRAMA}`,
    component: CalendarioCronogramaPage,
    tipoUsuario: usuarioComAcessoAoCalendarioCronograma(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.QUESTOES_POR_PRODUTO}`,
    component: QuestoesPorProdutoPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.ATRIBUIR_QUESTOES_CONFERENCIA}`,
    component: AtribuirQuestoesPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.EDITAR_ATRIBUICAO_QUESTOES_CONFERENCIA}`,
    component: EditarAtribuicaoQuestoesPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.COPIAR_ATRIBUICAO_QUESTOES_CONFERENCIA}`,
    component: CopiarAtribuicaoQuestoesPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.FICHA_RECEBIMENTO}`,
    component: FichaRecebimentoPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.CADASTRO_FICHA_RECEBIMENTO}`,
    component: CadastroFichaRecebimentoPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.RELATORIO_CRONOGRAMA}`,
    component: RelatorioCronogramaPage,
    tipoUsuario: usuarioComAcessoAoRelatorioCronogramas(),
  },
];

routesConfig = routesConfig.concat(rotasGestaoDeAlimentacao);
routesConfig = routesConfig.concat(rotasDietaEspecial);
routesConfig = routesConfig.concat(rotasMedicaoInicial);
routesConfig = routesConfig.concat(rotasSupervisao);
routesConfig = routesConfig.concat(rotasRelatorios);
routesConfig = routesConfig.concat(rotasCadastros);

export default routesConfig;
