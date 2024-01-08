import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum, TIPODECARD } from "../../../../constants/shared";
import {
  filtraPrioritarios,
  ordenarPedidosDataMaisRecente,
} from "../../../../helpers/painelPedidos";
import { dataAtualDDMMYYYY } from "../../../../helpers/utilities";
import { getCODAEPedidosDeInversoes } from "../../../../services/inversaoDeDiaDeCardapio.service";
import Select from "../../../Shareable/Select";
import {
  filtraNoLimite,
  filtraRegular,
} from "../../../SolicitacaoDeKitLanche/Container/helper";
import {
  formatarOpcoesLote,
  formatarOpcoesDRE,
  usuarioEhCODAEGestaoAlimentacao,
} from "helpers/utilities";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getLotesSimples } from "services/lote.service";
import HTTP_STATUS from "http-status-codes";
import { CardInversaoPendenciaAprovacao } from "../../components/CardPendenteAcao";
import { ASelect } from "components/Shareable/MakeField";
import { Select as SelectAntd } from "antd";

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
    };
    this.setFiltros = this.setFiltros.bind(this);
  }

  filtrar(filtro, paramsFromPrevPage = {}) {
    getCODAEPedidosDeInversoes(filtro, paramsFromPrevPage).then((response) => {
      let pedidosPrioritarios = ordenarPedidosDataMaisRecente(
        filtraPrioritarios(response.results)
      );
      let pedidosNoPrazoLimite = ordenarPedidosDataMaisRecente(
        filtraNoLimite(response.results)
      );
      let pedidosNoPrazoRegular = ordenarPedidosDataMaisRecente(
        filtraRegular(response.results)
      );
      this.setState({
        pedidosPrioritarios,
        pedidosNoPrazoLimite,
        pedidosNoPrazoRegular,
      });
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

  componentDidMount() {
    this.getLotesAsync();
    this.getDiretoriasRegionaisAsync();
    const paramsFromPrevPage = this.props.filtros || {
      lote: [],
      diretoria_regional: [],
    };
    this.filtrar(FiltroEnum.SEM_FILTRO, paramsFromPrevPage);
    if (this.props.filtros) {
      this.props.change(
        "diretoria_regional",
        this.props.filtros.diretoria_regional
      );
      this.props.change("lote", this.props.filtros.lote);
    }
  }

  onFiltroSelected(value) {
    const { filtros } = this.state || { lotes: [], diretorias_regionais: [] };
    switch (value) {
      case FiltroEnum.HOJE:
        this.filtrarHoje();
        break;
      default:
        this.filtrar(value, filtros);
        break;
    }
  }

  render() {
    const {
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      diretoriasRegionais,
      lotes,
      filtros,
    } = this.state;

    const { visaoPorCombo } = this.props;
    const todosOsPedidosForamCarregados = true;
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
                  {usuarioEhCODAEGestaoAlimentacao() ? (
                    <>
                      <div className="offset-3 col-3">
                        <Field
                          component={ASelect}
                          showSearch
                          onChange={(value) => {
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
                          onChange={(value) => {
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
                          this.onFiltroSelected(event.target.value)
                        }
                        placeholder={"Filtro por"}
                        options={visaoPorCombo}
                      />
                    </div>
                  )}
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <CardInversaoPendenciaAprovacao
                      titulo={
                        "Solicitações próximas ao prazo de vencimento (2 dias ou menos)"
                      }
                      tipoDeCard={TIPODECARD.PRIORIDADE}
                      pedidos={pedidosPrioritarios}
                      ultimaColunaLabel={"Data"}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12">
                    <CardInversaoPendenciaAprovacao
                      titulo={"Solicitações no prazo limite"}
                      tipoDeCard={TIPODECARD.NO_LIMITE}
                      pedidos={pedidosNoPrazoLimite}
                      ultimaColunaLabel={"Data"}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12">
                    <CardInversaoPendenciaAprovacao
                      titulo={"Solicitações no prazo regular"}
                      tipoDeCard={TIPODECARD.REGULAR}
                      pedidos={pedidosNoPrazoRegular}
                      ultimaColunaLabel={"Data"}
                    />
                  </div>
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
  enableReinitialize: true,
})(PainelPedidos);
const selector = formValueSelector("painelPedidos");
const mapStateToProps = (state) => {
  return {
    valorDoFiltro: selector(state, "visao_por"),
  };
};

export default connect(mapStateToProps)(PainelPedidosForm);
