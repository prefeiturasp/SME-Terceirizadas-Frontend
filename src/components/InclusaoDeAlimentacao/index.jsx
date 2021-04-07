import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, FormSection, reduxForm } from "redux-form";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";
import {
  maxValue,
  naoPodeSerZero,
  numericInteger,
  required
} from "../../helpers/fieldValidators";
import {
  agregarDefault,
  checaSeDataEstaEntre2e5DiasUteis,
  formatarParaMultiselect,
  geradorUUID,
  getDataObj,
  getError
} from "../../helpers/utilities";
import { loadFoodInclusion } from "../../reducers/foodInclusionReducer";
import { getVinculosTipoAlimentacaoPorEscola } from "../../services/cadastroTipoAlimentacao.service";
import { getQuantidaDeAlunosPorPeriodoEEscola } from "../../services/escola.service";
import { Botao } from "../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "../Shareable/Botao/constants";
import CardMatriculados from "../Shareable/CardMatriculados";
import { InputComData } from "../Shareable/DatePicker";
import { InputText } from "../Shareable/Input/InputText";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { Select } from "../Shareable/Select";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import Weekly from "../Shareable/Weekly/Weekly";
import {
  abstraiPeriodosComAlunosMatriculados,
  construirPeriodosECombos,
  extrairTiposALimentacao,
  formatarSubmissaoSolicitacaoContinua,
  formatarSubmissaoSolicitacaoNormal
} from "./helper";
import { Rascunhos } from "./Rascunhos";
import "./style.scss";
import { validarSubmissao } from "./validacao";
import {
  escolaCriarSolicitacaoDeInclusaoDeAlimentacao,
  escolaAlterarSolicitacaoDeInclusaoDeAlimentacao,
  escolaIniciarSolicitacaoDeInclusaoDeAlimentacao,
  escolaExcluirSolicitacaoDeInclusaoDeAlimentacao,
  obterMinhasSolicitacoesDeInclusaoDeAlimentacao
} from "services/inclusaoDeAlimentacao";
import { TIPO_SOLICITACAO } from "constants/shared";

const ENTER = 13;
class InclusaoDeAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validacaoPeriodos: [],
      loading: true,
      loadQuantidadeAlunos: false,
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
      ],
      acimaDoLimite: []
    };
    this.carregarRascunho = this.carregarRascunho.bind(this);
    this.removerRascunho = this.removerRascunho.bind(this);
    this.adicionarDia = this.adicionarDia.bind(this);
    this.removerDia = this.removerDia.bind(this);
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
    let acimaDoLimite = this.state.acimaDoLimite;
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
    if (field === "outro_motivo") {
      value = value.target.value;
      if (value.length > 500) {
        const index = acimaDoLimite.indexOf(id);
        if (index === -1) {
          acimaDoLimite.push(id);
        }
      } else {
        const index = acimaDoLimite.indexOf(id);
        if (index > -1) {
          acimaDoLimite.splice(index, 1);
        }
      }
    }
    inclusoes[indiceDiaMotivo][field] = value;
    this.setState({
      inclusoes
    });
    this.setState({
      acimaDoLimite
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

  onCheckInput = indice => {
    let periodos = this.state.periodos;
    if (periodos[indice].checked) {
      periodos[indice].tipos_alimentacao_selecionados = [];
      this.props.change(
        `quantidades_periodo_${periodos[indice].nome}.numero_alunos`,
        null
      );
    }

    periodos[indice].checked = !periodos[indice].checked;
    periodos[indice].multiselect = periodos[indice].checked
      ? "multiselect-wrapper-enabled"
      : "multiselect-wrapper-disabled";

    periodos[indice].validador = periodos[indice].checked
      ? [
          naoPodeSerZero,
          numericInteger,
          maxValue(periodos[indice].maximo_alunos)
        ]
      : [];

    this.props.change(
      `quantidades_periodo_${periodos[indice].nome}.check`,
      periodos[indice].checked
    );
    this.setState({ periodos });
  };

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

  closeModal() {
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

  removerDia(indiceAExcluir) {
    if (window.confirm("Deseja remover este dia?")) {
      this.setState({
        inclusoes: this.state.inclusoes.filter(
          (_, indice) => indice !== indiceAExcluir
        )
      });
    }
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

  removerRascunho(id_externo, uuid, tipoSolicitacao) {
    if (window.confirm("Deseja remover este rascunho?")) {
      escolaExcluirSolicitacaoDeInclusaoDeAlimentacao(
        uuid,
        tipoSolicitacao
      ).then(
        res => {
          if (res.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.refresh();
          } else {
            // ARRUMAR O TOAST PARA MOSTRAR A MENSAGEM DE ERRO DO BACKEND SOBRE DATA NO FERIADO
            toastError(
              `Houve um erro ao excluir o rascunho: ${getError(res.data)}`
            );
          }
        },
        error => {
          toastError(`Houve um erro ao excluir o rascunho: ${getError(error)}`);
        }
      );
    }
  }

  resetForm() {
    this.props.reset("foodInclusion");
    this.props.loadFoodInclusion(null);
    let periodos = this.state.periodos;
    periodos.forEach(periodo => {
      periodo["checked"] = false;
      periodo["tipos_alimentacao_selecionados"] = [];
      periodo["numero_alunos"] = null;
      periodo["multiselect"] = "multiselect-wrapper-disabled";
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
    this.retetaCamposQuantidadeAlunosETiposAlimentacao(this.props.periodos);
    this.refresh();
  }

  retetaCamposQuantidadeAlunosETiposAlimentacao(periodos) {
    periodos.forEach((periodo, indice) => {
      this.bloqueiaCamposQuantidadeAlunosReset(indice, periodo);
    });
  }

  bloqueiaCamposQuantidadeAlunosReset(indice, periodo) {
    let { periodos, validacaoPeriodos } = this.state;
    if (validacaoPeriodos[indice].checado === true) {
      validacaoPeriodos[indice].checado = false;
      periodos[indice].tipos_alimentacao_selecionados = [];
      this.resetaCampoQuantidadeAlunos(periodo);
    }
    this.setState({ validacaoPeriodos, periodos });
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
      title: `Inclusão de Alimentação # ${inclusaoDeAlimentacao.id_externo}`,
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

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    const {
      motivos_simples,
      motivos_continuos,
      meusDados,
      proximos_dois_dias_uteis
    } = this.props;
    let { loading, periodos, loadQuantidadeAlunos } = this.state;
    if (
      motivos_simples !== [] &&
      motivos_continuos !== [] &&
      periodos !== [] &&
      meusDados !== null &&
      proximos_dois_dias_uteis !== null &&
      loading &&
      periodos.length > 0 &&
      loadQuantidadeAlunos
    ) {
      this.setState({
        loading: false
      });
    }
    const escola = meusDados && meusDados.vinculo_atual.instituicao.uuid;
    if (
      meusDados &&
      periodos.length === 0 &&
      loading &&
      prevProps.meusDados !== meusDados
    ) {
      const vinculo = this.props.meusDados.vinculo_atual.instituicao.uuid;
      getVinculosTipoAlimentacaoPorEscola(vinculo).then(response => {
        periodos = construirPeriodosECombos(response.results);
        this.adicionaIndiceNoValidacaoPeriodos(periodos);
        this.setState({ periodos });
      });
    }
    if (periodos.length > 0 && loading && !loadQuantidadeAlunos) {
      getQuantidaDeAlunosPorPeriodoEEscola(escola).then(response => {
        if (periodos !== []) {
          periodos = abstraiPeriodosComAlunosMatriculados(
            periodos,
            response.results
          );
        }
        this.setState({ periodos, loadQuantidadeAlunos: true });
      });
    }
  }

  refresh() {
    // FIXME: Usar Promise.all()
    let rascunhosInclusaoDeAlimentacao = [];
    obterMinhasSolicitacoesDeInclusaoDeAlimentacao(
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    ).then(
      response => {
        rascunhosInclusaoDeAlimentacao = rascunhosInclusaoDeAlimentacao.concat(
          response.results
        );
        obterMinhasSolicitacoesDeInclusaoDeAlimentacao(
          TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
        ).then(
          responseNormais => {
            rascunhosInclusaoDeAlimentacao = rascunhosInclusaoDeAlimentacao.concat(
              responseNormais.results
            );
            this.setState({
              rascunhosInclusaoDeAlimentacao
            });
          },
          error => {
            toastError(
              `Erro ao carregar as inclusões salvas: ${getError(error)}`
            );
          }
        );
      },
      error => {
        toastError(`Erro ao carregar as inclusões salvas: ${getError(error)}`);
      }
    );
  }

  iniciarPedido(uuid, tipoInclusao) {
    escolaIniciarSolicitacaoDeInclusaoDeAlimentacao(uuid, tipoInclusao).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Inclusão de Alimentação enviada com sucesso!");
          this.resetForm();
        } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(
            `Houve um erro ao enviar a Inclusão de Alimentação: ${getError(
              res.data
            )}`
          );
        }
      },
      error => {
        toastError(
          `Houve um erro ao enviar a Inclusão de Alimentação: ${getError(
            error
          )}`
        );
      }
    );
  }

  // FIXME: Esses dois fluxos na verdade são um só
  // Ele só precisa ser parametrizado para suportar os dois casos
  fluxoSolicitacaoContinua(values) {
    const payload = JSON.stringify(
      formatarSubmissaoSolicitacaoContinua(values, this.props.meusDados)
    );
    if (!values.uuid) {
      escolaCriarSolicitacaoDeInclusaoDeAlimentacao(
        payload,
        TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
      ).then(
        res => {
          if (res.status === HTTP_STATUS.CREATED) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(
                res.data.uuid,
                TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
              );
            } else {
              toastSuccess("Rascunho salvo com sucesso");
              this.resetForm();
            }
            this.refresh();
          } else {
            toastError(
              `Houve um erro ao salvar o rascunho: ${getError(res.data)}`
            );
          }
        },
        error => {
          toastError(`Houve um erro ao salvar o rascunho: ${getError(error)}`);
        }
      );
    } else {
      escolaAlterarSolicitacaoDeInclusaoDeAlimentacao(
        values.uuid,
        payload,
        TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
      ).then(
        res => {
          if (res.status === HTTP_STATUS.OK) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(
                res.data.uuid,
                TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
              );
            } else {
              toastSuccess("Rascunho atualizado com sucesso");
              this.resetForm();
            }
            this.refresh();
          } else {
            toastError(
              `Houve um erro ao atualizar a inclusão de alimentação: ${getError(
                res.data
              )}`
            );
          }
        },
        error => {
          toastError(
            `Houve um erro ao atualizar a inclusão de alimentação: ${getError(
              error
            )}`
          );
        }
      );
    }
  }

  fluxoSolicitacaoNormal(values) {
    const payload = JSON.stringify(
      formatarSubmissaoSolicitacaoNormal(values, this.props.meusDados)
    );
    // Criacao
    if (!values.uuid) {
      escolaCriarSolicitacaoDeInclusaoDeAlimentacao(
        payload,
        TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      ).then(
        res => {
          if (res.status === HTTP_STATUS.CREATED) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(
                res.data.uuid,
                TIPO_SOLICITACAO.SOLICITACAO_NORMAL
              );
            } else {
              toastSuccess("Rascunho salvo com sucesso");
              this.resetForm();
            }
            this.refresh();
          } else {
            toastError(
              `Houve um erro ao salvar o rascunho: ${getError(res.data)}`
            );
          }
        },
        error => {
          toastError(`Houve um erro ao salvar o rascunho: ${getError(error)}`);
        }
      );
    } else {
      // Edicao
      escolaAlterarSolicitacaoDeInclusaoDeAlimentacao(
        values.uuid,
        payload,
        TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      ).then(
        res => {
          if (res.status === HTTP_STATUS.OK) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(
                res.data.uuid,
                TIPO_SOLICITACAO.SOLICITACAO_NORMAL
              );
            } else {
              toastSuccess("Rascunho atualizado com sucesso");
              this.resetForm();
            }
            this.refresh();
          } else {
            toastError(
              `Houve um erro ao atualizar a inclusão de alimentação: ${getError(
                res.data
              )}`
            );
          }
        },
        error => {
          toastError(
            `Houve um erro ao atualizar a inclusão de alimentação: ${getError(
              error
            )}`
          );
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
      loading
    } = this.state;
    const primeiroEhMotivoContinuo =
      inclusoes[0].motivo && inclusoes[0].motivoContinuo;
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
                meusDados.vinculo_atual.instituicao.quantidade_alunos
                  ? meusDados.vinculo_atual.instituicao.quantidade_alunos
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
                  resetForm={() => this.resetForm()}
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
                  const ehMotivoContinuo =
                    diaMotivo.motivo && diaMotivo.motivoContinuo;
                  return (
                    <FormSection
                      key={indice}
                      name={`inclusoes_${diaMotivo.id}`}
                    >
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
                              maxDate={moment()
                                .endOf("year")
                                .toDate()}
                              label="Dia"
                              required
                              validate={required}
                            />
                          )}
                        </div>
                        {diaMotivo.outroMotivo && (
                          <div className="grid-outro-motivo pb-2">
                            <Field
                              component={TextArea}
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
                            {this.state.acimaDoLimite.includes(
                              diaMotivo.id
                            ) && (
                              <div className="error-msg">
                                Limite máximo de 500 caracteres
                              </div>
                            )}
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
                              maxDate={moment()
                                .endOf("year")
                                .toDate()}
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
                                maxDate={moment()
                                  .endOf("year")
                                  .toDate()}
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
                        {indice > 0 && (
                          <Botao
                            texto="Remover dia"
                            type={BUTTON_TYPE.SUBMIT}
                            onClick={() => this.removerDia(indice)}
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            icon={BUTTON_ICON.TRASH}
                            className="botao-remover-dia"
                          />
                        )}
                      </section>
                    </FormSection>
                  );
                })}
                {!primeiroEhMotivoContinuo && (
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
                    <FormSection
                      key={indice}
                      name={`quantidades_periodo_${periodo.nome}`}
                    >
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
                                  this.onCheckInput(indice);
                                }}
                                className="checkbox-custom"
                                data-cy={`checkbox-${periodo.nome}`}
                              />{" "}
                              {periodo.nome}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-5 mr-5">
                          <div className={periodo.multiselect}>
                            <Field
                              component={StatefulMultiSelect}
                              name="tipos_alimentacao"
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
                            disabled={!periodo.checked}
                            type="number"
                            name={`numero_alunos`}
                            min="0"
                            className="form-control quantidade-aluno"
                            required={periodo.checked}
                            validate={periodo.checked && periodo.validador}
                          />
                        </div>
                      </div>
                    </FormSection>
                  );
                })}
                <hr className="w-100" />

                <div className="form-group row float-right mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      onClick={() => this.resetForm()}
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
                      texto="Enviar"
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
