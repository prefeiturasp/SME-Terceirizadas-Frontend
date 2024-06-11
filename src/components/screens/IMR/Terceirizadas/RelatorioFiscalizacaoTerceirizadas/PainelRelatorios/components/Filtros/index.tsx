import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Field } from "react-final-form";
import moment from "moment";
import HTTP_STATUS from "http-status-codes";
import Select from "components/Shareable/Select";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import { InputComData } from "components/Shareable/DatePicker";
import CollapseFiltros from "components/Shareable/CollapseFiltros";
import Label from "components/Shareable/Label";
import { getEscolasTercTotal } from "services/escola.service";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getListaFiltradaAutoCompleteSelect } from "helpers/autoCompleteSelect";
import { dateDelta } from "helpers/utilities.js";

import {
  EscolaOptionsInterface,
  FiltrosRelatoriosVisitasInterface,
  RelatorioVisitaItemListagem,
} from "interfaces/imr.interface";
import { ResponseDiretoriasRegionaisSimplissimaInterface } from "interfaces/responses.interface";
import { DiretoriaRegionalInterface } from "interfaces/escola.interface";

import "./styles.scss";
import { Spin } from "antd";

interface Props {
  setFiltros: Dispatch<SetStateAction<FiltrosRelatoriosVisitasInterface>>;
  setRelatoriosVisita: Dispatch<SetStateAction<RelatorioVisitaItemListagem[]>>;
  setConsultaRealizada: Dispatch<SetStateAction<boolean>>;
}

export const Filtros: React.FC<Props> = ({
  setFiltros,
  setRelatoriosVisita,
  setConsultaRealizada,
}) => {
  const [diretoriasRegionais, setDiretoriasRegionais] = useState<
    { nome: string; uuid: string }[]
  >([]);
  const [escolas, setEscolas] = useState<EscolaOptionsInterface[]>([]);
  const [loadingEscolas, setLoadingEscolas] = useState(false);

  const buscarListaDREsAsync = async (): Promise<void> => {
    const response: ResponseDiretoriasRegionaisSimplissimaInterface =
      await getDiretoriaregionalSimplissima();
    if (response.status === HTTP_STATUS.OK) {
      setDiretoriasRegionais(
        response.data.results.map((dre: DiretoriaRegionalInterface) => {
          return {
            nome: dre.nome,
            uuid: dre.uuid,
          };
        })
      );
    }
  };

  const buscarListaEscolas = async (dreUuid: string): Promise<void> => {
    setLoadingEscolas(true);
    const response = await getEscolasTercTotal({ dre: dreUuid });
    if (response.status === HTTP_STATUS.OK) {
      setEscolas(
        response.data.map((escola: EscolaOptionsInterface) => {
          return {
            nome: `${escola.codigo_eol} - ${escola.nome}`,
            uuid: escola.uuid,
          };
        })
      );
    }
    setLoadingEscolas(false);
  };

  const optionsCampoUnidade = (values: Record<string, any>) =>
    getListaFiltradaAutoCompleteSelect(
      escolas.map((e) => e.nome),
      values.unidade_educacional,
      true
    );

  const onSubmit = (values: FiltrosRelatoriosVisitasInterface) => {
    const filtros = {
      unidade_educacional:
        escolas.find(buscarEscolaPeloNome(values))?.uuid ?? "",
      data_inicial: values.data_inicial ?? "",
      data_final: values.data_final ?? "",
    };

    setFiltros(filtros);
  };

  const buscarEscolaPeloNome =
    (values: Record<string, any>) =>
    ({ nome }) =>
      nome === values.unidade_educacional;

  const onClear = () => {
    setRelatoriosVisita([]);
    setFiltros({} as FiltrosRelatoriosVisitasInterface);
    setConsultaRealizada(false);
  };

  useEffect(() => {
    buscarListaDREsAsync();
  }, []);

  const LOADING = !diretoriasRegionais;
  return (
    <Spin tip="Carregando..." spinning={LOADING}>
      <div className="filtros-relatorios-visita">
        <CollapseFiltros
          onSubmit={onSubmit}
          onClear={onClear}
          titulo="Filtrar Resultados"
        >
          {(values) => (
            <>
              <div className="row">
                <div className="col-6">
                  <Field
                    component={Select}
                    options={[
                      { nome: "Selecione uma DRE", uuid: "" },
                      ...diretoriasRegionais,
                    ]}
                    name="diretoria_regional"
                    label="Diretoria Regional de Educação"
                    onChangeEffect={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      buscarListaEscolas(value);
                    }}
                  />
                </div>
                <div className="col-6">
                  <Spin tip="Carregando..." spinning={loadingEscolas}>
                    <Field
                      component={AutoCompleteSelectField}
                      options={optionsCampoUnidade(values)}
                      label="Filtrar por Unidade Educacional"
                      name="unidade_educacional"
                      placeholder="Selecione uma Unidade"
                      disabled={!values.diretoria_regional || loadingEscolas}
                    />
                  </Spin>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <Label
                      content="Filtrar por Data da Visita"
                      className="p-0"
                    />
                  </div>
                  <div className="row">
                    <div className="col ps-0">
                      <Field
                        component={InputComData}
                        className="input-data"
                        name="data_inicial"
                        placeholder="DE"
                        minDate={null}
                        maxDate={
                          values.data_final
                            ? moment(values.data_final, "DD/MM/YYYY").toDate()
                            : dateDelta(0)
                        }
                      />
                    </div>
                    <div className="col pe-0">
                      <Field
                        component={InputComData}
                        className="input-data"
                        name="data_final"
                        placeholder="ATÉ"
                        minDate={
                          values.data_inicial
                            ? moment(values.data_inicial, "DD/MM/YYYY").toDate()
                            : null
                        }
                        maxDate={dateDelta(0)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </CollapseFiltros>
      </div>
    </Spin>
  );
};
