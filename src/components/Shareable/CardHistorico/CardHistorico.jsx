import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Collapse } from "react-collapse";
import { Stand } from "react-burgers";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";
import "./style.scss";

export class CardHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.selecionarTodos = this.selecionarTodos.bind(this);
  }


  handleClickSubmit = e => {
    alert("it will be submited");
  };

  selecionarTodos() {
    this.props.trs.forEach((tr) => {
      this.props.change(`check_${tr._id}`, !this.props.selecionar_todos);
    })
    this.props.change("selecionar_todos", !this.props.selecionar_todos)
  }
  render() {
    const { titulo, thead, trs, handleSubmit } = this.props;
    const { collapsed } = this.state;
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
                      onClick={(value) =>
                        this.selecionarTodos()
                      }
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
              <table className="table">
                <thead>
                  <td />
                  {thead.map(value => {
                    return <th>{value}</th>;
                  })}
                </thead>
                <tbody>
                  {trs.map((value, key) => {
                    return (
                      <tr>
                        <td className="td-check">
                          <label
                            htmlFor={`check_${value._id}`}
                            className="checkbox-label"
                          >
                            <Field
                              component={"input"}
                              type="checkbox"
                              name={`check_${value._id}`}
                            />
                            <span
                              onClick={() =>
                                this.props.change(
                                  `check_${value._id}`,
                                  true
                                )
                              }
                              className="checkbox-custom"
                            />
                          </label>
                        </td>
                        <td>{value._id}</td>
                        <td>{value.escola}</td>
                        <td>{value.quantidade}</td>
                      </tr>
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
