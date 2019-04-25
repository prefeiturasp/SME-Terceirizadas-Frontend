import { Login } from "../components/Login";
import { MenuChangePage } from "../pages/MenuChangePage";
import Home from "../pages/Home";
import AddFoodPage from "../pages/AddFoodPage";
import PermissionsPage from "../pages/PermissionsPage";
import TourRequestPage from "../pages/TourRequestPage";
import DayChangePage from "../pages/DayChangePage";
import FoodSuspensionPage from "../pages/FoodSuspensionPage";
import PermissionsCheckBoxesPage from "../pages/PermissionsCheckBoxesPage";

const routesConfig = [
  {
    path : "/",
    component : Home,
    exact : true
  },
  {
    path : "/login",
    component : Login,
    exact : false
  },
  {
    path : "/menu-change",
    component : MenuChangePage,
    exact : false
  },
  {
    path : "/add-food",
    component : AddFoodPage,
    exact : false
  },
  {
    path : "/permission-root/permissions/:type/:subtype",
    component : PermissionsCheckBoxesPage,
    exact : null
  },
  {
    path : "/permissions",
    component : PermissionsPage,
    exact : false
  },
  {
    path : "/tour-request",
    component : TourRequestPage,
    exact : false
  },
  {
    path : "/day-change",
    component : DayChangePage,
    exact : false
  },
  {
    path : "/food-suspension",
    component : FoodSuspensionPage,
    exact : false
  },


]

export default routesConfig;
