import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum, TIPODECARD, TIPO_SOLICITACAO } from "constants/shared";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  ordenarPedidosDataMaisRecente,
} from "helpers/painelPedidos";
import {
  formatarOpcoesLote,
  formatarOpcoesDRE,
  usuarioEhCODAEGestaoAlimentacao,
} from "helpers/utilities";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getLotesSimples } from "services/lote.service";
import HTTP_STATUS from "http-status-codes";
import { dataAtualDDMMYYYY, safeConcatOn } from "helpers/utilities";
import { Select } from "components/Shareable/Select";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";
import { codaeListarSolicitacoesDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";
import { ASelect } from "components/Shareable/MakeField";
import { Select as SelectAntd } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";
import { getError } from "helpers/utilities";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      filtros: this.props.filtros || {
        lote: undefined,
        diretoria_regional: undefined,
      },
      lotes: [],
      diretoriasRegionais: [],
      loading: true,
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
      ),
    ]);
    if (avulsas.status === HTTP_STATUS.BAD_REQUEST) {
      toastError(
        "Erro ao carregar inclusões normais (EMEI, EMEF, etc.): " +
          getError(avulsas.data)
      );
    }
    if (continuas.status === HTTP_STATUS.BAD_REQUEST) {
      toastError(
        "Erro ao carregar inclusões contínuas: " + getError(continuas.data)
      );
    }
    if (cei.status === HTTP_STATUS.BAD_REQUEST) {
      toastError("Erro ao carregar inclusões CEI: " + getError(cei.data));
    }
    if (cemei.status === HTTP_STATUS.BAD_REQUEST) {
      toastError("Erro ao carregar inclusões CEMEI: " + getError(cemei.data));
    }
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
      loading: false,
    });
  }

  async getLotesAsync() {
    const response = await getLotesSimples();
    if (response.status === HTTP_STATUS.OK) {
      const { Option } = SelectAntd;
      const lotes_ = formatarOpcoesLote(response.data.results).map((lote) => {
        return <Option key={lote.value}>{lote.label}</Option>;
      });
      this.setState({
        lotes: [
          <Option value="" key={0}>
            Filtrar por Lote
          </Option>,
        ].concat(lotes_),
      });
    }
  }

  async getDiretoriasRegionaisAsync() {
    const response = await getDiretoriaregionalSimplissima();
    if (response.status === HTTP_STATUS.OK) {
      const { Option } = SelectAntd;
      const dres = formatarOpcoesDRE(response.data.results).map((dre) => {
        return <Option key={dre.value}>{dre.label}</Option>;
      });
      this.setState({
        diretoriasRegionais: [
          <Option value="" key={0}>
            Filtrar por DRE
          </Option>,
        ].concat(dres),
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
      lote: undefined,
      diretoria_regional: undefined,
    };
    const filtro = FiltroEnum.SEM_FILTRO;
    this.atualizarDadosDasInclusoes(filtro, paramsFromPrevPage);
    if (this.props.filtros) {
      this.props.change(
        "diretoria_regional",
        this.props.filtros.diretoria_regional
      );
      this.props.change("lote", this.props.filtros.lote);
    }
  }

  render() {
    const {
      loading,
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      diretoriasRegionais,
      lotes,
      filtros,
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
                          component={ASelect}
                          showSearch
                          inputOnChange={(value) => {
                            const filtros_ = {
                              diretoria_regional: value || undefined,
                              lote: filtros.lote,
                            };
                            this.setFiltros(filtros_);
                            this.filtrar(FiltroEnum.SEM_FILTRO, filtros_);
                          }}
                          onBlur={(e) => {
                            e.preventDefault();
                          }}
                          name="diretoria_regional"
                          filterOption={(inputValue, option) =>
                            option.props.children
                              .toString()
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          }
                        >
                          {diretoriasRegionais}
                        </Field>
                      </div>
                      <div className="col-3">
                        <Field
                          component={ASelect}
                          showSearch
                          inputOnChange={(value) => {
                            const filtros_ = {
                              diretoria_regional: filtros.diretoria_regional,
                              lote: value || undefined,
                            };
                            this.setFiltros(filtros_);
                            this.filtrar(FiltroEnum.SEM_FILTRO, filtros_);
                          }}
                          onBlur={(e) => {
                            e.preventDefault();
                          }}
                          name="lote"
                          filterOption={(inputValue, option) =>
                            option.props.children
                              .toString()
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          }
                        >
                          {lotes}
                        </Field>
                      </div>
                    </>
                  ) : (
                    <div className="offset-6 col-3 text-end">
                      <Field
                        component={Select}
                        name="visao_por"
                        naoDesabilitarPrimeiraOpcao
                        onChange={(event) =>
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
                      colunaDataLabel={"Data da Inclusão"}
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
                        colunaDataLabel={"Data da Inclusão"}
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
                        colunaDataLabel={"Data da Inclusão"}
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
  enableReinitialize: true,
})(PainelPedidos);
const selector = formValueSelector("painelPedidos");
const mapStateToProps = (state) => {
  return {
    valorDoFiltro: selector(state, "visao_por"),
  };
};

export default connect(mapStateToProps)(PainelPedidosForm);
