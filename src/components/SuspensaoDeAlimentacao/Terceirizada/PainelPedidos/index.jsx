import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import {
  CardInversaoPendenciaAprovacao,
  TIPO_CARD_ENUM
} from "../../components/CardPendenciaAprovacao";
import { getSuspensoesDeAlimentacaoInformadas } from "../../../../services/suspensaoDeAlimentacao.service.js";
import { filtraSolicitacoes } from "./helper.js"

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacoesCarregadas: 0,
      todasSolicitacoes: [],
    };
  }

  filtrar() {
    let todasSolicitacoes = [];
    this.setState({ solicitacoesCarregadas: 0 });
    getSuspensoesDeAlimentacaoInformadas().then(response => {
      todasSolicitacoes = filtraSolicitacoes(response.results);
      this.setState({
        //todasSolicitacoes,
        solicitacoesCarregadas: this.state.solicitacoesCarregadas + 1
      });
    });
  }

  componentDidMount() {
    this.filtrar();
  }



  render() {
    const {
      solicitacoesCarregadas,
      todasSolicitacoes,
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
                    Inversão de dia de Cardápio - Pendente Validação
                  </div>
                </div>
                <div className="col-5">
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <CardInversaoPendenciaAprovacao
                    titulo={
                      "Pedidos próximos ao prazo de vencimento (2 dias ou menos)"
                    }
                    tipoDeCard={TIPO_CARD_ENUM.PRIORIDADE}
                    pedidos={todasSolicitacoes}
                    ultimaColunaLabel={"Data da Inclusão"}
                    parametroURL={"terceirizada"}
                  />
                </div>
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
