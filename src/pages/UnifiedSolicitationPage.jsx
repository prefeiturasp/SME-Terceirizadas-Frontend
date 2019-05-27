import React from 'react'
import { Sidebar } from '../components/Main/Sidebar';
import { Header } from '../components/Main/Header';
import UnifiedSolicitationContainer from '../components/UnifiedSolicitation/UnifiedSolicitationContainer';

export default props => (
  <div id="wrapper">
    <Header />
    <Sidebar />
    <div id="content-wrapper" className="pt-5">
    <div className="d-flex flex-column p-4 mt-5">
      <UnifiedSolicitationContainer />
    </div>
    </div>
  </div>
)
