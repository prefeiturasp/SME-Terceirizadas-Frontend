import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, FormSection, reduxForm } from "redux-form";
import { InputText } from "../Shareable/Input/InputText";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";
import { required, naoPodeSerZero } from "../../helpers/fieldValidators";
import {
  agregarDefault,
  checaSeDataEstaEntre2e5DiasUteis,
  formatarParaMultiselect,
  geradorUUID,
  getDataObj
} from "../../helpers/utilities";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { Select } from "../Shareable/Select";
import { loadFoodInclusion } from "../../reducers/foodInclusionReducer";
import {
  atualizarInclusaoDeAlimentacaoNormal,
  criarInclusaoDeAlimentacaoNormal,
  getInclusoesNormaisSalvas,
  inicioPedidoNormal
} from "../../services/inclusaoDeAlimentacaoAvulsa.service";
import {
  atualizarInclusaoDeAlimentacaoContinua,
  criarInclusaoDeAlimentacaoContinua,
  getInclusoesContinuasSalvas,
  inicioPedidoContinua
} from "../../services/inclusaoDeAlimentacaoContinua.service";
import { Botao } from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import CardMatriculados from "../Shareable/CardMatriculados";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import { InputComData } from "../Shareable/DatePicker";
import Weekly from "../Shareable/Weekly/Weekly";
import {
  extrairTiposALimentacao,
  formatarSubmissaoSolicitacaoContinua,
  formatarSubmissaoSolicitacaoNormal
} from "./helper";
import { Rascunhos } from "./Rascunhos";
import "./style.scss";
import { validarSubmissao } from "./validacao";
import "./style.scss";
import { TextAreaWYSIWYG } from "../Shareable/TextArea/TextAreaWYSIWYG";


const ENTER = 13;
class InclusaoDeAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validacaoPeriodos: [],
      loading: true,
      periodos: [],
      rascunhosInclusaoDeAlimentacao: [],
      status: "SEM STATUS",
      title: "Nova Solicitação",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      inclusoes: [
        {
          id: geradorUUID(),
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
    const indiceDiaMotivo = this.state.inclusoes.findIndex(
      dia_motivo => dia_motivo.id === id
    );
    let inclusoes = this.state.inclusoes;
    if (field === "motivo") {
      const indiceMotivoContinuo = this.props.motivos_continuos.findIndex(
        motivo => motivo.uuid === value
      );
      inclusoes[indiceDiaMotivo]["motivoContinuo"] =
        indiceMotivoContinuo !== -1;
      inclusoes[indiceDiaMotivo]["outroMotivo"] =
        indiceMotivoContinuo !== -1 &&
        this.props.motivos_continuos[indiceMotivoContinuo].nome.includes(
          "Outro"
        );
      if (indiceMotivoContinuo === -1) {
        const indiceMotivoSimples = this.props.motivos_simples.findIndex(
          motivo => motivo.uuid === value
        );
        inclusoes[indiceDiaMotivo]["outroMotivo"] =
          indiceMotivoSimples !== -1 &&
          this.props.motivos_simples[indiceMotivoSimples].nome === "Outro";
      }
    }
    if (field === "outro_motivo") value = value.target.value;
    inclusoes[indiceDiaMotivo][field] = value;
    this.setState({
      inclusoes
    });
  }

  onDataChanged(value) {
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
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
      inclusoes: this.state.inclusoes.concat([
        {
          id: geradorUUID(),
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

  removerRascunho(id_externo, uuid, removerInclusaoDeAlimentacao) {
    if (window.confirm("Deseja remover este rascunho?")) {
      removerInclusaoDeAlimentacao(uuid).then(
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
      inclusoes: [
        {
          id: geradorUUID(),
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
    let validacaoPeriodos = this.state.validacaoPeriodos;
    inclusaoDeAlimentacao.quantidades_periodo.forEach(qtd_periodo => {
      validacaoPeriodos.forEach((periodo, indice) => {
        if (qtd_periodo.periodo_escolar.nome === periodo.turno) {
          validacaoPeriodos[indice].checado = true;
        }
      });
    });
    this.setState({ validacaoPeriodos });
    this.props.reset("foodInclusion");
    this.props.loadFoodInclusion(inclusaoDeAlimentacao);
    let { periodos } = this.state;
    periodos.forEach(periodo => {
      periodo.checked = false;
      periodo.tipos_alimentacao_selecionados = [];
      periodo.numero_alunos = null;
    });
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
    let inclusoes = inclusaoDeAlimentacao.data_inicial
      ? [
          {
            id: 0,
            motivo: inclusaoDeAlimentacao.motivo.uuid,
            outroMotivo:
              inclusaoDeAlimentacao.outro_motivo !== null &&
              inclusaoDeAlimentacao.outro_motivo !== "",
            motivoContinuo:
              inclusaoDeAlimentacao.data_inicial &&
              inclusaoDeAlimentacao.data_final,
            data_inicial: inclusaoDeAlimentacao.data_inicial,
            data_final: inclusaoDeAlimentacao.data_final,
            dias_semana: inclusaoDeAlimentacao.dias_semana
          }
        ]
      : inclusaoDeAlimentacao.inclusoes.map((inclusao, indice) => {
          let inclusao_formatada = {};
          inclusao_formatada["id"] = indice;
          inclusao_formatada["data"] = inclusao.data;
          inclusao_formatada["motivo"] = inclusao.motivo.uuid;
          inclusao_formatada["outro_motivo"] = inclusao.outro_motivo;
          inclusao_formatada["outroMotivo"] =
            inclusao.outro_motivo !== null && inclusao.outro_motivo !== "";
          return inclusao_formatada;
        });
    this.setState({
      periodos,
      status: inclusaoDeAlimentacao.status,
      title: `Inclusão de Cardápio # ${inclusaoDeAlimentacao.id_externo}`,
      salvarAtualizarLbl: "Atualizar",
      id: inclusaoDeAlimentacao.id_externo,
      inclusoes
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  resetaCampoQuantidadeAlunos(periodo) {
    this.props.change(
      `quantidades_periodo_${periodo.nome}.numero_alunos`,
      null
    );
  }

  adicionaIndiceNoValidacaoPeriodos(periodos) {
    let validacaoPeriodos = this.state.validacaoPeriodos;
    periodos.forEach(periodo => {
      validacaoPeriodos.push({
        checado: periodo.checked,
        turno: periodo.nome
      });
    });
  }

  atualizaIndiceNoValidacaoPeriodos(indice, periodo) {
    let periodos = this.state.periodos;
    let validacaoPeriodos = this.state.validacaoPeriodos;
    if (validacaoPeriodos[indice].checado === false) {
      validacaoPeriodos[indice].checado = true;
    } else {
      validacaoPeriodos[indice].checado = false;
      periodos[indice].tipos_alimentacao_selecionados = [];
      this.resetaCampoQuantidadeAlunos(periodo);
    }

    this.setState({ validacaoPeriodos, periodos });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.periodos.length === 0 && this.props.periodos.length > 0) {
      this.adicionaIndiceNoValidacaoPeriodos(this.props.periodos);
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
    let rascunhosInclusaoDeAlimentacao = [];
    getInclusoesContinuasSalvas().then(
      response => {
        rascunhosInclusaoDeAlimentacao = rascunhosInclusaoDeAlimentacao.concat(
          response.results
        );
        getInclusoesNormaisSalvas().then(
          responseNormais => {
            rascunhosInclusaoDeAlimentacao = rascunhosInclusaoDeAlimentacao.concat(
              responseNormais.results
            );
            this.setState({
              rascunhosInclusaoDeAlimentacao
            });
          },
          function(error) {
            toastError("Erro ao carregar as inclusões salvas");
          }
        );
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
  }

  iniciarPedido(uuid, inicioPedidoEndpointCorreto) {
    inicioPedidoEndpointCorreto(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          //AQUIIIIIIIIII
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

  fluxoSolicitacaoContinua(values) {
    if (!values.uuid) {
      criarInclusaoDeAlimentacaoContinua(
        JSON.stringify(
          formatarSubmissaoSolicitacaoContinua(values, this.props.meusDados)
        )
      ).then(
        res => {
          if (res.status === HTTP_STATUS.CREATED) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(res.data.uuid, inicioPedidoContinua);
            } else {
              toastSuccess("Rascunho salvo com sucesso");
              this.resetForm();
            }
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
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(res.data.uuid, inicioPedidoContinua);
            } else {
              toastSuccess("Rascunho atualizado com sucesso");
              this.resetForm();
            }
            this.refresh();
          } else {
            toastError("Houve um erro ao atualizar a inclusão de alimentação");
          }
        },
        function(error) {
          toastError("Houve um erro ao atualizar a inclusão de alimentação");
        }
      );
    }
  }

  fluxoSolicitacaoNormal(values) {
    if (!values.uuid) {
      criarInclusaoDeAlimentacaoNormal(
        JSON.stringify(
          formatarSubmissaoSolicitacaoNormal(values, this.props.meusDados)
        )
      ).then(
        res => {
          if (res.status === HTTP_STATUS.CREATED) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(res.data.uuid, inicioPedidoNormal);
            } else {
              toastSuccess("Rascunho salvo com sucesso");
              this.resetForm();
            }
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
      atualizarInclusaoDeAlimentacaoNormal(
        values.uuid,
        JSON.stringify(
          formatarSubmissaoSolicitacaoNormal(values, this.props.meusDados)
        )
      ).then(
        res => {
          if (res.status === HTTP_STATUS.OK) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(res.data.uuid, inicioPedidoNormal);
            } else {
              toastSuccess("Rascunho atualizado com sucesso");
              this.resetForm();
            }
            this.refresh();
          } else {
            toastError("Houve um erro ao atualizar a inclusão de alimentação");
          }
        },
        function(error) {
          toastError("Houve um erro ao atualizar a inclusão de alimentação");
        }
      );
    }
  }

  onSubmit(values) {
    values.inclusoes = this.state.inclusoes;
    values.quantidades_periodo = this.state.periodos;
    const ehInclusaoContinua =
      values.inclusoes[0].data_inicial && values.inclusoes[0].data_final;
    const error = validarSubmissao(values, this.props.meusDados);
    if (!error) {
      if (ehInclusaoContinua) {
        this.fluxoSolicitacaoContinua(values);
      } else {
        this.fluxoSolicitacaoNormal(values);
      }
      this.closeModal();
    } else {
      toastError(error);
    }
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
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
      inclusoes,
      periodos,
      showModal,
      loading,
      validacaoPeriodos
    } = this.state;
    const ehMotivoContinuo = inclusoes[0].motivo && inclusoes[0].motivoContinuo;
    const dataInicialContinua = inclusoes[0].data_inicial;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit} onKeyPress={this.onKeyPress}>
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
            <div ref={this.titleRef} className="mt-2 page-title">
              {title}
            </div>
            <div className="card solicitation mt-2">
              <div className="card-body">
                <div className="card-title font-weight-bold">
                  Descrição da Inclusão
                </div>
                {inclusoes.map((diaMotivo, indice) => {
                  return (
                    <FormSection name={`inclusoes_${diaMotivo.id}`}>
                      <section>
                        <div className="grid_principal">
                          <div>
                            <Field
                              component={Select}
                              name="motivo"
                              label="Motivo"
                              onChange={event =>
                                this.handleField(
                                  "motivo",
                                  event.target.value,
                                  diaMotivo.id
                                )
                              }
                              options={
                                inclusoes.length > 1
                                  ? agregarDefault(motivos_simples)
                                  : agregarDefault(motivos_simples).concat(
                                      motivos_continuos
                                    )
                              }
                              required
                              validate={required}
                            />
                          </div>
                          {!ehMotivoContinuo && ehMotivoContinuo !== null && (
                            <Field
                              component={InputComData}
                              name="data"
                              onChange={value =>
                                this.handleField("data", value, diaMotivo.id)
                              }
                              onBlur={event =>
                                this.onDataChanged(event.target.value)
                              }
                              minDate={proximos_dois_dias_uteis}
                              label="Dia"
                              required
                              validate={required}
                            />
                          )}
                        </div>
                        {diaMotivo.outroMotivo && (
                          <div className="grid-outro-motivo pb-2">
                            <Field
                              component={InputText}
                              label="Qual o motivo?"
                              onChange={event =>
                                this.handleField(
                                  "outro_motivo",
                                  event,
                                  diaMotivo.id
                                )
                              }
                              name="outro_motivo"
                              required
                              validate={required}
                            />
                          </div>
                        )}
                        {ehMotivoContinuo && (
                          <div className={"grid-motivo-continuo"}>
                            <Field
                              component={InputComData}
                              onChange={value =>
                                this.handleField(
                                  "data_inicial",
                                  value,
                                  diaMotivo.id
                                )
                              }
                              onBlur={event =>
                                this.onDataChanged(event.target.value)
                              }
                              name="data_inicial"
                              label="De"
                              required
                              validate={required}
                              minDate={proximos_dois_dias_uteis}
                            />
                            <div>
                              <Field
                                component={InputComData}
                                onChange={value =>
                                  this.handleField(
                                    "data_final",
                                    value,
                                    diaMotivo.id
                                  )
                                }
                                minDate={getDataObj(dataInicialContinua)}
                                disabled={!dataInicialContinua}
                                name="data_final"
                                label="Até"
                                required
                                validate={required}
                              />
                            </div>
                            <div>
                              <Field
                                component={Weekly}
                                name="dias_semana"
                                onChange={value =>
                                  this.handleField(
                                    "dias_semana",
                                    value,
                                    diaMotivo.id
                                  )
                                }
                                required
                                className="form-group col-sm-4"
                                label="Repetir"
                              />
                            </div>
                          </div>
                        )}
                      </section>
                    </FormSection>
                  );
                })}
                {!ehMotivoContinuo && (
                  <Botao
                    className="col-sm-3"
                    texto="Adicionar dia"
                    onClick={() => this.adicionarDia()}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    type={BUTTON_TYPE.BUTTON}
                  />
                )}
                <div className="row table-titles">
                  <div className="col-3">Período</div>
                  <div className="col-6 type-food">Tipo de Alimentação</div>
                  <div className="col-3 n-students">Nº de Alunos</div>
                </div>
                {periodos.map((periodo, indice) => {
                  return (
                    <FormSection name={`quantidades_periodo_${periodo.nome}`}>
                      <div className="form-row">
                        <Field component={"input"} type="hidden" name="value" />
                        <div className="form-check col-md-3 mr-4">
                          <div
                            className={`period-quantity number-${indice} pl-5 pt-2 pb-2`}
                          >
                            <label htmlFor="check" className="checkbox-label">
                              <Field
                                component={"input"}
                                type="checkbox"
                                name="check"
                              />
                              <span
                                onClick={() => {
                                  this.onCheckChanged(periodo);
                                  this.atualizaIndiceNoValidacaoPeriodos(
                                    indice,
                                    periodo
                                  );
                                }}
                                className="checkbox-custom"
                              />{" "}
                              {periodo.nome}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-5 mr-5">
                          <div
                            className={
                              !validacaoPeriodos[indice].checado
                                ? "multiselect-wrapper-disabled"
                                : "multiselect-wrapper-enabled"
                            }
                          >
                            <Field
                              component={StatefulMultiSelect}
                              name=".tipos_alimentacao"
                              selected={periodo.tipos_alimentacao_selecionados}
                              options={formatarParaMultiselect(
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
                            component={InputText}
                            onChange={event =>
                              this.onNumeroAlunosChanged(event, periodo)
                            }
                            disabled={!validacaoPeriodos[indice].checado}
                            type="number"
                            name={`numero_alunos`}
                            min="0"
                            className="form-control"
                            required={validacaoPeriodos[indice].checado}
                            validate={
                              validacaoPeriodos[indice].checado && [
                                required,
                                naoPodeSerZero
                              ]
                            }
                          />
                        </div>
                      </div>
                    </FormSection>
                  );
                })}
                <hr className="w-100" />
                <div className="form-group pb-5">
                  <Field
                    component={TextAreaWYSIWYG}
                    label="Observações"
                    name="descricao"
                  />
                </div>
                <div className="form-group row float-right mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      onClick={event => this.resetForm(event)}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto={this.state.salvarAtualizarLbl}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values
                        })
                      )}
                      className="ml-3"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Enviar Solicitação"
                      type={BUTTON_TYPE.SUBMIT}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_DRE_A_VALIDAR
                        })
                      )}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={this.closeModal}
            />
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
