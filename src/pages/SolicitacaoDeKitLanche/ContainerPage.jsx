import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Container from "../../components/SolicitacaoDeKitLanche/Container";
import { HOME } from "../../constants/config.constants";
import {SOLICITACAO_KIT_LANCHE, ESCOLA, DRE, CODAE, TERCEIRIZADA} from "../../configs/constants";


export class PainelPedidosBase extends React.Component {
  render(){
    const atual = {
      href: `/${this.props.VISAO}/${SOLICITACAO_KIT_LANCHE}`,
      titulo: "Solicitação de Kit Lanche Passeio"
    };
    return (
      <Page titulo={atual.titulo}>
        <Breadcrumb home={HOME} atual={atual} />
        <Container />
      </Page>
    )
  }
}


// Escola
export const PainelPedidosEscola = () => <PainelPedidosBase VISAO={ESCOLA} />;
// DRE
export const PainelPedidosDRE = () => (
  <PainelPedidosBase VISAO={DRE} />
);
// CODAE
export const PainelPedidosCODAE = () => (
  <PainelPedidosBase VISAO={CODAE} />
);

//TERCEIRIZADA
export const PainelPedidosTerceirizada = () => (
  <PainelPedidosBase VISAO={TERCEIRIZADA} />
);
