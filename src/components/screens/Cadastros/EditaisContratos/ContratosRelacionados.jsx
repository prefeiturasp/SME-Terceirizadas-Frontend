import React, { Component } from "react";
import { Field, FormSection } from "redux-form";
import {
  LabelAndInput,
  LabelAndDate
} from "../../../Shareable/labelAndInput/labelAndInput";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { required } from "../../../../helpers/fieldValidators";

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
      lotesNomesSelecionados: [],

      diretoriasSelecionadas: [],
      diretoriasNomesSelecionadas: [],

      empresasSelecionadas: [],
      empresasNomesSelecionados: [],

      contratos_datas: [
        {
          numero_contrato: null,
          data_inicio: null,
          data_fim: null
        }
      ],

      formVigenciaContratos: ["vigenciaContrato0"]
    };
  }

  handleField(field, value, key, indice) {
    let contratos_datas = this.state.contratos_datas;
    contratos_datas[key][field] = value;
    this.setState({
      ...this.state,
      contratos_datas: contratos_datas
    });

    this.props.adicionaVigenciaContrato(indice, this.state.contratos_datas);

  
  }

  adicionaContratoData() {
    
    this.setState({
      contratos_datas: this.state.contratos_datas.concat([
        {
          numero_contrato: null,
          data_inicio: null,
          data_fim: null
        }
      ])
    });

    
  }

  nomeFormAtual() {
    const indiceDoFormAtual = `vigenciaContrato${
      this.state.formVigenciaContratos.length
    }`;
    let forms = this.state.formVigenciaContratos;
    forms.push(indiceDoFormAtual);
    this.setState({ forms });
  }

  atualizarDiretoriasSelecionadas(values) {
    let diretoriasNomesSelecionadas = [];
    const diretoriasRegionais = this.props.diretoriasRegionais;
    values.forEach(value => {
      const indice = diretoriasRegionais.findIndex(
        diretoriaRegional => diretoriaRegional.value == value
      );
      diretoriasNomesSelecionadas.push(diretoriasRegionais[indice].label);
    });
    this.setState({
      diretoriasSelecionadas: values,
      diretoriasNomesSelecionadas
    });
  }

  atualizarLotesSelecionados(values) {
    let lotesNomesSelecionados = [];
    const lotes = this.props.lotes;
    values.forEach(value => {
      const indice = lotes.findIndex(lote => lote.value === value);
      lotesNomesSelecionados.push(lotes[indice].label);
    });
    this.setState({ lotesSelecionados: values, lotesNomesSelecionados });
  }

  atualizarEmpresasSelecionadas(values) {
    let empresasNomesSelecionados = [];
    const empresas = this.props.empresas;
    values.forEach(value => {
      const indice = empresas.findIndex(empresa => empresa.value === value);
      empresasNomesSelecionados.push(empresas[indice].label);
    });
    this.setState({ empresasSelecionadas: values, empresasNomesSelecionados });
  }

  componentDidMount() {
    this.setState({ nomeDoFormAtual: this.props.nomeForm });
  }

  render() {
    const {
      lotesSelecionados,
      lotesNomesSelecionados,
      diretoriasNomesSelecionadas,
      empresasNomesSelecionados,
      diretoriasSelecionadas,
      empresasSelecionadas,
      formVigenciaContratos
    } = this.state;
    const {
      lotes,
      diretoriasRegionais,
      empresas,
      obtemDadosParaSubmit,
      indice,
      adicionaContrato
    } = this.props;
    return (
      <div>
        <div>
          <article className="card-body contratos-relacionados">
            <section className="section-inputs">
              <div className="section-contrato-vigencia">
                <section>
                  {formVigenciaContratos.map((formContrato, key) => {
                    {console.log(this.state.contratos_datas)}
                    return (
                      <FormSection name={`secaoContrato${key}`}>
                        <div className="colunas">
                          <div className="coluna">
                            <label className="label">
                              <span>* </span>N° do contrato
                            </label>
                            <Field
                              name={`numero_contrato${key}`}
                              component={LabelAndInput}
                              validate={required}
                              onChange={value =>
                                this.handleField(
                                  `numero_contrato`,
                                  value.target.value,
                                  key,
                                  indice
                                )
                              }
                            />
                          </div>
                          <div className="coluna">
                            <label className="label">
                              <span>* </span>Vigencia
                            </label>
                            <Field
                              name={`data_inicio${key}`}
                              component={LabelAndDate}
                              validate={required}
                              onChange={value =>
                                this.handleField(
                                  `data_inicio`,
                                  value,
                                  key,
                                  indice
                                )
                              }
                            />
                          </div>
                          <div className="coluna">
                            <Field
                              name={`data_fim${key}`}
                              component={LabelAndDate}
                              label=" "
                              validate={required}
                              onChange={value =>
                                this.handleField(`data_fim`, value, key, indice)
                              }
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
                      adicionaContrato(indice);
                      this.adicionaContratoData();
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
                      <label className="label">
                        <span>* </span>Processo administrativo do contrato
                      </label>
                      <Field
                        name={`processo_administrativo`}
                        component={LabelAndInput}
                        validate={required}
                        onChange={value => {
                          obtemDadosParaSubmit(
                            `processo_administrativo`,
                            value.target.value,
                            indice
                          );
                        }}
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span>* </span>Data do proposta
                      </label>
                      <Field
                        name={`data_proposta`}
                        component={LabelAndDate}
                        validate={required}
                        onChange={value => {
                          obtemDadosParaSubmit(`data_proposta`, value, indice);
                        }}
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
                            obtemDadosParaSubmit(
                              `lotes`,
                              lotesSelecionados,
                              indice
                            );
                          }}
                          overrideStrings={{
                            search: "Busca",
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                          validate={required}
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
                          name={".dres"}
                          selected={diretoriasSelecionadas}
                          options={diretoriasRegionais}
                          valueRenderer={renderizarLabelDiretoria}
                          onSelectedChanged={values => {
                            this.atualizarDiretoriasSelecionadas(values);
                            obtemDadosParaSubmit(
                              `dres`,
                              diretoriasSelecionadas,
                              indice
                            );
                          }}
                          overrideStrings={{
                            search: "Busca",
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                          validate={required}
                        />
                      </div>
                    ) : (
                      <div>Carregando diretorias regionais..</div>
                    )}

                    <div>
                      {lotesNomesSelecionados.length > 0 && (
                        <div className="row pt-3">
                          <div className="col-12">
                            <label className="label-selected-unities">
                              Lotes selecionados
                            </label>
                            {lotesNomesSelecionados.map((lote, indice) => {
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
                          <div>
                            <label className="label-selected-unities">
                              DRE's selecionadas
                            </label>
                            {diretoriasNomesSelecionadas.map((dre, indice) => {
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
                        name={".empresas"}
                        selected={empresasSelecionadas}
                        options={empresas}
                        valueRenderer={renderizarLabelEmpresa}
                        onSelectedChanged={values => {
                          this.atualizarEmpresasSelecionadas(values);
                          obtemDadosParaSubmit(
                            `empresas`,
                            empresasSelecionadas,
                            indice
                          );
                        }}
                        overrideStrings={{
                          search: "Busca",
                          selectSomeItems: "Selecione",
                          allItemsAreSelected:
                            "Todos os itens estão selecionados",
                          selectAll: "Todos"
                        }}
                        validate={required}
                      />
                    </div>
                  ) : (
                    <div>Carregando empresas..</div>
                  )}
                </div>
                <div className="col-12">
                  {empresasNomesSelecionados.length > 0 && (
                    <div className="row pt-3">
                      <div className="">
                        <label className="label-selected-unities">
                          Empresas selecionadas
                        </label>
                        {empresasNomesSelecionados.map((empresa, indice) => {
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
