import React, { Component } from "react";

import CollapseProfile from './CollapseProfile'

class Permissions extends Component {
  render() {
    const {permissions} = this.props
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
                            idHeading={'ESCOLA'} 
                            dataTarget={key}
                            labelLink={value.institutions} 
                            profileList={value.profiles}
                      />
              
            })
          }
          </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Permissions
