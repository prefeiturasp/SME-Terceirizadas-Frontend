import React, { Component } from "react";
import { Stand } from "react-burgers";
import { Collapse } from "react-collapse";
import "./style.scss";

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
    console.log(pedidosFiltrados);
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
