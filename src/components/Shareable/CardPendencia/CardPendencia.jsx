import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

export const CardPendencia = props => {
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

CardPendencia.propTypes = {
  cardTitle: PropTypes.string,
  totalOfOrders: PropTypes.number,
  priorityOrders: PropTypes.number,
  onLimitOrders: PropTypes.number,
  regularOrders: PropTypes.number
};

export default CardPendencia;
