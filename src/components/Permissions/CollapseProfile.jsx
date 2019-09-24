import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import CollapsePermission from "./CollapsePermission";
import ModalProfile from "./ModalProfile";

class CollapseProfile extends Component {
  PERMISSIONS = [
    { id_: 1, name: "Suspender Alimentação" },
    { id_: 2, name: "Adicionar Alimentação" },
    { id_: 3, name: "Solicitar Kit Lanche" },
    { id_: 4, name: "Cadastro de Usuário" },
    { id_: 5, name: "Alterar alimetação" },
    { id_: 6, name: "Cadastro de unidade escolar" }
  ];

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      show: false
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  render() {
    const { idHeading, dataTarget, labelLink, profileList, _id } = this.props;
    const styling = { color: "#686868", fontSize: "14px" };

    const { open } = this.state;

    return (
      <div>
        <ModalProfile
          show={this.state.show}
          close={this.handleClose.bind(this)}
          role={labelLink}
          _id={_id}
        />

        <div className="card mb-2">
          <div className="card-header" id={idHeading}>
            <h5 className="mt-2 float-left">{labelLink}</h5>
            <h5 className="mb-0 float-right">
              <button
                type="button"
                className="btn btn-link"
                arial-expanded={open}
                aria-controls={dataTarget}
                onClick={this.handleClick.bind(this)}
              >
                <span style={styling}>
                  <i
                    className={
                      open ? "fas fa-chevron-up" : "fas fa-chevron-down"
                    }
                  />
                </span>
              </button>
            </h5>
          </div>

          <Collapse in={open}>
            <div id={dataTarget} className="card-body">
              {profileList.map((value, key) => {
                return (
                  <CollapsePermission
                    labelProfile={value.role}
                    idProfile={key}
                    permissionList={this.PERMISSIONS}
                  />
                );
              })}
              <button
                onClick={this.handleShow.bind(this)}
                type="button"
                className="mt-1 btn btn-outline-primary btn-lg btn-block"
              >
                + Adicionar Novo Perfil
              </button>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default CollapseProfile;
