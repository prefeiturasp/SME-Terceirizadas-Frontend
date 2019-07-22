import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

export const EmpresasDoLote = props => {
  const { empresa, ativo, ultimo } = props;
  if (empresa === undefined || !ativo) return <tr />;
  return [
    <td className={"blueish " + (ultimo && "last-item")}>{empresa.nome}</td>,
    <td className={"blueish " + (ultimo && "last-item")}>
      <span>CNPJ: </span>
      {empresa.cnpj}
    </td>,
    <td className={"blueish " + (ultimo && "last-item")} colSpan="2">
      <span>Tel: </span>
      {empresa.tel}
    </td>
  ];
};

EmpresasDoLote.propTypes = {
  cardTitle: PropTypes.string,
  totalOfOrders: PropTypes.number,
  priorityOrders: PropTypes.number,
  onLimitOrders: PropTypes.number,
  regularOrders: PropTypes.number
};

export default EmpresasDoLote;
