import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { talvezPluralizar } from "../../../../helpers/utilities";
import { calcularNumeroDeDREsUnicas } from "./helper";
import "./style.scss";
import { SOLICITACAO_KIT_LANCHE_UNIFICADA } from "../../../../configs/constants";
import { ToggleExpandir } from "../../../Shareable/ToggleExpandir";

export const TIPO_CARD_ENUM = {
  LIMITE: "on-limit",
  REGULAR: "regular",
  PRIORIDADE: "priority"
};

export class CardPendenciaAprovacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      pedidosFiltrados: [],
      filtrado: false
    };
    this.filtrarPedidos = this.filtrarPedidos.bind(this);
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.props.pedidos.length !== nextProps.pedidosFiltrados.length) {
      if (this.state.filtrado === false) {
        this.setState({ pedidosFiltrados: this.props.pedidos });
      }
    }
  }

  filtrarPedidos(event) {
    if (event === undefined) event = { target: { value: "" } };
    let pedidosFiltrados = this.props.pedidos;
    pedidosFiltrados = pedidosFiltrados.filter(function(item) {
      const palavraAFiltrar = event.target.value.toLowerCase();
      return (
        item.id_externo.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.diretoria_regional.nome.toLowerCase().search(palavraAFiltrar) !==
          -1
        //item.lote.nome.includes(palavraAFiltrar)
      );
    });
    this.setState({ pedidosFiltrados, filtrado: true });
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
      <div className="card card-pendency-approval unified-solicitation">
        <div className={"card-title " + tipoDeCard}>{titulo}</div>
        <div className="row">
          <div className="col-2">
            <div className={"order-box " + tipoDeCard}>
              <span className="number">{pedidos.length}</span>
              <span className="order">
                {pedidos.length === 1 ? "solicitação" : "solicitações"}
              </span>
            </div>
          </div>
          {pedidos.length > 0 && (
            <div className="col-9">
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">
                    {calcularNumeroDeDREsUnicas(pedidos)}{" "}
                  </span>
                  {`
                  ${talvezPluralizar(
                    calcularNumeroDeDREsUnicas(pedidos),
                    "escola"
                  )} ${talvezPluralizar(
                    calcularNumeroDeDREsUnicas(pedidos),
                    "solicitante"
                  )}
                  `}
                </span>
              </div>
            </div>
          )}
          <div className="col-1">
            {pedidos.length > 0 && (
              <ToggleExpandir
                onClick={() => this.setState({ collapsed: !collapsed })}
                ativo={!collapsed}
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
            <table className="orders-table-unified-solicitation mt-4 mr-3">
              <thead>
                <tr className="row">
                  <th className="col-3">Código do Pedido</th>
                  <th className="col-3">Lote</th>
                  <th className="col-3">DRE</th>
                  <th className="col-3">{ultimaColunaLabel || "Data"}</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.length > 0 &&
                  pedidosFiltrados.map((pedido, key) => {
                    return (
                      <Link
                        key={key}
                        to={`/${parametroURL}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}/relatorio?uuid=${
                          pedido.uuid
                        }`}
                      >
                        <tr className="row">
                          <td className="col-3">{pedido.id_externo}</td>
                          <td className="col-3">
                            {pedido.escolas_quantidades[0] &&
                              pedido.escolas_quantidades[0].escola.lote.nome}
                          </td>
                          <td className="col-3">
                            {pedido.diretoria_regional.nome}
                          </td>
                          <td className="col-3">
                            {pedido.solicitacao_kit_lanche.data}
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
