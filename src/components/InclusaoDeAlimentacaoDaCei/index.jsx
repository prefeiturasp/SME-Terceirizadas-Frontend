import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
  meusRascunhosDeInclusaoDeAlimentacao,
  minhasFaixasEtarias,
  getQuantidadeAlunosFaixaEtaria,
  getQuantidadeAlunosPeriodoEscolar
} from "../../services/inclusaoAlimentacaoDaCei.service";
import Rascunho from "./Rascunhos";
import { InputComData } from "../Shareable/DatePicker";
import { Select } from "../Shareable/Select";
import { faixaToString } from "../../helpers/faixasEtarias";
import { required, maxValue } from "../../helpers/fieldValidators";
import "./style.scss";
import { agregarDefault } from "../../helpers/utilities";
import { getVinculosTipoAlimentacaoPorUnidadeEscolar } from "../../services/cadastroTipoAlimentacao.service";
import {
  montatiposAlimentacaoPorPeriodo,
  montaNomeCombosAlimentacao,
  retornaUuidEscolaPeriodoEscolar
} from "./helper";
import InputText from "../Shareable/Input/InputText";
import moment from "moment";

const ENTER = 13;

class InclusaoDeAlimentacaoDaCei extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      meusRascunhos: null,
      tiposAlimentacoesPorPeriodo: null,
      tiposAlimentacao: [],
      diaInclusao: null,
      faixasEtarias: null,
      totalFaixasEtarias: 0,
      totalQuantidade: 0,
      periodoEscolarDaEscola: null
    };
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  setadiaInclusao = value => {
    this.setState({ diaInclusao: value });
  };

  buscarFaixasEtariasEQuantidadesNoPeriodo = async periodoUuid => {
    let { diaInclusao, faixasEtarias, totalFaixasEtarias } = this.state;
    this.setState({ periodoEscolarDaEscola: periodoUuid });
    const dataInclusao = moment(diaInclusao, "DD/MM/YYYY").format("YYYY-MM-DD");
    const qtdAlunosFaixa = await getQuantidadeAlunosFaixaEtaria(
      periodoUuid,
      dataInclusao
    );
    const results = qtdAlunosFaixa.data.results;

    results.forEach(faixa => {
      totalFaixasEtarias += parseInt(faixa.count);
    });

    faixasEtarias.forEach(faixa => {
      results.forEach(result => {
        if (faixa.uuid === result.faixa_etaria.uuid) {
          faixa.total_matriculados = result.count;
        }
      });
    });
    this.setState({ faixasEtarias, totalFaixasEtarias });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    let {
      meusRascunhos,
      tiposAlimentacoesPorPeriodo,
      loading,
      faixasEtarias,
      diaInclusao,
      periodoEscolarDaEscola
    } = this.state;
    const { meusDados, periodos } = this.props;

    if (
      prevState.diaInclusao !== diaInclusao &&
      periodoEscolarDaEscola !== null
    ) {
      this.buscarFaixasEtariasEQuantidadesNoPeriodo(
        periodoEscolarDaEscola,
        diaInclusao
      );
    }

    const tpUnidadeEscolar =
      meusDados && meusDados.vinculo_atual.instituicao.tipo_unidade_escolar;

    if (
      meusRascunhos === null &&
      loading &&
      tiposAlimentacoesPorPeriodo === null &&
      faixasEtarias === null &&
      tpUnidadeEscolar
    ) {
      const response = await meusRascunhosDeInclusaoDeAlimentacao();
      this.setState({
        meusRascunhos: response.data.results
      });
      const resp = await minhasFaixasEtarias();
      let faixasEtarias = [];
      resp.data.results.forEach(faixa => {
        faixa["total_matriculados"] = 0;
        faixa["quantidade"] = null;

        faixasEtarias.push(faixa);
      });
      this.setState({
        faixasEtarias
      });
      getVinculosTipoAlimentacaoPorUnidadeEscolar(tpUnidadeEscolar).then(
        response => {
          let tiposAlimentacao = montatiposAlimentacaoPorPeriodo(
            response.results,
            periodos
          );
          tiposAlimentacoesPorPeriodo = montaNomeCombosAlimentacao(
            tiposAlimentacao
          );
          this.setState({ tiposAlimentacoesPorPeriodo });
        }
      );
    }

    if (
      meusRascunhos !== null &&
      loading &&
      tiposAlimentacoesPorPeriodo !== null &&
      faixasEtarias !== null &&
      tpUnidadeEscolar
    ) {
      const escolaUuid = meusDados && meusDados.vinculo_atual.instituicao.uuid;
      const periodosEscolares = await getQuantidadeAlunosPeriodoEscolar(
        escolaUuid
      );
      periodos.forEach(periodo => {
        periodo["escola_periodo"] = retornaUuidEscolaPeriodoEscolar(
          periodo,
          periodosEscolares.data.results
        );
      });
      this.setState({ loading: false });
    }
  };

  loadTiposAlimentacao = periodoUuid => {
    this.props.change("tipos_alimentacao", null);
    const { periodos } = this.props;
    periodos.forEach(periodo => {
      if (periodo.uuid === periodoUuid) {
        this.setState({ tiposAlimentacao: periodo.tipos_alimentacao });
      }
    });
  };

  totalQuantidadeInput = (valor, indice) => {
    let { totalQuantidade, faixasEtarias } = this.state;
    totalQuantidade = 0;
    faixasEtarias[indice].quantidade = !parseInt(valor) ? 0 : parseInt(valor);
    faixasEtarias.forEach(faixa => {
      totalQuantidade += faixa.quantidade;
    });
    this.setState({
      totalQuantidade,
      faixasEtarias
    });
  };

  render() {
    const {
      loading,
      meusRascunhos,
      tiposAlimentacao,
      diaInclusao,
      faixasEtarias,
      totalFaixasEtarias,
      totalQuantidade
    } = this.state;
    const { periodos, motivos } = this.props;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit} onKeyPress={this.onKeyPress}>
            {meusRascunhos && meusRascunhos.length > 0 && (
              <div className="mt-3">
                <span>Rascunhos</span>
                <Rascunho meusRascunhos={meusRascunhos} />
              </div>
            )}
            <div className="card mt-2">
              <div className="card-body formulario-inclusao-alimentacao-cei">
                <div className="titulo-solicitacao">
                  Descrição da Inclusão de Alimentacção
                </div>
                <div className="motivo-data mt-3">
                  <Field
                    component={Select}
                    label="Motivo"
                    name="motivo"
                    required
                    validate={required}
                    options={agregarDefault(motivos)}
                  />
                  <Field
                    className="input-data"
                    component={InputComData}
                    label="Dia"
                    name="data"
                    required
                    validate={required}
                    onChange={value => {
                      this.setadiaInclusao(value);
                    }}
                  />
                </div>
                <div className="periodo-e-tipo-de-alimentacoes mt-3">
                  <div>Periodos</div>
                  <div>Tipos de Alimentação</div>

                  <div className="periodos-da-cei">
                    {periodos.map((periodo, indice) => {
                      return (
                        <div key={indice} className="input-radio-periodo">
                          <label className="container-radio-input">
                            <Field
                              component={"input"}
                              type="radio"
                              name="check"
                              value={periodo.uuid}
                              onChange={() => {
                                this.loadTiposAlimentacao(periodo.uuid);
                                this.buscarFaixasEtariasEQuantidadesNoPeriodo(
                                  periodo.escola_periodo,
                                  diaInclusao
                                );
                              }}
                              disabled={diaInclusao === null ? true : false}
                            />
                            <span className="checkmark" />
                            <nav>{periodo.nome}</nav>
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <Field
                      component={Select}
                      name="tipos_alimentacao"
                      options={agregarDefault(tiposAlimentacao)}
                    />
                  </div>
                </div>

                <section className="tabela-faixa-etaria-qtd-alunos">
                  <article>
                    <div className="faixa-etaria">Faixa Etária</div>
                    <div className="alunos-matriculados">
                      Alunos Matriculados
                    </div>
                    <div className="quantidade">Quantidade</div>
                  </article>

                  {faixasEtarias.map((faixa, indice) => {
                    return (
                      <article key={indice}>
                        <div className="faixa-etaria">
                          {faixaToString(faixa)}
                        </div>
                        <div className="alunos-matriculados">
                          {faixa.total_matriculados}
                        </div>
                        <Field
                          component={InputText}
                          type="number"
                          name={faixa.uuid}
                          min="0"
                          validate={[maxValue(faixa.total_matriculados)]}
                          className="quantidade input-qtd-alunos"
                          onChange={value => {
                            this.totalQuantidadeInput(
                              value.target.value,
                              indice
                            );
                          }}
                        />
                      </article>
                    );
                  })}

                  <article>
                    <div className="faixa-etaria">Total {">>"} </div>
                    <div className="alunos-matriculados">
                      {totalFaixasEtarias}
                    </div>
                    <div className="quantidade">{totalQuantidade}</div>
                  </article>
                </section>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "inclusaoAlimentacaoDaCei"
})(InclusaoDeAlimentacaoDaCei);
