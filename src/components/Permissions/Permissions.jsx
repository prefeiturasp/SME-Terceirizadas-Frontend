import React, { Component } from "react";

import CollapseWithCheck from './CollapseWithCheck'

class Permissions extends Component {

  render() {
    const {permissions} = this.props
    return (
      <div id="accordion">
        <span className="page-title">Permissões</span>
        <div className="card mt-4">
          <div className="card-body">
          {
            permissions.map((value, key) => {
              return <CollapseWithCheck 
                            key={key} 
                            idHeading={'ESCOLA'} 
                            dataTarget={key}
                            labelLink={value.institutions} 
                      />
              
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Permissions
