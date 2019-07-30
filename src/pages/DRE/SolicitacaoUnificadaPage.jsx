import React from "react";
import Page from "../../components/Shareable/Page/Page";
import SolicitacaoUnificadaContainer from "../../components/SolicitacaoUnificada/SolicitacaoUnificadaContainer";

export default props => (
  <Page titulo={"Solicitação Unificada"} tituloRastro="solicitações">
    <SolicitacaoUnificadaContainer />
  </Page>
);
