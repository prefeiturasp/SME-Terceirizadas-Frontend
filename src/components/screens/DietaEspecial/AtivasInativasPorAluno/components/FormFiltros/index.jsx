import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import InputText from "components/Shareable/Input/InputText";
import Select from "components/Shareable/Select";
import { toastError } from "components/Shareable/Toast/dialogs";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { OnChange } from "react-final-form-listeners";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { length } from "helpers/fieldValidators";

import { TIPO_PERFIL } from "constants/shared";

import {
  formFiltrosObtemDreEEscolasNovo,
  getDadosIniciais
} from "helpers/dietaEspecial";

import { meusDados } from "services/perfil.service";
import { dadosDoAluno, getAlunosListagem } from "services/perfil.service";

import "./styles.scss";

const FORM_NAME = "buscaAvancadaProduto";

const FormFiltros = ({
  setLoading,
  setFiltros,
  initialValues,
  history,
  setDadosUsuario
}) => {
  const [carregandoAluno, setCarregandoAluno] = useState(false);
  const [dadosIniciais, setDadosIniciais] = useState({});
  const [diretoriasRegionais, setDiretoriasRegionais] = useState([]);
  const [desabilitarAluno, setDesabilitarAluno] = useState(null);
  const [escolas, setEscolas] = useState([]);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function fetch() {
      const dadosUsuario = await meusDados();
      setDadosUsuario(dadosUsuario);
      formFiltrosObtemDreEEscolasNovo(
        setEscolas,
        setDiretoriasRegionais,
        dadosUsuario
      );
      const dadosIniciais = await getDadosIniciais(dadosUsuario);

      getAlunos(dadosIniciais);

      if (history.action === "POP" && initialValues)
        setDadosIniciais({ ...initialValues, ...dadosIniciais });
      else setDadosIniciais(dadosIniciais);
      setLoading(false);
    }
    fetch();
  }, []);

  const onSubmit = async formValues => {
    setFiltros({ ...formValues });
  };

  const getEscolasFiltrado = dre => {
    if (
      tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
      tipoUsuario === TIPO_PERFIL.ESCOLA
    ) {
      return escolas;
    } else if (dre) {
      if (dre.length === 0) {
        return escolas;
      } else {
        return escolas.filter(escola => dre.includes(escola.dre.uuid));
      }
    }
    return [];
  };

  const getAlunosFiltrado = nomeAluno => {
    if (nomeAluno) {
      const reg = new RegExp(nomeAluno, "i");
      return alunos.filter(a => reg.test(a));
    }
    return [];
  };

  const getAlunoPorEol = async (codigoEol, values) => {
    if (codigoEol.length !== 7) {
      setDesabilitarAluno(false);
      setDadosIniciais({ ...values, nome_aluno: undefined });
      return;
    }
    setCarregandoAluno(true);
    const resposta = await dadosDoAluno(codigoEol);
    if (resposta.status !== 200) {
      setDesabilitarAluno(false);
      setDadosIniciais({ ...values, nome_aluno: "" });
      toastError("Não há Aluno para código EOL informado.");
    } else if (resposta.status === 200) {
      if (
        tipoUsuario === TIPO_PERFIL.ESCOLA &&
        resposta.data.escola.uuid !== values.escola[0]
      ) {
        toastError("Código EOL do aluno não pertence a esta unidade escolar.");
        setDesabilitarAluno(false);
        setDadosIniciais({ ...values, nome_aluno: "" });
      } else if (
        tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL &&
        resposta.data.escola.diretoria_regional.uuid !== values.dre[0]
      ) {
        setDesabilitarAluno(false);
        toastError("Código EOL do aluno não pertence a esta DRE.");
        setDadosIniciais({ ...values, nome_aluno: "" });
      } else if (!resposta.data.possui_dieta_especial) {
        setDesabilitarAluno(false);
        toastError("Não há dieta especial para o aluno informado.");
        setDadosIniciais({ ...values, nome_aluno: "" });
      } else {
        setDesabilitarAluno(true);
        setDadosIniciais({ ...values, nome_aluno: resposta.data.nome });
      }
    }
    setCarregandoAluno(false);
  };

  const getAlunos = async dadosIniciais => {
    if (tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL) {
      const response = await getAlunosListagem({ dre: dadosIniciais.dre[0] });
      setAlunos(response.data.results.map(aluno => aluno.nome));
    } else if (tipoUsuario === TIPO_PERFIL.ESCOLA) {
      const response = await getAlunosListagem({
        escola: dadosIniciais.escola[0]
      });
      setAlunos(response.data.results.map(aluno => aluno.nome));
    } else {
      const response = await getAlunosListagem();
      setAlunos(response.data.results.map(aluno => aluno.nome));
    }
  };

  const tipoUsuario = localStorage.getItem("tipo_perfil");
  return (
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
                  diretoriasRegionais.map(dre => {
                    return { uuid: dre.value, nome: dre.label };
                  })
                )}
                disabled={
                  tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                  tipoUsuario === TIPO_PERFIL.ESCOLA
                }
                naoDesabilitarPrimeiraOpcao
              />
            </div>
            <div className="col-7">
              <Field
                label="Unidade Escolar"
                component={Select}
                name="escola"
                className="input-busca-escola form-control"
                options={[{ uuid: "", nome: "Todas" }].concat(
                  getEscolasFiltrado(values.dre).map(escola => {
                    return { uuid: escola.value, nome: escola.label };
                  })
                )}
                disabled={tipoUsuario === TIPO_PERFIL.ESCOLA}
                naoDesabilitarPrimeiraOpcao
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <Field
                label="Cód. EOL do Aluno"
                component={InputText}
                name="codigo_eol"
                placeholder="Insira o Código"
                inputType="number"
                validate={length(7)}
                disabled={carregandoAluno}
              />
              <OnChange name="codigo_eol">
                {value => {
                  getAlunoPorEol(value, values);
                }}
              </OnChange>
            </div>
            <div className="col-9 pt-2">
              <Field
                label="Nome Completo do Aluno"
                component={AutoCompleteField}
                dataSource={getAlunosFiltrado(values.nome_aluno)}
                name="nome_aluno"
                placeholder="Insira o Nome do Aluno"
                className="input-busca-aluno"
                disabled={carregandoAluno | desabilitarAluno}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 botoes-envio">
              <div className="mt-4">
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
                        codigo_eol: undefined
                      });
                    else if (tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL)
                      form.restart({
                        ...dadosIniciais,
                        escolas: [],
                        nome_aluno: undefined,
                        codigo_eol: undefined
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
  );
};

const mapStateToProps = state => {
  return {
    initialValues: state.finalForm[FORM_NAME]
  };
};

export default withRouter(connect(mapStateToProps)(FormFiltros));
