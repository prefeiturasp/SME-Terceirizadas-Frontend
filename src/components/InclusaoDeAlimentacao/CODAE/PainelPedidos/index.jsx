import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum, TIPODECARD, TIPO_SOLICITACAO } from "constants/shared";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  ordenarPedidosDataMaisRecente
} from "../../../../helpers/painelPedidos";
import {
  formatarOpcoesLote,
  formatarOpcoesDRE,
  usuarioEhCODAEGestaoAlimentacao
} from "helpers/utilities";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getLotesSimples } from "services/lote.service";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import HTTP_STATUS from "http-status-codes";
import { dataAtualDDMMYYYY, safeConcatOn } from "../../../../helpers/utilities";
import { Select } from "../../../Shareable/Select";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";
import { codaeListarSolicitacoesDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      filtros: this.props.filtros || { lotes: [], diretorias_regionais: [] },
      lotes: [],
      diretoriasRegionais: [],
      loading: true
    };
    this.setFiltros = this.setFiltros.bind(this);
  }

  async atualizarDadosDasInclusoes(filtro, paramsFromPrevPage = {}) {
    const [avulsas, continuas, cei, cemei] = await Promise.all([
      codaeListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_NORMAL,
        paramsFromPrevPage
      ),
      codaeListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_CONTINUA,
        paramsFromPrevPage
      ),
      codaeListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_CEI,
        paramsFromPrevPage
      ),
      codaeListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_CEMEI,
        paramsFromPrevPage
      )
    ]);
    const inclusoes = safeConcatOn("results", avulsas, continuas, cei, cemei);
    const pedidosPrioritarios = ordenarPedidosDataMaisRecente(
      filtraPrioritarios(inclusoes)
    );
    const pedidosNoPrazoLimite = ordenarPedidosDataMaisRecente(
      filtraNoLimite(inclusoes)
    );
    const pedidosNoPrazoRegular = ordenarPedidosDataMaisRecente(
      filtraRegular(inclusoes)
    );
    this.setState({
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      loading: false
    });
  }

  async getLotesAsync() {
    const response = await getLotesSimples();
    if (response.status === HTTP_STATUS.OK) {
      this.setState({
        lotes: formatarOpcoesLote(response.data.results)
      });
    }
  }

  async getDiretoriasRegionaisAsync() {
    const response = await getDiretoriaregionalSimplissima();
    if (response.status === HTTP_STATUS.OK) {
      this.setState({
        diretoriasRegionais: formatarOpcoesDRE(response.data.results)
      });
    }
  }

  setFiltros(filtros) {
    this.setState({ filtros: filtros });
  }

  async filtrar(filtro, filtros) {
    await this.atualizarDadosDasInclusoes(filtro, filtros);
  }

  async componentDidMount() {
    this.getLotesAsync();
    this.getDiretoriasRegionaisAsync();
    const paramsFromPrevPage = this.props.filtros || {
      lotes: [],
      diretorias_regionais: []
    };
    const filtro = FiltroEnum.SEM_FILTRO;
    this.atualizarDadosDasInclusoes(filtro, paramsFromPrevPage);
  }

  render() {
    const {
      loading,
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      diretoriasRegionais,
      lotes,
      filtros
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
                  {usuarioEhCODAEGestaoAlimentacao() ? (
                    <>
                      <div className="offset-3 col-3">
                        <Field
                          component={StatefulMultiSelect}
                          name="diretorias_regionais"
                          selected={filtros.diretorias_regionais || []}
                          options={diretoriasRegionais}
                          onSelectedChanged={values_ => {
                            const filtros_ = {
                              diretorias_regionais: values_,
                              lotes: filtros.lotes
                            };
                            this.setFiltros(filtros_);
                            this.filtrar(FiltroEnum.SEM_FILTRO, filtros_);
                          }}
                          hasSelectAll
                          overrideStrings={{
                            selectSomeItems: "Filtrar por DRE",
                            allItemsAreSelected: "Todos as DREs",
                            selectAll: "Todas"
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={StatefulMultiSelect}
                          name="lotes"
                          selected={filtros.lotes || []}
                          options={lotes}
                          onSelectedChanged={values_ => {
                            const filtros_ = {
                              diretorias_regionais:
                                filtros.diretorias_regionais,
                              lotes: values_
                            };
                            this.setFiltros(filtros_);
                            this.filtrar(FiltroEnum.SEM_FILTRO, filtros_);
                          }}
                          hasSelectAll
                          overrideStrings={{
                            selectSomeItems: "Filtrar por Lote",
                            allItemsAreSelected: "Todos os lotes",
                            selectAll: "Todos"
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="offset-6 col-3 text-right">
                      <Field
                        component={Select}
                        name="visao_por"
                        naoDesabilitarPrimeiraOpcao
                        onChange={event =>
                          this.filtrar(event.target.value, filtros)
                        }
                        placeholder={"Filtro por"}
                        options={visaoPorCombo}
                      />
                    </div>
                  )}
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
