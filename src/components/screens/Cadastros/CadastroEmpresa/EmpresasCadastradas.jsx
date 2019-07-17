import React, { Component } from "react";
import { Stand } from "react-burgers";
import "../style.scss";

export const EMPRESAS = [
  {
    codigo_empresa: "0001",
    nome: "SINGULAR GESTÃO DE SERVIÇOS",
    cnpj: "05.951.758/0001-29",
    telefone: "(21) 3752-9943",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefone_fax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [],
    ativo: false
  },
  {
    codigo_empresa: "0002",
    nome: "APETECE SISTEMAS DE ALIMENTAÇÃO",
    cnpj: "60.166.832/0001-04",
    telefone: "(11) 4239-9300",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefone_fax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [],
    ativo: false
  },
  {
    codigo_empresa: "0003",
    nome: "S.H.A COMÉRCIO DE ALIMENTOS LTDA.",
    cnpj: "61.980.272/0001-90",
    telefone: "(12) 3023-5000",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefone_fax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [],
    ativo: false
  },
  {
    codigo_empresa: "0004",
    nome: "P.R.M SERVIÇOS E MÃO DE OBRA ESPECIALIZADA EIRELI",
    cnpj: "03.706.826/0001-69",
    telefone: "(21) 3023-5000",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefone_fax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [],
    ativo: false
  },
  {
    codigo_empresa: "0005",
    nome: "SINGULAR GESTÃO DE SERVIÇOS",
    cnpj: "05.951.758/0001-29",
    telefone: "(21) 37529943",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefonefax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [
      { nome: "7A IPI I - DRE IPIRANGA" },
      { nome: "7A IPI II - DRE IPIRANGA" },
      { nome: "10A MP I - DRE SÃO MIGUEL PAULISTA" },
      { nome: "10B MP II - DRE SÃO MIGUEL PAULISTA" }
    ],
    ativo: false
  },
  {
    codigo_empresa: "0006",
    nome: "S.H.A COMÉRCIO DE ALIMENTOS LTDA.",
    cnpj: "61.980.272/0001-90",
    telefone: "(12) 3023-5000",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefone_fax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [],
    ativo: false
  },
  {
    codigo_empresa: "0007",
    nome: "P.R.M SERVIÇOS E MÃO DE OBRA ESPECIALIZADA EIRELI",
    cnpj: "03.706.826/0001-69",
    telefone: "(21) 3023-5000",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefone_fax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [],
    ativo: false
  },
  {
    codigo_empresa: "0008",
    nome: "SINGULAR GESTÃO DE SERVIÇOS",
    cnpj: "05.951.758/0001-29",
    telefone: "(21) 3752-9943",

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",
    telefone_fax: "(21) 3752-9943",
    email: "singulargestao.servicos@gmail.com",
    representante: "Paulo Cesar Ribeiro Alves",
    nutricionista: "Luciani Dantas",
    crn: "8773",
    edital: "78/2016",
    contrato: "36/SME/CODAE/2017",
    lotes: [],
    ativo: false
  }
];

class EmpresasCadastradas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: EMPRESAS,
      empresasFiltradas: EMPRESAS
    };
    this.filtrarEmpresas = this.filtrarEmpresas.bind(this);
  }

  filtrarEmpresas(event) {
    let empresasFiltradas = this.state.empresas;
    empresasFiltradas = empresasFiltradas.filter(function(item) {
      const palavraAFiltrar = event.target.value.toLowerCase();
      return (
        item.nome.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.cnpj.search(palavraAFiltrar) !== -1
      );
    });
    this.setState({ empresasFiltradas });
  }

  lidarComBurger(empresa) {
    empresa.ativo = !empresa.ativo;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="card pt-3 mt-3">
        <div className="card-body card-table-cadastro">
          <table className="cadastro-empresa">
            <tr>
              <th>ID</th>
              <th>Empresas Cadastradas</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th className="text-center">
                <input
                  className="input-search"
                  onChange={this.filtrarEmpresas}
                  placeholder="Pesquisar"
                />
                <i className="fas fa-search" />
              </th>
            </tr>
            {this.state.empresasFiltradas.map(empresa => {
              return [
                <tr className={empresa.ativo ? "detalhe-empresa" : ""}>
                  <td>{empresa.codigo_empresa}</td>
                  <td className="nome-empresa">{empresa.nome}</td>
                  <td>{empresa.cnpj}</td>
                  <td>{empresa.telefone}</td>
                  <td className="btn-action">
                    <Stand
                      onClick={() => this.lidarComBurger(empresa)}
                      color={"#C8C8C8"}
                      width={30}
                      padding={0}
                      lineSpacing={5}
                      active={empresa.ativo}
                    />
                  </td>
                </tr>,
                empresa.ativo && (
                  <tr>
                    <td className="detalhe-empresa" />
                    <td className="container-detalhe" colSpan="4">
                      <div className="container-info">
                        <div>
                          <div>
                            <span className="descricao">Endereço:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.endereco}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">Telefone/FAX:</span>
                            <span className="valor-desc">
                              {empresa.telefone}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">
                              Representante Legal:
                            </span>
                            <span className="valor-desc">
                              {empresa.representante}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">
                              Nutricionista Responsável Técnico:
                            </span>
                            <br />
                            <span className="valor-desc">
                              {empresa.nutricionista}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">
                              Edital de Pregão n°:
                            </span>
                            <span className="valor-desc">{empresa.edital}</span>
                          </div>

                          {empresa.lotes.length > 0 && (
                            <div className="pt-4">
                              <span className="descricao">
                                Lotes de atendimento:
                              </span>
                            </div>
                          )}
                          {empresa.lotes.length > 0 && (
                            <ul>
                              {empresa.lotes.map((lote, item) => (
                                <li>{lote.nome}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div>
                          <div>
                            <span className="descricao">CEP:</span>
                            <span className="valor-desc">{empresa.cep}</span>
                          </div>
                          <div>
                            <span className="descricao">E-mail:</span>
                            <span className="valor-desc">{empresa.email}</span>
                          </div>
                          <div>
                            <span className="descricao">Contato:</span>
                            <br />
                            <span className="valor-desc">{empresa.email}</span>
                          </div>
                          <div>
                            <span className="descricao">CRN:</span>
                            <span className="valor-desc">{empresa.crn}</span>
                            <span className="pl-3 descricao">E-mail:</span>
                            <span className="valor-desc">{empresa.email}</span>
                          </div>
                          <div>
                            <span className="descricao">Contrato n°:</span>
                            <span className="valor-desc">
                              {empresa.contrato}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              ];
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default EmpresasCadastradas;
