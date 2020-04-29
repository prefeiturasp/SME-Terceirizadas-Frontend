import React, { Component } from "react";
import { Select } from "../../../../Shareable/Select";
import moment from "moment";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadFiltroBusca } from "../../../../../reducers/loadFiltroBusca";
import { InputComData } from "../../../../Shareable/DatePicker";
import { Botao } from "../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../Shareable/Botao/constants";
import { required } from "../../../../../helpers/fieldValidators";
import {
  TIPO_SOLICITACAO,
  STATUS_SOLICITACAO,
  ENTER,
  DATA_MINIMA,
  DATA_MAXIMA
} from "./constantes";
import { toastError } from "../../../../Shareable/Toast/dialogs";
import "./style.scss";
import {
  usuarioEscola,
  usuarioDiretoriaRegional,
  usuarioCODAEGestaoAlimentacao,
  converterDDMMYYYYparaYYYYMMDD
} from "../../../../../helpers/utilities";
import { formataValues } from "./helper";
import { getEscolasSimplissimaPorDiretoriaRegional } from "../../../../../services/escola.service";
import { TODOS } from "../../../../../constants/shared";

class FiltrosDeBusca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDe: null,
      dataPara: null,
      dataAte: null,
      paginacao: null,
      values: null,
      escolasState: null
    };
  }

  componentDidMount() {
    this.resetForm();
  }

  componentDidUpdate() {
    if (this.props.limpaForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.props.change("status_solicitacao", TODOS);
    this.props.change("tipo_de_solicitacao", TODOS);
    this.props.setaFalseLimpaForm();
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  setaLimiteDeData(dataDe) {
    this.props.change("data_ate", null);
    const dataSelecionada = moment(dataDe, "DD/MM/YYYY");
    const hoje = moment(new Date());
    const diferencaDeDias = moment.duration(hoje.diff(dataSelecionada))._data
      .days;
    const diferencaDeMeses = moment.duration(hoje.diff(dataSelecionada))._data
      .months;

    if (diferencaDeDias <= 30 && diferencaDeMeses === 0) {
      this.setState({ dataAte: moment(new Date())._d });
    } else {
      this.setState({
        dataAte: moment(dataDe, "DD/MM/YYYY").add(30, "days")["_d"]
      });
    }
  }

  onRequest = values => {
    const data_de = converterDDMMYYYYparaYYYYMMDD(values.data_de);
    const data_ate = converterDDMMYYYYparaYYYYMMDD(values.data_ate);
    this.props.setaValuesForm(values);
    this.props
      .getPedidosESolicitacoesFiltro(formataValues(values), data_de, data_ate)
      .then(response => {
        this.props.setaPaginacao(response.count);
        if (response.results.length > 0) {
          this.props.renderizarRelatorio(response.results, response.count);
        } else {
          toastError("Nenhum resultado encontrado!");
          this.props.renderizarRelatorio(response.results);
        }
      });
  };

  onDiretoriaRegionalChanged(value) {
    if (value === TODOS) {
      this.setState({ escolasState: [{ nome: TODOS, uuid: TODOS }] });
      this.props.change("unidade_escolar", TODOS);
    } else {
      this.setState({
        escolasState: [{ nome: "Carregando...", uuid: "Carregando..." }]
      });
      getEscolasSimplissimaPorDiretoriaRegional(value).then(escolasState => {
        if (escolasState.length > 0)
          this.setState({
            escolasState: [{ nome: TODOS, uuid: TODOS }].concat(escolasState)
          });
        else
          this.setState({
            escolasState: [
              { nome: "Nenhum resultado", uuid: "Nenhum resultado" }
            ]
          });
      });
    }
  }

  render() {
    const { dataDe, dataAte, escolasState } = this.state;
    const {
      handleSubmit,
      escolas,
      diretoriasRegionais,
      diretoria_regional
    } = this.props;
    return (
      <div>
        {!escolas ? (
          <div>Carregando...</div>
        ) : (
          <section className="card mb-3 mt-2">
            <div className="card-body">
              <form
                className="grid-container"
                onSubmit={handleSubmit}
                onKeyPress={this.onKeyPress}
              >
                <div className="container-left">
                  <div className="input-unidade-escolar">
                    <label>Diretoria Regional de Educação</label>
                    <Field
                      name="diretoria_regional"
                      component={Select}
                      onChange={event =>
                        this.onDiretoriaRegionalChanged(event.target.value)
                      }
                      options={diretoriasRegionais}
                      disabled={usuarioEscola() || usuarioDiretoriaRegional()}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                  <div className="container-left-bottom">
                    <label>De</label>
                    <label>Até</label>
                    <label>Status de solicitação</label>
                    <Field
                      name="data_de"
                      component={InputComData}
                      validate={required}
                      minDate={DATA_MINIMA}
                      maxDate={DATA_MAXIMA}
                      onChange={value => {
                        this.setState({ dataDe: value });
                        this.setaLimiteDeData(value);
                      }}
                      required
                    />
                    <Field
                      name="data_ate"
                      component={InputComData}
                      disabled={dataDe !== null ? false : true}
                      validate={required}
                      minDate={moment(dataDe, "DD/MM/YYYY")._d}
                      maxDate={dataAte}
                      required
                    />
                    <Field
                      name="status_solicitacao"
                      component={Select}
                      options={STATUS_SOLICITACAO}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
                <div className="container-right">
                  <div>
                    <label>Unidade Escolar</label>
                    <Field
                      name="unidade_escolar"
                      component={Select}
                      options={escolasState || escolas}
                      disabled={
                        usuarioEscola() ||
                        (usuarioCODAEGestaoAlimentacao() &&
                          (!diretoria_regional || diretoria_regional === TODOS))
                      }
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                  <div className="container-right-bottom">
                    <label>Tipo de solicitação</label>
                    <div />
                    <Field
                      name="tipo_de_solicitacao"
                      component={Select}
                      options={TIPO_SOLICITACAO}
                      naoDesabilitarPrimeiraOpcao
                    />
                    <div className="filtrar">
                      <Botao
                        texto={"Filtrar"}
                        className={"pr-3 pl-3"}
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN}
                        onClick={handleSubmit(values => this.onRequest(values))}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}
      </div>
    );
  }
}

const FiltrosDeBuscaForm = reduxForm({
  form: "filtrosDeBuscaForm",
  enableReinitialize: true
})(FiltrosDeBusca);
const selector = formValueSelector("filtrosDeBuscaForm");
const mapStateToProps = state => {
  return {
    initialValues: state.FiltrosDeBuscaForm.data,
    diretoria_regional: selector(state, "diretoria_regional")
  };
};
const mapDispatchToProps = dispatch => {
  bindActionCreators(
    {
      loadFiltroBusca
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltrosDeBuscaForm);
