import CardMatriculados from "components/Shareable/CardMatriculados";
import HTTP_STATUS from "http-status-codes";
import { TIPO_SOLICITACAO } from "constants/shared";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  updateInclusaoAlimentacao,
  createInclusaoAlimentacao,
  escolaExcluirSolicitacaoDeInclusaoDeAlimentacao,
  obterMinhasSolicitacoesDeInclusaoDeAlimentacao,
  iniciaFluxoInclusaoAlimentacao
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
import {
  AdicionarDia,
  DataInclusaoNormal,
  OutroMotivo,
  PeriodosInclusaoNormal
} from "./componentes/InclusaoNormal";
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
  validarSubmissaoNormal,
  validarSubmissaoContinua
} from "components/InclusaoDeAlimentacao/validacao";
import {
  formatarSubmissaoSolicitacaoContinua,
  formatarSubmissaoSolicitacaoNormal
} from "components/InclusaoDeAlimentacao/helper";
import {
  DatasInclusaoContinua,
  Recorrencia,
  RecorrenciaTabela
} from "./componentes/InclusaoContinua";

export const InclusaoDeAlimentacao = ({ ...props }) => {
  const [rascunhos, setRascunhos] = useState(null);
  const [erroRascunhos, setErroRascunhos] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    meusDados,
    motivosSimples,
    motivosContinuos,
    proximosDoisDiasUteis,
    proximosCincoDiasUteis,
    periodos
  } = props;

  useEffect(() => {
    getRascunhos();
  }, []);

  const resetForm = form => {
    form.change("inclusoes", [{ motivo: undefined }]);
    form.change("quantidades_periodo", undefined);
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
      motivosSimples.find(
        motivo => motivo.uuid === values.inclusoes[index].motivo
      ).nome === "Outro"
    );
  };

  const getRascunhos = async () => {
    const responseRascunhosNormais = await obterMinhasSolicitacoesDeInclusaoDeAlimentacao(
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    );
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
      const response = await escolaExcluirSolicitacaoDeInclusaoDeAlimentacao(
        uuid,
        tipoSolicitacao
      );
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

  const carregarRascunho = async (form, values, inclusao) => {
    await form.change("uuid", inclusao.uuid);
    await form.change("id_externo", inclusao.id_externo);
    const inclusao_ = deepCopy(inclusao);
    if (inclusao_.inclusoes) {
      carregarRascunhoNormal(form, inclusao_);
    } else {
      carregarRascunhoContinuo(form, values, inclusao_);
    }
  };

  const carregarRascunhoNormal = async (form, inclusao_) => {
    await form.change("quantidades_periodo", periodos);
    inclusao_.inclusoes.forEach(i => {
      i.motivo = i.motivo.uuid;
    });
    await form.change("inclusoes", inclusao_.inclusoes);
    inclusao_.quantidades_periodo.forEach(async qp => {
      const index = periodos.findIndex(
        qp_ => qp_.nome === qp.periodo_escolar.nome
      );
      await form.change(`quantidades_periodo[${index}].checked`, true);
      await form.change(
        `quantidades_periodo[${index}].multiselect`,
        "multiselect-wrapper-enabled"
      );
      await form.change(
        `quantidades_periodo[${index}].tipos_alimentacao_selecionados`,
        qp.tipos_alimentacao.map(t => t.uuid)
      );
      await form.change(
        `quantidades_periodo[${index}].numero_alunos`,
        qp.numero_alunos
      );
    });
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

  const refresh = form => {
    getRascunhos();
    resetForm(form);
  };

  const iniciarPedido = async (uuid, tipoInclusao, form) => {
    const response = await iniciaFluxoInclusaoAlimentacao(uuid, tipoInclusao);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Inclusão de Alimentação enviada com sucesso!");
      refresh(form);
    } else {
      toastError(getError(response.data));
    }
  };

  const onSubmit = async (values, form) => {
    const values_ = deepCopy(values);
    const tipoSolicitacao = motivoSimplesSelecionado(values)
      ? TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      : TIPO_SOLICITACAO.SOLICITACAO_CONTINUA;
    const erro =
      tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_NORMAL
        ? validarSubmissaoNormal(values, meusDados)
        : validarSubmissaoContinua(values, meusDados);
    if (erro) {
      toastError(erro);
      return;
    }
    if (!values.uuid) {
      const response = await createInclusaoAlimentacao(
        tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_NORMAL
          ? formatarSubmissaoSolicitacaoNormal(values_)
          : formatarSubmissaoSolicitacaoContinua(values_),
        tipoSolicitacao
      );
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Solicitação Rascunho criada com sucesso!");
        if (values.status === STATUS_DRE_A_VALIDAR) {
          iniciarPedido(response.data.uuid, tipoSolicitacao, form);
        }
        refresh(form);
      } else {
        toastError(getError(response.data));
      }
    } else {
      const response = await updateInclusaoAlimentacao(
        values.uuid,
        tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_NORMAL
          ? formatarSubmissaoSolicitacaoNormal(values_)
          : formatarSubmissaoSolicitacaoContinua(values_),
        tipoSolicitacao
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Rascunho atualizado com sucesso");
        if (values.status === STATUS_DRE_A_VALIDAR) {
          iniciarPedido(values.uuid, tipoSolicitacao, form);
        }
        refresh(form);
      } else {
        toastError(getError(response.data));
      }
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
                      <PeriodosInclusaoNormal
                        form={form}
                        values={values}
                        periodos={periodos}
                      />
                    )}
                  </>
                )}
                {motivoContinuoSelecionado(values) && (
                  <>
                    <Recorrencia
                      values={values}
                      form={form}
                      periodos={periodos}
                      push={push}
                    />
                    {values.quantidades_periodo && (
                      <div className="mt-5">
                        <RecorrenciaTabela
                          values={values}
                          periodos={periodos}
                          form={form}
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
                      texto={values.uuid ? "Atualizar" : "Salvar"}
                      className="ml-3"
                      disabled={submitting}
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Enviar"
                      type={BUTTON_TYPE.SUBMIT}
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

export default InclusaoDeAlimentacao;
