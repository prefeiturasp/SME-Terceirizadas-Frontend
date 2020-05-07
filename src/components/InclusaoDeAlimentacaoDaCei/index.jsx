import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, reduxForm } from "redux-form";
import {
  meusRascunhosDeInclusaoDeAlimentacao,
  minhasFaixasEtarias,
  getQuantidadeAlunosFaixaEtaria,
  getQuantidadeAlunosPeriodoEscolar,
  criarInclusoesDaCEI,
  atualizarInclusoesDaCEI,
  iniciarInclusoesDaCEI
} from "services/inclusaoDeAlimentacao/cei.legacy.service";
import Rascunho from "./Rascunhos";
import { InputComData } from "../Shareable/DatePicker";
import { Select } from "../Shareable/Select";
import { faixaToString } from "../../helpers/faixasEtarias";
import { required, maxValue } from "../../helpers/fieldValidators";
import "./style.scss";
import {
  agregarDefault,
  formatarParaMultiselect,
  getError
} from "../../helpers/utilities";
import { getVinculosTipoAlimentacaoPorTipoUnidadeEscolar } from "../../services/cadastroTipoAlimentacao.service";
import {
  montatiposAlimentacaoPorPeriodo,
  montaNomeCombosAlimentacao,
  retornaUuidEscolaPeriodoEscolar,
  renderizarLabelTipoAlimentacao
} from "./helper";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import InputText from "../Shareable/Input/InputText";
import moment from "moment";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import Botao from "../Shareable/Botao";
import { STATUS_DRE_A_VALIDAR, STATUS_RASCUNHO } from "../../configs/constants";
import { toastSuccess, toastError } from "../Shareable/Toast/dialogs";
import { TIPO_SOLICITACAO } from "constants/shared";
import { escolaExcluirSolicitacaoDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";

const { SOLICITACAO_CEI } = TIPO_SOLICITACAO;

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
      salvarAtualizarLbl: "Salvar Rascunho",
      periodoEscolarDaEscola: null,
      periodoSelecionado: null,
      tiposAlimentacaoSelecionados: [],
      uuidRascunho: null,
      ehOutroMotivo: false
    };
    this.removerRascunho = this.removerRascunho.bind(this);
    this.carregarRascunho = this.carregarRascunho.bind(this);
  }

  carregarRascunho(param) {
    let {
      faixasEtarias,
      periodoEscolarDaEscola,
      diaInclusao,
      ehOutroMotivo,
      totalQuantidade
    } = this.state;
    totalQuantidade = 0;
    const periodosEscolares = this.props.meusDados.vinculo_atual.instituicao
      .periodos_escolares;
    const inclusaoDeAlimentacao = param.inclusaoAlimentacaoCei;
    periodosEscolares.forEach(periodo => {
      if (
        periodoEscolarDaEscola === null &&
        periodo.uuid === inclusaoDeAlimentacao.periodo_escolar.uuid
      ) {
        periodoEscolarDaEscola = periodo.escola_periodo;
      }
    });
    const tiposAlimentacaoSelecionados = inclusaoDeAlimentacao.tipos_alimentacao.map(
      tipo => {
        return tipo.uuid;
      }
    );
    const qtdFaixaEtaria =
      inclusaoDeAlimentacao.quantidade_alunos_por_faixas_etarias;
    this.props.reset("inclusaoAlimentacaoDaCei");
    qtdFaixaEtaria.forEach(qtdFaixa => {
      this.props.change(qtdFaixa.faixa_etaria.uuid, qtdFaixa.quantidade_alunos);
      faixasEtarias.forEach(faixa => {
        if (qtdFaixa.faixa_etaria.uuid === faixa.uuid) {
          faixa.quantidade = qtdFaixa.quantidade_alunos;
          totalQuantidade += qtdFaixa.quantidade_alunos;
        }
      });
    });
    if (inclusaoDeAlimentacao.motivo.nome === "Outro") {
      ehOutroMotivo = true;
      this.props.change("outro_motivo", inclusaoDeAlimentacao.descricao);
    }
    diaInclusao = inclusaoDeAlimentacao.data;
    this.setState({
      faixasEtarias,
      diaInclusao,
      ehOutroMotivo,
      totalQuantidade
    });
    this.props.change("motivo", inclusaoDeAlimentacao.motivo.uuid);
    this.props.change("data", inclusaoDeAlimentacao.data);
    this.props.change(
      "periodo_escolar",
      inclusaoDeAlimentacao.periodo_escolar.uuid
    );

    this.buscarFaixasEtariasEQuantidadesNoPeriodo(periodoEscolarDaEscola);
    this.loadTiposAlimentacao(inclusaoDeAlimentacao.periodo_escolar);
    this.props.change(`tipos_alimentacao`, tiposAlimentacaoSelecionados);
    this.setState({
      salvarAtualizarLbl: "Atualizar",
      tiposAlimentacaoSelecionados,
      uuidRascunho: inclusaoDeAlimentacao.uuid
    });
  }

  onSubmit = async values => {
    const { meusDados } = this.props;
    const {
      faixasEtarias,
      salvarAtualizarLbl,
      uuidRascunho,
      tiposAlimentacaoSelecionados,
      periodoSelecionado
    } = this.state;

    const escolaUuid = meusDados && meusDados.vinculo_atual.instituicao.uuid;
    let listaFaixas = [];

    faixasEtarias.forEach(faixa => {
      if (faixa.quantidade > 0) {
        listaFaixas.push({
          faixa_etaria: faixa.uuid,
          quantidade_alunos: faixa.quantidade
        });
      }
    });
    const payload = {
      escola: escolaUuid,
      periodo_escolar: values.periodo_escolar,
      tipos_alimentacao: values.tipos_alimentacao,
      motivo: values.motivo,
      outro_motivo: values.outro_motivo,
      quantidade_alunos_por_faixas_etarias: listaFaixas,
      descricao: values.outro_motivo === undefined ? "" : values.outro_motivo,
      data: values.data,
      status: values.status
    };
    let errors = false;
    if (
      periodoSelecionado === "PARCIAL" &&
      tiposAlimentacaoSelecionados.length < 3
    ) {
      errors = true;
      toastError(
        "Necessário selecionar 3 tipos de alimentações no período parcial"
      );
    }
    let resposta = null;
    if (payload.quantidade_alunos_por_faixas_etarias.length === 0) {
      toastError("Selecione ao menos uma faixa etaria");
      errors = true;
    }
    if (payload.periodo_escolar === undefined) {
      toastError("Selecione o periodo escolar");
      errors = true;
    } else if (
      payload.tipos_alimentacao === null ||
      payload.tipos_alimentacao.length === 0
    ) {
      toastError("Selecione ao menos um tipo de alimentação");
      errors = true;
    } else {
      if (
        salvarAtualizarLbl === "Salvar Rascunho" &&
        values.status === STATUS_RASCUNHO &&
        !errors
      ) {
        resposta = await criarInclusoesDaCEI(payload);
        if (resposta.status === HTTP_STATUS.CREATED) {
          toastSuccess("Rascunho Salvo com Sucesso!");
          this.refresh();
          this.resetForm();
        } else {
          toastError(`Erro ao Salvar Rascunho ${getError(resposta.data)}`);
        }
      } else if (
        salvarAtualizarLbl === "Atualizar" &&
        values.status === STATUS_RASCUNHO &&
        !errors
      ) {
        resposta = await atualizarInclusoesDaCEI(payload, uuidRascunho);
        if (resposta.status === HTTP_STATUS.OK) {
          toastSuccess("Rascunho Salvo com Sucesso!");
          this.refresh();
          this.resetForm();
        } else {
          toastError(`${resposta.data.detail}`);
        }
      } else {
        if (uuidRascunho === null && !errors) {
          payload.status = "RASCUNHO";
          resposta = await criarInclusoesDaCEI(payload);
          const respInicio = await iniciarInclusoesDaCEI(resposta.data.uuid);
          if (
            resposta.status === HTTP_STATUS.CREATED &&
            respInicio.status === HTTP_STATUS.OK
          ) {
            toastSuccess("Solicitação enviada com sucesso!");
            this.refresh();
            this.resetForm();
          } else {
            toastError(
              `Erro ao enviar solicitação ${toastError(
                getError(resposta.data)
              )}`
            );
          }
        } else {
          if (!errors) {
            const respInicio = await iniciarInclusoesDaCEI(uuidRascunho);
            if (respInicio.status === HTTP_STATUS.OK) {
              toastSuccess("Solicitação enviada com sucesso!");
              this.refresh();
              this.resetForm();
            } else {
              toastError(getError(respInicio.data));
            }
          }
        }
      }
    }
  };

  removerRascunho(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      escolaExcluirSolicitacaoDeInclusaoDeAlimentacao(
        uuid,
        SOLICITACAO_CEI
      ).then(
        res => {
          if (res.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.refresh();
          } else {
            toastError(getError(res.data));
          }
        },
        function() {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
    }
  }

  resetForm() {
    let { faixasEtarias } = this.state;
    faixasEtarias.forEach(faixa => {
      faixa.total_matriculados = 0;
    });
    this.props.reset("inclusaoAlimentacaoDaCei");
    this.setState({
      salvarAtualizarLbl: "Salvar Rascunho",
      tiposAlimentacaoSelecionados: [],
      diaInclusao: null,
      tiposAlimentacao: [],
      faixasEtarias,
      totalFaixasEtarias: 0,
      totalQuantidade: 0,
      periodoSelecionado: null,
      uuidRascunho: null,
      ehOutroMotivo: false
    });
  }

  refresh = async () => {
    let { meusRascunhos } = this.state;
    const response = await meusRascunhosDeInclusaoDeAlimentacao();
    meusRascunhos = response.data.results;
    this.setState({
      meusRascunhos
    });
  };

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

    if (results) {
      totalFaixasEtarias = 0;
      results.forEach(faixa => {
        totalFaixasEtarias += parseInt(faixa.count);
      });

      faixasEtarias.forEach(faixa => {
        results.forEach(result => {
          if (faixa.uuid === result.faixa_etaria.uuid) {
            faixa.total_matriculados = result.count;
            faixa.validade = maxValue(result.count);
          }
        });
      });
      this.setState({ faixasEtarias, totalFaixasEtarias });
    }
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
        faixa["validade"] = maxValue(0);
        faixasEtarias.push(faixa);
      });
      this.setState({
        faixasEtarias
      });
      getVinculosTipoAlimentacaoPorTipoUnidadeEscolar(tpUnidadeEscolar).then(
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

  loadTiposAlimentacao = ({ uuid, nome }) => {
    this.setState({
      periodoSelecionado: nome,
      tiposAlimentacaoSelecionados: []
    });
    this.props.change("tipos_alimentacao", null);
    const { periodos } = this.props;
    periodos.forEach(periodo => {
      if (periodo.uuid === uuid) {
        this.setState({ tiposAlimentacao: periodo.tipos_alimentacao });
      }
    });
  };

  addQuantidadeTiposAlimentacao = (opcoesSelecionadas, quantidade) => {
    if (opcoesSelecionadas.length <= quantidade) {
      this.setState({
        tiposAlimentacaoSelecionados: opcoesSelecionadas
      });
      this.props.change(`tipos_alimentacao`, opcoesSelecionadas);
    }
  };

  onSelectedChanged = opcoesSelecionadas => {
    const { periodoSelecionado } = this.state;
    if (periodoSelecionado === "PARCIAL") {
      this.addQuantidadeTiposAlimentacao(opcoesSelecionadas, 3);
    } else if (periodoSelecionado === "INTEGRAL") {
      this.addQuantidadeTiposAlimentacao(opcoesSelecionadas, 5);
    } else {
      this.setState({
        tiposAlimentacaoSelecionados: opcoesSelecionadas
      });
      this.props.change(`tipos_alimentacao`, opcoesSelecionadas);
    }
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

  verificaSeEhOutroMotivo = motivoUuid => {
    const { motivos } = this.props;
    motivos.forEach(motivo => {
      if (motivo.uuid === motivoUuid) {
        if (motivo.nome !== "Outro") {
          this.setState({ ehOutroMotivo: false });
        } else {
          this.setState({ ehOutroMotivo: true });
        }
      }
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
      totalQuantidade,
      tiposAlimentacaoSelecionados,
      ehOutroMotivo
    } = this.state;
    const { periodos, motivos, handleSubmit } = this.props;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit} onKeyPress={this.onKeyPress}>
            {meusRascunhos && meusRascunhos.length > 0 && (
              <div className="mt-3">
                <span>Rascunhos</span>
                <Rascunho
                  meusRascunhos={meusRascunhos}
                  removerRascunho={this.removerRascunho}
                  resetForm={() => this.resetForm()}
                  carregarRascunho={params => this.carregarRascunho(params)}
                />
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
                    onChange={event => {
                      this.verificaSeEhOutroMotivo(event.target.value);
                    }}
                  />
                  <Field
                    className="input-data"
                    component={InputComData}
                    label="Dia"
                    name="data"
                    required
                    validate={required}
                    maxDate={moment()
                      .endOf("year")
                      .toDate()}
                    onChange={value => {
                      this.setadiaInclusao(value);
                    }}
                  />
                </div>
                {ehOutroMotivo && (
                  <div className="grid-outro-motivo pb-2">
                    <Field
                      component={InputText}
                      label="Qual o motivo?"
                      name="outro_motivo"
                      required
                      validate={required}
                    />
                  </div>
                )}
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
                              name="periodo_escolar"
                              value={periodo.uuid}
                              onChange={() => {
                                this.loadTiposAlimentacao(periodo);
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
                      component={StatefulMultiSelect}
                      name="tipos_alimentacao"
                      selected={tiposAlimentacaoSelecionados}
                      options={formatarParaMultiselect(tiposAlimentacao)}
                      disableSearch={true}
                      overrideStrings={{
                        selectSomeItems: "Selecione",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                      valueRenderer={(selected, options) =>
                        renderizarLabelTipoAlimentacao(selected, options)
                      }
                      onSelectedChanged={values =>
                        this.onSelectedChanged(values)
                      }
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
                          validate={faixa.validade}
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
                <div className="mt-4">
                  <div className="botoes-submit-inclusoes-cei">
                    <Botao
                      texto="Cancelar"
                      onClick={() => this.resetForm()}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto={this.state.salvarAtualizarLbl}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_RASCUNHO
                        })
                      )}
                      className="ml-3"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Enviar"
                      type={BUTTON_TYPE.SUBMIT}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_DRE_A_VALIDAR
                        })
                      )}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </div>
                </div>
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
