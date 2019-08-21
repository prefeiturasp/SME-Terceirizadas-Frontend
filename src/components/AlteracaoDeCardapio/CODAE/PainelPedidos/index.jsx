import React, { Component } from "react";
import { CardPendenciaAprovacao } from "../../Components/CardPendenciaAprovacao";
import { LabelAndCombo } from "../../../Shareable/labelAndInput/labelAndInput";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { formatarPedidos } from "./helper";
import {
  getCodaePedidosPrioritarios as prioritarios,
  getCodaePedidosNoPrazoLimite as limites,
  getCodaePedidosNoPrazoRegular as regulares
} from "../../../../services/alteracaoDecardapio.service";
import CardHistorico from "./CardHistorico";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosCarregados: 0,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: []
    };
  }

  filtrar(filtro) {
    let pedidosPrioritarios = [];
    let pedidosNoPrazoLimite = [];
    let pedidosNoPrazoRegular = [];
    this.setState({ pedidosCarregados: 0 });

    prioritarios(filtro).then(response => {
      pedidosPrioritarios = pedidosPrioritarios.concat(response.results);
      this.setState({
        pedidosPrioritarios,
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    limites(filtro).then(response => {
      pedidosNoPrazoLimite = pedidosNoPrazoLimite.concat(response.results);
      this.setState({
        pedidosNoPrazoLimite,
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    regulares(filtro).then(response => {
      pedidosNoPrazoRegular = pedidosNoPrazoRegular.concat(response.results);
      this.setState({
        pedidosNoPrazoRegular,
        pedidosCarregados: this.state.pedidosCarregados + 1
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

    prioritarios(FiltroEnum.HOJE).then(response => {
      pedidosPrioritarios = pedidosPrioritarios.concat(response.results);
      this.setState({
        pedidosPrioritarios,
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });
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
      pedidosAprovados,
      pedidosReprovados
    } = this.props;
    const todosOsPedidosForamCarregados = pedidosCarregados === 3;
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
                    Alteração de Cardápio - Pendente Autorização
                  </div>
                </div>
                <div className="col-5">
                  <div className="row">
                    <div classame="col-6">
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
                      "Pedidos próximos ao prazo de vencimento (2 dias ou menos)"
                    }
                    tipoDeCard={"priority"}
                    pedidos={pedidosPrioritarios}
                    ultimaColunaLabel={"Data da Inclusão"}
                    parametroURL={"codae"}
                  />
                </div>
              </div>
              {valorDoFiltro !== "hoje" && (
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenciaAprovacao
                      titulo={"Pedidos no prazo limite"}
                      tipoDeCard={"on-limit"}
                      pedidos={pedidosNoPrazoLimite}
                      ultimaColunaLabel={"Data da Inclusão"}
                      parametroURL={"codae"}
                    />
                  </div>
                </div>
              )}
              {valorDoFiltro !== "hoje" && (
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenciaAprovacao
                      titulo={"Pedidos no prazo regular"}
                      tipoDeCard={"regular"}
                      pedidos={pedidosNoPrazoRegular}
                      ultimaColunaLabel={"Data da Inclusão"}
                      parametroURL={"codae"}
                    />
                  </div>
                </div>
              )}
              {pedidosAprovados.length > 0 && (
                <div className="row pt-3">
                  <div className="col-12">
                    <CardHistorico
                      pedidos={formatarPedidos(pedidosAprovados)}
                      ultimaColunaLabel={"Data(s)"}
                      titulo={"Histórico de Alterações de Cardápio Aprovadas"}
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
                      titulo={
                        "Histórico de Alterações de Cardápio Reprovadas"
                      }
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
