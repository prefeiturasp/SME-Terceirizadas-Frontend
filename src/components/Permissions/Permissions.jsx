import React, { Component } from "react";
import { connect } from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import { Link } from "react-router-dom";
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
      <div className="container">
        <div className="accordion">
          <h3 className="category">Permissões</h3>
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
                <div>
                  <Link className="permission" to="/permissions-root/permissions/school/director">Diretor</Link>
                </div>
                <div>
                  <Link className="permission" to="/permissions-root/permissions/school/direction-assistant">Assistente de Direção</Link>
                </div>
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
                <div>
                  <Link className="permission" to="/permissions-root/permissions/DRE/submanager">Cogestor</Link>
                </div>
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
                <div>
                  <Link className="permission" to="/permissions-root/permissions/CODAE/admin">Administrador</Link>
                </div>
                <div>
                  <Link className="permission" to="/permissions-root/permissions/CODAE/nutritionist">Nutricionista</Link>
                </div>
                <div>
                  <Link className="permission" to="/permissions-root/permissions/CODAE/supervisor">Supervisor</Link>
                </div>
                <div>
                  <Link className="permission" to="/permissions-root/permissions/CODAE/special-diet">Dieta Especial</Link>
                </div>
                <div>
                  <Link className="permission" to="/permissions-root/permissions/CODAE/research-and-development">
                    Pesquisa & Desenvolvimento
                  </Link>
                </div>
                <div>
                  <Link className="permission" to="/permissions-root/permissions/CODAE/financial">Financeiro</Link>
                </div>
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
                <div>
                  <Link className="permission" to="/permissions-root/permissions/company/manager">Gestor</Link>
                </div>
              </div>
            </Collapse>
          </div>
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
