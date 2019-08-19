import React, { Component } from "react";
import { Field, FormSection } from "redux-form";
import {
  LabelAndInput,
  LabelAndDate
} from "../../../Shareable/labelAndInput/labelAndInput";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { required } from "../../../../helpers/fieldValidators";
import moment from "moment";
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

      vigencias: [
        {
          data_inicial: null,
          data_final: null
        }
      ],
      status: false,
      update: false,
      formVigenciaContratos: ["vigenciaContrato0"]
    };
  }

  obtemDataInicial(keyVigencia, indiceForm) {
    if (keyVigencia === 0) {
      return moment(
        this.props.contratos_relacionados[indiceForm]["data_proposta"],
        "DD/MM/YYYY"
      )["_d"];
    } else {
      return moment(
        this.state.vigencias[keyVigencia - 1]["data_final"],
        "DD/MM/YYYY"
      )["_d"];
    }
  }

  handleField(field, value, key, indice) {
    let vigencias = this.state.vigencias;
    vigencias[key][field] = value;
    this.setState({ vigencias });

    this.props.adicionaVigenciaContrato(indice, this.state.vigencias);
  }

  adicionaContratoData() {
    this.setState({
      vigencias: this.state.vigencias.concat([
        {
          data_inicial: null,
          data_final: null
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
        diretoriaRegional => diretoriaRegional.value === value
      );
      diretoriasNomesSelecionadas.push(diretoriasRegionais[indice].label);
    });
    this.setState({
      diretoriasSelecionadas: values,
      diretoriasNomesSelecionadas
    });
    this.props.adicionarNomesListagem(
      "dres_nomes",
      diretoriasNomesSelecionadas,
      this.props.indice
    );
  }

  atualizarLotesSelecionados(values) {
    let lotesNomesSelecionados = [];
    const lotes = this.props.lotes;
    values.forEach(value => {
      const indice = lotes.findIndex(lote => lote.value === value);
      lotesNomesSelecionados.push(lotes[indice].label);
    });
    this.setState({ lotesSelecionados: values, lotesNomesSelecionados });
    this.props.adicionarNomesListagem(
      "lotes_nomes",
      lotesNomesSelecionados,
      this.props.indice
    );
  }

  atualizarEmpresasSelecionadas(values) {
    let empresasNomesSelecionados = [];
    const empresas = this.props.empresas;
    values.forEach(value => {
      const indice = empresas.findIndex(empresa => empresa.value === value);
      empresasNomesSelecionados.push(empresas[indice].label);
    });
    this.setState({ empresasSelecionadas: values, empresasNomesSelecionados });
    this.props.adicionarNomesListagem(
      "empresas_nomes",
      empresasNomesSelecionados,
      this.props.indice
    );
  }

  componentDidMount() {
    this.setState({ nomeDoFormAtual: this.props.nomeForm });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.reseta === true &&
      this.state.formVigenciaContratos.length > 1
    ) {
      this.state.formVigenciaContratos.splice(1, Number.MAX_VALUE);
      let vigencias = [
        {
          data_inicial: null,
          data_final: null
        }
      ];
      this.setState({ vigencias });
      if (this.props.reseta === true) {
        this.props.setaResetFormChild();
      }
    }
    if (
      this.state.lotesSelecionados.length > 0 ||
      this.state.diretoriasSelecionadas.length > 0 ||
      this.state.empresasSelecionadas.length > 0
    ) {
      if (this.props.reseta === true) {
        this.setState({
          lotesSelecionados: [],
          lotesNomesSelecionados: [],
          diretoriasSelecionadas: [],
          diretoriasNomesSelecionadas: [],
          empresasSelecionadas: [],
          empresasNomesSelecionados: []
        });

        this.props.setaResetFormChild();
      }
    }
  }

  renderExcluirNoUltimo(indiceDoForm) {
    let indice = indiceDoForm + 1;
    if (indice !== 1 && indice + 1 > this.props.contratos_relacionados.length) {
      return true
    }else {
      return false
    }
  }

  render() {
    const {
      lotesSelecionados,
      lotesNomesSelecionados,
      diretoriasNomesSelecionadas,
      empresasNomesSelecionados,
      diretoriasSelecionadas,
      empresasSelecionadas,
      formVigenciaContratos,
      vigencias
    } = this.state;
    const {
      lotes,
      diretoriasRegionais,
      empresas,
      obtemDadosParaSubmit,
      indice,
      adicionaNumeroContrato,
      excluirContratoRelacionado
    } = this.props;
    return (
      <div>
        <div>
          <article className="card-body contratos-relacionados">
            <section className="section-inputs">
              {this.renderExcluirNoUltimo(indice) && (
                <div className="excluir-form">
                  <button
                    className="excluir"
                    onClick={() => {
                      excluirContratoRelacionado(indice);
                    }}
                  >
                    excluir <i class="fas fa-trash-alt" />
                  </button>
                </div>
              )}
              <div className="data-processo-adm">
                <div className="inputs-processo">
                  <div>
                    <label className="label">
                      <span>* </span>Processo administrativo do contrato
                    </label>
                    <Field
                      name={`processo_administrativo${indice}`}
                      component={LabelAndInput}
                      validate={required}
                      onChange={value => {
                        obtemDadosParaSubmit(
                          `processo_administrativo`,
                          value.target.value,
                          indice
                        );
                      }}
                      max={50}
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span>* </span>Data da proposta
                    </label>
                    <Field
                      name={`data_proposta${indice}`}
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
              <div className="section-contrato-vigencia">
                <div className="coluna contrato">
                  <label className="label">
                    <span>* </span>N° do contrato
                  </label>
                  <Field
                    name={`numero_contrato${indice}`}
                    component={LabelAndInput}
                    validate={required}
                    onChange={event =>
                      adicionaNumeroContrato(indice, event.target.value)
                    }
                    max={50}
                  />
                </div>
                <section>
                  {formVigenciaContratos.map((formContrato, key) => {
                    return (
                      <FormSection name={`secaoContrato${key}`}>
                        <div className="colunas">
                          <div className="coluna">
                            <label className="label">
                              <span>* </span>Vigencia
                            </label>
                            <Field
                              name={`data_inicio${key}`}
                              component={LabelAndDate}
                              validate={required}
                              minDate={this.obtemDataInicial(key, indice)}
                              onChange={value =>
                                this.handleField(
                                  `data_inicial`,
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
                              minDate={
                                moment(
                                  vigencias[key]["data_inicial"],
                                  "DD/MM/YYYY"
                                )["_d"]
                              }
                              validate={required}
                              onChange={value =>
                                this.handleField(
                                  `data_final`,
                                  value,
                                  key,
                                  indice
                                )
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
                      this.adicionaContratoData();
                    }}
                  >
                    +
                  </button>
                </aside>
              </div>
              <div className="container-processo-adm">
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
                            obtemDadosParaSubmit(`lotes`, values, indice);
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
                            obtemDadosParaSubmit(`dres`, values, indice);
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
                          obtemDadosParaSubmit(`empresas`, values, indice);
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
