import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import {
  formatarTiposDeAlimentacao,
  agregarDefault,
  dataPrioritaria,
  GeradorUUID,
  formatarSubmissaoSolicitacaoContinua,
  extrairTiposALimentacao
} from "./helper";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, FormSection, reduxForm } from "redux-form";
import { required } from "../../helpers/fieldValidators";
import { loadFoodInclusion } from "../../reducers/foodInclusionReducer";
import {
  criarInclusaoDeAlimentacaoContinua,
  atualizarInclusaoDeAlimentacaoContinua,
  removerInclusaoDeAlimentacaoContinua,
  getInclusoesContinuasSalvas,
  inicioPedido
} from "../../services/foodInclusion.service";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import CardMatriculados from "../Shareable/CardMatriculados";
import { toastError, toastSuccess } from "../Shareable/dialogs";
import {
  LabelAndCombo,
  LabelAndDate,
  LabelAndInput,
  LabelAndTextArea
} from "../Shareable/labelAndInput/labelAndInput";
import Weekly from "../Shareable/Weekly/Weekly";
import { Rascunhos } from "./Rascunhos";
import { validarSubmissao } from "./validacao";
import "./style.scss";

class InclusaoDeAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      periodos: [],
      rascunhosInclusaoDeAlimentacao: [],
      status: "SEM STATUS",
      title: "Nova Inclusão de Alimentação",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_motivos: [
        {
          id: GeradorUUID(),
          data: null,
          motivo: null,
          outroMotivo: false,
          motivoContinuo: false,
          data_inicial: null,
          data_final: null,
          dias_semana: []
        }
      ]
    };
    this.carregarRascunho = this.carregarRascunho.bind(this);
    this.removerRascunho = this.removerRascunho.bind(this);
    this.adicionarDia = this.adicionarDia.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.titleRef = React.createRef();
  }

  handleField(field, value, id) {
    const indiceDiaMotivo = this.state.dias_motivos.findIndex(
      dia_motivo => dia_motivo.id === id
    );
    let dias_motivos = this.state.dias_motivos;
    if (field === "motivo") {
      const indiceMotivoContinuo = this.props.motivos_continuos.findIndex(
        motivo => motivo.uuid === value
      );
      dias_motivos[indiceDiaMotivo]["motivoContinuo"] =
        indiceMotivoContinuo !== -1;
      dias_motivos[indiceDiaMotivo]["outroMotivo"] =
        indiceMotivoContinuo !== -1 &&
        this.props.motivos_continuos[indiceMotivoContinuo].nome.includes(
          "Outro"
        );
      if (indiceMotivoContinuo === -1) {
        const indiceMotivoSimples = this.props.motivos_simples.findIndex(
          motivo => motivo.uuid === value
        );
        dias_motivos[indiceDiaMotivo]["outroMotivo"] =
          indiceMotivoSimples !== -1 &&
          this.props.motivos_simples[indiceMotivoSimples].nome === "Outro";
      }
    }
    if (field === "outro_motivo") value = value.target.value;
    dias_motivos[indiceDiaMotivo][field] = value;
    this.setState({
      dias_motivos
    });
    if (field === "data") {
      if (
        dataPrioritaria(
          value,
          this.props.proximos_dois_dias_uteis,
          this.props.proximos_cinco_dias_uteis
        )
      ) {
        this.showModal();
      }
    }
  }

  onCheckChanged(periodo) {
    const indicePeriodo = this.state.periodos.findIndex(
      periodoState => periodoState.nome === periodo.nome
    );
    let periodos = this.state.periodos;
    periodo.checked = !periodo.checked;
    periodos[indicePeriodo].checked = periodo.checked;
    this.props.change(
      `quantidades_periodo_${periodo.nome}.check`,
      periodo.checked
    );
  }

  onNumeroAlunosChanged(event, periodo) {
    const indicePeriodo = this.state.periodos.findIndex(
      periodoState => periodoState.nome === periodo.nome
    );
    let periodos = this.state.periodos;
    periodos[indicePeriodo].numero_alunos = event.target.value;
    this.props.change(
      `quantidades_periodo_${periodo.nome}.numero_alunos`,
      event.target.value
    );
  }

  closeModal(e) {
    this.setState({ ...this.state, showModal: false });
  }

  adicionarDia() {
    this.setState({
      dias_motivos: this.state.dias_motivos.concat([
        {
          id: GeradorUUID(),
          data: null,
          motivo: null,
          data_inicial: null,
          outroMotivo: false,
          motivoContinuo: false,
          data_final: null,
          dias_semana: []
        }
      ])
    });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  onSelectedChanged = (opcoesSelecionadas, periodo) => {
    const indicePeriodo = this.state.periodos.findIndex(
      periodoState => periodoState.nome === periodo.nome
    );
    let periodos = this.state.periodos;
    periodos[indicePeriodo].tipos_alimentacao_selecionados = opcoesSelecionadas;
    this.setState({
      periodos
    });
    this.props.change(
      `quantidades_periodo_${periodo.nome}.tipos_alimentacao`,
      opcoesSelecionadas
    );
  };

  removerRascunho(id_externo, uuid) {
    removerInclusaoDeAlimentacaoContinua(uuid).then(
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
  }

  resetForm(event) {
    this.props.reset("foodInclusion");
    this.props.loadFoodInclusion(null);
    let periodos = this.state.periodos;
    periodos.forEach(periodo => {
      periodo["checked"] = false;
      periodo["tipos_alimentacao_selecionados"] = [];
      periodo["numero_alunos"] = null;
    });
    this.setState({
      status: "SEM STATUS",
      title: "Nova Inclusão de Alimentação",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_motivos: [
        {
          id: GeradorUUID(),
          data: null,
          motivo: null,
          data_inicial: null,
          outroMotivo: false,
          motivoContinuo: false,
          data_final: null,
          dias_semana: []
        }
      ],
      periodos
    });

    this.refresh();
  }

  carregarRascunho(param) {
    const inclusaoDeAlimentacao = param.inclusaoDeAlimentacao;
    this.props.reset("foodInclusion");
    this.props.loadFoodInclusion(inclusaoDeAlimentacao);
    let { periodos } = this.state;
    inclusaoDeAlimentacao.quantidades_periodo.forEach(quantidade_periodo => {
      const indicePeriodo = periodos.findIndex(
        periodoState =>
          periodoState.nome === quantidade_periodo.periodo_escolar.nome
      );
      periodos[indicePeriodo].checked = true;
      periodos[indicePeriodo].numero_alunos = quantidade_periodo.numero_alunos;
      periodos[
        indicePeriodo
      ].tipos_alimentacao_selecionados = extrairTiposALimentacao(
        quantidade_periodo.tipos_alimentacao
      );
    });
    let dias_motivos = [
      {
        id: 1,
        data: inclusaoDeAlimentacao.data,
        motivo: inclusaoDeAlimentacao.motivo.uuid,
        outroMotivo: inclusaoDeAlimentacao.outro_motivo !== null,
        motivoContinuo:
          inclusaoDeAlimentacao.data_inicial &&
          inclusaoDeAlimentacao.data_final,
        data_inicial: inclusaoDeAlimentacao.data_inicial,
        data_final: inclusaoDeAlimentacao.data_final,
        dias_semana: inclusaoDeAlimentacao.dias_semana
      }
    ];
    this.setState({
      periodos,
      status: inclusaoDeAlimentacao.status,
      title: `Inclusão de Cardápio # ${inclusaoDeAlimentacao.id_externo}`,
      salvarAtualizarLbl: "Atualizar",
      id: inclusaoDeAlimentacao.id_externo,
      dias_motivos
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.periodos.length === 0 && this.props.periodos.length > 0) {
      this.setState({
        periodos: this.props.periodos
      });
    }
    const {
      motivos_simples,
      motivos_continuos,
      meusDados,
      proximos_dois_dias_uteis
    } = this.props;
    const { loading, periodos } = this.state;
    if (
      motivos_simples !== [] &&
      motivos_continuos !== [] &&
      periodos !== [] &&
      meusDados !== null &&
      proximos_dois_dias_uteis !== null &&
      loading
    ) {
      this.setState({
        loading: false
      });
    }
  }

  refresh() {
    getInclusoesContinuasSalvas().then(
      response => {
        this.setState({
          rascunhosInclusaoDeAlimentacao: response.results
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
  }

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
    values.dias_motivos = this.state.dias_motivos;
    values.quantidades_periodo = this.state.periodos;
    const error = validarSubmissao(values, this.state);
    if (!error) {
      if (!values.uuid) {
        criarInclusaoDeAlimentacaoContinua(
          JSON.stringify(
            formatarSubmissaoSolicitacaoContinua(values, this.props.meusDados)
          )
        ).then(
          res => {
            if (res.status === HTTP_STATUS.CREATED) {
              toastSuccess("Rascunho salvo com sucesso");
              if (values.status === "DRE_A_VALIDAR") {
                this.iniciarPedido(res.data.uuid);
              } else this.resetForm();
              this.refresh();
            } else {
              toastError("Houve um erro ao salvar a inclusão de alimentação");
            }
          },
          function(error) {
            toastError("Houve um erro ao salvar a inclusão de alimentação");
          }
        );
      } else {
        atualizarInclusaoDeAlimentacaoContinua(
          values.uuid,
          JSON.stringify(
            formatarSubmissaoSolicitacaoContinua(values, this.props.meusDados)
          )
        ).then(
          res => {
            if (res.status === HTTP_STATUS.OK) {
              toastSuccess("Rascunho atualizado com sucesso");
              if (values.status === "DRE_A_VALIDAR") {
                this.iniciarPedido(res.data.uuid);
              } else this.resetForm();
              this.refresh();
            } else {
              toastError(
                "Houve um erro ao atualizar a inclusão de alimentação"
              );
            }
          },
          function(error) {
            toastError("Houve um erro ao atualizar a inclusão de alimentação");
          }
        );
      }
      this.closeModal();
    } else {
      toastError(error);
    }
  }

  render() {
    const {
      handleSubmit,
      motivos_simples,
      motivos_continuos,
      meusDados,
      proximos_dois_dias_uteis
    } = this.props;
    const {
      title,
      rascunhosInclusaoDeAlimentacao,
      dias_motivos,
      periodos,
      showModal,
      loading
    } = this.state;

    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={
                meusDados.escolas.length
                  ? meusDados.escolas[0].quantidade_alunos
                  : 0
              }
            />
            {rascunhosInclusaoDeAlimentacao.length > 0 && (
              <div className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  rascunhosInclusaoDeAlimentacao={
                    rascunhosInclusaoDeAlimentacao
                  }
                  removerRascunho={this.removerRascunho}
                  resetForm={event => this.resetForm(event)}
                  carregarRascunho={params => this.carregarRascunho(params)}
                />
              </div>
            )}
            <div ref={this.titleRef} className="form-row mt-3 ml-1">
              <h3 className="font-weight-bold">{title}</h3>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <div className="card-title font-weight-bold">
                  Descrição da Inclusão
                </div>
                {dias_motivos.map((dia_motivo, key) => {
                  return (
                    <FormSection name={`dias_motivos_${dia_motivo.id}`}>
                      <div className="form-row">
                        {(!dia_motivo.motivo || !dia_motivo.motivoContinuo) && (
                          <div className="form-group col-sm-3">
                            <Field
                              component={LabelAndDate}
                              name="data"
                              onChange={value =>
                                this.handleField("data", value, dia_motivo.id)
                              }
                              minDate={proximos_dois_dias_uteis}
                              label="Dia"
                              validate={required}
                            />
                          </div>
                        )}
                        <div className="form-group col-sm-8 p-0">
                          <Field
                            component={LabelAndCombo}
                            name="motivo"
                            label="Motivo"
                            onChange={value =>
                              this.handleField("motivo", value, dia_motivo.id)
                            }
                            options={
                              dias_motivos.length > 1
                                ? agregarDefault(motivos_simples)
                                : agregarDefault(motivos_simples).concat(
                                    motivos_continuos
                                  )
                            }
                            validate={required}
                          />
                        </div>
                      </div>
                      {dia_motivo.outroMotivo && (
                        <div className="form-row">
                          <div
                            className={
                              !dia_motivo.motivoContinuo
                                ? "form-group col-sm-8 offset-sm-3"
                                : "form-group col-sm-8 p-0"
                            }
                          >
                            <Field
                              component={LabelAndInput}
                              label="Qual o motivo?"
                              onChange={event =>
                                this.handleField(
                                  "outro_motivo",
                                  event,
                                  dia_motivo.id
                                )
                              }
                              name="outro_motivo"
                              className="form-control"
                              validate={required}
                            />
                          </div>
                        </div>
                      )}
                      {dia_motivo.motivo && dia_motivo.motivoContinuo && (
                        <div className="form-row">
                          <div className="form-group col-sm-3">
                            <Field
                              component={LabelAndDate}
                              onChange={value =>
                                this.handleField(
                                  "data_inicial",
                                  value,
                                  dia_motivo.id
                                )
                              }
                              name="data_inicial"
                              label="De"
                              validate={required}
                            />
                          </div>
                          <div className="form-group col-sm-3">
                            <Field
                              component={LabelAndDate}
                              onChange={value =>
                                this.handleField(
                                  "data_final",
                                  value,
                                  dia_motivo.id
                                )
                              }
                              name="data_final"
                              label="Até"
                              validate={required}
                            />
                          </div>
                          <Field
                            component={Weekly}
                            name="dias_semana"
                            onChange={value =>
                              this.handleField(
                                "dias_semana",
                                value,
                                dia_motivo.id
                              )
                            }
                            classNameArgs="form-group col-sm-4"
                            label="Repetir"
                          />
                        </div>
                      )}
                    </FormSection>
                  );
                })}
                {(!dias_motivos[0].motivo ||
                  !dias_motivos[0].motivoContinuo) && (
                  <BaseButton
                    label="Adicionar dia"
                    className="col-sm-3"
                    onClick={() => this.adicionarDia()}
                    style={ButtonStyle.OutlinePrimary}
                  />
                )}
                <div className="row table-titles">
                  <div className="col-3">Período</div>
                  <div className="col-6">Tipo de Alimentação</div>
                  <div className="col-3">Nº de Alunos</div>
                </div>
                {periodos.map((periodo, key) => {
                  return (
                    <FormSection name={`quantidades_periodo_${periodo.nome}`}>
                      <div className="form-row">
                        <Field component={"input"} type="hidden" name="value" />
                        <div className="form-check col-md-3 mr-4 ml-4">
                          <div
                            className={`period-quantity number-${key} pl-5 pt-2 pb-2`}
                          >
                            <label htmlFor="check" className="checkbox-label">
                              <Field
                                component={"input"}
                                type="checkbox"
                                name="check"
                              />
                              <span
                                onClick={() => this.onCheckChanged(periodo)}
                                className="checkbox-custom"
                              />{" "}
                              {periodo.nome}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-5 mr-5">
                          <div
                            className={
                              true
                                ? "multiselect-wrapper-enabled"
                                : "multiselect-wrapper-disabled"
                            }
                          >
                            <Field
                              component={StatefulMultiSelect}
                              name=".tipos_alimentacao"
                              selected={periodo.tipos_alimentacao_selecionados}
                              options={formatarTiposDeAlimentacao(
                                periodo.tipos_alimentacao
                              )}
                              onSelectedChanged={values =>
                                this.onSelectedChanged(values, periodo)
                              }
                              disableSearch={true}
                              overrideStrings={{
                                selectSomeItems: "Selecione",
                                allItemsAreSelected:
                                  "Todos os itens estão selecionados",
                                selectAll: "Todos"
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-2">
                          <Field
                            component={LabelAndInput}
                            onChange={event =>
                              this.onNumeroAlunosChanged(event, periodo)
                            }
                            disabled={false}
                            type="number"
                            name="numero_alunos"
                            min="0"
                            className="form-control"
                            validate={periodo.checked ? required : null}
                          />
                        </div>
                      </div>
                    </FormSection>
                  );
                })}
                <hr className="w-100" />
                <div className="form-group">
                  <Field
                    component={LabelAndTextArea}
                    placeholder="Campo opcional"
                    label="Observações"
                    name="descricao"
                  />
                </div>
                <div className="form-group row float-right mt-4">
                  <BaseButton
                    label="Cancelar"
                    onClick={event => this.resetForm(event)}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label={this.state.salvarAtualizarLbl}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values
                      })
                    )}
                    className="ml-3"
                    type={ButtonType.SUBMIT}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label="Enviar Solicitação"
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
            <Modal show={showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Atenção</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Atenção, a solicitação está fora do prazo contratual (entre{" "}
                <b>2 e 5 dias úteis</b>). Sendo assim, a autorização dependerá
                da disponibilidade dos alimentos adequados para o cumprimento do
                cardápio.
              </Modal.Body>
              <Modal.Footer>
                <BaseButton
                  label="OK"
                  type={ButtonType.BUTTON}
                  onClick={this.closeModal}
                  style={ButtonStyle.Primary}
                  className="ml-3"
                />
              </Modal.Footer>
            </Modal>
          </form>
        )}
      </div>
    );
  }
}

const InclusaoDeAlimentacaoForm = reduxForm({
  form: "foodInclusion",
  enableReinitialize: true
})(InclusaoDeAlimentacao);
const mapStateToProps = state => {
  return {
    initialValues: state.foodInclusion.data
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFoodInclusion
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InclusaoDeAlimentacaoForm);
