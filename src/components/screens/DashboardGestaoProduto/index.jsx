import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import CardStatusDeSolicitacao from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardBody from "components/Shareable/CardBody";
import { GESTAO_PRODUTO } from "configs/constants";
import { formataCards, incluirDados } from "./helper";
import { dataAtual, deepCopy } from "helpers/utilities";
import { listarCardsPermitidos } from "helpers/gestaoDeProdutos";
import { getDashboardGestaoProdutos } from "services/produto.service";

export default class DashboardGestaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      dashboardData: null,
      dashboardDataFiltered: null,
      erro: false
    };
  }

  componentDidMount() {
    getDashboardGestaoProdutos()
      .then(response => {
        if (response.status === HTTP_STATUS.OK) {
          const cards = listarCardsPermitidos();
          cards.forEach(card => {
            card.items = incluirDados(
              card.incluir_status,
              response.data.results
            );
          });
          this.setState({
            cards: cards,
            cardsFiltered: cards.concat()
          });
        } else {
          this.setState({ erro: true });
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        this.setState({ erro: true });
      });
  }

  onPesquisaChanged = (event = { target: { value: "" } }) => {
    const { cards } = this.state;
    let cardsFiltered = deepCopy(cards);
    cardsFiltered = this.filtrarNome(cardsFiltered, event);
    this.setState({ cardsFiltered });
  };

  filtrarNome = () => {
    /*
    //FIX-ME:  Precisa reimplementar
    const { cards } = this.props;
    return cards; //FIXME: needs to be re implemented
     cards.forEach(card => {
      listaFiltro[card] = listaFiltro[card].filter(function(item) {
        const wordToFilter = event.target.value.toLowerCase();
        return (
          item.nome_produto.toLowerCase().search(wordToFilter) !== -1 ||
          item.id_externo.toLowerCase().search(wordToFilter) !== -1
        );
      });
    });
    return listaFiltro; */
  };

  render() {
    const { cardsFiltered, erro } = this.state;

    return (
      <div>
        {erro && <div>Erro ao carregar painel gerencial</div>}
        {!erro && !cardsFiltered && <div>Carregando...</div>}
        {!erro && cardsFiltered && (
          <CardBody
            titulo="Acompanhamento de produtos cadastrados"
            dataAtual={dataAtual()}
            onChange={this.onPesquisaChanged}
          >
            {cardsFiltered.map((card, index) => {
              const card2 = cardsFiltered[index + 1]
                ? cardsFiltered[index + 1]
                : null;
              return (
                <div key={index}>
                  {index % 2 === 0 && (
                    <div className="row pt-3">
                      <div className="col-6">
                        <CardStatusDeSolicitacao
                          cardTitle={card.titulo}
                          cardType={card.style}
                          solicitations={formataCards(card.items)}
                          icon={card.icon}
                          href={`/${GESTAO_PRODUTO}/${card.rota}`}
                        />
                      </div>
                      {card2 && (
                        <div className="col-6">
                          <CardStatusDeSolicitacao
                            cardTitle={card2.titulo}
                            cardType={card2.style}
                            solicitations={formataCards(card2.items)}
                            icon={card2.icon}
                            href={`/${GESTAO_PRODUTO}/${card2.rota}`}
                          />
                        </div>
                      )}
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
