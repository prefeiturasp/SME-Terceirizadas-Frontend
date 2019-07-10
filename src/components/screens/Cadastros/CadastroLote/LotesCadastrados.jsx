import React, { Component } from "react";
import { EmpresasDoLote } from "./EmpresasDoLote/EmpresasDoLote";
import { Stand } from "react-burgers";
import "../style.scss";

export const LOTES = [
  {
    nome: "1 BT",
    dre: "BUTANTÃ",
    tipo_de_gestao: "MISTA",
    empresas: [],
    ativo: false
  },
  {
    nome: "2 CLI",
    dre: "CAMPO LIMPO",
    tipo_de_gestao: "MISTA",
    empresas: [],
    ativo: false
  },
  {
    nome: "3 CLIII",
    dre: "CAMPO LIMPO",
    tipo_de_gestao: "MISTA",
    empresas: [],
    ativo: false
  },
  {
    nome: "4 CS",
    dre: "CAPELA DO SOCORRO",
    tipo_de_gestao: "TERC TOTAL",
    empresas: [],
    ativo: false
  },
  {
    nome: "5 FO",
    dre: "FREGUESIA DO Ó",
    tipo_de_gestao: "TERC TOTAL",
    empresas: [],
    ativo: false
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
    ],
    ativo: false
  },
  {
    nome: "7A IP II",
    dre: "FREGUESIA DO Ó",
    tipo_de_gestao: "TERC TOTAL",
    empresas: [],
    ativo: false
  },
  {
    nome: "7A IP II",
    dre: "FREGUESIA DO Ó",
    tipo_de_gestao: "TERC TOTAL",
    empresas: [],
    ativo: false
  },
  {
    nome: "7A IP II",
    dre: "FREGUESIA DO Ó",
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
    ],
    ativo: false
  }
];

class LotesCadastrados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: LOTES,
      lotesFiltrados: LOTES
    };
    this.filtrarLotes = this.filtrarLotes.bind(this);
  }

  filtrarLotes(event) {
    let lotesFiltrados = this.state.lotes;
    lotesFiltrados = lotesFiltrados.filter(function(item) {
      const palavraAFiltrar = event.target.value.toLowerCase();
      return (
        item.nome.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.dre.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.tipo_de_gestao.toLowerCase().search(palavraAFiltrar) !== -1
      );
    });
    this.setState({ lotesFiltrados });
  }

  lidarComBurger(lote) {
    lote.ativo = !lote.ativo;
    this.forceUpdate();
  }

  render() {
    const { lotesFiltrados } = this.state;
    return (
      <div className="card pt-3 mt-3">
        <div className="card-body card-table-cadastro">
          <table className="cadastro">
            <tr>
              <th>Nome/Nº Lote</th>
              <th>DRE</th>
              <th>Tipo de Gestão</th>
              <th className="text-center">
                <input
                  className="input-search"
                  onChange={this.filtrarLotes}
                  placeholder="Pesquisar"
                />
                <i className="fas fa-search" />
              </th>
            </tr>
            {lotesFiltrados.map(lote => {
              return [
                <tr
                  className={
                    lote.ativo && lote.empresas.length > 0
                      ? "relationed-companies"
                      : ""
                  }
                >
                  <td>{lote.nome}</td>
                  <td>{lote.dre}</td>
                  <td>{lote.tipo_de_gestao}</td>
                  <td>
                    <Stand
                      onClick={() => this.lidarComBurger(lote)}
                      color={"#C8C8C8"}
                      width={30}
                      padding={0}
                      lineSpacing={5}
                      active={lote.ativo}
                    />
                  </td>
                </tr>,
                lote.empresas.length > 0 && lote.ativo && (
                  <tr className="relationed-company-title">
                    <td colSpan="4">Empresas relacionadas:</td>
                  </tr>
                ),
                lote.empresas.map((empresa, indice) => {
                  return (
                    <tr className="relationed-companies">
                      <EmpresasDoLote
                        ultimo={lote.empresas.length === indice + 1}
                        empresa={empresa}
                        ativo={lote.ativo}
                      />
                    </tr>
                  );
                })
              ];
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default LotesCadastrados;
