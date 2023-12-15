import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import moment from "moment";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import {
  CADASTRO_DOCUMENTOS_RECEBIMENTO,
  PRE_RECEBIMENTO,
} from "../../../../../../configs/constants";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import { InputComData } from "components/Shareable/DatePicker";
import { getListaCronogramasPraCadastro } from "../../../../../../services/cronograma.service";
import { getListaCompletaProdutosLogistica } from "../../../../../../services/produto.service";
import { getListaFiltradaAutoCompleteSelect } from "../../../../../../helpers/autoCompleteSelect";
import { FiltrosDocumentosRecebimento } from "../../interfaces";
import { ProdutoLogistica } from "interfaces/produto.interface";
import {
  CronogramaSimples,
  DocumentosRecebimento,
} from "interfaces/pre_recebimento.interface";

const FORM_NAME = "filtrosDocumentosRecebimento";

interface Props {
  setFiltros: Dispatch<SetStateAction<FiltrosDocumentosRecebimento>>;
  setDocumentos: Dispatch<SetStateAction<DocumentosRecebimento[]>>;
  setConsultaRealizada: Dispatch<SetStateAction<boolean>>;
}

const Filtros: React.FC<Props> = ({
  setFiltros,
  setDocumentos,
  setConsultaRealizada,
}) => {
  const [dadosCronogramas, setDadosCronogramas] = useState<
    Array<CronogramaSimples>
  >([]);
  const [listaProdutos, setListaProdutos] = useState<Array<ProdutoLogistica>>(
    []
  );

  const buscarListaProdutos = async (): Promise<void> => {
    const response = await getListaCompletaProdutosLogistica();
    setListaProdutos(response.data.results);
  };

  const buscarDadosCronogramas = async (): Promise<void> => {
    const response = await getListaCronogramasPraCadastro();
    setDadosCronogramas(response.data.results);
  };

  const opcoesStatus = [
    {
      label: "Enviado para Análise",
      value: "ENVIADO_PARA_ANALISE",
    },
    {
      label: "Solicitada Correção",
      value: "ENVIADO_PARA_CORRECAO",
    },
    {
      label: "Aprovado",
      value: "APROVADO",
    },
  ];

  const onSubmit = async (values: Record<string, any>): Promise<void> => {
    let filtros = { ...values };
    if (values.data_criacao) {
      delete filtros.data_criacao;
      filtros.data_cadastro = moment(values.data_criacao, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
    }
    setFiltros(filtros);
  };

  useEffect(() => {
    buscarDadosCronogramas();
    buscarListaProdutos();
  }, []);

  return (
    <div className="filtros-documentos-recebimento">
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
                    listaProdutos.map((e) => e.nome),
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
                  component={MultiSelect}
                  disableSearch
                  options={opcoesStatus}
                  label="Filtrar por Status"
                  name="status"
                  nomeDoItemNoPlural="Status"
                  placeholder="Selecione os Status"
                />
              </div>

              <div className="col-6 mt-2">
                <Field
                  component={InputComData}
                  className="input-data"
                  label="Filtrar por Data da Criação"
                  name="data_criacao"
                  placeholder="Selecione a Data de Criação"
                  writable={false}
                  minDate={null}
                  maxDate={null}
                />
              </div>
            </div>

            <div className="pt-4 pb-4">
              <NavLink
                to={`/${PRE_RECEBIMENTO}/${CADASTRO_DOCUMENTOS_RECEBIMENTO}`}
              >
                <Botao
                  texto="Cadastrar Documentos"
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
                  setDocumentos([]);
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

export default Filtros;
