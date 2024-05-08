import Select from "components/Shareable/Select";
import moment from "moment";
import { Spin } from "antd";
import { required } from "helpers/fieldValidators";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Field } from "react-final-form";
import HTTP_STATUS from "http-status-codes";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getEscolasTercTotal } from "services/escola.service";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { InputText } from "components/Shareable/Input/InputText";
import { getPeriodosVisita } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { InputComData } from "components/Shareable/DatePicker";

export const Cabecalho = ({ ...props }) => {
  const [diretoriasRegionais, setDiretoriasRegionais] =
    useState<{ nome: string; uuid: string }[]>();
  const [escolas, setEscolas] = useState<
    {
      label: string;
      value: string;
      lote_nome: string;
      terceirizada: string;
      uuid: string;
    }[]
  >([]);
  const [periodosVisita, setPeriodosVisita] =
    useState<{ nome: string; uuid: string }[]>();

  const [loadingEscolas, setLoadingEscolas] = useState(false);

  const [erroAPI, setErroAPI] = useState("");

  const { form, values } = props;

  const getDiretoriasRegionaisAsync = async () => {
    const response = await getDiretoriaregionalSimplissima();
    if (response.status === HTTP_STATUS.OK) {
      setDiretoriasRegionais(
        response.data.results.map((dre: { nome: string; uuid: string }) => {
          return {
            nome: dre.nome,
            uuid: dre.uuid,
          };
        })
      );
    } else {
      setErroAPI("Erro ao carregar DREs. Tente novamente mais tarde.");
    }
  };

  const getEscolasTercTotalAsync = async (dreUuid: string) => {
    setLoadingEscolas(true);
    const response = await getEscolasTercTotal({ dre: dreUuid });
    if (response.status === HTTP_STATUS.OK) {
      setEscolas(
        response.data.map(
          (escola: {
            uuid: string;
            codigo_eol: string;
            nome: string;
            lote_nome: string;
            terceirizada: string;
          }) => {
            return {
              label: `${escola.codigo_eol} - ${escola.nome}`,
              value: `${escola.codigo_eol} - ${escola.nome}`,
              uuid: escola.uuid,
              lote_nome: escola.lote_nome,
              terceirizada: escola.terceirizada,
            };
          }
        )
      );
    } else {
      setErroAPI("Erro ao carregar escolas. Tente novamente mais tarde.");
    }
    setLoadingEscolas(false);
  };

  const getPeriodosVisitaAsync = async () => {
    const response = await getPeriodosVisita();
    /*if (response.status === HTTP_STATUS.OK) {
      setPeriodosVisita(response.data.results);
    } else {
      setErroAPI("Erro ao carregar DREs. Tente novamente mais tarde.");
    }*/
    setPeriodosVisita(response);
  };

  const requisicoesPreRender = async () => {
    await Promise.all([
      getDiretoriasRegionaisAsync(),
      getPeriodosVisitaAsync(),
    ]);
  };

  useEffect(() => {
    requisicoesPreRender();
  }, []);

  const LOADING = !diretoriasRegionais || !periodosVisita;

  return (
    <>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && (
        <Spin tip="Carregando..." spinning={LOADING}>
          {!LOADING && (
            <div className="cabecalho">
              <div className="row">
                <div className="col-12">
                  <h2 className="mt-2 mb-4">Dados da Unidade Educacional</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <Field
                    component={Select}
                    options={[
                      { nome: "Selecione uma DRE", uuid: "" },
                      ...diretoriasRegionais,
                    ]}
                    name="diretoria_regional"
                    label="Diretoria Regional de Educação"
                    validate={required}
                    required
                    onChangeEffect={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      form.change("escola", undefined);
                      form.change("lote", undefined);
                      form.change("terceirizada", undefined);
                      getEscolasTercTotalAsync(value);
                    }}
                  />
                </div>
                <div className="col-7">
                  <Spin tip="Carregando..." spinning={loadingEscolas}>
                    <Field
                      component={AutoCompleteField}
                      options={escolas}
                      filterOption={(
                        inputValue: string,
                        option: { label: string }
                      ) =>
                        option!.label
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      name="escola"
                      label="Unidade Educacional"
                      placeholder={"Selecione uma Unidade"}
                      required
                      disabled={!values.diretoria_regional || loadingEscolas}
                      inputOnChange={(value: string) => {
                        form.change(
                          "lote",
                          escolas.find((e) => e.value === value)?.lote_nome
                        );
                        form.change(
                          "terceirizada",
                          escolas.find((e) => e.value === value)?.terceirizada
                        );
                      }}
                    />
                  </Spin>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Field
                    component={InputText}
                    label="Lote"
                    name="lote"
                    placeholder="Lote da Unidade"
                    required
                    validate={required}
                    disabled
                  />
                </div>
                <div className="col-8">
                  <Field
                    component={InputText}
                    label="Empresa Terceirizada"
                    name="terceirizada"
                    required
                    validate={required}
                    placeholder="Nome da Empresa Prestadora de Serviço"
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <hr />
                  <h2 className="mt-2 mb-4">Dados da Visita</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Field
                    component={InputComData}
                    name="data"
                    label="Data da Visita"
                    minDate={null}
                    maxDate={moment().toDate()}
                    required
                    validate={required}
                  />
                </div>
                <div className="col-4">
                  <Field
                    component={Select}
                    options={[
                      { nome: "Selecione um Período", uuid: "" },
                      ...periodosVisita,
                    ]}
                    naoDesabilitarPrimeiraOpcao
                    name="periodo_visita"
                    label="Período de Visita"
                    validate={required}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </Spin>
      )}
    </>
  );
};
