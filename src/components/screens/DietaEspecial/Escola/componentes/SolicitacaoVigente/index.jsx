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
      <div>
        <p>Dietas Ativas</p>
        {!solicitacoesVigentes || solicitacoesVigentes.length === 0 ? (
          <div>Não há solicitações vigentes para este aluno.</div>
        ) : (
          solicitacoesVigentes.map((solicitacaoVigente, key) => {
            return (
              <div key={key}>
                <div
                  className="school-container col-md-12 mr-4"
                  style={
                    solicitacaoVigente.active ? { background: "#F2FBFE" } : {}
                  }
                >
                  <div className="col-md-12 pt-2 pb-2">
                    {`Solicitação: # ${solicitacaoVigente.id_externo}`}
                    <ToggleExpandir
                      onClick={() => this.activateSolicitacao(key)}
                      ativo={solicitacaoVigente.active}
                      className="float-right"
                    />
                  </div>
                  <Collapse isOpened={solicitacaoVigente.active}>
                    <hr />
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
                        {solicitacaoVigente.anexos.map((anexo, key) => {
                          return (
                            <div key={key}>
                              <a
                                href={anexo.arquivo}
                                className="value-important link"
                              >
                                {`Anexo ${key + 1}`}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                    <table className="table-periods">
                      <tr>
                        <th>Observações</th>
                      </tr>
                      <tr>
                        <td>
                          <p
                            className="value"
                            dangerouslySetInnerHTML={{
                              __html: solicitacaoVigente.observacoes
                            }}
                          />
                        </td>
                      </tr>
                    </table>
                  </Collapse>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default SolicitacaoVigente;
