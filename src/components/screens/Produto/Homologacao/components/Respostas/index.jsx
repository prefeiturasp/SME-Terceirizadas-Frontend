import React from "react";
import JustificativaAnalise from "./JustificativaAnalise";
import InformativoReclamacao from "components/Shareable/InformativoReclamacao";
import { MotivoCorrecaoHomologacao } from "./MotivoCorrecaoHomologacao";
import { MotivoHomologacaoRecusada } from "./MotivoHomologacaoRecusada";
import { MotivoCancelamento } from "./MotivoCancelamento";
import { MotivoSuspensao } from "./MotivoSuspensao";

export const Respostas = ({ homologacao, logAnaliseSensorial }) => {
  return (
    <>
      {homologacao.status === "CODAE_AUTORIZOU_RECLAMACAO" && (
        <InformativoReclamacao homologacao={homologacao} />
      )}
      {homologacao.status === "CODAE_SUSPENDEU" && (
        <MotivoSuspensao logs={homologacao.logs} />
      )}
      {homologacao.status === "CODAE_QUESTIONADO" && (
        <MotivoCorrecaoHomologacao logs={homologacao.logs} />
      )}
      {["CODAE_SUSPENDEU", "CODAE_AUTORIZOU_RECLAMACAO"].includes(
        homologacao.status
      ) && <MotivoHomologacaoRecusada logs={homologacao.logs} />}
      {homologacao.status ===
        "TERCEIRIZADA_CANCELOU_SOLICITACAO_HOMOLOGACAO" && (
        <MotivoCancelamento logs={homologacao.logs} />
      )}
      {logAnaliseSensorial.length > 0 && (
        <JustificativaAnalise
          homologacao={homologacao}
          logAnaliseSensorial={logAnaliseSensorial}
        />
      )}
    </>
  );
};
export default Respostas;
