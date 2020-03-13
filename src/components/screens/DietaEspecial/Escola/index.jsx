import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FormSection, formValueSelector, reduxForm } from "redux-form";
import {
  DIETA_ESPECIAL,
  ESCOLA,
  RELATORIO
} from "../../../../configs/constants";
import { minLength,length, required } from "../../../../helpers/fieldValidators";
import { dateDelta, getError } from "../../../../helpers/utilities";
import {
  criaDietaEspecial,
  getDietasEspeciaisVigentesDeUmAluno
} from "../../../../services/dietaEspecial.service";
import {
  meusDados,
  obtemDadosAlunoPeloEOL
} from "../../../../services/perfil.service";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import CardMatriculados from "../../../Shareable/CardMatriculados";
import { InputComData } from "../../../Shareable/DatePicker";
import InputFile from "../../../Shareable/Input/InputFile";
import InputText from "../../../Shareable/Input/InputText";
import { TextAreaWYSIWYG } from "../../../Shareable/TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import SolicitacaoVigente from "./componentes/SolicitacaoVigente";
import { formatarSolicitacoesVigentes } from "./helper";
import "./style.scss";

const minLength6 = minLength(6);
const length7 = length(7)

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
      solicitacoesVigentes: null
    };
    this.setFiles = this.setFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onEolBlur = this.onEolBlur.bind(this);
  }

  componentDidMount() {
    meusDados().then(meusDados => {
      this.setState({
        quantidadeAlunos: meusDados.vinculo_atual.instituicao.quantidade_alunos
      });
    });
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
        this.setState({
          solicitacoesVigentes: formatarSolicitacoesVigentes(
            response.data.results
          )
        });
      });
    }
  };

  async onSubmit(payload) {
    payload.anexos = this.state.files;
    const response = await criaDietaEspecial(payload);
    if (response.status === HTTP_STATUS.CREATED) {
      toastSuccess("Solicitação realizada com sucesso.");
      this.setState({
        submitted: !this.state.submitted,
        resumo: `/${ESCOLA}/${DIETA_ESPECIAL}/${RELATORIO}?uuid=${
          response.data.uuid
        }`,
        solicitacoesVigentes: null
      });
      this.resetForm();
    } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
      toastError(getError(response.data));
    } else {
      toastError(
        `Erro ao solicitar dieta especial: ${getError(response.data)}`
      );
    }
  }

  resetForm() {
    this.props.reset("solicitacaoDietaEspecial");
    this.setState({ files: [] });
  }

  render() {
    const { quantidadeAlunos, submitted, solicitacoesVigentes } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form className="special-diet" onSubmit={handleSubmit}>
        <CardMatriculados numeroAlunos={quantidadeAlunos} />
        <div className="card mt-2 p-4">
          <span className="card-title font-weight-bold cinza-escuro">
            Descrição da Solicitação
          </span>
          <FormSection name="aluno_json">
            <div className="grid-container">
              <div className="ajuste-fonte">
                <span>* </span>Cód. EOL do Aluno
              </div>
              <div className="ajuste-fonte">Nome completo do Aluno</div>
              <div className="ajuste-fonte">Data de Nascimento</div>
              <Field
                component={InputText}
                name="codigo_eol"
                placeholder="Insira o Código"
                className="form-control"
                type="number"
                required
                validate={[required, length7]}
                onBlur={this.onEolBlur}
              />
              <Field
                component={InputText}
                name="nome"
                className="form-control"
                required
                disabled
                validate={[required, minLength6]}
              />
              <Field
                component={InputComData}
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
          </FormSection>
          {solicitacoesVigentes && (
            <SolicitacaoVigente solicitacoesVigentes={solicitacoesVigentes} />
          )}
          <section className="row">
            <div className="col-7">
              <Field
                component={InputText}
                label="Nome do Prescritor da receita (médico, nutricionista, fonoaudiólogo)"
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
                label="Registro funcional (CRM/CRN/CRFa)"
                name="registro_funcional_pescritor"
                placeholder="Insira o Registro Funcional"
                className="form-control"
                helpText={"Mínimo 6 caracteres"}
              />
            </div>
          </section>
          <hr />
          <section className="row attachments">
            <div className="col-9">
              <div className="card-title font-weight-bold cinza-escuro mt-4">
                Laudo
              </div>
              <div className="text">
                Anexe o laudo fornecido pelo profissional acima. Sem ele, a
                solicitação de Dieta Especial será negada.
              </div>
              <div className="card-warning mt-2">
                <strong>IMPORTANTE:</strong> Envie um arquivo formato .doc,
                .docx, .pdf, .png, .jpg ou .jpeg, com até 10Mb. <br /> O Laudo
                deve ter sido emitido há, no máximo, 3 meses. Após a data de
                aprovação no sistema, o laudo terá validade de 12 meses
              </div>
            </div>
            <div className="col-3 btn">
              <Field
                component={InputFile}
                className="inputfile"
                texto="Anexar"
                name="files"
                accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                setFiles={this.setFiles}
                removeFile={this.removeFile}
                submitted={submitted}
                multiple
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
              onClick={() => this.props.reset()}
              disabled={pristine || submitting}
              style={BUTTON_STYLE.GREEN_OUTLINE}
            />
            <Botao
              texto="Enviar"
              disabled={pristine || submitting}
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
  validate: ({ nome, data_nascimento }) => {
    const errors = {};
    if (nome === undefined && data_nascimento === undefined) {
      errors.codigo_eol =
        "É necessário preencher este campo com um código EOL válido";
    }
    return errors;
  }
})(solicitacaoDietaEspecial);

const selector = formValueSelector("solicitacaoDietaEspecial");
const mapStateToProps = state => {
  return {
    files: selector(state, "files")
  };
};

export default connect(mapStateToProps)(componentNameForm);
