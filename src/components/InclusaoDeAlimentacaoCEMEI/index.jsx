import CardMatriculados from "components/Shareable/CardMatriculados";
import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  createInclusaoAlimentacaoCEMEI,
  getInclusaoCEMEIRascunhos,
  iniciaFluxoInclusaoAlimentacaoCEMEI,
  deleteInclusaoDeAlimentacaoCEMEI,
  updateInclusaoAlimentacaoCEMEI,
  createInclusaoAlimentacao,
  updateInclusaoAlimentacao,
  iniciaFluxoInclusaoAlimentacao,
  obterMinhasSolicitacoesDeInclusaoDeAlimentacao,
  escolaExcluirSolicitacaoDeInclusaoDeAlimentacao
} from "services/inclusaoDeAlimentacao";
import { Rascunhos } from "./componentes/Rascunhos";
import Select from "components/Shareable/Select";
import { required } from "helpers/fieldValidators";
import {
  agregarDefault,
  checaSeDataEstaEntre2e5DiasUteis,
  deepCopy,
  getError
} from "helpers/utilities";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import ModalDataPrioritaria from "components/Shareable/ModalDataPrioritaria";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { STATUS_DRE_A_VALIDAR } from "configs/constants";
import { OnChange } from "react-final-form-listeners";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  AdicionarDia,
  DataInclusaoNormal,
  OutroMotivo
} from "components/InclusaoDeAlimentacao/Escola/Formulario/componentes/InclusaoNormal";
import { PeriodosCEIeouEMEI } from "./componentes/InclusaoNormal";
import { formataInclusaoCEMEI, validarSubmit } from "./helpers";
import {
  DatasInclusaoContinua,
  Recorrencia,
  RecorrenciaTabela
} from "components/InclusaoDeAlimentacao/Escola/Formulario/componentes/InclusaoContinua";
import { TIPO_SOLICITACAO } from "constants/shared";
import { validarSubmissaoContinua } from "components/InclusaoDeAlimentacao/validacao";
import { formatarSubmissaoSolicitacaoContinua } from "components/InclusaoDeAlimentacao/helper";

export const InclusaoDeAlimentacaoCEMEI = ({ ...props }) => {
  const [rascunhos, setRascunhos] = useState(null);
  const [erroRascunhos, setErroRascunhos] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    meusDados,
    motivosSimples,
    motivosContinuos,
    proximosDoisDiasUteis,
    proximosCincoDiasUteis,
    periodos,
    periodosInclusaoContinua,
    vinculos
  } = props;

  useEffect(() => {
    getRascunhos();
  }, []);

  const resetForm = async form => {
    await form.change("inclusoes", [{ motivo: undefined }]);
    await form.change("quantidades_periodo", undefined);
    await form.change("dias_semana", undefined);
    await form.change("tipos_alimentacao_selecionados", []);
    await form.change("periodo_escolar");
    await form.change("numero_alunos", undefined);
  };

  const motivoSimplesSelecionado = values => {
    return (
      values.inclusoes &&
      values.inclusoes[0].motivo &&
      motivosSimples.find(motivo => motivo.uuid === values.inclusoes[0].motivo)
    );
  };

  const motivoContinuoSelecionado = values => {
    return (
      values.inclusoes &&
      values.inclusoes[0].motivo &&
      motivosContinuos.find(
        motivo => motivo.uuid === values.inclusoes[0].motivo
      )
    );
  };

  const outroMotivoSelecionado = (values, index) => {
    return (
      values.inclusoes &&
      values.inclusoes[index] &&
      values.inclusoes[index].motivo &&
      motivosSimples.find(
        motivo => motivo.uuid === values.inclusoes[index].motivo
      ) &&
      motivosSimples
        .find(motivo => motivo.uuid === values.inclusoes[index].motivo)
        .nome.includes("Outro")
    );
  };

  const getRascunhos = async () => {
    const responseRascunhosNormais = await getInclusaoCEMEIRascunhos();
    const responseRascunhosContinuas = await obterMinhasSolicitacoesDeInclusaoDeAlimentacao(
      TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
    );
    if (
      responseRascunhosNormais.status === HTTP_STATUS.OK &&
      responseRascunhosContinuas.status === HTTP_STATUS.OK
    ) {
      setRascunhos(
        responseRascunhosNormais.data.results.concat(
          responseRascunhosContinuas.data.results
        )
      );
    } else {
      setErroRascunhos(true);
    }
  };

  const removerRascunho = async (id_externo, uuid, tipoSolicitacao, form) => {
    if (window.confirm("Deseja remover este rascunho?")) {
      let response = "";
      if (tipoSolicitacao) {
        response = await escolaExcluirSolicitacaoDeInclusaoDeAlimentacao(
          uuid,
          tipoSolicitacao
        );
      } else {
        response = await deleteInclusaoDeAlimentacaoCEMEI(uuid);
      }
      if (response.status === HTTP_STATUS.NO_CONTENT) {
        toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
        refresh(form);
      } else {
        toastError(
          `Houve um erro ao excluir o rascunho: ${getError(response.data)}`
        );
      }
    }
  };

  const carregarRascunhoContinuo = async (form, values, inclusao_) => {
    const quantidades_periodo_ = deepCopy(inclusao_.quantidades_periodo);
    quantidades_periodo_.forEach(qp => {
      qp.dias_semana = qp.dias_semana.map(String);
      qp.periodo_escolar = qp.periodo_escolar.uuid;
      qp.tipos_alimentacao = qp.tipos_alimentacao.map(t => t.uuid);
      delete qp.grupo_inclusao_normal;
      delete qp.inclusao_alimentacao_continua;
    });

    await form.change("inclusoes", [
      {
        motivo: inclusao_.motivo.uuid,
        data_inicial: inclusao_.data_inicial,
        data_final: inclusao_.data_final
      }
    ]);
    await form.change("quantidades_periodo", quantidades_periodo_);
  };

  const carregarRascunho = async (form, values, inclusao) => {
    await form.change("uuid", inclusao.uuid);
    await form.change("id_externo", inclusao.id_externo);
    const inclusao_ = deepCopy(inclusao);
    if (inclusao_.dias_motivos_da_inclusao_cemei) {
      carregarRascunhoNormal(form, inclusao_);
    } else {
      carregarRascunhoContinuo(form, values, inclusao_);
    }
  };

  const buildFaixas = (values, inclusao) => {
    inclusao.quantidade_alunos_cei_da_inclusao_cemei.forEach(qtd_alunos => {
      const periodo_nome = qtd_alunos.periodo_escolar.nome;
      const index = values.findIndex(qp => qp.nome === periodo_nome);
      values[index].checked = true;
      if (!values[index].faixas) {
        values[index].faixas = {};
      }
      values[index].faixas[qtd_alunos.faixa_etaria.__str__] =
        qtd_alunos.quantidade_alunos;
    });
  };

  const buildAlunosEMEI = (values, inclusao) => {
    inclusao.quantidade_alunos_emei_da_inclusao_cemei.forEach(qtd_alunos => {
      const periodo_nome = qtd_alunos.periodo_escolar.nome;
      const index = values.findIndex(qp => qp.nome === periodo_nome);
      values[index].checked = true;
      values[index].alunos_emei = qtd_alunos.quantidade_alunos;
    });
  };

  const carregarRascunhoNormal = async (form, inclusao_) => {
    const periodos_ = deepCopy(periodos);
    inclusao_.dias_motivos_da_inclusao_cemei.forEach(i => {
      i.motivo = i.motivo.uuid;
    });
    await form.change("inclusoes", inclusao_.dias_motivos_da_inclusao_cemei);
    buildFaixas(periodos_, inclusao_);
    buildAlunosEMEI(periodos_, inclusao_);
    await form.change(`quantidades_periodo`, periodos_);
  };

  const refresh = form => {
    getRascunhos();
    resetForm(form);
  };

  const iniciarPedido = async (uuid, form) => {
    const response = await iniciaFluxoInclusaoAlimentacaoCEMEI(uuid);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Inclusão de Alimentação enviada com sucesso!");
      refresh(form);
    } else {
      toastError(getError(response.data));
    }
  };

  const iniciarPedidoInclusaoContinua = async (uuid, tipoInclusao, form) => {
    const response = await iniciaFluxoInclusaoAlimentacao(uuid, tipoInclusao);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Inclusão de Alimentação enviada com sucesso!");
      refresh(form);
    } else {
      toastError(getError(response.data));
    }
  };

  const fluxoInclusaoNormal = async (values, form) => {
    if (!values.uuid) {
      const response = await createInclusaoAlimentacaoCEMEI(
        formataInclusaoCEMEI(values, vinculos)
      );
      if (response.status === HTTP_STATUS.CREATED) {
        if (values.status === STATUS_DRE_A_VALIDAR) {
          iniciarPedido(response.data.uuid, form);
        } else {
          toastSuccess("Solicitação Rascunho criada com sucesso!");
        }
        refresh(form);
      } else {
        toastError(getError(response.data));
      }
    } else {
      const response = await updateInclusaoAlimentacaoCEMEI(
        values.uuid,
        formataInclusaoCEMEI(values, vinculos)
      );
      if (response.status === HTTP_STATUS.OK) {
        if (values.status === STATUS_DRE_A_VALIDAR) {
          iniciarPedido(values.uuid, form);
        } else {
          toastSuccess("Rascunho atualizado com sucesso");
        }
        refresh(form);
      } else {
        toastError(getError(response.data));
      }
    }
  };

  const fluxoInclusaoContinua = async (values, form) => {
    if (!values.uuid) {
      const response = await createInclusaoAlimentacao(
        formatarSubmissaoSolicitacaoContinua(values),
        TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
      );
      if (response.status === HTTP_STATUS.CREATED) {
        if (values.status === STATUS_DRE_A_VALIDAR) {
          iniciarPedido(
            response.data.uuid,
            TIPO_SOLICITACAO.SOLICITACAO_CONTINUA,
            form
          );
        } else {
          toastSuccess("Solicitação Rascunho criada com sucesso!");
        }
        refresh(form);
      } else {
        toastError(getError(response.data));
      }
    } else {
      const response = await updateInclusaoAlimentacao(
        values.uuid,
        formatarSubmissaoSolicitacaoContinua(values),
        TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
      );
      if (response.status === HTTP_STATUS.OK) {
        if (values.status === STATUS_DRE_A_VALIDAR) {
          iniciarPedidoInclusaoContinua(
            values.uuid,
            TIPO_SOLICITACAO.SOLICITACAO_CONTINUA,
            form
          );
        } else {
          toastSuccess("Rascunho atualizado com sucesso");
        }
        refresh(form);
      } else {
        toastError(getError(response.data));
      }
    }
  };

  const onSubmit = async (values, form) => {
    const values_ = deepCopy(values);
    const tipoSolicitacao = motivoSimplesSelecionado(values)
      ? TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      : TIPO_SOLICITACAO.SOLICITACAO_CONTINUA;
    const erro =
      tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_NORMAL
        ? validarSubmit(values_)
        : validarSubmissaoContinua(values, meusDados);
    if (erro) {
      toastError(erro);
      return;
    }
    if (tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_NORMAL) {
      fluxoInclusaoNormal(values_, form);
    } else {
      fluxoInclusaoContinua(values_, form);
    }
  };

  const onDataChanged = value => {
    if (
      value &&
      checaSeDataEstaEntre2e5DiasUteis(
        value,
        proximosDoisDiasUteis,
        proximosCincoDiasUteis
      )
    ) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <div className="mt-3">
        <CardMatriculados
          meusDados={meusDados}
          numeroAlunos={
            meusDados.vinculo_atual.instituicao.quantidade_alunos || 0
          }
        />
      </div>
      {erroRascunhos && (
        <div className="card mt-3 mb-3">
          Erro ao carregar rascunhos de Inclusão de Alimentação.
        </div>
      )}
      <Form
        keepDirtyOnReinitialize
        mutators={{
          ...arrayMutators
        }}
        initialValues={{
          escola: meusDados.vinculo_atual.instituicao.uuid,
          inclusoes: [{ motivo: undefined }]
        }}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          submitting,
          form,
          form: {
            mutators: { push }
          },
          values
        }) => (
          <form onSubmit={handleSubmit}>
            {rascunhos && rascunhos.length > 0 && (
              <div className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  rascunhosInclusaoDeAlimentacao={rascunhos}
                  removerRascunho={removerRascunho}
                  carregarRascunho={carregarRascunho}
                  form={form}
                  values={values}
                />
              </div>
            )}
            <div className="mt-2 page-title">
              {values.uuid
                ? `Solicitação # ${values.id_externo}`
                : "Nova Solicitação"}
            </div>
            <div className="card solicitation mt-2">
              <div className="card-body">
                <div className="card-title font-weight-bold">
                  Descrição da Inclusão de Alimentação
                </div>
                <FieldArray name="inclusoes">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <div key={name}>
                        <div className="row">
                          <div className="col-8">
                            <Field
                              component={Select}
                              name={`${name}.motivo`}
                              label="Motivo"
                              options={
                                values.inclusoes.length > 1
                                  ? agregarDefault(motivosSimples)
                                  : agregarDefault(motivosSimples).concat(
                                      motivosContinuos
                                    )
                              }
                              required
                              validate={required}
                              naoDesabilitarPrimeiraOpcao
                            />
                            <OnChange name={`${name}.motivo`}>
                              {async value => {
                                if (
                                  value &&
                                  motivosSimples.find(
                                    motivo => motivo.uuid === value
                                  )
                                ) {
                                  form.change("quantidades_periodo", undefined);
                                  form.change("quantidades_periodo", periodos);
                                  form.change("reload", !values.reload);
                                }
                                if (
                                  value &&
                                  motivosContinuos.find(
                                    motivo => motivo.uuid === value
                                  )
                                ) {
                                  form.change("quantidades_periodo", undefined);
                                  form.change("reload", !values.reload);
                                }
                              }}
                            </OnChange>
                          </div>
                          {motivoSimplesSelecionado(values) && (
                            <DataInclusaoNormal
                              name={name}
                              onDataChanged={onDataChanged}
                              values={values}
                              index={index}
                              proximosDoisDiasUteis={proximosDoisDiasUteis}
                              form={form}
                            />
                          )}
                          {motivoContinuoSelecionado(values) && (
                            <DatasInclusaoContinua
                              onDataChanged={onDataChanged}
                              index={index}
                              name={name}
                              proximosDoisDiasUteis={proximosDoisDiasUteis}
                              values={values}
                            />
                          )}
                        </div>
                        {outroMotivoSelecionado(values, index) && (
                          <div className="mt-3">
                            <OutroMotivo name={name} />
                          </div>
                        )}
                        <hr />
                      </div>
                    ))
                  }
                </FieldArray>
                {motivoSimplesSelecionado(values) && (
                  <>
                    <div className="mt-3">
                      <AdicionarDia push={push} />
                    </div>
                    {values.quantidades_periodo && (
                      <PeriodosCEIeouEMEI
                        form={form}
                        values={values}
                        periodos={periodos}
                        vinculos={vinculos}
                        meusDados={meusDados}
                      />
                    )}
                  </>
                )}
                {motivoContinuoSelecionado(values) && (
                  <>
                    <Recorrencia
                      values={values}
                      form={form}
                      periodos={periodosInclusaoContinua}
                      push={push}
                      meusDados={meusDados}
                    />
                    {values.quantidades_periodo && (
                      <div className="mt-5">
                        <RecorrenciaTabela
                          values={values}
                          periodos={periodosInclusaoContinua}
                          form={form}
                          meusDados={meusDados}
                        />
                      </div>
                    )}
                  </>
                )}
                <div className="row float-right mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      onClick={() => {
                        resetForm(form);
                      }}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto={
                        values.uuid ? "Atualizar rascunho" : "Salvar rascunho"
                      }
                      className="ml-3"
                      disabled={submitting}
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Enviar inclusão"
                      type={BUTTON_TYPE.BUTTON}
                      disabled={submitting}
                      onClick={() => {
                        values["status"] = STATUS_DRE_A_VALIDAR;
                        handleSubmit(values => onSubmit(values, form));
                      }}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={() => setShowModal(false)}
            />
          </form>
        )}
      </Form>
    </div>
  );
};

export default InclusaoDeAlimentacaoCEMEI;
