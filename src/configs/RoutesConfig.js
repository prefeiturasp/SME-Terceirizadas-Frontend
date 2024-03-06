import { Login } from "../components/Login";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import CadastroHorarioComboAlimentacaoPage from "../pages/Cadastros/CadastroHorarioComboAlimentacaoPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import CadastroGeralPage from "../pages/Cadastros/CadastroGeralPage";
import VincularProdutosEditaisPage from "../pages/Cadastros/VincularProdutosEditaisPage";
import CadastroTipoAlimentacaoPage from "../pages/Cadastros/CadastroTipoAlimentacaoPage";
import PermissaoLancamentosEspeciaisPage from "../pages/Cadastros/PermissaoLancamentosEspeciaisPage";
import NovaPermissaoLancamentoEspecialPage from "../pages/Cadastros/NovaPermissaoLancamentoEspecialPage";
import FaixasEtariasPage from "../pages/Cadastros/FaixasEtariasPage";
import ConsultaKitLanchePage from "../pages/Cadastros/ConsultaKitLanchePage";
import CadastroKitLanchePage from "../pages/Cadastros/CadastroKitLanchePage";
import EditaisCadastradosPage from "../pages/Cadastros/EditaisCadastradosPage";
import EditaisContratosPage from "../pages/Cadastros/EditaisContratosPage";
import EmpresasCadastradas from "../pages/Cadastros/EmpresasCadastradasPage";
import LotesCadastradosPage from "../pages/Cadastros/LotesCadastradosPage";
import PainelPedidosAlteracaoDeCardapioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/PainelPedidosPage";
import PainelPedidosInclusaoDeAlimentacaoCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioCODAEPage from "../pages/CODAE/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosSolicitacaoUnificadaCODAEPage from "../pages/CODAE/SolicitacaoUnificada/PainelPedidosPage";
import StatusSolicitacoesAutorizadasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesAutorizadasCODAEPage";
import StatusSolicitacoesCanceladasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesCanceladasCODAEPage";
import StatusSolicitacoesPendentesCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesPendentesCODAEPage";
import StatusSolicitacoesRecusadasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesRecusadasCODAEPage";
import StatusSolicitacoesComQuestionamentosCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesComQuestionamentosCODAEPage";
import StatusSolicitacoesAutorizadasNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesAutorizadasNutrisupervisaoPage";
import StatusSolicitacoesAutorizadasNutriManifestacaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesAutorizadasNutriManifestacaoPage";
import StatusSolicitacoesCanceladasNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesCanceladasNutrisupervisaoPage";
import StatusSolicitacoesCanceladasNutriManifestacaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesCanceladasNutriManifestacaoPage";
import StatusSolicitacoesPendentesNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesPendentesNutrisupervisaoPage";
import StatusSolicitacoesRecusadasNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesRecusadasNutrisupervisaoPage";
import StatusSolicitacoesRecusadasNutriManifestacaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesRecusadasNutriManifestacaoPage";
import StatusSolicitacoesComQuestionamentosNutrisupervisaoPage from "../pages/Nutricionista/Solicitacoes/StatusSolicitacoesComQuestionamentosNutrisupervisaoPage";
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import GerenciamentoEmailsPage from "../pages/Configuracoes/GerenciamentoEmailsPage";
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

import * as RelatorioPageInversaoDiaCardapio from "../pages/InversaoDeDiaDeCardapio/RelatorioPage";
import PerfilPage from "../pages/Perfil/PerfilPage";
import * as PainelPageKitLanche from "../pages/SolicitacaoDeKitLanche/ContainerPage";
import PainelPedidosAlteracaoDeCardapioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/PainelPedidosPage";
import PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioTerceirizadaPage from "../pages/Terceirizada/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosSolicitacaoUnificadaTerceirizadaPage from "../pages/Terceirizada/SolicitacaoUnificada/PainelPedidosPage";
import { StatusSolicitacoesAutorizadasTerceirizadaPage } from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesAutorizadas";
import { StatusQuestionamentosCodae } from "../pages/Terceirizada/StatusSolicitacoes/StatusQuestionamentosCodae";
import { StatusSolicitacoesCanceladasTerceirizadaPage } from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesCanceladasTerceirizada";
import { StatusSolicitacoesNegadasTerceirizadaPage } from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesNegadasTerceirizada";
import StatusSolicitacoesPendentesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesPendentes";
import PainelPedidosSuspensaoAlimentacao from "../pages/Terceirizada/SuspensaoAlimentacao/PainelPedidosPage";
import PainelPedidosSuspensaoAlimentacaoRelatorio from "../pages/Terceirizada/SuspensaoAlimentacao/RelatorioPage";
import PainelPedidosSuspensaoAlimentacaoCEIRelatorio from "../pages/SuspensaoAlimentacaoCEI/RelatorioPage";
import FaqPage from "../pages/Faq/FaqPage";
import RelatorioProdutosHomologadosPage from "pages/RelatorioProdutosHomologados/RelatorioProdutosHomologadosPage";
import RelatorioReclamacaoProduto from "pages/Produto/RelatorioReclamacaoProduto";

import * as constants from "./constants";
import {
  alteracaoCardapio,
  suspensaoAlimentacao,
  dashBoardDietaEspecial,
  painelGestaoAlimentacao,
  painelInicial,
  relatorios,
  relatoriosAlteracaoDeCardapio,
  relatoriosAlteracaoDeCardapioCEMEI,
  relatoriosDietaEspecial,
  relatoriosInclusaoDeAlimentacao,
  relatoriosInversaoDiaCardapio,
  relatoriosSolicitacaoKitLanche,
  relatoriosSolicitacaoKitLancheCEMEI,
  relatoriosSolicitacaoUnificada,
  StatusSolicitacoesDietaEspecial,
  inclusaoAlimentacao,
  relatoriosInclusaoDeAlimentacaoCEMEI,
} from "./helper";
import {
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaAbastecimento,
  usuarioEhDRE,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhEmpresaTerceirizada,
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGestaoProduto,
  usuarioEhQualquerCODAE,
  usuarioEhMedicao,
  usuarioEhNutricionistaSupervisao,
  usuarioEhLogistica,
  usuarioEhEmpresaDistribuidora,
  usuarioEhPreRecebimento,
  usuarioEhCronograma,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoParceira,
  validaPerfilEscolaMistaParceira,
  usuarioEhCoordenadorCODAE,
  usuarioEhDilogQualidade,
  usuarioEhDilogQualidadeOuCronograma,
  usuarioEhCodaeDilog,
  usuarioEhEmpresaFornecedor,
  usuarioEhAdministradorRepresentanteCodae,
  usuarioEhEscolaAbastecimentoDiretor,
  usuarioEhAdmQualquerEmpresa,
  usuarioEhCoordenadorNutriCODAE,
  usuarioEhCoordenadorGpCODAE,
  usuarioEhDinutreDiretoria,
  usuarioEhDilogDiretoria,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEhCogestorDRE,
  usuarioEhDiretorUE,
  usuarioEhAdministradorNutriCODAE,
  usuarioEhDilogJuridico,
  usuarioEhDilog,
  usuarioComAcessoTelaDetalharNotificacaoOcorrencia,
  usuarioComAcessoAoPainelAprovacoes,
  usuarioEhEscolaTerceirizadaQualquerPerfil,
  usuarioComAcessoAoPainelEmbalagens,
  usuarioEhOrgaoFiscalizador,
  usuarioComAcessoAoPainelDocumentos,
  usuarioComAcessoAoPainelFichasTecnicas,
  usuarioEhCODAEGabinete,
  usuarioComAcessoAoCalendarioCronograma,
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
  ResponderQuestionamentoNutrisupervisorPage,
} from "../pages/Produto";
import AvaliarSolicitacaoCadastroProdutoPage from "pages/Produto/AvaliarSolicitacaoCadastroProdutoPage";
import AcompanharSolicitacaoCadastroProdutoPage from "pages/Produto/AcompanharSolicitacaoCadastroProdutoPage";
import { podeAcessarRelatorioQuantSolicDietaEsp } from "helpers/permissions";
import RelatorioQuantitativoSolicDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoSolicDietaEspPage";
import RelatorioQuantitativoClassificacaoDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoClassificacaoDietaEspPage";
import RelatorioQuantitativoDiagDietaEspPage from "pages/DietaEspecial/RelatorioQuantitativoDiagDietaEspPage";
import RelatorioDietaEspecial from "pages/DietaEspecial/RelatorioDietaEspecial";
import RelatorioGestaoDietaEspecial from "pages/DietaEspecial/RelatorioGestaoDietaEspecial";
import CancelamentoDietaPage from "pages/DietaEspecial/CancelamentoDietaPage";
import LancamentoMedicaoInicialPage from "pages/LancamentoMedicaoInicial/LancamentoMedicaoInicialPage";
import PeriodoLancamentoMedicaoInicialPage from "pages/LancamentoMedicaoInicial/PeriodoLancamentoMedicaoInicialPage";
import PeriodoLancamentoMedicaoInicialCEIPage from "pages/LancamentoMedicaoInicial/PeriodoLancamentoMedicaoInicialCEIPage";
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
import DetalhamentoGuiaPage from "pages/Logistica/DetalhamentoGuiaPage";
import ReposicaoDeGuiaPage from "pages/Logistica/ReposicaoDeGuiaPage";
import RegistrarInsucessoEntregaPage from "pages/Logistica/RegistrarInsucessoEntregaPage";
import ConferenciaDeGuiaComOcorrenciaPage from "pages/Logistica/ConferenciaDeGuiaComOcorrenciaPage";
import ConferenciaDeGuiaResumoFinalPage from "pages/Logistica/ConferenciaDeGuiaResumoFinalPage";
import EntregasDilogPage from "pages/Logistica/EntregasDilogPage";
import EntregasDistribuidorPage from "pages/Logistica/EntregasDistribuidorPage";
import EntregasDrePage from "pages/Logistica/EntregasDrePage";
import ReposicaoResumoFinalPage from "pages/Logistica/ReposicaoResumoFinalPage";
import NotificacoesPage from "pages/Notificacoes/NotificacoesPage";
import CentralDownloadsPage from "pages/CentralDownloads/CentralDownloadsPage";
import CadastroProdutosEdital from "pages/Cadastros/CadastroProdutosEdital";
import CadastroSobremesaDocePage from "pages/Cadastros/CadastroSobremesaDocePage";
import GestaoAcessoCodaeDilogPage from "pages/Configuracoes/GestaoAcessoCodaeDilogPage";
import GestaoAcessoDiretorEscolaPage from "pages/Configuracoes/GestaoAcessoDiretorEscolaPage";
import CargasUsuariosPage from "pages/Configuracoes/CargasUsuariosPage";
import CargasUsuariosServidoresPage from "pages/Configuracoes/CargasUsuariosServidoresPage";
import CadastroCronogramaPage from "pages/PreRecebimento/CadastroCronogramaPage";
import StatusCronogramasPendentesDinutre from "pages/Dinutre/Cronogramas/StatusCronogramasPendentesDinutre";
import StatusCronogramasAguardandoDilog from "pages/Dinutre/Cronogramas/StatusCronogramasAguardandoDilog";
import CronogramaEntregaPage from "pages/PreRecebimento/CronogramaEntregaPage";
import DetalharCronogramaPage from "pages/PreRecebimento/DetalharCronogramaPage";
import StatusSolicitacoesAguardandoDREPage from "pages/DRE/Solicitacoes/StatusSolicitacoesAguardandoDREPage";
import RelatorioSolicitacoesAlimentacaoPage from "pages/Relatorios/RelatorioSolicitacoesAlimentacaoPage";
import RelatorioAlunosMatriculadosPage from "pages/Relatorios/RelatorioAlunosMatriculadosPage";
import EditarCronogramaPage from "pages/PreRecebimento/EditarCronogramaPage";
import CadastroLaboratorioPage from "pages/Cadastros/CadastroLaboratorioPage";
import DetalharCadastroLaboratorioPage from "pages/Cadastros/DetalharCadastroLaboratorioPage";
import EditarCadastroLaboratorioPage from "pages/Cadastros/EditarCadastroLaboratorioPage ";
import LaboratoriosCadastradosPage from "pages/Cadastros/LaboratoriosCadastradosPage";
import CadastroTipoEmbalagemPage from "pages/Cadastros/CadastroTipoEmbalagemPage";
import TiposEmbalagensCadastradosPage from "pages/Cadastros/TiposEmbalagensCadastradosPage";
import GestaoAcessoEmpresaPage from "pages/Configuracoes/GestaoAcessoEmpresaPage";
import EditarCadastroTipoEmbalagemPage from "../pages/Cadastros/EditarCadastroTipoEmbalagemPage";
import ProdutosLogisticaPage from "pages/Cadastros/ProdutosLogisticaPage";
import EditarEmpresaPage from "pages/Cadastros/EditarEmpresaPage";
import GestaoAcessoGeralPage from "pages/Configuracoes/GestaoAcessoGeralPage";
import AlterarCronogramaPage from "pages/PreRecebimento/AlterarCronogramaPage";
import PainelAprovacoesPage from "pages/PreRecebimento/PainelAprovacoesPage";
import AcompanhamentoDeLancamentosPage from "pages/LancamentoMedicaoInicial/AcompanhamentoDeLancamentosPage";
import SolicitacaoAlteracaoCronogramaPage from "pages/PreRecebimento/SolicitacaoAlteracaoCronogramaPage";
import StatusCronogramasAssinadoCODAE from "pages/Dinutre/Cronogramas/StatusCronogramasAssinadoCODAE";
import StatusSolicitacoesAlteracoesDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDinutre";
import ConferenciaDosLancamentosPage from "pages/LancamentoMedicaoInicial/ConferenciaDosLancamentosPage";
import GestaoAcessoMasterPage from "pages/Configuracoes/GestaoAcessoMasterPage";
import GestaoAcessoCogestorPage from "pages/Configuracoes/GestaoAcessoCogestorPage";
import AnaliseDilogCronogramaPage from "pages/PreRecebimento/DetalharSolicitacaoCronograma";
import SolicitacaoAlteracaoCronogramaFornecedorPage from "pages/PreRecebimento/SolicitacaoAlteracaoCronogramaFornecedorPage";
import StatusSolicitacoesAlteracoesAprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDinutre";
import StatusSolicitacoesAlteracoesReprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDinutre";
import StatusSolicitacoesAlteracoesDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDilog";
import StatusSolicitacoesAlteracoesAprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDilog";
import StatusSolicitacoesAlteracoesReprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDilog";
import AtualizacaoEmailEOLPage from "pages/Configuracoes/AtualizacaoEmailEOLPage";
import GuiasNotificacoesPage from "pages/Logistica/GuiasNotificacoesPage";
import GuiasNotificacoesFiscalPage from "pages/Logistica/GuiasNotificacoesFiscalPage";
import CadastroNotificacaoPage from "pages/Logistica/CadastroNotificacao.page";
import NotificarEmpresaPage from "pages/Logistica/NotificarEmpresaPage";
import EditarNotificacaoPage from "pages/Logistica/EditarNotificacaoPage";
import CadastroProdutosLogisticaPage from "pages/Cadastros/CadastroProdutosLogisticaPage";
import EditarProdutosLogisticaPage from "pages/Cadastros/EditarProdutosLogisticaPage";
import UnidadesMedidaPage from "pages/Cadastros/UnidadesMedidaPage";
import CadastroUnidadeMedidaPage from "pages/Cadastros/CadastroUnidadeMedidaPage";
import EditarUnidadesMedidaPage from "pages/Cadastros/EditarUnidadesMedidaPage";
import DetalhamentoDoLancamentoPage from "pages/LancamentoMedicaoInicial/DetalhamentoDoLancamentoPage";
import EmpenhosPage from "pages/LancamentoMedicaoInicial/EmpenhosPage";
import ClausulasParaDescontosPage from "pages/LancamentoMedicaoInicial/ClausulasParaDescontosPage";
import CadastroDeClausulasPage from "pages/LancamentoMedicaoInicial/CadastroDeClausulasPage";
import CadastroDeEmpenhoPage from "pages/LancamentoMedicaoInicial/CadastroDeEmpenhoPage";
import EditarEmpenhoPage from "pages/LancamentoMedicaoInicial/EditarEmpenhoPage";
import RelatorioAdesao from "pages/LancamentoMedicaoInicial/Relatorios/RelatorioAdesao";
import DetalharNotificacaoPage from "pages/Logistica/DetalharNotificacaoPage";
import AnalisarAssinarPage from "pages/Logistica/AnalisarAssinarPage";
import CadastroMarcaPage from "pages/Cadastros/CadastroMarcaPage";
import CadastroFabricantePage from "pages/Cadastros/CadastroFabricantePage";
import StatusCronogramasPendentesDilog from "../pages/Dinutre/Cronogramas/StatusCronogramasPendentesDilog";
import StatusAguardandoAssinaturasCronograma from "../pages/Dinutre/Cronogramas/StatusAguardandoAssinaturasCronograma";
import StatusSolicitacoesAlteracoesCronograma from "../pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesCronograma";
import CadastroSuspensaoDeAtividadesPage from "../pages/Cadastros/CadastroSuspensaoAtividades";
import LayoutEmbalagemPage from "../pages/PreRecebimento/LayoutEmbalagemPage";
import CadastroLayoutEmbalagemPage from "../pages/PreRecebimento/CadastroLayoutEmbalagemPage";
import DetalharLayoutEmbalagemPage from "../pages/PreRecebimento/DetalharLayoutEmbalagemPage";
import DetalharSolicitacaoAlteracaoLayoutEmbalagemPage from "../pages/PreRecebimento/DetalharSolicitacaoAlteracaoLayoutEmbalagemPage";
import StatusSolicitacoesAlteracoesCodae from "../pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesCodae";
import PainelLayoutEmbalagemPage from "../pages/PreRecebimento/PainelLayoutEmbalagemPage";
import StatusLayoutPendenteAprovacao from "../pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutPendenteAprovacao";
import StatusLayoutAprovados from "../pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutAprovados";
import StatusLayoutEnviadosParaCorrecao from "../pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutEnviadosParaCorrecao";
import AnalisarLayoutEmbalagemPage from "../pages/PreRecebimento/AnalisarLayoutEmbalagemPage";
import CorrigirLayoutEmbalagemPage from "../pages/PreRecebimento/CorrigirLayoutEmbalagemPage";
import AtualizarLayoutEmbalagemPage from "../pages/PreRecebimento/AtualizarLayoutEmbalagemPage";
import DocumentosRecebimentoPage from "../pages/PreRecebimento/DocumentosRecebimentoPage";
import CadastroDocumentosRecebimentoPage from "../pages/PreRecebimento/CadastroDocumentosRecebimentoPage";
import DetalharFornecedorDocumentosRecebimentoPage from "../pages/PreRecebimento/DetalharFornecedorDocumentosRecebimentoPage";
import DetalharCodaeDocumentosRecebimentoPage from "../pages/PreRecebimento/DetalharCodaeDocumentosRecebimentoPage";
import PainelDocumentosRecebimentoPage from "../pages/PreRecebimento/PainelDocumentosRecebimentoPage";
import StatusDocumentoPendenteAprovacao from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoPendenteAprovacao";
import StatusDocumentoAprovados from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoAprovados";
import StatusDocumentoEnviadosParaCorrecao from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoEnviadosParaCorrecao";
import AnalisarDocumentosRecebimentoPage from "../pages/PreRecebimento/AnalisarDocumentosRecebimentoPage";
import CorrigirDocumentosRecebimentoPage from "../pages/PreRecebimento/CorrigirDocumentosRecebimentoPage";
import FichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/FichaTecnicaPage";
import CadastroFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/CadastroFichaTecnicaPage";
import PainelFichasTecnicasPage from "../pages/PreRecebimento/PainelFichasTecnicasPage";
import AnalisarFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/AnalisarFichaTecnicaPage";
import DetalharFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/DetalharFichaTecnicaPage";
import AlterarFichaTecnicaPage from "../pages/PreRecebimento/FichaTecnica/AlterarFichaTecnicaPage";
import CalendarioCronogramaPage from "../pages/PreRecebimento/CalendarioCronogramaPage";
import StatusFichasTecnicasPendenteAprovacao from "../pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasPendenteAprovacao";
import StatusFichasTecnicasEnviadosParaCorrecao from "../pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasEnviadosParaCorrecao";
import StatusFichasTecnicasAprovadas from "../pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasAprovadas";
import RelatorioGerencialDietas from "../pages/DietaEspecial/RelatorioGerencialDietas.jsx";
import EditaisContratosEditarPage from "../pages/Cadastros/EditaisContratosEditarPage.jsx";

const routesConfig = [
  {
    path: `/${constants.ALUNO}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialAluno,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: "/",
    component: painelInicial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: "/painel-gestao-alimentacao",
    component: painelGestaoAlimentacao(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete(),
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
    path: "/relatorios",
    component: relatorios(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.CANCELAMENTO}`,
    component: CancelamentoDietaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL_ALTERACAO_UE}`,
    component: DietaEspecialAlteracaoUEPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: inclusaoAlimentacao(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: alteracaoCardapio(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosEscola,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.INVERSAO_CARDAPIO}`,
    component: RelatorioPageInversaoDiaCardapio.InversaoDeDiaDeCardapioPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: suspensaoAlimentacao(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_AGUARDADAS}`,
    component: StatusSolicitacoesAguardandoDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosDRE,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: SolicitacaoUnificadaPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasCODAEPage,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() || usuarioEhCODAENutriManifestacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesCODAEPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_COM_QUESTIONAMENTO}`,
    component: StatusSolicitacoesComQuestionamentosCODAEPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao() || usuarioEhMedicao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasCODAEPage,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() || usuarioEhCODAENutriManifestacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasCODAEPage,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() || usuarioEhCODAENutriManifestacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoCODAEPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioCODAEPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioCODAEPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: PainelPedidosSolicitacaoUnificadaCODAEPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasNutrisupervisaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesNutrisupervisaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasNutrisupervisaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasNutrisupervisaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_COM_QUESTIONAMENTO}`,
    component: StatusSolicitacoesComQuestionamentosNutrisupervisaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRIMANIFESTACAO}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasNutriManifestacaoPage,
    tipoUsuario:
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.NUTRIMANIFESTACAO}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasNutriManifestacaoPage,
    tipoUsuario:
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.NUTRIMANIFESTACAO}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasNutriManifestacaoPage,
    tipoUsuario:
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_COM_QUESTIONAMENTO}`,
    component: StatusQuestionamentosCodae,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesNegadasTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.DRE}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioDREPage,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosTerceirizada,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: PainelPedidosSolicitacaoUnificadaTerceirizadaPage,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.SUSPENSAO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: PainelPedidosSuspensaoAlimentacaoRelatorio,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SUSPENSAO_ALIMENTACAO_CEI}/${constants.RELATORIO}`,
    component: PainelPedidosSuspensaoAlimentacaoCEIRelatorio,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: PainelPedidosSuspensaoAlimentacao,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/configuracoes/cadastros/${constants.SOBREMESA_DOCE}`,
    component: CadastroSobremesaDocePage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao() || usuarioEhMedicao(),
  },
  {
    path: `/configuracoes/cadastros/${constants.SUSPENSAO_ATIVIDADES}`,
    component: CadastroSuspensaoDeAtividadesPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao() || usuarioEhMedicao(),
  },
  {
    path: `/configuracoes/cadastros/lotes-cadastrados`,
    component: LotesCadastradosPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/configuracoes/cadastros/editais-cadastrados`,
    component: EditaisCadastradosPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/lote`,
    component: CadastroLotePage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao`,
    component: CadastroTipoAlimentacaoPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao/permissao-lancamentos-especiais`,
    component: PermissaoLancamentosEspeciaisPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao/permissao-lancamentos-especiais/nova-permissao-lancamento-especial`,
    component: NovaPermissaoLancamentoEspecialPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao/permissao-lancamentos-especiais/editar-permissao-lancamento-especial`,
    component: NovaPermissaoLancamentoEspecialPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/horario-combos-alimentacao`,
    component: CadastroHorarioComboAlimentacaoPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/configuracoes/cadastros/empresas-cadastradas`,
    component: EmpresasCadastradas,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma(),
  },
  {
    path: `/configuracoes/cadastros/empresa`,
    component: CadastroEmpresaPage,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.EDITAR_EMPRESA}`,
    component: EditarEmpresaPage,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma(),
  },
  {
    path: `/configuracoes/cadastros/editais-contratos`,
    component: EditaisContratosPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/editais-contratos/editar`,
    component: EditaisContratosEditarPage,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/faixas-etarias`,
    component: FaixasEtariasPage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.CONSULTA_KITS}`,
    component: ConsultaKitLanchePage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.KITS}`,
    component: CadastroKitLanchePage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.KITS}/:uuid/${constants.EDITAR}`,
    component: CadastroKitLanchePage,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.LABORATORIOS_CADASTRADOS}`,
    component: LaboratoriosCadastradosPage,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_LABORATORIO}`,
    component: CadastroLaboratorioPage,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_LABORATORIO}/${constants.DETALHAR}`,
    component: DetalharCadastroLaboratorioPage,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_LABORATORIO}/${constants.EDITAR}`,
    component: EditarCadastroLaboratorioPage,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.TIPOS_EMBALAGENS}`,
    component: TiposEmbalagensCadastradosPage,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_TIPO_EMBALAGEM}`,
    component: CadastroTipoEmbalagemPage,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_TIPO_EMBALAGEM}/${constants.EDITAR}`,
    component: EditarCadastroTipoEmbalagemPage,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.PRODUTOS}`,
    component: ProdutosLogisticaPage,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_PRODUTOS}`,
    component: CadastroProdutosLogisticaPage,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.EDICAO_PRODUTOS}`,
    component: EditarProdutosLogisticaPage,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.UNIDADES_MEDIDA}`,
    component: UnidadesMedidaPage,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_UNIDADE_MEDIDA}`,
    component: CadastroUnidadeMedidaPage,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.EDICAO_UNIDADE_MEDIDA}`,
    component: EditarUnidadesMedidaPage,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.MARCAS}`,
    component: CadastroMarcaPage,
    tipoUsuario: usuarioEhEmpresaFornecedor() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.FABRICANTES}`,
    component: CadastroFabricantePage,
    tipoUsuario: usuarioEhEmpresaFornecedor() || usuarioEhCodaeDilog(),
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
      usuarioEhCODAEGabinete(),
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
    tipoUsuario: usuarioEhCoordenadorCODAE() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CARGAS_USUARIOS_SERVIDORES}`,
    component: CargasUsuariosServidoresPage,
    tipoUsuario: usuarioEhAdministradorRepresentanteCodae(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.ATUALIZACAO_EMAIL_EOL}`,
    component: AtualizacaoEmailEOLPage,
    tipoUsuario: usuarioEhCoordenadorCODAE() || usuarioEhCodaeDilog(),
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
      usuarioEhCODAEGabinete(),
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
      usuarioEhCODAEGabinete(),
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
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_DIETA_ESPECIAL}`,
    component: RelatorioDietaEspecial,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhAdministradorNutriCODAE() ||
      usuarioEhCoordenadorNutriSupervisao() ||
      usuarioEhAdministradorNutriCODAE() ||
      usuarioEhCoordenadorNutriCODAE() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_GERENCIAL_DIETAS}`,
    component: RelatorioGerencialDietas,
    tipoUsuario:
      usuarioEhAdministradorNutriCODAE() || usuarioEhCoordenadorNutriCODAE(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_GESTAO_DIETA_ESPECIAL}`,
    component: RelatorioGestaoDietaEspecial,
    tipoUsuario:
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhDRE() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor(),
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
      usuarioEhCODAEGabinete(),
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
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.LANCAMENTO_INICIAL}/${constants.LANCAMENTO_MEDICAO_INICIAL}`,
    component: LancamentoMedicaoInicialPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.LANCAMENTO_INICIAL}/${constants.LANCAMENTO_MEDICAO_INICIAL}/${constants.PERIODO_LANCAMENTO}`,
    component: PeriodoLancamentoMedicaoInicialPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.LANCAMENTO_INICIAL}/${constants.LANCAMENTO_MEDICAO_INICIAL}/${constants.PERIODO_LANCAMENTO_CEI}`,
    component: PeriodoLancamentoMedicaoInicialCEIPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    component: AcompanhamentoDeLancamentosPage,
    tipoUsuario:
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      usuarioEhEscolaTerceirizadaQualquerPerfil() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.CONFERENCIA_DOS_LANCAMENTOS}`,
    component: ConferenciaDosLancamentosPage,
    tipoUsuario:
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.DETALHAMENTO_DO_LANCAMENTO}`,
    component: DetalhamentoDoLancamentoPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.EMPENHOS}`,
    component: EmpenhosPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.EMPENHOS}/${constants.CADASTRO_DE_EMPENHO}`,
    component: CadastroDeEmpenhoPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.EMPENHOS}/${constants.EDITAR_EMPENHO}`,
    component: EditarEmpenhoPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.CLAUSULAS_PARA_DESCONTOS}`,
    component: ClausulasParaDescontosPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.CLAUSULAS_PARA_DESCONTOS}/${constants.CADASTRO_DE_CLAUSULA}`,
    component: CadastroDeClausulasPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.RELATORIOS}/${constants.RELATORIO_ADESAO}`,
    component: RelatorioAdesao,
    tipoUsuario: usuarioEhMedicao() || usuarioEhCODAEGestaoAlimentacao(),
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
    tipoUsuario: usuarioEhLogistica() || usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_REQUISICAO_ENTREGA}`,
    component: GestaoRequisicaoEntregaPage,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_SOLICITACAO_ALTERACAO}`,
    component: GestaoSolicitacaoAlteracaoPage,
    tipoUsuario: usuarioEhLogistica() || usuarioEhCODAEGabinete(),
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
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GUIAS_NOTIFICACAO_FISCAL}`,
    component: GuiasNotificacoesFiscalPage,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhDilog(),
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
    tipoUsuario: usuarioEhCronograma(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_CRONOGRAMA}/${constants.EDITAR}`,
    component: EditarCronogramaPage,
    tipoUsuario: usuarioEhCronograma(),
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
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CALENDARIO_CRONOGRAMA}`,
    component: CalendarioCronogramaPage,
    tipoUsuario: usuarioComAcessoAoCalendarioCronograma(),
  },
];

export default routesConfig;
