import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getGuiaParaInsucesso } from "../../../../services/logistica.service.js";
import { Form, Field } from "react-final-form";
import Select from "components/Shareable/Select";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputText } from "components/Shareable/Input/InputText";
import { InputHorario } from "components/Shareable/Input/InputHorario";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import InputFile from "components/Shareable/Input/InputFile";
import { useHistory } from "react-router-dom";
import { INSUCESSO_ENTREGA, LOGISTICA } from "configs/constants";
import {
  required,
  maxLength,
  apenasLetras,
  alphaNumeric,
  peloMenosUmNumeroEUmaLetra
} from "../../../../helpers/fieldValidators";
import { composeValidators } from "../../../../helpers/utilities";
import { toastError } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import ModalInsucesso from "./components/ModalInsucesso";
import moment from "moment";
import "./styles.scss";

import { gerarParametrosConsulta } from "helpers/utilities";

const FORM_NAME = "registrarInsucessoEntrega";

export default () => {
  const [uuid, setUuid] = useState();
  const [carregando, setCarregando] = useState(false);
  const [HoraRecebimento, setHoraRecebimento] = useState("00:00");
  const [HoraRecebimentoAlterada, setHoraRecebimentoAlterada] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [arquivo, setArquivo] = useState([]);
  const history = useHistory();

  const carregarGuia = async uuid => {
    let response;
    try {
      setCarregando(true);
      const params = gerarParametrosConsulta({ uuid: uuid });
      response = await getGuiaParaInsucesso(params);

      setInitialValues({
        numero_guia: response.data.numero_guia,
        data_entrega: response.data.data_entrega,
        nome_unidade: response.data.nome_unidade,
        numero_requisicao: response.data.numero_requisicao,
        hora_tentativa: "00:00"
      });
      setCarregando(false);
    } catch (e) {
      toastError(e.response.data.detail);
      setCarregando(false);
    }
  };

  const escolherHora = hora => {
    if (hora) {
      const horario = moment(hora).format("HH:mm");
      setHoraRecebimento(horario);
      setHoraRecebimentoAlterada(true);
    } else {
      setHoraRecebimento("00:00");
      setHoraRecebimentoAlterada(false);
    }
  };

  const removeFile = () => {
    setArquivo([]);
  };

  const setFiles = files => {
    let arquivos = arquivo;
    arquivos = files;
    setArquivo(arquivos);
  };

  const onSubmit = async values => {
    values.hora_tentativa = HoraRecebimento;
    values.guia = uuid;
    values.arquivo = arquivo[0].arquivo;
  };

  const validaHoraRecebimento = value => {
    value = HoraRecebimentoAlterada ? HoraRecebimento : undefined;
    return value !== undefined ? "" : "Campo obrigatório";
  };

  const goToInsucesso = () => {
    history.push(`/${LOGISTICA}/${INSUCESSO_ENTREGA}`);
  };

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get("uuid");
      setUuid(param);
      carregarGuia(param);
    }
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-conferencia-guia">
        <div className="card-body conferencia-guia">
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={() => {}}
            render={({ form, handleSubmit, submitting, errors, values }) => (
              <form onSubmit={handleSubmit}>
                <FinalFormToRedux form={FORM_NAME} />
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={InputText}
                      label="Nome da Unidade Educacional"
                      name="nome_unidade"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Número da requisição"
                      name="numero_requisicao"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Número da guia"
                      name="numero_guia"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Data de Entrega"
                      name="data_entrega"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col">
                    <Field
                      component={Select}
                      label="Motivo"
                      name="motivo"
                      placeholder="Motivo"
                      options={[
                        { uuid: "", nome: "Selecione" },
                        {
                          uuid: "UE_FECHADA",
                          nome: "Unidade Educacional Fechada"
                        },
                        { uuid: "OUTROS", nome: "Outros" }
                      ]}
                      className="input-busca-produto"
                      validate={required}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={TextArea}
                      label="Justificativa"
                      name="justificativa"
                      required
                      contador={500}
                      validate={(required, maxLength(500))}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nome do Motorista"
                      name="nome_motorista"
                      className="input-busca-produto"
                      contador={100}
                      validate={composeValidators(
                        required,
                        maxLength(100),
                        apenasLetras
                      )}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Placa do Veículo"
                      name="placa_veiculo"
                      className="input-busca-produto"
                      contador={7}
                      validate={composeValidators(
                        required,
                        maxLength(7),
                        alphaNumeric,
                        peloMenosUmNumeroEUmaLetra
                      )}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputHorario}
                      label="Hora da Entrega"
                      name="hora_tentativa"
                      placeholder="Selecione a Hora"
                      horaAtual={HoraRecebimento}
                      onChangeFunction={data => {
                        escolherHora(data);
                      }}
                      className="input-busca-produto"
                      validate={validaHoraRecebimento}
                      required
                      functionComponent
                    />
                  </div>
                </div>

                <hr />
                <div className="mt-4 mb-4">
                  <div className="row pt-3 pb-3">
                    <article className="col-9 produto">
                      <label>Imagem do Produto</label>
                      <label className="explicacao pt-2">
                        Anexe uma imagem do produto
                      </label>
                    </article>
                    <div className="col-3 btn">
                      <Field
                        component={InputFile}
                        className="inputfile"
                        texto="Anexar"
                        name="files"
                        accept=".png, .pdf, .jpeg, .jpg"
                        setFiles={setFiles}
                        removeFile={removeFile}
                        toastSuccess={
                          "Anexo do documento incluído com sucesso!"
                        }
                        disabled={arquivo.length > 0}
                      />
                    </div>
                  </div>

                  <ModalInsucesso
                    values={values}
                    disabled={Object.keys(errors).length > 0 || submitting}
                  />

                  <Botao
                    texto="Voltar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={goToInsucesso}
                    disabled={submitting}
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
