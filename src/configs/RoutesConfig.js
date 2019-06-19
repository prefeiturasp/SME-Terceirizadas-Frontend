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
import DashboardDREPage from "../pages/DashboardDREPage";

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
    path: "/menu-change",
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
    path: "/tour-request",
    component: TourRequestPage,
    exact: false
  },
  {
    path: "/day-change",
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
    path: "/settings",
    component: EmailConfiguration,
    exact: false
  }
];

export default routesConfig;
