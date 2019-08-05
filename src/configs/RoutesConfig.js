import { Login } from "../components/Login";
import AlteracaoDeCardapioPage from "../pages/Escola/AlteracaoDeCardapioPage";
import Home from "../pages/Home";
import InclusaoDeAlimentacaoPage from "../pages/Escola/InclusaoDeAlimentacaoPage";
import PermissionsPage from "../pages/Configuracoes/PermissionsPage";
import TourRequestPage from "../pages/Escola/TourRequestPage";
import DayChangePage from "../pages/Escola/DayChangePage";
import SuspensaoDeAlimentacaoPage from "../pages/Escola/SuspensaoDeAlimentacaoPage";
import SolicitacaoUnificadaPage from "../pages/DRE/SolicitacaoUnificadaPage";
import UnifiedSolicitationHistoricPage from "../pages/UnifiedSolicitationHistoricPage";
import PermissionsCheckBoxesPage from "../pages/Configuracoes/PermissionsCheckBoxesPage";
import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import StatusSolicitacoesDREPage from "../pages/DRE/StatusSolicitacoesDREPage";
import KitsLancheOrdersPage from "../pages/DRE/KitLancheOrdersPage";
import KitsLancheRelatorioPage from "../pages/DRE/KitLancheRelatorioPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";
import StatusSolicitacoesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoesTerceirizadaPage";
import KitsLancheOrdersTerceirizadaPage from "../pages/Terceirizada/KitLancheOrdersTerceirizadaPage";
import KitsLancheRelatorioTerceirizadaPage from "../pages/Terceirizada/KitLancheRelatorioTerceirizadaPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import StatusSolicitacoesPage from "../pages/Escola/StatusSolicitacoesPage";
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import LotesCadastradosPage from "../pages/Cadastros/LotesCadastradosPage";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import EmpresasCadastradas from "../pages/Cadastros/EmpresasCadastradasPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import StatusSolicitacoesCODAEPage from "../pages/CODAE/StatusSolicitacoesCODAEPage";
import KitLancheOrdersPageCodae from "../pages/CODAE/KitLancheOrderPageCodae";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import DashboardCODAEDetailDRE from "../pages/CODAE/DashboardCODAEDetailDRE";
import KitsLancheRelatorioCodaePage from "../pages/CODAE/KitLancheRelatorioCodaePage";

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
    path: "/escola/painel-de-controle",
    component: DashboardEscolaPage,
    exact: false
  },
  {
    path: "/escola/status-solicitacoes",
    component: StatusSolicitacoesPage,
    exact: false
  },
  {
    path: "/escola/inclusao-de-alimentacao",
    component: InclusaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: "/escola/alteracao-de-cardapio",
    component: AlteracaoDeCardapioPage,
    exact: false
  },
  {
    path: "/escola/solicitacao-de-kit-lanche",
    component: TourRequestPage,
    exact: false
  },
  {
    path: "/escola/inversao-de-dia-de-cardapio",
    component: DayChangePage,
    exact: false
  },
  {
    path: "/escola/suspensao-de-alimentacao",
    component: SuspensaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: "/dre/painel-de-controle",
    component: DashboardDREPage,
    exact: false
  },
  {
    path: "/dre/solicitacoes",
    component: StatusSolicitacoesDREPage,
    exact: false
  },
  {
    path: "/dre/kits-lanche/relatorio",
    component: KitsLancheRelatorioPage,
    exact: false
  },
  {
    path: "/dre/kits-lanche",
    component: KitsLancheOrdersPage,
    exact: false
  },
  {
    path: "/dre/solicitacao-unificada",
    component: SolicitacaoUnificadaPage,
    exact: false
  },
  {
    path: "/codae/solicitacao-unificada/historico",
    component: UnifiedSolicitationHistoricPage,
    exact: false
  },
  {
    path: "/terceirizada/painel-de-controle",
    component: DashboardTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/solicitacoes",
    component: StatusSolicitacoesTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/kits-lanche/relatorio",
    component: KitsLancheRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/kits-lanche",
    component: KitsLancheOrdersTerceirizadaPage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/lotes-cadastrados",
    component: LotesCadastradosPage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/lote",
    component: CadastroLotePage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/empresas-cadastradas",
    component: EmpresasCadastradas,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/empresa",
    component: CadastroEmpresaPage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros",
    component: CadastrosPage,
    exact: false
  },
  {
    path: "/configuracoes/mensagem",
    component: MensagemPage,
    exact: false
  },
  {
    path: "/configuracoes/permissoes",
    component: PermissionsPage,
    exact: false
  },
  {
    path: "/permission-root/permissions/:type/:subtype",
    component: PermissionsCheckBoxesPage,
    exact: null
  },
  {
    path: "/configuracoes",
    component: ConfigEmailPage,
    exact: false
  },
  {
    path: "/codae/solicitacoes",
    component: StatusSolicitacoesCODAEPage,
    exact: false
  },
  {
    path: "/codae/kits-lanche/relatorio",
    component: KitsLancheRelatorioCodaePage,
    exact: false
  },
  {
    path: "/codae/kits-lanche",
    component: KitLancheOrdersPageCodae,
    exact: true
  },
  {
    path: "/codae/painel-de-controle",
    component: DashboardCODAEPage,
    exact: false
  },
  {
    path: "/codae/detalhe-dashboard-dre",
    component: DashboardCODAEDetailDRE,
    exact: false
  }
];

export default routesConfig;
