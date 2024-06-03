import {
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoParceira,
} from "helpers/utilities";
import { CancelamentoDietaPage } from "pages/DietaEspecial/CancelamentoDietaPage";
import { DietaEspecialAluno } from "pages/DietaEspecial/DashboardDietaEspecialPage";
import { AlteracaoUEPage } from "pages/Escola/DietaEspecial/AlteracaoUEPage";
import { DietaEspecialEscolaPage } from "pages/Escola/DietaEspecial/DietaEspecialEscolaPage";
import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasDietaEspecial: Array<RotaInterface> = [
  {
    path: `/${constants.ALUNO}/${constants.DIETA_ESPECIAL}`,
    component: DietaEspecialAluno,
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
