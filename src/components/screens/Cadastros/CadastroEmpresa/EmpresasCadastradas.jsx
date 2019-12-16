import React, { Component, Fragment } from "react";
import { ToggleExpandir } from "../../../Shareable/ToggleExpandir";
import { getTerceirizada } from "../../../../services/terceirizada.service.js";
import { Link, NavLink } from "react-router-dom";
import { retornArrayTerceirizadas } from "./helper.js";
import "../style.scss";

class EmpresasCadastradas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
      empresasFiltradas: []
    };
  }

  buscaTerceirizadas() {
    getTerceirizada().then(response => {
      const resp = retornArrayTerceirizadas(response.data.results);
      const empresas = resp;
      const empresasFiltradas = resp;
      this.setState({ empresas, empresasFiltradas });
    });
  }

  componentDidMount() {
    this.buscaTerceirizadas();
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
                  <input className="input-search" placeholder="Pesquisar" />
                  <i className="fas fa-search" />
                </div>
              </th>
            </tr>

            {this.state.empresasFiltradas.map((empresa, key) => {
              return [
                <tr
                  key={key}
                  className={empresa.ativo ? "detalhe-empresa" : ""}
                >
                  <td>{empresa.codigo_empresa}</td>
                  <td className="nome-empresa">{empresa.nome}</td>
                  <td>{empresa.cnpj}</td>
                  <td>{empresa.status}</td>

                  <td className="btn-action">
                    <div className="mr-4">
                      {empresa.ativo && (
                        <NavLink
                          className="float-left"
                          to={`/configuracoes/cadastros/empresa?uuid=${
                            empresa.uuid
                          }`}
                        >
                          <i className="fas fa-pen" />
                        </NavLink>
                      )}
                    </div>
                    <ToggleExpandir
                      onClick={() => this.lidarComBurger(empresa)}
                      ativo={empresa.ativo}
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
                            <span className="valor-desc">{empresa.cep}</span>
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
                            <span className="valor-desc">{empresa.email}</span>
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
                            <span className="valor-desc">{empresa.email}</span>
                          </div>
                        </div>
                      </div>

                      <hr className="linha-detalhe" />

                      {empresa.nutricionistas.map((nutri, key) => {
                        return [
                          <Fragment key={key}>
                            <div className="secao-representante pt-3">
                              <div className="nome-representante">
                                <div>
                                  <span className="descricao">
                                    Nutricionista Responsável Técnico:
                                  </span>
                                  <br />
                                  <span className="valor-desc">
                                    {nutri.nome}
                                    {nutri.super_admin_terceirizadas && (
                                      <span className="ml-1 badge badge-secondary">
                                        Admin
                                      </span>
                                    )}
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

                      {empresa.editais.map((edital, key) => {
                        return [
                          <Fragment key={key}>
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
                            {empresa.lotes.map((lote, key) => (
                              <li key={key}>
                                <Link
                                  to={`/configuracoes/cadastros/lote?uuid=${
                                    lote.uuid
                                  }`}
                                >
                                  {lote.nome}
                                </Link>
                              </li>
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
