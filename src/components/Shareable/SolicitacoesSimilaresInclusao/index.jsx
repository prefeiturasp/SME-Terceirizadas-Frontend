import React from "react";

import { ehEscolaTipoCEI, ehEscolaTipoCEMEI } from "../../../helpers/utilities";

import { SolicitacoesSimilaresInclusaoNormal } from "./Normal";
import { SolicitacoesSimilaresInclusaoCEI } from "./CEI";
import { SolicitacoesSimilaresInclusaoCEMEI } from "./CEMEI";

export const SolicitacoesSimilaresInclusao = ({ ...props }) => {
  const { solicitacao, index } = props;

  if (ehEscolaTipoCEI(solicitacao.escola)) {
    return (
      <SolicitacoesSimilaresInclusaoCEI
        solicitacao={solicitacao}
        index={index}
      />
    );
  } else if (ehEscolaTipoCEMEI(solicitacao.escola)) {
    return (
      <SolicitacoesSimilaresInclusaoCEMEI
        solicitacao={solicitacao}
        index={index}
      />
    );
  }
  return (
    <SolicitacoesSimilaresInclusaoNormal
      solicitacao={solicitacao}
      index={index}
    />
  );
};
