import React, { Component } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import CardStatusDeSolicitacao from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardBody from "components/Shareable/CardBody";
import { GESTAO_PRODUTO } from "configs/constants";
import { formataCards, incluirDados } from "./helper";
import { dataAtual } from "helpers/utilities";
import { listarCardsPermitidos } from "helpers/gestaoDeProdutos";
import {
  getDashboardGestaoProdutos,
  getHomologacoesPorTituloMarca
} from "services/produto.service";
import { TIPO_PERFIL } from "constants/shared";

export default class DashboardGestaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      dashboardData: null,
      dashboardDataFiltered: null,
      erro: false,
      ehTerceirizada: false,
      filtroPorTituloAtivo: false,
      filtroPorMarcaAtivo: false,
      tituloToBeFiltered: "",
      marcaToBeFiltered: "",
      loading: true,
      filtrosDesabilitados: true
    };
    this.typingTimeout = null;
  }

  ehPerfilTerceirizada = () => {
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    return tipoPerfil === TIPO_PERFIL.TERCEIRIZADA;
  };

  loadDashBoardGestaoProdutos = () => {
    this.setState({
      loading: true,
      filtrosDesabilitados: true
    });
    getDashboardGestaoProdutos()
      .then(response => {
        if (response.status === HTTP_STATUS.OK) {
          const cards = listarCardsPermitidos();
          const ehTerceirizada = this.ehPerfilTerceirizada();
          cards.forEach(card => {
            card.items = incluirDados(
              card.incluir_status,
              response.data.results
            );
          });
          this.setState({
            cards: cards,
            cardsFiltered: cards.concat(),
            ehTerceirizada,
            loading: false,
            filtrosDesabilitados: false
          });
        } else {
          this.setState({
            erro: true,
            loading: false,
            filtrosDesabilitados: false
          });
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        this.setState({ erro: true });
      });
  };

  componentDidMount() {
    this.loadDashBoardGestaoProdutos();
  }

  filtraHomologacoesPorTituloMarca = () => {
    const { marcaToBeFiltered, tituloToBeFiltered } = this.state;

    return new Promise(async (resolve, reject) => {
      let data = {};
      marcaToBeFiltered &&
        marcaToBeFiltered.length >= 3 &&
        (data.marca_produto = marcaToBeFiltered);
      tituloToBeFiltered &&
        tituloToBeFiltered.length >= 3 &&
        (data.titulo_produto = tituloToBeFiltered);
      this.setState({ loading: true });
      const response = await getHomologacoesPorTituloMarca(data);
      if (response.status === HTTP_STATUS.OK) {
        const cards = listarCardsPermitidos();
        const ehTerceirizada = this.ehPerfilTerceirizada();
        cards.forEach(card => {
          card.items = incluirDados(card.incluir_status, response.data.results);
        });
        this.setState({
          cards: cards,
          cardsFiltered: cards.concat(),
          ehTerceirizada,
          loading: false
        });
        resolve();
      } else {
        this.setState({ loading: false });
        reject(response.errors);
      }
    });
  };

  filtrarTitulo = () => {
    const {
      filtroPorTituloAtivo,
      tituloToBeFiltered,
      marcaToBeFiltered
    } = this.state;
    if (tituloToBeFiltered.length >= 3) {
      try {
        this.filtraHomologacoesPorTituloMarca();
        this.setState({
          filtroPorTituloAtivo: true
        });
      } catch (e) {
        this.setState({ erro: true });
      }
    } else if (
      tituloToBeFiltered.length < 3 &&
      marcaToBeFiltered.length >= 3 &&
      filtroPorTituloAtivo
    ) {
      this.filtraHomologacoesPorTituloMarca();
      this.setState({
        filtroPorTituloAtivo: false,
        filtroPorMarcaAtivo: true
      });
    } else {
      if (this.state.filtroPorTituloAtivo) {
        this.loadDashBoardGestaoProdutos();
        this.setState({
          filtroPorTituloAtivo: false
        });
      }
    }
  };

  filtrarMarca() {
    const {
      marcaToBeFiltered,
      tituloToBeFiltered,
      filtroPorMarcaAtivo
    } = this.state;
    if (marcaToBeFiltered.length >= 3) {
      try {
        this.filtraHomologacoesPorTituloMarca();
        this.setState({
          filtroPorMarcaAtivo: true
        });
      } catch (e) {
        this.setState({ erro: true });
      }
    } else if (
      marcaToBeFiltered.length < 3 &&
      tituloToBeFiltered.length >= 3 &&
      filtroPorMarcaAtivo
    ) {
      this.filtraHomologacoesPorTituloMarca();
      this.setState({
        filtroPorMarcaAtivo: false,
        filtroPorTituloAtivo: true
      });
    } else {
      if (this.state.filtroPorMarcaAtivo) {
        this.loadDashBoardGestaoProdutos();
        this.setState({
          filtroPorMarcaAtivo: false
        });
      }
    }
  }

  onPesquisaChanged = values => {
    const { marcaToBeFiltered, tituloToBeFiltered } = this.state;
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      if (values.titulo === undefined) {
        values.titulo = "";
        this.setState({ tituloToBeFiltered: "" });
      }
      if (values.marca === undefined) {
        values.marca = "";
        this.setState({ marcaToBeFiltered: "" });
      }
      if (values.titulo !== tituloToBeFiltered) {
        const tituloToBeFiltered = values.titulo;
        this.setState({ tituloToBeFiltered, userTyping: true }, () => {
          this.filtrarTitulo();
        });
      }
      if (values.marca !== marcaToBeFiltered) {
        const marcaToBeFiltered = values.marca;
        this.setState({ marcaToBeFiltered, userTyping: true }, () => {
          this.filtrarMarca();
        });
      }
    }, 1000);
  };

  retornaCenarioPorTitulo = titulo => {
    switch (titulo) {
      case "Produtos suspensos":
        return true;
      case "Reclamação de produto":
        return true;
      case "Correções de Produtos":
        return true;
      case "Homologados":
        return true;
      case "Não homologados":
        return true;
      default:
        return false;
    }
  };

  apontaParaFormularioDeAlteracao = titulo => {
    const { ehTerceirizada } = this.state;
    return this.retornaCenarioPorTitulo(titulo) && ehTerceirizada;
  };

  render() {
    const { cardsFiltered, erro, loading, filtrosDesabilitados } = this.state;
    return (
      <div>
        {erro && <div>Erro ao carregar painel gerencial</div>}
        {!erro && !cardsFiltered && <div>Carregando...</div>}
        {!erro && cardsFiltered && (
          <CardBody
            titulo="Acompanhamento de produtos cadastrados"
            dataAtual={dataAtual()}
            onChange={this.onPesquisaChanged}
            ehDashboardGestaoProduto={true}
            filtrosDesabilitados={filtrosDesabilitados}
          >
            {!loading && !filtrosDesabilitados && !erro ? (
              cardsFiltered.map((card, index) => {
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
                            solicitations={formataCards(
                              card.items,
                              this.apontaParaFormularioDeAlteracao(card.titulo),
                              card.titulo
                            )}
                            icon={card.icon}
                            href={`/${GESTAO_PRODUTO}/${card.rota}`}
                            hrefCard={card.href_card}
                          />
                        </div>
                        {card2 && (
                          <div className="col-6">
                            <CardStatusDeSolicitacao
                              cardTitle={card2.titulo}
                              cardType={card2.style}
                              solicitations={formataCards(
                                card2.items,
                                this.apontaParaFormularioDeAlteracao(
                                  card2.titulo
                                ),
                                card.titulo
                              )}
                              icon={card2.icon}
                              href={`/${GESTAO_PRODUTO}/${card2.rota}`}
                              hrefCard={card2.href_card}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : !erro ? (
              <div className="carregando-conteudo">
                <Spin tip="Carregando..." />
              </div>
            ) : (
              <div>Erro ao carregar as Solicitações</div>
            )}
          </CardBody>
        )}
      </div>
    );
  }
}
