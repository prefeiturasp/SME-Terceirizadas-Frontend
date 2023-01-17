import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import ModalDataPrioritaria from "components/Shareable/ModalDataPrioritaria";
import { Select } from "components/Shareable/Select";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { STATUS_DRE_A_VALIDAR } from "configs/constants";
import arrayMutators from "final-form-arrays";
import { required } from "helpers/fieldValidators";
import {
  agregarDefault,
  checaSeDataEstaEntre2e5DiasUteis,
  deepCopy,
  getError
} from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  atualizarInclusoesDaCEI,
  criarInclusoesDaCEI,
  excluirInclusoesDaCei,
  getQuantidadeAlunosFaixaEtaria,
  iniciarInclusoesDaCEI,
  meusRascunhosDeInclusaoDeAlimentacao
} from "services/inclusaoDeAlimentacao/cei.legacy.service";
import { formataPayload, validarForm } from "./helper";
import { Rascunhos } from "./Rascunhos";
import TabelaFaixasCEI from "./TabelaFaixasCEI";

import {
  AdicionarDia,
  DataInclusaoNormal,
  OutroMotivo
} from "components/InclusaoDeAlimentacao/Escola/Formulario/componentes/InclusaoNormal";
import CardMatriculados from "components/Shareable/CardMatriculados";
import { FieldArray } from "react-final-form-arrays";
import "./style.scss";

export const InclusaoDeAlimentacaoDaCei = ({ ...props }) => {
  const {
    meusDados,
    motivos,
    periodos,
    proximosDoisDiasUteis,
    proximosCincoDiasUteis,
    todasFaixas,
    vinculosAlimentacao
  } = props;

  const [faixasEtarias, setFaixasEtarias] = useState(null);
  const [alunosMatriculados, setAlunosMatriculados] = useState(null);
  const [rascunhos, setRascunhos] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [erro, setErro] = useState(false);

  const valoresIniciais = {
    escola: meusDados.vinculo_atual.instituicao.uuid,
    dias_motivos_da_inclusao_cei: [{ motivo: undefined }],
    inclusoes: periodos.map(periodo => {
      return {
        periodo_uuid: periodo.uuid,
        checked: false,
        faixas_etarias: todasFaixas.map(f => {
          return { faixa_etaria_uuid: f.uuid };
        })
      };
    })
  };

  useEffect(() => {
    getRascunhos();
    getFaixasEtariasPorPeriodoAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = form => {
    getRascunhos();
    resetForm(form);
  };

  const resetForm = async form => {
    let values = {
      escola: meusDados.vinculo_atual.instituicao.uuid,
      inclusoes: periodos.map(periodo => {
        return {
          periodo_uuid: periodo.uuid,
          checked: false,
          faixas_etarias: todasFaixas.map(f => {
            return { faixa_etaria_uuid: f.uuid };
          })
        };
      })
    };
    form.change("escola", values.escola);
    form.change("inclusoes", values.inclusoes);
    form.change("dias_motivos_da_inclusao_cei", [{ motivo: undefined }]);
    form.change("uuid", undefined);
  };

  const getRascunhos = async () => {
    const response = await meusRascunhosDeInclusaoDeAlimentacao();
    if (response.status === HTTP_STATUS.OK) {
      setRascunhos(response.data.results);
    } else {
      toastError(`Houve um erro ao carregar os rascunhos salvos`);
    }
  };

  const carregarRascunho = (form, inclusao, values) => {
    let _values = deepCopy(values);
    inclusao.quantidade_alunos_por_faixas_etarias.forEach(element => {
      let inc = _values.inclusoes.find(
        i => i.periodo_uuid === element.periodo.uuid
      );
      inc.checked = true;
      let faixa = inc.faixas_etarias.find(
        f => f.faixa_etaria_uuid === element.faixa_etaria.uuid
      );
      faixa.quantidade_alunos = element.quantidade_alunos;
    });
    form.change("inclusoes", _values.inclusoes);
    form.change("uuid", inclusao.uuid);
    form.change("escola", inclusao.escola.uuid);
    form.change(
      "dias_motivos_da_inclusao_cei",
      inclusao.dias_motivos_da_inclusao_cei.map(dia_motivo => ({
        motivo: dia_motivo.motivo.uuid,
        outro_motivo: dia_motivo.outro_motivo,
        data: dia_motivo.data
      }))
    );
  };

  const removerRascunho = async (id_externo, uuid, form) => {
    if (window.confirm("Deseja remover este rascunho?")) {
      const response = await excluirInclusoesDaCei(uuid);
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

  const getFaixasEtariasPorPeriodoAsync = async () => {
    const periodoIntegral = meusDados.vinculo_atual.instituicao.periodos_escolares.filter(
      periodo => periodo.nome === "INTEGRAL"
    );
    const periodoUUID = periodoIntegral[0].uuid;
    const dataInclusao = moment().format("YYYY-MM-DD");
    const response = await getQuantidadeAlunosFaixaEtaria(
      periodoUUID,
      dataInclusao
    );
    if (response.status === HTTP_STATUS.OK) {
      setFaixasEtarias(response.data.results);
      const somatorio = response.data.results.reduce((somatorio, faixa) => {
        return somatorio + faixa.count;
      }, 0);
      setAlunosMatriculados(somatorio);
    } else {
      setErro(true);
    }
  };

  const onSubmit = async (values, form) => {
    const payload = formataPayload(values);
    const erro = validarForm(payload);
    if (erro) {
      toastError(erro);
      return;
    }
    if (payload.uuid) {
      const response = await atualizarInclusoesDaCEI(payload, payload.uuid);
      if (response.status === HTTP_STATUS.OK) {
        if (values.status === STATUS_DRE_A_VALIDAR) {
          iniciarPedido(response.data.uuid, form);
        } else {
          toastSuccess("Rascunho atualizado com sucesso");
        }
        refresh(form);
      } else {
        toastError(getError(response.data));
      }
    } else {
      const response = await criarInclusoesDaCEI(payload);
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
    }
  };

  const iniciarPedido = async (uuid, form) => {
    const response = await iniciarInclusoesDaCEI(uuid);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Inclusão de Alimentação enviada com sucesso!");
      refresh(form);
    } else {
      toastError(getError(response.data));
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

  const outroMotivoSelecionado = (values, index) => {
    return (
      values.dias_motivos_da_inclusao_cei &&
      values.dias_motivos_da_inclusao_cei[index] &&
      values.dias_motivos_da_inclusao_cei[index].motivo &&
      motivos.find(
        motivo =>
          motivo.uuid === values.dias_motivos_da_inclusao_cei[index].motivo
      ) &&
      motivos
        .find(
          motivo =>
            motivo.uuid === values.dias_motivos_da_inclusao_cei[index].motivo
        )
        .nome.includes("Outro")
    );
  };

  const motivoSelecionado = values => {
    return (
      values.dias_motivos_da_inclusao_cei &&
      values.dias_motivos_da_inclusao_cei[0].motivo &&
      motivos.find(
        motivo => motivo.uuid === values.dias_motivos_da_inclusao_cei[0].motivo
      )
    );
  };

  return (
    <div>
      <Form
        keepDirtyOnReinitialize
        mutators={{
          ...arrayMutators
        }}
        initialValues={valoresIniciais}
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
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              meusDados={meusDados}
              numeroAlunos={
                meusDados.vinculo_atual.instituicao.quantidade_alunos || 0
              }
            />
            {rascunhos && rascunhos.length > 0 && (
              <div className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  rascunhos={rascunhos}
                  removerRascunho={removerRascunho}
                  carregarRascunho={carregarRascunho}
                  form={form}
                  values={values}
                />
              </div>
            )}
            <div className="mt-2 page-title">
              {values.uuid ? `Solicitação # ${"1234AB"}` : "Nova Solicitação"}
            </div>
            <div className="card solicitation mt-2">
              <div className="card-body">
                <div className="card-title font-weight-bold">
                  Descrição da Inclusão de Alimentação
                </div>
                <FieldArray name="dias_motivos_da_inclusao_cei">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <div key={name}>
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={Select}
                              name={`${name}.motivo`}
                              label="Motivo"
                              options={agregarDefault(motivos)}
                              required
                              validate={required}
                              naoDesabilitarPrimeiraOpcao
                            />
                          </div>
                          <DataInclusaoNormal
                            name={name}
                            nameFieldArray="dias_motivos_da_inclusao_cei"
                            onDataChanged={onDataChanged}
                            values={values}
                            index={index}
                            proximosDoisDiasUteis={proximosDoisDiasUteis}
                            form={form}
                          />
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
                {motivoSelecionado(values) && (
                  <div className="mt-3">
                    <AdicionarDia
                      push={push}
                      nameFieldArray="dias_motivos_da_inclusao_cei"
                    />
                  </div>
                )}
                <div className="row my-2">
                  <div className="col-12">
                    <p>Períodos</p>
                  </div>
                  <div className="col-12">
                    <label
                      style={{
                        background: "#D4FFE0",
                        border: `1px solid #DADADA`,
                        borderRadius: "5px",
                        marginBottom: "1%",
                        width: "100%",
                        padding: "8px 15px",
                        height: "40px"
                      }}
                    >
                      <Field
                        component={"input"}
                        type="checkbox"
                        checked
                        name="periodo_cei"
                      />
                      <span
                        className="checkbox-custom"
                        data-cy={`checkbox-INTEGRAL`}
                      />
                      INTEGRAL
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="container-fluid">
                      Selecione o período da Inclusão da Alimentação
                    </div>
                  </div>
                </div>
                {erro ? (
                  <div className="row">
                    <div className="col-12">
                      <div className="container-fluid">
                        Erro ao carregar faixas etárias. Tente novamente mais
                        tarde.
                      </div>
                    </div>
                  </div>
                ) : (
                  periodos.map((periodo, periodoIndice) => {
                    return (
                      <TabelaFaixasCEI
                        key={periodoIndice}
                        values={values}
                        form={form}
                        periodoIndice={periodoIndice}
                        periodo={periodo}
                        faixasEtarias={faixasEtarias}
                        alunosMatriculados={alunosMatriculados}
                        todasFaixas={todasFaixas}
                        vinculosAlimentacao={vinculosAlimentacao}
                      />
                    );
                  })
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
                      texto="Enviar"
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
          </form>
        )}
      </Form>
      <ModalDataPrioritaria
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </div>
  );
};

export default InclusaoDeAlimentacaoDaCei;
