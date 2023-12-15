import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { Field, Form } from "react-final-form";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import { required } from "../../../../helpers/fieldValidators";
import InputText from "../../../Shareable/Input/InputText";
import { getListaCronogramasPraCadastro } from "../../../../services/cronograma.service";
import { cadastraLayoutEmbalagem } from "../../../../services/layoutEmbalagem.service";
import { OnChange } from "react-final-form-listeners";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { exibeError } from "helpers/utilities";
import { LAYOUT_EMBALAGEM, PRE_RECEBIMENTO } from "configs/constants";
import ModalConfirmar from "./components/ModalConfirmar";
import { useHistory } from "react-router-dom";
import ModalCancelar from "./components/ModalCancelar";
import InserirArquivo from "../LayoutEmbalagem/components/InserirArquivo";

export default () => {
  const history = useHistory();
  const [carregando, setCarregando] = useState(true);
  const [cronogramas, setCronogramas] = useState([]);
  const [primaria, setPrimaria] = useState([]);
  const [secundaria, setSecundaria] = useState([]);
  const [terciaria, setTerciaria] = useState([]);
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);
  const [showModalCancelar, setShowModalCancelar] = useState(false);

  const onSubmit = () => {
    setShowModalConfirmar(true);
  };

  const gerarImagens = (arr) =>
    arr.map((img) => ({
      arquivo: img.arquivo || img.base64,
      nome: img.nome,
    }));

  const salvarLayoutEmbalagem = async (values) => {
    setCarregando(true);
    let payload = formataPayload(values);
    try {
      let response = await cadastraLayoutEmbalagem(payload);
      if (response.status === 201 || response.status === 200) {
        setCarregando(false);
        toastSuccess("Layout enviado para análise com sucesso!");
        setShowModalConfirmar(false);
        voltarPagina();
      } else {
        toastError("Ocorreu um erro ao salvar o Layout  da Embalagem");
        setCarregando(false);
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar o Layout da Embalagem");
    }
  };

  const formataPayload = (values) => {
    let payload = {};
    payload.cronograma = values.cronograma_uuid;
    payload.observacoes = values.observacoes;

    payload.tipos_de_embalagens = [];

    payload.tipos_de_embalagens.push({
      tipo_embalagem: "PRIMARIA",
      imagens_do_tipo_de_embalagem: gerarImagens(primaria),
    });
    payload.tipos_de_embalagens.push({
      tipo_embalagem: "SECUNDARIA",
      imagens_do_tipo_de_embalagem: gerarImagens(secundaria),
    });
    if (terciaria.length > 0) {
      payload.tipos_de_embalagens.push({
        tipo_embalagem: "TERCIARIA",
        imagens_do_tipo_de_embalagem: gerarImagens(terciaria),
      });
    }

    return payload;
  };

  const buscaCronogramas = async () => {
    let response = await getListaCronogramasPraCadastro();
    let lista = response.data.results.map((crono) => {
      crono.value = crono.numero;
      return crono;
    });
    setCronogramas(lista);
  };

  const removeFile1 = (index) => {
    let newFiles = [...primaria];
    newFiles.splice(index, 1);
    setPrimaria(newFiles);
  };

  const setFiles1 = (files) => {
    const arquivosAtualizados = files.map((arquivo) => {
      return {
        nome: arquivo.nome,
        base64: arquivo.base64 || arquivo.arquivo,
      };
    });

    setPrimaria(arquivosAtualizados);
  };

  const removeFile2 = (index) => {
    let newFiles = [...secundaria];
    newFiles.splice(index, 1);
    setSecundaria(newFiles);
  };

  const setFiles2 = (files) => {
    const arquivosAtualizados = files.map((arquivo) => {
      return {
        nome: arquivo.nome,
        base64: arquivo.base64 || arquivo.arquivo,
      };
    });

    setSecundaria(arquivosAtualizados);
  };

  const removeFile3 = (index) => {
    let newFiles = [...terciaria];
    newFiles.splice(index, 1);
    setTerciaria(newFiles);
  };

  const setFiles3 = (files) => {
    const arquivosAtualizados = files.map((arquivo) => {
      return {
        nome: arquivo.nome,
        base64: arquivo.base64 || arquivo.arquivo,
      };
    });

    setTerciaria(arquivosAtualizados);
  };

  const voltarPagina = () =>
    history.push(`/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`);

  const getCronogramasFiltrado = (numero_cronograma) => {
    if (numero_cronograma) {
      const reg = new RegExp(numero_cronograma, "iu");
      return cronogramas.filter((a) => reg.test(a.value));
    }
    return cronogramas;
  };

  useEffect(() => {
    setCarregando(true);

    buscaCronogramas();

    setCarregando(false);
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-layout-embalagem">
        <div className="card-body cadastro-layout-embalagem">
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={() => {}}
            render={({ handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <ModalConfirmar
                  show={showModalConfirmar}
                  handleClose={() => setShowModalConfirmar(false)}
                  loading={carregando}
                  handleSim={() => salvarLayoutEmbalagem(values)}
                />
                <ModalCancelar
                  show={showModalCancelar}
                  handleClose={() => setShowModalCancelar(false)}
                  handleSim={() => voltarPagina()}
                />
                <div className="subtitulo">Dados do Produto</div>
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={AutoCompleteSelectField}
                      options={getCronogramasFiltrado(values.cronograma)}
                      label="Nº do Cronograma"
                      name={`cronograma`}
                      className="input-busca-produto"
                      placeholder="Digite o Nº do Cronograma"
                      required
                      validate={required}
                      esconderIcone
                    />
                    <OnChange name="cronograma">
                      {(value) => {
                        let cronograma = cronogramas.find(
                          (c) => c.numero === value
                        );
                        if (cronograma) {
                          values.cronograma_uuid = cronograma.uuid;
                          values.pregao = cronograma.pregao_chamada_publica;
                          values.nome_produto = cronograma.nome_produto;
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nº do Pregão/Chamada Pública"
                      name={`pregao`}
                      placeholder="Nº do Pregão/Chamada Pública"
                      required
                      disabled={true}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nome do Produto"
                      name={`nome_produto`}
                      placeholder="Nome do Produto"
                      required
                      disabled={true}
                    />
                  </div>
                </div>

                <hr />

                <InserirArquivo
                  setFiles={setFiles1}
                  removeFile={removeFile1}
                  tipoEmbalagem={"PRIMARIA"}
                />

                <hr />

                <InserirArquivo
                  setFiles={setFiles2}
                  removeFile={removeFile2}
                  tipoEmbalagem={"SECUNDARIA"}
                />

                <hr />

                <InserirArquivo
                  setFiles={setFiles3}
                  removeFile={removeFile3}
                  tipoEmbalagem={"TERCIARIA"}
                />

                <hr />

                <div className="row">
                  <div className="col-12">
                    <Field
                      component={TextArea}
                      label="Observações"
                      name="observacoes"
                    />
                  </div>
                </div>

                <hr />

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Enviar Para Análise"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-end ml-3"
                    disabled={
                      Object.keys(errors).length > 0 ||
                      primaria.length === 0 ||
                      secundaria.length === 0
                    }
                  />
                  <Botao
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-end ml-3"
                    onClick={() => setShowModalCancelar(true)}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
