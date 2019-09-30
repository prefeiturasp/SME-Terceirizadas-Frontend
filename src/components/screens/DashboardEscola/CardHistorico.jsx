import React from "react";
import { Field, reduxForm } from "redux-form";

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

const CardHistorico = props => {
  const handleSelecionarTodos = e => {
    if (e.target.checked) {
      alert("its work");
    }
  };

  const handleClickSubmit = e => {
    alert("it will be submited");
  };

  const { titulo, thead, trs, handleSubmit } = props;
  return (
    <div id="accordion">
      <div className="card mt-3">
        <div className="card-header" id="headingOne" style={styleHeader}>
          <i className="fas fa-history mr-2" />
          {titulo}
          <a
            className="btn btn-link float-right"
            href="#collapseOne"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <i className="float-right fa fa-bars" />
          </a>
        </div>
        <div
          id="collapseOne"
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label>Selecionar Todos</label>&nbsp;&nbsp;&nbsp;
              <Field
                component={"input"}
                onChange={event => handleSelecionarTodos(event)}
                type={"checkbox"}
              />
              <div className="float-right">
                <button
                  onClick={handleClickSubmit}
                  title="Imprimir solicitações selecionadas"
                  className="btn btn-link"
                >
                  <i className="fas fa-print" />
                </button>
              </div>
              <div className="pb-3" />
              <table className="table">
                <thead>
                  <td />
                  {thead.map(value => {
                    return <td scope="row">{value}</td>;
                  })}
                </thead>
                <tbody>
                  {trs.map((value, key) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Field
                            component={"input"}
                            type="checkbox"
                            name={`name_${value._id}`}
                            value={value._id}
                          />
                        </th>
                        <th scope="row">{value._id}</th>
                        <th scope="row">{value.escola}</th>
                        <th scope="row">{value.quantidade}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "cardHistorico"
})(CardHistorico);
