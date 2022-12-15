import React, { useState } from "react";

export const InversaoCardapioBody = ({ ...props }) => {
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
      <td className="text-center">{"-"}</td>
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
                <p>Substituição De:</p>
                <p>
                  <b>{solicitacao.data_de_inversao}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Substituição Para:</p>
                <p>
                  <b>{solicitacao.data_para_inversao}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Data da Autorização:</p>
                <p>
                  <b>
                    {logAutorizacao
                      ? logAutorizacao.criado_em
                      : "Não foi autorizada"}
                  </b>
                </p>
              </div>
            </div>
            {solicitacao.motivo && solicitacao.motivo !== "<p></p>" && (
              <div className="row">
                <div className="col-12">
                  <p>Motivo:</p>
                  <b>
                    <p
                      className="observacao-negrito"
                      dangerouslySetInnerHTML={{
                        __html: solicitacao.motivo
                      }}
                    />
                  </b>
                </div>
              </div>
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
