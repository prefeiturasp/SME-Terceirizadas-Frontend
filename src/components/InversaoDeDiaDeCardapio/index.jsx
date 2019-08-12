import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HTTP_STATUS from "http-status-codes";
import { checaSeDataEstaEntre2e5DiasUteis } from "../../helpers/utilities";
import { required, textAreaRequired } from "../../helpers/fieldValidators";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { loadInversaoDeDiaDeCardapio } from "../../reducers/inversaoDeDiaDeCardapio.reducer";
import {
  LabelAndDate,
  LabelAndTextArea
} from "../Shareable/labelAndInput/labelAndInput";
import { Rascunhos } from "./Rascunhos";
import {
  getInversoesDeDiaDeCardapio,
  criarInversaoDeDiaDeCardapio,
  removerInversaoDeDiaDeCardapio,
  atualizarInversaoDeDiaDeCardapio,
  inicioPedido
} from "../../services/inversaoDeDiaDeCardapio.service";
import { toastSuccess, toastError } from "../Shareable/dialogs";
import CardMatriculados from "../Shareable/CardMatriculados";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import "./style.scss";

export class InversaoDeDiaDeCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rascunhosInversoes: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar",
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
        function(error) {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
      this.resetForm();
    }
  }

  resetForm(event) {
    this.props.reset("inversaoDeDiaDeCardapioForm");
    this.props.loadInversaoDeDiaDeCardapio(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar"
    });
    this.refresh();
  }

  carregarRascunho(param) {
    const inversaoDeDiaDeCardapio = param.inversaoDeDiaDeCardapio;
    this.props.reset("inversaoDeDiaDeCardapioForm");
    this.props.loadInversaoDeDiaDeCardapio(inversaoDeDiaDeCardapio);
    this.setState({
      status: inversaoDeDiaDeCardapio.status,
      title: `Solicitação # ${inversaoDeDiaDeCardapio.id_externo}`,
      salvarAtualizarLbl: "Atualizar"
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
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
    getInversoesDeDiaDeCardapio()
      .then(response => {
        const rascunhosInversoes = response.results;
        this.setState({ rascunhosInversoes });
      })
      .catch(error => {
        console.log("ERROR AO TENTAR CARREGAR INVERSÕES SALVAS: ", error);
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
          toastSuccess("Inclusão de Alimentação enviada com sucesso!");
          this.resetForm();
        } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao enviar a Inclusão de Alimentação");
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a Inclusão de Alimentação");
      }
    );
  }

  onSubmit(values) {
    values.escola = this.props.meusDados.escolas[0].uuid;
    if (!values.uuid) {
      criarInversaoDeDiaDeCardapio(values)
        .then(response => {
          if (response.status === HTTP_STATUS.CREATED) {
            toastSuccess("Inversão de dia de Cardápio salvo com sucesso!");
            if (values.status === "DRE_A_VALIDAR") {
              this.iniciarPedido(response.data.uuid);
            } else this.resetForm();
          } else {
            var keys = Object.keys(response.data);
            keys.forEach(function(key) {
              toastError(response.data[key][0]);
            });
          }
        })
        .catch(error => {
          console.log("ERRO AO TENTAR SALVAR: ", error);
        });
    } else {
      atualizarInversaoDeDiaDeCardapio(values.uuid, JSON.stringify(values))
        .then(response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Inversão de dia de Cardápio atualizado com sucesso!");
            if (values.status === "DRE_A_VALIDAR") {
              this.iniciarPedido(response.data.uuid);
            } else this.resetForm();
          } else {
            var keys = Object.keys(response.data);
            keys.forEach(function(key) {
              toastError(response.data[key][0]);
            });
          }
        })
        .catch(error => {
          console.log("ERRO AO TENTAR SALVAR: ", error);
        });
    }
  }

  render() {
    const { showModal, loading } = this.state;
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
              numeroAlunos={meusDados.escolas[0].quantidade_alunos || 0}
            />
            <Rascunhos
              rascunhosInversoes={this.state.rascunhosInversoes}
              removerRascunho={this.removerRascunho}
              resetForm={event => this.resetForm(event)}
              carregarRascunho={params => this.carregarRascunho(params)}
            />
            <div className="mt-3 page-title">{this.state.title}</div>
            <div className="card border rounded mt-2">
              <div className="card-body">
                <label className="font-weight-bold">
                  Descrição da Alteração
                </label>
                <div className="row w-100 pb-3">
                  <div className="col-md-12 col-lg-5">
                    <Field
                      component={LabelAndDate}
                      name="data_de"
                      label="Referência"
                      textoLabel="Cardápio dia"
                      validate={required}
                      onBlur={event => this.validaDiasUteis(event)}
                      minDate={proximos_dois_dias_uteis}
                    />
                  </div>
                  <div className="col-md-12 col-lg-2 for-span">
                    <span className="font-weight-bold pr-3">para</span>
                    <i class="fas fa-arrow-right" />
                  </div>
                  <div className="col-md-12 col-lg-5">
                    <Field
                      component={LabelAndDate}
                      name="data_para"
                      label="Aplicar em"
                      textoLabel="Cardápio dia"
                      validate={required}
                      onBlur={event => this.validaDiasUteis(event)}
                      activeCalendar
                      minDate={proximos_dois_dias_uteis}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <Field
                    component={LabelAndTextArea}
                    label="Motivo"
                    name="descricao"
                    validate={[textAreaRequired]}
                  />
                </div>
                <div className="row form-group">
                  <Field
                    component={LabelAndTextArea}
                    placeholder="Campo opcional"
                    label="Observação"
                    name="observacao"
                  />
                </div>
                <div className="row form-group text-right mt-4">
                  <div className="col-12">
                    <BaseButton
                      label="Cancelar"
                      onClick={event => this.resetForm(event)}
                      disabled={pristine || submitting}
                      style={ButtonStyle.OutlinePrimary}
                    />
                    <BaseButton
                      label={this.state.salvarAtualizarLbl}
                      disabled={pristine || submitting}
                      onClick={handleSubmit(values => this.onSubmit(values))}
                      className="ml-3"
                      type={ButtonType.SUBMIT}
                      style={ButtonStyle.OutlinePrimary}
                    />
                    <BaseButton
                      label="Enviar Solicitação"
                      disabled={pristine || submitting}
                      type={ButtonType.SUBMIT}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: "DRE_A_VALIDAR"
                        })
                      )}
                      style={ButtonStyle.Primary}
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
