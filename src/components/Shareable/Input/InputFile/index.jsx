import PropTypes from "prop-types";
import React, { Component } from "react";
import { InputErroMensagem } from "../InputErroMensagem";
import { HelpText } from "../../../Shareable/HelpText";
import "./style.scss";
import Botao from "../../Botao";
import { BUTTON_STYLE, BUTTON_ICON, BUTTON_TYPE } from "../../Botao/constants";
import { readerFile } from "./helper";
import { toastSuccess, toastError } from "../../Toast/dialogs";
import { truncarString } from "../../../../helpers/utilities";
import { DEZ_MB } from "../../../../constants/shared";

export class InputFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  openFile(file) {
    if (file.nome.includes(".doc")) {
      const link = document.createElement("a");
      link.href = file.base64;
      link.download = file.nome;
      link.click();
    } else {
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='" + file.base64 + "'></iframe>"
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.submitted !== prevProps.submitted) {
      this.setState({ files: [] });
    }
  }

  setStateFiles(files) {
    this.setState({ files });
  }

  deleteFile(index) {
    let files = this.state.files;
    files.splice(index, 1);
    this.props.removeFile(index);
    this.setState({ files });
    this.inputRef.value = "";
  }

  async onInputChange(event) {
    let valido = true;
    let lista_extensoes = ["doc", "docx", "png", "pdf", "jpg", "jpeg"];
    const QUANTIDADE_ARQUIVOS = event.target.files.length;
    if (this.props.accept) {
      let nova_lista_extensoes = [];
      lista_extensoes.forEach(ext => {
        if (this.props.accept.includes(ext.toUpperCase())) {
          nova_lista_extensoes.push(ext);
        }
      });
      lista_extensoes = nova_lista_extensoes;
    }

    Array.from(event.target.files).forEach(file => {
      const extensao = file.name.split(".")[file.name.split(".").length - 1];
      if (this.props.ehPlanilhaMedicaoInicial) {
        if (!["xls", "xlsx", "pdf"].includes(extensao.toLowerCase())) {
          toastError(`Extensão do arquivo não suportada: ${extensao}`);
          valido = false;
        } else if (file.size > DEZ_MB) {
          toastError(`Tamanho máximo: 10MB`);
          valido = false;
        }
      } else {
        if (!lista_extensoes.includes(extensao.toLowerCase())) {
          toastError(
            `Extensão do arquivo não suportada: ${extensao.toUpperCase()}`
          );
          valido = false;
        } else if (file.size > DEZ_MB) {
          toastError(`Arquivo superior a 10MB, não é possível fazer o upload`);
          valido = false;
        }
      }
    });
    if (valido) {
      let files = [];
      let data = [];
      Array.from(event.target.files).forEach(file => {
        readerFile(file)
          .then(anexo => {
            data.push(anexo);
            files.push({
              nome: this.props.nomeNovoArquivo || file.name,
              base64: anexo.arquivo
            });
          })
          .then(() => {
            if (files.length === QUANTIDADE_ARQUIVOS) {
              toastSuccess(
                this.props.toastSuccess || "Laudo(s) incluso(s) com sucesso"
              );
              if (this.props.concatenarNovosArquivos) {
                const allFiles = this.state.files.concat(files);
                this.props.setFiles(allFiles);
                this.setState({ files: allFiles });
              } else {
                this.props.setFiles(data);
                this.setState({ files });
              }
            }
          });
      });
    }
  }

  render() {
    const { files } = this.state;
    const {
      accept,
      alignLeft,
      className,
      customHelpTextClassName,
      disabled,
      helpText,
      icone,
      input,
      meta,
      multiple,
      name,
      required,
      title,
      texto,
      ehPlanilhaMedicaoInicial,
      validationFile
    } = this.props;
    return (
      <>
        <div
          className={`${
            ehPlanilhaMedicaoInicial ? "col-4" : "col-12"
          } input input-file ${alignLeft && "align-left"} ${icone && "icon"}`}
        >
          <Botao
            className="upload-button"
            onClick={() => this.inputRef.click()}
            htmlFor={name}
            texto={texto}
            style={
              ehPlanilhaMedicaoInicial
                ? BUTTON_STYLE.GREEN
                : BUTTON_STYLE.GREEN_OUTLINE
            }
            icon={
              ehPlanilhaMedicaoInicial
                ? BUTTON_ICON.PAPER_CLIP
                : BUTTON_ICON.ATTACH
            }
            type={BUTTON_TYPE.BUTTON}
            disabled={disabled}
          />
          <InputErroMensagem meta={meta} />
          {ehPlanilhaMedicaoInicial &&
            validationFile.touched &&
            !validationFile.xls && (
              <div className="error-or-warning-message">
                <div className="error-message">
                  Falta anexar o arquivo em Excel
                </div>
              </div>
            )}
          {ehPlanilhaMedicaoInicial &&
            validationFile.touched &&
            !validationFile.pdf && (
              <div className="error-or-warning-message">
                <div className="error-message">
                  Falta anexar o arquivo em PDF
                </div>
              </div>
            )}
        </div>
        <div
          className={`${
            ehPlanilhaMedicaoInicial ? "col-8" : "col-12"
          } input input-file ${alignLeft && "align-left"} ${icone && "icon"}`}
        >
          <HelpText
            helpText={helpText}
            customHelpTextClassName={customHelpTextClassName}
          />
        </div>
        <div
          className={`col-12 input input-file ${alignLeft &&
            "align-left"} ${icone && "icon"}`}
        >
          {files.map((file, key) => {
            return (
              <div className="file-div" key={key}>
                <div className="file-name-container">
                  <i className="fas fa-paperclip" />
                  <span
                    onClick={() => this.openFile(file)}
                    className="file-name"
                  >
                    {truncarString(file.nome, 40)}
                  </span>
                  <i
                    onClick={() => this.deleteFile(key)}
                    className={`fas ${
                      ehPlanilhaMedicaoInicial ? "fa-times" : "fa-trash-alt"
                    } exclude-icon`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`col-12 input input-file ${alignLeft &&
            "align-left"} ${icone && "icon"}`}
        >
          <input
            {...input}
            accept={accept}
            ref={i => (this.inputRef = i)}
            className={`form-control ${className} ${meta &&
              meta.touched &&
              (meta.error || meta.warning) &&
              "invalid-field"}`}
            disabled={disabled}
            name={name}
            onChange={event => this.onInputChange(event)}
            data-cy={input.name}
            required={required}
            type="file"
            multiple={ehPlanilhaMedicaoInicial ? true : multiple}
            title={title}
          />
        </div>
      </>
    );
  }
}

InputFile.propTypes = {
  alignLeft: PropTypes.bool,
  className: PropTypes.string,
  customHelpTextClassName: PropTypes.string,
  concatenarNovosArquivos: PropTypes.bool,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  nomeNovoArquivo: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  validationFile: PropTypes.object
};

InputFile.defaultProps = {
  className: "",
  customHelpTextClassName: "",
  concatenarNovosArquivos: false,
  disabled: false,
  esconderAsterisco: false,
  helpText: "",
  input: {},
  label: "",
  labelClassName: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false,
  type: "text",
  validationFile: { touched: false }
};

export default InputFile;
