import React, { Component } from "react";

import { InputErroMensagem } from "../../../../../../../Shareable/Input/InputErroMensagem";
import InputText from "../../../../../../../Shareable/Input/InputText";
import InputFileManaged from "../../../../../../../Shareable/Input/InputFile/Managed";

export default class ProtocolosField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descricaoProtocolo: ""
    };

    this.removeFile = this.removeFile.bind(this);
    this.setFiles = this.setFiles.bind(this);
  }

  removeFile(index) {
    const {
      input: { onChange, value }
    } = this.props;
    onChange(value.length === 1 ? "" : value.splice(index, 1));
  }
  setFiles(files) {
    this.setState({
      descricaoProtocolo: ""
    });
    this.props.input.onChange(files);
  }

  render() {
    const { descricaoProtocolo } = this.state;
    const {
      input: { value },
      meta
    } = this.props;
    return (
      <div className="row">
        <div className="col-9">
          <InputText
            input={{
              value: descricaoProtocolo,
              onChange: event => {
                this.setState({ descricaoProtocolo: event.target.value });
              }
            }}
          />
          <div className="mt-2 card-warning" role="alert">
            <b>IMPORTANTE:</b> Envie um arquivo formato .doc, .docx, .pdf, .png,
            .jpg ou .jpeg, com até 2Mb.
          </div>
          <InputErroMensagem meta={meta} />
        </div>
        <div className="col-3">
          <InputFileManaged
            className="inputfile"
            texto="Anexar Protocolo"
            icone={undefined}
            accept=".doc, .docx, .pdf, .png, .jpg, .jpeg"
            onChange={this.setFiles}
            concatenarNovosArquivos
            nomeNovoArquivo={descricaoProtocolo}
            disabled={
              descricaoProtocolo === undefined || descricaoProtocolo.length < 3
            }
            value={value}
          />
        </div>
      </div>
    );
  }
}
