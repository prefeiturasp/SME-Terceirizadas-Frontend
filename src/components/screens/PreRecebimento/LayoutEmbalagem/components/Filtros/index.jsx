import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import "./style.scss";
import { NavLink } from "react-router-dom";
import {
  CADASTRO_LAYOUT_EMBALAGEM,
  PRE_RECEBIMENTO,
} from "../../../../../../configs/constants";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import { getListaCronogramasPraCadastro } from "../../../../../../services/cronograma.service";
import { getListaFiltradaAutoCompleteSelect } from "../../../../../../helpers/autoCompleteSelect";

const FORM_NAME = "filtrosLayoutsEmbalagens";

export default ({ setFiltros, setLayoutsEmbalagens, setConsultaRealizada }) => {
  const [dadosCronogramas, setDadosCronogramas] = useState([]);

  const buscarDadosCronogramas = async () => {
    const response = await getListaCronogramasPraCadastro();
    setDadosCronogramas(response.data.results);
  };

  const opcoesStatus = [
    {
      label: "Enviado para Análise",
      value: "ENVIADO_PARA_ANALISE",
    },
    {
      label: "Aprovado",
      value: "APROVADO",
    },
    {
      label: "Pendente de Correção",
      value: "SOLICITADO_CORRECAO",
    },
  ];

  const onSubmit = async (values) => {
    setFiltros({ ...values });
  };

  useEffect(() => {
    buscarDadosCronogramas();
  }, []);

  return (
    <div className="filtros-layouts-embalagens">
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ form, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />
            <div className="row">
              <div className="col-6 mt-2">
                <Field
                  component={AutoCompleteSelectField}
                  options={getListaFiltradaAutoCompleteSelect(
                    dadosCronogramas.map((e) => e.numero),
                    values.numero_cronograma
                  )}
                  label="Filtrar por Nº do Cronograma"
                  name="numero_cronograma"
                  placeholder="Digite o Nº do Cronograma"
                />
              </div>

              <div className="col-6 mt-2">
                <Field
                  component={AutoCompleteSelectField}
                  options={getListaFiltradaAutoCompleteSelect(
                    dadosCronogramas.map((e) => e.nome_produto),
                    values.nome_produto,
                    true
                  )}
                  label="Filtrar por Nome do Produto"
                  name="nome_produto"
                  placeholder="Selecione um Produto"
                />
              </div>

              <div className="col-6 mt-2">
                <Field
                  component={AutoCompleteSelectField}
                  options={getListaFiltradaAutoCompleteSelect(
                    dadosCronogramas.map((e) => e.pregao_chamada_publica),
                    values.pregao_chamada_publica
                  )}
                  label="Filtrar por Nº do Pregão/Chamada Pública"
                  name="pregao_chamada_publica"
                  placeholder="Digite o Nº do Pregão/Chamada Pública"
                />
              </div>

              <div className="col-6 mt-2">
                <Field
                  component={MultiSelect}
                  disableSearch
                  options={opcoesStatus}
                  label="Filtrar por Status"
                  name="status"
                  nomeDoItemNoPlural="Status"
                  placeholder="Selecione os Status"
                />
              </div>
            </div>

            <div className="pt-4 pb-4">
              <NavLink to={`/${PRE_RECEBIMENTO}/${CADASTRO_LAYOUT_EMBALAGEM}`}>
                <Botao
                  texto="Cadastrar Layout de Embalagem"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN}
                />
              </NavLink>

              <Botao
                texto="Filtrar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-end ms-3"
              />

              <Botao
                texto="Limpar Filtros"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-end ms-3"
                onClick={() => {
                  form.reset({});
                  setLayoutsEmbalagens([]);
                  setConsultaRealizada(false);
                  setFiltros({});
                }}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};
