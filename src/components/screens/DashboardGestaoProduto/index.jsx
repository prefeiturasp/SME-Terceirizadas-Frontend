import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { Link } from "react-router-dom";

export default class DashboardGestaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homologacoes: null,
      erro: false
    };
  }

  componentDidMount() {
    const { endpointGetHomologacoes } = this.props;
    endpointGetHomologacoes()
      .then(response => {
        if (response.status === HTTP_STATUS.OK) {
          this.setState({ homologacoes: response.data.results });
        } else {
          this.setState({ erro: true });
        }
      })
      .catch(() => {
        this.setState({ erro: true });
      });
  }

  render() {
    const { homologacoes, erro } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          {erro ? (
            <div>Erro ao carregar painel gerencial</div>
          ) : !homologacoes ? (
            <div>Carregando...</div>
          ) : (
            <div>
              {homologacoes
                .filter(
                  homologacao =>
                    homologacao.status === "CODAE_PENDENTE_HOMOLOGACAO"
                )
                .map((homologacao, key) => {
                  return (
                    <div key={key}>
                      <Link
                        to={`/pesquisa-desenvolvimento/homologacao-produto?uuid=${
                          homologacao.uuid
                        }`}
                      >
                        Solicitação # {homologacao.id_externo}
                      </Link>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
