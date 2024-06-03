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
} from "helpers/utilities";

import AlterarCronogramaPage from "pages/PreRecebimento/AlterarCronogramaPage";
import AnalisarDocumentosRecebimentoPage from "pages/PreRecebimento/AnalisarDocumentosRecebimentoPage";
import AnalisarLayoutEmbalagemPage from "pages/PreRecebimento/AnalisarLayoutEmbalagemPage";
import AtualizarLayoutEmbalagemPage from "pages/PreRecebimento/AtualizarLayoutEmbalagemPage";
import CadastroCronogramaPage from "pages/PreRecebimento/CadastroCronogramaPage";
import CadastroDocumentosRecebimentoPage from "pages/PreRecebimento/CadastroDocumentosRecebimentoPage";
import CadastroLayoutEmbalagemPage from "pages/PreRecebimento/CadastroLayoutEmbalagemPage";
import CalendarioCronogramaPage from "pages/PreRecebimento/CalendarioCronogramaPage";
import StatusDocumentoAprovados from "pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoAprovados";
import StatusDocumentoEnviadosParaCorrecao from "pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoEnviadosParaCorrecao";
import StatusDocumentoPendenteAprovacao from "pages/PreRecebimento/CardsDocumentosRecebimento/StatusDocumentoPendenteAprovacao";
import StatusFichasTecnicasAprovadas from "pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasAprovadas";
import StatusFichasTecnicasEnviadosParaCorrecao from "pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasEnviadosParaCorrecao";
import StatusFichasTecnicasPendenteAprovacao from "pages/PreRecebimento/CardsFichasTecnicas/StatusFichasTecnicasPendenteAprovacao";
import StatusLayoutAprovados from "pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutAprovados";
import StatusLayoutEnviadosParaCorrecao from "pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutEnviadosParaCorrecao";
import StatusLayoutPendenteAprovacao from "pages/PreRecebimento/CardsLayoutEmbalagem/StatusLayoutPendenteAprovacao";
import CorrigirDocumentosRecebimentoPage from "pages/PreRecebimento/CorrigirDocumentosRecebimentoPage";
import CorrigirLayoutEmbalagemPage from "pages/PreRecebimento/CorrigirLayoutEmbalagemPage";
import CronogramaEntregaPage from "pages/PreRecebimento/CronogramaEntregaPage";
import DetalharCodaeDocumentosRecebimentoPage from "pages/PreRecebimento/DetalharCodaeDocumentosRecebimentoPage";
import DetalharCronogramaPage from "pages/PreRecebimento/DetalharCronogramaPage";
import DetalharFornecedorDocumentosRecebimentoPage from "pages/PreRecebimento/DetalharFornecedorDocumentosRecebimentoPage";
import DetalharLayoutEmbalagemPage from "pages/PreRecebimento/DetalharLayoutEmbalagemPage";
import DetalharSolicitacaoAlteracaoLayoutEmbalagemPage from "pages/PreRecebimento/DetalharSolicitacaoAlteracaoLayoutEmbalagemPage";
import AnaliseDilogCronogramaPage from "pages/PreRecebimento/DetalharSolicitacaoCronograma";
import DocumentosRecebimentoPage from "pages/PreRecebimento/DocumentosRecebimentoPage";
import EditarCronogramaPage from "pages/PreRecebimento/EditarCronogramaPage";
import AlterarFichaTecnicaPage from "pages/PreRecebimento/FichaTecnica/AlterarFichaTecnicaPage";
import AnalisarFichaTecnicaPage from "pages/PreRecebimento/FichaTecnica/AnalisarFichaTecnicaPage";
import AtualizarFichaTecnicaPage from "pages/PreRecebimento/FichaTecnica/AtualizarFichaTecnicaPage";
import CadastroFichaTecnicaPage from "pages/PreRecebimento/FichaTecnica/CadastroFichaTecnicaPage";
import DetalharFichaTecnicaPage from "pages/PreRecebimento/FichaTecnica/DetalharFichaTecnicaPage";
import FichaTecnicaPage from "pages/PreRecebimento/FichaTecnica/FichaTecnicaPage";
import LayoutEmbalagemPage from "pages/PreRecebimento/LayoutEmbalagemPage";
import PainelAprovacoesPage from "pages/PreRecebimento/PainelAprovacoesPage";
import PainelDocumentosRecebimentoPage from "pages/PreRecebimento/PainelDocumentosRecebimentoPage";
import PainelFichasTecnicasPage from "pages/PreRecebimento/PainelFichasTecnicasPage";
import PainelLayoutEmbalagemPage from "pages/PreRecebimento/PainelLayoutEmbalagemPage";
import RelatorioCronogramaPage from "pages/PreRecebimento/Relatorios/RelatorioCronogramaPage";
import SolicitacaoAlteracaoCronogramaFornecedorPage from "pages/PreRecebimento/SolicitacaoAlteracaoCronogramaFornecedorPage";
import SolicitacaoAlteracaoCronogramaPage from "pages/PreRecebimento/SolicitacaoAlteracaoCronogramaPage";

import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasPreRecebimento: Array<RotaInterface> = [
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
    path: `/${constants.PRE_RECEBIMENTO}/${constants.RELATORIO_CRONOGRAMA}`,
    component: RelatorioCronogramaPage,
    tipoUsuario: usuarioComAcessoAoRelatorioCronogramas(),
  },
];
