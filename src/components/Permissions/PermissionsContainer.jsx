import React, { Component } from "react";
import Permissions from "./Permissions";
import { connect } from "react-redux";
import * as actions from "../../actions/permission.action";

class PermissionsContainer extends Component {
  componentWillMount() {
    this.props.getPermissions();
  }

  render() {
    const { perms } = this.props;

    return <Permissions {...this.state} permissions={perms} />;
  }
}

const mapStateToProps = state => ({
  perms: state.permissions.perms
});

export default connect(
  mapStateToProps,
  actions
)(PermissionsContainer);
