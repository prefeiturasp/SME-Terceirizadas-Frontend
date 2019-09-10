import React, { Component } from "react";
import { Stand } from "react-burgers";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { INVERSAO_CARDAPIO, RELATORIO } from "../../../../configs/constants";
import { talvezPluralizar } from "../../../../helpers/utilities";
import { calcularNumeroDeEscolasUnicas } from "./helper";
import "./style.scss";

export const TIPO_CARD_ENUM = {
  LIMITE: "on-limit",
  REGULAR: "regular",
  PRIORIDADE: "priority"
};

export class CardInversaoPendenciaAprovacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      pedidosFiltrados: []
    };
    this.filtrarPedidos = this.filtrarPedidos.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pedidos.length !== this.state.pedidosFiltrados.length) {
      this.setState({ pedidosFiltrados: this.props.pedidos });
    }
  }

  filtrarPedidos(event) {
    if (event === undefined) event = { target: { value: "" } };
    let pedidosFiltrados = this.props.pedidos;
    pedidosFiltrados = pedidosFiltrados.filter(function(item) {
      const palavraAFiltrar = event.target.value.toLowerCase();
      return (
        item.id_externo.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.escola.nome.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.escola.codigo_eol.includes(palavraAFiltrar)
      );
    });
    this.setState({ pedidosFiltrados });
  }

  render() {
    const {
      pedidos,
      titulo,
      tipoDeCard,
      ultimaColunaLabel,
      parametroURL
    } = this.props;
    const { collapsed, pedidosFiltrados } = this.state;
    return (
      <div className="card card-pendency-approval">
        <div className={"card-title " + tipoDeCard}>{titulo}</div>
        <div className="row">
          <div className="col-2">
            <div className={"order-box " + tipoDeCard}>
              <span className="number">{pedidos.length}</span>
              <span className="order">
                {`${talvezPluralizar(
                  calcularNumeroDeEscolasUnicas(pedidos),
                  "pedido"
                )}`}
              </span>
            </div>
          </div>
          {pedidos.length > 0 && (
            <div className="col-9">
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">
                    {calcularNumeroDeEscolasUnicas(pedidos)}{" "}
                  </span>
                  {`
                  ${talvezPluralizar(
                    calcularNumeroDeEscolasUnicas(pedidos),
                    "escola"
                  )} ${talvezPluralizar(
                    calcularNumeroDeEscolasUnicas(pedidos),
                    "solicitante"
                  )}
                  `}
                </span>
              </div>
            </div>
          )}
          <div className="col-1">
            {pedidos.length > 0 && (
              <Stand
                onClick={() => this.setState({ collapsed: !collapsed })}
                color={"#C8C8C8"}
                width={18}
                padding={0}
                lineHeight={3}
                lineSpacing={3}
                className="float-right"
                active={!collapsed}
              />
            )}
          </div>
        </div>
        <Collapse isOpened={!collapsed}>
          <div className="row">
            <div className="input-search-full-width col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar"
                onChange={this.filtrarPedidos}
              />
              <i className="fas fa-search inside-input" />
            </div>
            <table className="orders-table mt-4 ml-3 mr-3">
              <thead>
                <tr className="row">
                  <th className="col-2">Código do Pedido</th>
                  <th className="col-2">Código EOL</th>
                  <th className="col-3">Nome da Escola</th>
                  <th className="col-5">{ultimaColunaLabel || "Data"}</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.length > 0 &&
                  pedidosFiltrados.map((pedido, key) => {
                    return (
                      <Link
                        to={`/${parametroURL}/${INVERSAO_CARDAPIO}/${RELATORIO}?uuid=${
                          pedido.uuid
                        }`}
                      >
                        <tr className="row">
                          <td className="col-2">{pedido.id_externo}</td>
                          <td className="col-2">{pedido.escola.codigo_eol}</td>
                          <td className="col-3">{pedido.escola.nome}</td>
                          <td className="col-5">
                            {pedido.data_de} -> {pedido.data_para}
                          </td>
                        </tr>
                      </Link>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Collapse>
      </div>
    );
  }
}
