import React, { Component } from "react";
import PropTypes from "prop-types";
import { convertToRaw, EditorState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";

export class OpcoesCustomizadas extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.adicionarVariavel = this.adicionarVariavel.bind(this);
  }

  adicionarVariavel(variavel) {
    if (this.variavelUtilizada(variavel)) return;
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      variavel,
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  }

  variavelUtilizada(variavel) {
    return draftToHtml(
      convertToRaw(this.props.editorState.getCurrentContent())
    ).includes(variavel);
  }

  render() {
    return (
      <div className="variables my-auto">
        <div
          className={this.variavelUtilizada("@identificador") ? "used" : ""}
          onClick={() => this.adicionarVariavel("@identificador")}
        >
          Identificador
        </div>
        <div
          className={this.variavelUtilizada("@nome") ? "used" : ""}
          onClick={() => this.adicionarVariavel("@nome")}
        >
          Nome
        </div>
        <div
          className={this.variavelUtilizada("@data") ? "used" : ""}
          onClick={() => this.adicionarVariavel("@data")}
        >
          Data
        </div>
        <div
          className={
            this.variavelUtilizada("@tipo_de_alimentacao") ? "used" : ""
          }
          onClick={() => this.adicionarVariavel("@tipo_de_alimentacao")}
        >
          Tipo de alimentação
        </div>
      </div>
    );
  }
}
