import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import CardMatriculados from "components/Shareable/CardMatriculados";
import { Rascunhos } from "./Rascunhos";
import { InputComData } from "../Shareable/DatePicker";
import { required } from "../../helpers/fieldValidators";
import {
  solicitacoesUnificadasSalvas,
  criarSolicitacaoUnificada,
  removerSolicitacaoUnificada
  // inicioPedido
} from "../../services/solicitacaoUnificada.service";
import { InputText } from "../Shareable/Input/InputText";
import { toastSuccess, toastError } from "../Shareable/Toast/dialogs";
import { Form, Field } from "react-final-form";
import { TextAreaWYSIWYG } from "../Shareable/TextArea/TextAreaWYSIWYG";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import {
  // checaSeDataEstaEntre2e5DiasUteis,
  getError
} from "../../helpers/utilities";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import "./style.scss";
import { formatarSubmissao } from "./helper";

const SolicitacaoUnificada = ({
  dadosUsuario,
  proximosDoisDiasUteis,
  // proximosCincoDiasUteis,
  escolas,
  // lotes,
  kits
}) => {
  const [rascunhosSalvos, setRascunhosSalvos] = useState([]);
  const [
    unidadesEscolaresSelecionadas,
    setUnidadesEscolaresSelecionadas
  ] = useState([]);
  const [totalKits, setTotalKits] = useState(0);
  // const [localPasseio, setLocalPasseio] = useState(undefined);
  // const [dataPasseio, setDataPasseio] = useState(undefined);
  const [opcoes, setOpcoes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function fetchData() {
    await solicitacoesUnificadasSalvas().then(
      res => {
        setRascunhosSalvos(res.results);
      },
      function(error) {
        toastError(
          `Erro ao carregar as inclusões salvas: ${getError(error.data)}`
        );
      }
    );
  }

  useEffect(() => {
    fetchData();
    if (escolas) {
      const opcoesEscolas = escolas.map(escola => {
        let label =
          escola.nome.length > 35 ? escola.nome.slice(0, 35) : escola.nome;
        let dado = escola;
        dado["quantidade_kits"] = "";
        dado["kits_selecionados"] = [];
        return { label: label, uuid: escola.uuid, value: dado };
      });
      setOpcoes(opcoesEscolas);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escolas]);

  const resetForm = () => {};

  const carregarRascunho = (solicitacaoUnificada, form) => {
    form.change("data", solicitacaoUnificada.data);
    form.change("local", solicitacaoUnificada.local);
    let escolas_quantidades = opcoes
      .filter(opcao =>
        solicitacaoUnificada.escolas_quantidades.find(
          eq => eq.escola.uuid === opcao.uuid
        )
      )
      .map(opcao => opcao.value);
    setUnidadesEscolaresSelecionadas(escolas_quantidades);
    escolas_quantidades.forEach(eq => {
      const eq_back = solicitacaoUnificada.escolas_quantidades.find(
        equ => equ.escola.uuid === eq.uuid
      );
      eq.nmr_alunos = eq_back.quantidade_alunos;
      eq.quantidade_kits = (eq_back.tempo_passeio + 1).toString();
      eq.kits_selecionados = eq_back.kits.map(kit => kit.uuid);
    });
    form.change("unidades_escolares", escolas_quantidades);
  };

  // const loadInitialValues = () => {
  //   console.log('chamei esse cara aqui')
  //   return ()
  // }

  const onSubmit = async (formValues, form) => {
    if (unidadesEscolaresSelecionadas.length === 0) {
      toastError("Selecione ao menos uma unidade escolar");
    } else {
      await criarSolicitacaoUnificada(
        JSON.stringify(formatarSubmissao(formValues, dadosUsuario))
      ).then(
        res => {
          if (res.status === HTTP_STATUS.CREATED) {
            if (formValues.status === "DRE_A_VALIDAR") {
              toastSuccess("Inicia Pedido");
              // this.iniciarPedido(res.data.uuid);
            } else {
              toastSuccess("Solicitação Unificada salva com sucesso!");
              setTimeout(() => form.restart());
              setUnidadesEscolaresSelecionadas([]);
              fetchData();
            }
          } else {
            toastError(
              `Houve um erro ao salvar a solicitação unificada: ${getError(
                res.data
              )}`
            );
          }
        },
        function() {
          toastError("Houve um erro ao salvar a solicitação unificada");
        }
      );
    }
  };

  const removerRascunho = (id_externo, uuid) => {
    if (window.confirm("Deseja remover este rascunho?")) {
      removerSolicitacaoUnificada(uuid).then(
        res => {
          if (res.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            fetchData();
          } else {
            toastError(
              `Houve um erro ao excluir o rascunho: ${getError(res.data)}`
            );
          }
        },
        function(error) {
          toastError(
            `Houve um erro ao excluir o rascunho: ${getError(error.data)}`
          );
        }
      );
    }
  };

  // const iniciarPedido = uuid => {
  //   inicioPedido(uuid).then(
  //     res => {
  //       if (res.status === HTTP_STATUS.OK) {
  //         toastSuccess("Solicitação Unificada enviada com sucesso!");
  //         resetForm();
  //       } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
  //         toastError(
  //           `Houve um erro ao salvar a solicitação unificada: ${getError(
  //             res.data
  //           )}`
  //         );
  //       }
  //     },
  //     function() {
  //       toastError("Houve um erro ao enviar a solicitação unificada");
  //     }
  //   );
  // };

  const renderizarLabelUnidadesEscolares = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione";
    }
    if (selected.length === options.length) {
      return "Todos as unidades escolares selecionados";
    }
    if (selected.length === 1) {
      return `${selected[0].nome}`;
    }
    if (selected.length > 1) {
      return `${selected[0].nome}; +${selected.length - 1}`;
    }
  };

  return (
    <>
      <CardMatriculados
        numeroAlunos={
          dadosUsuario
            ? dadosUsuario.vinculo_atual.instituicao.quantidade_alunos
            : 0
        }
      />
      <div className="mt-3">
        <Form
          onSubmit={onSubmit}
          // initialValues={}
          render={({ handleSubmit, values, form }) => (
            <form onSubmit={handleSubmit}>
              {rascunhosSalvos && rascunhosSalvos.length > 0 && (
                <div className="mt-3">
                  <span className="page-title">Rascunhos</span>
                  <Rascunhos
                    schoolsLoaded={escolas.length > 0}
                    unifiedSolicitationList={rascunhosSalvos}
                    OnDeleteButtonClicked={removerRascunho}
                    form={form}
                    resetForm={event => resetForm(event)}
                    OnEditButtonClicked={carregarRascunho}
                  />
                </div>
              )}
              <span className="page-title">Nova Solicitação</span>
              <div className="card mt-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-2 pb-3">
                      <Field
                        component={InputComData}
                        name="data"
                        minDate={proximosDoisDiasUteis}
                        label="Dia"
                        className="form-control"
                        validate={required}
                        required
                      />
                    </div>
                    <div className="col-5 pb-3">
                      <Field
                        component={InputText}
                        label="Local do passeio"
                        placeholder="Insira o local do passeio"
                        name="local"
                        className="form-control"
                        required
                        validate={required}
                      />
                    </div>
                    <div className="col-5 pb-3 input undefined">
                      <span className="required-asterisk">*</span>
                      <label
                        htmlFor="unidades_escolares"
                        className="col-form-label"
                      >
                        Unidades Escolares
                      </label>
                      <Field
                        component={StatefulMultiSelect}
                        name="unidades_escolares"
                        options={opcoes}
                        className="form-control"
                        valueRenderer={renderizarLabelUnidadesEscolares}
                        selected={unidadesEscolaresSelecionadas}
                        onSelectedChanged={value => {
                          let resultado = value.map(v => {
                            if (values.unidades_escolares) {
                              let elementFromForm = values.unidades_escolares.find(
                                e => e.uuid === v.uuid
                              );
                              if (elementFromForm) {
                                return elementFromForm;
                              }
                            }
                            return v;
                          });
                          form.change("unidades_escolares", resultado);
                          setUnidadesEscolaresSelecionadas(value);
                        }}
                        overrideStrings={{
                          search: "Busca",
                          selectSomeItems: "Selecione",
                          allItemsAreSelected:
                            "Todas as escolas estão selecionadas",
                          selectAll: "Todas"
                        }}
                      />
                    </div>
                  </div>

                  <hr />

                  {values.unidades_escolares &&
                    values.unidades_escolares.length > 0 && (
                      <div className="row mt-3">
                        {values.unidades_escolares.map((ue, idx) => {
                          return (
                            <div
                              className="col-12 lista-escolas"
                              key={ue.codigo_eol}
                            >
                              <div className="card pb-0">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-6">
                                      <p className="escola">
                                        {ue.codigo_eol} - {ue.nome}
                                      </p>
                                      <p className="local">{values.local}</p>
                                    </div>
                                    <div className="col-4">
                                      <p className="float-right mt-3">
                                        {values.data}
                                      </p>
                                    </div>
                                    <div className="col-1">
                                      <Botao
                                        type={BUTTON_TYPE.BUTTON}
                                        // onClick={() => removerEscola(ue)}
                                        style={BUTTON_STYLE.RED_OUTLINE}
                                        icon={BUTTON_ICON.TRASH}
                                        className="botao-remover-escola mt-1"
                                      />
                                    </div>
                                    <div className="col-1">
                                      <Botao
                                        type={BUTTON_TYPE.BUTTON}
                                        onClick={() => {
                                          let e = document.getElementById(
                                            ue.uuid
                                          );
                                          let i = document.getElementById(
                                            `${ue.uuid}-angle`
                                          );
                                          if (e.classList.contains("d-none")) {
                                            e.classList.remove("d-none");
                                          } else {
                                            e.classList.add("d-none");
                                          }

                                          if (
                                            i.classList.contains(
                                              "fa-angle-down"
                                            )
                                          ) {
                                            i.classList.remove("fa-angle-down");
                                            i.classList.add("fa-angle-up");
                                          } else {
                                            i.classList.remove("fa-angle-up");
                                            i.classList.add("fa-angle-down");
                                          }
                                        }}
                                        iconId={`${ue.uuid}-angle`}
                                        style={BUTTON_STYLE.GRAY_OUTLINE}
                                        icon={BUTTON_ICON.ANGLE_DOWN}
                                        className="botao-remover-escola mt-1"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="row mt-3 wrapper-solicitacao d-none p-3"
                                    id={ue.uuid}
                                  >
                                    <div className="col-4">
                                      <label
                                        htmlFor={`unidades_escolares[${idx}].nmr_alunos`}
                                        className="col-form-label"
                                      >
                                        <span className="required-asterisk">
                                          *
                                        </span>
                                        Nº padrão por unidade educacional
                                      </label>
                                      <Field
                                        component="input"
                                        type="number"
                                        min={0}
                                        max={ue.quantidade_alunos}
                                        placeholder="Quantidade de alunos"
                                        name={`unidades_escolares[${idx}].nmr_alunos`}
                                        className="form-control"
                                        onChange={event => {
                                          form.change(
                                            `unidades_escolares[${idx}].nmr_alunos`,
                                            event.target.value
                                          );
                                        }}
                                        required
                                        validate={required}
                                      />
                                    </div>
                                    <div className="col-8" />
                                    <div className="col-12 mt-3">
                                      <div className="label">
                                        <span className="required-asterisk">
                                          *{" "}
                                        </span>
                                        Tempo previsto do passeio
                                      </div>
                                      <div className="row mt-3">
                                        <div className="col-4">
                                          <label className="container-radio">
                                            até 4 horas (1 Kit)
                                            <Field
                                              component={"input"}
                                              type="radio"
                                              required
                                              validate={required}
                                              value="1"
                                              name={`unidades_escolares[${idx}].quantidade_kits`}
                                              onChange={() => {
                                                let total = 0;
                                                let listaQuantidadeKits = values.unidades_escolares
                                                  .filter(
                                                    e => e.uuid !== ue.uuid
                                                  )
                                                  .map(e =>
                                                    parseInt(e.quantidade_kits)
                                                  );
                                                for (
                                                  let i = 0;
                                                  i <
                                                  listaQuantidadeKits.length;
                                                  i++
                                                ) {
                                                  total =
                                                    total +
                                                    listaQuantidadeKits[i];
                                                }
                                                form.change(
                                                  `unidades_escolares[${idx}].kits_selecionados`,
                                                  []
                                                );
                                                form.change(
                                                  `unidades_escolares[${idx}].quantidade_kits`,
                                                  "1"
                                                );
                                                setTotalKits(total + 1);
                                              }}
                                            />
                                            <span className="checkmark" />
                                          </label>
                                        </div>
                                        <div className="col-4">
                                          <label className="container-radio">
                                            de 5 á 7 horas (2 Kits)
                                            <Field
                                              component={"input"}
                                              type="radio"
                                              value="2"
                                              required
                                              validate={required}
                                              name={`unidades_escolares[${idx}].quantidade_kits`}
                                              onChange={() => {
                                                let total = 0;
                                                let listaQuantidadeKits = values.unidades_escolares
                                                  .filter(
                                                    e =>
                                                      e.uuid !== ue.uuid &&
                                                      ![undefined, ""].includes(
                                                        e.quantidade_kits
                                                      )
                                                  )
                                                  .map(e =>
                                                    parseInt(e.quantidade_kits)
                                                  );
                                                for (
                                                  let i = 0;
                                                  i <
                                                  listaQuantidadeKits.length;
                                                  i++
                                                ) {
                                                  total =
                                                    total +
                                                    listaQuantidadeKits[i];
                                                }
                                                form.change(
                                                  `unidades_escolares[${idx}].kits_selecionados`,
                                                  []
                                                );
                                                form.change(
                                                  `unidades_escolares[${idx}].quantidade_kits`,
                                                  "2"
                                                );
                                                setTotalKits(total + 2);
                                              }}
                                            />
                                            <span className="checkmark" />
                                          </label>
                                        </div>
                                        <div className="col-4">
                                          <label className="container-radio">
                                            8 horas ou mais (3 Kits)
                                            <Field
                                              component={"input"}
                                              type="radio"
                                              value="3"
                                              required
                                              validate={required}
                                              name={`unidades_escolares[${idx}].quantidade_kits`}
                                              onChange={() => {
                                                let total = 0;
                                                let listaQuantidadeKits = values.unidades_escolares
                                                  .filter(
                                                    e => e.uuid !== ue.uuid
                                                  )
                                                  .map(e =>
                                                    parseInt(e.quantidade_kits)
                                                  );
                                                for (
                                                  let i = 0;
                                                  i <
                                                  listaQuantidadeKits.length;
                                                  i++
                                                ) {
                                                  total =
                                                    total +
                                                    listaQuantidadeKits[i];
                                                }
                                                form.change(
                                                  `unidades_escolares[${idx}].kits_selecionados`,
                                                  []
                                                );
                                                form.change(
                                                  `unidades_escolares[${idx}].quantidade_kits`,
                                                  "3"
                                                );
                                                setTotalKits(total + 3);
                                              }}
                                            />
                                            <span className="checkmark" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                      <div className="label">
                                        <span className="required-asterisk">
                                          *{" "}
                                        </span>
                                        Selecione a opção desejada
                                      </div>
                                      <div className="row mt-3">
                                        {kits.map((kit, indice) => {
                                          return (
                                            <div
                                              className="col-4 d-flex"
                                              key={indice}
                                            >
                                              <div className="card card-kits w-100">
                                                <div className="card-body p-2">
                                                  <div className="row">
                                                    <div className="col-6">
                                                      <span className="nome-kit">
                                                        {kit.nome}
                                                      </span>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                      <Field
                                                        component={"input"}
                                                        type="checkbox"
                                                        required
                                                        validate={required}
                                                        value={kit.uuid}
                                                        id={`${ue.codigo_eol}-${
                                                          kit.uuid
                                                        }`}
                                                        className="float-right"
                                                        name={`unidades_escolares[${idx}].kits_selecionados`}
                                                        disabled={
                                                          [
                                                            undefined,
                                                            ""
                                                          ].includes(
                                                            ue.quantidade_kits
                                                          ) ||
                                                          (ue.quantidade_kits ===
                                                            `${
                                                              ue
                                                                .kits_selecionados
                                                                .length
                                                            }` &&
                                                            !ue.kits_selecionados.includes(
                                                              kit.uuid
                                                            ))
                                                        }
                                                      />
                                                      <span className="checkmark" />
                                                    </div>
                                                    <div className="col-12 kit-itens mt-3">
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html: kit.descricao
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                      <p>
                                        Número de kits dessa escola:{" "}
                                        {ue.kits_selecionados.length}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  <div className="row">
                    <div className="col-6">
                      <p>
                        Total de Unidades Escolares:{" "}
                        {unidadesEscolaresSelecionadas.length}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="float-right">
                        Total de Kits Lanche: {totalKits}
                      </p>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-12">
                      <Field
                        component={TextAreaWYSIWYG}
                        label="Observações"
                        name="descricao"
                      />
                    </div>
                    <div className="offset-10 col-2">
                      <Botao
                        type={BUTTON_TYPE.SUBMIT}
                        style={BUTTON_STYLE.GREEN}
                        texto="Salvar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      </div>
      <ModalDataPrioritaria
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
};

export default SolicitacaoUnificada;
