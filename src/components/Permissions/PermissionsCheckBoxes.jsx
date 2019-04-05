import React, { ReactDOM, Component } from "react";
import { connect } from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import { BrowserRouter, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./../Shareable/custom.css";
import { CheckBoxListDefault, CheckBoxListDashboard } from './../Shareable/CheckboxList';

class PermissionsCheckBoxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openAddFoodFeature: false,
      openMenuChangeFeature: false,
      openMealKitFeature: false,
      openDayMenuChangeFeature: false,
      openOrderDashboardFeature: false,

    };
  }
  render() {
    const { openAddFoodFeature, openMenuChangeFeature } = this.state;
    return (
      <div className="accordion">
        <h3>Permissões de Escola - Gestor</h3>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({ ...this.state, openAddFoodFeature: !openAddFoodFeature })
                }
                type="button"
                aria-controls="add-food-feature-toggle"
                aria-expanded={openAddFoodFeature}
              >
                Inclusão de Refeição
              </button>
            </h5>
          </div>
          <Collapse in={this.state.openAddFoodFeature}>
            <div id="add-food-feature-toggle">
              <CheckBoxListDashboard
                typeOfFeature={"Inclusão"}
              />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({ ...this.state, openMenuChangeFeature: !openMenuChangeFeature })
                }
                type="button"
                aria-controls="add-food-feature-toggle"
                aria-expanded={openMenuChangeFeature}
              >
                Alteração de Cardápio
              </button>
            </h5>
          </div>
          <Collapse in={this.state.openMenuChangeFeature}>
            <div id="add-food-feature-toggle">
              <CheckBoxListDashboard
                typeOfFeature={"Alteração"}
              />
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

export default connect(mapStateToProps)(PermissionsCheckBoxes);
