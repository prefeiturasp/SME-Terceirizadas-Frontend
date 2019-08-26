import React, { Component, Fragment } from "react";
import { Stand } from "react-burgers";
import "../style.scss";

export const EMPRESAS = [
  {
    codigo_empresa: "0001",

    nome: "SINGULAR GESTÃO DE SERVIÇOS",
    cnpj: "05.951.758/0001-29",
    status: "Ativa",
    ativo: false,

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",

    telefone: "21 37529943",
    email: "singulargestao.servicos@gmail.com",

    representante: "Paulo Cesar Ribeiro Alves",
    telefonefax: "21 3858-4858",
    email_representante: "singulargestao.servicos@gmail.com",

    nutricionistas: [
      {
        nome: "Luciani Dantas",
        crn: "8773",
        telefone: "21 98999-9999",
        email: "luciani.dantas@gmail.com"
      },
      {
        nome: "Sandra Santos",
        crn: "0975",
        telefone: "21 98999-9999",
        email: "sandra.santos@gmail.com"
      }
    ],

    editais: [
      {
        edital: "78/2016",
        contrato: "36/SME/CODAE/2017"
      },
      {
        edital: "78/2017",
        contrato: "36/SME/CODAE/2018"
      }
    ],

    lotes: [
      { nome: "7A IPI I - DRE IPIRANGA" },
      { nome: "7A IPI II - DRE IPIRANGA" },
      { nome: "10A MP I - DRE SÃO MIGUEL PAULISTA" },
      { nome: "10B MP II - DRE SÃO MIGUEL PAULISTA" }
    ]
  },
  {
    codigo_empresa: "0002",

    nome: "SINGULAR GESTÃO DE SERVIÇOS",
    cnpj: "05.951.758/0001-29",
    status: "Ativa",
    ativo: false,

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",

    telefone: "21 37529943",
    email: "singulargestao.servicos@gmail.com",

    representante: "Paulo Cesar Ribeiro Alves",
    telefonefax: "21 3858-4858",
    email_representante: "singulargestao.servicos@gmail.com",

    nutricionistas: [
      {
        nome: "Luciani Dantas",
        crn: "8773",
        telefone: "21 98999-9999",
        email: "luciani.dantas@gmail.com"
      },
      {
        nome: "Sandra Santos",
        crn: "0975",
        telefone: "21 98999-9999",
        email: "sandra.santos@gmail.com"
      }
    ],

    editais: [
      {
        edital: "78/2016",
        contrato: "36/SME/CODAE/2017"
      },
      {
        edital: "78/2017",
        contrato: "36/SME/CODAE/2018"
      }
    ],

    lotes: [
      { nome: "7A IPI I - DRE IPIRANGA" },
      { nome: "7A IPI II - DRE IPIRANGA" },
      { nome: "10A MP I - DRE SÃO MIGUEL PAULISTA" },
      { nome: "10B MP II - DRE SÃO MIGUEL PAULISTA" }
    ]
  },
  {
    codigo_empresa: "0003",

    nome: "SINGULAR GESTÃO DE SERVIÇOS",
    cnpj: "05.951.758/0001-29",
    status: "Ativa",
    ativo: false,

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",

    telefone: "21 37529943",
    email: "singulargestao.servicos@gmail.com",

    representante: "Paulo Cesar Ribeiro Alves",
    telefonefax: "21 3858-4858",
    email_representante: "singulargestao.servicos@gmail.com",

    nutricionistas: [
      {
        nome: "Luciani Dantas",
        crn: "8773",
        telefone: "21 98999-9999",
        email: "luciani.dantas@gmail.com"
      },
      {
        nome: "Sandra Santos",
        crn: "0975",
        telefone: "21 98999-9999",
        email: "sandra.santos@gmail.com"
      }
    ],

    editais: [
      {
        edital: "78/2016",
        contrato: "36/SME/CODAE/2017"
      },
      {
        edital: "78/2017",
        contrato: "36/SME/CODAE/2018"
      }
    ],

    lotes: [
      { nome: "7A IPI I - DRE IPIRANGA" },
      { nome: "7A IPI II - DRE IPIRANGA" },
      { nome: "10A MP I - DRE SÃO MIGUEL PAULISTA" },
      { nome: "10B MP II - DRE SÃO MIGUEL PAULISTA" }
    ]
  },
  {
    codigo_empresa: "0004",

    nome: "SINGULAR GESTÃO DE SERVIÇOS",
    cnpj: "05.951.758/0001-29",
    status: "Ativa",
    ativo: false,

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",

    telefone: "21 37529943",
    email: "singulargestao.servicos@gmail.com",

    representante: "Paulo Cesar Ribeiro Alves",
    telefonefax: "21 3858-4858",
    email_representante: "singulargestao.servicos@gmail.com",

    nutricionistas: [
      {
        nome: "Luciani Dantas",
        crn: "8773",
        telefone: "21 98999-9999",
        email: "luciani.dantas@gmail.com"
      },
      {
        nome: "Sandra Santos",
        crn: "0975",
        telefone: "21 98999-9999",
        email: "sandra.santos@gmail.com"
      }
    ],

    editais: [
      {
        edital: "78/2016",
        contrato: "36/SME/CODAE/2017"
      },
      {
        edital: "78/2017",
        contrato: "36/SME/CODAE/2018"
      }
    ],

    lotes: [
      { nome: "7A IPI I - DRE IPIRANGA" },
      { nome: "7A IPI II - DRE IPIRANGA" },
      { nome: "10A MP I - DRE SÃO MIGUEL PAULISTA" },
      { nome: "10B MP II - DRE SÃO MIGUEL PAULISTA" }
    ]
  },
  {
    codigo_empresa: "0005",

    nome: "JSD",
    cnpj: "05.951.758/0001-29",
    status: "Ativa",
    ativo: false,

    endereco: "Rua Pernambucana, n°1260 - Vila Rosali - São João de Meriti/RJ",
    cep: "25510-430",

    telefone: "21 37529943",
    email: "singulargestao.servicos@gmail.com",

    representante: "Paulo Cesar Ribeiro Alves",
    telefonefax: "21 3858-4858",
    email_representante: "singulargestao.servicos@gmail.com",

    nutricionistas: [
      {
        nome: "Luciani Dantas",
        crn: "8773",
        telefone: "21 98999-9999",
        email: "luciani.dantas@gmail.com"
      },
      {
        nome: "Sandra Santos",
        crn: "0975",
        telefone: "21 98999-9999",
        email: "sandra.santos@gmail.com"
      }
    ],

    editais: [
      {
        edital: "78/2016",
        contrato: "36/SME/CODAE/2017"
      },
      {
        edital: "78/2017",
        contrato: "36/SME/CODAE/2018"
      }
    ],

    lotes: [
      { nome: "7A IPI I - DRE IPIRANGA" },
      { nome: "7A IPI II - DRE IPIRANGA" },
      { nome: "10A MP I - DRE SÃO MIGUEL PAULISTA" },
      { nome: "10B MP II - DRE SÃO MIGUEL PAULISTA" }
    ]
  }
];

class EmpresasCadastradas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: EMPRESAS,
      empresasFiltradas: EMPRESAS
    };
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
              <th>Situação</th>
              <th className="text-center">
                <div className="pesquisar">
                  <input
                    className="input-search"
                    placeholder="Pesquisar"
                  />
                  <i className="fas fa-search" />
                </div>
              </th>
            </tr>

            {this.state.empresasFiltradas.map(empresa => {
              return [
                <tr className={empresa.ativo ? "detalhe-empresa" : ""}>
                  <td>{empresa.codigo_empresa}</td>
                  <td className="nome-empresa">{empresa.nome}</td>
                  <td>{empresa.cnpj}</td>
                  <td>{empresa.status}</td>
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
                      <div className="secao-empresa">
                        <div className="endereco-empresa">
                          <div>
                            <span className="descricao">Endereço:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.endereco}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">CEP:</span>
                            <span className="valor-desc">
                              {empresa.cep}
                            </span>
                          </div>
                        </div>

                        <div className="contato-empresa">
                          <div>
                            <span className="descricao">Telefone/FAX:</span>
                            <span className="valor-desc">
                              {empresa.telefone}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">E-mail:</span>
                            <span className="valor-desc">
                              {empresa.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="linha-detalhe" />

                      <div className="secao-representante">
                        <div className="nome-representante">
                          <div>
                            <span className="descricao">
                              Representante Legal:
                            </span>
                            <br />
                            <span className="valor-desc">
                              {empresa.representante}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">Telefone:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.telefonefax}
                            </span>
                          </div>
                        </div>
                        <div className="contato-representante">
                          <div>
                            <span className="descricao">E-mail:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="linha-detalhe" />

                      {empresa.nutricionistas.map(nutri => {
                        return [
                          <Fragment>
                            <div className="secao-representante pt-3">
                              <div className="nome-representante">
                                <div>
                                  <span className="descricao">
                                    Nutricionista Responsável Técnico:
                                  </span>
                                  <br />
                                  <span className="valor-desc">
                                    {nutri.nome}
                                  </span>
                                </div>
                                <div>
                                  <span className="descricao">CRN</span>
                                  <span className="valor-desc">
                                    {nutri.crn}
                                  </span>
                                </div>
                              </div>
                              <div className="contato-nutri">
                                <div>
                                  <span className="descricao">
                                    Telefone/Celular:
                                  </span>
                                  <br />
                                  <span className="valor-desc">
                                    {nutri.telefone}
                                  </span>
                                </div>
                                <div>
                                  <span className="descricao">E-mail:</span>
                                  <br />
                                  <span className="valor-desc">
                                    {nutri.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        ];
                      })}

                      {empresa.nutricionistas.length > 0 && (
                        <hr className="linha-detalhe" />
                      )}

                      {empresa.editais.map(edital => {
                        return [
                          <Fragment>
                            <div className="secao-representante pt-3">
                              <div className="nome-representante">
                                <div>
                                  <span className="descricao">
                                    Edital de Pregão n°:
                                  </span>
                                  <span className="valor-desc">
                                    {edital.edital}
                                  </span>
                                </div>
                                <div>
                                  <span className="descricao">
                                    Contrato n°:
                                  </span>
                                  <span className="valor-desc">
                                    {edital.contrato}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        ];
                      })}
                      {empresa.editais.length > 0 && (
                        <hr className="linha-detalhe" />
                      )}
                      <div className="lista-lotes">
                        {empresa.lotes.length > 0 && (
                          <div className="pt-2">
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
