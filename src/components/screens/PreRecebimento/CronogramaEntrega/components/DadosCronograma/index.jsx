import React from "react";

export default ({ cronograma, esconderInformacoesAdicionais }) => {
  return (
    <>
      <div className="row detalhar-head">
        <div className="col-4">
          <p>
            <b>Nº do Cronograma:</b>
          </p>
          <p className="head-green">{cronograma.numero}</p>
        </div>
        <div className="col-4">
          <p>
            <b>Nº do Contrato:</b>
          </p>
          {cronograma.contrato && (
            <p className="head-green">{cronograma.contrato.numero}</p>
          )}
        </div>
        <div className="col-4">
          <p>
            <b>Nº do Processo SEI - Contratos:</b>
          </p>
          {cronograma.contrato && (
            <p className="head-green">{cronograma.contrato.processo}</p>
          )}
        </div>
      </div>
      <hr />
      {!esconderInformacoesAdicionais ? (
        <>
          <div>
            <p>Empresa:</p>
            <p>
              {cronograma.empresa && <b>{cronograma.empresa.nome_fantasia}</b>}
            </p>
          </div>
          <hr />
          <p className="head-green">Dados do produto e datas das entregas</p>
          <br />

          <div className="row">
            <div className="col-4">
              <p>Produto:</p>
              <p className="mb-3">
                {cronograma.produto && <b>{cronograma.produto.nome}</b>}
              </p>
            </div>
            <div className="col-4">
              <p>Quantidade Total Programada:</p>
              <p>
                <b>{cronograma.qtd_total_programada}</b>
              </p>
            </div>
            <div className="col-4">
              <p>Unidade de Medida:</p>
              <p>
                {cronograma.unidade_medida && (
                  <b>{cronograma.unidade_medida.nome}</b>
                )}
              </p>
            </div>
            <br />
            <div className="col-4 mt-3">
              <p>Armazém:</p>
              <p>
                <b>{cronograma.armazem.nome_fantasia}</b>
              </p>
            </div>
            <div className="col-4 mt-3">
              <p>Tipo de Embalagem:</p>
              <p>
                <b>{cronograma.tipo_embalagem}</b>
              </p>
            </div>
          </div>

          <table className="table mt-4 mb-3">
            <thead className="head-crono">
              <th className="borda-crono">N° do Empenho</th>
              <th className="borda-crono">Etapa</th>
              <th className="borda-crono">Parte</th>
              <th className="borda-crono">Data Programada</th>
              <th className="borda-crono">Quantidade</th>
              <th className="borda-crono">Total de Embalagens</th>
            </thead>
            <tbody>
              {cronograma.etapas.length > 0 &&
                cronograma.etapas.map((etapa, key) => {
                  return (
                    <tr key={key}>
                      <td className="borda-crono">{etapa.numero_empenho}</td>
                      <td className="borda-crono">{etapa.etapa}</td>
                      <td className="borda-crono">{etapa.parte}</td>
                      <td className="borda-crono">{etapa.data_programada}</td>
                      <td className="borda-crono">{etapa.quantidade}</td>
                      <td className="borda-crono">{etapa.total_embalagens}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <table className="table mt-4 mb-3">
            <thead className="head-crono">
              <th className="borda-crono">Fornecedor</th>
              <th className="borda-crono">Produto</th>
              <th className="borda-crono">Data</th>
              <th className="borda-crono">Etapa</th>
              <th className="borda-crono">Parte</th>
              <th className="borda-crono">Quantidade</th>
              <th className="borda-crono">Armazém</th>
              <th className="borda-crono">Status</th>
            </thead>
            <tbody>
              {cronograma.etapas.length > 0 &&
                cronograma.etapas.map((etapa, key) => {
                  return (
                    <tr key={key}>
                      <td className="borda-crono">
                        {cronograma.empresa && cronograma.empresa.nome_fantasia}
                      </td>
                      <td className="borda-crono">
                        {cronograma.produto && cronograma.produto.nome}
                      </td>
                      <td className="borda-crono">{etapa.data_programada}</td>
                      <td className="borda-crono">{etapa.etapa}</td>
                      <td className="borda-crono">{etapa.parte}</td>
                      <td className="borda-crono">{etapa.quantidade}</td>
                      <td className="borda-crono">
                        {cronograma.armazem && cronograma.armazem.nome_fantasia}
                      </td>
                      <td className="borda-crono">{cronograma.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
      <div />
    </>
  );
};
