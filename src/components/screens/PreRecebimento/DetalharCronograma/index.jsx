import React, { useState } from "react";
import { useEffect } from "react";
import { Spin } from "antd";
import { getDetalharCronograma } from "services/cronograma.service";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";

export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get("uuid");
  const [cronograma, setCronograma] = useState(null);

  const getDetalhes = async () => {
    if (uuid) {
      const responseCronograma = await getDetalharCronograma(uuid);
      if (responseCronograma.status === HTTP_STATUS.OK) {
        setCronograma(responseCronograma.data);
      }
    }
  };

  const converte_tipo_carga = tipo => {
    if (tipo === "PALETIZADA") {
      return "Paletizada";
    } else if (tipo === "ESTIVADA_BATIDA") {
      return "Estivada/Batida";
    }
  };

  useEffect(() => {
    getDetalhes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin tip="Carregando..." spinning={!cronograma}>
      <div className="card mt-3">
        <div className="card-body">
          {cronograma && (
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
                  <p className="head-green">{cronograma.contrato}</p>
                </div>
                <div className="col-4">
                  <p>
                    <b>Nº do Processo SEI - Contratos:</b>
                  </p>
                  <p className="head-green">{cronograma.processo_sei}</p>
                </div>
              </div>
              <hr />
              <div>
                <p>Empresa:</p>
                <p>
                  <b>{cronograma.nome_empresa}</b>
                </p>
              </div>
              <hr />

              <p className="head-green">
                Dados do produto e datas das entregas
              </p>
              <br />
              <div className="row">
                <div className="col-4">
                  <p>Produto:</p>
                  <p className="mb-3">
                    <b>{cronograma.nome_produto}</b>
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
                    <b>{cronograma.unidade_medida}</b>
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
              <div>
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
                            <td className="borda-crono">
                              {etapa.numero_empenho}
                            </td>
                            <td className="borda-crono">{etapa.etapa}</td>
                            <td className="borda-crono">{etapa.parte}</td>
                            <td className="borda-crono">
                              {etapa.data_programada}
                            </td>
                            <td className="borda-crono">
                              {etapa.quantidade} {cronograma.unidade_medida}
                            </td>
                            <td className="borda-crono">
                              {etapa.total_embalagens}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <hr className="hr-detalhar" />
              <p className="head-green mt-3">Dados do Recebimento</p>
              <br />
              {cronograma.programacoes_de_recebimento.length > 0 &&
                cronograma.programacoes_de_recebimento
                  .reverse()
                  .map((programacao, key) => {
                    return (
                      <>
                        <div key={key} className="row mb-3">
                          <div className="col-3">
                            <p>Data Programada:</p>
                            <p>
                              <b>{programacao.data_programada}</b>
                            </p>
                          </div>
                          <div className="col-3">
                            <p>Tipo de Carga:</p>
                            <p>
                              <b>
                                {converte_tipo_carga(programacao.tipo_carga)}
                              </b>
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
