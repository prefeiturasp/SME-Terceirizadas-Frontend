import { deParaStatusAltCronograma } from "components/screens/helper";
import { usuarioEhEmpresaFornecedor, formataMilhar } from "helpers/utilities";
import React from "react";
import "./styles.scss";

export default ({
  cronograma,
  esconderInformacoesAdicionais,
  solicitacaoAlteracaoCronograma,
}) => {
  return (
    <>
      <p className="head-green mt-4 mb-4">Dados Gerais</p>
      {solicitacaoAlteracaoCronograma ? (
        <div className="row detalhar-head">
          <div className="col-3">
            <p>
              <b>Data da Solicitação:</b>
            </p>
            <p className="head-green">
              {solicitacaoAlteracaoCronograma.criado_em.split(" ")[0]}
            </p>
          </div>
          <div className="col-3">
            <p>
              <b>Nº da Solicitação:</b>
            </p>
            <p className="head-green">
              {solicitacaoAlteracaoCronograma.numero_solicitacao}
            </p>
          </div>
          <div className="col-3">
            <p>
              <b>Nº do Cronograma:</b>
            </p>
            <p className="head-green">{cronograma.numero}</p>
          </div>
          <div className="col-3">
            <p>
              <b>Status:</b>
            </p>
            <p className="head-green">
              {usuarioEhEmpresaFornecedor()
                ? deParaStatusAltCronograma(
                    solicitacaoAlteracaoCronograma.status
                  )
                : solicitacaoAlteracaoCronograma.status}
            </p>
          </div>
        </div>
      ) : (
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
      )}
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
          <p className="head-green">
            {solicitacaoAlteracaoCronograma
              ? "Dados do Produto"
              : "Dados do produto e datas das entregas"}
          </p>
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
                <b>{formataMilhar(cronograma.qtd_total_programada)}</b>
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
                <b>{cronograma.tipo_embalagem?.nome}</b>
              </p>
            </div>
          </div>

          <hr />

          <div className="head-green mt-4">Cronograma Programado</div>
          <table className="table mt-3 mb-4 tabela-dados-cronograma">
            <thead className="head-crono">
              <th className="borda-crono">N° do Empenho</th>
              <th className="borda-crono">Etapa</th>
              <th className="borda-crono">Parte</th>
              <th className="borda-crono">Data Programada</th>
              <th className="borda-crono">Quantidade</th>
              <th className="borda-crono">Total de Embalagens</th>
            </thead>
            <tbody>
              {(() => {
                let etapas = solicitacaoAlteracaoCronograma
                  ? solicitacaoAlteracaoCronograma.etapas_antigas
                  : cronograma.etapas;
                return etapas.map((etapa, key) => {
                  return (
                    <tr key={key}>
                      <td className="borda-crono">{etapa.numero_empenho}</td>
                      <td className="borda-crono">{etapa.etapa}</td>
                      <td className="borda-crono">{etapa.parte}</td>
                      <td className="borda-crono">{etapa.data_programada}</td>
                      <td className="borda-crono">
                        {formataMilhar(etapa.quantidade)}
                      </td>
                      <td className="borda-crono">{etapa.total_embalagens}</td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p className="head-green">
            <strong>Dados do Produto e Datas das Entregas</strong>
          </p>
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
                      <td className="borda-crono">
                        {formataMilhar(etapa.quantidade)}
                      </td>
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
