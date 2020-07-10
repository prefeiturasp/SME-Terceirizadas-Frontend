import { usuarioEhEscola } from "../../../../helpers/utilities";

export const formatarSolicitacoesVigentes = solicitacoes => {
  solicitacoes.forEach(solicitacao => {
    solicitacao.active = false;
  });
  return solicitacoes;
};

export const exibirParteInativacao = (solicitacao, uuid) => {
  return (
    solicitacao.ativo &&
    uuid &&
    usuarioEhEscola() &&
    ["CODAE_AUTORIZADO", "TERCEIRIZADA_TOMOU_CIENCIA"].includes(
      solicitacao.status_solicitacao
    )
  );
};
