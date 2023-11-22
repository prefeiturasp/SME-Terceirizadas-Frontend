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
import DetalharDocumentosRecebimentoPage from "../pages/PreRecebimento/DetalharDocumentosRecebimentoPage";
import PainelDocumentosRecebimentoPage from "../pages/PreRecebimento/PainelDocumentosRecebimentoPage";
import StatusDocumentoPendenteAprovacao from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoPendenteAprovacao";
import StatusDocumentoAprovados from "../pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoAprovados";
import AnalisarDocumentosRecebimentoPage from "../pages/PreRecebimento/AnalisarDocumentosRecebimentoPage";
import CorrigirDocumentosRecebimentoPage from "../pages/PreRecebimento/CorrigirDocumentosRecebimentoPage";

const routesConfig = [
  {
    path: `/${constants.ALUNO}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialAluno,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: "/",
    component: painelInicial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: "/painel-gestao-alimentacao",
    component: painelGestaoAlimentacao(),
    exact: true,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhMedicao(),
  },
  {
    path: "/login",
    component: Login,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },

  {
    path: "/perfil",
    component: PerfilPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: "/relatorios",
    component: relatorios(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialEscolaPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.CANCELAMENTO}`,
    component: CancelamentoDietaPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL_ALTERACAO_UE}`,
    component: DietaEspecialAlteracaoUEPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasEscolaPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesEscolaPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasEscolaPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasEscolaPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: inclusaoAlimentacao(),
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: alteracaoCardapio(),
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosEscola,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.INVERSAO_CARDAPIO}`,
    component: RelatorioPageInversaoDiaCardapio.InversaoDeDiaDeCardapioPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: suspensaoAlimentacao(),
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_AGUARDADAS}`,
    component: StatusSolicitacoesAguardandoDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosDRE,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: SolicitacaoUnificadaPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasCODAEPage,
    exact: false,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() || usuarioEhCODAENutriManifestacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_COM_QUESTIONAMENTO}`,
    component: StatusSolicitacoesComQuestionamentosCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao() || usuarioEhMedicao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasCODAEPage,
    exact: false,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() || usuarioEhCODAENutriManifestacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasCODAEPage,
    exact: false,
    tipoUsuario:
      usuarioEhCODAEGestaoAlimentacao() || usuarioEhCODAENutriManifestacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: PainelPedidosSolicitacaoUnificadaCODAEPage,
    exact: false,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRISUPERVISAO}/${constants.SOLICITACOES_COM_QUESTIONAMENTO}`,
    component: StatusSolicitacoesComQuestionamentosNutrisupervisaoPage,
    exact: false,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.NUTRIMANIFESTACAO}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasNutriManifestacaoPage,
    exact: false,
    tipoUsuario: usuarioEhCODAENutriManifestacao() || usuarioEhMedicao(),
  },
  {
    path: `/${constants.NUTRIMANIFESTACAO}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasNutriManifestacaoPage,
    exact: false,
    tipoUsuario: usuarioEhCODAENutriManifestacao() || usuarioEhMedicao(),
  },
  {
    path: `/${constants.NUTRIMANIFESTACAO}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasNutriManifestacaoPage,
    exact: false,
    tipoUsuario: usuarioEhCODAENutriManifestacao() || usuarioEhMedicao(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_COM_QUESTIONAMENTO}`,
    component: StatusQuestionamentosCodae,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesNegadasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.DRE}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioDREPage,
    exact: false,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosTerceirizada,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: PainelPedidosSolicitacaoUnificadaTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.SUSPENSAO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: PainelPedidosSuspensaoAlimentacaoRelatorio,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SUSPENSAO_ALIMENTACAO_CEI}/${constants.RELATORIO}`,
    component: PainelPedidosSuspensaoAlimentacaoCEIRelatorio,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: PainelPedidosSuspensaoAlimentacao,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/configuracoes/cadastros/${constants.SOBREMESA_DOCE}`,
    component: CadastroSobremesaDocePage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao() || usuarioEhMedicao(),
  },
  {
    path: `/configuracoes/cadastros/${constants.SUSPENSAO_ATIVIDADES}`,
    component: CadastroSuspensaoDeAtividadesPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao() || usuarioEhMedicao(),
  },
  {
    path: `/configuracoes/cadastros/lotes-cadastrados`,
    component: LotesCadastradosPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/configuracoes/cadastros/editais-cadastrados`,
    component: EditaisCadastradosPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/lote`,
    component: CadastroLotePage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao`,
    component: CadastroTipoAlimentacaoPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao/permissao-lancamentos-especiais`,
    component: PermissaoLancamentosEspeciaisPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao/permissao-lancamentos-especiais/nova-permissao-lancamento-especial`,
    component: NovaPermissaoLancamentoEspecialPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao/permissao-lancamentos-especiais/editar-permissao-lancamento-especial`,
    component: NovaPermissaoLancamentoEspecialPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/horario-combos-alimentacao`,
    component: CadastroHorarioComboAlimentacaoPage,
    exact: false,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/configuracoes/cadastros/empresas-cadastradas`,
    component: EmpresasCadastradas,
    exact: false,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma(),
  },
  {
    path: `/configuracoes/cadastros/empresa`,
    component: CadastroEmpresaPage,
    exact: false,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.EDITAR_EMPRESA}`,
    component: EditarEmpresaPage,
    exact: false,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma(),
  },
  {
    path: `/configuracoes/cadastros/editais-contratos`,
    component: EditaisContratosPage,
    exact: true,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/cadastros/faixas-etarias`,
    component: FaixasEtariasPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.CONSULTA_KITS}`,
    component: ConsultaKitLanchePage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.KITS}`,
    component: CadastroKitLanchePage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CODAE}/${constants.CADASTROS}/${constants.KITS}/:uuid/${constants.EDITAR}`,
    component: CadastroKitLanchePage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.LABORATORIOS_CADASTRADOS}`,
    component: LaboratoriosCadastradosPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_LABORATORIO}`,
    component: CadastroLaboratorioPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_LABORATORIO}/${constants.DETALHAR}`,
    component: DetalharCadastroLaboratorioPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_LABORATORIO}/${constants.EDITAR}`,
    component: EditarCadastroLaboratorioPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.TIPOS_EMBALAGENS}`,
    component: TiposEmbalagensCadastradosPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_TIPO_EMBALAGEM}`,
    component: CadastroTipoEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_TIPO_EMBALAGEM}/${constants.EDITAR}`,
    component: EditarCadastroTipoEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.PRODUTOS}`,
    component: ProdutosLogisticaPage,
    exact: true,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_PRODUTOS}`,
    component: CadastroProdutosLogisticaPage,
    exact: true,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.EDICAO_PRODUTOS}`,
    component: EditarProdutosLogisticaPage,
    exact: true,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.UNIDADES_MEDIDA}`,
    component: UnidadesMedidaPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.CADASTRO_UNIDADE_MEDIDA}`,
    component: CadastroUnidadeMedidaPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.EDICAO_UNIDADE_MEDIDA}`,
    component: EditarUnidadesMedidaPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidadeOuCronograma(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.MARCAS}`,
    component: CadastroMarcaPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CADASTROS}/${constants.FABRICANTES}`,
    component: CadastroFabricantePage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor() || usuarioEhCodaeDilog(),
  },
  {
    path: `/configuracoes/cadastros`,
    component: CadastrosPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/configuracoes/gerenciamento-emails`,
    component: GerenciamentoEmailsPage,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/configuracoes/mensagem`,
    component: MensagemPage,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_CODAE_DILOG}`,
    component: GestaoAcessoCodaeDilogPage,
    exact: true,
    tipoUsuario: usuarioEhAdministradorRepresentanteCodae(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_MASTER}`,
    component: GestaoAcessoMasterPage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorCODAE() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_DIRETOR_ESCOLA}`,
    component: GestaoAcessoDiretorEscolaPage,
    exact: true,
    tipoUsuario: usuarioEhDiretorUE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_EMPRESA}`,
    component: GestaoAcessoEmpresaPage,
    exact: true,
    tipoUsuario: usuarioEhAdmQualquerEmpresa(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_COGESTOR}`,
    component: GestaoAcessoCogestorPage,
    exact: true,
    tipoUsuario: usuarioEhCogestorDRE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.GESTAO_ACESSO_GERAL}`,
    component: GestaoAcessoGeralPage,
    exact: true,
    tipoUsuario:
      usuarioEhCoordenadorNutriSupervisao() ||
      usuarioEhCoordenadorNutriCODAE() ||
      usuarioEhCoordenadorGpCODAE(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CARGAS_USUARIOS}`,
    component: CargasUsuariosPage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorCODAE() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.CARGAS_USUARIOS_SERVIDORES}`,
    component: CargasUsuariosServidoresPage,
    exact: true,
    tipoUsuario: usuarioEhAdministradorRepresentanteCodae(),
  },
  {
    path: `/${constants.CONFIGURACOES}/${constants.ATUALIZACAO_EMAIL_EOL}`,
    component: AtualizacaoEmailEOLPage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorCODAE() || usuarioEhCodaeDilog(),
  },
  {
    path: `/configuracoes`,
    component: ConfigEmailPage,
    exact: false,
    tipoUsuario: usuarioEhQualquerCODAE(),
  },
  {
    path: `/${constants.ALTERACAO_TIPO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: relatoriosAlteracaoDeCardapio(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.ALTERACAO_TIPO_ALIMENTACAO_CEMEI}/${constants.RELATORIO}`,
    component: relatoriosAlteracaoDeCardapioCEMEI(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.INCLUSAO_ALIMENTACAO}/${constants.RELATORIO}`,
    component: relatoriosInclusaoDeAlimentacao(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.INCLUSAO_ALIMENTACAO_CEMEI}/${constants.RELATORIO}`,
    component: relatoriosInclusaoDeAlimentacaoCEMEI(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO}`,
    component: relatoriosDietaEspecial(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/ativas-inativas`,
    component: RelatorioAlunosDietasAtivasInativasPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.INVERSAO_CARDAPIO}/${constants.RELATORIO}`,
    component: relatoriosInversaoDiaCardapio(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE}/${constants.RELATORIO}`,
    component: relatoriosSolicitacaoKitLanche(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}/${constants.RELATORIO}`,
    component: relatoriosSolicitacaoUnificada(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACAO_KIT_LANCHE_CEMEI}/${constants.RELATORIO}`,
    component: relatoriosSolicitacaoKitLancheCEMEI(),
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosCODAE,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoAlimentacao(),
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.ALTERACAO_TIPO_ALIMENTACAO}`,
    component: PainelPedidosAlteracaoDeCardapioTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/painel-dieta-especial`,
    component: dashBoardDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhMedicao(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AUTORIZADAS_TEMPORARIAMENTE}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AGUARDANDO_INICIO_VIGENCIA}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_INATIVAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_INATIVAS_TEMPORARIAMENTE}`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/ajuda`,
    component: FaqPage,
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.PRODUTO}`,
    component: CadastroProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.EDITAR}`,
    component: AtualizacaoProdutoFormPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.BUSCA_PRODUTO}`,
    component: BuscaAvancadaProdutoPage,
    exact: true,
    tipoUsuario:
      validaPerfilEscolaMistaParceira() && !usuarioEscolaEhGestaoDireta(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.AVALIAR_RECLAMACAO_PRODUTO}`,
    component: AvaliarReclamacaoProdutoPage,
    exact: true,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.BUSCA_PRODUTO_ANALISE_SENSORIAL}`,
    component: BuscaProdutoAnaliseSensorial,
    exact: true,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RELATORIO_ANALISE_SENSORIAL}`,
    component: BuscaAvancadaProdutoAnaliseSensorial,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.RELATORIO_ANALISE_SENSORIAL}`,
    component: RelatorioAnaliseSensorial,
    exact: true,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.RELATORIO_PRODUTO}`,
    component: RelatorioProduto,
    exact: true,
    tipoUsuario: validaPerfilEscolaMistaParceira(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RELATORIO_RECLAMACAO_PRODUTO}`,
    component: RelatorioReclamacaoProduto,
    exact: true,
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
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-questionamento-ue`,
    component: ResponderQuestionamentoUEPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-questionamento-nutrisupervisor`,
    component: ResponderQuestionamentoNutrisupervisorPage,
    exact: true,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.HOMOLOGACAO_PRODUTO}`,
    component: HomologacaoProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RELATORIO}`,
    component: HomologacaoProdutoPage,
    exact: true,
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
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.RECLAMACAO_DE_PRODUTO}`,
    component: StatusSolicitacoesGestaoProduto.ReclamacaoDeProduto,
    exact: true,
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
    exact: true,
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
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.CORRECAO_DE_PRODUTO}`,
    component: StatusSolicitacoesGestaoProduto.CorrecaoDeProduto,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.AGUARDANDO_ANALISE_RECLAMACAO}`,
    component: StatusSolicitacoesGestaoProduto.AguardandoAnaliseReclamacao,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGestaoProduto() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhCogestorDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.RESPONDER_QUESTIONAMENTOS_DA_CODAE}`,
    component: StatusSolicitacoesGestaoProduto.ResponderQuestionamentoDaCodae,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhCogestorDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.AGUARDANDO_ANALISE_SENSORIAL}`,
    component: StatusSolicitacoesGestaoProduto.AguardandoAnaliseSensorial,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_PENDENTE_HOMOLOGACAO}`,
    component: StatusSolicitacoesGestaoProduto.PendenteHomologacao,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_HOMOLOGADAS}`,
    component: StatusSolicitacoesGestaoProduto.Homologados,
    exact: true,
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
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO.SOLICITACOES_NAO_HOMOLOGADAS}`,
    component: StatusSolicitacoesGestaoProduto.NaoHomologados,
    exact: true,
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
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: "/painel-gestao-produto",
    component: DashboardGestaoProdutoPage,
    exact: true,
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
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.RECLAMACAO_DE_PRODUTO}`,
    component: ReclamacaoDeProdutoPage,
    exact: true,
    tipoUsuario:
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.SUSPENSAO_DE_PRODUTO}`,
    component: BuscaProdutosSuspensos,
    exact: true,
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
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ATIVACAO_DE_PRODUTO}/consulta`,
    component: ConsultaAtivacaoDeProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto,
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ATIVACAO_DE_PRODUTO}/detalhe`,
    component: AtivacaoDeProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto,
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/relatorios/produtos-homologados`,
    component: RelatorioProdutosHomologadosPage,
    exact: true,
    tipoUsuario:
      usuarioEhQualquerCODAE() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhDRE() ||
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-reclamacao/consulta`,
    component: ConsultaResponderReclamacaoPage,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCogestorDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhOrgaoFiscalizador(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/responder-reclamacao/detalhe`,
    component: ResponderReclamacaoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/cadastro-geral`,
    component: CadastroGeralPage,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/vincular-produto-edital`,
    component: VincularProdutosEditaisPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/cadastro-produtos-provinientes-edital`,
    component: CadastroProdutosEdital,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/relatorios/quantitativo-por-terceirizada`,
    component: RelatorioQuantitativoPorTerceirizadaPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEGestaoProduto(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.AVALIAR_SOLICITACAO_CADASTRO_PRODUTO}`,
    component: AvaliarSolicitacaoCadastroProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaTerceirizada(),
  },
  {
    path: `/${constants.GESTAO_PRODUTO}/${constants.ACOMPANHAR_SOLICITACAO_CADASTRO_PRODUTO}`,
    component: AcompanharSolicitacaoCadastroProdutoPage,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP}`,
    component: RelatorioQuantitativoSolicDietaEspPage,
    exact: true,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP}`,
    component: RelatorioQuantitativoClassificacaoDietaEspPage,
    exact: true,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_DIAG_DIETA_ESP}`,
    component: RelatorioQuantitativoDiagDietaEspPage,
    exact: true,
    tipoUsuario: podeAcessarRelatorioQuantSolicDietaEsp,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_DIETA_ESPECIAL}`,
    component: RelatorioDietaEspecial,
    exact: true,
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
      usuarioEhMedicao(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_GESTAO_DIETA_ESPECIAL}`,
    component: RelatorioGestaoDietaEspecial,
    exact: true,
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
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.CONSULTA_PROTOCOLO_PADRAO_DIETA}`,
    component: ConsultaProtocoloPadraoDietaEspecial,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/protocolo-padrao/:uuid/editar`,
    component: EditaProtocoloPadraoDieta,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/protocolo-padrao/:uuid/criar-copia`,
    component: CriarCopiaProtocoloPadraoDieta,
    exact: true,
    tipoUsuario: usuarioEhCODAEDietaEspecial(),
  },
  {
    path: `/${constants.RELATORIO_SOLICITACOES_ALIMENTACAO}`,
    component: RelatorioSolicitacoesAlimentacaoPage,
    exact: true,
    tipoUsuario:
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhMedicao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.RELATORIO_ALUNOS_MATRICULADOS}`,
    component: RelatorioAlunosMatriculadosPage,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhDRE() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhMedicao(),
  },
  {
    path: `/${constants.LANCAMENTO_INICIAL}/${constants.LANCAMENTO_MEDICAO_INICIAL}`,
    component: LancamentoMedicaoInicialPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.LANCAMENTO_INICIAL}/${constants.LANCAMENTO_MEDICAO_INICIAL}/${constants.PERIODO_LANCAMENTO}`,
    component: PeriodoLancamentoMedicaoInicialPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.LANCAMENTO_INICIAL}/${constants.LANCAMENTO_MEDICAO_INICIAL}/${constants.PERIODO_LANCAMENTO_CEI}`,
    component: PeriodoLancamentoMedicaoInicialCEIPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    component: AcompanhamentoDeLancamentosPage,
    exact: true,
    tipoUsuario:
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.CONFERENCIA_DOS_LANCAMENTOS}`,
    component: ConferenciaDosLancamentosPage,
    exact: true,
    tipoUsuario: usuarioEhDRE() || usuarioEhMedicao(),
  },
  {
    path: `/${constants.MEDICAO_INICIAL}/${constants.DETALHAMENTO_DO_LANCAMENTO}`,
    component: DetalhamentoDoLancamentoPage,
    exact: true,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.DISPONIBILIZACAO_DE_SOLICITACOES}`,
    component: DisponibilizacaoDeSolicitacoesPage,
    exact: true,
    tipoUsuario: usuarioEhLogistica(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENVIO_REQUISICOES_ENTREGA}`,
    component: FiltroRequisicaoDilog,
    exact: true,
    tipoUsuario: usuarioEhLogistica(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENVIO_REQUISICOES_ENTREGA_AVANCADO}`,
    component: ConsultaRequisicaoEntregaDilog,
    exact: true,
    tipoUsuario: usuarioEhLogistica(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_REQUISICAO_ENTREGA}`,
    component: GestaoRequisicaoEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GESTAO_SOLICITACAO_ALTERACAO}`,
    component: GestaoSolicitacaoAlteracaoPage,
    exact: true,
    tipoUsuario: usuarioEhLogistica(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONSULTA_SOLICITACAO_ALTERACAO}`,
    component: ConsultaSolicitacaoAlteracaoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.INSUCESSO_ENTREGA}`,
    component: InsucessoEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_INCONSISTENCIAS}`,
    component: ConferenciaInconsistenciasPage,
    exact: true,
    tipoUsuario: usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERIR_ENTREGA}`,
    component: ConferirEntregaPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA}`,
    component: ConferenciaDeGuiaPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REGISTRAR_INSUCESSO}`,
    component: RegistrarInsucessoEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA_COM_OCORRENCIA}`,
    component: ConferenciaDeGuiaComOcorrenciaPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CONFERENCIA_GUIA_RESUMO_FINAL}`,
    component: ConferenciaDeGuiaResumoFinalPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.DETALHAMENTO_GUIA}`,
    component: DetalhamentoGuiaPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REPOSICAO_GUIA}`,
    component: ReposicaoDeGuiaPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.REPOSICAO_RESUMO_FINAL}`,
    component: ReposicaoResumoFinalPage,
    exact: true,
    tipoUsuario:
      usuarioEhEscolaAbastecimento() || usuarioEhEscolaAbastecimentoDiretor(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DILOG}`,
    component: EntregasDilogPage,
    exact: true,
    tipoUsuario: usuarioComAcessoTelaEntregasDilog(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DISTRIBUIDOR}`,
    component: EntregasDistribuidorPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaDistribuidora(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ENTREGAS_DRE}`,
    component: EntregasDrePage,
    exact: true,
    tipoUsuario: usuarioEhDRE(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GUIAS_NOTIFICACAO}`,
    component: GuiasNotificacoesPage,
    exact: true,
    tipoUsuario: usuarioEhCodaeDilog() || usuarioEhDilogJuridico(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.GUIAS_NOTIFICACAO_FISCAL}`,
    component: GuiasNotificacoesFiscalPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhDilog(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.CADASTRO_NOTIFICACAO}`,
    component: CadastroNotificacaoPage,
    exact: true,
    tipoUsuario: usuarioEhCodaeDilog() || usuarioEhDilogJuridico(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.NOTIFICAR_EMPRESA}`,
    component: NotificarEmpresaPage,
    exact: true,
    tipoUsuario: usuarioEhCodaeDilog() || usuarioEhDilogJuridico(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.EDITAR_NOTIFICACAO}`,
    component: EditarNotificacaoPage,
    exact: true,
    tipoUsuario: usuarioEhCodaeDilog() || usuarioEhDilogJuridico(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.DETALHAR_NOTIFICACAO}`,
    component: DetalharNotificacaoPage,
    exact: true,
    tipoUsuario: usuarioComAcessoTelaDetalharNotificacaoOcorrencia(),
  },
  {
    path: `/${constants.LOGISTICA}/${constants.ANALISAR_ASSINAR}`,
    component: AnalisarAssinarPage,
    exact: true,
    tipoUsuario: usuarioEhDilogQualidade() || usuarioEhDilog(),
  },
  {
    path: `/${constants.NOTIFICACOES}`,
    component: NotificacoesPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.CENTRAL_DOWNLOADS}`,
    component: CentralDownloadsPage,
    exact: false,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CRONOGRAMA_ENTREGA}`,
    component: CronogramaEntregaPage,
    exact: true,
    tipoUsuario: usuarioEhPreRecebimento() || usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.SOLICITACAO_ALTERACAO_CRONOGRAMA}`,
    component: SolicitacaoAlteracaoCronogramaPage,
    exact: true,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhDinutreDiretoria() ||
      usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR}`,
    component: SolicitacaoAlteracaoCronogramaFornecedorPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHE_CRONOGRAMA}`,
    component: DetalharCronogramaPage,
    exact: true,
    tipoUsuario: usuarioEhPreRecebimento() || usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ALTERACAO_CRONOGRAMA}`,
    component: AlterarCronogramaPage,
    exact: true,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhPreRecebimento() ||
      usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_ALTERACAO_CRONOGRAMA}`,
    component: AnaliseDilogCronogramaPage,
    exact: true,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhDinutreDiretoria() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhEmpresaFornecedor() ||
      usuarioEhCodaeDilog(),
  },
  {
    /*
    TODO: Conforme solicitado pelos P.Os, usuários Logistica tem acesso
    temporariamente ao Cadastro de Cronograma. Após finalização da definição de
    permissionamento deve se remover usuarioEhLogistica() desta rota.
    */
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_CRONOGRAMA}`,
    component: CadastroCronogramaPage,
    exact: true,
    tipoUsuario: usuarioEhCronograma() || usuarioEhLogistica(),
  },
  {
    /*
    TODO: Conforme solicitado pelos P.Os, usuários Logistica tem acesso
    temporariamente ao Cadastro de Cronograma. Após finalização da definição de
    permissionamento deve se remover usuarioEhLogistica() desta rota.
    */
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_CRONOGRAMA}/${constants.EDITAR}`,
    component: EditarCronogramaPage,
    exact: true,
    tipoUsuario: usuarioEhCronograma() || usuarioEhLogistica(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_APROVACOES}`,
    component: PainelAprovacoesPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelAprovacoes(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusCronogramasPendentesDinutre,
    exact: false,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.AGUARDANDO_DILOG}`,
    component: StatusCronogramasAguardandoDilog,
    exact: false,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesDinutre,
    exact: false,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.ALTERACOES_APROVADAS}`,
    component: StatusSolicitacoesAlteracoesAprovadasDinutre,
    exact: false,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.ALTERACOES_REPROVADAS}`,
    component: StatusSolicitacoesAlteracoesReprovadasDinutre,
    exact: false,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusCronogramasPendentesDilog,
    exact: false,
    tipoUsuario: usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesDilog,
    exact: false,
    tipoUsuario: usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.ALTERACOES_APROVADAS}`,
    component: StatusSolicitacoesAlteracoesAprovadasDilog,
    exact: false,
    tipoUsuario:
      usuarioEhDilogDiretoria() ||
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.DILOG}/${constants.ALTERACOES_REPROVADAS}`,
    component: StatusSolicitacoesAlteracoesReprovadasDilog,
    exact: false,
    tipoUsuario:
      usuarioEhDilogDiretoria() ||
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.AGUARDANDO_ASSINATURAS}`,
    component: StatusAguardandoAssinaturasCronograma,
    exact: false,
    tipoUsuario: usuarioEhCronograma() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.ASSINADO_CODAE}`,
    component: StatusCronogramasAssinadoCODAE,
    exact: false,
    tipoUsuario:
      usuarioEhDinutreDiretoria() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesCronograma,
    exact: false,
    tipoUsuario: usuarioEhCronograma() || usuarioEhCodaeDilog(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.ALTERACOES_CODAE}`,
    component: StatusSolicitacoesAlteracoesCodae,
    exact: false,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhCodaeDilog() ||
      usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.LAYOUT_EMBALAGEM}`,
    component: LayoutEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_LAYOUT_EMBALAGEM}`,
    component: CadastroLayoutEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_LAYOUT_EMBALAGEM}`,
    component: DetalharLayoutEmbalagemPage,
    exact: true,
    tipoUsuario:
      usuarioEhEmpresaFornecedor() || usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_LAYOUT_EMBALAGEM_SOLICITACAO_ALTERACAO}`,
    component: DetalharSolicitacaoAlteracaoLayoutEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}`,
    component: PainelLayoutEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}/${constants.PENDENTES_APROVACAO}/`,
    component: StatusLayoutPendenteAprovacao,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}/${constants.APROVADOS}/`,
    component: StatusLayoutAprovados,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_LAYOUT_EMBALAGEM}/${constants.ENVIADOS_PARA_CORRECAO}/`,
    component: StatusLayoutEnviadosParaCorrecao,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ANALISAR_LAYOUT_EMBALAGEM}`,
    component: AnalisarLayoutEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelEmbalagens(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CORRIGR_LAYOUT_EMBALAGEM}`,
    component: CorrigirLayoutEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ATUALIZAR_LAYOUT_EMBALAGEM}`,
    component: AtualizarLayoutEmbalagemPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DOCUMENTOS_RECEBIMENTO}`,
    component: DocumentosRecebimentoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CADASTRO_DOCUMENTOS_RECEBIMENTO}`,
    component: CadastroDocumentosRecebimentoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_DOCUMENTO_RECEBIMENTO}`,
    component: DetalharDocumentosRecebimentoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_DOCUMENTOS_RECEBIMENTO}`,
    component: PainelDocumentosRecebimentoPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_DOCUMENTOS_RECEBIMENTO}/${constants.PENDENTES_APROVACAO}/`,
    component: StatusDocumentoPendenteAprovacao,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.PAINEL_DOCUMENTOS_RECEBIMENTO}/${constants.APROVADOS}/`,
    component: StatusDocumentoAprovados,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.ANALISAR_DOCUMENTO_RECEBIMENTO}`,
    component: AnalisarDocumentosRecebimentoPage,
    exact: true,
    tipoUsuario: usuarioComAcessoAoPainelDocumentos(),
  },
  {
    path: `/${constants.PRE_RECEBIMENTO}/${constants.CORRIGIR_DOCUMENTOS_RECEBIMENTO}`,
    component: CorrigirDocumentosRecebimentoPage,
    exact: true,
    tipoUsuario: usuarioEhEmpresaFornecedor(),
  },
];

export default routesConfig;
