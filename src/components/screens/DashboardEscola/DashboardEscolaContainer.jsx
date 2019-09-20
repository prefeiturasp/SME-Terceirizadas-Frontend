import React, { Component } from "react";
import {
  getSolicitacoesAutorizadasEscola,
  getSolicitacoesNegadasEscola,
  getSolicitacoesPendentesEscola,
  getSolicitacoesCanceladasEscola
} from "../../../services/painelEscola.service";
import { ajustarFormatoLog } from "../helper";
import DashboardEscola from "./DashboardEscola";

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
      pendentes: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      negadas: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      canceladas: [
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
    let pendentes = await getSolicitacoesPendentesEscola(
      "b9a36370-2fdd-44ab-8a33-a22b6921236f"
    );
    let autorizadas = await getSolicitacoesAutorizadasEscola(
      "b9a36370-2fdd-44ab-8a33-a22b6921236f"
    );

    let negadas = await getSolicitacoesNegadasEscola(
      "b9a36370-2fdd-44ab-8a33-a22b6921236f"
    );

    let canceladas = await getSolicitacoesCanceladasEscola(
      "b9a36370-2fdd-44ab-8a33-a22b6921236f"
    );

    autorizadas = ajustarFormatoLog(autorizadas.results);
    pendentes = ajustarFormatoLog(pendentes.results);
    negadas = ajustarFormatoLog(negadas.results);
    canceladas = ajustarFormatoLog(canceladas.results);
    this.setState({ autorizadas, pendentes, negadas, canceladas });
  }

  render() {
    const { autorizadas, pendentes, negadas, theadList, trs } = this.state;
    return (
      <div>
        <DashboardEscola
          numeroAlunos={250}
          autorizadas={autorizadas}
          pendentes={pendentes}
          negadas={negadas}
          theadList={theadList}
          trs={trs}
        />
      </div>
    );
  }
}
