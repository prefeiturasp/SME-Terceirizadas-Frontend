import React from "react";

import { ehEscolaTipoCEI, ehEscolaTipoCEMEI } from "../../../helpers/utilities";

import { SolicitacoesSimilaresInclusaoNormal } from "./Normal";
import { SolicitacoesSimilaresInclusaoCEI } from "./CEI";

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
    return;
  }
  return (
    <SolicitacoesSimilaresInclusaoNormal
      solicitacao={solicitacao}
      index={index}
    />
  );
};
