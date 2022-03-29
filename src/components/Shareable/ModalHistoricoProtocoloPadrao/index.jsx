import { Modal } from "antd";
import React, { Component } from "react";

import "antd/dist/antd.css";
import moment from "moment";

export default class ModalHistoricoProtocoloPadrao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      histSelecionado: null
    };
  }

  itemLogAtivo = (index, ativo) => {
    let { history } = this.props;
    let { histSelecionado } = this.state;
    history.forEach(h => {
      h.ativo = false;
    });

    if (!ativo) {
      history[index].ativo = !ativo;
      histSelecionado = history[index];
    } else {
      histSelecionado = null;
    }

    this.setState({ history, histSelecionado });
  };

  retornaIniciais = email => {
    const nome = email.split(" ");
    let iniciais = "";
    nome.forEach((n, index) => {
      if (index <= 1) {
        iniciais = iniciais.concat(n.charAt(0)).toUpperCase();
      }
    });
    return iniciais;
  };

  componentDidMount = async () => {
    const { history } = this.props;
    this.setState({ history });
  };

  filterFieldsProtocolos = history => {
    if (history !== undefined && history.changes) {
      const fields = history.changes.filter(change => {
        return ["nome_protocolo", "status", "orientacoes_gerais"].includes(
          change.field
        );
      });
      return fields;
    }
    return [];
  };

  findFieldSubstituicoes = history => {
    if (history !== undefined && history.changes !== undefined) {
      const field = history.changes.find(change => {
        return ["substituicoes"].includes(change.field);
      });
      return field;
    }
    return { changes: [] };
  };

  ajusta_nome = campo => {
    if (campo === "nome_protocolo") {
      return "Nome Protocolo";
    } else if (campo === "status") {
      return "Status";
    } else if (campo === "orientacoes_gerais") {
      return "Orientações Gerais";
    }
  };

  ajusta_valor = (campo, valor_campo) => {
    if (campo === "status" && valor_campo === "NAO_LIBERADO") {
      return "NÃO LIBERADO";
    }
    return valor_campo;
  };

  render() {
    const { visible, onOk, onCancel, history } = this.props;
    const { histSelecionado } = this.state;
    return (
      <Modal
        title="Histórico"
        visible={visible}
        onOk={onOk}
        okText={"Fechar"}
        onCancel={onCancel}
        width={1050}
        maskClosable={false}
      >
        <section className="body-modal-produto">
          <div>Usuário</div>
          <div>Ações</div>
          <article className="list-logs">
            <section className="body-logs">
              {history.length > 0 &&
                history.map((hist, index) => {
                  const { ativo } = hist;
                  const iniciais = this.retornaIniciais(hist.user.email);
                  return (
                    <div
                      key={index}
                      className={`${ativo && "ativo-item"} grid-item-log`}
                      onClick={() => {
                        this.itemLogAtivo(index, ativo);
                      }}
                    >
                      <div className="usuario">
                        <div>{iniciais}</div>
                      </div>
                      <div className="descricao">
                        <div className="descicao-titulo" title={hist.action}>
                          {hist.action === "CREATE" ? "CRIAÇÃO" : "EDIÇÃO"}
                        </div>
                        <div className="descicao-entidade">
                          {hist.user.email}
                        </div>
                      </div>
                      <div className="descricao">
                        {hist.updated_at !== undefined && (
                          <>
                            <div className="hora">
                              {
                                moment(hist.updated_at, "YYYY-MM-DD HH:mm:ss")
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora">
                              {
                                moment(hist.updated_at, "YYYY-MM-DD HH:mm:ss")
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[1]
                              }
                            </div>
                          </>
                        )}
                        {hist.created_at !== undefined && (
                          <>
                            <div className="hora">
                              {
                                moment(hist.created_at, "YYYY-MM-DD HH:mm:ss")
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora">
                              {
                                moment(hist.created_at, "YYYY-MM-DD HH:mm:ss")
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[1]
                              }
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </section>
          </article>
          <article className="detail-log">
            <div />

            <div>
              <header>
                <div />
                {histSelecionado !== null ? (
                  <div className="descricao-do-log">
                    <div className="header-log">
                      <div className="usuario">
                        <div>
                          {this.retornaIniciais(histSelecionado.user.email)}
                        </div>
                      </div>
                      <div className="nome-fantasia-empresa">
                        {histSelecionado.user.email}
                      </div>
                      <div>
                        {histSelecionado.updated_at !== undefined && (
                          <>
                            <div className="hora">
                              {
                                moment(
                                  histSelecionado.updated_at,
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora">
                              {
                                moment(
                                  histSelecionado.updated_at,
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[1]
                              }
                            </div>
                          </>
                        )}
                        {histSelecionado.created_at !== undefined && (
                          <>
                            <div className="hora">
                              {
                                moment(
                                  histSelecionado.created_at,
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora">
                              {
                                moment(
                                  histSelecionado.created_at,
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[1]
                              }
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {histSelecionado !== undefined &&
                      this.filterFieldsProtocolos(histSelecionado).length >
                        0 && (
                        <table className="table table-bordered table-alimentacao">
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "40%" }} />
                          <thead>
                            <tr className="table-head-alimentacao">
                              <th>Campo</th>
                              <th>De</th>
                              <th>Para</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.filterFieldsProtocolos(histSelecionado)
                              .length > 0 &&
                              this.filterFieldsProtocolos(histSelecionado).map(
                                (change, index) => (
                                  <tr
                                    key={`${index}_${change.field}`}
                                    className="table-body-alimentacao"
                                  >
                                    <td>{this.ajusta_nome(change.field)}</td>
                                    <td>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: this.ajusta_valor(
                                            change.field,
                                            change.from
                                          )
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: this.ajusta_valor(
                                            change.field,
                                            change.to
                                          )
                                        }}
                                      />
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      )}
                    {histSelecionado !== undefined &&
                      this.findFieldSubstituicoes(histSelecionado) !==
                        undefined &&
                      this.findFieldSubstituicoes(histSelecionado).changes
                        .length > 0 && (
                        <table className="table table-bordered table-alimentacao">
                          <tbody>
                            <tr className="table-body-alimentacao">
                              <td>
                                <p className="data-title">
                                  Lista de Substituições
                                </p>
                                {this.findFieldSubstituicoes(
                                  histSelecionado
                                ).changes.map((change, index) => {
                                  return (
                                    <table
                                      key={`${index}_table`}
                                      className="table table-bordered table-alimentacao"
                                    >
                                      <col style={{ width: "30%" }} />
                                      <col style={{ width: "30%" }} />
                                      <col style={{ width: "40%" }} />
                                      <thead>
                                        <tr
                                          key={`${index}_header`}
                                          className="table-head-alimentacao "
                                        >
                                          <th>Campo</th>
                                          <th>De</th>
                                          <th>Para</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {change.hasOwnProperty("tipo") ? (
                                          <tr
                                            key={`${index}_tipo`}
                                            className="table-body-alimentacao"
                                          >
                                            <td>Isenções/Substituições</td>
                                            <td>
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: change.tipo.from
                                                    ? change.tipo.from === "I"
                                                      ? "Isento"
                                                      : "Substituir"
                                                    : ""
                                                }}
                                              />
                                            </td>
                                            <td>
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: change.tipo.to
                                                    ? change.tipo.to === "I"
                                                      ? "Isento"
                                                      : "Substituir"
                                                    : ""
                                                }}
                                              />
                                            </td>
                                          </tr>
                                        ) : null}
                                        {change.hasOwnProperty("alimento") ? (
                                          <tr
                                            key={`${index}_alimento`}
                                            className="table-body-alimentacao"
                                          >
                                            <td>Alimento</td>
                                            <td>
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: change.alimento.from
                                                    ? change.alimento.from.nome
                                                    : ""
                                                }}
                                              />
                                            </td>
                                            <td>
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: change.alimento.to
                                                    ? change.alimento.to.nome
                                                    : ""
                                                }}
                                              />
                                            </td>
                                          </tr>
                                        ) : null}
                                        {change.hasOwnProperty(
                                          "substitutos"
                                        ) ? (
                                          <tr
                                            key={`${index}_substitutos`}
                                            className="table-body-alimentacao"
                                          >
                                            <td>Alimento/Ingrediente</td>
                                            <td>
                                              <ul>
                                                {change.substitutos.from
                                                  ? change.substitutos.from.map(
                                                      alimento => {
                                                        return (
                                                          <li
                                                            key={alimento.uuid}
                                                          >
                                                            {alimento.nome}
                                                          </li>
                                                        );
                                                      }
                                                    )
                                                  : ""}
                                              </ul>
                                            </td>
                                            <td>
                                              <ul>
                                                {change.substitutos.to
                                                  ? change.substitutos.to.map(
                                                      alimento => {
                                                        return (
                                                          <li
                                                            key={alimento.uuid}
                                                          >
                                                            {alimento.nome}
                                                          </li>
                                                        );
                                                      }
                                                    )
                                                  : ""}
                                              </ul>
                                            </td>
                                          </tr>
                                        ) : null}
                                      </tbody>
                                    </table>
                                  );
                                })}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                  </div>
                ) : (
                  <div />
                )}
              </header>
            </div>
          </article>
        </section>
      </Modal>
    );
  }
}
