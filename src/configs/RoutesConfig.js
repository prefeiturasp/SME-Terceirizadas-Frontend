import { Login } from "../components/Login";
import { MenuChangePage } from "../pages/MenuChangePage";
import Home from "../pages/Home";
import FoodInclusionPage from "../pages/FoodInclusionPage";
import PermissionsPage from "../pages/PermissionsPage";
import TourRequestPage from "../pages/TourRequestPage";
import DayChangePage from "../pages/DayChangePage";
import FoodSuspensionPage from "../pages/FoodSuspensionPage";
import UnifiedSolicitationPage from "../pages/UnifiedSolicitationPage";
import UnifiedSolicitationHistoricPage from "../pages/UnifiedSolicitationHistoricPage";
import PermissionsCheckBoxesPage from "../pages/PermissionsCheckBoxesPage";
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
import ConfigEmailPage from "../pages/ConfigEmailPage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import LotesCadastradosPage from "../pages/Cadastros/LotesCadastradosPage";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import EmpresasCadastradas from "../pages/Cadastros/EmpresasCadastradasPage";


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
    path: "/alterar-cardapio",
    component: MenuChangePage,
    exact: false
  },
  {
    path: "/add-food",
    component: FoodInclusionPage,
    exact: false
  },
  {
    path: "/permission-root/permissions/:type/:subtype",
    component: PermissionsCheckBoxesPage,
    exact: null
  },
  {
    path: "/permissions",
    component: PermissionsPage,
    exact: false
  },
  {
    path: "/kit-lanche",
    component: TourRequestPage,
    exact: false
  },
  {
    path: "/inverter-dia-cardapio",
    component: DayChangePage,
    exact: false
  },
  {
    path: "/food-suspension",
    component: FoodSuspensionPage,
    exact: false
  },
  {
    path: "/unified-solicitation/historic",
    component: UnifiedSolicitationHistoricPage,
    exact: false
  },
  {
    path: "/unified-solicitation",
    component: UnifiedSolicitationPage,
    exact: false
  },
  {
    path: "/dashboard-dre",
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
    path: "/settings",
    component: ConfigEmailPage,
    exact: false
  },
  {
    path: "/painel-escola",
    component: DashboardEscolaPage,
    exact: false
  },
  {
    path: "/status-solicitacoes-escola",
    component: StatusSolicitacoesPage,
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
  }
];

export default routesConfig;
