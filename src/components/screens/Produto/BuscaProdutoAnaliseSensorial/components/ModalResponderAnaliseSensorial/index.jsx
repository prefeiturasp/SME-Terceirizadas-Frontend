import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { Modal } from "react-bootstrap";
import {
  required,
  minLength,
  numericInteger
} from "../../../../../../helpers/fieldValidators";
import InputText from "components/Shareable/Input/InputText";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import InputFile from "components/Shareable/Input/InputFile";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { withRouter } from "react-router-dom";
import { InputComData } from "components/Shareable/DatePicker";
import "antd/dist/antd.css";
import moment from "moment";
import "./styles.scss";
import { formataData, DATA_MINIMA } from "./helper";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import { getError } from "helpers/utilities";
import { respostaAnaliseSensorial } from "services/produto.service";
import { ATimePicker } from "../../../../../Shareable/MakeField";

const minLength8 = minLength(8);

class ModalResponderAnaliseSensorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arquivos: [],
      hora: null,
      texto: null
    };
    this.setFiles = this.setFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  removeFile(index) {
    let { arquivos } = this.state;
    arquivos.splice(index, 1);
    this.setState({ arquivos });
  }

  setFiles(files) {
    let { arquivos } = this.state;
    arquivos = files;
    this.setState({ arquivos });
  }

  setHora = value => {
    this.setState({ hora: value });
  };

  onSubmit = values => {
    const { arquivos } = this.state;
    const { uuid } = this.props.homologacao;

    if (arquivos.length <= 0) {
      toastError(`Obrigatório anexar documento.`);
    } else {
      values["hora"] = moment(values.hora_min._i, "HH:mm:ss").format(
        "HH:mm:ss"
      );
      values["data"] = formataData(values.data_resp);

      values["anexos"] = arquivos.map(anexo => {
        return {
          nome: anexo.nome,
          base64: anexo.arquivo
        };
      });
      values["homologacao_de_produto"] = uuid;

      delete values["hora_min"];
      delete values["data_resp"];

      respostaAnaliseSensorial(values).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Resposta para análise sensorial enviada com sucesso.");
          this.props.history.push(
            "/pesquisa-desenvolvimento/busca-produto-analise-sensorial"
          );
          this.resetForm();
        } else {
          toastError(getError(response.data));
        }
      });
    }
  };

  resetForm = () => {
    const { closeModal } = this.props;
    this.props.reset();
    closeModal();
    this.setState({ arquivos: [] });
  };

  render() {
    const { showModal, closeModal, handleSubmit } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Responder análise sensorial</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <section>
              <article>
                <label>
                  Pessoa que recebeu produto{" "}
                  <span className="obrigatorio">*</span>
                </label>
                <Field
                  component={InputText}
                  name="responsavel_produto"
                  validate={required}
                />
              </article>
            </section>

            <section className="tres-colunas-modal">
              <article>
                <label>
                  RF: <span className="obrigatorio">*</span>
                </label>
                <Field
                  component={InputText}
                  name="registro_funcional"
                  validate={[required, minLength8, numericInteger]}
                  maxlength="10"
                />
              </article>

              <article>
                <label>
                  Data <span className="obrigatorio">*</span>
                </label>
                <Field
                  component={InputComData}
                  name="data_resp"
                  validate={required}
                  minDate={DATA_MINIMA}
                />
              </article>

              <article>
                <label>
                  Hora <span className="obrigatorio">*</span>
                </label>
                <Field
                  component={ATimePicker}
                  className="campo-hora"
                  name="hora_min"
                  validate={required}
                  placeholder=""
                  allowClear={false}
                />
              </article>
            </section>

            <hr />

            <section>
              <article>
                <label>Observação</label>
                <Field component={TextArea} name="observacao" required />
              </article>
            </section>

            <div className="row pt-3 pb-3">
              <article className="col-9 produto">
                <label>
                  <span className="obrigatorio">* </span>Anexar
                </label>
                <label className="explicacao pt-2">
                  Anexar documento de entrega ou laudo relacionado ao produto
                </label>
              </article>
              <div className="col-3 btn">
                <Field
                  component={InputFile}
                  className="inputfile"
                  texto="Anexar"
                  name="files"
                  accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                  setFiles={this.setFiles}
                  removeFile={this.removeFile}
                  toastSuccess={"Anexo do documento incluído com sucesso!"}
                  multiple
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <section className="rodape-botoes">
              <Botao
                texto="Voltar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE_OUTLINE}
                onClick={() => {
                  this.resetForm();
                }}
              />
              <Botao
                texto="Enviar"
                type={BUTTON_TYPE.SUBMIT}
                onClick={handleSubmit(values => this.onSubmit(values))}
                style={BUTTON_STYLE.GREEN}
              />
            </section>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

const RespostaAnaliseSensorialForm = reduxForm({
  form: "analiseSensorial",
  enableReinitialize: true
})(withRouter(ModalResponderAnaliseSensorial));

const selector = formValueSelector("analiseSensorial");

const mapStateToProps = state => {
  return {
    responsavel_produto: selector(state, "responsavel_produto"),
    registro_funcional: selector(state, "registro_funcional"),
    data: selector(state, "data"),
    hora: selector(state, "hora"),
    observacao: selector(state, "observacao"),
    arquivos: selector(state, "arquivos")
  };
};

export default connect(
  mapStateToProps,
  null
)(RespostaAnaliseSensorialForm);
