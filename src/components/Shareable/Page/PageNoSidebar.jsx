import React from "react";
import { withRouter } from "react-router-dom";
import { Header } from "../Header";
import Breadcrumb from "../Breadcrumb";
import BotaoVoltar from "./BotaoVoltar";
import "./style.scss";

const PageNoSidebar = ({ voltarPara, children, history }) => {
  return (
    <div id="wrapper">
      <Header toggled={false} />
      <div id="content-wrapper" className="pt-5">
        <div className={`d-flex flex-column p-4 mt-5`}>
          <Breadcrumb home={"/"} />
          <div className="card p-3 page-no-sidebar-card">
            <div>
              <BotaoVoltar location={history.location} to={voltarPara} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PageNoSidebar);
