import { Login } from "../components/Login";
import EmailConfiguration from "../components/screens/email/EmailConfiguration";
import AddFoodPage from "../pages/AddFoodPage";
import DayChangePage from "../pages/DayChangePage";
import FoodSuspensionPage from "../pages/FoodSuspensionPage";
import Home from "../pages/Home";
import { MenuChangePage } from "../pages/MenuChangePage";
import PermissionsCheckBoxesPage from "../pages/PermissionsCheckBoxesPage";
import PermissionsPage from "../pages/PermissionsPage";
import TourRequestPage from "../pages/TourRequestPage";

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
    component: AddFoodPage,
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
    path: "/settings",
    component: EmailConfiguration,
    exact: false
  }
];

export default routesConfig;
