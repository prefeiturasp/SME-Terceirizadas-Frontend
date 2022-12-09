import React, { useState } from "react";

export const InclusaoBody = ({ ...props }) => {
  const { solicitacao, item, index, filtros } = props;
  const logAutorizacao = solicitacao.logs.find(
    log => log.status_evento_explicacao === "CODAE autorizou"
  );
  const [showDetail, setShowDetail] = useState(false);

  return [
    <tr className="table-body-items" key={index}>
      <td>
        {item.dre_iniciais} - {item.lote_nome}
      </td>
      {filtros.status && filtros.status === "EM_ANDAMENTO" ? (
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
              </div>
              <div className="col-4">
                <p>Dia(s) de Inclusão:</p>
              </div>
              <div className="col-4">
                <p>Data da Autorização:</p>
              </div>
            </div>
            {solicitacao.inclusoes.map((inclusao, idx) => {
              return (
                <div className="row" key={idx}>
                  <div className="col-4">
                    <p>
                      <b>{inclusao.motivo.nome}</b>
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <b>{inclusao.data}</b>
                    </p>
                  </div>
                  {idx === 0 ? (
                    <div className="col-4">
                      <p>
                        <b>{logAutorizacao && logAutorizacao.criado_em}</b>
                      </p>
                    </div>
                  ) : (
                    <div className="col-4" />
                  )}
                </div>
              );
            })}
            <div className="row mt-3">
              <div className="col-4">
                <p>Período:</p>
              </div>
              <div className="col-4">
                <p>Tipos de Alimentação:</p>
              </div>
              <div className="col-4">
                <p>No de Alunos:</p>
              </div>
            </div>
            {solicitacao.quantidades_periodo.map((quantidade_periodo, idx) => {
              const tiposAlimentacao = quantidade_periodo.tipos_alimentacao
                .map(tipo_alimentacao => tipo_alimentacao.nome)
                .join(", ");
              return (
                <div className="row" key={idx}>
                  <div className="col-4">
                    <p>
                      <b>{quantidade_periodo.periodo_escolar.nome}</b>
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <b>{tiposAlimentacao}</b>
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <b>{quantidade_periodo.numero_alunos}</b>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </td>
      </tr>
    )
  ];
};
