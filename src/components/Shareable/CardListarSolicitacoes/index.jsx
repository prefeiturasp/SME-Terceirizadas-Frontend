import React, { Component } from "react";
import { Field } from "redux-form";
import { Checkbox } from "../Checkbox";
import "./style.scss";

export class CardListarSolicitacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacoes: this.props.solicitacoes
    };
  }

  render() {
    const {
      titulo,
      tipo,
      selecionarTodos,
      solicitacoes,
      icone,
      onCheckClicked
    } = this.props;
    return (
      <div className={`card card-list-panel ${tipo} mb-4 mr-4`}>
        <div className="card-title-status">
          <i className={"fas " + icone} />
          {titulo}
          <span className="float-right pr-4">Data/Hora</span>
        </div>
        <hr />
        <div className="card-body card-body-sme">
          <Field
            className="small"
            component={Checkbox}
            name="selecionar_todos"
            onClick={() => selecionarTodos(solicitacoes)}
          >
            <p className="data ml-4">{"Selecionar todos"}</p>
          </Field>
          {solicitacoes.map((value, key) => {
            return (
              <div key={key} className="row">
                <div className="col-9">
                  <Field
                    className="small"
                    component={Checkbox}
                    name={`check_${key}`}
                    onClick={() => onCheckClicked(solicitacoes, key)}
                  >
                    <p className="data ml-4">{value.text}</p>
                  </Field>
                </div>
                <span className="date-time col-3 text-right">{value.date}</span>
              </div>
            );
          })}
        </div>
        <div className="pb-3" />
      </div>
    );
  }
}

export default CardListarSolicitacoes;
