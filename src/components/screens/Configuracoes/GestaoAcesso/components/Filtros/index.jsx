import React, { useRef, useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputText } from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import Select from "components/Shareable/Select";
import { getPerfilListagem, getVisoesListagem } from "services/perfil.service";

const FORM_NAME = "buscaGestaoAcesso";

export default ({ setFiltros }) => {
  const initialValues = {};
  const inicioResultado = useRef();
  const [perfis, setPerfis] = useState([]);
  const [visoes, setVisoes] = useState([]);

  const buscaFiltros = async () => {
    const perfis = await getPerfilListagem();
    const visoes = await getVisoesListagem();

    const placeholderPerfil = {
      uuid: undefined,
      nome: "Selecione o perfil do Usuário"
    };

    const placeholderVisao = {
      uuid: undefined,
      nome: "Selecione a Visão"
    };

    let options_perfis = perfis.data.results.map(perfil => ({
      uuid: perfil.nome,
      nome: perfil.nome
    }));

    let options_visoes = visoes.data.map(visao => ({
      uuid: visao.id,
      nome: visao.nome
    }));

    setPerfis([placeholderPerfil, ...options_perfis]);
    setVisoes([placeholderVisao, ...options_visoes]);
  };

  useEffect(() => {
    buscaFiltros();
  }, []);

  const onSubmit = async values => {
    const filtros = { ...values };
    setFiltros({ ...filtros });
  };
  return (
    <div className="filtros-gestao-acesso">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ form, handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />

            <div className="row">
              <div className="col-6">
                <Field
                  component={InputText}
                  label="Nome do Usuário"
                  name="nome"
                  placeholder="Digite o Nome do Usuário"
                  className="input-busca-produto"
                />
              </div>

              <div className="col-6">
                <Field
                  component={InputText}
                  label="ID do Usuário"
                  name="usuario"
                  placeholder="Digite o ID do Usuário"
                  className="input-busca-produto"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Field
                  label="Visão"
                  component={Select}
                  placeholder="Selecione"
                  name="visao"
                  options={visoes}
                  naoDesabilitarPrimeiraOpcao
                />
              </div>
              <div className="col-6">
                <Field
                  label="Perfil de Acesso"
                  component={Select}
                  placeholder="Selecione"
                  name="perfil"
                  options={perfis}
                  naoDesabilitarPrimeiraOpcao
                />
              </div>
            </div>

            <div className="mt-4 mb-4" ref={inicioResultado}>
              <Botao
                texto="Filtrar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-right ml-3"
                disabled={submitting}
                onClick={() => inicioResultado.current.scrollIntoView()}
              />

              <Botao
                texto="Limpar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3"
                onClick={() => {
                  form.reset(initialValues);
                  setFiltros(initialValues);
                }}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};
