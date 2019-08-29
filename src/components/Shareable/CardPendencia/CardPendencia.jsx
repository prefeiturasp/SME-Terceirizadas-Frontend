import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./style.scss";

export const CardPendencia = props => {
  const {
    cardTitle,
    totalOfOrders,
    priorityOrders,
    onLimitOrders,
    regularOrders,
    priorityOrdersOnly
  } = props;
  return (
    <div className="card card-pendency">
      <div className="card-title">{cardTitle}{!totalOfOrders && <img
                        src="/assets/image/ajax-loader.gif"
                        alt="ajax-loader"
                      />}</div>

      <hr />
      <div className="row">
        <div className="col-4">
          <div className="order-box">
          <span className="number">{totalOfOrders || 0}</span>
            <span className="order">pedidos</span>
          </div>
        </div>
        <div className="col-8">
          {priorityOrdersOnly ? (
            <div className="order-lines">
              <div className="label" />
              <span className="text">
                <span className="value">{priorityOrders} </span>Solicitações para dar ciência
              </span>
            </div>
          ) : (
            <Fragment>
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">{priorityOrders} </span>Próximo ao
                  prazo de vencimento
                </span>
              </div>
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">{onLimitOrders} </span>Pedidos no
                  prazo limite
                </span>
              </div>
              <div className="order-lines">
                <div className="label" />
                <span className="text">
                  <span className="value">{regularOrders} </span>Pedidos no
                  prazo regular
                </span>
              </div>
            </Fragment>
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
