import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  CardInversaoPendenciaAprovacao,
  TIPO_CARD_ENUM
} from "../../components/CardPendenciaAprovacao";
import {
  getSuspensoesDeAlimentacaoInformadas,
  getSuspensaoDeAlimentacaoTomadaCiencia
} from "../../../../services/suspensaoDeAlimentacao.service.js";
import CardHistorico from "../../components/CardHistorico";
import { formatarPedidos } from "./helper";
import { TERCEIRIZADA } from "../../../../configs/constants";
import Select from "../../../Shareable/Select";
import { dataAtualDDMMYYYY } from "../../../../helpers/utilities";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacoesCarregadas: 0,
      todasSolicitacoes: [],
      todasSolicitacoesTomadaCiencia: []
    };
  }

  filtrar() {
    let todasSolicitacoes = [];
    this.setState({ solicitacoesCarregadas: 0 });
    getSuspensoesDeAlimentacaoInformadas().then(response => {
      todasSolicitacoes = response;
      this.setState({
        todasSolicitacoes,
        solicitacoesCarregadas: this.state.solicitacoesCarregadas + 1
      });
    });
  }

  filtrarSolicitacoesTomadasCiencia() {
    let todasSolicitacoesTomadaCiencia = [];
    this.setState({ solicitacoesCarregadas: 0 });
    getSuspensaoDeAlimentacaoTomadaCiencia().then(response => {
      todasSolicitacoesTomadaCiencia = response.data.results;
      this.setState({
        todasSolicitacoesTomadaCiencia
      });
    });
  }

  componentDidMount() {
    this.filtrarSolicitacoesTomadasCiencia();
    this.filtrar();
  }

  render() {
    const {
      solicitacoesCarregadas,
      todasSolicitacoes,
      todasSolicitacoesTomadaCiencia
    } = this.state;
    const { visaoPorCombo } = this.props;
    const todosOsPedidosForamCarregados = solicitacoesCarregadas;
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
                      tipoDeCard={TIPO_CARD_ENUM.PRIORIDADE}
                      totalSOlicitacoes={todasSolicitacoes}
                      pedidos={todasSolicitacoes}
                      ultimaColunaLabel={"Data"}
                      parametroURL={TERCEIRIZADA}
                    />
                  </div>
                </div>
                {todasSolicitacoesTomadaCiencia.length > 0 && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardHistorico
                        pedidos={formatarPedidos(
                          todasSolicitacoesTomadaCiencia
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
