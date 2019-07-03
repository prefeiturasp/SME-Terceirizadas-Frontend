import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Collapse } from "react-collapse";
import { Stand } from "react-burgers";
import "./style.scss";

export class CardHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  handleSelecionarTodos = e => {
    if (e.target.checked) {
      alert("its work");
    }
  };

  handleClickSubmit = e => {
    alert("it will be submited");
  };
  render() {
    const { titulo, thead, trs, handleSubmit } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-header">
          <div className="row my-auto">
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
              <label>Selecionar Todos</label>&nbsp;&nbsp;&nbsp;
              <Field
                component={"input"}
                onChange={event => this.handleSelecionarTodos(event)}
                type={"checkbox"}
              />
              <div className="float-right">
                <button
                  onClick={this.handleClickSubmit}
                  title="Imprimir solicitações selecionadas"
                  className="btn btn-link"
                >
                  <i class="fas fa-print" />
                </button>
              </div>
              <div className="pb-3" />
              <table className="table">
                <thead>
                  <td />
                  {thead.map(value => {
                    return <td>{value}</td>;
                  })}
                </thead>
                <tbody>
                  {trs.map((value, key) => {
                    return (
                      <tr>
                        <th>
                          <Field
                            component={"input"}
                            type="checkbox"
                            name={`name_${value._id}`}
                            value={value._id}
                          />
                        </th>
                        <th>{value._id}</th>
                        <th>{value.escola}</th>
                        <th>{value.quantidade}</th>
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

export default reduxForm({
  form: "cardHistorico"
})(CardHistorico);
