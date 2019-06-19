import React from "react";
import PropTypes from "prop-types";
import "./custom.css";

export const SolicitationStatusCard = props => {
  const { cardTitle, cardType, solicitations, icon } = props;
  return (
    <div className={"card card-panel " + cardType}>
      <div className="card-title-status">
        <i className={"fas " + icon} />
        {cardTitle}
      </div>
      <hr />
      {solicitations.map((solicitation, key) => {
        return (
          <p className="data">
            {solicitation.text}
            <span className="float-right">{solicitation.date}</span>
          </p>
        );
      })}
      {solicitations.length > 2 && (
        <a href="#" className="see-more">
          Ver Mais
        </a>
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
