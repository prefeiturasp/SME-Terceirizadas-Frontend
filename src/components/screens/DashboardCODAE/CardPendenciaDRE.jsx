import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Link } from "react-router-dom";
import { DETALHE_DASHBOARD_DRE, CODAE } from "../../../configs/RoutesConfig";

export const CardPendenciaDRE = props => {
  const { totalPedidos, nomeDre } = props;
  return (
    <div className="card card-pendency">
      <Link
        to={{
          pathname: `/${CODAE}/${DETALHE_DASHBOARD_DRE}`,
          state: { dre: true }
        }}
      >
        <div className="row">
          <div className="col-4 pt-3">
            <div className="order-box">
              <span className="number">{totalPedidos}</span>
              <span className="order">pedidos</span>
            </div>
          </div>
          <div className="col-8 dre-nome">DRE {nomeDre}</div>
        </div>
      </Link>
    </div>
  );
};

CardPendenciaDRE.propTypes = {
  totalPedidos: PropTypes.number,
  nomeDre: PropTypes.string
};

export default CardPendenciaDRE;
