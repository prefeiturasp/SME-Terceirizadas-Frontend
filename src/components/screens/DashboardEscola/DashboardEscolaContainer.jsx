import React, { Component } from "react";
import { getSolicitacoesPendentesEscola } from "../../../services/painelEscola.service";
import DashboardEscola from "./DashboardEscola";
import { ajustarFormatoLog } from "./helper";

export default class DashboardEscolaContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      autorizadas: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      theadList: [
        "Nº Solicitação",
        "Escola",
        "Quantidade de Alimentações solicitadas"
      ],
      trs: [
        {
          _id: 12083,
          escola: "EMEF CACILDA BECKER",
          quantidade: 1705
        },
        {
          _id: 12084,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12085,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12086,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12087,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        },
        {
          _id: 12088,
          escola: "EMEF AMORIM LIMA, DES.",
          quantidade: 150
        }
      ]
    };
  }

  async componentDidMount() {
    const pendentes = await getSolicitacoesPendentesEscola(
      "b9a36370-2fdd-44ab-8a33-a22b6921236f"
    );
    const autorizadas = ajustarFormatoLog(pendentes.results);
    this.setState({ autorizadas });
  }

  render() {
    const { autorizadas, theadList, trs } = this.state;
    return (
      <div>
        <DashboardEscola
          numeroAlunos={250}
          autorizadas={autorizadas}
          theadList={theadList}
          trs={trs}
        />
      </div>
    );
  }
}
