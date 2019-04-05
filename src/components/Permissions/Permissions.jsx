import React, { Component } from "react";
import { connect } from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import { BrowserRouter, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./../Shareable/custom.css";

class Permissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSchool: false,
      openDRE: false,
      openCODAE: false,
      openCompany: false
    };
  }
  render() {
    const { openSchool, openDRE, openCODAE, openCompany } = this.state;
    return (
      <div className="accordion">
        <h3>Permissões</h3>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({ ...this.state, openSchool: !openSchool })
                }
                type="button"
                aria-controls="school-toggle"
                aria-expanded={openSchool}
              >
                Escola
              </button>
            </h5>
          </div>
          <Collapse in={this.state.openSchool}>
            <div id="school-toggle">
              <BrowserRouter basename="/permissions/school">
                <div>
                  <Link to="/director">Diretor</Link>
                </div>
                <div>
                  <Link to="/direction-assistant">Assistente de Direção</Link>
                </div>
              </BrowserRouter>
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({ ...this.state, openDRE: !openDRE })
                }
                type="button"
                aria-controls="dre-toggle"
                aria-expanded={openDRE}
              >
                DRE
              </button>
            </h5>
          </div>
          <Collapse in={this.state.openDRE}>
            <div id="dre-toggle">
              <BrowserRouter basename="/permissions/dre">
                <div>
                  <Link to="/submanager">Cogestor</Link>
                </div>
              </BrowserRouter>
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({ ...this.state, openCODAE: !openCODAE })
                }
                type="button"
                aria-controls="codae-toggle"
                aria-expanded={openCODAE}
              >
                CODAE
              </button>
            </h5>
          </div>
          <Collapse in={this.state.openCODAE}>
            <div id="codae-toggle">
              <BrowserRouter basename="/permissions/codae">
                <div>
                  <Link to="/admin">Administrador</Link>
                </div>
                <div>
                  <Link to="/nutritionist">Nutricionista</Link>
                </div>
                <div>
                  <Link to="/supervisor">Supervisor</Link>
                </div>
                <div>
                  <Link to="/special-diet">Dieta Especial</Link>
                </div>
                <div>
                  <Link to="/research-and-development">
                    Pesquisa & Desenvolvimento
                  </Link>
                </div>
                <div>
                  <Link to="/financial">Financeiro</Link>
                </div>
              </BrowserRouter>
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({ ...this.state, openCompany: !openCompany })
                }
                type="button"
                aria-controls="company-toggle"
                aria-expanded={openCompany}
              >
                Empresa Terceirizada
              </button>
            </h5>
          </div>
          <Collapse in={this.state.openCompany}>
            <div id="company-toggle">
              <BrowserRouter basename="/permissions/company">
                <div>
                  <Link to="/manager">Gestor</Link>
                </div>
              </BrowserRouter>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cargo: state.dayChange.cargo,
  rf: state.dayChange.cargo,
  nome: state.dayChange.nome,
  nroAlunos: state.dayChange.nroAlunos
});

export default connect(mapStateToProps)(Permissions);
