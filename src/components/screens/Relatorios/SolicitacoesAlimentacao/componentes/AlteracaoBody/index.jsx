import React, { useState } from "react";

export const AlteracaoBody = ({ ...props }) => {
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
                <p>Tipo de Alteração:</p>
                <p>
                  <b>{solicitacao.motivo.nome}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Data(s) do Evento:</p>
                <p>
                  <b>
                    {solicitacao.data_inicial}{" "}
                    {solicitacao.data_final &&
                    solicitacao.data_inicial !== solicitacao.data_final
                      ? `- ${solicitacao.data_final}`
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
              <div className="col-4">
                <p>Período:</p>
              </div>
              <div className="col-4">
                <p>Alteração de Alimentação De:</p>
              </div>
              <div className="col-4">
                <p>Alteração de Alimentação Para:</p>
              </div>
            </div>

            {solicitacao.substituicoes.map((substituicao, idx) => {
              return (
                <div className="row" key={idx}>
                  <div className="col-4">
                    <p>
                      <b>{substituicao.periodo_escolar.nome}</b>
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <b>
                        {substituicao.tipos_alimentacao_de
                          .map(ta => ta.nome)
                          .join(", ")}
                      </b>
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <b>
                        {substituicao.tipos_alimentacao_para
                          .map(ta => ta.nome)
                          .join(", ")}
                      </b>
                    </p>
                  </div>
                </div>
              );
            })}
            {solicitacao.observacao !== "<p></p>" && (
              <div className="row mt-3">
                <div className="col-12">
                  <p>Observação:</p>
                  <p
                    className="observacao-negrito"
                    dangerouslySetInnerHTML={{
                      __html: solicitacao.observacao
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    )
  ];
};
