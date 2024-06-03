import {
  usuarioEhCODAEGabinete,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhDRE,
  usuarioEhEmpresaTerceirizada,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhMedicao,
  usuarioEhNutricionistaSupervisao,
} from "helpers/utilities";
import { StatusSolicitacoesAutorizadasEscolaPage } from "pages/Escola/StatusSolicitacoes/StatusSolicitacoesAutorizadasEscolaPage";
import { StatusSolicitacoesCanceladasEscolaPage } from "pages/Escola/StatusSolicitacoes/StatusSolicitacoesCanceladasEscolaPage";
import { StatusSolicitacoesPendentesEscolaPage } from "pages/Escola/StatusSolicitacoes/StatusSolicitacoesPendentesEscolaPage";
import { StatusSolicitacoesRecusadasEscolaPage } from "pages/Escola/StatusSolicitacoes/StatusSolicitacoesRecusadasEscolaPage";
import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";
import { painelGestaoAlimentacao } from "./helpers";

export const rotasGestaoDeAlimentacao: Array<RotaInterface> = [
  {
    path: "/painel-gestao-alimentacao",
    component: painelGestaoAlimentacao(),
    tipoUsuario:
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhDRE() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_PENDENTES}`,
    component: StatusSolicitacoesPendentesEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_CANCELADAS}`,
    component: StatusSolicitacoesCanceladasEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
  {
    path: `/${constants.ESCOLA}/${constants.SOLICITACOES_NEGADAS}`,
    component: StatusSolicitacoesRecusadasEscolaPage,
    tipoUsuario:
      usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor(),
  },
];
