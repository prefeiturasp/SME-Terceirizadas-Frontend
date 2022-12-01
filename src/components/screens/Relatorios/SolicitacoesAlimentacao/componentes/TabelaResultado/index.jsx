import React from "react";

export const TabelaResultado = ({ ...props }) => {
  const { solicitacoes, filtros } = props;

  return solicitacoes.length ? (
    <div className="row">
      <div className="col-12 mt-3">
        <p>
          <b>Resultado detalhado</b>
        </p>
      </div>
      <div className="col-12 mt-1">
        <table className="table table-bordered table-items">
          <thead>
            <tr className="table-head-items">
              <th className="col-2">Lote</th>
              {filtros.status && filtros.status === "EM_ANDAMENTO" ? (
                <th className="col-3">Terceirizada</th>
              ) : (
                <th className="col-3">Unidade Educadional</th>
              )}
              <th className="col-2">Tipo de Solicitação</th>
              <th className="col-2 text-center">Data do Evento</th>
              <th className="col-2 text-center">N° de Alunos</th>
              <th className="col-1" />
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((solicitacao, index) => {
              return (
                <tr className="table-body-items" key={index}>
                  <td>
                    {solicitacao.dre_iniciais} - {solicitacao.lote_nome}
                  </td>
                  {filtros.status && filtros.status === "EM_ANDAMENTO" ? (
                    <td>{solicitacao.terceirizada_nome}</td>
                  ) : (
                    <td>{solicitacao.escola_nome}</td>
                  )}
                  <td>{solicitacao.desc_doc}</td>
                  <td className="text-center">
                    {solicitacao.data_evento}{" "}
                    {solicitacao.data_evento_fim &&
                    solicitacao.data_evento !== solicitacao.data_evento_fim
                      ? `- ${solicitacao.data_evento_fim}`
                      : ""}
                  </td>
                  <td className="text-center">
                    {solicitacao.numero_alunos !== 0
                      ? solicitacao.numero_alunos
                      : "-"}
                  </td>
                  <td />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-12 mt-3">
        <p className="text-center">
          <b>
            Não existe solicitações cadastradas para os filtros selecionados
          </b>
        </p>
      </div>
    </div>
  );
};
