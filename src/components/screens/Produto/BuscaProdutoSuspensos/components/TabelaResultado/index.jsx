import React, { Fragment, useState } from "react";
import { getProdutosRelatorioSuspenso } from "services/produto.service";
import { gerarParametrosConsulta } from "helpers/utilities";
import { Spin } from "antd";
import { Paginacao } from "components/Shareable/Paginacao";

const TabelaResultado = ({
  produtosCount,
  filtros,
  produtos,
  setProdutos,
  pageSize,
  setPage,
  page,
  bloquearEdital
}) => {
  const [carregando, setCarregando] = useState(false);
  const [ativos, setAtivos] = useState([]);

  const nextPage = page => {
    setCarregando(true);
    setPage(page);
    const params = gerarParametrosConsulta({
      ...filtros,
      page: page,
      page_size: pageSize
    });
    getProdutosRelatorioSuspenso(params).then(response => {
      setProdutos(response.data.results);
      setCarregando(false);
    });
  };

  return (
    <div className="card-body">
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="row">
          <div className="col-12">
            <p>Resultado detalhado</p>
          </div>
          <div className="col-12">
            <table className="table table-bordered table-items">
              <thead>
                <tr className="table-head-items">
                  <th>Produto</th>
                  <th>Marca</th>
                  <th>Edital</th>
                  <th>Tipo</th>
                  <th>Cadastro</th>
                  <th>Suspensão</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto, idx) => {
                  let log_cadastro = produto.ultima_homologacao.logs.filter(
                    log => log.status_evento_explicacao === "CODAE homologou"
                  );
                  let log_suspensao = produto.ultima_homologacao.logs.filter(
                    log =>
                      [
                        "CODAE suspendeu o produto",
                        "Suspenso em alguns editais"
                      ].includes(log.status_evento_explicacao)
                  );
                  let editais_vinculados = "";
                  if (bloquearEdital) {
                    editais_vinculados = produto.vinculos_produto_edital.filter(
                      vinculo => vinculo.edital.numero === filtros.nome_edital
                    )[0];
                    editais_vinculados = editais_vinculados.edital.numero;
                  } else {
                    editais_vinculados = produto.vinculos_produto_edital
                      .map(vinculo => {
                        return vinculo.edital.numero;
                      })
                      .join(", ");
                  }
                  log_cadastro = log_cadastro.slice(-1).pop();
                  log_suspensao = log_suspensao.slice(-1).pop();

                  return (
                    <Fragment key={idx}>
                      <tr className="table-body-items">
                        <td>{produto ? produto.nome : "-"}</td>
                        <td>{produto.marca ? produto.marca.nome : "-"}</td>
                        <td>
                          {editais_vinculados.length ? editais_vinculados : "-"}
                        </td>
                        <td>
                          {produto.eh_para_alunos_com_dieta
                            ? "ESPECIAL"
                            : "COMUM"}
                        </td>
                        <td>
                          {log_cadastro
                            ? log_cadastro.criado_em.split(" ")[0]
                            : "-"}
                        </td>
                        <td>
                          {log_suspensao
                            ? log_suspensao.criado_em.split(" ")[0]
                            : "-"}
                        </td>
                        <td
                          className="text-center"
                          onClick={() => {
                            ativos &&
                            ativos.includes(produto.ultima_homologacao.uuid)
                              ? setAtivos(
                                  ativos.filter(
                                    el => el !== produto.ultima_homologacao.uuid
                                  )
                                )
                              : setAtivos(
                                  ativos
                                    ? [
                                        ...ativos,
                                        produto.ultima_homologacao.uuid
                                      ]
                                    : [produto.ultima_homologacao.uuid]
                                );
                          }}
                        >
                          <i
                            className={`fas fa-${
                              ativos.includes(produto.ultima_homologacao.uuid)
                                ? "angle-up"
                                : "angle-down"
                            } `}
                          />
                        </td>
                      </tr>
                      {ativos &&
                        ativos.includes(produto.ultima_homologacao.uuid) && (
                          <tr className="table-body-items">
                            <td colSpan="7">
                              <div className="row mb-3">
                                <div className="col-4">
                                  <p>Fabricante do produto</p>
                                  <p>
                                    <b>{produto.fabricante.nome}</b>
                                  </p>
                                </div>
                                <div className="col-8">
                                  <p>Justificativa de suspensão de produto</p>
                                  <p
                                    className="justificativa-value-table"
                                    dangerouslySetInnerHTML={{
                                      __html: log_suspensao.justificativa
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4">
                                  <p>Anexo</p>
                                  {log_suspensao.anexos.length ? (
                                    log_suspensao.anexos.map(
                                      (anexo, anexoIdx) => {
                                        return (
                                          <a
                                            key={anexoIdx}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            href={anexo.arquivo_url}
                                          >
                                            {anexo.nome}
                                          </a>
                                        );
                                      }
                                    )
                                  ) : (
                                    <p> - </p>
                                  )}
                                </div>
                                <div className="col-4">
                                  <p>Nome</p>
                                  <p>
                                    <b>{log_suspensao.usuario.nome}</b>
                                  </p>
                                  <p>
                                    <b>
                                      RF:{" "}
                                      {log_suspensao.usuario.registro_funcional}
                                    </b>
                                  </p>
                                </div>
                                <div className="col-4">
                                  <p>Cargo</p>
                                  <p>
                                    <b>{log_suspensao.usuario.cargo}</b>
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <Paginacao
              className="mt-3 mb-3"
              key={0}
              current={page}
              total={produtosCount}
              showSizeChanger={false}
              onChange={page => {
                nextPage(page);
              }}
              pageSize={pageSize}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default TabelaResultado;
