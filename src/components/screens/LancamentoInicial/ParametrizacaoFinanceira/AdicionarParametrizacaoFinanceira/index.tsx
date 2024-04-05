import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { Modal } from "react-bootstrap";

import { TextArea } from "components/Shareable/TextArea/TextArea";

import { Botao } from "components/Shareable/Botao";

import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

import "./style.scss";
import TabelaAlimentacao from "./components/TabelaAlimentacao";
import Filtros from "./components/Filtros";
import TabelaDietaTipoA from "./components/TabelaDietaTipoA";
import TabelaDietaTipoB from "./components/TabelaDietaTipoB";
import ParametrizacaoFinanceiraService from "services/medicaoInicial/parametrizacao_financeira.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

type FormValues = {
  edital: string;
  lote: string;
  tipos_unidades: string;
  tabelas: Record<string, any>;
  legenda: string;
};

export default () => {
  const [tiposAlimentacao, setTiposAlimentacao] = useState([]);
  const [showModalCancelar, setShowModalCancelar] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    const tabelas = Object.entries(values.tabelas).map(([tabela, valores]) => ({
      nome: tabela,
      valores: Object.values(valores).map((valor: any) => {
        const { tipo_alimentacao, grupo, ...valor_colunas } = valor;
        return {
          tipo_alimentacao,
          grupo,
          valor_colunas,
        };
      }),
    }));

    const payload = {
      ...values,
      tabelas,
      tipos_unidades: values.tipos_unidades.split(","),
    };

    try {
      await ParametrizacaoFinanceiraService.addParametrizacaoFinanceira(
        payload
      );
      toastSuccess("Parametrização incluída com sucesso!");
      navigate(-1);
    } catch (err) {
      const data = err.response.data;
      if (data) {
        if (data.non_field_errors) {
          toastError(data.non_field_errors[0]);
        } else {
          toastError(
            "Não foi possível finalizar inclusão da parametrização. Verifique se todos os campos da tabela foram preenchidos"
          );
        }
      } else {
        toastError("Ocorreu um erro inesperado");
      }
    }
  };

  return (
    <>
      <div className="card mt-4">
        <div className="card-body">
          <Form
            onSubmit={onSubmit}
            initialValues={{
              edital: "",
              lote: "",
              tipos_unidades: "",
            }}
            render={({ form, handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Filtros setTiposAlimentacao={setTiposAlimentacao} ehCadastro />
                {tiposAlimentacao.length > 0 && (
                  <>
                    <TabelaAlimentacao tiposAlimentacao={tiposAlimentacao} />
                    <div className="d-flex gap-4">
                      <TabelaDietaTipoA
                        form={form}
                        tiposAlimentacao={tiposAlimentacao}
                      />
                      <TabelaDietaTipoB
                        form={form}
                        tiposAlimentacao={tiposAlimentacao}
                      />
                    </div>
                    <div className="row mt-5">
                      <div className="col">
                        <Field
                          component={TextArea}
                          label="Legenda"
                          name="legenda"
                          placeholder={
                            "Insira uma Legenda para os lançamentos\n\n" +
                            "Fonte: Relatório de Medição Inicial do Serviço de Alimentação e Nutrição Escolar realizada pela direção das unidades educacionais, conforme disposto no edital Pregão 78/2016 e nas Portarias Intersecretariais SMG/SME n° 005/2006 e 001/2008."
                          }
                          maxLength={1500}
                          height="150"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="d-flex justify-content-end gap-3 mt-5">
                  <Botao
                    texto="Cancelar"
                    onClick={() => {
                      setShowModalCancelar(true);
                    }}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto="Salvar"
                    style={BUTTON_STYLE.GREEN}
                    type={BUTTON_TYPE.SUBMIT}
                    disabled={submitting}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
      <Modal
        show={showModalCancelar}
        onHide={() => {
          setShowModalCancelar(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Cancelar Adição de Parametrização Financeira
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você deseja cancelar a Adição da Parametrização Financeira?
        </Modal.Body>
        <Modal.Footer>
          <Botao
            texto="Não"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              setShowModalCancelar(false);
            }}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ms-3"
          />
          <Botao
            texto="Sim"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              navigate(-1);
            }}
            style={BUTTON_STYLE.GREEN}
            className="ms-3"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
