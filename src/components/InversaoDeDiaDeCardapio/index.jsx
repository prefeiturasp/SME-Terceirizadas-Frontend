import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import {
  required,
  textAreaRequired,
  deveSerNoAnoCorrente
} from "../../helpers/fieldValidators";
import {
  checaSeDataEstaEntre2e5DiasUteis,
  dateDelta
} from "../../helpers/utilities";
import { loadInversaoDeDiaDeCardapio } from "../../reducers/inversaoDeDiaDeCardapio.reducer";
import {
  atualizarInversaoDeDiaDeCardapio,
  criarInversaoDeDiaDeCardapio,
  getInversoesDeDiaDeCardapio,
  inicioPedido,
  removerInversaoDeDiaDeCardapio
} from "../../services/inversaoDeDiaDeCardapio.service";
import CardMatriculados from "../Shareable/CardMatriculados";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { Rascunhos } from "./Rascunhos";
import "./style.scss";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";
import { InputComData } from "../Shareable/DatePicker";
import { TextAreaWYSIWYG } from "../Shareable/TextArea/TextAreaWYSIWYG";
import Botao from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";

export class InversaoDeDiaDeCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rascunhosInversoes: [],
      status: "SEM STATUS",
      title: "Nova Solicitação",
      salvarAtualizarLbl: "Salvar Rascunho",
      segundoDiaUtil: "",
      showModal: false,
      loading: true
    };
    this.carregarRascunho = this.carregarRascunho.bind(this);
    this.removerRascunho = this.removerRascunho.bind(this);
    this.refresh = this.refresh.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  removerRascunho(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      removerInversaoDeDiaDeCardapio(uuid).then(
        res => {
          if (res.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.refresh();
          } else {
            toastError("Houve um erro ao excluir o rascunho");
          }
        },
        function() {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
      this.resetForm();
    }
  }

  resetForm() {
    this.props.reset("inversaoDeDiaDeCardapioForm");
    this.props.loadInversaoDeDiaDeCardapio(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova Solicitação",
      salvarAtualizarLbl: "Salvar Rascunho"
    });
    this.refresh();
  }

  carregarRascunho(param) {
    const inversaoDeDiaDeCardapio = param.inversaoDeDiaDeCardapio;
    this.props.reset("inversaoDeDiaDeCardapioForm");
    this.props.loadInversaoDeDiaDeCardapio(inversaoDeDiaDeCardapio);
    this.setState({
      status: inversaoDeDiaDeCardapio.status,
      title: `Inversão de dia de Cardápio # ${
        inversaoDeDiaDeCardapio.id_externo
      }`,
      salvarAtualizarLbl: "Atualizar"
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    const { meusDados, proximos_dois_dias_uteis } = this.props;
    const { loading } = this.state;
    const dadosDaAPItotalmenteCarregados =
      meusDados !== null && proximos_dois_dias_uteis !== null && loading;
    if (dadosDaAPItotalmenteCarregados) {
      this.setState({
        loading: false
      });
    }
  }

  refresh() {
    getInversoesDeDiaDeCardapio().then(response => {
      const rascunhosInversoes = response.results;
      this.setState({ rascunhosInversoes });
    });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  validaDiasUteis = event => {
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        event.target.value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
    }
  };

  iniciarPedido(uuid) {
    inicioPedido(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Inversão de dia de Cardápio enviada com sucesso!");
          this.resetForm();
        } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao enviar a Inversão de dia de Cardápio");
        }
      },
      function() {
        toastError("Houve um erro ao enviar a Inversão de dia de Cardápio");
      }
    );
  }

  onSubmit(values) {
    values.escola = this.props.meusDados.vinculo_atual.instituicao.uuid;
    if (!values.uuid) {
      criarInversaoDeDiaDeCardapio(values).then(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          if (values.status === STATUS_DRE_A_VALIDAR) {
            this.iniciarPedido(response.data.uuid);
          } else {
            toastSuccess("Inversão de dia de Cardápio salvo com sucesso!");
            this.resetForm();
          }
        } else {
          let keys = Object.keys(response.data);
          keys.forEach(function(key) {
            toastError(response.data[key][0]);
          });
        }
      });
    } else {
      atualizarInversaoDeDiaDeCardapio(values.uuid, values).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          if (values.status === STATUS_DRE_A_VALIDAR) {
            this.iniciarPedido(response.data.uuid);
          } else {
            toastSuccess("Inversão de dia de Cardápio atualizado com sucesso!");
            this.resetForm();
          }
        } else {
          let keys = Object.keys(response.data);
          keys.forEach(function(key) {
            toastError(response.data[key][0]);
          });
        }
      });
    }
  }

  render() {
    const { showModal, loading, rascunhosInversoes } = this.state;
    const {
      handleSubmit,
      pristine,
      submitting,
      proximos_dois_dias_uteis,
      meusDados
    } = this.props;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={
                meusDados.vinculo_atual.instituicao.quantidade_alunos || 0
              }
            />
            {rascunhosInversoes.length > 0 && (
              <div className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  rascunhosInversoes={rascunhosInversoes}
                  removerRascunho={this.removerRascunho}
                  resetForm={() => this.resetForm()}
                  carregarRascunho={params => this.carregarRascunho(params)}
                />
              </div>
            )}
            <div className="mt-2 page-title">{this.state.title}</div>
            <div className="card inversao-dia-cardapio border rounded mt-2">
              <div className="card-body">
                <label className="card-title font-weight-bold">
                  Descrição da Inversão
                </label>
                <div className="row w-100 pt-3">
                  <div className="inversao-datepicker col-md-12 col-lg-5">
                    <Field
                      component={InputComData}
                      name="data_de"
                      label="Referência"
                      textoLabel="Cardápio dia"
                      required
                      validate={[required, deveSerNoAnoCorrente]}
                      onBlur={event => this.validaDiasUteis(event)}
                      minDate={proximos_dois_dias_uteis}
                      maxDate={dateDelta(60)}
                    />
                  </div>
                  <div className="col-md-12 col-lg-2 for-span">
                    <span className="pr-3">para</span>
                    <i className="fas fa-arrow-right" />
                  </div>
                  <div className="inversao-datepicker col-md-12 col-lg-5">
                    <Field
                      component={InputComData}
                      name="data_para"
                      label="Aplicar em"
                      textoLabel="Cardápio dia"
                      required
                      validate={[required, deveSerNoAnoCorrente]}
                      onBlur={event => this.validaDiasUteis(event)}
                      minDate={proximos_dois_dias_uteis}
                      maxDate={dateDelta(60)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={TextAreaWYSIWYG}
                      label="Motivo"
                      name="motivo"
                      required
                      validate={[textAreaRequired]}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12 mt-2 pb-5">
                    <Field
                      component={TextAreaWYSIWYG}
                      label="Observação"
                      name="observacao"
                    />
                  </div>
                </div>
                <div className="row text-right mt-4">
                  <div className="col-12 mt-2">
                    <Botao
                      texto="Cancelar"
                      onClick={event => this.resetForm(event)}
                      disabled={pristine || submitting}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      type={BUTTON_TYPE.SUBMIT}
                    />
                    <Botao
                      texto={this.state.salvarAtualizarLbl}
                      disabled={submitting}
                      onClick={handleSubmit(values => this.onSubmit(values))}
                      className="ml-3"
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      type={BUTTON_TYPE.SUBMIT}
                    />
                    <Botao
                      texto="Enviar"
                      disabled={submitting}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_DRE_A_VALIDAR
                        })
                      )}
                      style={BUTTON_STYLE.GREEN}
                      type={BUTTON_TYPE.SUBMIT}
                      className="ml-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        <ModalDataPrioritaria
          showModal={showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

InversaoDeDiaDeCardapio = reduxForm({
  form: "inversaoDeDiaDeCardapioForm",
  enableReinitialize: true
})(InversaoDeDiaDeCardapio);

const mapStateToProps = state => {
  return {
    initialValues: state.inversaoDeDiaDeCardapioForm.data
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadInversaoDeDiaDeCardapio
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InversaoDeDiaDeCardapio);
