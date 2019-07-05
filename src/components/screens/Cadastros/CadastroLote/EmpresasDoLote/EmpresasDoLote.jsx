import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

export const EmpresasDoLote = props => {
  const {
    empresas
  } = props;
  return (
    <tr>
      a
    </tr>
  );
};

EmpresasDoLote.propTypes = {
  cardTitle: PropTypes.string,
  totalOfOrders: PropTypes.number,
  priorityOrders: PropTypes.number,
  onLimitOrders: PropTypes.number,
  regularOrders: PropTypes.number
};

export default EmpresasDoLote;
