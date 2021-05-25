import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

export const ContadorCaracteres = props => {
  const { max, atual } = props;
  return (
    <div className="contador">
      {atual} / {max}
    </div>
  );
};

ContadorCaracteres.propTypes = {
  max: PropTypes.number,
  atual: PropTypes.number
};

export default ContadorCaracteres;
