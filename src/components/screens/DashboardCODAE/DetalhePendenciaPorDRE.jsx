import React, { Component } from "react";
import { CardPendencia } from "../../Shareable/CardPendencia/CardPendencia";
import { Field, reduxForm } from "redux-form";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";

class DetalhePendenciaPorDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vision_by: [
        {
          nome: "Visão por",
          uuid: ""
        },
        {
          nome: "Dia",
          uuid: "day"
        },
        {
          nome: "Semana",
          uuid: "week"
        },
        {
          nome: "Mês",
          uuid: "month"
        },
        {
          nome: "Lote",
          uuid: "lote"
        }
      ]
    };
  }

  handleField() {
    return null;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <h4>DRE IPIRANGA</h4>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-title-dre">
              <div>
                <div className="title-description font-weight-bold">
                  <i className="fas fa-lock" />
                  Acesso rapido as informações
                </div>
                <div className="title-card">Pendências</div>
              </div>
              <span className="combo-box">
                <Field
                  component={LabelAndCombo}
                  onChange={uuid => this.handleField(uuid)}
                  placeholder={"Visão por"}
                  options={this.state.vision_by}
                />
              </span>
            </div>

            <div className="row">
              <div className="col-6">
                <CardPendencia
                  cardTitle={"Alteração de Dias de Cardápio"}
                  totalOfOrders={10}
                  priorityOrders={2}
                  onLimitOrders={2}
                  regularOrders={6}
                />
              </div>
              <div className="col-6">
                <CardPendencia
                  cardTitle={"Kit Lanche Passeio"}
                  totalOfOrders={18}
                  priorityOrders={3}
                  onLimitOrders={5}
                  regularOrders={10}
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6">
                <CardPendencia
                  cardTitle={"Inclusão de Refeição"}
                  totalOfOrders={8}
                  priorityOrders={7}
                  onLimitOrders={0}
                  regularOrders={1}
                />
              </div>
              <div className="col-6">
                <CardPendencia
                  cardTitle={"Suspensão de Refeição"}
                  totalOfOrders={5}
                  priorityOrders={2}
                  onLimitOrders={2}
                  regularOrders={1}
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6">
                <CardPendencia
                  cardTitle={"Alteração de Cardápio"}
                  totalOfOrders={13}
                  priorityOrders={2}
                  onLimitOrders={6}
                  regularOrders={5}
                />
              </div>
              <div className="col-6">
                <CardPendencia
                  cardTitle={"Pedido Unificado"}
                  totalOfOrders={2}
                  priorityOrders={1}
                  onLimitOrders={0}
                  regularOrders={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DetalhePendenciaPorDREForm = reduxForm({
  form: "dashboardCODAE",
  enableReinitialize: true
})(DetalhePendenciaPorDRE);

export default DetalhePendenciaPorDREForm;
