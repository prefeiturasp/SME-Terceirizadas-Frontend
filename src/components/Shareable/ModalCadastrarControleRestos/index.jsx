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
  peloMenosUmCaractere,
} from "helpers/fieldValidators";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON,
} from "components/Shareable/Botao/constants";
import { TIPO_PERFIL } from "constants/shared";
import AutoCompleteField from "../AutoCompleteField";
import InputText from "../Input/InputText";
import { composeValidators } from "helpers/utilities";
import { formatarVinculosParaTiposAlimentacao } from "helpers/controleRestos";
import {
  cadastrarControleRestos,
  atualizarControleRestos,
} from "services/controleRestos.service";
import { toastError, toastSuccess } from "../Toast/dialogs";
import { connect } from "react-redux";
import "./styles.scss";
import ManagedInputFileField from "../Input/InputFile/ManagedField";
import { InputComData } from "../DatePicker";
import moment from "moment";
import { PERIODO_DESPERDICIO } from "../../../constants/shared";
import { TextArea } from "components/Shareable/TextArea/TextArea";

const ModalCadastrarControleRestos = ({
  closeModal,
  showModal,
  tipoUsuario,
  escolas,
  diretoriasRegionais,
  selecionado,
}) => {
  const [carregando, setCarregando] = useState(false);
  const [nomeEscolas, setNomeEscolas] = useState([]);
  const [escolaSelected, setEscolaSelected] = useState();
  const [tiposAlimentacao, setTiposAlimentacao] = useState([]);
  const [initialValues, setInitialValues] = useState(undefined);

  const [registroEdicao, setRegistroEdicao] = useState(selecionado);

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
        peso_resto: formatDecimal(selecionado.peso_resto),
        quantidade_distribuida: formatDecimal(
          selecionado.quantidade_distribuida
        ),
        cardapio: selecionado.cardapio,
        resto_predominante: selecionado.resto_predominante,
        data_medicao: data_medicao ? data_medicao.format("DD/MM/YYYY") : null,
        periodo:
          selecionado.periodo &&
          PERIODO_DESPERDICIO.find((p) => p.uuid === selecionado.periodo).nome,
        observacoes: selecionado.observacoes,
      };
      setInitialValues(_initValues);
      onChangeDre();
      onBlurEscola(undefined, {
        escola:
          selecionado?.escola.codigo_eol + " - " + selecionado.escola?.nome,
      });
    } else {
      setRegistroEdicao(undefined);
      setNomeEscolas(escolas.map((ue) => `${ue.codigo_eol} - ${ue.label}`));
      setInitialValues({});
    }
  };

  useEffect(() => {
    if (showModal) {
      checkInitialValues();
    } else {
      setInitialValues(undefined);
      setEscolaSelected(undefined);
      setTiposAlimentacao([]);
    }
  }, [showModal]);

  const onChangeDre = (e, form) => {
    const value = e
      ? e.target.value
      : selecionado.escola.diretoria_regional.uuid;
    const ueFiltro =
      value === "all"
        ? escolas
        : escolas.filter((ue) => value.includes(ue.dre.uuid));
    setNomeEscolas(ueFiltro.map((ue) => `${ue.codigo_eol} - ${ue.label}`));
    if (form) {
      tipoUsuario !== TIPO_PERFIL.ESCOLA && form.change("escola", undefined);
    }
  };

  const onBlurEscola = async (form, value) => {
    if (!value) {
      if (tiposAlimentacao) {
        setTiposAlimentacao([]);
        form?.change("tipo_alimentacao", undefined);
      }
      return;
    }

    const escola = escolas.filter(
      (e) =>
        e?.codigo_eol ===
        (typeof value === "string" ? value : value.escola).split(" - ")[0]
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
  };

  const onSubmit = async (formValues, form) => {
    if (moment(formValues.data_medicao, "DD/MM/YYYY").isAfter(moment())) {
      return toastError("Data da Medição não podem ser posteriores à data.");
    }

    setCarregando(true);

    const payload = {
      ...formValues,
      escola: escolaSelected.value,
      tipo_alimentacao: tiposAlimentacao.find(
        (tipo) => tipo.nome === formValues.tipo_alimentacao
      ).uuid,
      peso_resto: parseDecimal(formValues.peso_resto),
      quantidade_distribuida: parseDecimal(formValues.quantidade_distribuida),
      cardapio: formValues.cardapio,
      resto_predominante: formValues.resto_predominante,
      imagens: formValues.imagens?.map((a) => ({
        nome: a.nome,
        arquivo: a.base64,
      })),
      data_medicao: formValues.data_medicao,
      periodo: PERIODO_DESPERDICIO.find((p) => p.nome === formValues.periodo)
        .uuid,
      observacoes: formValues.observacoes,
    };

    if (selecionado) {
      await atualizarControleRestos(payload, selecionado.uuid)
        .then(() => {
          toastSuccess("Cadastro atualizado com sucesso.");
          cleanForm(formValues);
          form.restart();
        })
        .catch((error) => {
          toastError(error.response.data[0]);
        });
    } else {
      await cadastrarControleRestos(payload)
        .then(() => {
          toastSuccess("Cadastro de Resto efetuado com sucesso.");
          cleanForm(formValues);
          form.restart();
        })
        .catch((error) => {
          toastError(error.response.data[0]);
        });
    }

    setCarregando(false);
  };

  const cleanForm = (formValues) => {
    const _initValues = {
      ...formValues,
      peso_resto: null,
      quantidade_distribuida: null,
      cardapio: null,
      resto_predominante: null,
      observacoes: null,
      imagens: [],
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
    return value.replaceAll(".", ",");
  };

  const parseDecimal = (value) => {
    if (!value) return value;
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
  };

  const openFile = (file) => {
    if (file.arquivo && file.arquivo.startsWith("http")) {
      window.open(file.arquivo);
    } else if (file.nome.includes(".doc")) {
      const link = document.createElement("a");
      link.href = file.base64;
      link.download = file.nome;
      link.click();
    } else {
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='" + file.base64 + "'></iframe>"
      );
    }
  };

  return (
    <Modal
      dialogClassName="modal-90w"
      show={showModal}
      onHide={closeModal}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {registroEdicao ? "Visualizar" : "Cadastrar"} Resto
        </Modal.Title>
      </Modal.Header>
      <Spin tip="Carregando..." spinning={carregando}>
        {initialValues !== undefined && (
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={() => {}}
            render={({ handleSubmit, submitting, form, values }) => (
              <form onSubmit={(values) => handleSubmit(values, form)}>
                <Modal.Body>
                  <div className="row">
                    <div className="col-6">
                      <Field
                        label="Diretoria Regional de Educação"
                        component={Select}
                        className={
                          registroEdicao
                            ? "input-controle-restos"
                            : "input-busca-dre"
                        }
                        name="dre"
                        options={[{ uuid: "all", nome: "TODAS" }].concat(
                          diretoriasRegionais.map((dre) => {
                            return { uuid: dre.value, nome: dre.label };
                          })
                        )}
                        disabled={
                          tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                          tipoUsuario === TIPO_PERFIL.ESCOLA
                        }
                        naoDesabilitarPrimeiraOpcao
                        onChangeEffect={(e) => onChangeDre(e, form)}
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
                            ? "input-controle-restos"
                            : "input-busca-nome-item"
                        }
                        disabled={tipoUsuario === TIPO_PERFIL.ESCOLA}
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
                        writable={false}
                        validate={required}
                        required
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        dataSource={PERIODO_DESPERDICIO.map(
                          (tipo) => tipo.nome
                        )}
                        name="periodo"
                        label="Período"
                        component={AutoCompleteField}
                        placeholder={"Digite o Período"}
                        className={
                          registroEdicao
                            ? "input-controle-sobras"
                            : "input-busca-nome-item"
                        }
                        validate={composeValidators(
                          required,
                          requiredOptionSearchSelect(
                            PERIODO_DESPERDICIO,
                            "nome"
                          )
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
                            ? "input-controle-restos"
                            : "input-busca-nome-item"
                        }
                        required
                        validate={composeValidators(
                          required,
                          requiredOptionSearchSelect(tiposAlimentacao, "nome")
                        )}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Field
                        label="Cardápio"
                        name="cardapio"
                        component={InputText}
                        placeholder={"Digite o Cardápio"}
                        className={
                          registroEdicao ? "input-controle-restos" : ""
                        }
                        required
                        validate={composeValidators(
                          required,
                          noSpaceStartOrEnd,
                          peloMenosUmCaractere
                        )}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        label="Resto Predominante"
                        name="resto_predominante"
                        component={InputText}
                        placeholder={"Digite o Resto Predominante"}
                        className={
                          registroEdicao ? "input-controle-restos" : ""
                        }
                        required
                        validate={composeValidators(
                          required,
                          noSpaceStartOrEnd
                        )}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <Field
                        label="Peso do Resto (Kg)"
                        name="peso_resto"
                        component={InputText}
                        placeholder={"Digite o Peso do Resto"}
                        agrupadorMilharComDecimal
                        maxlength="6"
                        className={
                          registroEdicao ? "input-controle-restos" : ""
                        }
                        required
                        proibeLetras
                        validate={composeValidators(required)}
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        label="Quantidade Distribuída (Kg)"
                        name="quantidade_distribuida"
                        component={InputText}
                        placeholder={"Digite o Peso da Quantidade Distribuída"}
                        agrupadorMilharComDecimal
                        maxlength="6"
                        className={
                          registroEdicao ? "input-controle-restos" : ""
                        }
                        required
                        proibeLetras
                        validate={composeValidators(required)}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        component={TextArea}
                        placeholder="Digite as Observações"
                        label="Observações"
                        name="observacoes"
                        maxLength={1500}
                      />
                    </div>
                  </div>
                  {!registroEdicao && (
                    <div className="row mt-4">
                      <section className="form-row attachments">
                        <div className="col-12">
                          <div className="card-title font-weight-bold cinza-escuro">
                            Anexos
                          </div>
                          <Field
                            component={ManagedInputFileField}
                            concatenarNovosArquivos
                            className="inputfile"
                            texto="Carregar Imagem"
                            name="imagens"
                            accept=".png, .jpeg, .jpg"
                            icone={BUTTON_ICON.ATTACH}
                            toastSuccessMessage="Imagem carregada com sucesso."
                          />
                        </div>
                      </section>
                    </div>
                  )}
                  {registroEdicao && (
                    <div className="row mt-4">
                      <div className="section-cards-imagens pb-3">
                        {(registroEdicao.imagens?.length ?? []) > 0 && (
                          <>
                            {registroEdicao.imagens
                              .filter((anexo) =>
                                anexo.arquivo.includes("media")
                              )
                              .map((anexo, key) => {
                                return (
                                  <div
                                    key={key}
                                    className={`px-1 arquivos-anexados ${
                                      key > 0 ? "mt-1" : ""
                                    }`}
                                  >
                                    <span onClick={() => openFile(anexo)}>
                                      <i className="fas fa-paperclip me-2" />
                                    </span>
                                    <a
                                      rel="noopener noreferrer"
                                      target="_blank"
                                      href={anexo.arquivo}
                                      className="link"
                                    >
                                      {anexo.nome}
                                    </a>
                                  </div>
                                );
                              })}
                          </>
                        )}
                      </div>
                    </div>
                  )}
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
    escolas: state.controleRestos.escolas,
    diretoriasRegionais: state.controleRestos.diretoriasRegionais,
    tiposAlimento: state.controleRestos.tiposAlimento,
    tiposRecipiente: state.controleRestos.tiposRecipiente,
  };
};

export default connect(mapStateToProps)(ModalCadastrarControleRestos);
