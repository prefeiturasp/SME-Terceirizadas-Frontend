import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import CollapsePermission from './CollapsePermission';

class CollapseProfile extends Component {

  PERMISSIONS = [
    { id_: 1, name: "Suspender Alimentação" },
    { id_: 2, name: "Adicionar Alimentação" },
    { id_: 3, name: "Solicitar Kit Lanche" },
    { id_: 4, name: "Cadastro de Usuário" },
    { id_: 5, name: "Alterar alimetação" },
    { id_: 6, name: "Cadastro de unidade escolar" },
  ]

  constructor(props, context) {
    super(props, context)

    this.state = {
      open: false
    }

  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }


  render() {
    const { idHeading, dataTarget, labelLink, profileList } = this.props
    const styling = { color: "#686868", fontSize: "14px" }

    const { open } = this.state

    return (
      <div className="card mb-2">
        <div className="card-header" id={idHeading}>
          <h5 className="mt-2 float-left">{labelLink}</h5>
          <h5 className="mb-0 float-right">
            <button type="button" className="btn btn-link"
              arial-expanded={open}
              aria-controls={dataTarget}
              onClick={this.handleClick.bind(this)}>
              <span style={styling} >
                <i className="fas fa-chevron-down"></i>
              </span>
            </button>
          </h5>
        </div>

        <Collapse in={open}>


          <div id={dataTarget} className="card-body">
            {profileList.map((value, key) => {

              return <CollapsePermission
                labelProfile={value.role}
                idProfile={key}
                permissionList={this.PERMISSIONS}
              />

            })}

          </div>

        </Collapse>
      </div>
    );
  }
}

export default CollapseProfile;
