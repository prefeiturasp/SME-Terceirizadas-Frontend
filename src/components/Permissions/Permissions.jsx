import React, { Component } from "react";

import CollapseProfile from './CollapseProfile'

class Permissions extends Component {
  render() {
    const { permissions } = this.props
    return (
      <div id="accordion">
        <span className="page-title">Permissões</span>
        <div className="card mt-4">
          <div className="card-body">


            <form onSubmit={null}>
              {
                permissions.map((value, key) => {
                  return <CollapseProfile
                    key={key}
                    idHeading={value.institutions}
                    dataTarget={key}
                    labelLink={value.institutions}
                    profileList={value.profiles}
                    _id={value.id}
                  />

                })
              }
              <div className="float-right mt-3">
                <button className="btn btn-lg btn-lik btn-primary pl-5 pr-5">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Permissions
