import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { Container } from "components/SolicitacaoDeKitLanche/Container";
import { Container as ContainerCEMEI } from "components/SolicitacaoKitLancheCEMEI/componentes/Container";
import PainelPedidosKitLancheDRE from "components/SolicitacaoDeKitLanche/DRE/PainelPedidos/Container";
import PainelPedidosKitLancheCODAE from "components/SolicitacaoDeKitLanche/CODAE/PainelPedidos/Container";
import PainelPedidosKitLancheTerceirizada from "components/SolicitacaoDeKitLanche/Terceirizada/PainelPedidos/Container";
import { meusDados } from "services/perfil.service";
import { HOME } from "constants/config";
import {
  SOLICITACAO_KIT_LANCHE,
  ESCOLA,
  DRE,
  CODAE,
  TERCEIRIZADA,
} from "../../configs/constants";
import { escolaEhCEMEI } from "helpers/utilities";
import { useLocation } from "react-router-dom";

export class PainelPedidosBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      quantidade_alunos: 0,
    };
  }

  componentDidMount() {
    meusDados().then((response) => {
      let meusDados = response;

      switch (this.props.VISAO) {
        case ESCOLA:
          meusDados["quantidade_alunos"] =
            response.vinculo_atual.instituicao.quantidade_alunos;
          break;
        case DRE:
          meusDados["quantidade_alunos"] =
            response.vinculo_atual.instituicao.quantidade_alunos;
          break;
        default:
          return "";
      }
      this.setState({
        meusDados,
      });
    });
  }

  render() {
    const { meusDados } = this.state;
    const atual = {
      href: `/${this.props.VISAO}/${SOLICITACAO_KIT_LANCHE}`,
      titulo: "Kit Lanche Passeio",
    };
    return (
      <Page titulo={atual.titulo} botaoVoltar>
        <Breadcrumb home={HOME} atual={atual} />
        {this.props.VISAO === ESCOLA && !escolaEhCEMEI() && meusDados && (
          <Container meusDados={meusDados} />
        )}
        {this.props.VISAO === ESCOLA && escolaEhCEMEI() && meusDados && (
          <ContainerCEMEI meusDados={meusDados} />
        )}
        {this.props.VISAO === DRE && (
          <PainelPedidosKitLancheDRE filtros={this.props.filtros} />
        )}
        {this.props.VISAO === CODAE && (
          <PainelPedidosKitLancheCODAE filtros={this.props.filtros} />
        )}
        {this.props.VISAO === TERCEIRIZADA && (
          <PainelPedidosKitLancheTerceirizada />
        )}
      </Page>
    );
  }
}

// Escola
export const PainelPedidosEscola = () => <PainelPedidosBase VISAO={ESCOLA} />;
// DRE
export const PainelPedidosDRE = () => {
  const location = useLocation();
  const filtros = location.state && location.state.filtros;
  return <PainelPedidosBase VISAO={DRE} filtros={filtros} />;
};
// CODAE
export const PainelPedidosCODAE = () => {
  const location = useLocation();
  const filtros = location.state && location.state.filtros;
  return <PainelPedidosBase VISAO={CODAE} filtros={filtros} />;
};

//TERCEIRIZADA
export const PainelPedidosTerceirizada = () => (
  <PainelPedidosBase VISAO={TERCEIRIZADA} />
);
