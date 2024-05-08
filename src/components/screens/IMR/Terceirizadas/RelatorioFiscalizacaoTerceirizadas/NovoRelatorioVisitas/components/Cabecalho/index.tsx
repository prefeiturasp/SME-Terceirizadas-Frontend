import Select from "components/Shareable/Select";
import { Spin } from "antd";
import { required } from "helpers/fieldValidators";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Field } from "react-final-form";
import HTTP_STATUS from "http-status-codes";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getEscolasTercTotal } from "services/escola.service";
import AutoCompleteField from "components/Shareable/AutoCompleteField";

export const Cabecalho = ({ ...props }) => {
  const [diretoriasRegionais, setDiretoriasRegionais] =
    useState<{ nome: string; uuid: string }[]>();
  const [escolas, setEscolas] = useState<{ label: string; value: string }[]>(
    []
  );

  const [loadingDREs, setLoadingDREs] = useState(true);
  const [loadingEscolas, setLoadingEscolas] = useState(false);

  const [erroAPI, setErroAPI] = useState("");

  const { values } = props;

  const getDiretoriasRegionaisAsync = async () => {
    setLoadingDREs(true);
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
    setLoadingDREs(false);
  };

  const getEscolasTercTotalAsync = async (dreUuid: string) => {
    setLoadingEscolas(true);
    const response = await getEscolasTercTotal({ dre: dreUuid });
    if (response.status === HTTP_STATUS.OK) {
      setEscolas(
        response.data.map(
          (escola: { uuid: string; codigo_eol: string; nome: string }) => {
            return {
              label: `${escola.codigo_eol} - ${escola.nome}`,
              value: `${escola.codigo_eol} - ${escola.nome}`,
            };
          }
        )
      );
    } else {
      setErroAPI("Erro ao carregar escolas. Tente novamente mais tarde.");
    }
    setLoadingEscolas(false);
  };

  useEffect(() => {
    getDiretoriasRegionaisAsync();
  }, []);

  return (
    <>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && (
        <Spin tip="Carregando..." spinning={loadingDREs}>
          {diretoriasRegionais && (
            <div className="cabecalho">
              <h2>Dados da Unidade Educacional</h2>
              <div className="row">
                <div className="col-5">
                  <Field
                    className="diretoria-regional-select"
                    component={Select}
                    options={[
                      { nome: "Selecione uma DRE", uuid: "" },
                      ...diretoriasRegionais,
                    ]}
                    name="diretoria_regional"
                    label="Diretoria Regional"
                    validate={required}
                    required
                    onChangeEffect={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
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
                      label="Pesquisar por Código EOL e/ou Unidade Educacional"
                      placeholder={"Selecione uma unidade educacional"}
                      required
                      disabled={!values.diretoria_regional || loadingEscolas}
                    />
                  </Spin>
                </div>
              </div>
            </div>
          )}
        </Spin>
      )}
    </>
  );
};
