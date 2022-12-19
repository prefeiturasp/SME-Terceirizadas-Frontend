import { WEEK } from "configs/constants";
import React, { useState } from "react";

export const InclusaoContiniuaBody = ({ ...props }) => {
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
                <p>Data da Autorização:</p>
                <p>
                  <b>{logAutorizacao && logAutorizacao.criado_em}</b>
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <p>Repetir:</p>
              </div>
              <div className="col-3">
                <p>Período:</p>
              </div>
              <div className="col-3">
                <p>Tipos de Alimentação:</p>
              </div>
              <div className="col-3">
                <p>No de Alunos:</p>
              </div>
            </div>
            {solicitacao.quantidades_periodo.map((quantidade_periodo, idx) => {
              const tiposAlimentacao = quantidade_periodo.tipos_alimentacao
                .map(tipo_alimentacao => tipo_alimentacao.nome)
                .join(", ");
              return (
                <div className="row" key={idx}>
                  <div className="col-3 weekly">
                    {WEEK.map((day, key) => {
                      return (
                        <span
                          key={key}
                          className={
                            quantidade_periodo.dias_semana
                              .map(String)
                              .includes(day.value)
                              ? "week-circle-clicked green"
                              : "week-circle"
                          }
                          data-cy={`dia-${key}`}
                          value={day.value}
                        >
                          {day.label}
                        </span>
                      );
                    })}
                  </div>
                  <div className="col-3">
                    <p>
                      <b>{quantidade_periodo.periodo_escolar.nome}</b>
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <b>{tiposAlimentacao}</b>
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <b>{quantidade_periodo.numero_alunos}</b>
                    </p>
                  </div>
                  {quantidade_periodo.observacao !== "<p></p>" && (
                    <div className="col-12">
                      <p>Observação:</p>
                      <b>
                        <p
                          className="value"
                          dangerouslySetInnerHTML={{
                            __html: quantidade_periodo.observacao
                          }}
                        />
                      </b>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </td>
      </tr>
    )
  ];
};
