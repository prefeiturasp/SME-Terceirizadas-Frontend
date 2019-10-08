import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import {
  CardInversaoPendenciaAprovacao as CardPendenciaAprovacao
} from "../../components/CardPendenciaAprovacao";
import {
  getTerceirizadasSuspensoesDeAlimentacao,
  getSuspensaoDeAlimentacaoTomadaCiencia
} from "../../../../services/suspensaoDeAlimentacao.service.js";
import CardHistorico from "../../components/CardHistorico";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  formatarPedidos
} from "./helper";
import { TERCEIRIZADA } from "../../../../configs/constants";
import { dataAtualDDMMYYYY } from "../../../../helpers/utilities";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { TIPODECARD } from "../../../../constants/cardsPrazo.constants";


class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      pedidosTomadaCiencia: [],
      pedidosCarregados: false
    };
  }

  filtrar(filtro) {
    getTerceirizadasSuspensoesDeAlimentacao(filtro).then(response => {
      let pedidosPrioritarios = filtraPrioritarios(response.results);
      let pedidosNoPrazoLimite = filtraNoLimite(response.results);
      let pedidosNoPrazoRegular = filtraRegular(response.results);
      this.setState({
        pedidosPrioritarios,
        pedidosNoPrazoLimite,
        pedidosNoPrazoRegular,
        pedidosCarregados: true
      });
    });
  }

  componentDidMount() {
    this.filtrar(FiltroEnum.SEM_FILTRO);

    getSuspensaoDeAlimentacaoTomadaCiencia().then(response => {
      this.setState({
        pedidosTomadaCiencia: response.data.results,
      });
    });

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
      pedidosNoPrazoRegular,
      pedidosTomadaCiencia,
      pedidosCarregados
    } = this.state;
    return (
      <div>
        {!pedidosCarregados ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-3 font-10 my-auto">
                    Data: {dataAtualDDMMYYYY()}
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenciaAprovacao
                      titulo={
                        "Solicitações próximas ao prazo de vencimento (2 dias ou menos)"
                      }
                      tipoDeCard={TIPODECARD.PRIORIDADE}
                      pedidos={pedidosPrioritarios}
                      ultimaColunaLabel={"Data"}
                      parametroURL={TERCEIRIZADA}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenciaAprovacao
                      titulo={"Solicitações no prazo limite"}
                      tipoDeCard={TIPODECARD.NO_LIMITE}
                      pedidos={pedidosNoPrazoLimite}
                      ultimaColunaLabel={"Data"}
                      parametroURL={TERCEIRIZADA}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenciaAprovacao
                      titulo={"Solicitações no prazo regular"}
                      tipoDeCard={TIPODECARD.REGULAR}
                      pedidos={pedidosNoPrazoRegular}
                      ultimaColunaLabel={"Data"}
                      parametroURL={TERCEIRIZADA}
                    />
                  </div>
                </div>
                {pedidosTomadaCiencia.length > 0 && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardHistorico
                        pedidos={formatarPedidos(
                          pedidosTomadaCiencia
                        )}
                        ultimaColunaLabel={"Data(s)"}
                        titulo={
                          "Histórico de Suspensão de Alimentações Tomadas Ciência"
                        }
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
