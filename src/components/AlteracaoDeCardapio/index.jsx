import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, FormSection, formValueSelector, reduxForm } from "redux-form";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";
import {
  peloMenosUmCaractere,
  required,
  textAreaRequired
} from "../../helpers/fieldValidators";
import {
  agregarDefault,
  checaSeDataEstaEntre2e5DiasUteis,
  getError
} from "../../helpers/utilities";
import { loadAlteracaoCardapio } from "../../reducers/alteracaoCardapioReducer";
import {
  escolaIniciarSolicitacaoDeAlteracaoDeCardapio,
  escolaExcluirSolicitacaoDeAlteracaoCardapio,
  escolaAlterarSolicitacaoDeAlteracaoCardapio,
  escolaCriarSolicitacaoDeAlteracaoCardapio,
  escolaListarRascunhosDeSolicitacaoDeAlteracaoCardapio,
  getAlteracoesComLancheDoMesCorrente
} from "../../services/alteracaoDeCardapio";
import { getVinculosTipoAlimentacaoPorEscola } from "../../services/cadastroTipoAlimentacao.service";
import { Botao } from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import CardMatriculados from "../Shareable/CardMatriculados";
import { Rascunhos } from "./Rascunhos";

import { InputComData } from "../Shareable/DatePicker";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { Select } from "../Shareable/Select";
import { TextAreaWYSIWYG } from "../Shareable/TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import { construirPeriodosECombos } from "./helper";
import "./style.scss";
import { validateSubmit } from "./validacao";
import ModalConfirmaAlteracao from "./ModalConfirmaAlteracao";
import { TIPO_SOLICITACAO } from "constants/shared";

const ENTER = 13;

class AlteracaoCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodos: [],
      loading: true,
      alteracaoCardapioList: [],
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: null,
      showModal: false,
      showModalConfirm: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      substituicoesAlimentacao: [],
      substituicoesEdit: [],
      dataInicial: null,
      periodosQuePossuemLancheNaAlteracao: null,
      ehAlteracaoComLancheRepetida: false,
      verificado: false,
      values: null
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModalConfirm = this.showModalConfirm.bind(this);
    this.closeModalConfirm = this.closeModalConfirm.bind(this);
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate() {
    const { meusDados, proximos_dois_dias_uteis } = this.props;
    let {
      loading,
      periodos,
      substituicoesAlimentacao,
      periodosQuePossuemLancheNaAlteracao,
      verificado
    } = this.state;
    if (
      meusDados &&
      proximos_dois_dias_uteis &&
      loading &&
      !periodosQuePossuemLancheNaAlteracao &&
      periodos.length === 0
    ) {
      const vinculo = this.props.meusDados.vinculo_atual.instituicao.uuid;
      getVinculosTipoAlimentacaoPorEscola(vinculo).then(response => {
        periodos = construirPeriodosECombos(response.results);
        this.buscaPeriodosParaVerificarSePossuiAlteracoesComLanche(periodos);
        this.setState({ periodos, loading: false });
      });
      periodos.forEach(periodo => {
        this.montaObjetoDeSubstituicoesEdit(periodo);
      });
    }

    if (substituicoesAlimentacao.length === 0) {
      periodos.forEach(periodo => {
        periodo["ck"] = null;
        substituicoesAlimentacao.push({ substituicoes: [] });
      });
    }
    if (
      !loading &&
      !verificado &&
      periodosQuePossuemLancheNaAlteracao !== null
    ) {
      const vinculo = this.props.meusDados.vinculo_atual.instituicao.uuid;
      this.atualizaAlteracoesComLancheMesCorrente(
        vinculo,
        TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      );
    }
  }

  atualizaAlteracoesComLancheMesCorrente = vinculo => {
    let { periodosQuePossuemLancheNaAlteracao } = this.state;
    getAlteracoesComLancheDoMesCorrente(
      vinculo,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    ).then(response => {
      const alteracoes = response.results;
      alteracoes.forEach(alteracao => {
        alteracao.substituicoes.forEach(substituicao => {
          if (substituicao.tipo_alimentacao_para.label.includes("lanche")) {
            periodosQuePossuemLancheNaAlteracao[
              `${substituicao.periodo_escolar.nome}`
            ].status = true;
          }
        });
      });
      this.setState({
        verificado: true,
        periodosQuePossuemLancheNaAlteracao
      });
    });
  };

  buscaPeriodosParaVerificarSePossuiAlteracoesComLanche = periodos => {
    let periodosQuePossuemLancheNaAlteracao = null;
    const periodosComFlags = {
      temRestricao: false
    };
    periodos.forEach(periodo => {
      periodosComFlags[`${periodo.nome}`] = {
        status: false,
        temNaSolicitacao: false
      };
    });
    periodosQuePossuemLancheNaAlteracao = periodosComFlags;
    this.setState({ periodosQuePossuemLancheNaAlteracao });
  };

  verificaSeEhLancheNoTipoDeAlimentacao = (
    uuidTPAlimentacao,
    substituicoes,
    nomePeriodo
  ) => {
    let { periodosQuePossuemLancheNaAlteracao } = this.state;
    substituicoes.forEach(substituicao => {
      if (substituicao.uuid === uuidTPAlimentacao) {
        if (substituicao.nome.includes("lanche")) {
          periodosQuePossuemLancheNaAlteracao[
            `${nomePeriodo}`
          ].temNaSolicitacao = true;
          if (periodosQuePossuemLancheNaAlteracao[`${nomePeriodo}`].status) {
            periodosQuePossuemLancheNaAlteracao.temRestricao = true;
          }
        } else {
          periodosQuePossuemLancheNaAlteracao[
            `${nomePeriodo}`
          ].temNaSolicitacao = false;
          if (periodosQuePossuemLancheNaAlteracao[`${nomePeriodo}`].status) {
            periodosQuePossuemLancheNaAlteracao.temRestricao = false;
          }
        }
      }
    });
    this.setState({ periodosQuePossuemLancheNaAlteracao });
  };

  componentDidMount() {
    this.refresh();
  }

  montaObjetoDeSubstituicoesEdit = periodo => {
    let substituicoesEdit = this.state.substituicoesEdit;
    substituicoesEdit.push({
      turno: periodo.nome,
      substituicoes: [],
      checked: false
    });
    this.setState({ substituicoesEdit });
  };

  retornaTurnoAlteracao = substituicao => {
    let substituicoesEdit = this.state.substituicoesEdit;
    let periodos = this.state.periodos;
    substituicoesEdit.forEach((item, indice) => {
      if (item.turno === substituicao.periodo_escolar.nome) {
        item.substituicoes = substituicao.tipo_alimentacao_de.substituicoes;
      }
      if (periodos[indice].nome === substituicao.periodo_escolar.nome) {
        periodos[indice].checado = true;
      }
    });
    this.setState({ substituicoesEdit, periodos });
  };

  retornaOpcoesAlteracao = (indice, param) => {
    const substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    if (indice === undefined) {
      param.substituicoes.forEach(substituicao => {
        this.retornaTurnoAlteracao(substituicao);
      });
      return [];
    } else {
      const substituicoes =
        substituicoesAlimentacao[indice].substituicoes !== null
          ? substituicoesAlimentacao[indice].substituicoes
          : [];
      return substituicoes;
    }
  };

  atualizaEverificaSeEhAlteracaoRepetida = substituicoes => {
    let { periodosQuePossuemLancheNaAlteracao } = this.state;
    substituicoes.forEach(substituicao => {
      substituicao.tipo_alimentacao_de.substituicoes.forEach(
        tipo_alimentacao_sub => {
          if (
            substituicao.tipo_alimentacao_para.uuid ===
            tipo_alimentacao_sub.uuid
          ) {
            if (tipo_alimentacao_sub.label.includes("lanche")) {
              periodosQuePossuemLancheNaAlteracao[
                `${substituicao.periodo_escolar.nome}`
              ].temNaSolicitacao = true;
              if (
                periodosQuePossuemLancheNaAlteracao[
                  `${substituicao.periodo_escolar.nome}`
                ].temNaSolicitacao &&
                periodosQuePossuemLancheNaAlteracao[
                  `${substituicao.periodo_escolar.nome}`
                ].status
              ) {
                periodosQuePossuemLancheNaAlteracao.temRestricao = true;
              } else {
                periodosQuePossuemLancheNaAlteracao.temRestricao = false;
              }
            }
          }
        }
      );
    });
    this.setState({ periodosQuePossuemLancheNaAlteracao });
  };

  OnEditButtonClicked(param) {
    let dataInicial = this.state.dataInicial;
    let {
      substituicoesAlimentacao,
      periodos,
      ehAlteracaoComLancheRepetida
    } = this.state;
    ehAlteracaoComLancheRepetida =
      param["alteracaoDeCardapio"].eh_alteracao_com_lanche_repetida;
    dataInicial = param["alteracaoDeCardapio"].data_inicial;
    this.props.reset("alteracaoCardapio");
    param.alteracaoDeCardapio.substituicoes.forEach(substituicao => {
      substituicao.tipo_alimentacao_de["nome"] =
        substituicao.tipo_alimentacao_de.label;
      substituicao.tipo_alimentacao_para["nome"] =
        substituicao.tipo_alimentacao_para.label;
      substituicao.tipo_alimentacao_de.substituicoes.forEach(
        substituicao_sub => {
          substituicao_sub["nome"] = substituicao_sub.label;
        }
      );
    });
    this.props.loadAlteracaoCardapio(param.alteracaoDeCardapio);
    this.retornaOpcoesAlteracao(undefined, param.alteracaoDeCardapio);
    param.alteracaoDeCardapio.substituicoes.forEach((substituicao, index) => {
      substituicoesAlimentacao[index].substituicoes =
        substituicao.tipo_alimentacao_de.substituicoes;
    });
    this.atualizaEverificaSeEhAlteracaoRepetida(
      param.alteracaoDeCardapio.substituicoes
    );
    periodos.forEach(periodo => {
      periodo.checked =
        param.alteracaoDeCardapio[`substituicoes_${periodo.nome}`];
    });
    this.setState({
      dataInicial,
      status: param.alteracaoDeCardapio.status,
      title: `Alteração de Cardápio # ${param.alteracaoDeCardapio.id_externo}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.alteracaoDeCardapio.id_externo,
      substituicoesAlimentacao,
      periodos,
      ehAlteracaoComLancheRepetida
    });
  }

  refresh() {
    let alteracaoCardapioList = this.state.alteracaoCardapioList;
    escolaListarRascunhosDeSolicitacaoDeAlteracaoCardapio(
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    )
      .then(response => {
        alteracaoCardapioList =
          response.data.results.length > 0 ? response.data.results : [];
        this.setState({
          alteracaoCardapioList
        });
      })
      .catch(error => {
        toastError("Houve um erro ao carregar Rascunhos Salvos", error);
      });
  }

  resetForm() {
    let { periodos } = this.state;

    this.props.loadAlteracaoCardapio(null);
    this.props.change("alterar_dia", null);
    this.props.change("data_inicial", null);
    this.props.change("data_final", null);
    this.props.change("motivo", null);
    this.props.change("observacao", "<p><p/>\n");
    periodos.forEach(periodo => {
      periodo.checked = false;
    });
    this.setState({
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dataInicial: null,
      periodos
    });
    this.buscaPeriodosParaVerificarSePossuiAlteracoesComLanche(periodos);
    const vinculo = this.props.meusDados.vinculo_atual.instituicao.uuid;
    this.atualizaAlteracoesComLancheMesCorrente(
      vinculo,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    );
  }

  enviaAlteracaoCardapio(uuid) {
    escolaIniciarSolicitacaoDeAlteracaoDeCardapio(
      uuid,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    ).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Alteração de Cardápio enviada com sucesso");
          this.refresh();
          this.resetForm("alteracaoCardapio");
        } else {
          toastError(
            `Houve um erro ao enviar a Alteração de Cardápio: ${getError(
              res.data
            )}`
          );
        }
      },
      function() {
        toastError("Houve um erro ao enviar a Alteração de Cardápio");
      }
    );
  }

  onSubmit(values) {
    return new Promise(() => {
      values.escola = this.props.meusDados.vinculo_atual.instituicao.uuid;
      const status = values.status;
      delete values.status;
      const erros = validateSubmit(values, this.props.meusDados);
      if (!erros) {
        this.resetaTodoPeriodoCheck();
        if (!values.uuid) {
          escolaCriarSolicitacaoDeAlteracaoCardapio(
            values,
            TIPO_SOLICITACAO.SOLICITACAO_NORMAL
          )
            .then(async response => {
              if (response.status === HTTP_STATUS.CREATED) {
                if (status === STATUS_DRE_A_VALIDAR) {
                  await this.enviaAlteracaoCardapio(response.data.uuid);
                } else {
                  toastSuccess("Alteração de Cardápio salva com sucesso");
                  this.refresh();
                  this.resetForm("alteracaoCardapio");
                }
                this.resetForm();
              }
            })
            .catch(error => {
              toastError(getError(error.data));
              this.resetForm("alteracaoCardapio");
              this.refresh();
            });
        } else {
          escolaAlterarSolicitacaoDeAlteracaoCardapio(
            values.uuid,
            JSON.stringify(values),
            TIPO_SOLICITACAO.SOLICITACAO_NORMAL
          ).then(
            async res => {
              if (res.status === HTTP_STATUS.OK) {
                if (status === STATUS_DRE_A_VALIDAR) {
                  await this.enviaAlteracaoCardapio(res.data.uuid);
                  this.refresh();
                } else {
                  toastSuccess("Alteração de Cardápio salva com sucesso");
                  this.refresh();
                  this.resetForm("alteracaoCardapio");
                }
              } else {
                toastError(
                  `Houve um erro ao enviar ao salvar alteração de cardápio: ${getError(
                    res.data
                  )}`
                );
              }
            },
            function() {
              toastError("Houve um erro ao salvar a Alteração de Cardápio");
            }
          );
        }
      } else {
        toastError(erros);
      }
    });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  showModalConfirm(values) {
    this.setState({ ...this.state, values, showModalConfirm: true });
  }

  closeModalConfirm() {
    this.setState({ ...this.state, showModalConfirm: false });
  }

  onAlterarDiaChanged(event) {
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        event.target.value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
    }
  }

  OnDeleteButtonClicked(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      escolaExcluirSolicitacaoDeAlteracaoCardapio(
        uuid,
        TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      ).then(
        statusCode => {
          if (statusCode === HTTP_STATUS.NO_CONTENT) {
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
    }
  }

  resetaTodoPeriodoCheck() {
    let periodos = this.state.periodos;
    periodos.forEach(periodo => {
      if (periodo.checked) {
        periodo.checked = false;
      }
    });
    this.setState({ periodos });
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  obtemDataInicial = value => {
    let dataInicial = this.state.dataInicial;
    dataInicial = moment(value, "DD/MM/YYYY").add(1, "days")["_d"];
    this.setState({ dataInicial });
  };

  limpaCamposAlteracaoDoPeriodo(periodo, periodoNome) {
    if (periodo.checked) {
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_de`,
        null
      );
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_para`,
        null
      );
    }
  }

  atualizaPeriodoCheck(input, indice, periodoNome) {
    let periodos = this.state.periodos;
    this.limpaCamposAlteracaoDoPeriodo(periodos[indice], periodoNome);
    periodos[indice].checked = !periodos[indice].checked;
    this.props.change(input, periodos[indice].checked);
    this.setState({ periodos });
  }

  selectSubstituicoesAlimentacaoAPartirDe = (alimentacaoUUID, indice) => {
    let periodos = this.state.periodos;
    const tiposAlimentacao = periodos[indice].tipos_alimentacao;
    let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    tiposAlimentacao.forEach(tipoAlimentacao => {
      if (tipoAlimentacao.uuid === alimentacaoUUID) {
        substituicoesAlimentacao[indice].substituicoes =
          tipoAlimentacao.substituicoes;
        substituicoesAlimentacao[indice].uuidAlimentacao = alimentacaoUUID;
      }
    });
    this.setState({ substituicoesAlimentacao });
  };

  resetAlteracaoDoPeriodo(uuidInput, periodoNome, indice) {
    let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    if (substituicoesAlimentacao[indice].uuidAlimentacao !== uuidInput) {
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_para`,
        null
      );
    }
  }

  exibeModalConfirmacao = values => {
    const {
      periodosQuePossuemLancheNaAlteracao,
      ehAlteracaoComLancheRepetida
    } = this.state;
    if (
      periodosQuePossuemLancheNaAlteracao.temRestricao &&
      ehAlteracaoComLancheRepetida
    ) {
      values["eh_alteracao_com_lanche_repetida"] = true;
      return this.showModalConfirm(values);
    }
    if (!ehAlteracaoComLancheRepetida) {
      if (periodosQuePossuemLancheNaAlteracao.temRestricao) {
        values["eh_alteracao_com_lanche_repetida"] = true;
        return this.showModalConfirm(values);
      } else {
        values["eh_alteracao_com_lanche_repetida"] = false;
        this.onSubmit(values);
      }
    } else {
      values["eh_alteracao_com_lanche_repetida"] = false;
      this.onSubmit(values);
    }
  };

  render() {
    const {
      loading,
      alteracaoCardapioList,
      showModal,
      showModalConfirm,
      dataInicial,
      periodos,
      substituicoesAlimentacao,
      values
    } = this.state;
    const {
      handleSubmit,
      meusDados,
      proximos_dois_dias_uteis,
      motivos,
      pristine,
      submitting
    } = this.props;
    return (
      <Fragment>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form
            className="mt-3"
            onSubmit={handleSubmit}
            onKeyPress={this.onKeyPress}
          >
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={
                meusDados.vinculo_atual.instituicao.quantidade_alunos
              }
            />

            {alteracaoCardapioList.length > 0 && (
              <section className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  alteracaoCardapioList={alteracaoCardapioList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </section>
            )}
            <section className="card  mt-3">
              <div className="card-body">
                <div
                  className="card-title font-weight-bold descricao"
                  style={this.fontHeader}
                >
                  Descrição da Alteração
                </div>
                <section className="section-form-datas mt-4">
                  <Field
                    component={InputComData}
                    onBlur={event => this.onAlterarDiaChanged(event)}
                    name="alterar_dia"
                    minDate={proximos_dois_dias_uteis}
                    maxDate={moment()
                      .endOf("year")
                      .toDate()}
                    label="Alterar dia"
                    disabled={this.props.data_inicial || this.props.data_final}
                  />
                  <div className="opcao-data">Ou</div>
                  <Field
                    component={InputComData}
                    name="data_inicial"
                    label="De"
                    minDate={proximos_dois_dias_uteis}
                    maxDate={moment()
                      .endOf("year")
                      .toDate()}
                    disabled={this.props.alterar_dia}
                    onChange={value => this.obtemDataInicial(value)}
                  />
                  <Field
                    component={InputComData}
                    name="data_final"
                    label="Até"
                    disabled={dataInicial === null || this.props.alterar_dia}
                    minDate={dataInicial}
                    maxDate={moment()
                      .endOf("year")
                      .toDate()}
                  />
                </section>
                <section className="section-form-motivo mt-3">
                  <Field
                    component={Select}
                    name="motivo"
                    label="Motivo"
                    options={motivos}
                    validate={required}
                    required
                  />
                </section>
              </div>
              <hr />
              <div className="card-body">
                <header className="descricao-periodos-alimentacao">
                  <div>Período</div>
                  <div>Alterar alimentação de:</div>
                  <div>Para alimentação:</div>
                </header>
                {periodos.map((periodo, indice) => {
                  this.props.change(
                    `substituicoes_${periodo.nome}.periodo`,
                    periodo.uuid
                  );
                  return (
                    <FormSection
                      name={`substituicoes_${periodo.nome}`}
                      className="item-periodo-alimentacao"
                      key={indice}
                    >
                      <Fragment>
                        <label
                          htmlFor="check"
                          className="checkbox-label"
                          style={{
                            background: periodo.style.background,
                            border: `1px solid ${periodo.style.borderColor}`
                          }}
                        >
                          <Field
                            component={"input"}
                            type="checkbox"
                            name="check"
                          />
                          <span
                            onClick={() =>
                              this.atualizaPeriodoCheck(
                                `substituicoes_${periodo.nome}.check`,
                                indice,
                                periodo.nome
                              )
                            }
                            className="checkbox-custom"
                            data-cy={`checkbox-${periodo.nome}`}
                          />
                          <div className=""> {periodo.nome}</div>
                        </label>
                      </Fragment>

                      <Field
                        component={Select}
                        name="tipo_alimentacao_de"
                        options={agregarDefault(periodo.tipos_alimentacao)}
                        disabled={!periodo.checked}
                        onChange={event => {
                          this.resetAlteracaoDoPeriodo(
                            event.target.value,
                            periodo.nome,
                            indice
                          );
                          this.selectSubstituicoesAlimentacaoAPartirDe(
                            event.target.value,
                            indice
                          );
                        }}
                        validate={periodo.checked && required}
                        required={periodo.checked}
                      />

                      <Field
                        component={Select}
                        name="tipo_alimentacao_para"
                        disabled={!periodo.checked}
                        options={agregarDefault(
                          substituicoesAlimentacao.length > 0
                            ? substituicoesAlimentacao[indice].substituicoes
                            : []
                        )}
                        onChange={event => {
                          this.verificaSeEhLancheNoTipoDeAlimentacao(
                            event.target.value,
                            substituicoesAlimentacao[indice].substituicoes,
                            periodo.nome
                          );
                        }}
                        validate={periodo.checked && required}
                        required={periodo.checked}
                      />
                    </FormSection>
                  );
                })}
              </div>
              <hr />
              <div className="card-body">
                <Field
                  component={TextAreaWYSIWYG}
                  label="Observações"
                  name="observacao"
                  required
                  validate={[textAreaRequired, peloMenosUmCaractere]}
                />
              </div>
              <article className="card-body footer-button">
                <Botao
                  texto="Cancelar"
                  onClick={event => this.resetForm(event)}
                  disabled={pristine || submitting}
                  style={BUTTON_STYLE.OutlinePrimary}
                />
                <Botao
                  disabled={pristine || submitting}
                  texto={this.state.salvarAtualizarLbl}
                  onClick={handleSubmit(values =>
                    this.exibeModalConfirmacao(values)
                  )}
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.OutlinePrimary}
                />
                <Botao
                  texto="Enviar"
                  disabled={pristine || submitting}
                  type={BUTTON_TYPE.SUBMIT}
                  onClick={handleSubmit(values =>
                    this.exibeModalConfirmacao({
                      ...values,
                      status: STATUS_DRE_A_VALIDAR
                    })
                  )}
                  style={BUTTON_STYLE.Primary}
                />
              </article>
            </section>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={this.closeModal}
            />
            <ModalConfirmaAlteracao
              showModal={showModalConfirm}
              closeModal={this.closeModalConfirm}
              values={values}
              onSubmit={this.onSubmit}
            />
          </form>
        )}
      </Fragment>
    );
  }
}

const AlteracaoCardapioForm = reduxForm({
  form: "alteracaoCardapio",
  enableReinitialize: true
})(AlteracaoCardapio);

const selector = formValueSelector("alteracaoCardapio");

const mapStateToProps = state => {
  return {
    initialValues: state.alteracaoCardapio.data,
    data_inicial: selector(state, "data_inicial"),
    data_final: selector(state, "data_final"),
    alterar_dia: selector(state, "alterar_dia"),
    motivo: selector(state, "motivo"),
    observacao: selector(state, "observacao")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadAlteracaoCardapio
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlteracaoCardapioForm);
