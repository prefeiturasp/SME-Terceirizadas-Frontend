import React, { Component } from "react";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { Select } from "../../../Shareable/Select";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { getCODAEPedidosDeInclusaoAlimentacaoContinua } from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import { getCODAEPedidosDeInclusaoAlimentacaoAvulsa } from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  formatarPedidos
} from "../../../../helpers/painelPedidos";
import CardHistorico from "../../components/CardHistorico";
import { CODAE } from "../../../../configs/constants";
import { dataAtualDDMMYYYY } from "../../../../helpers/utilities";
import { TIPODECARD } from "../../../../constants/cardsPrazo.constants";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      loading: true
    };
  }

  async atualizarDadosDasInclusoes(filtro) {
    const inclusoesAvulsas = await getCODAEPedidosDeInclusaoAlimentacaoAvulsa(
      filtro
    );
    const inclusoesContinuas = await getCODAEPedidosDeInclusaoAlimentacaoContinua(
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
      pedidosNoPrazoRegular,
      loading: false
    });
  }

  filtrar(filtro) {
    this.atualizarDadosDasInclusoes(filtro);
  }

  async componentDidMount() {
    const filtro = FiltroEnum.SEM_FILTRO;
    this.atualizarDadosDasInclusoes(filtro);
  }

  render() {
    const {
      loading,
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
                      tipoDeCard={TIPODECARD.PRIORIDADE}
                      pedidos={pedidosPrioritarios}
                      ultimaColunaLabel={"Data da Inclusão"}
                      parametroURL={CODAE}
                    />
                  </div>
                </div>
                {valorDoFiltro !== "hoje" && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardPendenteAcao
                        titulo={"Solicitações no prazo limite"}
                        tipoDeCard={TIPODECARD.NO_LIMITE}
                        pedidos={pedidosNoPrazoLimite}
                        ultimaColunaLabel={"Data da Inclusão"}
                        parametroURL={CODAE}
                      />
                    </div>
                  </div>
                )}
                {valorDoFiltro !== "hoje" && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardPendenteAcao
                        titulo={"Solicitações no prazo regular"}
                        tipoDeCard={TIPODECARD.REGULAR}
                        pedidos={pedidosNoPrazoRegular}
                        ultimaColunaLabel={"Data da Inclusão"}
                        parametroURL={CODAE}
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
                        parametroURL={CODAE}
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
