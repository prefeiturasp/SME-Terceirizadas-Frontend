import CardMatriculados from "components/Shareable/CardMatriculados";
import HTTP_STATUS from "http-status-codes";
import { TIPO_SOLICITACAO } from "constants/shared";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  escolaCriarSolicitacaoDeInclusaoDeAlimentacao,
  obterMinhasSolicitacoesDeInclusaoDeAlimentacao
} from "services/inclusaoDeAlimentacao";
import { Rascunhos } from "./componentes/Rascunhos";
import Select from "components/Shareable/Select";
import { required } from "helpers/fieldValidators";
import { agregarDefault, deepCopy } from "helpers/utilities";
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
import { validarSubmissao } from "components/InclusaoDeAlimentacao/validacao";
import { formatarSubmissaoSolicitacaoNormal } from "components/InclusaoDeAlimentacao/helper";

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

  const resetForm = form => {
    form.change("inclusoes", [{ motivo: undefined }]);
  };

  const motivoSimplesSelecionado = values => {
    return (
      values.inclusoes &&
      values.inclusoes[0].motivo &&
      motivosSimples.find(motivo => motivo.uuid === values.inclusoes[0].motivo)
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

  useEffect(() => {
    getRascunhos();
  }, []);

  const onSubmit = async values => {
    const values_ = deepCopy(values);
    const erro = validarSubmissao(values, meusDados);
    if (erro) {
      toastError(erro);
      return;
    }
    const tipoSolicitacao = motivoSimplesSelecionado(values)
      ? TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      : TIPO_SOLICITACAO.SOLICITACAO_CONTINUA;
    if (!values.uuid) {
      const response = await escolaCriarSolicitacaoDeInclusaoDeAlimentacao(
        formatarSubmissaoSolicitacaoNormal(values_),
        tipoSolicitacao
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Solicitação Rascunho criada com sucesso!");
      }
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
      {rascunhos && rascunhos.length > 0 && (
        <div className="mt-3">
          <span className="page-title">Rascunhos</span>
          <Rascunhos
            rascunhosInclusaoDeAlimentacao={rascunhos}
            //removerRascunho={this.removerRascunho}
            //resetForm={() => this.resetForm()}
            //carregarRascunho={params => this.carregarRascunho(params)}
          />
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
            mutators: { push, pop }
          },
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-2 page-title">
              {values.uuid
                ? `Solicitação # ${values.uuid}`
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
                              options={agregarDefault(motivosSimples).concat(
                                motivosContinuos
                              )}
                              required
                              validate={required}
                              naoDesabilitarPrimeiraOpcao
                            />
                            <OnChange name={`${name}.motivo`}>
                              {value => {
                                if (value) {
                                  form.change("quantidades_periodo", periodos);
                                }
                              }}
                            </OnChange>
                          </div>
                          {motivoSimplesSelecionado(values) && (
                            <DataInclusaoNormal
                              name={name}
                              values={values}
                              index={index}
                              proximosDoisDiasUteis={proximosDoisDiasUteis}
                              proximosCincoDiasUteis={proximosCincoDiasUteis}
                              setShowModal={setShowModal}
                              pop={pop}
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
                      <PeriodosInclusaoNormal form={form} values={values} />
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
