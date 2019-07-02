import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const CardStatusDeSolicitacao = props => {
  const { cardTitle, cardType, solicitations, icon, href } = props;
  return (
    <div className={"card card-panel " + cardType}>
      <div className="card-title-status">
        <i className={"fas " + icon} />
        {cardTitle}
      </div>
      <hr />
      {solicitations.slice(0, 3).map((solicitation, key) => {
        return (
          <p className="data">
            {solicitation.text}
            <span className="float-right">{solicitation.date}</span>
          </p>
        );
      })}
      {solicitations.length > 3 && (
        <NavLink to={`${href}`} className="see-more">
          Ver Mais
        </NavLink>
      )}
    </div>
  );
};

export default CardStatusDeSolicitacao;
