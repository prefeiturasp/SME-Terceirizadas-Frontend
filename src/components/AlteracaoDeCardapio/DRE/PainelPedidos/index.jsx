import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum, TIPO_SOLICITACAO } from "constants/shared";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  ordenarPedidosDataMaisRecente
} from "../../../../helpers/painelPedidos";
import { dataAtualDDMMYYYY, safeConcatOn } from "../../../../helpers/utilities";
import { dreListarSolicitacoesDeAlteracaoDeCardapio } from "services/alteracaoDeCardapio";
import Select from "../../../Shareable/Select";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";

const {
  SOLICITACAO_NORMAL,
  SOLICITACAO_CEI,
  SOLICITACAO_CEMEI
} = TIPO_SOLICITACAO;

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
    Promise.all([
      dreListarSolicitacoesDeAlteracaoDeCardapio(filtro, SOLICITACAO_NORMAL),
      dreListarSolicitacoesDeAlteracaoDeCardapio(filtro, SOLICITACAO_CEI),
      dreListarSolicitacoesDeAlteracaoDeCardapio(filtro, SOLICITACAO_CEMEI)
    ]).then(([response, ceiResponse, cemeiResponse]) => {
      const results = safeConcatOn(
        "results",
        response,
        ceiResponse,
        cemeiResponse
      );
      let pedidosPrioritarios = ordenarPedidosDataMaisRecente(
        filtraPrioritarios(results)
      );
      let pedidosNoPrazoLimite = ordenarPedidosDataMaisRecente(
        filtraNoLimite(results)
      );
      let pedidosNoPrazoRegular = ordenarPedidosDataMaisRecente(
        filtraRegular(results)
      );
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

  render() {
    const {
      pedidosCarregados,
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular
    } = this.state;
    const { visaoPorCombo, valorDoFiltro } = this.props;
    const todosOsPedidosForamCarregados = pedidosCarregados === true;
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
                      onChange={event => this.filtrar(event.target.value)}
                      placeholder={"Filtro por"}
                      options={visaoPorCombo}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenteAcao
                      titulo={
                        "Solicitações próximas ao prazo de vencimento (2 dias ou menos)"
                      }
                      tipoDeCard={"priority"}
                      pedidos={pedidosPrioritarios}
                      ultimaColunaLabel={"Data da Inclusão"}
                    />
                  </div>
                </div>
                {valorDoFiltro !== "hoje" && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardPendenteAcao
                        titulo={"Solicitações no prazo limite"}
                        tipoDeCard={"on-limit"}
                        pedidos={pedidosNoPrazoLimite}
                        ultimaColunaLabel={"Data da Inclusão"}
                      />
                    </div>
                  </div>
                )}
                {valorDoFiltro !== "hoje" && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardPendenteAcao
                        titulo={"Solicitações no prazo regular"}
                        tipoDeCard={"regular"}
                        pedidos={pedidosNoPrazoRegular}
                        ultimaColunaLabel={"Data da Inclusão"}
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
