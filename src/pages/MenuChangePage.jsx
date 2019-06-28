import React, {Component} from 'react'
import {MenuChange} from '../components/MenuChange'
import Page from '../components/Shareable/Page';



export class MenuChangePage extends Component {
  state = {  }
  render() {
    return (
     <Page titulo="Alteração de Cardápio" tituloRastro="Solicitações">
       <MenuChange />
     </Page>
    );
  }
}
