import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Field, FormSection, formValueSelector, reduxForm } from "redux-form";
import {
  DIETA_ESPECIAL,
  ESCOLA,
  RELATORIO
} from "../../../../configs/constants";
import {
  length,
  minLength,
  required,
  maxLength,
  numericInteger,
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
import {
  meusDados,
  obtemDadosAlunoPeloEOL
} from "../../../../services/perfil.service";
import { getEscolasSimplissima } from "../../../../services/escola.service";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import CardMatriculados from "../../../Shareable/CardMatriculados";
import { InputComData } from "../../../Shareable/DatePicker";
import ManagedInputFileField from "../../../Shareable/Input/InputFile/ManagedField";
import InputText from "../../../Shareable/Input/InputText";
import { TextAreaWYSIWYG } from "../../../Shareable/TextArea/TextAreaWYSIWYG";
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
      files: null,
      submitted: false,
      resumo: null,
      aluno_nao_matriculado: false
    };
    this.setFiles = this.setFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onEolBlur = this.onEolBlur.bind(this);
    this.registroFuncionalValidators = [
      numericInteger,
      maxLength(7),
      minLength(4)
    ];
  }

  componentDidMount() {
    meusDados().then(meusDados => {
      this.setState({
        quantidadeAlunos: meusDados.vinculo_atual.instituicao.quantidade_alunos
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
    change("aluno_json.nome", "");
    change("aluno_json.data_nascimento", "");
    if (event.target.value.length !== 7) return;

    const resposta = await obtemDadosAlunoPeloEOL(event.target.value);
    if (!resposta) return;
    if (resposta.status === 400) {
      toastError("Aluno não encontrado no EOL.");
    } else {
      change("aluno_json.nome", resposta.detail.nm_aluno);
      change(
        "aluno_json.data_nascimento",
        moment(resposta.detail.dt_nascimento_aluno).format("DD/MM/YYYY")
      );
      getDietasEspeciaisVigentesDeUmAluno(
        event.target.value.padStart(6, "0")
      ).then(response => {
        this.props.loadSolicitacoesVigentes(
          formatarSolicitacoesVigentes(response.data.results)
        );
      });
    }
  };

  getEscolaPorEOL = async () => {
    const { change, aluno_nao_matriculado } = this.props;

    if (!aluno_nao_matriculado.codigo_eol_escola) return;

    const codigo_eol_escola = aluno_nao_matriculado.codigo_eol_escola;

    if (!codigo_eol_escola || codigo_eol_escola.length !== 6) return;

    const params = { codigo_eol: codigo_eol_escola };
    const resposta = await getEscolasSimplissima(params);

    if (!resposta) return;

    if (!resposta.count) {
      toastError("Código EOL informado inválido");
    } else {
      const escola = resposta.results[0];
      change("aluno_nao_matriculado_data.nome_escola", escola.nome);
    }
  };

  getSolicitacoesVigentesResponsavel = async () => {
    const { aluno_nao_matriculado } = this.props;

    if (!aluno_nao_matriculado.responsavel.cpf) return;

    const { cpf } = aluno_nao_matriculado.responsavel;

    if (validaCPF(cpf)) return;

    const params = gerarParametrosConsulta({
      cpf_responsavel: cpf,
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
                onChange={() =>
                  this.setState({
                    aluno_nao_matriculado: !this.state.aluno_nao_matriculado
                  })
                }
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
                    required
                    disabled
                    validate={[required, minLength6]}
                  />
                </div>
                <div className="col-md-3">
                  <Field
                    component={InputComData}
                    label="Data de Nascimento"
                    name="data_nascimento"
                    className="form-control"
                    minDate={dateDelta(-360 * 99)}
                    maxDate={dateDelta(-1)}
                    showMonthDropdown
                    showYearDropdown
                    required
                    disabled
                    validate={required}
                  />
                </div>
              </div>
            </FormSection>
          )}
          {this.state.aluno_nao_matriculado && (
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
                    required
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
          )}

          {solicitacoesVigentes && (
            <SolicitacaoVigente solicitacoesVigentes={solicitacoesVigentes} />
          )}
          <hr />
          <section className="row">
            <div className="col-7">
              <Field
                component={InputText}
                label="Nome do Prescritor do laudo (médico, nutricionista, fonoaudiólogo)"
                name="nome_completo_pescritor"
                placeholder="Insira o Nome do Prescritor"
                className="form-control"
                validate={minLength6}
                helpText={"Mínimo 6 caracteres"}
              />
            </div>
            <div className="col-5">
              <Field
                component={InputText}
                label="CRM/CRN/CRFa/RMS"
                name="registro_funcional_pescritor"
                className="form-control"
                helpText={"Tamanho: 4 a 7 caracteres"}
                validate={this.registroFuncionalValidators}
              />
            </div>
          </section>
          <hr />
          <section className="row attachments">
            <div className="col-9">
              <div className="card-title font-weight-bold cinza-escuro mt-4">
                <span className="required-asterisk">*</span>
                Laudo
              </div>
              <div className="text">
                Anexe o laudo fornecido pelo profissional acima. Sem ele, a
                solicitação de Dieta Especial será negada.
              </div>
              <div className="card-warning mt-2">
                <strong>IMPORTANTE:</strong> Envie um arquivo formato .doc,
                .docx, .pdf, .png, .jpg ou .jpeg, com até 10Mb. <br /> O Laudo
                deve ter sido emitido há, no máximo, 12 meses. Após a data de
                aprovação no sistema, o laudo terá validade de 12 meses
              </div>
            </div>
            <div className="col-3 btn">
              <Field
                component={ManagedInputFileField}
                className="inputfile"
                texto="Anexar"
                name="anexos"
                accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                validate={[required]}
                toastSuccessMessage={"Laudo incluso com sucesso"}
              />
            </div>
          </section>
          <section className="row mt-5 mb-5">
            <div className="col-12">
              <Field
                component={TextAreaWYSIWYG}
                label="Observações"
                name="observacoes"
                className="form-control"
              />
            </div>
          </section>
          <article className="card-body footer-button">
            <Botao
              texto="Cancelar"
              onClick={() => {
                this.props.reset();
                this.props.loadSolicitacoesVigentes(null);
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
