import React, { Component } from "react";
import { calcularNumeroDeEscolasUnicas } from "./helper";
import {
  talvezPluralizar,
  gerarLinkRelatorio,
} from "../../../../helpers/utilities";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { ToggleExpandir } from "../../../Shareable/ToggleExpandir";

export class CardPendenteAcao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      pedidosFiltrados: this.props.pedidos.map((solicitacao) => {
        solicitacao["solicitacoes_similares"] =
          solicitacao.solicitacoes_similares?.map((sol_similar) => {
            sol_similar.collapsed = true;
            return sol_similar;
          });
        return solicitacao;
      }),
    };
    this.filtrarPedidos = this.filtrarPedidos.bind(this);
    this.collapseSolicitacaoSimilar =
      this.collapseSolicitacaoSimilar.bind(this);
  }

  collapseSolicitacaoSimilar(idxPedido, idxSolicitacaoSimilar) {
    const { pedidosFiltrados } = this.state;

    const novoPedidosFiltrados = pedidosFiltrados.map((pedido, index) => {
      if (index === idxPedido) {
        const solicitacaoSimilar =
          pedido.solicitacoes_similares[idxSolicitacaoSimilar];
        solicitacaoSimilar.collapsed = !solicitacaoSimilar.collapsed;
      }
      return pedido;
    });

    this.setState({ pedidosFiltrados: novoPedidosFiltrados });
  }

  filtrarPedidos(event) {
    if (event === undefined) event = { target: { value: "" } };
    let pedidosFiltrados = this.props.pedidos;
    pedidosFiltrados = pedidosFiltrados.filter(function (item) {
      const palavraAFiltrar = event.target.value.toLowerCase();
      return (
        item.id_externo.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.escola.nome.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.escola.codigo_eol.includes(palavraAFiltrar)
      );
    });
    this.setState({ pedidosFiltrados });
  }

  renderSolicitacoesSimilares(idxPedido, pedido) {
    return pedido.solicitacoes_similares?.map((solicitacao, index) => {
      return (
        <p className="gatilho-style" key={index}>
          <i className="fa fa-info-circle mr-1" aria-hidden="true" />
          <b>
            {`#${solicitacao.id_externo}`}
            <ToggleExpandir
              onClick={() => this.collapseSolicitacaoSimilar(idxPedido, index)}
              ativo={!solicitacao.collapsed}
              className="icon-padding"
            />
          </b>
        </p>
      );
    });
  }

  render() {
    const { pedidos, titulo, tipoDeCard, colunaDataLabel } = this.props;
    const { collapsed, pedidosFiltrados } = this.state;
    return (
      <div className="card card-pendency-approval food-inclusion">
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
            <table className="orders-table mt-4 ml-3 mr-3">
              <thead>
                <tr className="row">
                  <th className="col-2">Código do Pedido</th>
                  <th className="col-2">Código EOL</th>
                  <th className="col-3">Nome da Escola</th>
                  <th className="col-3">{colunaDataLabel || "Data"}</th>
                  <th className="col-2">Solic. Similares</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido, key) => {
                  const dataMaisProxima = pedido.inclusoes
                    ? pedido.inclusoes[0].data
                    : pedido.dias_motivos_da_inclusao_cei
                    ? pedido.dias_motivos_da_inclusao_cei[0].data
                    : pedido.dias_motivos_da_inclusao_cemei
                    ? pedido.dias_motivos_da_inclusao_cemei[0].data
                    : pedido.data;
                  return (
                    <Link
                      key={key}
                      to={gerarLinkRelatorio(
                        `inclusao-de-alimentacao${
                          pedido.dias_motivos_da_inclusao_cemei ? "-cemei" : ""
                        }`,
                        pedido
                      )}
                    >
                      <tr className="row">
                        <td className="col-2">{pedido.id_externo}</td>
                        <td className="col-2">{pedido.escola.codigo_eol}</td>
                        <td className="col-3">{pedido.escola.nome}</td>
                        <td className="col-3">
                          {pedido.data_inicial || dataMaisProxima}
                        </td>
                        <td className="col-2 solicitacao-consolidada-collapse">
                          {this.renderSolicitacoesSimilares(key, pedido)}
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
