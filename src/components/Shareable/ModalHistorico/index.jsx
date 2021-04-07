import { Modal } from "antd";
import React, { Component } from "react";
import { truncarString } from "helpers/utilities";

import "antd/dist/antd.css";

export default class ModalHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      logSelecionado: null
    };
  }

  itemLogAtivo = (index, ativo) => {
    let { logs, logSelecionado } = this.state;
    logs.forEach(log => {
      log.ativo = false;
    });
    if (!ativo) {
      logs[index].ativo = !ativo;
      logSelecionado = logs[index];
    } else {
      logSelecionado = null;
    }

    this.setState({ logs, logSelecionado });
  };

  retornaIniciais = log => {
    const nome = log.usuario.nome.split(" ");
    let iniciais = "";
    nome.forEach((n, index) => {
      if (index <= 1) {
        iniciais = iniciais.concat(n.charAt(0)).toUpperCase();
      }
    });
    return iniciais;
  };

  componentDidMount = async () => {
    const { logs } = this.props;
    this.setState({ logs });
  };

  render() {
    const { visible, onOk, onCancel } = this.props;
    const { logs, logSelecionado } = this.state;
    return (
      <Modal
        title="Histórico"
        visible={visible}
        onOk={onOk}
        okText={"Fechar"}
        onCancel={onCancel}
        width={800}
        maskClosable={false}
      >
        <section className="body-modal-produto">
          <div>Usuário</div>
          <div>Ações</div>
          <article className="list-logs">
            <section className="body-logs">
              {logs.map((log, index) => {
                const { ativo } = log;
                const iniciais = this.retornaIniciais(log);
                const tipoUsuario =
                  log.usuario.tipo_usuario === "terceirizada"
                    ? "TERCEIRIZADA"
                    : "CODAE";

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
                      <div
                        className="descicao-titulo"
                        title={log.status_evento_explicacao}
                      >
                        {truncarString(log.status_evento_explicacao, 19)}
                      </div>
                      <div className="descicao-entidade">{tipoUsuario}</div>
                    </div>
                    <div className="descricao">
                      <div className="hora">{log.criado_em.split(" ")[0]}</div>
                      <div className="hora">{log.criado_em.split(" ")[1]}</div>
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
                {logSelecionado !== null ? (
                  <div className="descricao-do-log">
                    <div className="header-log">
                      <div className="usuario">
                        <div>{this.retornaIniciais(logSelecionado)}</div>
                      </div>
                      <div className="nome-fantasia-empresa">
                        {logSelecionado.empresa}
                      </div>
                      <div>
                        <div>{logSelecionado.criado_em.split(" ")[0]}</div>
                        <div>{logSelecionado.criado_em.split(" ")[1]}</div>
                      </div>
                    </div>
                    <div className="body-log-item">
                      <header>{logSelecionado.status_evento_explicacao}</header>
                      <section>
                        <article>
                          <div>
                            RF: {logSelecionado.usuario.registro_funcional}
                          </div>
                          <div className="criado-em">
                            <div>Data:</div>
                            <div>{logSelecionado.criado_em.split(" ")[0]}</div>
                          </div>
                        </article>
                        <article>
                          {logSelecionado.justificativa !== "" && (
                            <>
                              <div>Justificativa:</div>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: logSelecionado.justificativa
                                }}
                              />
                            </>
                          )}
                        </article>
                      </section>
                    </div>
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
