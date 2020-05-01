import React, { Component } from "react";

import { HOME } from "../../constants/config";

import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";

import AtivasInativas from "../../components/screens/DietaEspecial/AtivasInativasPorAluno";

export default class RelatorioAlunosDietasAtivasInativasPage extends Component {
  render() {
    return (
      <Page>
        <Breadcrumb
          home={HOME}
          anteriores={this.anteriores}
          atual={this.atual}
        />
        <AtivasInativas />
      </Page>
    );
  }
}
