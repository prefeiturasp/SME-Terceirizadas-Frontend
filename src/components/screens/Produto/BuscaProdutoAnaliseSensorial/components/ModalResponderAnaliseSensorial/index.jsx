import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { Modal } from "react-bootstrap";
import { required, minLength } from "../../../../../../helpers/fieldValidators";
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
import { TimePicker } from "antd";
import moment from "moment";
import "./styles.scss";
import { formataData } from "./helper";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import { getError } from "helpers/utilities";
import { respostaAnaliseSensorial } from "services/produto.service";

const format = "HH:mm";
const minLength8 = minLength(8);

class ModalResponderAnaliseSensorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arquivos: [],
      hora: null
    };
    this.setFiles = this.setFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
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
    const { hora, arquivos } = this.state;
    const { uuid } = this.props.homologacao;
    const horaInput = moment(hora, "h:mm:ss").format("HH:mm:ss");
    values["hora"] = horaInput;
    values["data"] = formataData(values.data);
    values["anexos"] = arquivos.map(anexo => {
      return {
        nome: anexo.nome,
        base64: anexo.arquivo
      };
    });
    values["homologacao_de_produto"] = uuid;

    return new Promise(async (resolve, reject) => {
      const response = await respostaAnaliseSensorial(values);
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Resposta para análise sensorial enviada com sucesso.");
        this.props.history.push(
          "/pesquisa-desenvolvimento/busca-produto-analise-sensorial"
        );
        this.props.history.go();
        resolve();
      } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(getError(response.data));
        reject();
      } else {
        toastError(`Erro ao enviar resposta`);
        reject();
      }
    });
  };

  habilitarSubmit = () => {
    const { responsavel_produto, registro_funcional, data } = this.props;
    const { hora } = this.state;
    const { arquivos } = this.state;
    const validResponsavel = responsavel_produto !== undefined;
    const validRegistro = registro_funcional !== undefined;
    const validData = data !== undefined;
    const validArquivos = arquivos.length > 0;
    if (
      validResponsavel &&
      validRegistro &&
      validData &&
      validArquivos &&
      hora !== null
    ) {
      return false;
    } else {
      return true;
    }
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
                  validate={[required, minLength8]}
                  maxlength="10"
                />
              </article>

              <article>
                <label>
                  Data <span className="obrigatorio">*</span>
                </label>
                <Field
                  component={InputComData}
                  name="data"
                  validate={required}
                />
              </article>

              <article>
                <label>
                  Hora <span className="obrigatorio">*</span>
                </label>
                <TimePicker
                  format={format}
                  placeholder=""
                  onChange={this.setHora}
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
                  toastSuccess={"Imagem do produto incluída com sucesso!"}
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
                onClick={closeModal}
              />
              <Botao
                texto="Enviar"
                type={BUTTON_TYPE.SUBMIT}
                disabled={this.habilitarSubmit()}
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
    // initialValues: state.analiseSensorial.data,
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
