import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { ContratoInterface } from "interfaces/empenhos.interface";
import {
  getContratosVigentes,
  cadastraEmpenho,
} from "services/medicaoInicial/empenhos.service";
import { MEDICAO_INICIAL, EMPENHOS } from "configs/constants";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import { ASelect, AInput, AInputNumber } from "components/Shareable/MakeField";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { Select as SelectAntd, Spin } from "antd";
import { required } from "helpers/fieldValidators";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

type NovoEmpenho = {
  numero: string | null;
  contrato: string | null;
  edital: string | null;
  tipo_empenho: string | null;
  tipo_reajuste: string | null;
  status: string | null;
  valor_total: number | null;
};

type Edital = {
  uuid: string;
  numero: string;
};

const VALORES_INICIAIS: NovoEmpenho = {
  numero: null,
  contrato: null,
  edital: null,
  tipo_empenho: null,
  tipo_reajuste: null,
  status: null,
  valor_total: null,
};

const OPCOES_STATUS = ["Ativo", "Inativo"];
const TIPOS_EMPENHOS = ["Principal", "Reajuste"];
const OPCOES_REAJUSTE = [
  { label: "Alimentações", value: "ALIMENTACOES" },
  { label: "Dietas", value: "DIETAS" },
];

export function CadastroDeEmpenho() {
  const navigate = useNavigate();
  const [contratos, setContratos] = useState<ContratoInterface[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erroAPI, setErroAPI] = useState("");
  const [editais, setEditais] = useState<Edital[]>([]);

  const getContratos = async () => {
    setCarregando(true);
    try {
      const { data } = await getContratosVigentes();

      setContratos(data.results);
    } catch (error) {
      setErroAPI(
        "Erro ao carregar contratos vigentes. Tente novamente mais tarde."
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    getContratos();
  }, []);

  const formataValor = (value: string) => {
    if (!value) return "";
    return `${value}`
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/\.(?=\d{0,2}$)/g, ",");
  };

  const parserValor = (value: string) => {
    if (!value) return "";
    return Number.parseFloat(
      value.replace(/\$\s?|(\.*)/g, "").replace(/(,{1})/g, ".")
    ).toFixed(2);
  };

  const cadastrarEmpenho = async (values: NovoEmpenho) => {
    setCarregando(true);
    try {
      const response = await cadastraEmpenho(values);
      if (response.status === 201 || response.status === 200) {
        toastSuccess("Empenho cadastrado com sucesso!");
        voltarPagina();
      } else {
        toastError(
          "Ocorreu um erro ao cadastrar o empenho. Tente novamente mais tarde."
        );
      }
    } catch (error) {
      toastError(
        "Ocorreu um erro ao cadastrar o empenho. Tente novamente mais tarde."
      );
    } finally {
      setCarregando(false);
    }
  };

  const voltarPagina = () => navigate(`/${MEDICAO_INICIAL}/${EMPENHOS}`);

  return (
    <div className="cadastro-de-empenhos">
      {erroAPI && <div>{erroAPI}</div>}

      <Spin tip="Carregando..." spinning={carregando}>
        {!erroAPI && !carregando ? (
          <div className="card mt-3">
            <div className="card-body">
              <Form
                onSubmit={(values: NovoEmpenho) => cadastrarEmpenho(values)}
                initialValues={VALORES_INICIAIS}
                render={({ submitting, handleSubmit, form, values }) => {
                  const selecionaEdital = (value: string) => {
                    form.change("contrato", value);

                    const editais = contratos
                      .filter((contrato) => contrato.uuid === value)
                      .map((contrato) => contrato?.edital);

                    setEditais(editais);

                    form.change("edital", editais[0]?.uuid);
                  };

                  const selecionaTipoEmpenho = (value: string) => {
                    form.change("tipo_empenho", value);
                    form.change("valor_total", null);
                    form.change("status", null);

                    if (value === "PRINCIPAL")
                      form.change("tipo_reajuste", null);
                  };

                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-4 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="numero"
                            label="Nº do Empenho"
                            placeholder="Digite o nº do empenho"
                            autoComplete="off"
                            component={AInput}
                            validate={required}
                          />
                        </div>

                        <div className="col-4 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="contrato"
                            label="Contrato"
                            component={ASelect}
                            showSearch
                            validate={required}
                            onChange={(value: string) => selecionaEdital(value)}
                            filterOption={(inputValue: string, option: any) =>
                              option.props.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            }
                          >
                            <SelectAntd.Option value="">
                              Selecione um contrato
                            </SelectAntd.Option>

                            {contratos.map((contrato) => (
                              <SelectAntd.Option key={contrato.uuid}>
                                {contrato.numero}
                              </SelectAntd.Option>
                            ))}
                          </Field>
                        </div>

                        <div className="col-4 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="edital"
                            label="Edital"
                            component={ASelect}
                            validate={required}
                            disabled={true}
                          >
                            <SelectAntd.Option value="">
                              Nº do Edital
                            </SelectAntd.Option>

                            {editais.map((edital) => (
                              <SelectAntd.Option key={edital?.uuid}>
                                {edital?.numero}
                              </SelectAntd.Option>
                            ))}
                          </Field>
                        </div>

                        <div className="col-4 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="tipo_empenho"
                            label="Tipo de Empenho"
                            component={ASelect}
                            validate={required}
                            onChange={(value: string) =>
                              selecionaTipoEmpenho(value)
                            }
                          >
                            <SelectAntd.Option value="">
                              Selecione um tipo
                            </SelectAntd.Option>

                            {TIPOS_EMPENHOS.map((tipo) => (
                              <SelectAntd.Option key={tipo.toUpperCase()}>
                                {tipo}
                              </SelectAntd.Option>
                            ))}
                          </Field>
                        </div>

                        {values.tipo_empenho === "REAJUSTE" ? (
                          <div className="col-4 d-flex">
                            <span className="required-asterisk">*</span>
                            <Field
                              name="tipo_reajuste"
                              label="Aplicar Reajuste em"
                              component={ASelect}
                              validate={required}
                            >
                              <SelectAntd.Option value="">
                                Selecione uma tabela
                              </SelectAntd.Option>

                              {OPCOES_REAJUSTE.map((tipo) => (
                                <SelectAntd.Option key={tipo.value}>
                                  {tipo.label}
                                </SelectAntd.Option>
                              ))}
                            </Field>
                          </div>
                        ) : null}

                        <div className="col-4 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="valor_total"
                            label="Valor Total do Empenho"
                            placeholder="Digite o valor do empenho"
                            prefix="R$"
                            component={AInputNumber}
                            min={0}
                            formatter={(value: string) => formataValor(value)}
                            parser={(value: string) => parserValor(value)}
                            validate={required}
                            style={{ width: "100%" }}
                          />
                        </div>

                        <div className="col-4 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="status"
                            label="Status"
                            component={ASelect}
                            validate={required}
                          >
                            <SelectAntd.Option value="">
                              Status
                            </SelectAntd.Option>

                            {OPCOES_STATUS.map((tipo) => (
                              <SelectAntd.Option key={tipo.toUpperCase()}>
                                {tipo}
                              </SelectAntd.Option>
                            ))}
                          </Field>
                        </div>
                      </div>
                      <div className="row justify-content-end">
                        <div className="col-4">
                          <Botao
                            texto="Salvar"
                            type={BUTTON_TYPE.SUBMIT}
                            style={BUTTON_STYLE.GREEN}
                            className="float-end ms-3"
                            disabled={submitting}
                          />
                          <Botao
                            texto="Cancelar"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            className="float-end ms-3"
                            onClick={() => voltarPagina()}
                          />
                        </div>
                      </div>
                    </form>
                  );
                }}
              />
            </div>
          </div>
        ) : null}
      </Spin>
    </div>
  );
}
