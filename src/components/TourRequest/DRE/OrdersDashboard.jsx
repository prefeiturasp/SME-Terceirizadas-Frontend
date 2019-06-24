import React, { Component } from "react";
import {
  CardPendenciaAprovacao
} from "../../Shareable/DashboardShared";

class OrdersDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pedidos } = this.props;
    return (
      <div>
        <span className="page-title">Kits Lanche - Pendentes Aprovação</span>
        <div className="row pt-3">
          <div className="col-12">
            <CardPendenciaAprovacao
              titulo={"Pedidos próximos ao prazo de vencimento (2 dias ou menos)"}
              tipoDeCard={"priority"}
              totalDePedidos={20}
              totalDeEscolas={13}
              pedidos={pedidos}
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <CardPendenciaAprovacao
              titulo={"Pedidos no prazo limite"}
              tipoDeCard={"on-limit"}
              totalDePedidos={40}
              totalDeEscolas={8}
              pedidos={pedidos}
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <CardPendenciaAprovacao
              titulo={"Pedidos no prazo regular"}
              tipoDeCard={"regular"}
              totalDePedidos={60}
              totalDeEscolas={20}
              pedidos={pedidos}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OrdersDashboard;
