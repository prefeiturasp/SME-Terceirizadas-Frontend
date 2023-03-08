import React, { useState, useEffect, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";

export const InclusaoCEMEIBody = ({ ...props }) => {
  const { solicitacao, item, index, filtros, labelData } = props;
  const [vinculosAlimentacao, setVinculosAlimentacao] = useState(undefined);
  const [showDetail, setShowDetail] = useState(false);
  const log = solicitacao.logs[solicitacao.logs.length - 1];

  const unique = arr => [...new Set(arr)];

  const nomes_periodos = unique(
    solicitacao.quantidade_alunos_cei_da_inclusao_cemei
      .concat(solicitacao.quantidade_alunos_emei_da_inclusao_cemei)
      .map(qa => qa.periodo_escolar.nome)
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
      <td className="text-center">{solicitacao.datas}</td>
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
              <div className="col-3">
                <p>ID da Solicitação:</p>
              </div>
              <div className="col-3">
                <p>Motivo:</p>
              </div>
              <div className="col-3">
                <p>Dia(s) de Inclusão:</p>
              </div>
              <div className="col-3">
                <p>{labelData}</p>
              </div>
            </div>
            {solicitacao.dias_motivos_da_inclusao_cemei.map((inclusao, idx) => {
              return (
                <div className="row mt-3" key={idx}>
                  {idx === 0 ? (
                    <div className="col-3">
                      <p>
                        <b># {solicitacao.id_externo}</b>
                      </p>
                    </div>
                  ) : (
                    <div className="col-3" />
                  )}
                  <div className="col-3">
                    <p>
                      <b>{inclusao.motivo.nome}</b>
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <b>{inclusao.data}</b>
                    </p>
                  </div>
                  {idx === 0 ? (
                    <div className="col-3">
                      <p>
                        <b>{log && log.criado_em.split(" ")[0]}</b>
                      </p>
                    </div>
                  ) : (
                    <div className="col-3" />
                  )}
                </div>
              );
            })}
            {vinculosAlimentacao &&
              nomes_periodos.map((periodo, idx) => {
                const vinculosCEI = vinculosAlimentacao.find(
                  vinc =>
                    vinc.periodo_escolar.nome === periodo &&
                    vinc.tipo_unidade_escolar.iniciais === "CEI DIRET"
                );
                const tiposAlimentacaoCEI = vinculosCEI.tipos_alimentacao
                  .map(ta => ta.nome)
                  .join(", ");
                const vinculosEMEI = vinculosAlimentacao.find(
                  vinc =>
                    vinc.periodo_escolar.nome === periodo &&
                    vinc.tipo_unidade_escolar.iniciais === "EMEI"
                );
                const tiposAlimentacaoEMEI = vinculosEMEI.tipos_alimentacao
                  .map(ta => ta.nome)
                  .join(", ");
                const faixasCEI = solicitacao.quantidade_alunos_cei_da_inclusao_cemei.filter(
                  qa => qa.periodo_escolar.nome === periodo
                );
                const faixasEMEI = solicitacao.quantidade_alunos_emei_da_inclusao_cemei.filter(
                  qa => qa.periodo_escolar.nome === periodo
                );
                const total = faixasCEI.reduce(function(acc, v) {
                  return acc + (v.quantidade || v.quantidade_alunos);
                }, 0);
                const total_matriculados = faixasCEI.reduce(function(acc, v) {
                  return acc + (v.matriculados_quando_criado || 0);
                }, 0);
                return (
                  <Fragment key={idx}>
                    <div className="row">
                      <div className="col-12">
                        <label className="label-periodo-cei-cemei">
                          {periodo}
                        </label>
                      </div>
                    </div>
                    {faixasCEI.length ? (
                      <div className="row">
                        <div className="col-12">
                          <div className="container-fluid pr-0">
                            <label className="label-periodo-cei-cemei">
                              Alunos CEI
                            </label>
                          </div>
                        </div>
                        <div className="col-12 mt-3">
                          <div className=" container-fluid pr-0">
                            <p>
                              Tipos de Inclusão de Alimentação:{" "}
                              <b>{tiposAlimentacaoCEI}</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className=" container-fluid pr-0">
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
                                {faixasCEI.map((faixa, idxFaixa) => {
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
                    ) : (
                      <></>
                    )}
                    {faixasEMEI.length ? (
                      <div className="row">
                        <div className="col-12">
                          <div className="container-fluid pr-0">
                            <label className="label-periodo-cei-cemei">
                              Alunos EMEI
                            </label>
                          </div>
                        </div>
                        <div className="col-12 mt-3">
                          <div className=" container-fluid pr-0">
                            <p>
                              Tipos de Inclusão de Alimentação:{" "}
                              <b>{tiposAlimentacaoEMEI}</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className=" container-fluid pr-0">
                            <table className="table table-bordered table-items">
                              <thead>
                                {faixasEMEI.map((faixa, idxFaixa) => {
                                  return (
                                    <tr
                                      className="table-head-items"
                                      key={idxFaixa}
                                    >
                                      <th className="col-8">
                                        Alunos Matriculados:{" "}
                                        {faixa.matriculados_quando_criado}
                                      </th>
                                      <th className="col-4 text-center">
                                        Quantidade: {faixa.quantidade_alunos}
                                      </th>
                                    </tr>
                                  );
                                })}
                              </thead>
                              <tbody />
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Fragment>
                );
              })}
          </div>
        </td>
      </tr>
    )
  ];
};
