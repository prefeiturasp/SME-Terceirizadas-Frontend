import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Container from "../../components/SolicitacaoDeKitLanche/Container";
import PainelPedidosKitLancheDRE from "../../components/SolicitacaoDeKitLanche/DRE/PainelPedidos/Container";
import PainelPedidosKitLancheCODAE from "../../components/SolicitacaoDeKitLanche/CODAE/PainelPedidos/Container";
import PainelPedidosKitLancheTerceirizada from "../../components/SolicitacaoDeKitLanche/Terceirizada/PainelPedidos/Container";
import { meusDados } from "../../services/perfil.service";
import { HOME } from "../../constants/config.constants";
import {
  SOLICITACAO_KIT_LANCHE,
  ESCOLA,
  DRE,
  CODAE,
  TERCEIRIZADA
} from "../../configs/constants";

export class PainelPedidosBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: {},
      quantidade_alunos: 0
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      let meusDados = response;

      switch (this.props.VISAO) {
        case ESCOLA:
          meusDados["quantidade_alunos"] =
            response.escolas[0].quantidade_alunos;
          break;
        case DRE:
          meusDados["quantidade_alunos"] =
            response.diretorias_regionais[0].quantidade_alunos;
          break;
        default:
          return "";
      }
      this.setState({
        meusDados
      });
    });
  }

  render() {
    const atual = {
      href: `/${this.props.VISAO}/${SOLICITACAO_KIT_LANCHE}`,
      titulo: "Solicitação de Kit Lanche Passeio"
    };
    return (
      <Page titulo={atual.titulo}>
        <Breadcrumb home={HOME} atual={atual} />
        {this.props.VISAO === ESCOLA && (
          <Container meusDados={this.state.meusDados} />
        )}
        {this.props.VISAO === DRE && <PainelPedidosKitLancheDRE />}
        {this.props.VISAO === CODAE && <PainelPedidosKitLancheCODAE />}
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
export const PainelPedidosDRE = () => <PainelPedidosBase VISAO={DRE} />;
// CODAE
export const PainelPedidosCODAE = () => <PainelPedidosBase VISAO={CODAE} />;

//TERCEIRIZADA
export const PainelPedidosTerceirizada = () => (
  <PainelPedidosBase VISAO={TERCEIRIZADA} />
);
