import { Login } from "../components/Login";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import EditaisCadastradosPage from "../pages/Cadastros/EditaisCadastradosPage";
import EditaisContratosPage from "../pages/Cadastros/EditaisContratosPage";
import EmpresasCadastradas from "../pages/Cadastros/EmpresasCadastradasPage";
import LotesCadastradosPage from "../pages/Cadastros/LotesCadastradosPage";
import PainelPedidosAlteracaoDeCardapioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/RelatorioPage";
import DashboardCODAEDetailDRE from "../pages/CODAE/DashboardCODAEDetailDRE";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import PainelPedidosInclusaoDeAlimentacaoCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioCODAEPage from "../pages/CODAE/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioRelatorioCODAEPage from "../pages/CODAE/InversaoDiaCardapio/RelatorioPage";
import PainelPedidosSolicitacaoUnificadaCODAEPage from "../pages/CODAE/SolicitacaoUnificada/PainelPedidosPage";
import SolicitacaoUnificadaRelatorioCODAEPage from "../pages/CODAE/SolicitacaoUnificada/RelatorioPage";
import StatusSolicitacoesCODAEPage from "../pages/CODAE/StatusSolicitacoesCODAEPage";
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import PermissionsCheckBoxesPage from "../pages/Configuracoes/PermissionsCheckBoxesPage";
import PermissionsPage from "../pages/Configuracoes/PermissionsPage";
import PainelPedidosAlteracaoDeCardapioDREPage from "../pages/DRE/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioDREPage from "../pages/DRE/AlteracaoDeCardapio/RelatorioPage";
import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import PainelPedidosInclusaoDeAlimentacaoDREPage from "../pages/DRE/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioDREPage from "../pages/DRE/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioDREPage from "../pages/DRE/InversaoDiaCardapio/PainelPedidosPage";
import InversaoDiaCardapioRelatorioDREPage from "../pages/DRE/InversaoDiaCardapio/RelatorioPage";
import SolicitacaoUnificadaPage from "../pages/DRE/SolicitacaoUnificadaPage";
import StatusSolicitacoesAutorizadasDREPage from "../pages/DRE/StatusSolicitacoesAutorizadasDREPage";
import StatusSolicitacoesPendentesDREPage from "../pages/DRE/StatusSolicitacoesPendentesDREPage";
import AlteracaoDeCardapioPage from "../pages/Escola/AlteracaoDeCardapioPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import InclusaoDeAlimentacaoPage from "../pages/Escola/InclusaoDeAlimentacaoPage";
import InversaoDeDiaDeCardapioPage from "../pages/Escola/InversaoDeDiaDeCardapioPage";
import SolicitacaoDeKitLanchePage from "../pages/Escola/SolicitacaoDeKitLanchePage";
import StatusSolicitacoesPage from "../pages/Escola/StatusSolicitacoesPage";
import SuspensaoDeAlimentacaoPage from "../pages/Escola/SuspensaoDeAlimentacaoPage";
import Home from "../pages/Home";
import PainelPedidosAlteracaoDeCardapioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/RelatorioPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";
import PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioTerceirizadaPage from "../pages/Terceirizada/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioRelatorioTerceirizadaPage from "../pages/Terceirizada/InversaoDiaCardapio/RelatorioPage";
import PainelPedidosSolicitacaoUnificadaTerceirizadaPage from "../pages/Terceirizada/SolicitacaoUnificada/PainelPedidosPage";
import SolicitacaoUnificadaRelatorioTerceirizadaPage from "../pages/Terceirizada/SolicitacaoUnificada/RelatorioPage";
import StatusSolicitacoesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoesTerceirizadaPage";
import PainelPedidosSuspensaoAlimentacao from "../pages/Terceirizada/SuspensaoAlimentacao/PainelPedidosPage";
import PainelPedidosSuspensaoAlimentacaoRelatorio from "../pages/Terceirizada/SuspensaoAlimentacao/RelatorioPage";
import * as constants from "./constants";
import * as solicitacaoKitLanchePaginas from "./imports/SolicitacaoDeKitLanchePaginas";
import * as statusSolicitacoesPaginas from "./imports/StatusSolicitacoesPaginas";


const routesConfig = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/login",
    component: Login,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.PAINEL_CONTROLE}`,
    component: DashboardEscolaPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/status-solicitacoes`,
    component: StatusSolicitacoesPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.INCLUSAO_ALIMENTACAO}`,
    component: InclusaoDeAlimentacaoPage,
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
    component: solicitacaoKitLanchePaginas.RelatorioEscola,
    exact: true
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: SolicitacaoDeKitLanchePage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.INVERSAO_CARDAPIO}`,
    component: InversaoDeDiaDeCardapioPage,
    exact: false
  },
  {
    path: `/${constants.ESCOLA}/${constants.SUSPENSAO_ALIMENTACAO}`,
    component: SuspensaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.PAINEL_CONTROLE}`,
    component: DashboardDREPage,
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
    component: InversaoDiaCardapioRelatorioDREPage,
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
    component: solicitacaoKitLanchePaginas.RelatorioDRE,
    exact: false
  },
  {
    path: `/${constants.DRE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: solicitacaoKitLanchePaginas.PainelPedidosDRE,
    exact: false
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
    component: PainelPedidosInversaoDiaCardapioRelatorioCODAEPage,
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
    component: PainelPedidosInversaoDiaCardapioRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioTerceirizadaPage,
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
    path: `/${constants.TERCEIRIZADA}/${constants.PAINEL_CONTROLE}`,
    component: DashboardTerceirizadaPage,
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
    component: solicitacaoKitLanchePaginas.RelatorioTerceirizada,
    exact: false
  },
  {
    path: `/${constants.TERCEIRIZADA}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: solicitacaoKitLanchePaginas.PainelPedidosTerceirizada,
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
    component: PermissionsPage,
    exact: false
  },
  {
    path: `/permission-root/permissions/:type/:subtype`,
    component: PermissionsCheckBoxesPage,
    exact: null
  },
  {
    path: `/configuracoes`,
    component: ConfigEmailPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACOES}`,
    component: StatusSolicitacoesCODAEPage,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE}/${
      constants.RELATORIO
    }`,
    component: solicitacaoKitLanchePaginas.RelatorioCODAE,
    exact: false
  },
  {
    path: `/${constants.CODAE}/${constants.SOLICITACAO_KIT_LANCHE}`,
    component: solicitacaoKitLanchePaginas.PainelPedidosCODAE,
    exact: true
  },
  {
    path: `/${constants.CODAE}/${constants.PAINEL_CONTROLE}`,
    component: DashboardCODAEPage,
    exact: false
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
