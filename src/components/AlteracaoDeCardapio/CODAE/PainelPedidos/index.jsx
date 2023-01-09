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
import { codaeListarSolicitacoesDeAlteracaoDeCardapio } from "services/alteracaoDeCardapio";
import Select from "../../../Shareable/Select";
import {
  formatarOpcoesLote,
  formatarOpcoesDRE,
  usuarioEhCODAEGestaoAlimentacao
} from "helpers/utilities";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getLotesSimples } from "services/lote.service";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import HTTP_STATUS from "http-status-codes";
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
      loading: true,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      filtros: this.props.filtros || { lotes: [], diretorias_regionais: [] },
      lotes: [],
      diretoriasRegionais: []
    };

    this.setFiltros = this.setFiltros.bind(this);
  }

  filtrar(filtro, paramsFromPrevPage = {}) {
    Promise.all([
      codaeListarSolicitacoesDeAlteracaoDeCardapio(
        filtro,
        SOLICITACAO_NORMAL,
        paramsFromPrevPage
      ),
      codaeListarSolicitacoesDeAlteracaoDeCardapio(
        filtro,
        SOLICITACAO_CEI,
        paramsFromPrevPage
      ),
      codaeListarSolicitacoesDeAlteracaoDeCardapio(
        filtro,
        SOLICITACAO_CEMEI,
        paramsFromPrevPage
      )
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
        loading: false,
        pedidosPrioritarios,
        pedidosNoPrazoLimite,
        pedidosNoPrazoRegular
      });
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

  componentDidMount() {
    this.getLotesAsync();
    this.getDiretoriasRegionaisAsync();
    const paramsFromPrevPage = this.props.filtros || {
      lotes: [],
      diretorias_regionais: []
    };
    this.filtrar(FiltroEnum.SEM_FILTRO, paramsFromPrevPage);
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
                      tipoDeCard={"priority"}
                      pedidos={pedidosPrioritarios}
                      ultimaColunaLabel={"Data"}
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
                        ultimaColunaLabel={"Data"}
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
                        ultimaColunaLabel={"Data"}
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
