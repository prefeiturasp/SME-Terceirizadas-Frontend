import PropTypes from "prop-types";
import React, { Component } from "react";
import { InputErroMensagem } from "../InputErroMensagem";
import { HelpText } from "../../../Shareable/HelpText";
import "./style.scss";
import Botao from "../../Botao";
import { BUTTON_STYLE, BUTTON_ICON, BUTTON_TYPE } from "../../Botao/constants";
import { readerFile } from "./helper";

export class InputFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  openFile(file) {
    let pdfWindow = window.open("");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='" + file.base64 + "'></iframe>"
    );
  }

  async onInputChange(event) {
    let files = [];
    let data = [];
    Array.from(event.target.files).forEach(file => {
      readerFile(file)
        .then(anexo => {
          data.push(anexo);
          files.push({ nome: file.name, base64: anexo.anexo });
        })
        .then(() => {
          this.props.setFiles(data);
          this.setState({ files });
        });
    });
  }

  render() {
    const { files } = this.state;
    const {
      accept,
      className,
      disabled,
      helpText,
      icone,
      input,
      meta,
      multiple,
      name,
      required,
      title,
      texto
    } = this.props;
    return (
      <div className={`input input-file ${icone && "icon"}`}>
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
          multiple={multiple}
          title={title}
        />
        <Botao
          onClick={() => this.inputRef.click()}
          htmlFor={name}
          texto={texto}
          style={BUTTON_STYLE.BLUE_OUTLINE}
          icon={BUTTON_ICON.ATTACH}
          type={BUTTON_TYPE.BUTTON}
        />
        {files.map((file, key) => {
          return (
            <div
              className="file-name"
              onClick={() => this.openFile(file)}
              key={key}
            >
              {file.nome}
            </div>
          );
        })}
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}

InputFile.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string
};

InputFile.defaultProps = {
  className: "",
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
  type: "text"
};

export default InputFile;
