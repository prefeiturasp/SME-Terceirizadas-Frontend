import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGabinete,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhDRE,
  usuarioEhEmpresaTerceirizada,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhMedicao,
  usuarioEhNutricionistaSupervisao,
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoParceira,
} from "helpers/utilities";

import { CancelamentoDietaPage } from "pages/DietaEspecial/CancelamentoDietaPage";
import { DietaEspecialAluno } from "pages/DietaEspecial/DashboardDietaEspecialPage";
import RelatorioAlunosDietasAtivasInativasPage from "pages/DietaEspecial/RelatorioAlunosDietasAtivasInativasPage.jsx";
import { AlteracaoUEPage } from "pages/Escola/DietaEspecial/AlteracaoUEPage";
import { DietaEspecialEscolaPage } from "pages/Escola/DietaEspecial/DietaEspecialEscolaPage";
import {
  StatusSolicitacoesDietaEspecial,
  dashBoardDietaEspecial,
  relatoriosDietaEspecial,
} from "./helpers";

import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasDietaEspecial: Array<RotaInterface> = [
  {
    path: `/painel-dieta-especial`,
    component: dashBoardDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhMedicao() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEDietaEspecial() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AUTORIZADAS_TEMPORARIAMENTE}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_AGUARDANDO_INICIO_VIGENCIA}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_INATIVAS}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.SOLICITACOES_DIETA_ESPECIAL}/${constants.SOLICITACOES_INATIVAS_TEMPORARIAMENTE}`,
    component: StatusSolicitacoesDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.ALUNO}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialAluno,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.RELATORIO}`,
    component: relatoriosDietaEspecial(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/ativas-inativas`,
    component: RelatorioAlunosDietasAtivasInativasPage,
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira(),
  },
  {
    path: `/${constants.DIETA_ESPECIAL}/${constants.CANCELAMENTO}`,
    component: CancelamentoDietaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.DIETA_ESPECIAL_ALTERACAO_UE}`,
    component: AlteracaoUEPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEscolaEhGestaoDireta() ||
      usuarioEscolaEhGestaoParceira(),
  },
];
