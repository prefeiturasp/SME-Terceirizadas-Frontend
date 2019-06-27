import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Collapse } from "react-collapse";
import { Stand } from "react-burgers";

const styleHeader = {
  padding: "0.75rem 1.25rem",
  marginBottom: 0,
  backgroundColor: "#fff",
  borderBottom: "1px solid #e3e6f0",
  color: "#035D96",
  fontWeight: "bold",
  letterSpacing: "0.01em",
  fontStyle: "normal",
  fonFamily: "Roboto",
  height: "4em"
};

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
      <div id="accordion">
        <div className="card mt-3">
          <div className="card-header" id="headingOne" style={styleHeader}>
            <div className="row">
              <div className="col-11">
                <i class="fas fa-history mr-2" />
                {titulo}
              </div>
              <div className="col-1">
                <Stand
                  onClick={() => this.setState({ collapsed: !collapsed })}
                  color={"#C8C8C8"}
                  width={30}
                  padding={0}
                  lineSpacing={5}
                  className="float-right"
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
      </div>
    );
  }
}

export default reduxForm({
  form: "cardHistorico"
})(CardHistorico);
