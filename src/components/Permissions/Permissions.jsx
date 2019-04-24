import React, { Component } from "react";
import Collapse from '../Shareable/Collapse'

class Permissions extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    return (
      <div id="accordion">
      <span className="page-title">Permissões</span>
        <div className="card mt-4">
          <div className="card-body">
            <Collapse idHeading={'teste1'} dataTarget={'content1'} labelLink={'Label1'} />
            <Collapse idHeading={'teste2'} dataTarget={'content2'} labelLink={'Label2'} />
          </div>
        </div>
      </div>
    );
  }
}

export default Permissions;
