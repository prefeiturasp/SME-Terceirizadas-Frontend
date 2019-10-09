import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { getCODAEPedidosDeInversoes } from "../../../../services/inversaoDeDiaDeCardapio.service";
import { CardInversaoPendenciaAprovacao } from "../../components/CardPendenciaAprovacao";
import { TIPODECARD } from "../../../../constants/cardsPrazo.constants";
import CardHistorico from "../../components/CardHistorico";
import { filtraPrioritarios } from "../../../../helpers/painelPedidos";
import {
  filtraNoLimite,
  filtraRegular
} from "../../../SolicitacaoDeKitLanche/helper";
import { formatarPedidos } from "./helper";
import { CODAE } from "../../../../configs/constants";
import { dataAtualDDMMYYYY } from "../../../../helpers/utilities";
import Select from "../../../Shareable/Select";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: []
    };
  }

  filtrar(filtro) {
    getCODAEPedidosDeInversoes(filtro).then(response => {
      let pedidosPrioritarios = filtraPrioritarios(response.results);
      let pedidosNoPrazoLimite = filtraNoLimite(response.results);
      let pedidosNoPrazoRegular = filtraRegular(response.results);
      this.setState({
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

  render() {
    const {
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular
    } = this.state;
    const { visaoPorCombo, pedidosAprovados, pedidosReprovados } = this.props;
    const todosOsPedidosForamCarregados = true;
    return (
      <div>
        {!todosOsPedidosForamCarregados ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-3 font-10 my-auto">
                    Data: {dataAtualDDMMYYYY()}
                  </div>
                  <div className="offset-6 col-3 text-right">
                    <Field
                      component={Select}
                      name="visao_por"
                      naoDesabilitarPrimeiraOpcao
                      onChange={event =>
                        this.onFiltroSelected(event.target.value)
                      }
                      placeholder={"Filtro por"}
                      options={visaoPorCombo}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <CardInversaoPendenciaAprovacao
                      titulo={
                        "Solicitações próximas ao prazo de vencimento (2 dias ou menos)"
                      }
                      tipoDeCard={TIPODECARD.PRIORIDADE}
                      pedidos={pedidosPrioritarios}
                      ultimaColunaLabel={"Data"}
                      parametroURL={CODAE}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12">
                    <CardInversaoPendenciaAprovacao
                      titulo={"Solicitações no prazo limite"}
                      tipoDeCard={TIPODECARD.NO_LIMITE}
                      pedidos={pedidosNoPrazoLimite}
                      ultimaColunaLabel={"Data"}
                      parametroURL={CODAE}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12">
                    <CardInversaoPendenciaAprovacao
                      titulo={"Solicitações no prazo regular"}
                      tipoDeCard={TIPODECARD.REGULAR}
                      pedidos={pedidosNoPrazoRegular}
                      ultimaColunaLabel={"Data"}
                      parametroURL={CODAE}
                    />
                  </div>
                </div>
                {pedidosAprovados.length > 0 && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardHistorico
                        pedidos={formatarPedidos(pedidosAprovados)}
                        ultimaColunaLabel={"Data(s)"}
                        titulo={
                          "Histórico de Inclusões de Alimentação Autorizadas"
                        }
                        parametroURL={CODAE}
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
                          "Histórico de Inclusões de Alimentação Reprovadas"
                        }
                        parametroURL={CODAE}
                      />
                    </div>
                  </div>
                )}
              </div>
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
