import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ALTERACAO_CARDAPIO,
  CODAE,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SUSPENSAO_ALIMENTACAO
} from "../../../configs/RoutesConfig";
import {
  getResumoPendenciasAlteracaoCardapio,
  getResumoPendenciasInclusaoAlimentacao,
  getResumoPendenciasInversoesCardapio,
  getResumoPendenciasKitLancheAvulso,
  getResumoPendenciasKitLancheUnificado,
  getResumoPendenciasSuspensaoCardapio
} from "../../../services/painelCODAE.service";
import { CardPendencia } from "../../Shareable/CardPendencia/CardPendencia";

class VisaoGeral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumoPendenciasInversoesCardapio: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasInclusaoAlimentacao: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasKitLancheAvulsa: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasKitLancheUnificado: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasAlteracaoCardapio: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoSuspensoesCardapio: {
        total: 0,
        informados: 0,
        ciencia: 0
      }
    };
  }

  async componentDidMount() {
    const resumoPendenciasInversoesCardapio = await getResumoPendenciasInversoesCardapio();
    const resumoPendenciasInclusaoAlimentacao = await getResumoPendenciasInclusaoAlimentacao();
    const resumoPendenciasKitLancheAvulsa = await getResumoPendenciasKitLancheAvulso();
    const resumoPendenciasKitLancheUnificado = await getResumoPendenciasKitLancheUnificado();
    const resumoPendenciasAlteracaoCardapio = await getResumoPendenciasAlteracaoCardapio();
    const resumoSuspensoesCardapio = await getResumoPendenciasSuspensaoCardapio();
    this.setState({
      resumoPendenciasInversoesCardapio,
      resumoPendenciasInclusaoAlimentacao,
      resumoPendenciasKitLancheAvulsa,
      resumoPendenciasKitLancheUnificado,
      resumoPendenciasAlteracaoCardapio,
      resumoSuspensoesCardapio
    });
  }

  render() {
    const {
      resumoPendenciasInversoesCardapio,
      resumoPendenciasInclusaoAlimentacao,
      resumoPendenciasKitLancheAvulsa,
      resumoPendenciasKitLancheUnificado,
      resumoPendenciasAlteracaoCardapio,
      resumoSuspensoesCardapio
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}>
              <CardPendencia
                cardTitle={"Pedido Unificado"}
                totalOfOrders={resumoPendenciasKitLancheUnificado.total}
                priorityOrders={resumoPendenciasKitLancheUnificado.prioritario}
                onLimitOrders={resumoPendenciasKitLancheUnificado.limite}
                regularOrders={resumoPendenciasKitLancheUnificado.regular}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/${CODAE}/${INVERSAO_CARDAPIO}`}>
              <CardPendencia
                cardTitle={"Inversão de dias de cardápio"}
                totalOfOrders={resumoPendenciasInversoesCardapio.total}
                priorityOrders={resumoPendenciasInversoesCardapio.prioritario}
                onLimitOrders={resumoPendenciasInversoesCardapio.limite}
                regularOrders={resumoPendenciasInversoesCardapio.regular}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to={`/${CODAE}/${INCLUSAO_ALIMENTACAO}`}>
              <CardPendencia
                cardTitle={"Inclusão de alimentação"}
                totalOfOrders={resumoPendenciasInclusaoAlimentacao.total}
                priorityOrders={resumoPendenciasInclusaoAlimentacao.prioritario}
                onLimitOrders={resumoPendenciasInclusaoAlimentacao.limite}
                regularOrders={resumoPendenciasInclusaoAlimentacao.regular}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE}`}>
              <CardPendencia
                cardTitle={"Kit Lanche"}
                totalOfOrders={resumoPendenciasKitLancheAvulsa.total}
                priorityOrders={resumoPendenciasKitLancheAvulsa.prioritario}
                onLimitOrders={resumoPendenciasKitLancheAvulsa.limite}
                regularOrders={resumoPendenciasKitLancheAvulsa.regular}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to={`/${CODAE}/${ALTERACAO_CARDAPIO}`}>
              <CardPendencia
                cardTitle={"Alteração de Cardápio"}
                totalOfOrders={resumoPendenciasAlteracaoCardapio.total}
                priorityOrders={resumoPendenciasAlteracaoCardapio.prioritario}
                onLimitOrders={resumoPendenciasAlteracaoCardapio.limite}
                regularOrders={resumoPendenciasAlteracaoCardapio.regular}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/${CODAE}/${SUSPENSAO_ALIMENTACAO}`}>
              <CardPendencia
                cardTitle={"Suspensão de Refeição"}
                totalOfOrders={resumoSuspensoesCardapio.total}
                priorityOrders={resumoSuspensoesCardapio.informados}
                priorityOrdersOnly={true}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default VisaoGeral;
