import { Login } from "../components/Login";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import CadastroHorarioComboAlimentacaoPage from "../pages/Cadastros/CadastroHorarioComboAlimentacaoPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import CadastroTipoAlimentacaoPage from "../pages/Cadastros/CadastroTipoAlimentacaoPage";
import FaixasEtariasPage from "../pages/Cadastros/FaixasEtariasPage";
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
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import { DietaEspecialAluno } from "../pages/DietaEspecial/DashboardDietaEspecialPage";
import RelatorioAlunosDietasAtivasInativasPage from "../pages/DietaEspecial/RelatorioAlunosDietasAtivasInativasPage.jsx";
import PainelPedidosAlteracaoDeCardapioDREPage from "../pages/DRE/AlteracaoDeCardapio/PainelPedidosPage";
import PainelPedidosInclusaoDeAlimentacaoDREPage from "../pages/DRE/InclusaoDeAlimentacao/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioDREPage from "../pages/DRE/InversaoDiaCardapio/PainelPedidosPage";
import SolicitacaoUnificadaPage from "../pages/DRE/SolicitacaoUnificadaPage";
import StatusSolicitacoesAutorizadasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesAutorizadasDREPage";
import StatusSolicitacoesCanceladasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesCanceladasDREPage";
import StatusSolicitacoesPendentesDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesPendentesDREPage";
import StatusSolicitacoesRecusadasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesRecusadasDREPage";
import DietaEspecialEscolaPage from "../pages/Escola/DietaEspecial/DietaEspecialEscolaPage";
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
import StatusSolicitacoesCanceladasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesCanceladasTerceirizada";
import StatusSolicitacoesNegadasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesNegadasTerceirizada";
import StatusSolicitacoesPendentesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesPendentes";
import StatusSolicitacoesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoesTerceirizadaPage";
import PainelPedidosSuspensaoAlimentacao from "../pages/Terceirizada/SuspensaoAlimentacao/PainelPedidosPage";
import PainelPedidosSuspensaoAlimentacaoRelatorio from "../pages/Terceirizada/SuspensaoAlimentacao/RelatorioPage";

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
  usuarioEscola,
  usuarioDiretoriaRegional,
  usuarioCODAEGestaoAlimentacao,
  usuarioTerceirizada,
  usuarioCODAEDietaEspecial
} from "../helpers/utilities";
import CadastroProdutoPage from "../pages/Produto/CadastroProdutoPage";
import HomologacaoProdutoPage from "../pages/Produto/HomologacaoProdutoPage";

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
    tipoUsuario: !usuarioCODAEDietaEspecial()
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
    tipoUsuario: usuarioEscola()
  },

  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasEscolaPage,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesEscolaPage,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasEscolaPage,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_RECUSADAS}`,
    component: StatusSolicitacoesRecusadasEscolaPage,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/status-solicitacoes`,
    component: StatusSolicitacoesPage,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: inclusaoCardapio(),
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.ALTERACAO_CARDAPIO}`,
    component: alteracaoCardapio(),
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    //AQUI POW
    component: PainelPageKitLanche.PainelPedidosEscola,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.INVERSAO_CARDAPIO}`,
    component: RelatorioPageInversaoDiaCardapio.InversaoDeDiaDeCardapioPage,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.ESCOLA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: suspensaoAlimentacao(),
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES}`,
    component: statusSolicitacoesPaginas.SolicitacoesTotalDRE,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasDREPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesDREPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_RECUSADAS}`,
    component: StatusSolicitacoesRecusadasDREPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasDREPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoDREPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioDREPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosDRE,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: SolicitacaoUnificadaPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: PainelPedidosSolicitacaoUnificadaCODAEPage,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesNegadasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.DRE}/${constants.ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioDREPage,
    exact: false,
    tipoUsuario: usuarioDiretoriaRegional()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES}`,
    component: StatusSolicitacoesTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosTerceirizada,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${
      constants.SOLICITACAO_KIT_LANCHE_UNIFICADA
    }`,
    component: PainelPedidosSolicitacaoUnificadaTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
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
    tipoUsuario: usuarioTerceirizada()
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
    tipoUsuario: usuarioCODAEDietaEspecial() || usuarioCODAEGestaoAlimentacao()
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
    tipoUsuario: usuarioCODAEDietaEspecial() || usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/configuracoes/cadastros/horario-combos-alimentacao`,
    component: CadastroHorarioComboAlimentacaoPage,
    exact: false,
    tipoUsuario: usuarioEscola()
  },
  {
    path: `/configuracoes/cadastros/empresas-cadastradas`,
    component: EmpresasCadastradas,
    exact: false,
    tipoUsuario: usuarioCODAEDietaEspecial() || usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/configuracoes/cadastros/empresa`,
    component: CadastroEmpresaPage,
    exact: false,
    tipoUsuario: usuarioCODAEDietaEspecial() || usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/configuracoes/cadastros/editais-contratos`,
    component: EditaisContratosPage,
    exact: true,
    tipoUsuario: usuarioCODAEDietaEspecial() || usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/configuracoes/cadastros/faixas-etarias`,
    component: FaixasEtariasPage,
    exact: true,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
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
    tipoUsuario: usuarioCODAEDietaEspecial() || usuarioCODAEGestaoAlimentacao()
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
    tipoUsuario: usuarioCODAEDietaEspecial() || usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.ALTERACAO_CARDAPIO}/${constants.RELATORIO}`,
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
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.CODAE}/${constants.DETALHE_DASHBOARD_DRE}`,
    component: DashboardCODAEDetailDRE,
    exact: false,
    tipoUsuario: usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioTerceirizadaPage,
    exact: false,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/painel-dieta-especial`,
    component: dashBoardDietaEspecial(),
    exact: true,
    tipoUsuario: !usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_PENDENTES
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: !usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_NEGADAS
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: !usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_AUTORIZADAS
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: !usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${
      constants.SOLICITACOES_CANCELADAS
    }`,
    component: StatusSolicitacoesDietaEspecial(),
    exact: true,
    tipoUsuario: !usuarioCODAEGestaoAlimentacao()
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${constants.PRODUTO}`,
    component: CadastroProdutoPage,
    exact: true,
    tipoUsuario: usuarioTerceirizada()
  },
  {
    path: `/${constants.PESQUISA_DESENVOLVIMENTO}/${
      constants.HOMOLOGACAO_PRODUTO
    }`,
    component: HomologacaoProdutoPage,
    exact: true,
    tipoUsuario: true
  }
];

export default routesConfig;
