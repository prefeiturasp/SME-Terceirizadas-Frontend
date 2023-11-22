import React from "react";
import { Collapse } from "react-collapse";
import "./style.scss";

export const SolicitacoesSimilaresKitLanche = ({ ...props }) => {
  const { solicitacao, index } = props;

  const kitsCEI =
    solicitacao.solicitacao_kit_lanche &&
    solicitacao.solicitacao_kit_lanche.kits.map((k) => k.nome);
  const kitsCEICEMEI =
    solicitacao.solicitacao_cei &&
    solicitacao.solicitacao_cei.kits.map((k) => k.nome);
  const kitsEMEICEMEI =
    solicitacao.solicitacao_emei &&
    solicitacao.solicitacao_emei.kits.map((k) => k.nome);

  return (
    <Collapse isOpened={!solicitacao.collapsed} key={index}>
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
                <p>Data do Evento:</p>
                <p>
                  <b>
                    {solicitacao.data ||
                      solicitacao.solicitacao_kit_lanche.data}
                  </b>
                </p>
              </div>
              <div className="col-4">
                <p>Local do Passeio:</p>
                <p>
                  <b>{solicitacao.local}</b>
                </p>
              </div>
              <div className="col-4">
                <p>Evento/Atividade:</p>
                <p>
                  <b>{solicitacao.evento}</b>
                </p>
              </div>
            </div>
            {solicitacao.solicitacao_kit_lanche && kitsCEI && (
              <table className="faixas-etarias-cei mt-3">
                <thead>
                  <tr className="row bg-black">
                    <th className="col-3 thead-td-solicitacoes-similares fontWeight600">
                      Nº de Alunos
                    </th>
                    <th className="col-3 thead-td-solicitacoes-similares fontWeight600">
                      Tempo Previsto de Passeio
                    </th>
                    <th className="col-3 thead-td-solicitacoes-similares fontWeight600">
                      Opção Desejada
                    </th>
                    <th className="col-3 thead-td-solicitacoes-similares fontWeight600">
                      Nº Total de Kits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row bg-white">
                    <td className="col-3 tbody-td-solicitacoes-similares">
                      <p>{solicitacao.quantidade_alunos}</p>
                    </td>
                    <td className="col-3 tbody-td-solicitacoes-similares">
                      <p>
                        {
                          solicitacao.solicitacao_kit_lanche
                            .tempo_passeio_explicacao
                        }
                      </p>
                    </td>
                    <td className="col-3 tbody-td-solicitacoes-similares">
                      <p>{kitsCEI.join(",")}</p>
                    </td>
                    <td className="col-3 tbody-td-solicitacoes-similares">
                      <p>{solicitacao.quantidade_alunos * kitsCEI.length}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {solicitacao.faixas_etarias &&
              solicitacao.faixas_etarias.length > 0 && (
                <table className="faixas-etarias-cei mt-3">
                  <thead>
                    <tr className="row">
                      <th className="col-8">
                        <b className="text-black-tabela-cemei">Faixa Etária</b>
                      </th>
                      <th className="col-2 text-center">
                        <b className="text-black-tabela-cemei">
                          Alunos matriculados
                        </b>
                      </th>
                      <th className="col-2 text-center">
                        <b className="text-black-tabela-cemei">Quantidade</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitacao.faixas_etarias.map((f, idx) => {
                      return (
                        <tr className="row bg-white" key={idx}>
                          <td className="col-8">
                            <p>{f.faixa_etaria.__str__}</p>
                          </td>
                          <td className="col-2 text-center">
                            <p>{f.matriculados_quando_criado}</p>
                          </td>
                          <td className="col-2 text-center">
                            <p>{f.quantidade}</p>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="row">
                      <td className="col-8">Total</td>
                      <td className="col-2 text-center">
                        {solicitacao.faixas_etarias
                          .map((f) => f.matriculados_quando_criado)
                          .reduce((partialSum, a) => partialSum + a, 0)}
                      </td>
                      <td className="col-2 text-center">
                        {solicitacao.faixas_etarias
                          .map((f) => f.quantidade)
                          .reduce((partialSum, a) => partialSum + a, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            {solicitacao.solicitacao_cei && (
              <>
                <div className="row mt-3">
                  <div className="col-12">
                    <label className="label-cemei">Alunos CEI</label>
                  </div>
                  <div className="col-12 mt-3">
                    <p>
                      Número de Alunos:{" "}
                      <label className="label-cemei-info">
                        {solicitacao.solicitacao_cei.faixas_quantidades
                          .map((f) => f.quantidade_alunos)
                          .reduce((partialSum, a) => partialSum + a, 0)}
                      </label>
                    </p>
                  </div>
                  <div className="col-6 mt-3">
                    <p>
                      Tempo Previsto de Passeio:{" "}
                      <label className="label-cemei-info">
                        {solicitacao.solicitacao_cei.tempo_passeio_explicacao} ({" "}
                        {kitsCEICEMEI.length}{" "}
                        {kitsCEICEMEI.length === 1 ? "Kit" : "Kits"} )
                      </label>
                    </p>
                  </div>
                  <div className="col-6 mt-3">
                    <p>
                      Opção Desejada:{" "}
                      <label className="label-cemei-info">
                        {kitsCEICEMEI.join(",")}
                      </label>
                    </p>
                  </div>
                </div>
                <table className="faixas-etarias-cei mt-3">
                  <thead>
                    <tr className="row">
                      <th className="col-8">
                        <b className="text-black-tabela-cemei">Faixa Etária</b>
                      </th>
                      <th className="col-2 text-center">
                        <b className="text-black-tabela-cemei">
                          Alunos matriculados
                        </b>
                      </th>
                      <th className="col-2 text-center">
                        <b className="text-black-tabela-cemei">Quantidade</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitacao.solicitacao_cei.faixas_quantidades.map(
                      (f, idx) => {
                        return (
                          <tr className="row bg-white" key={idx}>
                            <td className="col-8">
                              <p>{f.faixa_etaria.__str__}</p>
                            </td>
                            <td className="col-2 text-center">
                              <p>{f.matriculados_quando_criado}</p>
                            </td>
                            <td className="col-2 text-center">
                              <p>{f.quantidade_alunos}</p>
                            </td>
                          </tr>
                        );
                      }
                    )}
                    <tr className="row">
                      <td className="col-8">Total</td>
                      <td className="col-2 text-center">
                        {solicitacao.solicitacao_cei.faixas_quantidades
                          .map((f) => f.matriculados_quando_criado)
                          .reduce((partialSum, a) => partialSum + a, 0)}
                      </td>
                      <td className="col-2 text-center">
                        {solicitacao.solicitacao_cei.faixas_quantidades
                          .map((f) => f.quantidade_alunos)
                          .reduce((partialSum, a) => partialSum + a, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {solicitacao.solicitacao_emei && (
              <>
                <div className="row mt-3">
                  <div className="col-12">
                    <label className="label-cemei">Alunos EMEI</label>
                  </div>
                  <div className="col-12 mt-3">
                    <p>
                      Número de Alunos:{" "}
                      <label className="label-cemei-info">
                        {solicitacao.solicitacao_emei.quantidade_alunos}
                      </label>
                    </p>
                  </div>
                  <div className="col-6 mt-3">
                    <p>
                      Tempo Previsto de Passeio:{" "}
                      <label className="label-cemei-info">
                        {solicitacao.solicitacao_emei.tempo_passeio_explicacao}{" "}
                        ( {kitsEMEICEMEI.length}{" "}
                        {kitsEMEICEMEI.length === 1 ? "Kit" : "Kits"} )
                      </label>
                    </p>
                  </div>
                  <div className="col-6 mt-3">
                    <p>
                      Opção Desejada:{" "}
                      <label className="label-cemei-info">
                        {kitsEMEICEMEI.join(",")}
                      </label>
                    </p>
                  </div>
                </div>
                <table className="faixas-etarias-cei mt-3">
                  <thead>
                    <tr className="row bg-white">
                      <th className="col-8 text-black-tabela-cemei">
                        <b>
                          Alunos matriculados:{" "}
                          {
                            solicitacao.solicitacao_emei
                              .matriculados_quando_criado
                          }
                        </b>
                      </th>
                      <th className="col-4 text-black-tabela-cemei">
                        <b>
                          Quantidade:{" "}
                          {solicitacao.solicitacao_emei.quantidade_alunos}
                        </b>
                      </th>
                    </tr>
                  </thead>
                </table>
              </>
            )}
            <div className="row mt-3">
              <div className="col-12">
                <p>Observações:</p>
                <p
                  className="value-black"
                  dangerouslySetInnerHTML={{
                    __html:
                      solicitacao.observacao ||
                      (solicitacao.solicitacao_kit_lanche &&
                        solicitacao.solicitacao_kit_lanche.descricao),
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
