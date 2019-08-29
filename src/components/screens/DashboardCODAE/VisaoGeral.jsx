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
  getResumoPendenciasInversoesCardapio,
  getResumoPendenciasInclusaoAlimentacao
} from "../../../services/painelCODAE.service";
import { CardPendencia } from "../../Shareable/CardPendencia/CardPendencia";

class VisaoGeral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumoPendenciasInversoesCardapio: {
        total: "...",
        limite: "...",
        prioritario: "...",
        regular: "..."
      },
      resumoPendenciasInclusaoAlimentacao: {
        total: "...",
        limite: "...",
        prioritario: "...",
        regular: "..."
      }
    };
  }

  async componentDidMount() {
    const resumoPendenciasInversoesCardapio = await getResumoPendenciasInversoesCardapio();
    const resumoPendenciasInclusaoAlimentacao = await getResumoPendenciasInclusaoAlimentacao();
    this.setState({
      resumoPendenciasInversoesCardapio,
      resumoPendenciasInclusaoAlimentacao
    });
  }

  render() {
    const {
      resumoPendenciasInversoesCardapio,
      resumoPendenciasInclusaoAlimentacao
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <CardPendencia
              cardTitle={"DREs"}
              totalOfOrders={255}
              priorityOrders={25}
              onLimitOrders={60}
              regularOrders={170}
            />
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
                totalOfOrders={120}
                priorityOrders={20}
                onLimitOrders={40}
                regularOrders={60}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to={`/${CODAE}/${ALTERACAO_CARDAPIO}`}>
              <CardPendencia
                cardTitle={"Alteração de Cardápio"}
                totalOfOrders={20}
                priorityOrders={5}
                onLimitOrders={10}
                regularOrders={10}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/${CODAE}/${SUSPENSAO_ALIMENTACAO}`}>
              <CardPendencia
                cardTitle={"Suspensão de Refeição"}
                totalOfOrders={47}
                priorityOrders={10}
                onLimitOrders={7}
                regularOrders={30}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}>
              <CardPendencia
                cardTitle={"Pedido Unificado"}
                totalOfOrders={2}
                priorityOrders={1}
                onLimitOrders={0}
                regularOrders={0}
              />
            </Link>
          </div>
          <div className="col-6">
            <CardPendencia
              cardTitle={"Lotes"}
              totalOfOrders={47}
              priorityOrders={10}
              onLimitOrders={7}
              regularOrders={30}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VisaoGeral;
