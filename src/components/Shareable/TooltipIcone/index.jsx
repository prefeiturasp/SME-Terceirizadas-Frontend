import PropTypes from "prop-types";
import React from "react";
import "../style.scss";
import { Tooltip } from "antd";

export const TooltipIcone = props => {
  const { tooltipText, icone } = props;
  const iconeClass = "fas " + icone;
  return (
    <Tooltip title={tooltipText}>
      &nbsp;
      <i className={iconeClass} />
    </Tooltip>
  );
};

TooltipIcone.propTypes = {
  tooltipText: PropTypes.string,
  icone: PropTypes.string
};

TooltipIcone.defaultProps = {
  tooltipText: "",
  icone: "fa-question-circle"
};

export default TooltipIcone;
