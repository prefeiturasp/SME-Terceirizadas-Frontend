import React from "react";
import { Collapse } from "react-collapse";
import "./style.scss";

export const SolicitacoesSimilaresInclusao = ({ ...props }) => {
  const { solicitacao, index } = props;

  return (
    <Collapse isOpened={solicitacao.collapsed} key={index}>
      <tr className="row solicitacao-similar-info">
        <td className="col-12 remove-padding">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-4">
                <p>Solicitação Número:</p>
                <p>
                  <b>{`#${solicitacao.id_externo}`}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Data da Inclusão:</p>
                <p>
                  <b>{solicitacao.logs[0].criado_em.split(" ")[0]}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Status da Solicitação:</p>
                <p>
                  <b>
                    {
                      solicitacao.logs[solicitacao.logs.length - 1]
                        .status_evento_explicacao
                    }
                  </b>
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Motivo:</p>
                <p>
                  <b>{solicitacao.inclusoes[0].motivo.nome}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Dia(s) de inclusão:</p>
                <p>
                  {solicitacao.inclusoes.map((inclusao, index) => (
                    <b className="mr-4" key={index}>
                      {inclusao.data}
                    </b>
                  ))}
                </p>
              </div>
            </div>
            <div>
              <table className="periodos-emef mt-3">
                <thead>
                  <tr className="row bg-black">
                    <th className="col-2 text-white">
                      <b>Período</b>
                    </th>
                    <th className="col-8 text-white">
                      <b>Tipos de Alimentação</b>
                    </th>
                    <th className="col-2 text-white text-center">
                      <b>Nº de Alunos</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {solicitacao.quantidades_periodo.map((periodo, idx) => {
                    return (
                      <tr className="row bg-white" key={idx}>
                        <td className="col-2">
                          <p>{periodo.periodo_escolar.nome}</p>
                        </td>
                        <td className="col-8">
                          <p>
                            {periodo.tipos_alimentacao.reduce(
                              (acc, tipo, idxTipo) =>
                                acc +
                                tipo.nome +
                                (idxTipo !==
                                periodo.tipos_alimentacao.length - 1
                                  ? ", "
                                  : ""),
                              ""
                            )}
                          </p>
                        </td>
                        <td className="col-2 text-center">
                          <p>{periodo.numero_alunos}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <p>Observações:</p>
                <p
                  className="value-black"
                  dangerouslySetInnerHTML={{
                    __html: solicitacao.observacao,
                  }}
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </Collapse>
  );
};
