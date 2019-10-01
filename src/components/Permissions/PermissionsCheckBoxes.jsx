import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
import "react-datepicker/dist/react-datepicker.css";
import {
  CheckBoxListDefault,
  CheckBoxListDashboard
} from "./../Shareable/CheckboxList";

class PermissionsCheckBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddFoodFeature: false,
      openMenuChangeFeature: false,
      openMealKitFeature: false,
      openDayMenuChangeFeature: false,
      openOrderDashboardFeature: false,
      openMenuSuspensionFeature: false,
      openMenuSpecialDietFeature: false,
      openSpecialDietDashboardFeature: false
    };
  }

  translate = word => {
    switch (word) {
      case "school":
        return "Escola";
      case "director":
        return "Diretor";
      case "direction-assistant":
        return "Assistente de Direção";
      case "submanager":
        return "Cogestor";
      case "admin":
        return "Administrador";
      case "nutritionist":
        return "Nutricionista";
      case "supervisor":
        return "Supervisor";
      case "special-diet":
        return "Dieta Especial";
      case "research-and-development":
        return "P & D";
      case "financial":
        return "Financeiro";
      case "company":
        return "Empresa Terceirizada";
      case "manager":
        return "Gestor";
      default:
        return word;
    }
  };
  render() {
    const {
      openAddFoodFeature,
      openMenuChangeFeature,
      openMealKitFeature,
      openDayMenuChangeFeature,
      openMenuSuspensionFeature,
      openMenuSpecialDietFeature,
      openOrderDashboardFeature,
      openSpecialDietDashboardFeature
    } = this.state;
    const { type, subtype } = this.props.match.params;
    return (
      <div className="accordion">
        <h3 className="category">
          Permissões de {this.translate(type)} - {this.translate(subtype)}
        </h3>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openAddFoodFeature: !openAddFoodFeature
                  })
                }
                type="button"
                aria-controls="add-food-feature-toggle"
                aria-expanded={openAddFoodFeature}
              >
                Inclusão de Refeição
              </button>
            </h5>
          </div>
          <Collapse in={openAddFoodFeature}>
            <div id="add-food-feature-toggle">
              <CheckBoxListDefault typeOfFeature={"Inclusão"} />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openMenuChangeFeature: !openMenuChangeFeature
                  })
                }
                type="button"
                aria-controls="menu-change-feature-toggle"
                aria-expanded={openMenuChangeFeature}
              >
                Alteração de Cardápio
              </button>
            </h5>
          </div>
          <Collapse in={openMenuChangeFeature}>
            <div id="menu-change-feature-toggle">
              <CheckBoxListDefault typeOfFeature={"Alteração"} />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openMealKitFeature: !openMealKitFeature
                  })
                }
                type="button"
                aria-controls="meal-kit-feature-toggle"
                aria-expanded={openMealKitFeature}
              >
                Solicitação de Kit Lanche Passeio
              </button>
            </h5>
          </div>
          <Collapse in={openMealKitFeature}>
            <div id="meal-kit-feature-toggle">
              <CheckBoxListDefault typeOfFeature={"Solicitação"} />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openDayMenuChangeFeature: !openDayMenuChangeFeature
                  })
                }
                type="button"
                aria-controls="day-menu-change-feature-toggle"
                aria-expanded={openDayMenuChangeFeature}
              >
                Alteração de Dia de Cardápio
              </button>
            </h5>
          </div>
          <Collapse in={openDayMenuChangeFeature}>
            <div id="day-menu-change-feature-toggle">
              <CheckBoxListDefault typeOfFeature={"Alteração"} />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openOrderDashboardFeature: !openOrderDashboardFeature
                  })
                }
                type="button"
                aria-controls="order-dashboard-feature-toggle"
                aria-expanded={openDayMenuChangeFeature}
              >
                Dashboard de Todos os Pedidos
              </button>
            </h5>
          </div>
          <Collapse in={openOrderDashboardFeature}>
            <div id="order-dashboard-feature-toggle">
              <CheckBoxListDashboard />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openMenuSuspensionFeature: !openMenuSuspensionFeature
                  })
                }
                type="button"
                aria-controls="suspension-menu-feature-toggle"
                aria-expanded={openMenuSuspensionFeature}
              >
                Suspensão de Cardápio
              </button>
            </h5>
          </div>
          <Collapse in={openMenuSuspensionFeature}>
            <div id="suspension-menu-feature-toggle">
              <CheckBoxListDefault typeOfFeature={"Suspensão"} />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openMenuSpecialDietFeature: !openMenuSpecialDietFeature
                  })
                }
                type="button"
                aria-controls="special-diet-feature-toggle"
                aria-expanded={openMenuSpecialDietFeature}
              >
                Solicitação de Dieta Especial
              </button>
            </h5>
          </div>
          <Collapse in={openMenuSpecialDietFeature}>
            <div id="special-diet-feature-toggle">
              <CheckBoxListDefault typeOfFeature={"Solicitação"} />
            </div>
          </Collapse>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    openSpecialDietDashboardFeature: !openSpecialDietDashboardFeature
                  })
                }
                type="button"
                aria-controls="order-dashboard-feature-toggle"
                aria-expanded={openSpecialDietDashboardFeature}
              >
                Dashboard de Pedidos Dieta Especial
              </button>
            </h5>
          </div>
          <Collapse in={openSpecialDietDashboardFeature}>
            <div id="order-dashboard-feature-toggle">
              <CheckBoxListDashboard />
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default PermissionsCheckBoxes;
