import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { ToggleExpandir } from "./../Shareable/ToggleExpandir";
import { string } from "prop-types";
import "./style.scss";

const Card = ({ question, answer }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="card faq-card">
      <div className="container">
        <div className="row">
          <div className="col title">{question}</div>
          <div className="pr-2 col-auto">
            <ToggleExpandir
              onClick={() => setCollapsed(!collapsed)}
              ativo={!collapsed}
            />
          </div>
        </div>

        <Collapse isOpened={!collapsed}>
          <div className="card-body p-2">{answer}</div>
        </Collapse>
      </div>
    </div>
  );
};
Card.propTypes = {
  question: string,
  answer: string
};

export default Card;
