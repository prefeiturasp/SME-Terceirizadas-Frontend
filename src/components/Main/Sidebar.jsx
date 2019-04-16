import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import './sidebar.css'
import $ from 'jquery/dist/jquery.slim'
import easing from 'jquery.easing/jquery.easing'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import { closeToggle } from './jQClick'
import Home from '../../pages/Home';
import AddFood from '../AddFood';
import { MenuChangePage } from '../../pages/MenuChangePage';
import PermissionsPage from '../../pages/PermissionsPage';
import TourRequestPage from '../../pages/TourRequestPage';
import DayChangePage from '../../pages/DayChangePage';
import AddFoodPage from '../../pages/AddFoodPage';
import FoodSuspensionPage from '../../pages/FoodSuspensionPage';


export class Sidebar extends Component {
  state = {}

  constructor(props){
    super(props)

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = event => (
    closeToggle()
  );

  render() {
    return (
      <div>
      <div className="mb-5"></div>
        <ul className="navbar-nav bg-gradiente-sme sidebar sidebar-dark accordion pl-2 pt-5" id="accordionSidebar">

          <div className="sidebar-divider my-0"></div>

          <Link className="sidebar-brand d-flex align-items-center justify-content-center" component={Home} to="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
            </div>
          </Link>
          <div className="justify-content-center mx-auto align-items-center sidebar-brand-text mx-3">
            <div className="nav-item">
              <div className="sidebar-brand-text text-center">
                <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                  Valeria Luna
                </span>
              </div>
              <Link className="nav-link text-white small text-center collapsed" href="#teste">
                <i className="fas fa-user-edit"></i>
                <span>Perfil</span>
              </Link>
            </div>
          </div>


          <hr className="sidebar-divider my-0" />


          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact component={Home}>
              <i className="fas fa-home"></i>
              <span>Home</span></NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed"
              data-toggle="collapse"
              data-target="#collapseSchool"
              aria-expanded="true"
              aria-controls="collapseTwo">
              <i className="fa fa-school"></i>
              <span>Escola</span>
            </NavLink>
            <div id="collapseSchool"
              className="collapse"
              aria-labelledby="headingSchool"
              data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Solicitações</h6>
                <NavLink activeClassName="active" className="collapse-item" to="/add-food" component={AddFood}>Adicionar Cardápio</NavLink>
                <NavLink activeClassName="active" className="collapse-item" to="/menu-change" component={MenuChangePage}>Alterar Cardápio</NavLink>
                <NavLink activeClassName="active" className="collapse-item" to="/tour-request" component={TourRequestPage}>Kit Lanche</NavLink>
                <NavLink activeClassName="active" className="collapse-item" to="/day-change" component={DayChangePage}>Alterar dia Cardápio</NavLink>
                <NavLink activeClassName="active" className="collapse-item" to="/food-suspension" component={FoodSuspensionPage}>Suspender Alimentação</NavLink>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseDre"
              aria-expanded="false"
              aria-controls="collapseTwo">
              <i className="fas fa-filter"></i>
              <span>DRE</span>
            </Link>
            <div id="collapseDre"
              className="collapse"
              aria-labelledby="headingDre"
              data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Cad 1</h6>
                <Link className="collapse-item" href="#teste">Cad 2</Link>
                <Link className="collapse-item" href="#teste">Cad 3</Link>
              </div>
            </div>
          </li>



          <li className="nav-item">
            <Link className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseCodae"
              aria-expanded="false"
              aria-controls="collapseCodae">
              <i className="fas fa-funnel-dollar"></i>
              <span>CODAE</span>
            </Link>
            <div id="collapseCodae"
              className="collapse"
              aria-labelledby="headingCodae"
              data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Cad 1</h6>
                <Link className="collapse-item" href="#teste">Cad 2</Link>
                <Link className="collapse-item" href="#teste">Cad 3</Link>
              </div>
            </div>
          </li>


          <li className="nav-item">
            <Link className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseTerc"
              aria-expanded="false"
              aria-controls="collapseTwo">
              <i className="fas fa-building"></i>
              <span>Terceirizada</span>
            </Link>
            <div id="collapseTerc" className="collapse" aria-labelledby="headingTerc" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Cad 1</h6>
                <Link className="collapse-item" href="#test">Cad 2</Link>
                <Link className="collapse-item" href="#test">Cad 3</Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseConfig"
              aria-expanded="false"
              aria-controls="collapseTwo">
              <i className="fas fa-cog"></i>
              <span>Configrações</span>
            </Link>
            <div id="collapseConfig"
                 className="collapse" aria-labelledby="headingConfig" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Dados</h6>
                <NavLink activeClassName="active" className="collapse-item" to="/permissions-root" component={PermissionsPage}>Permissões</NavLink>
              </div>
            </div>
          </li>

          <hr className="sidebar-divider" />

          <div className="text-center d-none d-md-inline collapse">
            <button title="Recolher o menu lateral" onClick={this.handleToggle} className="rounded-circle border-0" id="sidebarToggle"></button>
          </div>


          <div className="page-footer mx-auto justify-content-center mt-5 pb-2">
            <img src="/assets/image/logo_sme.svg" className="rounded float-left" alt="SME Educação" />
          </div>

        </ul>
      </div>
      );
  }
}

    // export default connect()(Sidebar);
