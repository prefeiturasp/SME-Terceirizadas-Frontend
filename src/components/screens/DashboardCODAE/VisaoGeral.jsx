import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CardPendencia } from "../../Shareable/CardPendencia/CardPendencia";

class VisaoGeral extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <CardPendencia
              cardTitle={"DREs"}
              totalOfOrders={255}
              priorityOrders={25}
              onLimitOrders={60}
              regularOrders={170}
            />
          </div>
          <div className="col-6">
            <Link to="/codae/inversoes-dia-cardapio">
              <CardPendencia
                cardTitle={"Inversão de dias de cardápio"}
                totalOfOrders={50}
                priorityOrders={2}
                onLimitOrders={18}
                regularOrders={30}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to="/codae/inclusoes-de-alimentacao">
              <CardPendencia
                cardTitle={"Inclusão de Refeição"}
                totalOfOrders={16}
                priorityOrders={8}
                onLimitOrders={2}
                regularOrders={6}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to="/codae/kits-lanche">
              <CardPendencia
                cardTitle={"Kit Lanche"}
                totalOfOrders={120}
                priorityOrders={20}
                onLimitOrders={40}
                regularOrders={60}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to="/codae/alteracoes-de-cardapio">
              <CardPendencia
                cardTitle={"Alteração de Cardápio"}
                totalOfOrders={20}
                priorityOrders={5}
                onLimitOrders={10}
                regularOrders={10}
              />
            </Link>
          </div>
          <div className="col-6">
            <CardPendencia
              cardTitle={"Suspensão de Refeição"}
              totalOfOrders={47}
              priorityOrders={10}
              onLimitOrders={7}
              regularOrders={30}
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to="/codae/solicitacoes-unificadas">
              <CardPendencia
                cardTitle={"Pedido Unificado"}
                totalOfOrders={2}
                priorityOrders={1}
                onLimitOrders={0}
                regularOrders={0}
              />
            </Link>
          </div>
          <div className="col-6">
            <CardPendencia
              cardTitle={"Lotes"}
              totalOfOrders={47}
              priorityOrders={10}
              onLimitOrders={7}
              regularOrders={30}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VisaoGeral;
