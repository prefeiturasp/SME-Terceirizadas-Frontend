import React from "react";

export const CamposEditalContrato = ({ editalContrato }) => {
  return (
    <>
      <div className="row">
        <div className="col-2 title">Objeto resumido:</div>
        <div className="col-10">{editalContrato.objeto}</div>
      </div>
      {editalContrato.contratos.map((contrato, indexContrato) => {
        return (
          <div key={indexContrato}>
            <div className="row pt-3">
              <div className="col-12">
                <div className="label">
                  <span className="com-linha">Contratos Relacionados</span>
                </div>
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-6 d-flex">
                <div className="title pe-2">Contrato nº:</div>
                {contrato.numero}
              </div>
              <div className="col-6">
                {contrato.vigencias.map((vigencia, indexVigencia) => {
                  return (
                    <div key={indexVigencia}>
                      {indexVigencia === 0 && (
                        <span className="title pe-2">Vigência:</span>
                      )}
                      <span
                        className={`${
                          indexVigencia === contrato.vigencias.length - 1
                            ? vigencia.status
                            : ""
                        }`}
                        style={{
                          paddingLeft: `${indexVigencia > 0 ? "4.7em" : 0}`,
                        }}
                      >
                        {vigencia.data_inicial} até {vigencia.data_final}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-6 d-flex">
                <div className="title pe-2">
                  Processo administrativo do contrato:
                </div>
                {contrato.processo}
              </div>
              <div className="col-6 d-flex">
                <div className="title pe-2">Data da proposta:</div>
                {contrato.data_proposta}
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-6">
                <div className="title">Lotes:</div>
                {contrato.lotes.map((lote) => lote.nome).join(" | ")}
              </div>
              <div className="col-6">
                <div className="title">DREs:</div>
                {contrato.diretorias_regionais.map((dre, indexDRE) => {
                  return <div key={indexDRE}>{dre.nome}</div>;
                })}
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-12">
                <div className="title">Empresa:</div>
                {contrato.terceirizada.nome_fantasia}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
