import React, { Component, Fragment } from "react";
import moment from "moment";
import { ToggleExpandir } from "../../../Shareable/ToggleExpandir";
import { getTerceirizada } from "../../../../services/terceirizada.service.js";
import { Link, NavLink } from "react-router-dom";
import { retornArrayTerceirizadas } from "./helper.js";
import { PERFIL } from "../../../../constants/shared";
import "../style.scss";

class EmpresasCadastradas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
      empresasFiltradas: [],
      ehDistribuidor: false
    };
  }

  buscaTerceirizadas() {
    getTerceirizada().then(response => {
      const resp = retornArrayTerceirizadas(response.data.results);
      const tipoPerfil = localStorage.getItem("perfil");
      let empresasF = [];
      if (tipoPerfil === PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA) {
        resp.forEach(empresa => {
          if (!empresa.eh_distribuidor) {
            empresasF.push(empresa);
          }
        });
      } else if (tipoPerfil === PERFIL.COORDENADOR_LOGISTICA) {
        this.setState({ ...this.state, ehDistribuidor: true });
        resp.forEach(empresa => {
          if (empresa.eh_distribuidor) {
            empresasF.push(empresa);
          }
        });
      }
      const empresas = empresasF;
      const empresasFiltradas = empresasF;
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
    const { empresasFiltradas } = this.state;
    return (
      <div className="card pt-3 mt-3">
        <div className="card-body card-table-cadastro">
          <table className="cadastro-empresa">
            <tr>
              {!this.state.ehDistribuidor && <th className="col">ID</th>}
              <th className="col">Empresas Cadastradas</th>
              <th className="col">CNPJ</th>
              <th className="col">Situação</th>
              <th className="col">Tipo de Empresa</th>
              <th className="">
                <div className="">
                  <input className="input-search" placeholder="Pesquisar" />
                  <i className="fas fa-search" />
                </div>
              </th>
            </tr>

            {empresasFiltradas.map((empresa, key) => {
              return [
                <tr
                  key={key}
                  className={empresa.ativo ? "detalhe-empresa" : ""}
                >
                  {!empresa.eh_distribuidor && (
                    <td>{empresa.codigo_empresa}</td>
                  )}
                  <td className="nome-empresa">{empresa.nome}</td>
                  <td>{empresa.cnpj}</td>
                  <td>{empresa.status}</td>
                  <td>{empresa.tipo}</td>

                  <td className="btn-action botao-direita">
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
                    {!empresa.eh_distribuidor && (
                      <td className="detalhe-empresa" />
                    )}
                    <td className="container-detalhe" colSpan="5">
                      <div className="secao-empresa">
                        <div className="endereco-empresa-top">
                          <div>
                            <span className="descricao">
                              Número de Contrato:
                            </span>
                            <br />
                            <span className="valor-desc">
                              {empresa.numero_contrato}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">Tipo de Empresa:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.tipo_empresa}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">Tipo de Alimento:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.tipo_alimento}
                            </span>
                          </div>
                        </div>

                        <div className="endereco-empresa-top">
                          <div>
                            <span className="descricao">CEP:</span>
                            <br />
                            <span className="valor-desc">{empresa.cep}</span>
                          </div>
                          <div>
                            <span className="descricao">Endereço:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.endereco}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">Numero:</span>
                            <br />
                            <span className="valor-desc">{empresa.numero}</span>
                          </div>
                        </div>

                        <div className="endereco-empresa mt-2">
                          <div>
                            <span className="descricao">Bairro:</span>
                            <br />
                            <span className="valor-desc">{empresa.bairro}</span>
                          </div>
                          <div>
                            <span className="descricao">Cidade:</span>
                            <br />
                            <span className="valor-desc">{empresa.cidade}</span>
                          </div>
                          <div>
                            <span className="descricao">Estado:</span>
                            <br />
                            <span className="valor-desc">{empresa.estado}</span>
                          </div>
                          <div>
                            <span className="descricao">Complemento:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.complemento}
                            </span>
                          </div>
                        </div>

                        <div className="contato-empresa">
                          <div>
                            <span className="descricao">Telefone/FAX:</span>
                            <br />
                            <span className="valor-desc">
                              {empresa.telefone}
                            </span>
                          </div>
                          <div>
                            <span className="descricao">E-mail:</span>
                            <br />
                            <span className="valor-desc">{empresa.email}</span>
                          </div>
                          <div>
                            <span className="descricao">Data de Cadastro:</span>
                            <br />
                            <span className="valor-desc">
                              {moment(empresa.criado_em, "DD/MM/YYYY").format(
                                "DD/MM/YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="linha-detalhe" />

                      {empresa.eh_distribuidor ? (
                        <Fragment>
                          <div className="secao-distribuidor">
                            <header>
                              Cadastro do Usuário Responsável pelo acesso ao
                              sistema
                            </header>
                            <div className="secao-empresa">
                              <section className="contato-empresa">
                                <div>
                                  <span className="descricao">E-mail:</span>
                                  <br />
                                  <span className="valor-desc">
                                    {empresa.responsavel_email}
                                  </span>
                                </div>
                                <div>
                                  <span className="descricao">Nome:</span>
                                  <br />
                                  <span className="valor-desc">
                                    {empresa.responsavel_nome}
                                  </span>
                                </div>
                              </section>
                              <section className="contato-empresa">
                                <div>
                                  <span className="descricao">CPF:</span>
                                  <br />
                                  <span className="valor-desc">
                                    {empresa.responsavel_cpf}
                                  </span>
                                </div>
                                <div>
                                  <span className="descricao">Cargo:</span>
                                  <br />
                                  <span className="valor-desc">
                                    {empresa.responsavel_cargo}
                                  </span>
                                </div>
                                <div>
                                  <span className="descricao">Telefone:</span>
                                  <br />
                                  <span className="valor-desc">
                                    {empresa.responsavel_telefone}
                                  </span>
                                </div>
                              </section>
                            </div>
                          </div>
                          <hr className="linha-detalhe" />
                          <div className="secao-distribuidor">
                            <header>Contatos</header>
                            <div className="secao-empresa">
                              {empresa.contatos
                                .filter(contato => contato.nome)
                                .map(contato => (
                                  <section key="" className="contato-empresa">
                                    <div>
                                      <span className="descricao">Nome:</span>
                                      <br />
                                      <span className="valor-desc">
                                        {contato.nome}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="descricao">
                                        Telefone/FAX:
                                      </span>
                                      <br />
                                      <span className="valor-desc">
                                        {contato.telefone}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="descricao">E-mail:</span>
                                      <br />
                                      <span className="valor-desc">
                                        {contato.email}
                                      </span>
                                    </div>
                                  </section>
                                ))}
                            </div>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
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
                        </Fragment>
                      )}
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
