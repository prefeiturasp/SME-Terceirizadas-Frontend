import React, { useState } from "react";

export const KitLancheAvulsaCEMEIBody = ({ ...props }) => {
  const { solicitacao, item, index, filtros } = props;
  const logAutorizacao = solicitacao.logs.find(
    log => log.status_evento_explicacao === "CODAE autorizou"
  );
  const [showDetail, setShowDetail] = useState(false);

  const total_CEI = solicitacao.solicitacao_cei
    ? solicitacao.solicitacao_cei.faixas_quantidades.reduce(function(acc, v) {
        return acc + (v.quantidade || v.quantidade_alunos);
      }, 0)
    : 0;
  const total_EMEI = solicitacao.solicitacao_emei
    ? solicitacao.solicitacao_emei.quantidade_alunos
    : 0;

  const total_matriculados_CEI = solicitacao.solicitacao_cei
    ? solicitacao.solicitacao_cei.faixas_quantidades.reduce(function(acc, v) {
        return acc + v.matriculados_quando_criado || 0;
      }, 0)
    : 0;

  const total_matriculados_EMEI = solicitacao.solicitacao_emei
    ? solicitacao.solicitacao_emei.matriculados_quando_criado
    : 0;
  const numeroKitsCEI =
    solicitacao.solicitacao_cei && solicitacao.solicitacao_cei.kits
      ? solicitacao.solicitacao_cei.kits.length
      : 0;

  const numeroKitsEMEI =
    solicitacao.solicitacao_emei && solicitacao.solicitacao_emei.kits
      ? solicitacao.solicitacao_emei.kits.length
      : 0;
  const numero_total_kits =
    (numeroKitsCEI + numeroKitsEMEI) * (total_CEI + total_EMEI);

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
                <p>Local do Passeio:</p>
                <p>
                  <b>{solicitacao.local}</b>
                </p>
              </div>
              <div className="col-4">
                <p>No Total de Kits:</p>
                <p>
                  <b>{numero_total_kits}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Data da Autorização:</p>
                <p>
                  <b>{logAutorizacao && logAutorizacao.criado_em}</b>
                </p>
              </div>
            </div>
            {solicitacao.solicitacao_cei ? (
              <div className="row mt-3">
                <div className="col-12">
                  <label className="label-periodo-cei-cemei">Alunos CEI</label>
                </div>
                <div className="container-fluid">
                  <div className="row mt-3">
                    <div className="col-12">
                      <p>
                        Número de alunos:<b> {total_CEI}</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        Tempo previsto de passeio:
                        <b>
                          {" "}
                          {solicitacao.solicitacao_cei.tempo_passeio_explicacao}
                        </b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        Opção desejada:{" "}
                        <b>
                          {solicitacao.solicitacao_cei.kits
                            .map(kit => kit.nome)
                            .join(", ")}
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <table className="table table-bordered table-items">
                        <thead>
                          <tr className="table-head-items">
                            <th className="col-8">Faixa Etária</th>
                            <th className="col-2 text-center">
                              Alunos Matriculados
                            </th>
                            <th className="col-2 text-center">Quantidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {solicitacao.solicitacao_cei.faixas_quantidades.map(
                            (faixa, idxFaixa) => {
                              return (
                                <tr className="table-body-items" key={idxFaixa}>
                                  <td>{faixa.faixa_etaria.__str__}</td>
                                  <td className="text-center">
                                    {faixa.matriculados_quando_criado}
                                  </td>
                                  <td className="text-center">
                                    {faixa.quantidade_alunos}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                          <tr className="table-head-items">
                            <td>Total</td>
                            <td className="text-center">
                              {total_matriculados_CEI}
                            </td>
                            <td className="text-center">{total_CEI}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {solicitacao.solicitacao_emei ? (
              <div className="row mt-3">
                <div className="col-12">
                  <label className="label-periodo-cei-cemei">Alunos EMEI</label>
                </div>
                <div className="col-12">
                  <div className="container-fluid">
                    <div className="row mt-3">
                      <div className="col-12">
                        <p>
                          Número de alunos:
                          <b>
                            {" "}
                            {solicitacao.solicitacao_emei.quantidade_alunos}
                          </b>
                        </p>
                      </div>
                      <div className="col-6">
                        <p>
                          Tempo previsto de passeio:
                          <b>
                            {" "}
                            {
                              solicitacao.solicitacao_emei
                                .tempo_passeio_explicacao
                            }
                          </b>
                        </p>
                      </div>
                      <div className="col-6">
                        <p>
                          Opção desejada:{" "}
                          <b>
                            {solicitacao.solicitacao_emei.kits
                              .map(kit => kit.nome)
                              .join(", ")}
                          </b>
                        </p>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <table className="table table-bordered table-items">
                          <thead>
                            <tr className="table-head-items">
                              <th className="col-8">
                                Alunos Matriculados: {total_matriculados_EMEI}
                              </th>
                              <th className="col-4 text-center">
                                Quantidade: {total_EMEI}
                              </th>
                            </tr>
                          </thead>
                          <tbody />
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {solicitacao.observacao && solicitacao.observacao !== "<p></p>" && (
              <div className="row">
                <div className="col-12">
                  <p>Observação:</p>
                  <b>
                    <p
                      className="observacao-negrito"
                      dangerouslySetInnerHTML={{
                        __html: solicitacao.observacao
                      }}
                    />
                  </b>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    )
  ];
};
