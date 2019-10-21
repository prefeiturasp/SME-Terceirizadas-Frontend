import React from "react";

const CardBody = props => (
  <div className="card mt-3">
    <div className="card-body">
      <div className="card-title font-weight-bold dashboard-card-title">
        <span>{props.titulo}</span>
        <span className="float-right">
          <input
            className="input-search"
            placeholder="Pesquisar"
            onChange={e => {
              props.onChange(e);
            }}
          />
          <i className="fas fa-search" />
        </span>
      </div>
      <div>
        <p className="current-date">
          Data: <span>{props.dataAtual}</span>
        </p>
      </div>
      {props.children}
    </div>
  </div>
);

export default CardBody;
