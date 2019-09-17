import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { retornaTituloCardPendencias } from "./helper";
import "./style.scss";

export const CardPendencia = props => {
  const {
    cardTitle,
    totalOfOrders,
    priorityOrders,
    onLimitOrders,
    regularOrders,
    priorityOrdersOnly,
    loading
  } = props;
  return (
    <div className="card card-pendency">
      <div className="card-title ajuste-icones">
        {cardTitle}
        {loading && (
          <img src="/assets/image/ajax-loader.gif" alt="ajax-loader" />
        )}
      </div>

      <hr />
      <div className="row">
        <div className="col-4">
          <div className="order-box">
            <span className="number">{totalOfOrders || 0}</span>
            <span className="order">
              {retornaTituloCardPendencias(totalOfOrders)}
            </span>
          </div>
        </div>
        <div className="col-8">
          {priorityOrdersOnly ? (
            <div className="order-lines">
              <div className="label" />
              <span className="text">
                <span className="value">{priorityOrders || 0} </span>
                Para dar ciência
              </span>
            </div>
          ) : (
            <div className="descricao-solicitacoes">
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">{priorityOrders} </span>
                  Perto do prazo de vencimento
                </span>
              </div>
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">{onLimitOrders} </span>
                  No prazo limite
                </span>
              </div>
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">{regularOrders} </span>
                  No prazo regular
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CardPendencia.propTypes = {
  cardTitle: PropTypes.string,
  totalOfOrders: PropTypes.number,
  priorityOrders: PropTypes.number,
  onLimitOrders: PropTypes.number,
  regularOrders: PropTypes.number
};

export default CardPendencia;
