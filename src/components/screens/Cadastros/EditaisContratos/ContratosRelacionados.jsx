import React, { Component } from "react";
import { Field, FormSection } from "redux-form";
import {
  LabelAndInput,
  LabelAndDate
} from "../../../Shareable/labelAndInput/labelAndInput";
import StatefulMultiSelect from "@khanacademy/react-multi-select";

import {
  renderizarLabelLote,
  renderizarLabelDiretoria,
  renderizarLabelEmpresa
} from "./helper";

class ContratosRelacionados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotesSelecionados: [],
      diretoriasSelecionadas: [],
      empresasSelecionadas: [],

      formVigenciaContratos: ["vigenciaContrato0"]
    };
  }

  nomeFormAtual() {
    const indiceDoFormAtual = `vigenciaContrato${this.state
      .formVigenciaContratos.length - 1}`;
    let forms = this.state.formVigenciaContratos;
    forms.push(indiceDoFormAtual);
    this.setState({ forms });
  }

  atualizarDiretoriasSelecionadas(diretoriasSelecionadas) {
    this.setState({ diretoriasSelecionadas });
  }

  atualizarLotesSelecionados(lotesSelecionados) {
    this.setState({ lotesSelecionados });
  }

  atualizarEmpresasSelecionadas(empresasSelecionadas) {
    this.setState({ empresasSelecionadas });
  }

  componentDidMount() {
    this.setState({ nomeDoFormAtual: this.props.nomeForm });
  }

  render() {
    const {
      lotesSelecionados,
      diretoriasSelecionadas,
      empresasSelecionadas,
      formVigenciaContratos
    } = this.state;
    const { lotes, diretoriasRegionais, empresas } = this.props;
    return (
      <div>
        <div>
          <article className="card-body contratos-relacionados">
            <section className="section-inputs">
              <div className="section-contrato-vigencia">
                <section>
                  {formVigenciaContratos.map((formContrato, indice) => {
                    return (
                      <FormSection name={`secaoContrato${indice}`}>
                        <div className="colunas">
                          <div className="coluna">
                            <label className="label">
                              <span>* </span>N° do contrato
                            </label>
                            <Field
                              name={`numero_contrato${formContrato}`}
                              component={LabelAndInput}
                            />
                          </div>
                          <div className="coluna">
                            <label className="label">
                              <span>* </span>Vigencia
                            </label>
                            <Field
                              name={`data_vigencia_inicio${formContrato}`}
                              component={LabelAndDate}
                            />
                          </div>
                          <div className="coluna">
                            <Field
                              name={`data_vigencia_fim${formContrato}`}
                              component={LabelAndDate}
                              label=" "
                            />
                          </div>
                        </div>
                      </FormSection>
                    );
                  })}
                </section>
                <aside>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      this.nomeFormAtual();
                    }}
                  >
                    +
                  </button>
                </aside>
              </div>
              <div className="container-processo-adm">
                <div className="data-processo-adm">
                  <div className="inputs-processo">
                    <div>
                      <Field
                        name={`processo_administrativo`}
                        label="* Processo administrativo do contrato"
                        component={LabelAndInput}
                      />
                    </div>
                    <div>
                      <Field
                        name={`data_proposta`}
                        label="* Data do proposta"
                        component={LabelAndDate}
                      />
                    </div>
                  </div>
                  <div />
                </div>

                <div className="container-lote-dre">
                  <div className="inputs-select-lote-dre">
                    {lotes.length ? (
                      <div>
                        <label className="label">
                          <span>* </span>Lote
                        </label>
                        <Field
                          component={StatefulMultiSelect}
                          name={".lotes"}
                          selected={lotesSelecionados}
                          options={lotes}
                          valueRenderer={renderizarLabelLote}
                          onSelectedChanged={values => {
                            this.atualizarLotesSelecionados(values);
                          }}
                          overrideStrings={{
                            search: "Busca",
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                        />
                      </div>
                    ) : (
                      <div>Carregando lotes..</div>
                    )}

                    {diretoriasRegionais.length ? (
                      <div>
                        <label className="label">
                          <span>* </span>DRE
                        </label>
                        <Field
                          component={StatefulMultiSelect}
                          name={".lotes"}
                          selected={diretoriasSelecionadas}
                          options={diretoriasRegionais}
                          valueRenderer={renderizarLabelDiretoria}
                          onSelectedChanged={values => {
                            this.atualizarDiretoriasSelecionadas(values);
                          }}
                          overrideStrings={{
                            search: "Busca",
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                        />
                      </div>
                    ) : (
                      <div>Carregando diretorias regionais..</div>
                    )}

                    <div>
                      {lotesSelecionados.length > 0 && (
                        <div className="row pt-3">
                          <div className="col-12">
                            <label className="label-selected-unities">
                              Lotes selecionados
                            </label>
                            {lotesSelecionados.map((lote, indice) => {
                              return (
                                <div
                                  className="value-selected-unities"
                                  key={indice}
                                >
                                  {lote}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {diretoriasSelecionadas.length > 0 && (
                        <div className="pt-3">
                          <div >
                            <label className="label-selected-unities">
                              DRE's selecionadas
                            </label>
                            {diretoriasSelecionadas.map((dre, indice) => {
                              return (
                                <div
                                  className="value-selected-unities"
                                  key={indice}
                                >
                                  {dre}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {empresas.length ? (
                    <div>
                      <label className="label">
                        <span>* </span>Empresa
                      </label>
                      <Field
                        component={StatefulMultiSelect}
                        name={".lotes"}
                        selected={empresasSelecionadas}
                        options={empresas}
                        valueRenderer={renderizarLabelEmpresa}
                        onSelectedChanged={values => {
                          this.atualizarEmpresasSelecionadas(values);
                        }}
                        overrideStrings={{
                          search: "Busca",
                          selectSomeItems: "Selecione",
                          allItemsAreSelected:
                            "Todos os itens estão selecionados",
                          selectAll: "Todos"
                        }}
                      />
                    </div>
                  ) : (
                    <div>Carregando empresas..</div>
                  )}
                </div>
                <div className="col-12">
                  {empresasSelecionadas.length > 0 && (
                    <div className="row pt-3">
                      <div className="">
                        <label className="label-selected-unities">
                          Empresas selecionadas
                        </label>
                        {empresasSelecionadas.map((empresa, indice) => {
                          return (
                            <div
                              className="value-selected-unities"
                              key={indice}
                            >
                              {empresa}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </article>
          <hr />
        </div>
      </div>
    );
  }
}

export default ContratosRelacionados;
