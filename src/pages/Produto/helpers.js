import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "../../constants/shared";
import { usuarioEhTerceirizada } from "helpers/utilities";

export const escolheStatusPendenteHomologacao = () => {
  return ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PENDENTE_HOMOLOGACAO;
};

export const escolheStatusAguardandoAnaliseReclamacao = () => {
  if (usuarioEhTerceirizada()) {
    return ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONADO;
  }
  return ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PEDIU_ANALISE_RECLAMACAO;
};
