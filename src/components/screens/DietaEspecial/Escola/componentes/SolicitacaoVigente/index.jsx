import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { ToggleExpandir } from "../../../../../Shareable/ToggleExpandir";

export class SolicitacaoVigente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacoesVigentes: null
    };
  }

  componentDidMount() {
    if (this.props.solicitacoesVigentes !== this.state.solicitacoesVigentes) {
      this.setState({ solicitacoesVigentes: this.props.solicitacoesVigentes });
    }
  }

  componentDidUpdate() {
    if (this.props.solicitacoesVigentes !== this.state.solicitacoesVigentes) {
      this.setState({ solicitacoesVigentes: this.props.solicitacoesVigentes });
    }
  }

  activateSolicitacao(key) {
    let solicitacoesVigentes = this.state.solicitacoesVigentes;
    solicitacoesVigentes[key].active = !solicitacoesVigentes[key].active;
    this.setState({ solicitacoesVigentes });
  }

  render() {
    const { solicitacoesVigentes } = this.state;
    return (
      <div className="current-diets">
        {!solicitacoesVigentes || solicitacoesVigentes.length === 0 ? (
          <div className="pt-2 no-diets">
            Não há solicitações vigentes para este aluno.
          </div>
        ) : (
          <div>
            <p className="pt-3 title">Dietas Ativas</p>
            {solicitacoesVigentes.map((solicitacaoVigente, key) => {
              return (
                <div className="pb-2" key={key}>
                  <div
                    className="school-container col-md-12 mr-4"
                    style={
                      solicitacaoVigente.active ? { background: "#F2FBFE" } : {}
                    }
                  >
                    <div className="col-md-12 pt-2 pb-2 title">
                      {`Solicitação # ${solicitacaoVigente.id_externo}`}
                      <ToggleExpandir
                        onClick={() => this.activateSolicitacao(key)}
                        ativo={solicitacaoVigente.active}
                        className="float-right"
                      />
                    </div>
                    <Collapse isOpened={solicitacaoVigente.active}>
                      <hr />
                      <div className="container">
                        <section className="row attachments">
                          <div className="report-label-value col-8">
                            <p>Laudo Médico</p>
                            <p>
                              Para visualizar o(s) laudo(s) fornecido(s) pelo
                              prescritor, clique nos anexo(s)
                            </p>{" "}
                          </div>{" "}
                          <div className="col-4 report-label-value">
                            <p>Anexos</p>
                            {solicitacaoVigente.anexos
                              .filter(anexo => anexo.eh_laudo_medico)
                              .map((anexo, key) => {
                                return (
                                  <div key={key}>
                                    <a
                                      rel="noopener noreferrer"
                                      target="_blank"
                                      href={anexo.arquivo}
                                      className="link"
                                    >
                                      {`Anexo ${key + 1}`}
                                    </a>
                                  </div>
                                );
                              })}
                          </div>
                        </section>
                        <div className="report-label-value">
                          <p>Observações</p>
                          <p
                            className="value"
                            dangerouslySetInnerHTML={{
                              __html: solicitacaoVigente.observacoes
                            }}
                          />
                        </div>
                        <div className="report-label-value">
                          <p>Relação por Diagnóstico</p>
                          {solicitacaoVigente.alergias_intolerancias.map(
                            (alergia, key) => {
                              return (
                                <div className="value" key={key}>
                                  {alergia.descricao}
                                </div>
                              );
                            }
                          )}
                        </div>
                        <div className="pb-3 report-label-value">
                          <p>Protocolo da Dieta Especial</p>
                          {solicitacaoVigente.anexos
                            .filter(anexo => !anexo.eh_laudo_medico)
                            .map((anexo, key) => {
                              return (
                                <div key={key}>
                                  <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={anexo.arquivo}
                                    className="link"
                                  >
                                    {anexo.nome}
                                  </a>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default SolicitacaoVigente;
