import React from "react";

export const JustificativaAnalise = ({ homologacao, logAnaliseSensorial }) => {
  return (
    <div className="row">
      <div className="col-12">
        <label className="col-form-label ">Protocolo Análise Sensorial</label>
      </div>
      <div className="col-4">
        <p
          className="justificativa-ficha-produto"
          dangerouslySetInnerHTML={{
            __html: homologacao.protocolo_analise_sensorial,
          }}
        />
      </div>
      <div className="col-12">
        <label className="col-form-label ">
          Solicitação de análise sensorial
        </label>
      </div>
      {logAnaliseSensorial.map((log, logIndice) => {
        return (
          <div className="col-12" key={logIndice}>
            <p
              className="justificativa-ficha-produto no-margin"
              dangerouslySetInnerHTML={{
                __html: log.justificativa,
              }}
            />
          </div>
        );
      })}
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default JustificativaAnalise;
