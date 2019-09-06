import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import {
  CardInversaoPendenciaAprovacao,
  TIPO_CARD_ENUM
} from "../../components/CardPendenciaAprovacao";
import {
  getSuspensoesDeAlimentacaoInformadas,
  getSuspensaoDeAlimentacaoTomadaCiencia
} from "../../../../services/suspensaoDeAlimentacao.service.js";
import CardHistorico from "./CardHistorico";
import { formatarPedidos } from "./helper";
import { TERCEIRIZADA } from "../../../../configs/constants";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacoesCarregadas: 0,
      todasSolicitacoes: [],
      todasSolicitacoesTomadaCiencia: [],
      quantidadeTotal: null
    };
  }

  filtrar() {
    let todasSolicitacoes = [];
    let quantidadeTotal = null;
    this.setState({ solicitacoesCarregadas: 0 });
    getSuspensoesDeAlimentacaoInformadas().then(response => {
      todasSolicitacoes = response.results;
      quantidadeTotal = response.count;
      this.setState({
        quantidadeTotal,
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
      todasSolicitacoesTomadaCiencia,
      quantidadeTotal
    } = this.state;

    const todosOsPedidosForamCarregados = solicitacoesCarregadas;
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
                    Suspensão de Alimentação - Pendente Tomar Ciência
                  </div>
                </div>
                <div className="col-5" />
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <CardInversaoPendenciaAprovacao
                    titulo={"Pedidos para tomar ciência"}
                    tipoDeCard={TIPO_CARD_ENUM.PRIORIDADE}
                    quantidadeTotal={quantidadeTotal}
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
                      pedidos={formatarPedidos(todasSolicitacoesTomadaCiencia)}
                      ultimaColunaLabel={"Data(s)"}
                      titulo={
                        "Histórico de Suspensão de Alimentações Tomadas Ciência"
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
