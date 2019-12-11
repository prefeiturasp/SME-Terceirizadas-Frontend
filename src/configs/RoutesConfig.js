import {
  painelHome,
  permissoes,
  relatorios,
  relatoriosAlteracaoDeCardapio
} from "./helper";
import { Login } from "../components/Login";
import PerfilPage from "../pages/Perfil/PerfilPage";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import CadastroTipoAlimentacaoPage from "../pages/Cadastros/CadastroTipoAlimentacaoPage";
import EditaisCadastradosPage from "../pages/Cadastros/EditaisCadastradosPage";
import EditaisContratosPage from "../pages/Cadastros/EditaisContratosPage";
import EmpresasCadastradas from "../pages/Cadastros/EmpresasCadastradasPage";
import LotesCadastradosPage from "../pages/Cadastros/LotesCadastradosPage";
import PainelPedidosAlteracaoDeCardapioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/RelatorioPage";
import DashboardCODAEDetailDRE from "../pages/CODAE/DashboardCODAEDetailDRE";
import PainelPedidosInclusaoDeAlimentacaoCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioCODAEPage from "../pages/CODAE/InversaoDiaCardapio/PainelPedidosPage";

import PainelPedidosSolicitacaoUnificadaCODAEPage from "../pages/CODAE/SolicitacaoUnificada/PainelPedidosPage";
import SolicitacaoUnificadaRelatorioCODAEPage from "../pages/CODAE/SolicitacaoUnificada/RelatorioPage";
import SolicitacaoUnificadaRelatorioDREPage from "../pages/DRE/SolicitacaoUnificada/RelatorioPage";
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import PainelPedidosAlteracaoDeCardapioDREPage from "../pages/DRE/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioDREPage from "../pages/DRE/AlteracaoDeCardapio/RelatorioPage";
import AlteracaoDeCardapioRelatorioEscolaPage from "../pages/Escola/AlteracaoDeCardapio/RelatorioPage";
import PainelPedidosInclusaoDeAlimentacaoDREPage from "../pages/DRE/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioDREPage from "../pages/DRE/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioDREPage from "../pages/DRE/InversaoDiaCardapio/PainelPedidosPage";

import SolicitacaoUnificadaPage from "../pages/DRE/SolicitacaoUnificadaPage";
import StatusSolicitacoesAutorizadasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesAutorizadasDREPage";
import StatusSolicitacoesPendentesDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesPendentesDREPage";
import StatusSolicitacoesRecusadasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesRecusadasDREPage";
import StatusSolicitacoesCanceladasDREPage from "../pages/DRE/Solicitacoes/StatusSolicitacoesCanceladasDREPage";
import StatusSolicitacoesAutorizadasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesAutorizadasCODAEPage";
import StatusSolicitacoesPendentesCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesPendentesCODAEPage";
import StatusSolicitacoesRecusadasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesRecusadasCODAEPage";

import StatusSolicitacoesCanceladasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesCanceladasTerceirizada";
import StatusSolicitacoesNegadasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesNegadasTerceirizada";
import StatusSolicitacoesPendentesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesPendentes";
import StatusSolicitacoesAutorizadasTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoes/StatusSolicitacoesAutorizadas";

import StatusSolicitacoesCanceladasCODAEPage from "../pages/CODAE/Solicitacoes/StatusSolicitacoesCanceladasCODAEPage";
import AlteracaoDeCardapioPage from "../pages/Escola/AlteracaoDeCardapioPage";
import InclusaoDeAlimentacaoPage from "../pages/Escola/InclusaoDeAlimentacaoPage";

import StatusSolicitacoesAutorizadasEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesAutorizadasEscolaPage";

import DietaEspecialEscolaPage from "../pages/Escola/DietaEspecial/DietaEspecialEscolaPage";
import RelatorioDietaEspecialEscolaPage from "../pages/Escola/DietaEspecial/RelatorioPage";
import StatusSolicitacoesCanceladasEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesCanceladasEscolaPage";
import StatusSolicitacoesRecusadasEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesRecusadasEscolaPage";
import StatusSolicitacoesPendentesEscolaPage from "../pages/Escola/StatusSolicitacoes/StatusSolicitacoesPendentesEscolaPage";
import StatusSolicitacoesPage from "../pages/Escola/StatusSolicitacoesPage";
import SuspensaoDeAlimentacaoPage from "../pages/Escola/SuspensaoDeAlimentacaoPage";
import PainelPedidosAlteracaoDeCardapioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/RelatorioPage";
import PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioTerceirizadaPage from "../pages/Terceirizada/InversaoDiaCardapio/PainelPedidosPage";

import PainelPedidosSolicitacaoUnificadaTerceirizadaPage from "../pages/Terceirizada/SolicitacaoUnificada/PainelPedidosPage";
import SolicitacaoUnificadaRelatorioTerceirizadaPage from "../pages/Terceirizada/SolicitacaoUnificada/RelatorioPage";
import StatusSolicitacoesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoesTerceirizadaPage";
import PainelPedidosSuspensaoAlimentacao from "../pages/Terceirizada/SuspensaoAlimentacao/PainelPedidosPage";
import PainelPedidosSuspensaoAlimentacaoRelatorio from "../pages/Terceirizada/SuspensaoAlimentacao/RelatorioPage";
import * as constants from "./constants";

import * as InclusaoDeAlimentacaoPaginas from "./imports/InclusaoDeAlimentacaoPaginas";
import * as statusSolicitacoesPaginas from "./imports/StatusSolicitacoesPaginas";

import * as RelatorioPageInversaoDiaCardapio from "../pages/InversaoDeDiaDeCardapio/RelatorioPage";
import * as PainelPageKitLanche from "../pages/SolicitacaoDeKitLanche/ContainerPage";
import * as RelatorioPageKitLanche from "../pages/SolicitacaoDeKitLanche/RelatorioPage";

const routesConfig = [
  {
    path: "/",
    component: painelHome(),
    exact: true
  },
  {
    path: "/login",
    component: Login,
    exact: false
  },

  {
    path: "/perfil",
    component: PerfilPage,
    exact: false
  },
  {
    path: "/relatorios",
    component: relatorios(),
    exact: true
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL}/${
      constants.RELATORIO
    }`,
    component: RelatorioDietaEspecialEscolaPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialEscolaPage,
    exact: false
  },

  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasEscolaPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesEscolaPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasEscolaPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_RECUSADAS}`,
    component: StatusSolicitacoesRecusadasEscolaPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/status-solicitacoes`,
    component: StatusSolicitacoesPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.INCLUSAO_ALIMENTACAO}/${
      constants.RELATORIO
    }`,
    component: InclusaoDeAlimentacaoPaginas.RelatorioEscola,
    exact: true
  },
  {
    path: `/${constants.ESCOLA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: InclusaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.ALTERACAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: AlteracaoDeCardapioRelatorioEscolaPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.ALTERACAO_CARDAPIO}`,
    component: AlteracaoDeCardapioPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACAO_KIT_LANCHE}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageKitLanche.RelatorioEscola,
    exact: true
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosEscola,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.INVERSAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageInversaoDiaCardapio.RelatorioEscola,
    exact: true
  },
  {
    path: `/${constants.ESCOLA}/${constants.INVERSAO_CARDAPIO}`,
    component: RelatorioPageInversaoDiaCardapio.InversaoDeDiaDeCardapioPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: SuspensaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES}`,
    component: statusSolicitacoesPaginas.SolicitacoesTotalDRE,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_RECUSADAS}`,
    component: StatusSolicitacoesRecusadasDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.INCLUSAO_ALIMENTACAO}/${
      constants.RELATORIO
    }`,
    component: InclusaoDeAlimentacaoRelatorioDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.INVERSAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageInversaoDiaCardapio.RelatorioDRE,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageKitLanche.RelatorioDRE,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosDRE,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}/${
      constants.RELATORIO
    }`,
    component: SolicitacaoUnificadaRelatorioDREPage,
    exact: true
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: SolicitacaoUnificadaPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.ALTERACAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: AlteracaoDeCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.INCLUSAO_ALIMENTACAO}/${
      constants.RELATORIO
    }`,
    component: InclusaoDeAlimentacaoRelatorioCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.ALTERACAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: AlteracaoDeCardapioRelatorioCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.INVERSAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageInversaoDiaCardapio.RelatorioCODAE,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}/${
      constants.RELATORIO
    }`,
    component: SolicitacaoUnificadaRelatorioCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: PainelPedidosSolicitacaoUnificadaCODAEPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INVERSAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageInversaoDiaCardapio.RelatorioTerceirizada,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesNegadasTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioDREPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.ALTERACAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: AlteracaoDeCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACOES}`,
    component: StatusSolicitacoesTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INCLUSAO_ALIMENTACAO}/${
      constants.RELATORIO
    }`,
    component: InclusaoDeAlimentacaoRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageKitLanche.RelatorioTerceirizada,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosTerceirizada,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${
      constants.SOLICITACAO_KIT_LANCHE_UNIFICADA
    }/${constants.RELATORIO}`,
    component: SolicitacaoUnificadaRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${
      constants.SOLICITACAO_KIT_LANCHE_UNIFICADA
    }`,
    component: PainelPedidosSolicitacaoUnificadaTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SUSPENSAO_ALIMENTACAO}/${
      constants.RELATORIO
    }`,
    component: PainelPedidosSuspensaoAlimentacaoRelatorio,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: PainelPedidosSuspensaoAlimentacao,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/lotes-cadastrados`,
    component: LotesCadastradosPage,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/editais-cadastrados`,
    component: EditaisCadastradosPage,
    exact: true
  },
  {
    path: `/configuracoes/cadastros/lote`,
    component: CadastroLotePage,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/tipos-alimentacao`,
    component: CadastroTipoAlimentacaoPage,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/empresas-cadastradas`,
    component: EmpresasCadastradas,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/empresa`,
    component: CadastroEmpresaPage,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/editais-contratos`,
    component: EditaisContratosPage,
    exact: true
  },
  {
    path: `/configuracoes/cadastros`,
    component: CadastrosPage,
    exact: false
  },
  {
    path: `/configuracoes/mensagem`,
    component: MensagemPage,
    exact: false
  },
  {
    path: `/configuracoes/permissoes`,
    component: permissoes(),
    exact: false
  },
  {
    path: `/configuracoes`,
    component: ConfigEmailPage,
    exact: false
  },
  {
    path: `/${constants.ALTERACAO_CARDAPIO}/${constants.RELATORIO}`,
    component: relatoriosAlteracaoDeCardapio(),
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE}/${
      constants.RELATORIO
    }`,
    component: RelatorioPageKitLanche.RelatorioCODAE,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: PainelPageKitLanche.PainelPedidosCODAE,
    exact: true
  },
  {
    path: `/${constants.CODAE}/${constants.DETALHE_DASHBOARD_DRE}`,
    component: DashboardCODAEDetailDRE,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.ALTERACAO_CARDAPIO}/${
      constants.RELATORIO
    }`,
    component: AlteracaoDeCardapioRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioTerceirizadaPage,
    exact: false
  }
];

export default routesConfig;
