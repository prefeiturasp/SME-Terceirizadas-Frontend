import React from 'react'
import { Sidebar } from '../../components/Main/Sidebar';
import { Header } from '../../components/Main/Header';
import DashboardEscolaContainer from '../../components/DahsboardEscola/DashboardEscolaContainer';

export default props => (
  <div id="wrapper">
    <Header />
    <Sidebar />
    <div id="content-wrapper" className="pt-5">
      <div className="d-flex flex-column p-4 mt-5">
        <span className="page-title">Painel de Controle</span>
          <DashboardEscolaContainer />
      </div>
    </div>
  </div>
)
