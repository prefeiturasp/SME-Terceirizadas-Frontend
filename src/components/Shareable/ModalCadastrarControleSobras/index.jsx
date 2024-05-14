import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getVinculosTipoAlimentacaoPorTipoUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { Field, Form } from "react-final-form";
import { Select } from "components/Shareable/Select";
import { Spin } from "antd";
import {
  required,
  requiredSearchSelectUnidEducDietas,
  noSpaceStartOrEnd,
  requiredOptionSearchSelect,
} from "helpers/fieldValidators";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { TIPO_PERFIL } from "constants/shared";
import AutoCompleteField from "../AutoCompleteField";
import InputText from "../Input/InputText";
import { composeValidators } from "helpers/utilities";
import { formatarVinculosParaTiposAlimentacao } from "helpers/controleSobras";
import { cadastrarControleSobras } from "services/controleSobras.service";
import { toastError, toastSuccess } from "../Toast/dialogs";
import {
  setTiposAlimento,
  setTiposRecipiente,
} from "reducers/controleSobrasReducer";
import { consultaTiposAlimento } from "services/tipoAlimento.service";
import { consultaTiposRecipiente } from "services/tipoRecipiente.service";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles.scss";
import { InputComData } from "../DatePicker";
import { InputHorario } from "../Input/InputHorario";
import moment from "moment";
import { inteiroOuDecimal } from "../../../helpers/fieldValidators";

const ModalCadastrarControleSobras = ({
  closeModal,
  showModal,
  changePage,
  tipoUsuario,
  tiposAlimento,
  setTiposAlimento,
  tiposRecipiente,
  setTiposRecipiente,
  escolas,
  diretoriasRegionais,
  selecionado,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [nomeEscolas, setNomeEscolas] = useState([]);
  const [escolaSelected, setEscolaSelected] = useState();
  const [tiposAlimentacao, setTiposAlimentacao] = useState([]);
  const [initialValues, setInitialValues] = useState(undefined);
  const [HoraMedicao, setHoraMedicao] = useState("00:00");
  const [HoraMedicaoAlterada, setHoraMedicaoAlterada] = useState(false);

  const [registroEdicao, setRegistroEdicao] = useState(selecionado);

  const fetchData = async () => {
    setCarregando(true);
    const resTiposAlimento = await consultaTiposAlimento();
    setTiposAlimento(resTiposAlimento.data.results);
    const resTiposRecipiente = await consultaTiposRecipiente();
    setTiposRecipiente(resTiposRecipiente.data.results);
    setLoaded(true);
    setCarregando(false);
  };

  const checkInitialValues = async () => {
    if (selecionado) {
      setRegistroEdicao(selecionado);

      const data_hora_medicao = selecionado.data_hora_medicao
        ? moment(selecionado.data_hora_medicao, "DD/MM/YYYY HH:mm")
        : null;

      const _initValues = {
        dre: selecionado?.escola?.diretoria_regional?.uuid,
        escola:
          selecionado?.escola.codigo_eol + " - " + selecionado.escola?.nome,
        tipo_alimentacao: selecionado.tipo_alimentacao_nome,
        tipo_alimento: selecionado.tipo_alimento_nome,
        tipo_recipiente: selecionado.tipo_recipiente_nome,
        peso_alimento: formatDecimal(selecionado.peso_alimento),
        peso_recipiente: formatDecimal(selecionado.peso_recipiente),
        peso_sobra: formatDecimal(selecionado.peso_sobra),
        data_medicao: data_hora_medicao
          ? data_hora_medicao.format("DD/MM/YYYY")
          : null,
        hora_medicao: data_hora_medicao
          ? data_hora_medicao.format("HH:mm")
          : "00:00",
      };

      setInitialValues(_initValues);
      setHoraMedicao(_initValues.hora_medicao);
      onBlurEscola(undefined, {
        escola:
          selecionado?.escola.codigo_eol + " - " + selecionado.escola?.nome,
      });
    } else {
      setRegistroEdicao(undefined);
      
      setInitialValues({
        hora_medicao: "00:00",
      });
      setHoraMedicao("00:00");
    }
  };

  useEffect(() => {
    if (showModal) {
      if (!loaded) {
        fetchData();
      }
      checkInitialValues();
    } else {
      setInitialValues(undefined);
      setEscolaSelected(undefined);
      setTiposAlimentacao([]);
    }
  }, [showModal]);

  async function onBlurEscola(form, value) {
    if (!value) {
      if (tiposAlimentacao) {
        setTiposAlimentacao([]);
        form?.change("tipo_alimentacao", undefined);
      }
      return;
    }

    // verificar se value é uma string
    if (typeof value === "string") {
      value = {
        escola: value,
      };
    }

    const escola = escolas.filter(
      (e) => e?.codigo_eol === (typeof value === "string" ? value : value.escola)
        .split(" - ")[0]
    )[0];
    if (escola) {
      if (escola?.codigo_eol !== escolaSelected?.codigo_eol) {
        setCarregando(true);
        const resVinculos =
          await getVinculosTipoAlimentacaoPorTipoUnidadeEscolar(
            escola.tipo_unidade
          );
        setCarregando(false);
        setTiposAlimentacao(formatarVinculosParaTiposAlimentacao(resVinculos));
        setEscolaSelected(escola);
      }
    } else if (tiposAlimentacao) {
      setEscolaSelected(undefined);
      setTiposAlimentacao([]);
    }
    form?.change("tipo_alimentacao", undefined);
  }

  const onSubmit = async (formValues) => {
    const data_hora_medicao = moment(
      formValues.data_medicao + formValues.hora_medicao,
      "DD/MM/YYYYHH:mm:ss"
    );

    if (data_hora_medicao.isAfter(moment())) {
      return toastError(
        "Data/Hora da Medição não podem ser posteriores à data e hora atual"
      );
    }

    setCarregando(true);

    const payload = {
      ...formValues,
      escola: escolaSelected.value,
      tipo_alimentacao: tiposAlimentacao.find(
        (tipo) => tipo.nome === formValues.tipo_alimentacao
      ).uuid,
      tipo_alimento: tiposAlimento.find(
        (tipo) => tipo.nome === formValues.tipo_alimento
      ).uuid,
      tipo_recipiente: tiposRecipiente.find(
        (tipo) => tipo.nome === formValues.tipo_recipiente
      ).uuid,
      peso_alimento: parseDecimal(formValues.peso_alimento),
      peso_recipiente: parseDecimal(formValues.peso_recipiente),
      peso_sobra: parseDecimal(formValues.peso_sobra),
      data_hora_medicao: data_hora_medicao.toDate(),
    };

    await cadastrarControleSobras(payload)
      .then(() => {
        toastSuccess("Cadastro de Sobras efetuado com sucesso.");
        setRegistroEdicao(payload);
        changePage();
      })
      .catch((error) => {
        toastError(error.response.data[0]);
      });

    setCarregando(false);
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

  const formatDecimal = (value) => {
    if (!value) return value;
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const parseDecimal = (value) => {
    if (!value) return value;
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
  };

  const escolherHora = (hora, form) => {
    setTimeout(() => {
      if (hora) {
        const horario = moment(hora.toDate()).format("HH:mm:ss");
        setHoraMedicao(horario);
        setHoraMedicaoAlterada(true);
        form.change("hora_medicao", horario);
      } else {
        setHoraMedicao("00:00:00");
        setHoraMedicaoAlterada(false);
        form.change("hora_medicao", "00:00:00");
      }
    }, 250);
  };

  const validaHora = (value) => {
    value = HoraMedicaoAlterada ? HoraMedicao : undefined;
    return value !== undefined ? "" : "Campo obrigatório";
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {registroEdicao ? "Visualizar" : "Cadastrar"} Sobra
        </Modal.Title>
      </Modal.Header>
      <Spin tip="Carregando..." spinning={carregando}>
        {initialValues !== undefined && (
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={() => {}}
            render={({ handleSubmit, submitting, form, values }) => (
              <form onSubmit={handleSubmit}>
                <Modal.Body>
                  <div className="row">
                    <div className="col-6">
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
                          registroEdicao ||
                          tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                          tipoUsuario === TIPO_PERFIL.ESCOLA
                        }
                        required
                        validate={required}
                        naoDesabilitarPrimeiraOpcao
                        onChangeEffect={(e) => {
                          const value = e.target.value;
                          setNomeEscolas(
                            escolas
                              .filter((escola) =>
                                value.includes(escola.dre.uuid)
                              )
                              .map(
                                (escola) =>
                                  `${escola.codigo_eol} - ${escola.label}`
                              )
                          );
                          tipoUsuario !== TIPO_PERFIL.ESCOLA &&
                            form.change("escola", undefined);
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        dataSource={getNomesItemsFiltrado(values.escola)}
                        component={AutoCompleteField}
                        name="escola"
                        label="Unidade Educacional"
                        placeholder={"Digite um nome"}
                        className={
                          registroEdicao
                            ? "input-controle-sobras"
                            : "input-busca-nome-item"
                        }
                        disabled={
                          registroEdicao ||
                          tipoUsuario === TIPO_PERFIL.ESCOLA ||
                          !values.dre
                        }
                        required
                        validate={composeValidators(
                          required,
                          requiredSearchSelectUnidEducDietas(escolas)
                        )}
                        inputOnChange={(value) => onBlurEscola(form, value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Field
                        component={InputComData}
                        name={"data_medicao"}
                        minDate={null}
                        maxDate={new Date()}
                        label="Data da Medição"
                        placeholder="Selecione a Data"
                        className={
                          "input-data-hora" +
                          (registroEdicao ? " input-controle-restos" : "")
                        }
                        disabled={!!registroEdicao}
                        writable={false}
                        validate={required}
                        required
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputHorario}
                        label="Hora da Medição"
                        name="hora_medicao"
                        placeholder="Selecione a Hora"
                        horaAtual={HoraMedicao}
                        onOk={(hora) => escolherHora(hora, form)}
                        onChangeFunction={(hora) => escolherHora(hora, form)}
                        writable={false}
                        className={
                          "input-data-hora" +
                          (registroEdicao ? " input-controle-restos" : "")
                        }
                        validate={validaHora}
                        disabled={!!registroEdicao}
                        required
                        functionComponent
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Field
                        dataSource={tiposAlimentacao.map((tipo) => tipo.nome)}
                        component={AutoCompleteField}
                        name="tipo_alimentacao"
                        label="Tipo de Alimentação"
                        placeholder={"Digite um nome"}
                        className={
                          registroEdicao
                            ? "input-controle-sobras"
                            : "input-busca-nome-item"
                        }
                        required
                        validate={composeValidators(
                          required,
                          requiredOptionSearchSelect(tiposAlimentacao, "nome")
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        dataSource={tiposAlimento.map((tipo) => tipo.nome)}
                        component={AutoCompleteField}
                        name="tipo_alimento"
                        label="Tipo de Alimento"
                        placeholder={"Digite um nome"}
                        className={
                          registroEdicao
                            ? "input-controle-sobras"
                            : "input-busca-nome-item"
                        }
                        required
                        validate={composeValidators(
                          required,
                          requiredOptionSearchSelect(tiposAlimento, "nome")
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        dataSource={tiposRecipiente.map((tipo) => tipo.nome)}
                        component={AutoCompleteField}
                        name="tipo_recipiente"
                        label="Tipo de Recipiente"
                        placeholder={"Digite um nome"}
                        className={
                          registroEdicao
                            ? "input-controle-sobras"
                            : "input-busca-nome-item"
                        }
                        required
                        validate={composeValidators(
                          required,
                          requiredOptionSearchSelect(tiposRecipiente, "nome")
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4">
                      <Field
                        label="Peso do Recipiente (Kg)"
                        name="peso_recipiente"
                        component={InputText}
                        placeholder={"Digite um peso"}
                        required
                        className={registroEdicao ? "input-controle-sobras" : ""}
                        validate={composeValidators(
                          required,
                          inteiroOuDecimal,
                          noSpaceStartOrEnd
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        label="Peso do Alimento Pronto (Kg)"
                        name="peso_alimento"
                        component={InputText}
                        placeholder={"Digite um peso"}
                        className={registroEdicao ? "input-controle-sobras" : ""}
                        required
                        validate={composeValidators(
                          required,
                          inteiroOuDecimal,
                          noSpaceStartOrEnd
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        label="Peso da Sobra (Kg)"
                        name="peso_sobra"
                        component={InputText}
                        placeholder={"Digite um peso"}
                        required
                        className={registroEdicao ? "input-controle-sobras" : ""}
                        validate={composeValidators(
                          required,
                          inteiroOuDecimal,
                          noSpaceStartOrEnd
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="row mt-4">
                    <div className="col-12">
                      <Botao
                        texto="Cancelar"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={closeModal}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="me-3"
                      />
                      {!registroEdicao && (
                        <Botao
                          texto="Salvar"
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN}
                          className="me-3"
                          disabled={submitting}
                        />
                      )}
                    </div>
                  </div>
                </Modal.Footer>
              </form>
            )}
          />
        )}
      </Spin>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    escolas: state.controleSobras.escolas,
    diretoriasRegionais: state.controleSobras.diretoriasRegionais,
    tiposAlimento: state.controleSobras.tiposAlimento,
    tiposRecipiente: state.controleSobras.tiposRecipiente,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTiposAlimento,
      setTiposRecipiente,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCadastrarControleSobras);
