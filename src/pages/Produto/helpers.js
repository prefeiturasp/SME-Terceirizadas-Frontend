import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "../../constants/shared";
import {
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto
} from "helpers/utilities";

export const escolheStatusPendenteHomologacao = () => {
  if (usuarioEhCODAEGestaoProduto()) {
    return [
      ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PENDENTE_HOMOLOGACAO,
      ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_AUTORIZOU_RECLAMACAO
    ];
  }
  return ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PENDENTE_HOMOLOGACAO;
};

export const escolheStatusAguardandoAnaliseReclamacao = () => {
  if (usuarioEhTerceirizada()) {
    return ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONADO;
  }
  return ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PEDIU_ANALISE_RECLAMACAO;
};
