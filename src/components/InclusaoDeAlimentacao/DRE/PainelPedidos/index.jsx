import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum } from "../../../../constants";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular
} from "../../../../helpers/painelPedidos";
import { dataAtualDDMMYYYY } from "../../../../helpers/utilities";
import { getDiretoriaRegionalPedidosDeInclusaoAlimentacaoAvulsa } from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import { getDREPedidosDeInclusaoAlimentacaoDaCei } from "../../../../services/inclusaoAlimentacaoDaCei.service";
import { getDREPedidosInclusaoContinuosPendentes } from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import { Select } from "../../../Shareable/Select";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: []
    };
  }

  filtrar(filtro) {
    this.atualizarDadosDasInclusoes(filtro);
  }

  async componentDidMount() {
    const filtro = FiltroEnum.SEM_FILTRO;
    this.atualizarDadosDasInclusoes(filtro);
  }

  //FIXME: Nao trata errors, nao faz requisicoes em paralelo
  async atualizarDadosDasInclusoes(filtro) {
    const inclusoesAvulsas = await getDiretoriaRegionalPedidosDeInclusaoAlimentacaoAvulsa(
      filtro
    );
    const inclusoesContinuas = await getDREPedidosInclusaoContinuosPendentes(
      filtro
    );
    const inclusoesCei = await getDREPedidosDeInclusaoAlimentacaoDaCei(
      filtro
    );
    const inclusoesMescladas = [
      ...inclusoesAvulsas.results,
      ...inclusoesContinuas.results,
      ...inclusoesCei.results,
    ]
    const pedidosPrioritarios = filtraPrioritarios(inclusoesMescladas);
    const pedidosNoPrazoLimite = filtraNoLimite(inclusoesMescladas);
    const pedidosNoPrazoRegular = filtraRegular(inclusoesMescladas);
    this.setState({
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      loading: false
    });
  }

  render() {
    const {
      loading,
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular
    } = this.state;
    const { visaoPorCombo, valorDoFiltro } = this.props;
    return (
      <div>
        {loading ? (
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
