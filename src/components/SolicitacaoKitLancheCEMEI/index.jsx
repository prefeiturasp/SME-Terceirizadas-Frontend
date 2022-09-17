import CardMatriculados from "components/Shareable/CardMatriculados";
import { InputComData } from "components/Shareable/DatePicker";
import InputText from "components/Shareable/Input/InputText";
import ModalDataPrioritaria from "components/Shareable/ModalDataPrioritaria";
import Select from "components/Shareable/Select";
import { ToggleExpandir } from "components/Shareable/ToggleExpandir";
import { Collapse } from "react-collapse";
import {
  maxLength,
  maxValue,
  naoPodeSerZero,
  required,
  textAreaRequired
} from "helpers/fieldValidators";
import {
  checaSeDataEstaEntre2e5DiasUteis,
  composeValidators,
  getError
} from "helpers/utilities";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { TextAreaWYSIWYG } from "components/Shareable/TextArea/TextAreaWYSIWYG";
import Botao from "components/Shareable/Botao";
import HTTP_STATUS from "http-status-codes";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { STATUS_DRE_A_VALIDAR } from "configs/constants";
import {
  createSolicitacaoKitLancheCEMEI,
  deleteSolicitacaoKitLancheCEMEI,
  getSolicitacaoKitLancheCEMEIRascunhos,
  iniciaFluxoSolicitacaoKitLancheCEMEI,
  updateSolicitacaoKitLancheCEMEI
} from "services/kitLanche";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { Rascunhos } from "./componentes/Rascunhos";

export const SolicitacaoKitLancheCEMEI = ({ ...props }) => {
  const {
    meusDados,
    proximosDoisDiasUteis,
    proximosCincoDiasUteis,
    kits,
    alunosComDietaEspecial
  } = props;

  const [rascunhos, setRascunhos] = useState(null);
  const [erroRascunhos, setErroRascunhos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [collapseAlunos, setCollapseAlunos] = useState(false);

  useEffect(() => {
    getRascunhos();
  }, []);

  const formataSubmit = values => {
    if (values.solicitacao_cei === null) {
      delete values.solicitacao_cei;
    } else if (values.solicitacao_cei) {
      delete values.solicitacao_cei.solicitacao_kit_lanche_cemei;
    }

    if (values.solicitacao_emei === null) {
      delete values.solicitacao_emei;
    } else if (values.solicitacao_emei) {
      delete values.solicitacao_emei.solicitacao_kit_lanche_cemei;
    }
    return values;
  };

  const onSubmit = async (values, form) => {
    if (!values.uuid) {
      const response = await createSolicitacaoKitLancheCEMEI(values);
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
      const response = await updateSolicitacaoKitLancheCEMEI(
        values.uuid,
        formataSubmit(values)
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

  const iniciarPedido = async (uuid, form) => {
    const response = await iniciaFluxoSolicitacaoKitLancheCEMEI(uuid);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Solicitação de Kit Lanche enviada com sucesso!");
      refresh(form);
    } else {
      toastError(getError(response.data));
    }
  };

  const getRascunhos = async () => {
    const response = await getSolicitacaoKitLancheCEMEIRascunhos();
    if (response.status === HTTP_STATUS.OK) {
      setRascunhos(response.data.results);
    } else {
      setErroRascunhos(true);
    }
  };

  const removerRascunho = async (id_externo, uuid, form) => {
    if (window.confirm("Deseja remover este rascunho?")) {
      const response = await deleteSolicitacaoKitLancheCEMEI(uuid);
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

  const carregarRascunho = async (form, values, solicitacao) => {
    form.initialize(solicitacao);
    form.change("observacao", solicitacao.observacao);
  };

  const refresh = form => {
    getRascunhos();
    resetForm(form);
  };

  const resetForm = form => {
    form.change("data", undefined);
    form.change("local", undefined);
    form.change("alunos_cei_e_ou_emei", undefined);
    form.change("solicitacao_emei", {});
    form.change("solicitacao_cei", {});
  };

  const validaDiasUteis = value => {
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
        initialValues={{
          escola: meusDados.vinculo_atual.instituicao.uuid,
          solicitacao_emei: {}
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, form, values, submitting }) => (
          <form onSubmit={handleSubmit}>
            {rascunhos && rascunhos.length > 0 && (
              <div className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  rascunhosSolicitacoesKitLanche={rascunhos}
                  removerRascunho={removerRascunho}
                  carregarRascunho={carregarRascunho}
                  form={form}
                  values={values}
                />
              </div>
            )}
            <div className="mt-5 page-title">
              {values.uuid
                ? `Solicitação # ${values.id_externo}`
                : "Nova Solicitação"}
            </div>
            <div className="card solicitation periodos_cei_emei mt-2">
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-3">
                    <Field
                      component={InputComData}
                      label="Data do passeio"
                      name="data"
                      minDate={proximosDoisDiasUteis}
                      maxDate={moment()
                        .endOf("year")
                        .toDate()}
                      required
                      validate={required}
                    />
                    <OnChange name={`data`}>
                      {value => {
                        if (value) {
                          validaDiasUteis(value);
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-9">
                    <Field
                      component={InputText}
                      label="Local do passeio"
                      name="local"
                      required
                      validate={composeValidators(required, maxLength(160))}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <Field
                      component={Select}
                      label="Alunos"
                      name="alunos_cei_e_ou_emei"
                      options={[
                        { uuid: "", nome: "Selecione" },
                        { uuid: "TODOS", nome: "Todos" },
                        { uuid: "CEI", nome: "CEI" },
                        { uuid: "EMEI", nome: "EMEI" }
                      ]}
                      validate={required}
                    />
                  </div>
                </div>
                {["TODOS", "EMEI"].includes(values.alunos_cei_e_ou_emei) && (
                  <>
                    <div className="alunos-label mt-3">Alunos EMEI</div>
                    <div className="tour-time">
                      <div className="label mt-3 mb-3">
                        Tempo previsto do passeio
                      </div>
                      <div className="d-inline-flex">
                        <label className="container-radio">
                          até 4 horas (1 Kit)
                          <Field
                            component="input"
                            type="radio"
                            value="0"
                            data-cy="radio-4h"
                            name="solicitacao_emei.tempo_passeio"
                            validate={required}
                          />
                          <span className="checkmark" />
                        </label>
                        <label className="container-radio">
                          de 5 a 7 horas (2 Kits)
                          <Field
                            component="input"
                            type="radio"
                            value="1"
                            data-cy="radio-5-7h"
                            name="solicitacao_emei.tempo_passeio"
                            validate={required}
                          />
                          <span className="checkmark" />
                        </label>
                        <label className="container-radio">
                          8 horas ou mais (3 Kits)
                          <Field
                            component={"input"}
                            type="radio"
                            value="2"
                            data-cy="radio-8h"
                            name="solicitacao_emei.tempo_passeio"
                            validate={required}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <OnChange name="solicitacao_emei.tempo_passeio">
                        {(value, previous) => {
                          if (
                            value &&
                            previous &&
                            parseInt(value) < parseInt(previous)
                          ) {
                            form.change("solicitacao_emei.kits", undefined);
                          }
                        }}
                      </OnChange>
                      <div className="row">
                        <div className="col-12">
                          <div className="explanation border rounded mt-3 p-3">
                            <label>
                              <b>Até 4 horas:</b> 1 Kit lanche/aluno: Escolher 1
                              Kit entre os modelos estabelecidos
                              contratualmente;
                            </label>
                            <br />
                            <label>
                              <b>De 5 a 7 horas:</b> 2 Kit lanche/aluno:
                              Escolher 2 Kits distintos entre os modelos
                              estabelecidos contratualmente;
                            </label>
                            <br />
                            <label>
                              <b>8 horas ou mais:</b> 3 Kit lanche/aluno:
                              Escolher 3 Kits distintos entre os modelos
                              estabelecidos contratualmente;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="label mt-3">Selecione a opção desejada</div>
                    <div className="row mt-3">
                      {kits
                        .filter(kit => kit.status === "Ativo")
                        .map((kit, indice) => {
                          return (
                            <div
                              className={`col-2 offset-${
                                indice % 3 === 0 ? "1" : "2"
                              } mt-3 d-flex`}
                              key={indice}
                            >
                              <div className="card card-kits w-100">
                                <div className="card-body p-2">
                                  <div className="row">
                                    <div className="col-6">
                                      <span className="nome-kit">
                                        {kit.nome}
                                      </span>
                                    </div>
                                    <div className="col-6 form-check">
                                      <Field
                                        component={"input"}
                                        type="checkbox"
                                        required
                                        validate={required}
                                        value={kit.uuid}
                                        className="float-right"
                                        name="solicitacao_emei.kits"
                                        disabled={
                                          !values.solicitacao_emei
                                            .tempo_passeio ||
                                          (values.solicitacao_emei.kits &&
                                            values.solicitacao_emei.kits
                                              .length ===
                                              parseInt(
                                                values.solicitacao_emei
                                                  .tempo_passeio
                                              ) +
                                                1 &&
                                            !values.solicitacao_emei.kits.includes(
                                              kit.uuid
                                            ))
                                        }
                                      />
                                      <span className="checkmark" />
                                    </div>
                                    <div className="col-12 kit-itens mt-3">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: kit.descricao
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <table className="faixas-etarias-cei mt-3">
                      <thead>
                        <tr className="row">
                          <th className="col-8 my-auto">
                            <Field
                              component="input"
                              type="hidden"
                              defaultValue={
                                meusDados.vinculo_atual.instituicao
                                  .quantidade_alunos_emei_da_cemei
                              }
                              name="solicitacao_emei.matriculados_quando_criado"
                            />
                            Alunos matriculados:{" "}
                            <span className="font-weight-normal">
                              {
                                meusDados.vinculo_atual.instituicao
                                  .quantidade_alunos_emei_da_cemei
                              }
                            </span>
                          </th>
                          <th className="col-4 d-flex justify-content-center">
                            <span className="my-auto">Quantidade</span>
                            <Field
                              className="ml-3"
                              component={InputText}
                              type="number"
                              name="solicitacao_emei.quantidade_alunos"
                              validate={composeValidators(
                                naoPodeSerZero,
                                maxValue(
                                  meusDados.vinculo_atual.instituicao
                                    .quantidade_alunos_emei_da_cemei
                                ),
                                required
                              )}
                            />
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <div className="label mt-3">
                      Selecionar alunos com dieta especial
                    </div>
                    <div className="card card-history mt-3 seletor-alunos-dieta-especial">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-2">{"Código EOL"}</div>
                          <div className="col-8">{"Nome do Aluno"}</div>
                          <div className="pl-5 col-1">
                            <ToggleExpandir
                              onClick={() => setCollapseAlunos(!collapseAlunos)}
                              ativo={!collapseAlunos}
                            />
                          </div>
                        </div>
                      </div>
                      <Collapse isOpened={collapseAlunos}>
                        <table className="table">
                          <tbody>
                            {alunosComDietaEspecial
                              .filter(
                                aluno =>
                                  !["1", "2", "3", "4"].includes(aluno.serie)
                              )
                              .map((aluno, key) => {
                                return (
                                  <tr key={key}>
                                    <td>
                                      <Field
                                        component="input"
                                        type="checkbox"
                                        value={aluno.uuid}
                                        name="solicitacao_emei.alunos_com_dieta_especial_participantes"
                                      />
                                    </td>
                                    <td>{aluno.codigo_eol}</td>
                                    <td>{aluno.nome}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </Collapse>
                    </div>
                  </>
                )}
                <Field
                  component={TextAreaWYSIWYG}
                  label="Observações"
                  name="observacao"
                  required
                  validate={textAreaRequired}
                  valorInicial={values.observacao || "<p></p>"}
                  className="form-control"
                />
                <hr />
                <div className="row float-right mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      type="button"
                      onClick={() => resetForm(form)}
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
