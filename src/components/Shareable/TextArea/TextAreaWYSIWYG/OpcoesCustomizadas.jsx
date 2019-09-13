import { convertToRaw, EditorState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";
import React, { Component } from "react";

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
          className={this.variavelUtilizada("@id") && "used"}
          onClick={() => this.adicionarVariavel("@id")}
        >
          Id
        </div>
        <div
          className={this.variavelUtilizada("@nome") && "used"}
          onClick={() => this.adicionarVariavel("@nome")}
        >
          Nome
        </div>
        <div
          className={this.variavelUtilizada("@criado_em") && "used"}
          onClick={() => this.adicionarVariavel("@criado_em")}
        >
          Criado em
        </div>
        <div
          className={this.variavelUtilizada("@criado_por") && "used"}
          onClick={() => this.adicionarVariavel("@criado_por")}
        >
          Criado por
        </div>
        <div
          className={this.variavelUtilizada("@status") && "used"}
          onClick={() => this.adicionarVariavel("@status")}
        >
          Status
        </div>
        <div
          className={this.variavelUtilizada("@data_inicial") && "used"}
          onClick={() => this.adicionarVariavel("@data_inicial")}
        >
          Data inicial
        </div>
        <div
          className={this.variavelUtilizada("@link") && "used"}
          onClick={() => this.adicionarVariavel("@link")}
        >
          Link
        </div>
      </div>
    );
  }
}
