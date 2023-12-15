import React from "react";
import { Collapse } from "react-collapse";

import "./style.scss";

import { InclusoesCEI } from "./InclusoesCEI";

export const SolicitacoesSimilaresInclusaoCEI = ({ ...props }) => {
  const { solicitacao, index } = props;

  const renderDataSolicitacao = (solicitacao) => {
    if (solicitacao.data_inicial && solicitacao.data_final) {
      return (
        <>
          <div className="col-2">
            <p>DE:</p>
            <p>
              <b>{solicitacao.data_inicial}</b>
            </p>
          </div>
          <div className="col-2">
            <p>ATÉ:</p>
            <p>
              <b>{solicitacao.data_final}</b>
            </p>
          </div>
        </>
      );
    }
    return (
      <div className="col-4">
        <p>Dia(s) de inclusão:</p>
        <p>
          {solicitacao.dias_motivos_da_inclusao_cei &&
            solicitacao.dias_motivos_da_inclusao_cei.map((inclusao, index) => (
              <b className="mr-4" key={index}>
                {inclusao.data}
              </b>
            ))}
        </p>
      </div>
    );
  };

  return (
    <Collapse isOpened={solicitacao.collapsed} key={index}>
      <tr className="row solicitacao-similar-info">
        <td className="col-12 remove-padding">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-4">
                <p>Solicitação Número:</p>
                <p>
                  <b>{`#${solicitacao.id_externo}`}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Data da Inclusão:</p>
                <p>
                  <b>
                    {solicitacao.logs &&
                      solicitacao.logs.length > 0 &&
                      solicitacao.logs[0].criado_em.split(" ")[0]}
                  </b>
                </p>
              </div>
              <div className="col-4">
                <p>Status da Solicitação:</p>
                <p>
                  <b>
                    {solicitacao.logs &&
                      solicitacao.logs.length > 0 &&
                      solicitacao.logs[solicitacao.logs.length - 1]
                        .status_evento_explicacao}
                  </b>
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Motivo:</p>
                <p>
                  <b>
                    {solicitacao.motivo?.nome ||
                      solicitacao.dias_motivos_da_inclusao_cei[0].motivo.nome}
                  </b>
                </p>
              </div>
              {renderDataSolicitacao(solicitacao)}
            </div>
            <InclusoesCEI inclusaoDeAlimentacao={solicitacao} />
          </div>
        </td>
      </tr>
    </Collapse>
  );
};
