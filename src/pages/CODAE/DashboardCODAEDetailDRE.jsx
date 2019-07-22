import React, { Component } from "react";
import Page from "../../components/Shareable/Page/Page";
import DetailDREContainer from "../../components/screens/DashboardCODAE/DetailDREContainer";

export default class DashboardCODAEDetailDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vision_by: [
        {
          label: "Visão por",
          value: ""
        },
        {
          label: "DRE",
          value: "dre"
        },
        {
          label: "Dia",
          value: "day"
        },
        {
          label: "Semana",
          value: "week"
        },
        {
          label: "Mês",
          value: "month"
        },
        {
          label: "Lote",
          value: "lote"
        }
      ]
    };
  }
  render() {
    return (
      <Page tituloRastro="SOLICITAÇÕES">
        <DetailDREContainer {...this.state }/>
      </Page>
    );
  }
}
