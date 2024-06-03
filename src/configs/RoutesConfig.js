import { Login } from "../components/Login";
import FaqPage from "../pages/Faq/FaqPage";
import PerfilPage from "../pages/Perfil/PerfilPage";

import CentralDownloadsPage from "pages/CentralDownloads/CentralDownloadsPage";
import StatusCronogramasAguardandoDilog from "pages/Dinutre/Cronogramas/StatusCronogramasAguardandoDilog";
import StatusCronogramasAssinadoCODAE from "pages/Dinutre/Cronogramas/StatusCronogramasAssinadoCODAE";
import StatusCronogramasPendentesDinutre from "pages/Dinutre/Cronogramas/StatusCronogramasPendentesDinutre";
import StatusSolicitacoesAlteracoesAprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDilog";
import StatusSolicitacoesAlteracoesAprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesAprovadasDinutre";
import StatusSolicitacoesAlteracoesDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDilog";
import StatusSolicitacoesAlteracoesDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesDinutre";
import StatusSolicitacoesAlteracoesReprovadasDilog from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDilog";
import StatusSolicitacoesAlteracoesReprovadasDinutre from "pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesReprovadasDinutre";

import NotificacoesPage from "pages/Notificacoes/NotificacoesPage";

import {
  usuarioEhCODAEGabinete,
  usuarioEhCodaeDilog,
  usuarioEhCronograma,
  usuarioEhDilogDiretoria,
  usuarioEhDinutreDiretoria,
} from "../helpers/utilities";

import StatusAguardandoAssinaturasCronograma from "../pages/Dinutre/Cronogramas/StatusAguardandoAssinaturasCronograma";
import StatusCronogramasPendentesDilog from "../pages/Dinutre/Cronogramas/StatusCronogramasPendentesDilog";
import StatusSolicitacoesAlteracoesCodae from "../pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesCodae";
import StatusSolicitacoesAlteracoesCronograma from "../pages/Dinutre/Solicitacoes/StatusSolicitacoesAlteracoesCronograma";

import * as constants from "./constants";
import { painelInicial } from "./helper";

import { rotasDietaEspecial } from "./rotas/dietaEspecial";
import { rotasGestaoDeAlimentacao } from "./rotas/gestaoDeAlimentacao";
import { rotasGestaoDeProdutos } from "./rotas/gestaoDeProdutos";
import { rotasMedicaoInicial } from "./rotas/medicaoInicial";
import { rotasRelatorios } from "./rotas/relatorios";
import { rotasSupervisao } from "./rotas/supervisao";
import { rotasLogistica } from "./rotas/logistica";
import { rotasPreRecebimento } from "./rotas/preRecebimento";
import { rotasRecebimento } from "./rotas/recebimento";
import { rotasCadastros } from "./rotas/cadastros";
import { rotasConfiguracoes } from "./rotas/configuracoes";

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
  {
    path: `/${constants.DINUTRE}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusCronogramasPendentesDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.AGUARDANDO_DILOG}`,
    component: StatusCronogramasAguardandoDilog,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.ALTERACOES_APROVADAS}`,
    component: StatusSolicitacoesAlteracoesAprovadasDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DINUTRE}/${constants.ALTERACOES_REPROVADAS}`,
    component: StatusSolicitacoesAlteracoesReprovadasDinutre,
    tipoUsuario: usuarioEhDinutreDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusCronogramasPendentesDilog,
    tipoUsuario: usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesDilog,
    tipoUsuario: usuarioEhDilogDiretoria(),
  },
  {
    path: `/${constants.DILOG}/${constants.ALTERACOES_APROVADAS}`,
    component: StatusSolicitacoesAlteracoesAprovadasDilog,
    tipoUsuario:
      usuarioEhDilogDiretoria() ||
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.DILOG}/${constants.ALTERACOES_REPROVADAS}`,
    component: StatusSolicitacoesAlteracoesReprovadasDilog,
    tipoUsuario:
      usuarioEhDilogDiretoria() ||
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.AGUARDANDO_ASSINATURAS}`,
    component: StatusAguardandoAssinaturasCronograma,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.ASSINADO_CODAE}`,
    component: StatusCronogramasAssinadoCODAE,
    tipoUsuario:
      usuarioEhDinutreDiretoria() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCronograma() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.SOLICITACOES_ALTERACOES}`,
    component: StatusSolicitacoesAlteracoesCronograma,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhCodaeDilog() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.CRONOGRAMA}/${constants.ALTERACOES_CODAE}`,
    component: StatusSolicitacoesAlteracoesCodae,
    tipoUsuario:
      usuarioEhCronograma() ||
      usuarioEhDilogDiretoria() ||
      usuarioEhCodaeDilog() ||
      usuarioEhDinutreDiretoria() ||
      usuarioEhCODAEGabinete(),
  },
];

routesConfig = routesConfig.concat(rotasGestaoDeAlimentacao);
routesConfig = routesConfig.concat(rotasDietaEspecial);
routesConfig = routesConfig.concat(rotasGestaoDeProdutos);
routesConfig = routesConfig.concat(rotasMedicaoInicial);
routesConfig = routesConfig.concat(rotasSupervisao);
routesConfig = routesConfig.concat(rotasRelatorios);
routesConfig = routesConfig.concat(rotasLogistica);
routesConfig = routesConfig.concat(rotasPreRecebimento);
routesConfig = routesConfig.concat(rotasRecebimento);
routesConfig = routesConfig.concat(rotasCadastros);
routesConfig = routesConfig.concat(rotasConfiguracoes);

export default routesConfig;
