import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Field, FormSection, formValueSelector, reduxForm } from "redux-form";
import Prescritor from "./componentes/Prescritor";
import Laudo from "./componentes/Laudo";
import {
  DIETA_ESPECIAL,
  ESCOLA,
  RELATORIO
} from "../../../../configs/constants";
import {
  length,
  minLength,
  required,
  validaCPF
} from "../../../../helpers/fieldValidators";
import {
  dateDelta,
  getError,
  cpfMask,
  gerarParametrosConsulta
} from "../../../../helpers/utilities";
import {
  criaDietaEspecial,
  getDietasEspeciaisVigentesDeUmAluno,
  getSolicitacoesDietaEspecial
} from "../../../../services/dietaEspecial.service";
import { getAlunoPertenceAEscola } from "../../../../services/aluno.service";
import {
  meusDados,
  obtemDadosAlunoPeloEOL
} from "../../../../services/perfil.service";
import { getEscolasSimplissima } from "../../../../services/escola.service";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import CardMatriculados from "../../../Shareable/CardMatriculados";
import { InputComData } from "../../../Shareable/DatePicker";
import InputText from "../../../Shareable/Input/InputText";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import SolicitacaoVigente from "./componentes/SolicitacaoVigente";
import CheckboxField from "components/Shareable/Checkbox/Field";
import { formatarSolicitacoesVigentes } from "./helper";
import { getStatusSolicitacoesVigentes } from "helpers/dietaEspecial";

import { loadSolicitacoesVigentes } from "reducers/incluirDietaEspecialReducer";

import "./style.scss";

const minLength6 = minLength(6);
const length7 = length(7);

class solicitacaoDietaEspecial extends Component {
  constructor(props) {
    super(props);
    window.changeForm = props.change;
    window.momentjs = moment;
    this.state = {
      quantidadeAlunos: "...",
      codigo_eol_escola: null,
      files: null,
      submitted: false,
      resumo: null,
      aluno_nao_matriculado: false,
      pertence_a_escola: null
    };
    this.setFiles = this.setFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onEolBlur = this.onEolBlur.bind(this);
  }

  componentDidMount() {
    meusDados().then(meusDados => {
      this.setState({
        quantidadeAlunos: meusDados.vinculo_atual.instituicao.quantidade_alunos,
        codigo_eol_escola: meusDados.vinculo_atual.instituicao.codigo_eol
      });
    });
    const { history, loadSolicitacoesVigentes, reset } = this.props;
    if (history && history.action === "PUSH") {
      loadSolicitacoesVigentes(null);
      reset();
    }
  }

  removeFile(index) {
    let files = this.state.files;
    files.splice(index, 1);
    this.setState({ files });
  }

  setFiles(files) {
    this.setState({ files });
  }

  onEolBlur = async event => {
    const { change } = this.props;
    const { codigo_eol_escola } = this.state;
    change("aluno_json.nome", "");
    change("aluno_json.data_nascimento", "");
    if (event.target.value.length !== 7) return;

    const resposta = await obtemDadosAlunoPeloEOL(event.target.value);
    if (!resposta) return;
    if (resposta.status === 400) {
      this.setState({ pertence_a_escola: null });
      toastError("Aluno não encontrado no EOL.");
      return;
    }

    getDietasEspeciaisVigentesDeUmAluno(
      event.target.value.padStart(6, "0")
    ).then(response => {
      this.props.loadSolicitacoesVigentes(
        formatarSolicitacoesVigentes(response.data.results)
      );
    });

    getAlunoPertenceAEscola(event.target.value, codigo_eol_escola).then(
      response => {
        if (response.status === 200) {
          this.setState({ pertence_a_escola: response.data.pertence_a_escola });
          if (this.state.pertence_a_escola) {
            change("aluno_json.nome", resposta.detail.nm_aluno);
            change(
              "aluno_json.data_nascimento",
              moment(resposta.detail.dt_nascimento_aluno).format("DD/MM/YYYY")
            );
          } else {
            change("aluno_json.nome", "");
            change("aluno_json.data_nascimento", "");
            change("nome_completo_pescritor", "");
            change("registro_funcional_pescritor", "");
          }
        } else {
          this.setState({ pertence_a_escola: null });
        }
      }
    );
  };

  getEscolaPorEOL = async () => {
    const { change, aluno_nao_matriculado } = this.props;

    if (!aluno_nao_matriculado) {
      change("aluno_nao_matriculado_data.nome_escola", "");
      return;
    }

    if (!aluno_nao_matriculado.codigo_eol_escola) {
      change("aluno_nao_matriculado_data.nome_escola", "");
      return;
    }

    const codigo_eol_escola = aluno_nao_matriculado.codigo_eol_escola;

    if (!codigo_eol_escola || codigo_eol_escola.length !== 6) {
      change("aluno_nao_matriculado_data.nome_escola", "");
      return;
    }

    const params = { codigo_eol: codigo_eol_escola };
    const resposta = await getEscolasSimplissima(params);

    if (!resposta) return;

    if (!resposta.count) {
      change("aluno_nao_matriculado_data.nome_escola", "");
      toastError("Código EOL informado inválido");
    } else {
      const escola = resposta.results[0];
      change("aluno_nao_matriculado_data.nome_escola", escola.nome);
    }
  };

  getSolicitacoesVigentesResponsavel = async () => {
    const { aluno_nao_matriculado } = this.props;
    if (!aluno_nao_matriculado) {
      this.props.loadSolicitacoesVigentes(null);
      return;
    }

    if (!aluno_nao_matriculado.responsavel) {
      this.props.loadSolicitacoesVigentes(null);
      return;
    }

    if (!aluno_nao_matriculado.responsavel.cpf || !aluno_nao_matriculado.nome) {
      this.props.loadSolicitacoesVigentes(null);
      return;
    }

    const { cpf } = aluno_nao_matriculado.responsavel;
    const { nome } = aluno_nao_matriculado;

    if (validaCPF(cpf)) return;

    const params = gerarParametrosConsulta({
      cpf_responsavel: cpf,
      nome_completo_aluno: nome,
      status: getStatusSolicitacoesVigentes()
    });
    const resposta = await getSolicitacoesDietaEspecial(params);
    this.props.loadSolicitacoesVigentes(
      formatarSolicitacoesVigentes(resposta.data.results)
    );
  };

  onSubmit(payload) {
    payload.anexos = payload.anexos.map(anexo => {
      return {
        nome: anexo.nome,
        arquivo: anexo.base64
      };
    });
    return new Promise(async (resolve, reject) => {
      const response = await criaDietaEspecial(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Solicitação realizada com sucesso.");
        this.setState({
          submitted: !this.state.submitted,
          resumo: `/${ESCOLA}/${DIETA_ESPECIAL}/${RELATORIO}?uuid=${
            response.data.uuid
          }`
        });
        this.props.loadSolicitacoesVigentes(null);
        this.setState({ aluno_nao_matriculado: false });
        this.resetForm();
        resolve();
      } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(getError(response.data));
        reject();
      } else {
        toastError(
          `Erro ao solicitar dieta especial: ${getError(response.data)}`
        );
        reject();
      }
    });
  }

  resetForm() {
    this.props.reset("solicitacaoDietaEspecial");
  }

  render() {
    const { quantidadeAlunos } = this.state;
    const {
      handleSubmit,
      pristine,
      submitting,
      solicitacoesVigentes
    } = this.props;
    return (
      <form className="special-diet" onSubmit={handleSubmit}>
        <CardMatriculados numeroAlunos={quantidadeAlunos} />
        <div className="card mt-2 p-4">
          <div className="row">
            <div className="col d-flex flex-row text-gray">
              <Field
                className="check-tipo-produto"
                component={CheckboxField}
                name="aluno_nao_matriculado"
                type="checkbox"
                onChange={() => {
                  this.props.loadSolicitacoesVigentes(null);
                  this.props.reset();
                  this.setState({
                    aluno_nao_matriculado: !this.state.aluno_nao_matriculado
                  });
                }}
              />
              <div className="ml-3">
                Dieta Especial Destina-se à Aluno Não Matriculado na Rede
                Municipal de Ensino
              </div>
            </div>
          </div>
          <hr />
          <span className="card-title font-weight-bold cinza-escuro">
            Descrição da Solicitação
          </span>
          {!this.state.aluno_nao_matriculado && (
            <>
              <FormSection name="aluno_json">
                <div className="row">
                  <div className="col-md-3">
                    <Field
                      component={InputText}
                      name="codigo_eol"
                      label="Cód. EOL do Aluno"
                      placeholder="Insira o Código"
                      className="form-control"
                      type="number"
                      required
                      validate={[required, length7]}
                      onBlur={this.onEolBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      component={InputText}
                      name="nome"
                      label="Nome completo do Aluno"
                      className="form-control"
                      disabled
                      validate={[required, minLength6]}
                    />
                  </div>
                  <div className="col-md-3">
                    <Field
                      component={InputComData}
                      label="Data de Nascimento"
                      name="data_nascimento"
                      className="form-control color-disabled"
                      minDate={dateDelta(-360 * 99)}
                      maxDate={dateDelta(-1)}
                      showMonthDropdown
                      showYearDropdown
                      disabled
                      validate={required}
                    />
                  </div>
                </div>
              </FormSection>
              {this.state.pertence_a_escola === false && (
                <div className="current-diets">
                  <div className="pt-2 no-diets">
                    Aluno não pertence a unidade educacional.
                  </div>
                </div>
              )}
              {this.state.pertence_a_escola === true &&
                solicitacoesVigentes && (
                  <SolicitacaoVigente
                    solicitacoesVigentes={solicitacoesVigentes}
                  />
                )}

              <Prescritor pertence_a_escola={this.state.pertence_a_escola} />

              <hr />

              <Laudo pertence_a_escola={this.state.pertence_a_escola} />
            </>
          )}
          {this.state.aluno_nao_matriculado && (
            <>
              <FormSection name="aluno_nao_matriculado_data">
                <div className="row">
                  <div className="col-md-3">
                    <Field
                      component={InputText}
                      name="codigo_eol_escola"
                      label="Cód. EOL da Escola"
                      placeholder="Insira o Código"
                      className="form-control"
                      type="number"
                      required
                      validate={[required, length(6)]}
                      onBlur={this.getEscolaPorEOL}
                    />
                  </div>
                  <div className="col-md-9">
                    <Field
                      component={InputText}
                      name="nome_escola"
                      label="Nome da Escola"
                      className="form-control"
                      disabled
                      validate={required}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <Field
                      {...cpfMask}
                      component={InputText}
                      name="cpf"
                      label="CPF do Aluno"
                      className="form-control"
                      validate={validaCPF}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      component={InputText}
                      name="nome"
                      label="Nome completo do Aluno"
                      className="form-control"
                      required
                      validate={[required, minLength6]}
                      onBlur={this.getSolicitacoesVigentesResponsavel}
                    />
                  </div>
                  <div className="col-md-3">
                    <Field
                      component={InputComData}
                      name="data_nascimento"
                      label="Data de Nascimento"
                      className="form-control"
                      minDate={dateDelta(-360 * 99)}
                      maxDate={dateDelta(-1)}
                      showMonthDropdown
                      showYearDropdown
                      required
                      validate={required}
                    />
                  </div>
                </div>
                <FormSection name="responsavel">
                  <div className="row">
                    <div className="col-md-3">
                      <Field
                        {...cpfMask}
                        component={InputText}
                        name="cpf"
                        label="CPF do Responsável"
                        className="form-control"
                        required
                        onBlur={this.getSolicitacoesVigentesResponsavel}
                        validate={[required, validaCPF]}
                      />
                    </div>
                    <div className="col-md-9">
                      <Field
                        component={InputText}
                        name="nome"
                        label="Nome completo do Responsável"
                        className="form-control"
                        required
                        validate={required}
                      />
                    </div>
                  </div>
                </FormSection>
              </FormSection>
              {solicitacoesVigentes && (
                <SolicitacaoVigente
                  solicitacoesVigentes={solicitacoesVigentes}
                />
              )}
              <hr />

              <Prescritor />

              <hr />

              <Laudo />
            </>
          )}

          <hr />

          <article className="card-body footer-button">
            <Botao
              texto="Limpar campos"
              onClick={() => {
                this.props.reset();
                this.props.loadSolicitacoesVigentes(null);
                this.setState({ aluno_nao_matriculado: false });
                this.setState({ pertence_a_escola: null });
              }}
              disabled={pristine || submitting}
              style={BUTTON_STYLE.GREEN_OUTLINE}
            />
            <Botao
              texto="Enviar"
              type={BUTTON_TYPE.SUBMIT}
              onClick={handleSubmit(values =>
                this.onSubmit({
                  ...values
                })
              )}
              style={BUTTON_STYLE.GREEN}
              disabled={this.state.pertence_a_escola !== true}
            />
          </article>
        </div>
      </form>
    );
  }
}

const componentNameForm = reduxForm({
  form: "solicitacaoDietaEspecial",
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false
})(solicitacaoDietaEspecial);

const selector = formValueSelector("solicitacaoDietaEspecial");
const mapStateToProps = state => {
  return {
    files: selector(state, "files"),
    aluno_nao_matriculado: selector(state, "aluno_nao_matriculado_data"),
    solicitacoesVigentes: state.incluirDietaEspecial.solicitacoesVigentes
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadSolicitacoesVigentes
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(componentNameForm)
);
