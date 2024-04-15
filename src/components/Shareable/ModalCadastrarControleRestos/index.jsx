import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getVinculosTipoAlimentacaoPorTipoUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { Field, Form } from "react-final-form";
import { Select } from "components/Shareable/Select";
import { Spin } from "antd";
import {
  required,
  requiredSearchSelectUnidEducDietas,
  numeroDecimal,
  noSpaceStartOrEnd,
  requiredOptionSearchSelect,
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
import { cadastrarControleRestos } from "services/controleRestos.service";
import { toastError, toastSuccess } from "../Toast/dialogs";
import { connect } from "react-redux";
import "./styles.scss";
import ManagedInputFileField from "../Input/InputFile/ManagedField";
import { InputComData } from "../DatePicker";
import moment from "moment";
import { InputHorario } from "../Input/InputHorario";

const ModalCadastrarControleRestos = ({
  closeModal,
  showModal,
  changePage,
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
  const [HoraMedicao, setHoraMedicao] = useState("00:00");
  const [HoraMedicaoAlterada, setHoraMedicaoAlterada] = useState(false);

  const checkInitialValues = async () => {
    if (selecionado) {
      const data_hora_medicao = selecionado.data_hora_medicao
        ? moment(selecionado.data_hora_medicao, "DD/MM/YYYY HH:mm")
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
      setHoraMedicao("00:00");
      setInitialValues({
        hora_medicao: "00:00",
      });
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

  const onBlurEscola = async (form, values) => {
    const value = values.escola;
    if (!value) {
      if (tiposAlimentacao) {
        setTiposAlimentacao([]);
        form?.change("tipo_alimentacao", undefined);
      }
      return;
    }

    const escola = escolas.filter(
      (e) => e?.codigo_eol === value.split(" - ")[0]
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
      setTiposAlimentacao([]);
    }
    form?.change("tipo_alimentacao", undefined);
  };

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
      peso_resto: parseDecimal(formValues.peso_resto),
      quantidade_distribuida: parseDecimal(formValues.quantidade_distribuida),
      cardapio: formValues.cardapio,
      resto_predominante: formValues.resto_predominante,
      imagens: formValues.imagens?.map((a) => ({
        nome: a.nome,
        arquivo: a.base64,
      })),
      data_hora_medicao: data_hora_medicao.toDate(),
    };

    await cadastrarControleRestos(payload)
      .then(() => {
        toastSuccess("Cadastro de Resto efetuado com sucesso.");
        closeModal();
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

  const escolherHora = (hora, form) => {
    setTimeout(() => {
      if (hora) {
        const horario = moment(hora).format("HH:mm:ss");
        setHoraMedicao(horario);
        setHoraMedicaoAlterada(true);
        form.change("hora_medicao", horario);
      } else {
        setHoraMedicao("00:00:00");
        setHoraMedicaoAlterada(false);
        form.change("hora_medicao", "00:00:00");
      }
    }, 100);
  };

  const validaHora = (value) => {
    value = HoraMedicaoAlterada ? HoraMedicao : undefined;
    return value !== undefined ? "" : "Campo obrigatório";
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selecionado ? "Visualizar" : "Cadastrar"} Resto
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
                          selecionado ||
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
                          selecionado
                            ? "input-controle-restos"
                            : "input-busca-nome-item"
                        }
                        disabled={
                          selecionado ||
                          tipoUsuario === TIPO_PERFIL.ESCOLA ||
                          !values.dre
                        }
                        required
                        validate={composeValidators(
                          required,
                          requiredSearchSelectUnidEducDietas(escolas)
                        )}
                        inputOnChange={() => onBlurEscola(form, values)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Field
                        dataSource={tiposAlimentacao.map((tipo) => tipo.nome)}
                        component={AutoCompleteField}
                        name="tipo_alimentacao"
                        label="Tipo de Alimentação"
                        placeholder={"Digite um nome"}
                        className={
                          selecionado
                            ? "input-controle-restos"
                            : "input-busca-nome-item"
                        }
                        required
                        validate={composeValidators(
                          required,
                          requiredOptionSearchSelect(tiposAlimentacao, "nome")
                        )}
                        disabled={!!selecionado}
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        label="Peso do Resto(Kg)"
                        name="peso_resto"
                        component={InputText}
                        placeholder={"Digite um peso"}
                        className={selecionado ? "input-controle-restos" : ""}
                        required
                        validate={composeValidators(
                          required,
                          numeroDecimal,
                          noSpaceStartOrEnd
                        )}
                        disabled={!!selecionado}
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        label="Quantidade Distribuída"
                        name="quantidade_distribuida"
                        component={InputText}
                        placeholder={"Digite uma quantidade distribuída"}
                        className={selecionado ? "input-controle-restos" : ""}
                        required
                        validate={composeValidators(
                          required,
                          numeroDecimal,
                          noSpaceStartOrEnd
                        )}
                        disabled={!!selecionado}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Field
                        label="Cardápio"
                        name="cardapio"
                        component={InputText}
                        placeholder={"Digite o cardápio"}
                        className={selecionado ? "input-controle-restos" : ""}
                        required
                        validate={composeValidators(
                          required,
                          noSpaceStartOrEnd
                        )}
                        disabled={!!selecionado}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        label="Resto Predominante"
                        name="resto_predominante"
                        component={InputText}
                        className={selecionado ? "input-controle-restos" : ""}
                        required
                        validate={composeValidators(
                          required,
                          noSpaceStartOrEnd
                        )}
                        disabled={!!selecionado}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
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
                          (selecionado ? " input-controle-restos" : "")
                        }
                        disabled={!!selecionado}
                        writable={false}
                        validate={required}
                        required
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        component={InputHorario}
                        label="Hora da Medição"
                        name="hora_medicao"
                        placeholder="Selecione a Hora"
                        horaAtual={HoraMedicao}
                        onOk={(hora) => escolherHora(hora, form)}
                        writable={false}
                        className={
                          "input-data-hora" +
                          (selecionado ? " input-controle-restos" : "")
                        }
                        disabled={!!selecionado}
                        validate={validaHora}
                        required
                      />
                    </div>
                  </div>
                  {!selecionado && (
                    <section className="form-row attachments">
                      <div className="col-6">
                        <div className="card-title font-weight-bold cinza-escuro">
                          Anexar
                        </div>
                        <div className="text">Anexar fotos relacionadas.</div>
                      </div>
                      <div className="col-6 btn">
                        <Field
                          component={ManagedInputFileField}
                          concatenarNovosArquivos
                          className="inputfile"
                          texto="Anexar"
                          name="imagens"
                          accept=".png, .jpeg, .jpg"
                          icone={BUTTON_ICON.ATTACH}
                          required
                          validate={required}
                          toastSuccessMessage="Anexo incluso com sucesso"
                        />
                      </div>
                    </section>
                  )}
                  {selecionado && (
                    <div className="section-cards-imagens pb-3">
                      {(selecionado.imagens?.length ?? []) > 0 && (
                        <>
                          {selecionado.imagens
                            .filter((anexo) => anexo.arquivo.includes("media"))
                            .map((anexo, key) => {
                              return (
                                <div
                                  key={key}
                                  className={`px-1 arquivos-anexados ${
                                    key > 0 ? "mt-1" : ""
                                  }`}
                                >
                                  <span onClick={() => openFile(anexo)}>
                                    <i className="fas fa-paperclip" />
                                  </span>
                                  <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={anexo.arquivo}
                                    className="link ml-1 mr-5"
                                  >
                                    {anexo.nome}
                                  </a>
                                </div>
                              );
                            })}
                        </>
                      )}
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
                        className="ml-3"
                      />
                      {!selecionado && (
                        <Botao
                          texto="Salvar"
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN}
                          className="ml-3"
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
    escolas: state.controleRestos.escolas,
    diretoriasRegionais: state.controleRestos.diretoriasRegionais,
    tiposAlimento: state.controleRestos.tiposAlimento,
    tiposRecipiente: state.controleRestos.tiposRecipiente,
  };
};

export default connect(mapStateToProps)(ModalCadastrarControleRestos);
