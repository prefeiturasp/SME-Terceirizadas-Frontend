import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { ASelect, AInput, AInputNumber } from "components/Shareable/MakeField";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { Select as SelectAntd, Spin } from "antd";
import { required } from "helpers/fieldValidators";
import { getNumerosEditais } from "services/edital.service";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import { MEDICAO_INICIAL, CLAUSULAS_PARA_DESCONTOS } from "configs/constants";
import "./styles.scss";
import { ClausulaParaDescontoInterface } from "interfaces/clausulas_para_descontos.interface";
import { cadastraClausulaParaDesconto } from "services/medicaoInicial/clausulasParaDescontos.service";
import { formataValorDecimal, parserValorDecimal } from "../../helper.js";
import { getError } from "helpers/utilities";

const VALORES_INICIAIS: ClausulaParaDescontoInterface = {
  edital: null,
  numero_clausula: null,
  item_clausula: null,
  porcentagem_desconto: null,
  descricao: null,
};

type Edital = {
  uuid: string;
  numero: string;
};

export function CadastroDeClausulas() {
  const navigate = useNavigate();

  const [editais, setEditais] = useState<Edital[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erroAPI, setErroAPI] = useState("");

  const getEditaisAsync = async () => {
    setCarregando(true);
    try {
      const response = await getNumerosEditais();
      setEditais(response.data.results);
    } catch (error) {
      setErroAPI("Erro ao carregar editais. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  const cadastrarClausulaParaDesconto = async (
    values: ClausulaParaDescontoInterface
  ) => {
    setCarregando(true);
    try {
      await cadastraClausulaParaDesconto(values);
      toastSuccess("Cláusula cadastrada com sucesso!");
      voltarPagina();
    } catch ({ response }) {
      toastError(getError(response.data));
    } finally {
      setCarregando(false);
    }
  };

  const voltarPagina = () =>
    navigate(`/${MEDICAO_INICIAL}/${CLAUSULAS_PARA_DESCONTOS}`);

  useEffect(() => {
    getEditaisAsync();
  }, []);

  return (
    <div className="cadastro-de-clausulas">
      {erroAPI && <div>{erroAPI}</div>}

      <Spin tip="Carregando..." spinning={carregando}>
        {!erroAPI && !carregando ? (
          <div className="card mt-3">
            <div className="card-body">
              <Form
                onSubmit={(values: ClausulaParaDescontoInterface) =>
                  cadastrarClausulaParaDesconto(values)
                }
                initialValues={VALORES_INICIAIS}
                render={({ submitting, handleSubmit, form }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-3 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="edital"
                            label="Nº do Edital"
                            component={ASelect}
                            showSearch
                            validate={required}
                            onChange={(value: string) =>
                              form.change("edital", value)
                            }
                            filterOption={(inputValue: string, option: any) =>
                              option.props.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            }
                          >
                            <SelectAntd.Option value="">
                              Selecione o edital
                            </SelectAntd.Option>

                            {editais.map((edital) => (
                              <SelectAntd.Option key={edital.uuid}>
                                {edital.numero}
                              </SelectAntd.Option>
                            ))}
                          </Field>
                        </div>

                        <div className="col-3 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="numero_clausula"
                            label="Nº da Cláusula"
                            placeholder="Ex. 7.1.1"
                            autoComplete="off"
                            component={AInput}
                            validate={required}
                          />
                        </div>

                        <div className="col-3 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="item_clausula"
                            label="Item da Cláusula"
                            placeholder="Ex. a"
                            autoComplete="off"
                            component={AInput}
                            validate={required}
                          />
                        </div>

                        <div className="col-3 d-flex">
                          <span className="required-asterisk">*</span>
                          <Field
                            name="porcentagem_desconto"
                            label="% de Desconto"
                            placeholder="Apenas números"
                            component={AInputNumber}
                            min={0}
                            formatter={(value: string) =>
                              formataValorDecimal(value)
                            }
                            parser={(value: string) =>
                              parserValorDecimal(value)
                            }
                            validate={required}
                            style={{ width: "100%" }}
                          />
                        </div>

                        <div className="col-12 d-flex">
                          <Field
                            name="descricao"
                            label="Descrição"
                            placeholder="Texto da cláusula"
                            required
                            component={TextArea}
                            validate={required}
                            height="200"
                          />
                        </div>
                      </div>

                      <div className="row justify-content-end mt-5">
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
