import { Botao } from "components/Shareable/Botao";
import HTTP_STATUS from "http-status-codes";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import moment from "moment";
import { InputComData } from "components/Shareable/DatePicker";
import { InputText } from "components/Shareable/Input/InputText";
import { Select } from "components/Shareable/Select";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { required } from "helpers/fieldValidators";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { getLotesSimples } from "services/lote.service";
import { getNomesTerceirizadas } from "services/produto.service.js";
import { Spin } from "antd";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { criarEditalEContrato } from "services/edital.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import "./style.scss";
import { useNavigate } from "react-router-dom";

export const EditaisContratosRefatorado = () => {
  const [lotes, setLotes] = useState(undefined);
  const [DREs, setDREs] = useState(undefined);
  const [empresas, setEmpresas] = useState(undefined);

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getLotesSimplesAsync = async () => {
    const response = await getLotesSimples();
    if (response.status === HTTP_STATUS.OK) {
      setLotes(response.data.results);
    } else {
      setErro("Erro ao carregar lotes. Tente novamente mais tarde.");
    }
  };

  const getDiretoriareginalSimplissimaAsync = async () => {
    const response = await getDiretoriaregionalSimplissima();
    if (response.status === HTTP_STATUS.OK) {
      setDREs(response.data.results);
    } else {
      setErro(
        "Erro ao carregar diretorias regionais. Tente novamente mais tarde."
      );
    }
  };

  const getNomesTerceirizadasAsync = async () => {
    const response = await getNomesTerceirizadas({
      tipo_empresa: "Terceirizada",
    });
    if (response.status === HTTP_STATUS.OK) {
      setEmpresas(response.data.results);
    } else {
      setErro("Erro ao carregar empresas. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    requisicoesPreRender();
  }, []);

  const requisicoesPreRender = async () => {
    await Promise.all([
      getLotesSimplesAsync(),
      getDiretoriareginalSimplissimaAsync(),
      getNomesTerceirizadasAsync(),
    ]).then(() => {
      setLoading(false);
    });
  };

  const renderizarLabelLote = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione um ou mais lotes...";
    }
    if (selected.length === options.length) {
      return "Todos os lotes foram selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} lote selecionado`;
    }
    return `${selected.length} lotes selecionados`;
  };

  const renderizarDiretoriaRegional = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione uma ou mais diretorias...";
    }
    if (selected.length === options.length) {
      return "Todas as diretorias foram selecionadas";
    }
    if (selected.length === 1) {
      return `${selected.length} diretoria selecionada`;
    }
    return `${selected.length} diretorias selecionadas`;
  };

  const onSubmit = async (values) => {
    const response = await criarEditalEContrato(values);
    if (response.status === HTTP_STATUS.CREATED) {
      toastSuccess("Edital salvo com sucesso");
      navigate("/configuracoes/cadastros/editais-cadastrados");
    } else {
      toastError("Houve um erro ao salvar o edital");
    }
  };

  const REQUISICOES_FINALIZADAS = !loading && lotes && DREs && empresas;

  return (
    <Spin tip="Carregando..." spinning={!REQUISICOES_FINALIZADAS}>
      <div className="form-editais-contratos">
        <div className="card mt-3">
          <div className="card-body">
            {erro && <div className="mt-3">{erro}</div>}
            {!erro && REQUISICOES_FINALIZADAS && (
              <>
                <div className="row mt-3 mb-3">
                  <div className="col-6">
                    <div className="title">
                      Novo Cadastro de Editais e Contratos
                    </div>
                  </div>
                  <div className="col-6 text-end">
                    <Botao
                      texto="Editais e Contratos Cadastrados"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                  </div>
                </div>
                <Form
                  mutators={{
                    ...arrayMutators,
                  }}
                  initialValues={{
                    contratos: [
                      {
                        vigencias: [
                          {
                            numero_contrato: undefined,
                            data_inicial: undefined,
                            data_final: undefined,
                          },
                        ],
                      },
                    ],
                  }}
                  onSubmit={onSubmit}
                >
                  {({
                    handleSubmit,
                    form,
                    submitting,
                    form: {
                      mutators: { push },
                    },
                    values,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Tipo de contratação"
                            name="tipo_contratacao"
                            placeholder="Digite o tipo de contratação"
                            required
                            validate={required}
                            max={50}
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            className="form-control"
                            label="N° do Edital"
                            name="numero"
                            placeholder="Digite o número do edital"
                            required
                            validate={required}
                            max={50}
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Nº do processo administrativo"
                            name="processo"
                            placeholder="Digite o número do processo"
                            required
                            validate={required}
                            max={50}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <Field
                            component={TextArea}
                            label="Objeto resumido"
                            name="objeto"
                            required
                            validate={required}
                            height="120"
                          />
                        </div>
                      </div>
                      <FieldArray name="contratos">
                        {({ fields }) =>
                          fields.map((name_contratos, index_contratos) => (
                            <div key={name_contratos}>
                              <div className="row mt-3 mb-3">
                                <div className="col-12">
                                  <div className="title">
                                    <span
                                      className={`com-linha ${
                                        index_contratos === 0 ? "w-100" : "w-78"
                                      }`}
                                    >
                                      Contratos Relacionados
                                    </span>
                                    {index_contratos > 0 && (
                                      <span
                                        onClick={() => {
                                          form.change(
                                            `contratos`,
                                            values.contratos.filter(
                                              (_, i) => i !== index_contratos
                                            )
                                          );
                                        }}
                                        className="remover float-end"
                                      >
                                        <i className="fas fa-trash" /> Remover
                                        contrato
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-8">
                                  <Field
                                    name={`${name_contratos}.processo`}
                                    label="Processo administrativo do contrato"
                                    placeholder="Digite o processo administrativo"
                                    component={InputText}
                                    required
                                    validate={required}
                                    max={50}
                                  />
                                </div>
                                <div className="col-4">
                                  <Field
                                    name={`${name_contratos}.data_proposta`}
                                    label="Data da proposta"
                                    placeholder="Selecione a data da proposta"
                                    component={InputComData}
                                    validate={required}
                                    minDate={null}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4">
                                  <Field
                                    name={`${name_contratos}.numero`}
                                    component={InputText}
                                    label="Nº do Contrato"
                                    placeholder="Digite o número do contrato"
                                    required
                                    validate={required}
                                  />
                                </div>
                                <FieldArray
                                  name={`${name_contratos}.vigencias`}
                                >
                                  {({ fields }) =>
                                    fields.map((name_vigencias, index) => (
                                      <>
                                        <div className="col-4">
                                          <Field
                                            component={InputComData}
                                            label="Vigência"
                                            name={`${name_vigencias}.data_inicial`}
                                            placeholder="DE"
                                            writable={false}
                                            minDate={
                                              index === 0
                                                ? null
                                                : moment(
                                                    values.contratos[
                                                      index_contratos
                                                    ].vigencias[index - 1]
                                                      .data_final,
                                                    "DD/MM/YYYY"
                                                  ).toDate()
                                            }
                                            required
                                            validate={required}
                                          />
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            component={InputComData}
                                            label="&nbsp;"
                                            name={`${name_vigencias}.data_final`}
                                            placeholder="ATÉ"
                                            writable={false}
                                            minDate={
                                              index === 0
                                                ? moment(
                                                    values.contratos[
                                                      index_contratos
                                                    ].vigencias[index]
                                                      .data_inicial,
                                                    "DD/MM/YYYY"
                                                  ).toDate()
                                                : moment(
                                                    values.contratos[
                                                      index_contratos
                                                    ].vigencias[index - 1]
                                                      .data_final,
                                                    "DD/MM/YYYY"
                                                  ).toDate()
                                            }
                                            maxDate={null}
                                          />
                                        </div>
                                        {index > 0 && (
                                          <div className="col-2 mt-auto mb-2">
                                            <Botao
                                              texto="Remover"
                                              type={BUTTON_TYPE.BUTTON}
                                              onClick={() => {
                                                form.change(
                                                  `contratos[${index_contratos}].vigencias`,
                                                  values.contratos[
                                                    index_contratos
                                                  ].vigencias.filter(
                                                    (_, i) => i !== index
                                                  )
                                                );
                                              }}
                                              style={BUTTON_STYLE.RED_OUTLINE}
                                            />
                                          </div>
                                        )}
                                      </>
                                    ))
                                  }
                                </FieldArray>
                              </div>

                              <div className="row mt-3">
                                <div className="col-12">
                                  <Botao
                                    texto="Adicionar Vigência"
                                    onClick={() =>
                                      push(`${name_contratos}.vigencias`)
                                    }
                                    style={BUTTON_STYLE.GREEN_OUTLINE}
                                    type={BUTTON_TYPE.BUTTON}
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="label fw-normal">
                                    <span className="required-asterisk">
                                      *{" "}
                                    </span>
                                    Lote
                                  </label>
                                  <Field
                                    component={StatefulMultiSelect}
                                    name={`${name_contratos}.lotes`}
                                    selected={
                                      values.contratos[index_contratos]
                                        ?.lotes || []
                                    }
                                    options={lotes.map((lote) => ({
                                      label: lote.nome,
                                      value: lote.uuid,
                                    }))}
                                    onSelectedChanged={(values_) => {
                                      form.change(
                                        `contratos[${index_contratos}].lotes`,
                                        values_
                                      );
                                    }}
                                    overrideStrings={{
                                      search: "Busca",
                                      selectSomeItems: "Selecione",
                                      allItemsAreSelected:
                                        "Todos os lotes estão selecionados",
                                      selectAll: "Todos",
                                    }}
                                    valueRenderer={renderizarLabelLote}
                                    validate={required}
                                  />
                                  {values.contratos[index_contratos]?.lotes
                                    ?.length > 0 && (
                                    <div className="lotes-selecionados pt-3">
                                      <div className="mb-3">
                                        Lotes selecionados:
                                      </div>
                                      {lotes
                                        .filter((lote) =>
                                          values.contratos[
                                            index_contratos
                                          ].lotes.includes(lote.uuid)
                                        )
                                        .map((lote, indice) => {
                                          return (
                                            <span
                                              className="value-selected-unities"
                                              key={indice}
                                            >
                                              {`${lote.nome} | `}
                                            </span>
                                          );
                                        })}
                                    </div>
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="label fw-normal">
                                    <span className="required-asterisk">
                                      *{" "}
                                    </span>
                                    DRE
                                  </label>
                                  <Field
                                    component={StatefulMultiSelect}
                                    name={`${name_contratos}.diretorias_regionais`}
                                    selected={
                                      values.contratos[index_contratos]
                                        ?.diretorias_regionais || []
                                    }
                                    options={DREs.map((dre) => ({
                                      label: dre.nome,
                                      value: dre.uuid,
                                    }))}
                                    onSelectedChanged={(values_) => {
                                      form.change(
                                        `contratos[${index_contratos}].diretorias_regionais`,
                                        values_
                                      );
                                    }}
                                    overrideStrings={{
                                      search: "Busca",
                                      selectSomeItems: "Selecione",
                                      allItemsAreSelected:
                                        "Todos as diretorias regionais estão selecionadas",
                                      selectAll: "Todos",
                                    }}
                                    valueRenderer={renderizarDiretoriaRegional}
                                    validate={required}
                                  />
                                  {values.contratos[index_contratos]
                                    ?.diretorias_regionais?.length > 0 && (
                                    <div className="lotes-selecionados pt-3">
                                      <div className="mb-3">
                                        DREs selecionadas:
                                      </div>
                                      {DREs.filter((dre) =>
                                        values.contratos[
                                          index_contratos
                                        ]?.diretorias_regionais.includes(
                                          dre.uuid
                                        )
                                      ).map((dre, indice) => {
                                        return (
                                          <div
                                            className="value-selected-unities"
                                            key={indice}
                                          >
                                            {dre.nome}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-12">
                                  <label className="label fw-normal">
                                    <span className="required-asterisk">
                                      *{" "}
                                    </span>
                                    Empresa
                                  </label>
                                  <Field
                                    component={Select}
                                    name={`${name_contratos}.terceirizada`}
                                    options={[
                                      {
                                        nome: "Selecione uma empresa",
                                        uuid: "",
                                      },
                                    ].concat(
                                      empresas.map((empresa) => {
                                        return {
                                          nome: empresa.nome_fantasia,
                                          uuid: empresa.uuid,
                                        };
                                      })
                                    )}
                                    required
                                    validate={required}
                                    naoDesabilitarPrimeiraOpcao
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </FieldArray>
                      <div className="row mt-3">
                        <div className="col-12 text-center">
                          <Botao
                            texto="+ Adicionar outro contrato relacionado"
                            onClick={() =>
                              push("contratos", {
                                vigencias: [
                                  {
                                    numero_contrato: undefined,
                                    data_inicial: undefined,
                                    data_final: undefined,
                                  },
                                ],
                              })
                            }
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-end">
                          <Botao
                            onClick={() => form.reset()}
                            texto="Cancelar"
                            className="me-3"
                            disabled={submitting}
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                          />
                          <Botao
                            texto="Salvar"
                            disabled={submitting}
                            type={BUTTON_TYPE.SUBMIT}
                            style={BUTTON_STYLE.GREEN}
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};
