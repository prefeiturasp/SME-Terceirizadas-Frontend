import React, { Component } from "react";
import { CardPendenciaAprovacao } from "../../Shareable/CardPendenciaAprovacao/CardPendenciaAprovacao";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";
import CardHistorico from "../../Shareable/CardHistorico/CardHistorico";

class OrdersDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theadList: [
        "Nº Solicitação",
        "Escola",
        "Quantidade de Alimentações solicitadas"
      ],
      trs: [
        {
          _id: 12083,
          escola: "EMEF CACILDA BECKER",
          quantidade: 1705
        },
        {
          _id: 12084,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12085,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12086,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12087,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12088,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        }
      ]
    };
  }

  render() {
    const { trs, theadList } = this.state;
    const { pedidos, vision_by } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-7">
            <div className="page-title">Kits Lanche - Pendente Aprovação</div>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col-6">
                <LabelAndCombo
                  onChange={value => this.handleField("reason", value)}
                  placeholder={"Visão por dia"}
                  options={vision_by}
                />
              </div>
              <div className="text-dark col-6 my-auto">Visão dia 25/04/2019</div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <CardPendenciaAprovacao
              titulo={
                "Pedidos próximos ao prazo de vencimento (2 dias ou menos)"
              }
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
        <div className="row pt-3">
          <div className="col-12">
            <CardHistorico
              thead={theadList}
              trs={trs}
              titulo={"Histórico de Alimentações Aprovadas"}
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <CardHistorico
              thead={theadList}
              trs={trs}
              titulo={"Histórico de Alimentações Canceladas"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OrdersDashboard;
