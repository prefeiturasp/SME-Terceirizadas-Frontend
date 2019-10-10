import React, { Component } from "react";
import { CardPendenciaAprovacao } from "../../components/CardPendenciaAprovacao";
import { LabelAndCombo } from "../../../Shareable/labelAndInput/labelAndInput";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { formatarPedidos } from "./helper";
import { getDiretoriaRegionalPedidosDeAlteracaoCardapio } from "../../../../services/alteracaoDecardapio.service";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular
} from "../../../../helpers/painelPedidos";
import CardHistorico from "../../components/CardHistorico";
import { DRE } from "../../../../configs/constants";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosCarregados: false,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: []
    };
  }

  filtrar(filtro) {
    getDiretoriaRegionalPedidosDeAlteracaoCardapio(filtro).then(response => {
      let pedidosPrioritarios = filtraPrioritarios(response.results);
      let pedidosNoPrazoLimite = filtraNoLimite(response.results);
      let pedidosNoPrazoRegular = filtraRegular(response.results);
      this.setState({
        pedidosCarregados: true,
        pedidosPrioritarios,
        pedidosNoPrazoLimite,
        pedidosNoPrazoRegular
      });
    });
  }

  componentDidMount() {
    this.filtrar(FiltroEnum.SEM_FILTRO);
  }

  onFiltroSelected(value) {
    switch (value) {
      case FiltroEnum.HOJE:
        this.filtrarHoje();
        break;
      default:
        this.filtrar(value);
        break;
    }
  }

  filtrarHoje() {
    let pedidosPrioritarios = [];
    this.setState({ pedidosCarregados: 2 });

    getDiretoriaRegionalPedidosDeAlteracaoCardapio(FiltroEnum.HOJE).then(
      response => {
        pedidosPrioritarios = pedidosPrioritarios.concat(response.results);
        this.setState({
          pedidosPrioritarios,
          pedidosCarregados: this.state.pedidosCarregados + 1
        });
      }
    );
  }

  render() {
    const {
      pedidosCarregados,
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular
    } = this.state;
    const {
      visaoPorCombo,
      valorDoFiltro,
      pedidosAutorizados,
      pedidosReprovados
    } = this.props;
    const todosOsPedidosForamCarregados = pedidosCarregados === true;
    return (
      <div>
        {!todosOsPedidosForamCarregados ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <div>
              <div className="row">
                <div className="col-7">
                  <div className="page-title">
                    Alteração de Cardápio - Pendente Validação
                  </div>
                </div>
                <div className="col-5">
                  <div className="row">
                    <div className="col-6">
                      <span>Vencimento para:</span>
                    </div>
                    <div className="col-6">
                      <Field
                        component={LabelAndCombo}
                        name="visao_por"
                        onChange={value => this.onFiltroSelected(value)}
                        placeholder={"Visão por dia"}
                        options={visaoPorCombo}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <CardPendenciaAprovacao
                    titulo={
                      "Solicitações próximas ao prazo de vencimento (2 dias ou menos)"
                    }
                    tipoDeCard={"priority"}
                    pedidos={pedidosPrioritarios}
                    ultimaColunaLabel={"Data da Inclusão"}
                    parametroURL={DRE}
                  />
                </div>
              </div>
              {valorDoFiltro !== "hoje" && (
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenciaAprovacao
                      titulo={"Solicitações no prazo limite"}
                      tipoDeCard={"on-limit"}
                      pedidos={pedidosNoPrazoLimite}
                      ultimaColunaLabel={"Data da Inclusão"}
                      parametroURL={DRE}
                    />
                  </div>
                </div>
              )}
              {valorDoFiltro !== "hoje" && (
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenciaAprovacao
                      titulo={"Solicitações no prazo regular"}
                      tipoDeCard={"regular"}
                      pedidos={pedidosNoPrazoRegular}
                      ultimaColunaLabel={"Data da Inclusão"}
                      parametroURL={DRE}
                    />
                  </div>
                </div>
              )}
              {pedidosAutorizados.length > 0 && (
                <div className="row pt-3">
                  <div className="col-12">
                    <CardHistorico
                      pedidos={formatarPedidos(pedidosAutorizados)}
                      ultimaColunaLabel={"Data(s)"}
                      parametroURL={DRE}
                      titulo={"Histórico de Alterações de Cardápio Autorizadas"}
                    />
                  </div>
                </div>
              )}
              {pedidosReprovados.length > 0 && (
                <div className="row pt-3">
                  <div className="col-12">
                    <CardHistorico
                      pedidos={formatarPedidos(pedidosReprovados)}
                      ultimaColunaLabel={"Data(s)"}
                      titulo={"Histórico de Alterações de Cardápio Reprovadas"}
                      parametroURL={DRE}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    );
  }
}

const PainelPedidosForm = reduxForm({
  form: "painelPedidos",
  enableReinitialize: true
})(PainelPedidos);
const selector = formValueSelector("painelPedidos");
const mapStateToProps = state => {
  return {
    valorDoFiltro: selector(state, "visao_por")
  };
};

export default connect(mapStateToProps)(PainelPedidosForm);
