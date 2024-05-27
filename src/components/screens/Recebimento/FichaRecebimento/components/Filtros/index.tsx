import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Field } from "react-final-form";
import moment from "moment";
import { NavLink } from "react-router-dom";

import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import { RECEBIMENTO, CADASTRO_FICHA_RECEBIMENTO } from "configs/constants";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import { InputText } from "components/Shareable/Input/InputText";
import { InputComData } from "components/Shareable/DatePicker";
import CollapseFiltros from "components/Shareable/CollapseFiltros";
import Label from "components/Shareable/Label";
import { getListaCompletaProdutosLogistica } from "services/produto.service";
import { listaSimplesTerceirizadas } from "services/terceirizada.service";
import { getListaFiltradaAutoCompleteSelect } from "helpers/autoCompleteSelect";
import { ProdutoLogistica } from "interfaces/produto.interface";
import { TerceirizadaSimplesInterface } from "interfaces/terceirizada.interface";
import { dateDelta } from "helpers/utilities.js";

import {
  FichaDeRecebimentoItemListagem,
  FiltrosFichaRecebimento,
} from "../../interfaces";

import "./styles.scss";

interface Props {
  setFiltros: Dispatch<SetStateAction<FiltrosFichaRecebimento>>;
  setFichasRecebimento: Dispatch<
    SetStateAction<FichaDeRecebimentoItemListagem[]>
  >;
  setConsultaRealizada: Dispatch<SetStateAction<boolean>>;
}

const Filtros: React.FC<Props> = ({
  setFiltros,
  setFichasRecebimento,
  setConsultaRealizada,
}) => {
  const [produtos, setProdutos] = useState<ProdutoLogistica[]>([]);
  const [empresas, setEmpresas] = useState<TerceirizadaSimplesInterface[]>([]);

  const buscarListaProdutos = async (): Promise<void> => {
    const response = await getListaCompletaProdutosLogistica();
    setProdutos(response.data.results);
  };

  const buscarListaEmpresas = async (): Promise<void> => {
    const response = await listaSimplesTerceirizadas();
    setEmpresas(response.data.results);
  };

  const optionsCampoProdutos = (values: Record<string, any>) =>
    getListaFiltradaAutoCompleteSelect(
      produtos.map((e) => e.nome),
      values.nome_produto,
      true
    );

  const optionsCampoEmpresa = (values: Record<string, any>) =>
    getListaFiltradaAutoCompleteSelect(
      empresas.map((e) => e.nome_fantasia),
      values.nome_empresa,
      true
    );

  const onSubmit = (values: Record<string, any>): void => {
    let filtros = { ...values };

    if (values.data_inicial)
      filtros.data_inicial = moment(values.data_inicial, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

    if (values.data_final)
      filtros.data_final = moment(values.data_final, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

    setFiltros(filtros);
  };

  const onClear = () => {
    setFichasRecebimento([]);
    setConsultaRealizada(false);
    setFiltros({});
  };

  useEffect(() => {
    buscarListaProdutos();
    buscarListaEmpresas();
  }, []);

  return (
    <div className="filtros-ficha-recebimento">
      <CollapseFiltros onSubmit={onSubmit} onClear={onClear}>
        {(values) => (
          <>
            <div className="row">
              <div className="col-6">
                <Field
                  component={InputText}
                  label="Filtrar por Nº do Cronograma"
                  name="numero_cronograma"
                  placeholder="Digite o Nº do Cronograma"
                />
              </div>

              <div className="col-6">
                <Field
                  component={AutoCompleteSelectField}
                  options={optionsCampoProdutos(values)}
                  label="Filtrar por Produto"
                  name="nome_produto"
                  placeholder="Selecione um Produto"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <Field
                  component={AutoCompleteSelectField}
                  options={optionsCampoEmpresa(values)}
                  label="Filtrar por Empresa"
                  name="nome_empresa"
                  placeholder="Selecione uma Empresa"
                />
              </div>
              <div className="col-6">
                <div className="row">
                  <Label content="Filtrar por Período" className="p-0" />
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

      <div className="pt-4 pb-4">
        <NavLink to={`/${RECEBIMENTO}/${CADASTRO_FICHA_RECEBIMENTO}`}>
          <Botao
            texto="Cadastrar Recebimento"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            onClick={() => {}}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Filtros;
