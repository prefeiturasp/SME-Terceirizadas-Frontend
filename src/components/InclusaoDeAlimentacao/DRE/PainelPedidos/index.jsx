import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { DRE } from "../../../../configs/constants";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { dataAtualDDMMYYYY } from "../../../../helpers/utilities";
import { getDiretoriaRegionalPedidosDeInclusaoAlimentacaoAvulsa } from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import { getDREPedidosInclusaoContinuosPendentes } from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  formatarPedidos
} from "../../../../helpers/painelPedidos";
import { Select } from "../../../Shareable/Select";
import CardHistorico from "../../components/CardHistorico";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";

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
    this.atualizarDadosDasInclusoes(filtro);
  }

  async componentDidMount() {
    const filtro = FiltroEnum.SEM_FILTRO;
    this.atualizarDadosDasInclusoes(filtro);
  }

  async atualizarDadosDasInclusoes(filtro) {
    const inclusoesAvulsas = await getDiretoriaRegionalPedidosDeInclusaoAlimentacaoAvulsa(
      filtro
    );
    const inclusoesContinuas = await getDREPedidosInclusaoContinuosPendentes(
      filtro
    );
    const inclusoesMescladas = inclusoesAvulsas.results.concat(
      inclusoesContinuas.results
    );
    const pedidosPrioritarios = filtraPrioritarios(inclusoesMescladas);
    const pedidosNoPrazoLimite = filtraNoLimite(inclusoesMescladas);
    const pedidosNoPrazoRegular = filtraRegular(inclusoesMescladas);
    this.setState({
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular
    });
  }

  render() {
    const {
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
    return (
      <div>
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
                    parametroURL={DRE}
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
                      parametroURL={DRE}
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
                      titulo={
                        "Histórico de Inclusões de Alimentação Autorizadas"
                      }
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
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
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
