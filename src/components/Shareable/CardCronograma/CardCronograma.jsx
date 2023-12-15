import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

export const CardCronograma = (props) => {
  const { cardTitle, cardType, solicitations, icon, loading, href } = props;

  const renderSolicitations = (solicitations) => {
    return solicitations.slice(0, 5).map((solicitation, key) => {
      return (
        <NavLink key={key} to={solicitation.link}>
          <p key={key} className={`data`}>
            {solicitation.text}
            <span className="float-end">{solicitation.date}</span>
          </p>
        </NavLink>
      );
    });
  };

  const renderVerMais = (solicitations) => {
    return (
      solicitations.length > 5 && (
        <NavLink
          to={`${href}`}
          className="see-more"
          data-cy={`ver-mais-${cardType}`}
        >
          Ver Mais
        </NavLink>
      )
    );
  };

  return (
    <div className={`card card-panel-cronograma card-colored ${cardType}`}>
      <div className={`card-title-status ajuste-icones`}>
        <div>
          <i className={"fas " + icon} />
          {cardTitle}
        </div>
        {loading && (
          <img src="/assets/image/ajax-loader.gif" alt="ajax-loader" />
        )}
        <span className="float-end my-auto">Data</span>
      </div>
      <hr />
      {renderSolicitations(solicitations)}
      {renderVerMais(solicitations)}
    </div>
  );
};

export default CardCronograma;
