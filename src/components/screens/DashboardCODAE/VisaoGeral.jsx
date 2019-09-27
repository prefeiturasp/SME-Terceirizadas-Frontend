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
} from "../../../configs/constants";
import {
  getResumoPendenciasAlteracaoCardapio,
  getResumoPendenciasInclusaoAlimentacao,
  getResumoPendenciasInversoesCardapio,
  getResumoPendenciasKitLancheAvulso,
  getResumoPendenciasKitLancheUnificado,
  getResumoPendenciasSuspensaoCardapio
} from "../../../services/painelCODAE.service";
import { CardPendencia } from "../../Shareable/CardPendencia/CardPendencia";
const ESTADO_INICIAL = {
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
  },
  loadingUnificado: true,
  loadingKitLancheAvulso: true,
  loadingInversao: true,
  loadingSuspensao: true,
  loadingAlteracao: true,
  loadingInclusao: true
};
class VisaoGeral extends Component {
  constructor(props) {
    super(props);
    this.state = ESTADO_INICIAL;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filtro !== this.props.filtro) {
      this.setState(ESTADO_INICIAL);
      this.buscarPendencias(this.props.filtro);
    }
  }

  async componentDidMount() {
    const filtro = this.props.filtro;
    await this.buscarPendencias(filtro);
  }

  async buscarPendencias(filtro) {
    const resumoPendenciasInversoesCardapio = await getResumoPendenciasInversoesCardapio(
      filtro
    );
    this.setState({ loadingInversao: false });
    const resumoPendenciasInclusaoAlimentacao = await getResumoPendenciasInclusaoAlimentacao(
      filtro
    );
    this.setState({ loadingInclusao: false });
    const resumoPendenciasKitLancheAvulsa = await getResumoPendenciasKitLancheAvulso(
      filtro
    );
    this.setState({ loadingKitLancheAvulso: false });
    const resumoPendenciasKitLancheUnificado = await getResumoPendenciasKitLancheUnificado(
      filtro
    );
    this.setState({ loadingUnificado: false });
    const resumoPendenciasAlteracaoCardapio = await getResumoPendenciasAlteracaoCardapio(
      filtro
    );
    this.setState({ loadingAlteracao: false });
    const resumoSuspensoesCardapio = await getResumoPendenciasSuspensaoCardapio(
      filtro
    );
    this.setState({ loadingSuspensao: false });
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

      loadingUnificado,
      loadingKitLancheAvulso,
      loadingInversao,
      loadingSuspensao,
      loadingAlteracao,
      loadingInclusao
    } = this.state;
    const { quantidade_suspensoes } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <Link to={`/${CODAE}/${INCLUSAO_ALIMENTACAO}`}>
              <CardPendencia
                cardTitle={"Inclusão de alimentação"}
                totalOfOrders={resumoPendenciasInclusaoAlimentacao.total}
                priorityOrders={resumoPendenciasInclusaoAlimentacao.prioritario}
                onLimitOrders={resumoPendenciasInclusaoAlimentacao.limite}
                regularOrders={resumoPendenciasInclusaoAlimentacao.regular}
                loading={loadingInclusao}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/${CODAE}/${ALTERACAO_CARDAPIO}`}>
              <CardPendencia
                cardTitle={"Alteração de Cardápio"}
                totalOfOrders={resumoPendenciasAlteracaoCardapio.total}
                priorityOrders={resumoPendenciasAlteracaoCardapio.prioritario}
                onLimitOrders={resumoPendenciasAlteracaoCardapio.limite}
                regularOrders={resumoPendenciasAlteracaoCardapio.regular}
                loading={loadingAlteracao}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE}`}>
              <CardPendencia
                cardTitle={"Solicitação de Kit Lanche"}
                totalOfOrders={resumoPendenciasKitLancheAvulsa.total}
                priorityOrders={resumoPendenciasKitLancheAvulsa.prioritario}
                onLimitOrders={resumoPendenciasKitLancheAvulsa.limite}
                regularOrders={resumoPendenciasKitLancheAvulsa.regular}
                loading={loadingKitLancheAvulso}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/${CODAE}/${INVERSAO_CARDAPIO}`}>
              <CardPendencia
                cardTitle={"Inversão de dia de Cardápio"}
                totalOfOrders={resumoPendenciasInversoesCardapio.total}
                priorityOrders={resumoPendenciasInversoesCardapio.prioritario}
                onLimitOrders={resumoPendenciasInversoesCardapio.limite}
                regularOrders={resumoPendenciasInversoesCardapio.regular}
                loading={loadingInversao}
              />
            </Link>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-6">
            <Link to={`/${CODAE}/${SUSPENSAO_ALIMENTACAO}`}>
              <CardPendencia
                cardTitle={"Suspensão de Alimentação"}
                totalOfOrders={quantidade_suspensoes}
                priorityOrders={quantidade_suspensoes}
                priorityOrdersOnly={true}
                loading={loadingSuspensao}
              />
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}>
              <CardPendencia
                cardTitle={"Solicitação Unificada"}
                totalOfOrders={resumoPendenciasKitLancheUnificado.total}
                priorityOrders={resumoPendenciasKitLancheUnificado.prioritario}
                onLimitOrders={resumoPendenciasKitLancheUnificado.limite}
                regularOrders={resumoPendenciasKitLancheUnificado.regular}
                loading={loadingUnificado}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default VisaoGeral;
