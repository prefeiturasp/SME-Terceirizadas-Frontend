import CardMatriculados from "components/Shareable/CardMatriculados";
import HTTP_STATUS from "http-status-codes";
import arrayMutators from "final-form-arrays";
import React, { useState } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { getRascunhosAlteracaoTipoAlimentacao } from "services/alteracaoDeCardapio";
import { TIPO_SOLICITACAO } from "constants/shared";
import { Rascunhos } from "../Rascunhos";
import Select from "components/Shareable/Select";
import moment from "moment";
import { InputComData } from "components/Shareable/DatePicker";
import { required } from "helpers/fieldValidators";
import { checaSeDataEstaEntre2e5DiasUteis } from "helpers/utilities";
import ModalDataPrioritaria from "components/Shareable/ModalDataPrioritaria";
import { OnChange } from "react-final-form-listeners";
import { FieldArray } from "react-final-form-arrays";

export const AlteracaoDoTipoDeAlimentacaoCEI = ({ ...props }) => {
  const {
    meusDados,
    motivos,
    periodos,
    proximosCincoDiasUteis,
    proximosDoisDiasUteis
  } = props;

  const [rascunhos, setRascunhos] = useState([]);
  const [erroAPI, setErroAPI] = useState("");
  const [showModalDataPrioritaria, setShowModalDataPrioritaria] = useState(
    false
  );

  const getRascunhos = async () => {
    const response = await getRascunhosAlteracaoTipoAlimentacao(
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    );
    if (response.status === HTTP_STATUS.OK) {
      setRascunhos(response.data.results);
    } else {
      setErroAPI("Erro ao carregar rascunhos");
    }
  };

  useEffect(() => {
    getRascunhos();
  }, []);

  const onAlterarDiaChanged = value => {
    if (
      value &&
      checaSeDataEstaEntre2e5DiasUteis(
        value,
        proximosDoisDiasUteis,
        proximosCincoDiasUteis
      )
    ) {
      setShowModalDataPrioritaria(true);
    }
  };

  const onSubmit = () => {};

  const getPeriodo = (values, indice) => {
    console.log(values);
    return values.substituicoes[indice];
  };

  return (
    <>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && (
        <div className="mt-3">
          <CardMatriculados
            meusDados={meusDados}
            numeroAlunos={meusDados.vinculo_atual.instituicao.quantidade_alunos}
          />
          {rascunhos.length > 0 && (
            <section className="mt-3">
              <span className="page-title">Rascunhos</span>
              <Rascunhos
                alteracaoCardapioList={rascunhos}
                OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                resetForm={event => this.resetForm(event)}
                OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
              />
            </section>
          )}
          <div className="card mt-3">
            <div className="card-body">
              <Form
                initialValues={{
                  substituicoes: periodos
                }}
                mutators={{
                  ...arrayMutators
                }}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, form, values }) => (
                  <form onSubmit={handleSubmit}>
                    <Field component={"input"} type="hidden" name="uuid" />
                    <div className="card-title font-weight-bold descricao">
                      Descrição da Alteração do Tipo de Alimentação
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-8">
                        <Field
                          component={Select}
                          name="motivo"
                          label="Motivo"
                          options={motivos.filter(
                            ({ nome }) =>
                              nome.toUpperCase() !==
                              "Lanche emergencial".toUpperCase()
                          )}
                          validate={required}
                        />
                      </div>
                      <div className="col-12 col-sm-4">
                        <Field
                          component={InputComData}
                          name="data_alteracao"
                          minDate={proximosDoisDiasUteis}
                          maxDate={moment()
                            .endOf("year")
                            .toDate()}
                          label="Alterar dia"
                          required
                          validate={required}
                        />
                        <OnChange name="data_alteracao">
                          {value => {
                            onAlterarDiaChanged(value);
                          }}
                        </OnChange>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">Período</div>
                      <div className="col-6">Alterar alimentação de</div>
                      <div className="col-3">Para alimentação</div>
                    </div>
                    <FieldArray name="substituicoes">
                      {({ fields }) =>
                        fields.map((name, indice) => (
                          <div className="mt-1" key={indice}>
                            <div className="row">
                              <div className="col-3">
                                <div
                                  className={`period-quantity number-${indice} pl-5 pt-2 pb-2`}
                                >
                                  <label
                                    htmlFor="check"
                                    className="checkbox-label"
                                  >
                                    <Field
                                      component={"input"}
                                      type="checkbox"
                                      name={`${name}.checked`}
                                    />
                                    <span
                                      onClick={async () => {
                                        await form.change(
                                          `${name}.checked`,
                                          !values.substituicoes[indice][
                                            `checked`
                                          ]
                                        );
                                        await form.change(
                                          `${name}.multiselect`,
                                          !values.substituicoes[indice][
                                            `checked`
                                          ]
                                            ? "multiselect-wrapper-enabled"
                                            : "multiselect-wrapper-disabled"
                                        );
                                      }}
                                      className="checkbox-custom"
                                      data-cy={`checkbox-${
                                        getPeriodo(values, indice).nome
                                      }`}
                                    />{" "}
                                    {getPeriodo(values, indice).nome}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </FieldArray>
                    <ModalDataPrioritaria
                      showModal={showModalDataPrioritaria}
                      closeModal={() => setShowModalDataPrioritaria(false)}
                    />
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
