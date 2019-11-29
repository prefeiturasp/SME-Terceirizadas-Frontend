import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  length,
  minLength,
  required
} from "../../../../helpers/fieldValidators";
import { dateDelta } from "../../../../helpers/utilities";
import { criaDietaEspecial } from "../../../../services/dietaEspecial";
import { meusDados } from "../../../../services/perfil.service";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import CardMatriculados from "../../../Shareable/CardMatriculados";
import { InputComData } from "../../../Shareable/DatePicker";
import InputText from "../../../Shareable/Input/InputText";
import InputFile from "../../../Shareable/Input/InputFile";
import { TextAreaWYSIWYG } from "../../../Shareable/TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import "./style.scss";

const minLength6 = minLength(6);

class solicitacaoDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidadeAlunos: "...",
      files: null
    };
    this.setFiles = this.setFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
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

  async onSubmit(payload) {
    payload.anexos = this.state.files;
    const response = await criaDietaEspecial(payload);
    if (response.status === HTTP_STATUS.CREATED) {
      toastSuccess("Solicitação realizada com sucesso.");
    } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
      if (response.data["anexos"] && !response.data["anexos"][0]["nome"]) {
        toastError("Por favor anexe o laudo médico");
      } else if (response.data["anexos"][0]["nome"][0]) {
        const erroExtensaoInvalida = response.data["anexos"][0]["nome"][0];
        toastError(erroExtensaoInvalida);
      } else {
        toastError("Erro ao solicitar dieta especial");
      }
    } else {
      toastError("Erro ao solicitar dieta especial");
    }
  }

  render() {
    const { quantidadeAlunos } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form className="special-diet" onSubmit={handleSubmit}>
        <CardMatriculados numeroAlunos={quantidadeAlunos} />
        <div className="card mt-2 p-4">
          <span className="card-title font-weight-bold cinza-escuro">
            Descrição da Solicitação
          </span>
          <div className="grid-container">
            <div className="ajuste-fonte">Cód. EOL do Aluno</div>
            <div className="ajuste-fonte">Nome completo do Aluno</div>
            <div className="ajuste-fonte">Data de Nascimento</div>
            <Field
              component={InputText}
              name="codigo_eol_aluno"
              placeholder="Insira o Código"
              className="form-control"
              type="number"
              validate={[required, length(6)]}
            />
            <Field
              component={InputText}
              name="nome_completo_aluno"
              placeholder="Insira o Nome do Aluno"
              className="form-control"
              validate={[required, minLength6]}
            />
            <Field
              component={InputComData}
              name="data_nascimento_aluno"
              placeholder="Selecione"
              className="form-control"
              minDate={dateDelta(-360 * 99)}
              maxDate={dateDelta(-1)}
              showMonthDropdown
              showYearDropdown
              validate={required}
            />
          </div>
          <section className="row">
            <div className="col-7">
              <Field
                component={InputText}
                label="Nome do Prescritor da receita (médico, nutricionista, fonoaudiólogo)"
                name="nome_completo_pescritor"
                placeholder="Insira o Nome do Prescritor"
                className="form-control"
                validate={[required, minLength6]}
              />
            </div>
            <div className="col-5">
              <Field
                component={InputText}
                label="Registro funcional (CRM/CRN/CRFa)"
                name="registro_funcional_pescritor"
                placeholder="Insira o Registro Funcional"
                className="form-control"
                validate={[required, minLength6]}
              />
            </div>
          </section>
          <hr />
          <section className="row attachments">
            <div className="col-9">
              <div className="card-title font-weight-bold cinza-escuro mt-4">
                Laudo Médico
              </div>
              <div className="text">
                Anexe o laudo fornecido pelo médico acima. Sem ele, a
                solicitação de Dieta Especial será negada.
              </div>
              <div className="card-warning mt-2">
                <strong>IMPORTANTE:</strong> Envie um arquivo formato .doc,
                .docx, .pdf, .png, .jpg ou .jpeg, com até 2Mb. <br /> O Laudo
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
  form: "solicitacaoDietaEspecial"
})(solicitacaoDietaEspecial);

const selector = formValueSelector("solicitacaoDietaEspecial");
const mapStateToProps = state => {
  return {
    files: selector(state, "files")
  };
};

export default connect(mapStateToProps)(componentNameForm);
