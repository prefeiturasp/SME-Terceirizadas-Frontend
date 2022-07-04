import CardMatriculados from "components/Shareable/CardMatriculados";
import HTTP_STATUS from "http-status-codes";
import { TIPO_SOLICITACAO } from "constants/shared";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { obterMinhasSolicitacoesDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";
import { Rascunhos } from "./componentes/Rascunhos";
import Select from "components/Shareable/Select";
import { required } from "helpers/fieldValidators";
import { agregarDefault } from "helpers/utilities";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import {
  AdicionarDia,
  DataInclusaoNormal,
  FormularioInclusaoNormal
} from "./componentes/InclusaoNormal";
import ModalDataPrioritaria from "components/Shareable/ModalDataPrioritaria";

export const InclusaoDeAlimentacao = ({ ...props }) => {
  const [rascunhos, setRascunhos] = useState(null);
  const [erroRascunhos, setErroRascunhos] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    meusDados,
    motivosSimples,
    motivosContinuos,
    proximosDoisDiasUteis,
    proximosCincoDiasUteis
  } = props;

  const motivoSimplesSelecionado = values => {
    return (
      values.inclusoes[0].motivo &&
      motivosSimples.find(motivo => motivo.uuid === values.inclusoes[0].motivo)
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

  const onSubmit = values => {};

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
        mutators={{
          ...arrayMutators
        }}
        initialValues={{ inclusoes: [{ motivo: undefined }] }}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
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
                          </div>
                          {motivoSimplesSelecionado(values) && (
                            <DataInclusaoNormal
                              name={name}
                              index={index}
                              proximosDoisDiasUteis={proximosDoisDiasUteis}
                              proximosCincoDiasUteis={proximosCincoDiasUteis}
                              setShowModal={setShowModal}
                              pop={pop}
                            />
                          )}
                        </div>
                      </div>
                    ))
                  }
                </FieldArray>
                {motivoSimplesSelecionado(values) && (
                  <div className="mt-3">
                    <AdicionarDia push={push} />
                  </div>
                )}
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
