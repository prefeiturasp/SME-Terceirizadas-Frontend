import { Login } from "../components/Login";
import { MenuChangePage } from "../pages/MenuChangePage";
import Home from "../pages/Home";
import FoodInclusionPage from "../pages/FoodInclusionPage";
import PermissionsPage from "../pages/PermissionsPage";
import TourRequestPage from "../pages/TourRequestPage";
import EmailConfiguration from "../components/screens/email/EmailConfiguration";
import DayChangePage from "../pages/DayChangePage";
import FoodSuspensionPage from "../pages/FoodSuspensionPage";
import UnifiedSolicitationPage from "../pages/UnifiedSolicitationPage";
import UnifiedSolicitationHistoricPage from "../pages/UnifiedSolicitationHistoricPage";
import PermissionsCheckBoxesPage from "../pages/PermissionsCheckBoxesPage";
import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import StatusSolicitacoesDREPage from "../pages/DRE/StatusSolicitacoesDREPage";
import KitsLancheOrdersPage from "../pages/DRE/KitLancheOrdersPage";
import KitsLancheRelatorioPage from "../pages/DRE/KitLancheRelatorioPage";
import DashboardEscolaPage from "../pages/ESCOLA/DashboardEscolaPage";
import StatusSolicitacoesPage from "../pages/ESCOLA/StatusSolicitacoesPage";

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
    path: "/settings",
    component: EmailConfiguration,
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
];

export default routesConfig;
