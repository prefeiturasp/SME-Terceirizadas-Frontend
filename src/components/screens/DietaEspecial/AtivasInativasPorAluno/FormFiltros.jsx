import React, { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Shareable/Botao/constants";
import InputText from "components/Shareable/Input/InputText";
import Select from "components/Shareable/Select";
import { toastError } from "components/Shareable/Toast/dialogs";

import { TIPO_PERFIL } from "constants/shared";

import { formFiltrosObtemDreEEscolas } from "helpers/dietaEspecial";

import { obtemDadosAlunoPeloEOL } from "services/perfil.service";

import "./FormFiltros.scss";

const Filtros = ({
  change,
  dre,
  handleSubmit,
  loading,
  setLoading
}) => {
  const [loadingNomeAluno, setLoadingNomeAluno] = useState(false);
  const [diretoriasRegionais, setDiretoriasRegionais] = useState([{ uuid: "", nome: "Carregando..." }])
  const [escolas, setEscolas] = useState([{ uuid: "", nome: "Carregando...", dre: {uuid: ""} }])
  useEffect(async () => {
    formFiltrosObtemDreEEscolas(setEscolas, setDiretoriasRegionais, change);
    setLoading(false);
  }, []);


  const onEolBlur = async event => {
    change("nome_aluno", "Buscando...");
    setLoadingNomeAluno(true);
    const resposta = await obtemDadosAlunoPeloEOL(event.target.value);
    if (!resposta) return;
    if (resposta.status === 400) {
      toastError("Aluno não encontrado no EOL.");
      change("nome_aluno", "");
    } else {
      change("nome_aluno", resposta.detail.nm_aluno);
    }
    setLoadingNomeAluno(false);
  };

  const escolasFiltrado = dre
    ? escolas.filter(e => e.uuid === "" || e.diretoria_regional.uuid === dre)
    : escolas;
  const tipoUsuario = localStorage.getItem("tipo_perfil");
  return (
    <div className="card mt-3 form-filtros-ativas-inativas">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-5">
              <Field
                label="Diretoria Regional de Educação"
                component={Select}
                name="dre"
                options={diretoriasRegionais}
                disabled={
                  loading ||
                  tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                  tipoUsuario === TIPO_PERFIL.ESCOLA
                }
                onChange={() => change("escola", "")}
                naoDesabilitarPrimeiraOpcao
              />
            </div>
            <div className="col-7">
              <Field
                label="Unidade Escolar"
                component={Select}
                name="escola"
                options={escolasFiltrado}
                disabled={loading || tipoUsuario === TIPO_PERFIL.ESCOLA}
                naoDesabilitarPrimeiraOpcao
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <Field
                label="Cód. EOL do Aluno"
                component={InputText}
                name="codigo_eol"
                placeholder="Insira o Código"
                disabled={loading || loadingNomeAluno}
                onBlur={onEolBlur}
              />
            </div>
            <div className="col-9">
              <Field
                label="Nome Completo do Aluno"
                component={InputText}
                name="nome_aluno"
                placeholder="Insira o Nome do Aluno"
                disabled={loading || loadingNomeAluno}
              />
            </div>
            <div className="col-1 botao-enviar">
              <Botao
                style={BUTTON_STYLE.GREEN}
                texto="Filtrar"
                type={BUTTON_TYPE.SUBMIT}
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
let FiltrosForm = reduxForm({
  form: "consulta-dietas-ativas-inativas",
  enableReinitialize: true
})(Filtros);

const selector = formValueSelector("consulta-dietas-ativas-inativas");

const mapStateToProps = state => {
  return {
    dre: selector(state, "dre")
  };
};

export default connect(mapStateToProps)(FiltrosForm);
