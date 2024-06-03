import { usuarioEhRecebimento } from "helpers/utilities";

import CadastroFichaRecebimentoPage from "pages/Recebimento/FichaRecebimento/CadastroFichaRecebimentoPage";
import FichaRecebimentoPage from "pages/Recebimento/FichaRecebimento/FichaRecebimentoPage";
import AtribuirQuestoesPage from "pages/Recebimento/QuestoesPorProduto/AtribuirQuestoesPage";
import CopiarAtribuicaoQuestoesPage from "pages/Recebimento/QuestoesPorProduto/CopiarAtribuicaoQuestoesPage";
import EditarAtribuicaoQuestoesPage from "pages/Recebimento/QuestoesPorProduto/EditarAtribuicaoQuestoesPage";
import QuestoesPorProdutoPage from "pages/Recebimento/QuestoesPorProduto/QuestoesPorProdutoPage";

import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasRecebimento: Array<RotaInterface> = [
  {
    path: `/${constants.RECEBIMENTO}/${constants.QUESTOES_POR_PRODUTO}`,
    component: QuestoesPorProdutoPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.ATRIBUIR_QUESTOES_CONFERENCIA}`,
    component: AtribuirQuestoesPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.EDITAR_ATRIBUICAO_QUESTOES_CONFERENCIA}`,
    component: EditarAtribuicaoQuestoesPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.COPIAR_ATRIBUICAO_QUESTOES_CONFERENCIA}`,
    component: CopiarAtribuicaoQuestoesPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.FICHA_RECEBIMENTO}`,
    component: FichaRecebimentoPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
  {
    path: `/${constants.RECEBIMENTO}/${constants.CADASTRO_FICHA_RECEBIMENTO}`,
    component: CadastroFichaRecebimentoPage,
    tipoUsuario: usuarioEhRecebimento(),
  },
];
