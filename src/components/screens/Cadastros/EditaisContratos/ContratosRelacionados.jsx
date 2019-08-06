import React, { Component } from "react";
import { Field } from "redux-form";
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
      empresasSelecionadas: []
    };
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
      empresasSelecionadas
    } = this.state;
    const { lotes, diretoriasRegionais, empresas } = this.props;
    return (
      <div>
        <div>
          <article className="card-body contratos-relacionados">
            <section className="section-inputs">
              <div className="section-contrato-vigencia" />
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
