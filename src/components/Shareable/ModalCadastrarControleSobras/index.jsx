import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getVinculosTipoAlimentacaoPorTipoUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { Field, Form } from "react-final-form";
import { Select } from "components/Shareable/Select";
import { Spin } from "antd";
import {
  required,
  requiredSearchSelectUnidEducDietas,
  requiredOptionSearchSelect,
  inteiroOuDecimalComVirgula
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
import moment from "moment";
import { PERIODO_SOBRAS } from "../../../constants/shared";

const ModalCadastrarControleSobras = ({
  closeModal,
  showModal,
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

      const data_medicao = selecionado.data_medicao
        ? moment(selecionado.data_medicao, "DD/MM/YYYY")
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
        data_medicao: data_medicao
          ? data_medicao.format("DD/MM/YYYY")
          : null,
        periodo: PERIODO_SOBRAS.find(p => p.uuid === selecionado.periodo).nome,
      };

      setInitialValues(_initValues);
      onBlurEscola(undefined, {
        escola:
          selecionado?.escola.codigo_eol + " - " + selecionado.escola?.nome,
      });
    } else {
      setRegistroEdicao(undefined);
      setNomeEscolas(escolas.map(ue => `${ue.codigo_eol} - ${ue.label}`));
      setInitialValues({});
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
    if (moment(formValues.data_medicao, "DD/MM/YYYY").isAfter(moment())) {
      return toastError(
        "Data da Medição não podem ser posteriores à data."
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
      data_medicao: formValues.data_medicao,
      periodo: PERIODO_SOBRAS.find(p => p.nome === formValues.periodo).uuid,
    };

    await cadastrarControleSobras(payload)
      .then(() => {
        toastSuccess("Cadastro de Sobras efetuado com sucesso.");
        cleanForm(formValues);
      })
      .catch((error) => {
        toastError(error.response.data[0]);
      });

    setCarregando(false);
  };

  const cleanForm = (formValues) => {

    const _initValues = {
      ...formValues,
      tipo_alimento: null,
      tipo_recipiente: null,
      peso_alimento: null,
      peso_recipiente: null,
      peso_sobra: null,
    };

    setInitialValues(_initValues);

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
                        className={
                          registroEdicao
                            ? "input-controle-sobras"
                            : "input-busca-dre"
                        }
                        name="dre"
                        options={[{ uuid: "all", nome: "TODAS" }].concat(
                          diretoriasRegionais.map((dre) => {
                            return { uuid: dre.value, nome: dre.label };
                          })
                        )}
                        disabled={
                          registroEdicao ||
                          tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                          tipoUsuario === TIPO_PERFIL.ESCOLA
                        }
                        naoDesabilitarPrimeiraOpcao
                        onChangeEffect={(e) => {
                          const value = e.target.value;
                          const ueFiltro = value === "all" ? escolas : escolas.filter(ue => value.includes(ue.dre.uuid));
                          setNomeEscolas(ueFiltro.map(ue => `${ue.codigo_eol} - ${ue.label}`));
                          tipoUsuario !== TIPO_PERFIL.ESCOLA && form.change("escola", undefined);
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
                          tipoUsuario === TIPO_PERFIL.ESCOLA
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
                    <div className="col-3">
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
                    <div className="col-3">
                      <Field
                        dataSource={PERIODO_SOBRAS.map((tipo) => tipo.nome)}
                        name="periodo"
                        label="Período"
                        component={AutoCompleteField}
                        placeholder={"Digite o Período"}
                        className={
                          registroEdicao
                            ? "input-controle-sobras"
                            : "input-busca-nome-item"
                        }
                        disabled={!!registroEdicao}
                        validate={composeValidators(
                          required,
                          requiredOptionSearchSelect(PERIODO_SOBRAS, "nome")
                        )}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        dataSource={tiposAlimentacao.map((tipo) => tipo.nome)}
                        component={AutoCompleteField}
                        name="tipo_alimentacao"
                        label="Tipo de Alimentação"
                        placeholder={"Digite um Tipo de Alimentação"}
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
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Field
                        dataSource={tiposAlimento.map((tipo) => tipo.nome)}
                        component={AutoCompleteField}
                        name="tipo_alimento"
                        label="Tipo de Alimento"
                        placeholder={"Digite um Tipo de Alimento"}
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
                    <div className="col-6">
                      <Field
                        dataSource={tiposRecipiente.map((tipo) => tipo.nome)}
                        component={AutoCompleteField}
                        name="tipo_recipiente"
                        label="Tipo de Recipiente"
                        placeholder={"Digite um Tipo de Recipiente"}
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
                        placeholder={"Digite o Peso do Recipiente"}
                        required
                        proibeLetras
                        className={registroEdicao ? "input-controle-sobras" : "input-busca-nome-item"}
                        validate={composeValidators(
                          required,
                          inteiroOuDecimalComVirgula,
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        label="Peso do Alimento Pronto (Kg)"
                        name="peso_alimento"
                        component={InputText}
                        placeholder={"Digite o Peso do Alimento Pronto"}
                        className={registroEdicao ? "input-controle-sobras" : ""}
                        required
                        proibeLetras
                        validate={composeValidators(
                          required,
                          inteiroOuDecimalComVirgula,
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        label="Peso da Sobra (Kg)"
                        name="peso_sobra"
                        component={InputText}
                        placeholder={"Digite o Peso da Sobra"}
                        required
                        proibeLetras
                        className={registroEdicao ? "input-controle-sobras" : ""}
                        validate={composeValidators(
                          required,
                          inteiroOuDecimalComVirgula,
                        )}
                        disabled={!!registroEdicao}
                      />
                    </div>
                  </div>
                </Modal.Body>
                {!registroEdicao && (<Modal.Footer>
                  <div className="row mt-4">
                    <div className="col-12">
                      <Botao
                        texto="Cancelar"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={closeModal}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="me-3"
                      />
                      <Botao
                        texto="Salvar"
                        type={BUTTON_TYPE.SUBMIT}
                        style={BUTTON_STYLE.GREEN}
                        className="me-3"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </Modal.Footer>
                )}
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
