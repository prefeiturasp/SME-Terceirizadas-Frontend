import React, { Component } from 'react';
import './sidebar.css'
import $ from 'jquery/dist/jquery.slim'
import easing from 'jquery.easing/jquery.easing'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import { closeToggle } from './jQClick'


export class Sidebar extends Component {
  state = {}

  handleToggle = event => (
    closeToggle()
  );


  render() {
    return (
      <div>
      <div className="mb-5"></div>
        <ul className="navbar-nav bg-gradiente-sme sidebar sidebar-dark accordion pl-2 pt-5" id="accordionSidebar">

          <div className="sidebar-divider my-0"></div>

          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#teste">
            <div className="sidebar-brand-icon rotate-n-15">
              <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
            </div>
          </a>
          <div className="justify-content-center mx-auto align-items-center sidebar-brand-text mx-3">
            <div className="nav-item">
              <div className="sidebar-brand-text text-center">
                <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                  Valeria Luna
                </span>
              </div>
              <a className="nav-link text-white small text-center collapsed" href="#teste">
                <i className="fas fa-user-edit"></i>
                <span>Perfil</span>
              </a>
            </div>
          </div>


          <hr className="sidebar-divider my-0" />


          <li className="nav-item active">
            <a className="nav-link" href="#teste">
              <i className="fas fa-home"></i>
              <span>Home</span></a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseSchool"
              aria-expanded="false"
              aria-controls="collapseTwo">
              <i className="fa fa-school"></i>
              <span>Escola</span>
            </a>
            <div id="collapseSchool"
              className="collapse"
              aria-labelledby="headingSchool"
              data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Cad 1</h6>
                <a className="collapse-item" href="#teste">Cad 2</a>
                <a className="collapse-item" href="#teste">Cad 3</a>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseDre"
              aria-expanded="false"
              aria-controls="collapseTwo">
              <i className="fas fa-filter"></i>
              <span>DRE</span>
            </a>
            <div id="collapseDre"
              className="collapse"
              aria-labelledby="headingDre"
              data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Cad 1</h6>
                <a className="collapse-item" href="#teste">Cad 2</a>
                <a className="collapse-item" href="#teste">Cad 3</a>
              </div>
            </div>
          </li>



          <li className="nav-item">
            <a className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseCodae"
              aria-expanded="false"
              aria-controls="collapseCodae">
              <i className="fas fa-funnel-dollar"></i>
              <span>CODAE</span>
            </a>
            <div id="collapseCodae"
              className="collapse"
              aria-labelledby="headingCodae"
              data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Cad 1</h6>
                <a className="collapse-item" href="#teste">Cad 2</a>
                <a className="collapse-item" href="#teste">Cad 3</a>
              </div>
            </div>
          </li>


          <li className="nav-item">
            <a className="nav-link collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseTerc"
              aria-expanded="false"
              aria-controls="collapseTwo">
              <i className="fas fa-building"></i>
              <span>Terceirizada</span>
            </a>
            <div id="collapseTerc"
              className="collapse" aria-labelledby="headingTerc" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Cad 1</h6>
                <a className="collapse-item" href="#test">Cad 2</a>
                <a className="collapse-item" href="#test">Cad 3</a>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="#test" aria-expanded="false">
              <i className="fas fa-fw fa-cog"></i>
              <span>Configurações</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <div className="text-center d-none d-md-inline collapse">
            <button title="Recolher o menu lateral" onClick={this.handleToggle} className="rounded-circle border-0" id="sidebarToggle"></button>
          </div>


          {/* TODO  : import images in react */}
          <div className="page-footer mx-auto justify-content-center mt-5 pb-2">
            <img src="/assets/image/logo_sme.svg" className="rounded float-left" alt="SME Educação" />
          </div>

        </ul>
      </div>
      );
  }
}

    // export default connect()(Sidebar);
