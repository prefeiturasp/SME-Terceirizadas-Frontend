import { Login } from "../components/Login";
import FaqPage from "../pages/Faq/FaqPage";
import PerfilPage from "../pages/Perfil/PerfilPage";

import CentralDownloadsPage from "pages/CentralDownloads/CentralDownloadsPage";
import StatusCronogramasAguardandoDilog from "pages/Dinutre/Cronogramas/StatusCronogramasAguardandoDilog";
import StatusCronogramasAssinadoCODAE from "pages/Dinutre/Cronogramas/StatusCronogramasAssinadoCODAE";
import StatusCronogramasPendentesDinutre from "pages/Dinutre/Cronogramas/StatusCronogramasPendentesDinutre";
import StatusSolicitacoesAlteracoesAprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDilog";
import StatusSolicitacoesAlteracoesAprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDinutre";
import StatusSolicitacoesAlteracoesDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDilog";
import StatusSolicitacoesAlteracoesDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDinutre";
import StatusSolicitacoesAlteracoesReprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDilog";
import StatusSolicitacoesAlteracoesReprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDinutre";

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

import {
  usuarioComAcessoAoCalendarioCronograma,
  usuarioComAcessoAoPainelAprovacoes,
  usuarioComAcessoAoPainelDocumentos,
  usuarioComAcessoAoPainelEmbalagens,
  usuarioComAcessoAoPainelFichasTecnicas,
  usuarioComAcessoAoRelatorioCronogramas,
  usuarioEhCODAEGabinete,
  usuarioEhCodaeDilog,
  usuarioEhCronograma,
  usuarioEhDilogDiretoria,
  usuarioEhDilogQualidade,
  usuarioEhDinutreDiretoria,
  usuarioEhEmpresaFornecedor,
  usuarioEhPreRecebimento,
  usuarioEhRecebimento,
} from "../helpers/utilities";

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

import CadastroFichaRecebimentoPage from "../pages/Recebimento/FichaRecebimento/CadastroFichaRecebimentoPage";
import FichaRecebimentoPage from "../pages/Recebimento/FichaRecebimento/FichaRecebimentoPage";
import AtribuirQuestoesPage from "../pages/Recebimento/QuestoesPorProduto/AtribuirQuestoesPage";
import CopiarAtribuicaoQuestoesPage from "../pages/Recebimento/QuestoesPorProduto/CopiarAtribuicaoQuestoesPage";
import EditarAtribuicaoQuestoesPage from "../pages/Recebimento/QuestoesPorProduto/EditarAtribuicaoQuestoesPage";
import QuestoesPorProdutoPage from "../pages/Recebimento/QuestoesPorProduto/QuestoesPorProdutoPage";
import * as constants from "./constants";
import { painelInicial } from "./helper";

import { rotasDietaEspecial } from "./rotas/dietaEspecial";
import { rotasGestaoDeAlimentacao } from "./rotas/gestaoDeAlimentacao";
import { rotasGestaoDeProdutos } from "./rotas/gestaoDeProdutos";
import { rotasMedicaoInicial } from "./rotas/medicaoInicial";
import { rotasRelatorios } from "./rotas/relatorios";
import { rotasSupervisao } from "./rotas/supervisao";
import { rotasLogistica } from "./rotas/logistica";
import { rotasCadastros } from "./rotas/cadastros";
import { rotasConfiguracoes } from "./rotas/configuracoes";

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
    path: `/ajuda`,
    component: FaqPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
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
routesConfig = routesConfig.concat(rotasGestaoDeProdutos);
routesConfig = routesConfig.concat(rotasMedicaoInicial);
routesConfig = routesConfig.concat(rotasSupervisao);
routesConfig = routesConfig.concat(rotasRelatorios);
routesConfig = routesConfig.concat(rotasLogistica);
routesConfig = routesConfig.concat(rotasCadastros);
routesConfig = routesConfig.concat(rotasConfiguracoes);

export default routesConfig;
