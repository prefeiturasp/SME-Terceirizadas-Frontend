import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { Select } from "../../Shareable/Select";
import { Botao } from "../../Shareable/Botao";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import TabelaQuantidadePorFaixaEtaria from "../../Shareable/TabelaQuantidadePorFaixaEtaria";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { Field, formValueSelector, reduxForm, FormSection } from "redux-form";
import { bindActionCreators } from "redux";
import { loadAlteracaoCardapioCei } from "../../../reducers/alteracaoCardapioReducer";
import { connect } from "react-redux";
import { Rascunhos } from "../Rascunhos";
import {
  required,
  textAreaRequired,
  numericInteger,
  minValue,
  maxValue,
  peloMenosUmCaractere
} from "../../../helpers/fieldValidators";
import {
  checaSeDataEstaEntre2e5DiasUteis,
  formatarParaMultiselect,
  getError
} from "../../../helpers/utilities";
import { InputComData } from "../../Shareable/DatePicker";
import { construirPeriodosECombos } from "../helper";
import { agregarDefault } from "../../../helpers/utilities";
import { getVinculosTipoAlimentacaoPorTipoUnidadeEscolar } from "../../../services/cadastroTipoAlimentacao.service";
import "../style.scss";
import "./style.scss";
import { TextAreaWYSIWYG } from "../../Shareable/TextArea/TextAreaWYSIWYG";
import ModalDataPrioritaria from "../../Shareable/ModalDataPrioritaria";
import { toastSuccess, toastError } from "../../Shareable/Toast/dialogs";
import {
  getAlunosPorFaixaEtariaNumaData,
  // FIXME: remove unused imports
  /*   getMeusRascunhosAlteracoesCardapioCei,
  criaAlteracaoCardapioCei,
  iniciaFluxoAlteracaoCardapioCei,
  atualizaAlteracaoCardapioCei,
  deleteAlteracaoCardapioCei */
  escolaListarRascunhosDeSolicitacaoDeAlteracaoCardapio,
  escolaCriarSolicitacaoDeAlteracaoCardapio,
  escolaAlterarSolicitacaoDeAlteracaoCardapio,
  escolaIniciarSolicitacaoDeAlteracaoDeCardapio,
  escolaExcluirSolicitacaoDeAlteracaoCardapio
} from "services/alteracaoDeCardapio";
import { converterDDMMYYYYparaYYYYMMDD } from "../../../helpers/utilities";
import moment from "moment";
import { parseFormValues } from "./helper";
import CheckboxPeriodo from "./CheckboxPeriodo";
import { TIPO_SOLICITACAO } from "constants/shared";

const { SOLICITACAO_CEI } = TIPO_SOLICITACAO;

const ENTER = 13;

class AlteracaoCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodos: [],
      loading: true,
      alteracaoCardapioList: [],
      motivo: null,
      status: "SEM STATUS",
      title: "Nova Alteração do Tipo de Alimentação",
      id: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      substituicoesAlimentacao: [],
      substituicoesEdit: [],
      dataInicial: null,
      ultimaDataAlteracao: undefined
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.mudaMotivo = this.mudaMotivo.bind(this);
    this.formataOpcoesDe = this.formataOpcoesDe.bind(this);
  }

  componentDidUpdate = async () => {
    const { meusDados, proximos_dois_dias_uteis, data_alteracao } = this.props;
    let {
      loading,
      periodos,
      substituicoesAlimentacao,
      ultimaDataAlteracao
    } = this.state;

    if (
      meusDados &&
      proximos_dois_dias_uteis &&
      loading &&
      periodos.length === 0
    ) {
      const vinculo = this.props.meusDados.vinculo_atual.instituicao
        .tipo_unidade_escolar;

      const response = await getVinculosTipoAlimentacaoPorTipoUnidadeEscolar(
        vinculo
      );
      periodos = construirPeriodosECombos(
        response.results.filter(combo =>
          this.props.periodos.find(
            periodo => periodo.uuid === combo.periodo_escolar.uuid
          )
        )
      );
      periodos.forEach(periodo => this.montaObjetoDeSubstituicoesEdit(periodo));
      this.setState({ periodos, loading: false });
    }

    if (substituicoesAlimentacao.length === 0) {
      periodos.forEach(periodo => {
        periodo["ck"] = null;
        substituicoesAlimentacao.push({ substituicoes: [] });
      });
    }
    if (data_alteracao && ultimaDataAlteracao !== data_alteracao) {
      this.setState({ ultimaDataAlteracao: data_alteracao });
      for (let periodo of periodos) {
        const response = await getAlunosPorFaixaEtariaNumaData(
          periodo.uuid,
          converterDDMMYYYYparaYYYYMMDD(data_alteracao)
        );
        periodo.alunosPorFaixaEtaria = response.data.results
          .filter(info => info.faixa_etaria.inicio >= 12)
          .sort((a, b) => a.faixa_etaria.inicio - b.faixa_etaria.inicio);
        periodo.alunosPorFaixaEtaria.forEach(faixa => {
          faixa.validators = [
            numericInteger,
            minValue(0),
            maxValue(faixa.count)
          ];
        });

        this.props.change(
          `substituicoes_${periodo.nome}.alunosPorFaixaEtaria`,
          periodo.alunosPorFaixaEtaria
        );
      }
      this.setState({ ultimaDataAlteracao: data_alteracao, periodos });
    }
  };

  componentDidMount() {
    this.refresh();
  }

  removerOpcoesSubstitutos(value, periodo, indice) {
    let periodos = this.state.periodos;
    let motivo = this.state.motivo;
    let opcoesSubstitutos = [];
    if (value && value.length) {
      opcoesSubstitutos = periodo.tipos_alimentacao.filter(
        substituto => !value.includes(substituto.uuid)
      );
      if (motivo) {
        switch (motivo.nome) {
          case "RPL - Refeição por Lanche":
            opcoesSubstitutos = opcoesSubstitutos.filter(ta =>
              ["Lanche"].includes(ta.nome)
            );
            break;
          case "LPR - Lanche por Refeição":
            opcoesSubstitutos = opcoesSubstitutos.filter(ta =>
              ["Refeição da tarde", "Almoço"].includes(ta.nome)
            );
            break;
          default:
            break;
        }
      }
    }
    opcoesSubstitutos = opcoesSubstitutos.map(substituto => {
      return {
        nome: substituto.nome,
        uuid: substituto.uuid
      };
    });
    periodos[indice].substituicoes = agregarDefault(opcoesSubstitutos);
    this.setState({
      periodos: periodos
    });
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
        item.substituicoes = substituicao.tipos_alimentacao_de.substituicoes;
      }
      if (
        periodos[indice] &&
        periodos[indice].nome === substituicao.periodo_escolar.nome
      ) {
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

  OnEditButtonClicked(param) {
    const alteracaoDeCardapio = param.alteracaoDeCardapio;
    const periodos = this.state.periodos.map(periodo => {
      const index = alteracaoDeCardapio.substituicoes.findIndex(
        substituicao => substituicao.periodo_escolar.nome === periodo.nome
      );
      periodo.checked = index > -1;
      periodo.substituicoes =
        periodo.tipos_alimentacao.length > 0
          ? agregarDefault([
              alteracaoDeCardapio.substituicoes.find(
                substituicao =>
                  substituicao.periodo_escolar.nome === periodo.nome
              ).tipo_alimentacao_para
            ])
          : agregarDefault([]);
      return periodo;
    });
    this.setState({ periodos });
    this.props.loadAlteracaoCardapioCei(alteracaoDeCardapio);
  }

  refresh = async () => {
    let alteracaoCardapioList = this.state.alteracaoCardapioList;
    try {
      const response = await escolaListarRascunhosDeSolicitacaoDeAlteracaoCardapio(
        SOLICITACAO_CEI
      );
      if (response.status === HTTP_STATUS.OK) {
        alteracaoCardapioList =
          response.data.results.length > 0 ? response.data.results : [];
        this.setState({
          alteracaoCardapioList
        });
      }
    } catch (error) {
      toastError("Houve um erro ao carregar Rascunhos Salvos", error);
    }
  };

  resetForm() {
    let { periodos } = this.state;
    this.props.loadAlteracaoCardapioCei(null);
    this.props.reset();
    periodos.forEach(periodo => {
      periodo.checked = false;
    });
    this.setState({
      status: "SEM STATUS",
      title: "Nova Alteração do Tipo de Alimentação",
      id: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dataInicial: null,
      periodos
    });
  }

  enviaAlteracaoCardapio(uuid) {
    escolaIniciarSolicitacaoDeAlteracaoDeCardapio(
      uuid,
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    ).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Alteração do Tipo de Alimentação enviada com sucesso");
          this.refresh();
          this.resetForm("alteracaoCardapio");
        } else {
          toastError(
            `Houve um erro ao enviar a Alteração do Tipo de Alimentação ${getError(
              res.data
            )}`
          );
        }
      },
      function() {
        toastError(
          "Houve um erro ao enviar a Alteração do Tipo de Alimentação"
        );
      }
    );
  }

  onSubmit = async (values, rascunho = false) => {
    return new Promise(async () => {
      const parsedValues = parseFormValues(values);
      parsedValues.escola = this.props.meusDados.vinculo_atual.instituicao.uuid;

      let response;
      let statusOk;

      if (values.uuid) {
        parsedValues.uuid = values.uuid;
        response = await escolaAlterarSolicitacaoDeAlteracaoCardapio(
          values.uuid,
          parsedValues,
          SOLICITACAO_CEI
        );
        statusOk = HTTP_STATUS.OK;
      } else {
        response = await escolaCriarSolicitacaoDeAlteracaoCardapio(
          parsedValues,
          SOLICITACAO_CEI
        );
        statusOk = HTTP_STATUS.CREATED;
      }

      if (response.status === statusOk && !rascunho) {
        const responseInicia = await escolaIniciarSolicitacaoDeAlteracaoDeCardapio(
          response.data.uuid,
          SOLICITACAO_CEI
        );
        if (responseInicia.status === HTTP_STATUS.OK) {
          toastSuccess("Alteração do Tipo de Alimentação salva com sucesso");
          this.refresh();
          this.resetForm("alteracaoCardapio");
        } else {
          toastError(responseInicia.error);
        }
      } else if (response.status === statusOk) {
        toastSuccess("Rascunho salvo com sucesso");
        this.resetForm("alteracaoCardapio");
      } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
        response.data.data.forEach(erro => {
          toastError(erro);
        });
        this.refresh();
        this.resetForm("alteracaoCardapio");
      } else {
        toastError(response.error);
      }
    });
  };

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  onAlterarDiaChanged(value) {
    if (
      value &&
      checaSeDataEstaEntre2e5DiasUteis(
        value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
    }
  }

  OnDeleteButtonClicked = async (id_externo, uuid) => {
    if (window.confirm("Deseja remover este rascunho?")) {
      try {
        const response = await escolaExcluirSolicitacaoDeAlteracaoCardapio(
          uuid,
          SOLICITACAO_CEI
        );
        if (response.status === HTTP_STATUS.NO_CONTENT) {
          toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
          this.refresh();
        } else {
          toastError("Houve um erro ao excluir o rascunho");
        }
      } catch (error) {
        toastError("Houve um erro ao excluir o rascunho");
      }
    }
  };

  resetaTodoPeriodoCheck() {
    let periodos = this.state.periodos;
    periodos.forEach(periodo => {
      if (periodo.checado) {
        periodo.checado = false;
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
        `substituicoes_${periodoNome}.tipos_alimentacao_de`,
        ""
      );
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_para`,
        ""
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
        ""
      );
    }
  }

  mudaMotivo = value => {
    if (value) {
      const { motivos } = this.props;
      this.setState({ motivo: motivos.find(m => m.uuid === value) });
      let periodos = this.state.periodos;
      periodos.forEach(periodo => {
        this.props.change(
          `substituicoes_${periodo.nome}.tipos_alimentacao_de`,
          []
        );
        this.props.change(
          `substituicoes_${periodo.nome}.tipos_alimentacao_para`,
          ""
        );
      });
      periodos = periodos.map(periodo => {
        periodo["substituicoes"] = agregarDefault([]);
        return periodo;
      });
      this.setState({ periodos });
    }
  };

  formataOpcoesDe = tipos_alimentacao => {
    const { motivo } = this.state;
    let opcoesDe = tipos_alimentacao.filter(
      ta => ta.nome.toUpperCase() !== "Lanche emergencial".toUpperCase()
    );
    if (motivo) {
      switch (motivo.nome) {
        case "RPL - Refeição por Lanche":
          opcoesDe = tipos_alimentacao.filter(ta =>
            ["Refeição da tarde", "Almoço"].includes(ta.nome)
          );
          break;
        case "LPR - Lanche por Refeição":
          opcoesDe = tipos_alimentacao.filter(ta =>
            ["Lanche"].includes(ta.nome)
          );
          break;
        default:
          break;
      }
    }

    opcoesDe = formatarParaMultiselect(opcoesDe);
    return opcoesDe;
  };

  render() {
    const { loading, alteracaoCardapioList, showModal, periodos } = this.state;
    const {
      data_alteracao,
      formValues,
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
              meusDados={meusDados}
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
              <article className="card-body">
                <div
                  className="card-title font-weight-bold descricao"
                  style={this.fontHeader}
                >
                  Descrição da Alteração do Tipo de Alimentação
                </div>
                <div className="row">
                  <section className="col-12 col-sm-8">
                    <Field
                      component={Select}
                      name="motivo"
                      label="Motivo"
                      options={motivos.filter(
                        ({ nome }) =>
                          nome.toUpperCase() !==
                          "Lanche emergencial".toUpperCase()
                      )}
                      onChange={event => this.mudaMotivo(event.target.value)}
                      validate={required}
                    />
                  </section>
                  <section className="col-12 col-sm-4">
                    <Field
                      component={InputComData}
                      onBlur={event =>
                        this.onAlterarDiaChanged(event.target.value)
                      }
                      onChange={value => this.onAlterarDiaChanged(value)}
                      name="data_alteracao"
                      minDate={proximos_dois_dias_uteis}
                      maxDate={moment()
                        .endOf("year")
                        .toDate()}
                      label="Alterar dia"
                      required
                    />
                  </section>
                </div>
              </article>
              <hr />
              <article className="card-body">
                <header className="descricao-periodos-alimentacao">
                  <div>Período</div>
                  <div>Alterar alimentação de:</div>
                  <div>Para alimentação:</div>
                </header>
                {periodos.map((periodo, indice) => {
                  const formSectionName = `substituicoes_${periodo.nome}`;
                  this.props.change(`${formSectionName}.periodo`, periodo.uuid);
                  let totalAlunos = 0;
                  if (periodo.alunosPorFaixaEtaria) {
                    periodo.alunosPorFaixaEtaria.forEach(faixaEtaria => {
                      totalAlunos += faixaEtaria.count;
                    });
                  }
                  let totalSelecionados = 0;
                  if (
                    formValues &&
                    data_alteracao &&
                    periodo.checked &&
                    periodo.alunosPorFaixaEtaria &&
                    formValues[formSectionName]["faixas_etarias"]
                  ) {
                    for (let [, valor] of Object.entries(
                      formValues[formSectionName]["faixas_etarias"]
                    )) {
                      if (valor) {
                        totalSelecionados += parseInt(valor);
                      }
                    }
                  }
                  return (
                    <FormSection name={formSectionName} key={indice}>
                      <div className="item-periodo-alimentacao">
                        <Field
                          component={CheckboxPeriodo}
                          name="check"
                          onChange={() =>
                            this.atualizaPeriodoCheck(
                              `substituicoes_${periodo.nome}.check`,
                              indice,
                              periodo.nome
                            )
                          }
                          style={{
                            background: periodo.style.background,
                            border: `1px solid ${periodo.style.borderColor}`
                          }}
                          nomePeriodo={periodo.nome}
                        />
                        <div className="select-tipo-alimentacao-de">
                          <Field
                            component={MultiSelect}
                            disableSearch
                            name="tipos_alimentacao_de"
                            multiple
                            options={this.formataOpcoesDe(
                              periodo.tipos_alimentacao
                            )}
                            nomeDoItemNoPlural="Alimentos"
                            onChange={value =>
                              this.removerOpcoesSubstitutos(
                                value,
                                periodo,
                                indice
                              )
                            }
                            disabled={!periodo.checked}
                          />
                        </div>
                        <div className="select-tipo-alimentacao-de">
                          <Field
                            component={Select}
                            name="tipo_alimentacao_para"
                            options={
                              periodo.substituicoes
                                ? periodo.substituicoes.filter(
                                    ({ nome }) =>
                                      nome.toUpperCase() !==
                                      "Lanche emergencial".toUpperCase()
                                  )
                                : agregarDefault([])
                            }
                            validate={periodo.checked && required}
                            required={periodo.checked}
                            disabled={!periodo.checked}
                          />
                        </div>
                      </div>
                      {periodo.checked && periodo.alunosPorFaixaEtaria && (
                        <TabelaQuantidadePorFaixaEtaria
                          alunosPorFaixaEtaria={periodo.alunosPorFaixaEtaria}
                          escondeTotalAlunos={periodo.nome === "PARCIAL"}
                          totalAlunos={totalAlunos}
                          totalSelecionados={totalSelecionados}
                        />
                      )}
                    </FormSection>
                  );
                })}
              </article>
              <hr />
              <article className="card-body">
                <Field
                  component={TextAreaWYSIWYG}
                  label="Observações"
                  name="observacao"
                  required
                  validate={[textAreaRequired, peloMenosUmCaractere]}
                />
              </article>
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
                  onClick={handleSubmit(values => this.onSubmit(values, true))}
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.OutlinePrimary}
                />
                <Botao
                  texto="Enviar"
                  disabled={pristine || submitting}
                  type={BUTTON_TYPE.SUBMIT}
                  onClick={handleSubmit(values => this.onSubmit(values))}
                  style={BUTTON_STYLE.Primary}
                />
              </article>
            </section>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={this.closeModal}
            />
          </form>
        )}
      </Fragment>
    );
  }
}

const AlteracaoCardapioForm = reduxForm({
  form: "alteracaoCardapio",
  enableReinitialize: true,
  validate: (values, props) => {
    // TODO: Mover para helper, criar teste e ver se dá pra simplificar
    if (!props.formValues) {
      return {};
    }
    const errors = {};

    if (!props.formValues.data_alteracao) {
      errors.data_alteracao =
        "É necessária uma data de alteração do tipo de alimentação";
    }
    const periodos = Object.assign({}, values);
    delete periodos.observacao;
    delete periodos.data_alteracao;
    delete periodos.motivo;
    const totais = {};
    let alunosPorFaixaEtaria;
    let aoMenosUmPeriodoSelecionado = false;
    for (let dadosPeriodo of Object.values(periodos)) {
      for (let [chave, valor] of Object.entries(dadosPeriodo)) {
        if (chave === "check") {
          aoMenosUmPeriodoSelecionado = true;
        } else if (chave.startsWith("faixas_etarias")) {
          for (let [uuid, total] of Object.entries(valor)) {
            totais[uuid] = totais[uuid]
              ? totais[uuid] + parseInt(total)
              : parseInt(total);
          }
        } else if (chave === "alunosPorFaixaEtaria") {
          alunosPorFaixaEtaria = valor;
        }
      }
    }

    if (!aoMenosUmPeriodoSelecionado) {
      for (let periodo of Object.keys(periodos)) {
        const erroCampo = {
          check: "É necessário selecionar pelo menos um período"
        };
        errors[periodo] = errors[periodo]
          ? Object.assign({}, errors[periodo], erroCampo)
          : erroCampo;
      }
    }

    if (alunosPorFaixaEtaria) {
      alunosPorFaixaEtaria.forEach(faixaEtaria => {
        const totalFaixaEtaria = totais[faixaEtaria.faixa_etaria.uuid];
        if (totalFaixaEtaria && totalFaixaEtaria > faixaEtaria.count) {
          for (let periodo of Object.keys(periodos)) {
            const erroCampo = {
              [faixaEtaria.faixa_etaria.uuid]:
                "A soma das substituições nessa faixa etária não pode exceder a quantidade de alunos nessa faixa etária"
            };
            errors[periodo] = errors[periodo]
              ? {
                  faixas_etarias: Object.assign(
                    {},
                    errors[periodo].faixas_etarias,
                    erroCampo
                  )
                }
              : { faixas_etarias: erroCampo };
          }
        }
      });
    }

    return errors;
  }
})(AlteracaoCardapio);

const selector = formValueSelector("alteracaoCardapio");

const mapStateToProps = state => {
  return {
    alunosPorFaixaEtaria: state.alunosPorFaixaEtaria,
    initialValues: state.alteracaoCardapio.data,
    formValues:
      state.form.alteracaoCardapio && state.form.alteracaoCardapio.values,
    data_alteracao: selector(state, "data_alteracao"),
    motivo: selector(state, "motivo")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadAlteracaoCardapioCei
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlteracaoCardapioForm);
