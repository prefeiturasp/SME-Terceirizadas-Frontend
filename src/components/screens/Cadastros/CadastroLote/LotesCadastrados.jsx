import React, { Component } from "react";
import { EmpresasDoLote } from "./EmpresasDoLote/EmpresasDoLote";
import "../style.scss";

class LotesCadastrados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: [
        {
          nome: "1 BT",
          dre: "BUTANTÃ",
          tipo_de_gestao: "MISTA",
          empresas: []
        },
        {
          nome: "2 CLI",
          dre: "CAMPO LIMPO",
          tipo_de_gestao: "MISTA",
          empresas: []
        },
        {
          nome: "3 CLIII",
          dre: "CAMPO LIMPO",
          tipo_de_gestao: "MISTA",
          empresas: []
        },
        {
          nome: "4 CS",
          dre: "CAPELA DO SOCORRO",
          tipo_de_gestao: "TERC TOTAL",
          empresas: []
        },
        {
          nome: "5 FO",
          dre: "FREGUESIA DO Ó",
          tipo_de_gestao: "TERC TOTAL",
          empresas: []
        },
        {
          nome: "7A IP I",
          dre: "IPIRANGA",
          tipo_de_gestao: "TERC TOTAL",
          empresas: [
            {
              nome: "S.H.A COMÉRCIO DE ALIMENTOS LTDA",
              cnpj: "61.980.272/0001-90",
              tel: "(12) 3023-5000"
            },
            {
              nome: "P.R.M SERVIÇOS E MÃO DE OBRA ESPECIALIZADA EIRELI",
              cnpj: "61.980.272/0001-90",
              tel: "(12) 3023-5000"
            },
            {
              nome: "SINGULAR GESTÃO DE SERVIÇOS LTDA",
              cnpj: "61.980.272/0001-90",
              tel: "(12) 3023-5000"
            }
          ]
        },
        {
          nome: "7A IP II",
          dre: "FREGUESIA DO Ó",
          tipo_de_gestao: "TERC TOTAL",
          empresas: []
        },
        {
          nome: "7A IP II",
          dre: "FREGUESIA DO Ó",
          tipo_de_gestao: "TERC TOTAL",
          empresas: []
        },
        {
          nome: "7A IP II",
          dre: "FREGUESIA DO Ó",
          tipo_de_gestao: "TERC TOTAL",
          empresas: []
        }
      ]
    };
  }

  render() {
    const { lotes } = this.state;
    return (
      <div className="card pt-3">
        <div className="card-body">
          <table>
            <tr>
              <th>Nome/Nº Lote</th>
              <th>DRE</th>
              <th>Tipo de Gestão</th>
              <th>Pesquisar</th>
            </tr>
            {lotes.map((lote, indice) => {
              return [
                <tr>
                  <td>{lote.nome}</td>
                  <td>{lote.dre}</td>
                  <td>{lote.tipo_de_gestao}</td>
                </tr>,
                <EmpresasDoLote empresas={lote.empresas} />
              ];
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default LotesCadastrados;
