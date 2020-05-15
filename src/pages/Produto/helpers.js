import {
  TIPO_PERFIL,
  ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS
} from "../../constants/shared";

export const escolheStatusPendenteHomologacao = () => {
  const perfil = localStorage.getItem("tipo_perfil");
  if (perfil === TIPO_PERFIL.GESTAO_PRODUTO) {
    return [
      ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PENDENTE_HOMOLOGACAO,
      ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_AUTORIZOU_RECLAMACAO
    ];
  }
  return ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PENDENTE_HOMOLOGACAO;
};
