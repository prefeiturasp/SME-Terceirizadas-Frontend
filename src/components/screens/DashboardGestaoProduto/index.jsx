import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import CardStatusDeSolicitacao from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardBody from "../../Shareable/CardBody";
import {
  GESTAO_PRODUTO,
  SOLICITACAOES_HOMOLOGADAS
} from "../../../configs/constants";
import { formataCards, getCardIcon, getCardStyle } from "./helper";
import { dataAtual, deepCopy } from "../../../helpers/utilities";

export default class DashboardGestaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: null,
      dashboardDataFiltered: null,
      erro: false
    };
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
  }

  componentDidMount() {
    const { endpointDashboard } = this.props;
    endpointDashboard()
      .then(response => {
        if (response.status === HTTP_STATUS.OK) {
          this.setState({
            dashboardData: response.data.results,
            dashboardDataFiltered: response.data.results
          });
        } else {
          this.setState({ erro: true });
        }
      })
      .catch(() => {
        this.setState({ erro: true });
      });
  }

  onPesquisaChanged(event) {
    if (event === undefined) event = { target: { value: "" } };
    const { dashboardData } = this.state;
    let dashboardDataFiltered = deepCopy(dashboardData);
    dashboardDataFiltered = this.filtrarNome(dashboardDataFiltered, event);
    this.setState({ dashboardDataFiltered });
  }

  filtrarNome(listaFiltro, event) {
    const { cards } = this.props;
    cards.forEach(card => {
      listaFiltro[card] = listaFiltro[card].filter(function(item) {
        const wordToFilter = event.target.value.toLowerCase();
        return (
          item.nome_produto.toLowerCase().search(wordToFilter) !== -1 ||
          item.id_externo.toLowerCase().search(wordToFilter) !== -1
        );
      });
    });
    return listaFiltro;
  }

  render() {
    const { dashboardDataFiltered, erro } = this.state;
    const { cards } = this.props;
    return (
      <div>
        {erro ? (
          <div>Erro ao carregar painel gerencial</div>
        ) : !dashboardDataFiltered ? (
          <div>Carregando...</div>
        ) : (
          <CardBody
            titulo="Acompanhamento de produtos cadastrados"
            dataAtual={dataAtual()}
            onChange={this.onPesquisaChanged}
          >
            {cards.map((card, key) => {
              return (
                <div key={key}>
                  {key % 2 === 0 && (
                    <div className="row pt-3">
                      <div className="col-6">
                        <CardStatusDeSolicitacao
                          cardTitle={card}
                          cardType={getCardStyle(card)}
                          solicitations={formataCards(
                            dashboardDataFiltered[cards[key]]
                          )}
                          icon={getCardIcon(card)}
                          href={`/${GESTAO_PRODUTO}/${SOLICITACAOES_HOMOLOGADAS}`}
                        />
                      </div>
                      <div className="col-6">
                        <CardStatusDeSolicitacao
                          cardTitle={cards[key + 1]}
                          cardType={getCardStyle(cards[key + 1])}
                          solicitations={formataCards(
                            dashboardDataFiltered[cards[key + 1]]
                          )}
                          icon={getCardIcon(cards[key + 1])}
                          href={`/${GESTAO_PRODUTO}/${SOLICITACAOES_HOMOLOGADAS}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardBody>
        )}
      </div>
    );
  }
}
