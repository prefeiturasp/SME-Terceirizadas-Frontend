import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Collapse } from "react-collapse";
import "./style.scss";
import { ToggleExpandir } from "../../../Shareable/ToggleExpandir";
import CheckboxField from "../../../Shareable/Checkbox/Field";

export default class SeletorAlunosDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.selecionarTodos = this.selecionarTodos.bind(this);
  }

  handleClickSubmit = () => {
    alert("it will be submited");
  };

  selecionarTodos() {
    if (this.props.pedidos) {
      this.props.pedidos.forEach(pedido => {
        this.props.change(`check_${pedido.uuid}`, !this.props.selecionar_todos);
      });
    }
    this.props.change("selecionar_todos", !this.props.selecionar_todos);
  }
  render() {
    const { alunosComDietaEspecial } = this.props;
    console.log('alunosComDietaEspecial', alunosComDietaEspecial)
    const { collapsed } = this.state;
    return (
      <div className="card card-history mt-3 seletor-alunos-dieta-especial">
        <div className="card-header">
          <div className="row">
            <div className="col-2">
              {"Código EOL"}
            </div>
            <div className="col-8">
              {"Nome do Aluno"}
            </div>
            <div className="pl-5 col-1">
              <ToggleExpandir
                onClick={() => this.setState({ collapsed: !collapsed })}
                ativo={!collapsed}
              />
            </div>
          </div>
        </div>
        <Collapse isOpened={!collapsed}>
          <table className="table">
            <tbody>
              {alunosComDietaEspecial &&
                alunosComDietaEspecial.map((aluno, key) => {
                  console.log('aluno', aluno)
                  return (
                    <tr key={key}>
                      <td>
                        <Field
                          component={CheckboxField}
                          type="checkbox"
                          name={`alunosComDieta.${aluno.codigo_eol}`}
                        />
                      </td>
                      <td>{aluno.codigo_eol}</td>
                      <td>{aluno.nome}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Collapse>
      </div>
    );
  }
}