import React from 'react'
import EmpresasCadastradas from '../../components/screens/Cadastros/CadastroEmpresa/EmpresasCadastradas';
import Page from '../../components/Shareable/Page/Page';

export default props => (
  <Page titulo="Empresas Cadastradas" tituloRastro="Terceirizadas">
    <EmpresasCadastradas />
  </Page>
)