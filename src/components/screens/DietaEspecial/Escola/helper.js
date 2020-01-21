export const formatarSolicitacoesVigentes = solicitacoes => {
  solicitacoes.forEach(solicitacao => {
    solicitacao.active = false;
  });
  return solicitacoes;
};
