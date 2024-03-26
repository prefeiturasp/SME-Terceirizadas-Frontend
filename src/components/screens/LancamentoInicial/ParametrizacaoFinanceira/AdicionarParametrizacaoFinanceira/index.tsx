import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";

import { Skeleton, Table } from "antd";
import Column from "antd/es/table/Column";

import { required } from "helpers/fieldValidators";

import { getNumerosEditais } from "services/edital.service";
import { getLotesSimples } from "services/lote.service";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";

import { Select } from "components/Shareable/Select";
import { Botao } from "components/Shareable/Botao";
import { AInput, AInputNumber } from "components/Shareable/MakeField";

import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

import {
  formataValorDecimal,
  parserValorDecimal,
} from "components/screens/helper";

import "./style.scss";

type SelectOption = {
  uuid: string | Array<string>;
  nome: string;
};

type FormValues = {
  edital: string;
  lote: string;
  tipos_unidades: string;
};

export default () => {
  const [editais, setEditais] = useState<SelectOption[]>([]);
  const [lotes, setLotes] = useState<SelectOption[]>([]);
  const [tiposUnidadesOpcoes, setTiposUnidadesOpcoes] = useState<
    SelectOption[]
  >([]);
  const [tiposUnidades, setTiposUnidades] = useState([]);
  const [tiposAlimentacao, setTiposAlimentacao] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroAPI, setErroAPI] = useState("");

  const navigate = useNavigate();

  const getEditaisAsync = async () => {
    try {
      const { data } = await getNumerosEditais();
      setEditais(
        data.results.map((edital) => ({
          uuid: edital.uuid,
          nome: edital.numero,
        }))
      );
    } catch (error) {
      setErroAPI("Erro ao carregar editais. Tente novamente mais tarde.");
    }
  };

  const getLotesAsync = async () => {
    try {
      const { data } = await getLotesSimples();
      const lotes = data.results;
      const lotesOrdenados = lotes.sort((loteA, loteB) => {
        return loteA.diretoria_regional.nome < loteB.diretoria_regional.nome;
      });
      setLotes(
        [
          {
            uuid: null,
            nome: "Selecione um lote e uma DRE",
          },
        ].concat(
          lotesOrdenados.map((lote) => ({
            uuid: lote.uuid,
            nome: `${lote.nome} - ${lote.diretoria_regional.nome}`,
          }))
        )
      );
    } catch (error) {
      setErroAPI("Erro ao carregar lotes. Tente novamente mais tarde.");
    }
  };

  const getGruposTiposUnidades = (tiposUnidades) => {
    const grupos = [
      ["CEI", "CEI CEU", "CCI"],
      ["CEMEI", "CEU CEMEI"],
      ["EMEF", "CEU EMEF", "EMEFM", "CIEJA", "CEU GESTAO"],
      ["EMEBS"],
      ["EMEI", "CEU EMEI"],
    ];

    const getTipoUnidadeUUID = (tipoUnidade) =>
      tiposUnidades.find((t) => t.iniciais.toUpperCase() === tipoUnidade).uuid;

    return grupos.map((grupo) => {
      const uuid = grupo.map(getTipoUnidadeUUID).join(",");
      const nome = grupo.join(", ");
      return {
        uuid,
        nome,
      };
    });
  };

  const getTiposUnidadeEscolarAsync = async () => {
    const response = await getTiposUnidadeEscolar();
    if (response.status === 200) {
      setTiposUnidades(response.data.results);
      setTiposUnidadesOpcoes(
        [
          {
            uuid: null,
            nome: "Selecione o tipo de unidade",
          },
        ].concat(getGruposTiposUnidades(response.data.results))
      );
    } else {
      setErroAPI(
        "Erro ao carregar tipos de unidades. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    setCarregando(true);
    Promise.all([
      getEditaisAsync(),
      getLotesAsync(),
      getTiposUnidadeEscolarAsync(),
    ]).then(() => {
      setCarregando(false);
    });
  }, []);

  const onSubmit = (values: FormValues) => {
    // eslint-disable-next-line
    console.log(values);
  };

  const renderTabelas = (unidades: string) => {
    const tiposAlimentacao: Array<{
      uuid: string;
      nome: string;
    }> = unidades.split(",").reduce((acc, tipoUnidade) => {
      acc.push(
        ...tiposUnidades
          .find((t) => t.uuid === tipoUnidade)
          .periodos_escolares.reduce((acc, periodoEscolar) => {
            acc.push(...periodoEscolar.tipos_alimentacao);
            return acc;
          }, [])
      );
      return acc;
    }, []);

    const tiposAlimentacaoUnicos = {};

    tiposAlimentacao.forEach((tipoAlimentacao) => {
      tiposAlimentacaoUnicos[tipoAlimentacao.uuid] = tipoAlimentacao.nome;
    });

    setTiposAlimentacao(
      Object.entries(tiposAlimentacaoUnicos).map(([uuid, nome]) => ({
        uuid,
        nome,
      }))
    );
  };

  return (
    <>
      {erroAPI && <div>{erroAPI}</div>}
      <div className="card">
        <div className="card-body">
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-4">
                    {carregando ? (
                      <Skeleton paragraph={false} active />
                    ) : (
                      <Field
                        component={Select}
                        name="edital"
                        label="Nº do Edital"
                        naoDesabilitarPrimeiraOpcao
                        options={[
                          { uuid: null, nome: "Selecione um edital" },
                        ].concat(editais)}
                        validate={required}
                        required
                      />
                    )}
                  </div>

                  <div className="col-8">
                    {carregando ? (
                      <Skeleton paragraph={false} active />
                    ) : (
                      <Field
                        component={Select}
                        name="lote"
                        label="Lote e DRE"
                        naoDesabilitarPrimeiraOpcao
                        options={lotes}
                        validate={required}
                        required
                      />
                    )}
                  </div>

                  <div className="col-4">
                    {carregando ? (
                      <Skeleton paragraph={false} active />
                    ) : (
                      <Field
                        component={Select}
                        name="tipos_unidades"
                        label="Tipo de Unidade"
                        naoDesabilitarPrimeiraOpcao
                        options={tiposUnidadesOpcoes}
                        validate={required}
                        required
                        onChangeEffect={(e: ChangeEvent<HTMLInputElement>) =>
                          renderTabelas(e.target.value)
                        }
                      />
                    )}
                  </div>
                </div>
                {tiposAlimentacao.length > 0 && (
                  <div className="row mt-5">
                    <div className="col-4">
                      <h2 className="text-start texto-simples-verde fw-bold">
                        Preço das Alimentações Convencionais
                      </h2>
                      <Table
                        pagination={false}
                        bordered
                        dataSource={tiposAlimentacao}
                      >
                        <Column
                          title="Tipo de Alimentação"
                          dataIndex="nome"
                          key="nome"
                          render={(value, record: any) => {
                            return (
                              <div className="d-flex gap-4 justify-content-between align-items-center">
                                <p className="fw-bold mb-0">{value}</p>
                                <Field
                                  component="input"
                                  name={`tabelas.alimentacao.${value}.lanche`}
                                  type="hidden"
                                  defaultValue={record.uuid}
                                />
                                <Field
                                  component={AInput}
                                  name={`tabelas.alimentacao.${value}.grupo`}
                                />
                              </div>
                            );
                          }}
                        />
                        <Column
                          title="Valor Unitário"
                          dataIndex="valor_unitario"
                          key="valor_unitario"
                          render={(_, record: any) => (
                            <Field
                              component={AInputNumber}
                              name={`tabelas.alimentacao.${record.nome}.valor_unitario`}
                              placeholder="0,00"
                              min={0}
                              formatter={(value: string) =>
                                formataValorDecimal(value)
                              }
                              parser={(value: string) =>
                                parserValorDecimal(value)
                              }
                            />
                          )}
                        />
                        <Column
                          title="Valor Unitário Reajuste"
                          dataIndex="valor_unitario_reajuste"
                          key="valor_unitario_reajuste"
                          render={(_, record: any) => (
                            <Field
                              component={AInputNumber}
                              name={`tabelas.alimentacao.${record.nome}.valor_unitario_reajuste`}
                              placeholder="0,00"
                              min={0}
                              formatter={(value: string) =>
                                formataValorDecimal(value)
                              }
                              parser={(value: string) =>
                                parserValorDecimal(value)
                              }
                            />
                          )}
                        />
                      </Table>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-end gap-3">
                  <Botao
                    texto="Cancelar"
                    onClick={() => {
                      navigate(-1);
                    }}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto="Salvar"
                    style={BUTTON_STYLE.GREEN}
                    type={BUTTON_TYPE.SUBMIT}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </>
  );
};
