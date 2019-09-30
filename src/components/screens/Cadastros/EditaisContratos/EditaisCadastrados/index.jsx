import React, { Component, Fragment } from "react";
import { ToggleExpandir } from "../../../../Shareable/ToggleExpandir";
import { NavLink } from "react-router-dom";
import { obterEditaisEContratos } from "../../../../../services/edital.service";
import { montaEstadoEditais } from "../helper";

class EditaisCadastrados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editais: null
    };
  }

  obtemResponseAPIEditais() {
    obterEditaisEContratos().then(response => {
      this.setState({ editais: montaEstadoEditais(response) });
    });
  }

  componentDidMount() {
    this.obtemResponseAPIEditais();
  }

  lidarComBurger(edital) {
    edital.ativo = !edital.ativo;
    this.forceUpdate();
  }

  render() {
    const { editais } = this.state;
    return (
      <div className="card pt-3 mt-3">
        <div className="card-body card-table-cadastro">
          <table className="cadastro-lote">
            <tr>
              <th>Tipos de contratação</th>
              <th>N° do edital</th>
              <th colSpan="3">Nº do processo administrativo</th>
            </tr>
            {editais &&
              editais.map((edital, key_edital) => {
                return (
                  <Fragment key={key_edital}>
                    <tr
                      className={edital.ativo && "relationed-companies title"}
                    >
                      <td className="contratacao">{edital.tipo_contratacao}</td>
                      <td>{edital.edital_numero}</td>
                      <td>{edital.processo_administrativo}</td>
                      <td className="">
                        {edital.ativo && (
                          <NavLink
                            className="float-left"
                            to={`/configuracoes/cadastros/editais-contratos?uuid=${
                              edital.uuid
                            }`}
                          >
                            <i className="fas fa-pen" />
                          </NavLink>
                        )}
                      </td>
                      <td>
                        <ToggleExpandir
                          onClick={() => this.lidarComBurger(edital)}
                          ativo={edital.ativo}
                        />
                      </td>
                    </tr>
                    <tr className="detalhes">
                      {edital.ativo && (
                        <Fragment>
                          <td colSpan="5">
                            <div className="detalhe-edital-contrato">
                              <div>
                                Processo administrativo do contrato:{" "}
                                <span>{edital.processo_administrativo}</span>
                              </div>
                              <div>
                                Objeto resumido: <span>{edital.resumo}</span>
                              </div>
                              <div className="divisao" />
                              <div className="pt-3">
                                <div className="header">
                                  Contratos relacionados
                                </div>
                                {edital.contratos.map(
                                  (contrato, key_contrato) => {
                                    return (
                                      <Fragment key={key_contrato}>
                                        <div className="contrato-detalhe">
                                          <div>
                                            Contrato n°: <br />
                                            <span>{contrato.numero}</span>
                                          </div>
                                          <div>
                                            vigência: <br />
                                            {contrato.vigencias.map(
                                              (vigencia, key_vigencia) => {
                                                return (
                                                  <div key={key_vigencia}>
                                                    <span>
                                                      {vigencia.data_inicial}{" "}
                                                      até {vigencia.data_final}
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                        <div className="contrato-detalhe">
                                          <div>
                                            Processo administrativo do contrato:{" "}
                                            <br />
                                            <span>{contrato.processo}</span>
                                          </div>
                                          <div>
                                            Data da proposta: <br />
                                            <span>
                                              {contrato.data_proposta}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="contrato-detalhe">
                                          <div>
                                            Lote: <br />
                                            {contrato.lotes.map(
                                              (lote, key_lote) => {
                                                return (
                                                  <Fragment key={key_lote}>
                                                    <span className="nome-unidade">
                                                      {lote.nome}
                                                    </span>
                                                    <br />
                                                  </Fragment>
                                                );
                                              }
                                            )}
                                          </div>
                                          <div>
                                            DRE: <br />
                                            {contrato.diretorias_regionais.map(
                                              (dre, key_dre) => {
                                                return (
                                                  <Fragment key={key_dre}>
                                                    <span className="nome-unidade">
                                                      {dre.nome}
                                                    </span>
                                                    <br />
                                                  </Fragment>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>

                                        <div className="contrato-detalhe">
                                          <div>
                                            Empresa: <br />
                                            <span className="nome-unidade">
                                              {
                                                contrato.terceirizada
                                                  .nome_fantasia
                                              }
                                            </span>
                                            <br />
                                          </div>
                                          <div />
                                        </div>
                                        <div className="divisao" />
                                      </Fragment>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </td>
                        </Fragment>
                      )}
                    </tr>
                  </Fragment>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

export default EditaisCadastrados;
