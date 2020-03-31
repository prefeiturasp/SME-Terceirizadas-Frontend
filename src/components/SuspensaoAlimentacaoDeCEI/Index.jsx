import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, reduxForm } from "redux-form";
import { Select } from "../Shareable/Select";
import { required } from "../../helpers/fieldValidators";
import { connect } from "react-redux";
import { InputComData } from "../Shareable/DatePicker";
import InputText from "../Shareable/Input/InputText";

import { Rascunhos } from "./Rascunhos";

import "../Shareable/Checkbox/style.scss";

import "./styles.scss";
import Botao from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import { STATUS_INFORMA_TERCEIRIZADA } from "../../configs/constants";
import {
  EscolaSalvaRascunhoDeSuspensao,
  EscolaBuscaRascunhos,
  EscolaExcluiSuspensao,
  EscolaAtualizaSuspensao,
  escolaInformaSuspensao
} from "../../services/suspensaoAlimentacaoCei.service";
import { toastSuccess, toastError } from "../Shareable/Toast/dialogs";

const ENTER = 13;

class SuspensaoAlimentacaoDeCEI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uuid: null,
      salvarAtualizarLbl: "Salvar Rascunho",
      ehOutroMotivo: false,
      periodos_escolares: [],
      periodos: [],
      suspensoesDeAlimentacaoList: []
    };

    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
  }

  componentDidUpdate() {
    const {
      motivos,
      meusDados,
      periodos,
      proximos_dois_dias_uteis
    } = this.props;
    const { loading } = this.state;
    if (
      motivos !== [] &&
      periodos !== [] &&
      meusDados !== null &&
      proximos_dois_dias_uteis !== null &&
      loading
    ) {
      periodos.forEach(periodo => {
        periodo["check"] = false;
      });
      this.setState({
        loading: false,
        periodos
      });

      this.buscaMeusRascunhos();
    }
  }

  OnEditButtonClicked = params => {
    let { periodos_escolares } = this.state;

    periodos_escolares.splice(0, periodos_escolares.length);

    const { periodos } = this.props;
    const suspensao = params["suspensaoDeAlimentacao"];
    this.props.reset("suspensaoAlimentacaoFormCEI");

    suspensao.periodos_escolares.forEach(periodo => {
      periodos_escolares.push(periodo.uuid);

      periodos.forEach(period => {
        if (period.uuid === periodo.uuid) {
          period.check = true;
        }
      });
    });

    if (suspensao.motivo.nome === "Outro") {
      this.setState({
        ehOutroMotivo: true
      });
      this.props.change("outro_motivo", suspensao.outro_motivo);
    } else {
      this.setState({
        ehOutroMotivo: false
      });
      this.props.reset("suspensaoAlimentacaoFormCEI");
    }

    this.props.change("motivo", suspensao.motivo.uuid);
    this.props.change("data", suspensao.data);

    this.setState({
      uuid: suspensao.uuid,
      periodos_escolares,
      salvarAtualizarLbl: "Atualizar",
      periodos
    });
  };

  OnDeleteButtonClicked = async suspensao => {
    if (window.confirm("Deseja remover este rascunho?")) {
      const resposta = await EscolaExcluiSuspensao(suspensao);
      if (resposta.status === HTTP_STATUS.NO_CONTENT) {
        this.buscaMeusRascunhos();
        this.resetForm();
        toastSuccess(`Rascunho # ${suspensao.id_externo} excluído com sucesso`);
      } else {
        toastError("Houve um erro ao excluir o rascunho");
      }
    }
  };

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  buscaMeusRascunhos = async () => {
    const resposta = await EscolaBuscaRascunhos();
    if (resposta.status === HTTP_STATUS.OK) {
      this.setState({
        suspensoesDeAlimentacaoList: resposta.data.results
      });
    }
  };

  atualizaPeriodosSelecionados = ({ check, uuid }) => {
    let { periodos_escolares } = this.state;
    if (check) {
      const indice = periodos_escolares.indexOf(uuid);
      periodos_escolares.splice(indice, 1);
    } else {
      periodos_escolares.push(uuid);
    }
    this.setState({ periodos_escolares });
  };

  checkItem = ({ uuid }) => {
    let { periodos } = this.state;
    periodos.forEach(periodo => {
      if (periodo.uuid === uuid) {
        this.atualizaPeriodosSelecionados(periodo);
        periodo.check = !periodo.check;
      }
    });
    this.setState({ periodos });
  };

  ehOutroMotivo = motivoUUID => {
    let { ehOutroMotivo } = this.state;
    const { motivos } = this.props;
    motivos.forEach(motivo => {
      if (motivo.uuid === motivoUUID && motivo.nome === "Outro") {
        ehOutroMotivo = true;
      } else {
        ehOutroMotivo = false;
      }
    });
    this.setState({ ehOutroMotivo });
  };

  resetForm = () => {
    const { periodos } = this.props;
    periodos.forEach(periodo => {
      periodo["check"] = false;
    });
    this.setState({
      periodos,
      periodos_escolares: [],
      salvarAtualizarLbl: "Salvar Rascunho",
      ehOutroMotivo: false,
      uuid: null
    });

    this.props.change("motivo", null);
    this.props.change("data", null);
    this.props.reset("suspensaoAlimentacaoFormCEI");
  };

  salvarRascunhoSolicitacao = async payload => {
    const resposta = await EscolaSalvaRascunhoDeSuspensao(payload);
    if (resposta.status === HTTP_STATUS.CREATED) {
      this.buscaMeusRascunhos();
      this.resetForm();
      toastSuccess("Salvo com sucesso!");
    } else {
      toastError("Erro ao salvar Rascunho");
    }
  };

  atualizarRascunhoSolicitacao = async payload => {
    const { uuid } = this.state;
    const resposta = await EscolaAtualizaSuspensao(uuid, payload);
    if (resposta.status === HTTP_STATUS.OK) {
      this.buscaMeusRascunhos();
      this.resetForm();
      toastSuccess("Atualizado com sucesso!");
    } else {
      toastError("Erro ao atualizar Rascunho");
    }
  };

  enviaSuspensao = async payload => {
    const rascunho = await EscolaSalvaRascunhoDeSuspensao(payload);
    const uuid = rascunho.data.uuid;
    const resposta = await escolaInformaSuspensao(uuid, payload);
    if (resposta.status === HTTP_STATUS.OK) {
      this.buscaMeusRascunhos();
      this.resetForm();
      toastSuccess("Enviado com sucesso!");
    } else {
      toastError("Erro ao enviar Rascunho");
    }
  };

  enviaRascunho = async (payload, uuid) => {
    const resposta = await escolaInformaSuspensao(uuid, payload);
    if (resposta.status === HTTP_STATUS.OK) {
      this.buscaMeusRascunhos();
      this.resetForm();
      toastSuccess("Enviado com sucesso!");
    } else {
      toastError("Erro ao enviar Rascunho");
    }
  };

  onSubmit = values => {
    const { salvarAtualizarLbl, periodos_escolares, uuid } = this.state;
    const { meusDados } = this.props;
    values["periodos_escolares"] = periodos_escolares;
    values["escola"] = meusDados.vinculo_atual.instituicao.uuid;

    const status = values.status;
    delete values["status"];
    let isValid = periodos_escolares.length > 0;

    if (isValid) {
      if (status === null) {
        if (salvarAtualizarLbl === "Salvar Rascunho") {
          this.salvarRascunhoSolicitacao(values);
        } else {
          this.atualizarRascunhoSolicitacao(values);
        }
      } else {
        if (uuid) {
          this.enviaRascunho(values, uuid);
        } else {
          this.enviaSuspensao(values);
        }
      }
    } else {
      toastError("Necessário pelo menos um periodo!");
    }
  };

  render() {
    const {
      loading,
      ehOutroMotivo,
      periodos,
      salvarAtualizarLbl,
      suspensoesDeAlimentacaoList
    } = this.state;
    const { motivos, proximos_dois_dias_uteis, handleSubmit } = this.props;
    return (
      <section className="section-main-form">
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
            onKeyPress={this.onKeyPress}
          >
            {suspensoesDeAlimentacaoList.length > 0 && (
              <div className="mt-3">
                <span ref={this.titleRef} className="page-title">
                  Rascunhos
                </span>
                <Rascunhos
                  suspensoesDeAlimentacaoList={suspensoesDeAlimentacaoList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </div>
            )}
            <main className="card">
              <article className="card-body">
                <header className="card-title font-weight-bold">
                  Descrição da Suspensão
                </header>
                <section className="section-motivo-data">
                  <div className="div-descricao-label">
                    <span>*</span> Motivo
                  </div>
                  <div className="div-descricao-label">
                    <span>*</span> Dia
                  </div>
                </section>
                <section className="section-motivo-data">
                  <Field
                    component={Select}
                    name={`motivo`}
                    options={motivos}
                    required
                    validate={required}
                    onChange={event => {
                      this.ehOutroMotivo(event.target.value);
                    }}
                  />
                  <Field
                    component={InputComData}
                    name={`data`}
                    minDate={proximos_dois_dias_uteis}
                    required
                    validate={required}
                  />
                </section>
                {ehOutroMotivo && (
                  <section>
                    <Field
                      component={InputText}
                      label="Qual o motivo?"
                      required
                      name={`outro_motivo`}
                      className="form-control"
                      validate={required}
                    />
                  </section>
                )}
                <section className="section-descricao-periodo">Periodo</section>
                <section className="form-check-periodos">
                  {periodos.map((periodo, index) => {
                    return (
                      <label
                        className={`container check-${periodo.nome}`}
                        key={index}
                      >
                        {periodo.nome}
                        <input
                          type="checkbox"
                          checked={periodo.check}
                          onClick={() => this.checkItem(periodo)}
                        />
                        <span className={`checkmark check-${periodo.check}`} />
                      </label>
                    );
                  })}
                </section>
                <section className="section-botoes-bottom">
                  <Botao
                    texto="Cancelar"
                    onClick={event => this.resetForm(event)}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto={salvarAtualizarLbl}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: null
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
                        status: STATUS_INFORMA_TERCEIRIZADA
                      })
                    )}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3"
                  />
                </section>
              </article>
            </main>
          </form>
        )}
      </section>
    );
  }
}

const SuspensaoAlimentacaoDeCEIForm = reduxForm({
  form: "suspensaoAlimentacaoFormCEI",
  enableReinitialize: true
})(SuspensaoAlimentacaoDeCEI);

export default connect(null)(SuspensaoAlimentacaoDeCEIForm);
