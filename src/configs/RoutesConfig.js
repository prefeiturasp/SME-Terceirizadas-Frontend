import CentralDownloadsPage from "pages/CentralDownloads/CentralDownloadsPage";
import NotificacoesPage from "pages/Notificacoes/NotificacoesPage";
import { Login } from "../components/Login";
import FaqPage from "../pages/Faq/FaqPage";
import PerfilPage from "../pages/Perfil/PerfilPage";

import * as constants from "./constants";
import { painelInicial } from "./helper";

import { rotasAbastecimento } from "./rotas/abastecimento";
import { rotasCadastros } from "./rotas/cadastros";
import { rotasConfiguracoes } from "./rotas/configuracoes";
import { rotasDietaEspecial } from "./rotas/dietaEspecial";
import { rotasGestaoDeAlimentacao } from "./rotas/gestaoDeAlimentacao";
import { rotasGestaoDeProdutos } from "./rotas/gestaoDeProdutos";
import { rotasMedicaoInicial } from "./rotas/medicaoInicial";
import { rotasPreRecebimento } from "./rotas/preRecebimento";
import { rotasRecebimento } from "./rotas/recebimento";
import { rotasRelatorios } from "./rotas/relatorios";
import { rotasSupervisao } from "./rotas/supervisao";

let routesConfig = [
  {
    path: "/",
    component: painelInicial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: "/login",
    component: Login,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: "/perfil",
    component: PerfilPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/ajuda`,
    component: FaqPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.NOTIFICACOES}`,
    component: NotificacoesPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.CENTRAL_DOWNLOADS}`,
    component: CentralDownloadsPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
];

routesConfig = routesConfig.concat(rotasGestaoDeAlimentacao);
routesConfig = routesConfig.concat(rotasDietaEspecial);
routesConfig = routesConfig.concat(rotasGestaoDeProdutos);
routesConfig = routesConfig.concat(rotasMedicaoInicial);
routesConfig = routesConfig.concat(rotasSupervisao);
routesConfig = routesConfig.concat(rotasRelatorios);
routesConfig = routesConfig.concat(rotasAbastecimento);
routesConfig = routesConfig.concat(rotasPreRecebimento);
routesConfig = routesConfig.concat(rotasRecebimento);
routesConfig = routesConfig.concat(rotasCadastros);
routesConfig = routesConfig.concat(rotasConfiguracoes);

export default routesConfig;
