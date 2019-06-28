import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Stand } from "react-burgers";
import { Collapse } from "react-collapse";
import "./custom.css";

export const SolicitationStatusCard = props => {
  const { cardTitle, cardType, solicitations, icon, href } = props;
  return (
    <div className={"card card-panel " + cardType}>
      <div className="card-title-status">
        <i className={"fas " + icon} />
        {cardTitle}
      </div>
      <hr />
      {solicitations.slice(0, 3).map((solicitation, key) => {
        return (
          <p className="data">
            {solicitation.text}
            <span className="float-right">{solicitation.date}</span>
          </p>
        );
      })}
      {solicitations.length > 3 && (
        <NavLink to={`${href}`} className="see-more">
          Ver Mais
        </NavLink>
      )}
    </div>
  );
};

export const PendencyCard = props => {
  const {
    cardTitle,
    totalOfOrders,
    priorityOrders,
    onLimitOrders,
    regularOrders
  } = props;
  return (
    <div className="card card-pendency">
      <div className="card-title">{cardTitle}</div>
      <hr />
      <div className="row">
        <div className="col-4">
          <div className="order-box">
            <span className="number">{totalOfOrders}</span>
            <span className="order">pedidos</span>
          </div>
        </div>
        <div className="col-8">
          <div className="order-lines">
            <div className="label" />
            <span className="text">
              <span className="value">{priorityOrders} </span>Próximo ao prazo
              de vencimento
            </span>
          </div>
          <div className="order-lines">
            <div className="label" />
            <span className="text">
              <span className="value">{onLimitOrders} </span>Pedidos no prazo
              limite
            </span>
          </div>
          <div className="order-lines">
            <div className="label" />
            <span className="text">
              <span className="value">{regularOrders} </span>Pedidos no prazo
              regular
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

PendencyCard.propTypes = {
  cardTitle: PropTypes.string,
  totalOfOrders: PropTypes.number,
  priorityOrders: PropTypes.number,
  onLimitOrders: PropTypes.number,
  regularOrders: PropTypes.number
};

export class CardPendenciaAprovacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      pedidosFiltrados: this.props.pedidos
    };
    this.filtrarPedidos = this.filtrarPedidos.bind(this);
  }

  filtrarPedidos(event) {
    if (event === undefined) event = { target: { value: "" } };
    let pedidosFiltrados = this.props.pedidos;
    pedidosFiltrados = pedidosFiltrados.filter(function(item) {
      const palavraAFiltrar = event.target.value.toLowerCase();
      return (
        item.escola.nome.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.escola.cod_eol.includes(palavraAFiltrar)
      );
    });
    this.setState({ pedidosFiltrados });
  }

  render() {
    const { titulo, tipoDeCard, totalDePedidos, totalDeEscolas } = this.props;
    const { collapsed, pedidosFiltrados } = this.state;
    return (
      <div className="card card-pendency-approval">
        <div className={"card-title " + tipoDeCard}>{titulo}</div>
        <div className="row">
          <div className="col-2">
            <div className={"order-box " + tipoDeCard}>
              <span className="number">{totalDePedidos}</span>
              <span className="order">pedidos</span>
            </div>
          </div>
          <div className="col-9">
            <div className="order-lines">
              <div className="label" />
              <span className="text">
                <span className="value">{totalDeEscolas} </span>escolas
                solicitantes
              </span>
            </div>
          </div>
          <div className="col-1">
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
          </div>
        </div>
        <Collapse isOpened={!collapsed}>
          <div className="row ml-1 mr-1">
            <div style={{ display: "inline-flex" }} className="w-100 col-12">
              <input
                type="text"
                className="form-control "
                placeholder="Pesquisar"
                onChange={this.filtrarPedidos}
              />
              <i className="fas fa-search" />
            </div>
            <table className="orders-table mt-4">
              <thead>
                <tr>
                  <th>Nº Pedido</th>
                  <th>Código</th>
                  <th>Nome da Escola</th>
                  <th>Qtd solicitada</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido, key) => {
                  return (
                    <tr>
                      <td>{pedido.id}</td>
                      <td>{pedido.escola.cod_eol}</td>
                      <td>{pedido.escola.nome}</td>
                      <td>{pedido.quantidade}</td>
                    </tr>
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

export const StatusFlow = props => {
  const { listaDeStatus } = props;
  return (
    <div className="w-100">
      <ul className="progressbar-titles">
        {listaDeStatus.map((status, key) => {
          return <li>{status.nome}</li>;
        })}
      </ul>
      <ul className="progressbar">
        {listaDeStatus.map((status, key) => {
          return (
            <li
              className={
                status.status === "aprovado"
                  ? "active"
                  : status.status === "reprovado"
                  ? "disapproved"
                  : status.status === "cancelado"
                  ? "cancelled"
                  : ""
              }
              style={{ width: 100 / listaDeStatus.length + "%" }}
            >
              {status.timestamp}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
