import React, { useState, useEffect, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";

export const InclusaoCEIBody = ({ ...props }) => {
  const { solicitacao, item, index, filtros, labelData } = props;
  const [vinculosAlimentacao, setVinculosAlimentacao] = useState(undefined);
  const log = solicitacao.logs[solicitacao.logs.length - 1];
  const [showDetail, setShowDetail] = useState(false);

  const unique = arr => [...new Set(arr)];

  const nomes_periodos = solicitacao.periodo_escolar
    ? [solicitacao.periodo_escolar.nome]
    : unique(
        solicitacao.quantidade_alunos_por_faixas_etarias.map(
          qa => qa.periodo.nome
        )
      );

  const getVinculosAlimentacao = async () => {
    const escola_uuid = solicitacao.escola.uuid;
    const response = await getVinculosTipoAlimentacaoPorEscola(escola_uuid);
    if (response.status === HTTP_STATUS.OK) {
      setVinculosAlimentacao(response.data.results);
    }
  };

  useEffect(() => {
    getVinculosAlimentacao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    <tr className="table-body-items" key={index}>
      <td>
        {item.dre_iniciais} - {item.lote_nome}
      </td>
      {filtros.status && filtros.status === "RECEBIDAS" ? (
        <td>{item.terceirizada_nome}</td>
      ) : (
        <td>{item.escola_nome}</td>
      )}
      <td>{item.desc_doc}</td>
      <td className="text-center">
        {item.data_evento}{" "}
        {item.data_evento_fim && item.data_evento !== item.data_evento_fim
          ? `- ${item.data_evento_fim}`
          : ""}
      </td>
      <td className="text-center">
        {item.numero_alunos !== 0 ? item.numero_alunos : "-"}
      </td>
      <td className="text-center">
        <i
          className={`fas fa-${showDetail ? "angle-up" : "angle-down"}`}
          onClick={() => setShowDetail(!showDetail)}
        />
      </td>
    </tr>,
    showDetail && (
      <tr key={item.uuid}>
        <td colSpan={6}>
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-4">
                <p>Motivo:</p>
                <p>
                  <b>{solicitacao.motivo.nome}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Dia(s) de Inclusão:</p>
                <p>
                  <b>
                    {item.data_evento}{" "}
                    {item.data_evento_fim &&
                    item.data_evento !== item.data_evento_fim
                      ? `- ${item.data_evento_fim}`
                      : ""}
                  </b>
                </p>
              </div>
              <div className="col-4">
                <p>{labelData}</p>
                <p>
                  <b>{log && log.criado_em.split(" ")[0]}</b>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label className="label-periodo-cei-cemei">INTEGRAL</label>
              </div>
            </div>
            {vinculosAlimentacao &&
              nomes_periodos.map((periodo, idx) => {
                let faixas_etarias = [];
                if (solicitacao.periodo_escolar) {
                  faixas_etarias =
                    solicitacao.quantidade_alunos_por_faixas_etarias;
                } else {
                  faixas_etarias = solicitacao.quantidade_alunos_por_faixas_etarias.filter(
                    qpf => qpf.periodo.nome === periodo
                  );
                }
                const alimentosFormatados = vinculosAlimentacao
                  .find(v => v.periodo_escolar.nome === periodo)
                  .tipos_alimentacao.map(ta => ta.nome)
                  .join(", ");
                const total = faixas_etarias.reduce(function(acc, v) {
                  return acc + (v.quantidade || v.quantidade_alunos);
                }, 0);
                const total_matriculados = faixas_etarias.reduce(function(
                  acc,
                  v
                ) {
                  return acc + (v.matriculados_quando_criado || 0);
                },
                0);
                return (
                  <Fragment key={idx}>
                    <div className="row">
                      <div className="col-12">
                        <div className="container-fluid pr-0">
                          <label className="label-periodo-cei-cemei">
                            {periodo}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <div className="container-fluid pr-0">
                          <p>
                            Tipos de Inclusão de Alimentação:{" "}
                            <b>{alimentosFormatados}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="container-fluid pr-0">
                          <table className="table table-bordered table-items">
                            <thead>
                              <tr className="table-head-items">
                                <th className="col-8">Faixa Etária</th>
                                <th className="col-2 text-center">
                                  Alunos Matriculados
                                </th>
                                <th className="col-2 text-center">
                                  Quantidade
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {faixas_etarias.map((faixa, idxFaixa) => {
                                return (
                                  <tr
                                    className="table-body-items"
                                    key={idxFaixa}
                                  >
                                    <td>{faixa.faixa_etaria.__str__}</td>
                                    <td className="text-center">
                                      {faixa.matriculados_quando_criado}
                                    </td>
                                    <td className="text-center">
                                      {faixa.quantidade_alunos}
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr className="table-head-items">
                                <td>Total</td>
                                <td className="text-center">
                                  {total_matriculados}
                                </td>
                                <td className="text-center">{total}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
          </div>
        </td>
      </tr>
    )
  ];
};
