import { ehEscolaTipoCEMEI } from "../../../../../../helpers/utilities";

export const ehEmeiDaCemei = (
  escolaInstituicao,
  periodosEscolaCemeiComAlunosEmei,
  nomeGrupo
) => {
  return (
    ehEscolaTipoCEMEI(escolaInstituicao) &&
    periodosEscolaCemeiComAlunosEmei.includes(nomeGrupo)
  );
};
