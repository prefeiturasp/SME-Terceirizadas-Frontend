import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Collapse } from "react-collapse";
import { Stand } from "react-burgers";
import { Link } from "react-router-dom";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import "./style.scss";
import { SOLICITACAO_KIT_LANCHE, RELATORIO } from "../../../../configs/constants";

export class CardHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      pedidos: []
    };
    this.selecionarTodos = this.selecionarTodos.bind(this);
  }

  componentDidMount() {
    this.setState({
      pedidos: this.props.pedidos
    });
  }

  onCheckClicked(key) {
    let pedidos = this.state.pedidos;
    pedidos[key].checked = !pedidos[key].checked;
    this.props.change(`check_${key}`, pedidos[key].checked);
    this.setState({ pedidos });
  }

  // TODO: chamar "imprimir" quando tiver endpoint definido
  handleClickSubmit = e => {};

  selecionarTodos() {
    this.props.pedidos.forEach((_, key) => {
      this.props.change(`check_${key}`, !this.props.selecionar_todos);
    });
    this.props.change("selecionar_todos", !this.props.selecionar_todos);
  }
  render() {
    const { titulo, ultimaColunaLabel, handleSubmit, parametroURL } = this.props;
    const { collapsed, pedidos } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-header">
          <div className="row">
            <div className="col-11">
              <i class="fas fa-history mr-2" />
              {titulo}
            </div>
            <div className="pl-5 col-1">
              <Stand
                onClick={() => this.setState({ collapsed: !collapsed })}
                color={"#C8C8C8"}
                width={30}
                padding={0}
                lineSpacing={5}
                active={!collapsed}
              />
            </div>
          </div>
        </div>
        <Collapse isOpened={!collapsed}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 select-all">
                  <label htmlFor="selecionar_todos" className="checkbox-label">
                    <Field
                      component={"input"}
                      type="checkbox"
                      name="selecionar_todos"
                    />
                    <span
                      onClick={() => this.selecionarTodos()}
                      className="checkbox-custom"
                    />
                    Selecionar todos
                  </label>
                  <div className="float-right">
                    <BaseButton
                      label="Imprimir"
                      icon="print"
                      type={ButtonType.BUTTON}
                      title="Imprimir solicitações selecionadas"
                      onClick={this.handleClickSubmit}
                      style={ButtonStyle.OutlinePrimary}
                    />
                  </div>
                </div>
              </div>
              <div className="pb-3" />
              <table className="table table-historic w-100">
                <thead>
                  <tr className="row">
                    <th className="col-4">ID do Pedido</th>
                    <th className="col-4">Escola</th>
                    <th className="col-4">{ultimaColunaLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.length > 0 &&
                    pedidos.map((pedido, key) => {
                      return (
                        <Link
                          to={`/${parametroURL}/${SOLICITACAO_KIT_LANCHE}/${RELATORIO}?uuid=${
                            pedido.uuid
                          }`}
                        >
                          <tr className="row">
                            <td className="td-check col-4">
                              <label
                                htmlFor={`check_${key}`}
                                className="checkbox-label"
                              >
                                <Field
                                  component={"input"}
                                  type="checkbox"
                                  name={`check_${key}`}
                                />
                                <span
                                  onClick={() => this.onCheckClicked(key)}
                                  className="checkbox-custom"
                                />
                              </label>
                              {pedido.id_externo}
                            </td>
                            <td className="col-4">{pedido.escola.nome}</td>
                            <td className="col-4">{pedido.solicitacao_kit_lanche.data}</td>
                          </tr>
                        </Link>
                      );
                    })}
                </tbody>
              </table>
            </form>
          </div>
        </Collapse>
      </div>
    );
  }
}

const CardHistoricoForm = reduxForm({
  form: "cardHistoricoForm",
  enableReinitialize: true
})(CardHistorico);

const selector = formValueSelector("cardHistoricoForm");
const mapStateToProps = state => {
  return {
    selecionar_todos: selector(state, "selecionar_todos")
  };
};

export default connect(mapStateToProps)(CardHistoricoForm);
