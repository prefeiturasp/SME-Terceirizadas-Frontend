import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import Select from "components/Shareable/Select";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { requiredSearchSelectUnidEducDietas } from "helpers/fieldValidators";

import { TIPO_PERFIL } from "constants/shared";

import {
  formFiltrosObtemDreEEscolasControleSobras,
  getDadosIniciais,
} from "helpers/controleSobras";
import {
  setEscolas,
  setDiretoriasRegionais,
} from "reducers/controleSobrasReducer";

import { meusDados } from "services/perfil.service";

import "./styles.scss";
import ModalCadastrarControleSobras from "components/Shareable/ModalCadastrarControleSobras";
import { bindActionCreators } from "redux";

const FORM_NAME = "buscaControleSobras";

const FormFiltros = ({
  setLoading,
  setFiltros,
  initialValues,
  history,
  setDadosUsuario,
  diretoriasRegionais,
  setDiretoriasRegionais,
  escolas,
  setEscolas,
  nextPage,
}) => {
  const [dadosIniciais, setDadosIniciais] = useState({});
  const [nomeEscolas, setNomeEscolas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetch() {
      const dadosUsuario = await meusDados();
      setDadosUsuario(dadosUsuario);
      formFiltrosObtemDreEEscolasControleSobras(
        setNomeEscolas,
        setEscolas,
        setDiretoriasRegionais,
        dadosUsuario
      );
      let dadosIniciais = await getDadosIniciais(dadosUsuario);
      if (dadosUsuario.tipo_usuario === "escola") {
        let { nome, codigo_eol } = dadosUsuario.vinculo_atual.instituicao;
        dadosIniciais.escola = [`${codigo_eol} - ${nome}`];
      }

      if (history.action === "POP" && initialValues)
        setDadosIniciais({ ...initialValues, ...dadosIniciais });
      else setDadosIniciais(dadosIniciais);
      setLoading(false);
    }
    fetch();
  }, []);

  const onSubmit = async (formValues) => {
    setFiltros({ ...formValues, escolas: escolas });
  };

  const getNomesItemsFiltrado = (value) => {
    if (value) {
      let value_ = value;
      if (localStorage.getItem("tipo_perfil") === TIPO_PERFIL.ESCOLA) {
        value_ = value[0];
      }
      return nomeEscolas.filter((a) => a.includes(value_.toUpperCase()));
    }
    return [];
  };

  const tipoUsuario = localStorage.getItem("tipo_perfil");
  return (
    <>
      <Spin tip="Carregando..." spinning={!escolas.length}>
        <Form
          onSubmit={onSubmit}
          initialValues={dadosIniciais}
          subscription={{ submitting: true, values: true }}
          render={({ form, handleSubmit, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <FinalFormToRedux form={FORM_NAME} />
              <div className="row">
                <div className="col-5">
                  <Field
                    label="Diretoria Regional de Educação"
                    component={Select}
                    className="input-busca-dre form-control"
                    name="dre"
                    options={[{ uuid: "", nome: "Todas" }].concat(
                      diretoriasRegionais.map((dre) => {
                        return { uuid: dre.value, nome: dre.label };
                      })
                    )}
                    disabled={
                      tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                      tipoUsuario === TIPO_PERFIL.ESCOLA
                    }
                    naoDesabilitarPrimeiraOpcao
                    onChangeEffect={(e) => {
                      const value = e.target.value;
                      setNomeEscolas(
                        escolas
                          .filter((escola) => value.includes(escola.dre.uuid))
                          .map(
                            (escola) => `${escola.codigo_eol} - ${escola.label}`
                          )
                      );
                      tipoUsuario !== TIPO_PERFIL.ESCOLA &&
                        form.change("escola", undefined);
                    }}
                  />
                </div>
                <div className="col-7">
                  <Field
                    dataSource={getNomesItemsFiltrado(values.escola)}
                    component={AutoCompleteField}
                    name="escola"
                    label="Unidade Educacional"
                    placeholder={"Digite um nome"}
                    className="input-busca-nome-item"
                    disabled={tipoUsuario === TIPO_PERFIL.ESCOLA || !values.dre}
                    validate={requiredSearchSelectUnidEducDietas(escolas)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 botoes-envio">
                  <div className="mt-4">
                    <Botao
                      texto="Cadastrar Sobra"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN}
                      onClick={() => setShowModal(true)}
                    />
                    <Botao
                      texto="Consultar"
                      className="float-right ml-3"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                    />
                    <Botao
                      texto="Limpar Filtros"
                      className="float-right ml-3"
                      onClick={() => {
                        if (tipoUsuario === TIPO_PERFIL.ESCOLA)
                          form.restart({
                            ...dadosIniciais,
                            nome_aluno: undefined,
                            codigo_eol: undefined,
                          });
                        else if (tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL)
                          form.restart({
                            ...dadosIniciais,
                            escolas: [],
                            nome_aluno: undefined,
                            codigo_eol: undefined,
                          });
                        else form.restart({});
                      }}
                      disabled={pristine}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      </Spin>
      <ModalCadastrarControleSobras
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        tipoUsuario={tipoUsuario}
        changePage={nextPage}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    escolas: state.controleSobras.escolas,
    diretoriasRegionais: state.controleSobras.diretoriasRegionais,
    initialValues: state.finalForm[FORM_NAME],
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEscolas,
      setDiretoriasRegionais,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormFiltros);
