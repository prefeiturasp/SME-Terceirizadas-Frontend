import React, { useState, useEffect } from "react";
import CardMatriculados from "components/Shareable/CardMatriculados";
import { Rascunhos } from "./Rascunhos";
import { InputComData } from "../Shareable/DatePicker";
import { required } from "../../helpers/fieldValidators";
import { solicitacoesUnificadasSalvas } from "../../services/solicitacaoUnificada.service";
import { InputText } from "../Shareable/Input/InputText";
import { getError } from "../../helpers/utilities";
import { toastError } from "../Shareable/Toast/dialogs";
import { Form, Field } from "react-final-form";
import { TextAreaWYSIWYG } from "../Shareable/TextArea/TextAreaWYSIWYG";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import "./style.scss";

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
  // const [localPasseio, setLocalPasseio] = useState(undefined);
  // const [dataPasseio, setDataPasseio] = useState(undefined);
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
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

      if (escolas) {
        const opcoesEscolas = escolas.map(escola => {
          let label =
            escola.nome.length > 35 ? escola.nome.slice(0, 35) : escola.nome;
          let dado = escola;
          dado["quantiade_kits"] = "";
          dado["kits_selecionados"] = [];
          return { label: label, uuid: escola.uuid, value: dado };
        });
        setOpcoes(opcoesEscolas);
      }
    }
    fetchData();
  }, [escolas]);

  const resetForm = () => {};

  const carregarRascunho = () => {};

  const removerRascunho = () => {};

  // const loadInitialValues = () => {
  //   console.log('chamei esse cara aqui')
  //   return ()
  // }

  const onSubmit = async () => {};

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

  // const removerEscola = _escola => {
  // };

  return (
    <>
      <CardMatriculados
        numeroAlunos={
          dadosUsuario
            ? dadosUsuario.vinculo_atual.instituicao.quantidade_alunos
            : 0
        }
      />

      {rascunhosSalvos && rascunhosSalvos.length > 0 && (
        <div className="mt-3">
          <span className="page-title">Rascunhos</span>
          <Rascunhos
            schoolsLoaded={escolas.length > 0}
            unifiedSolicitationList={rascunhosSalvos}
            OnDeleteButtonClicked={removerRascunho}
            resetForm={event => resetForm(event)}
            OnEditButtonClicked={params => carregarRascunho(params)}
          />
        </div>
      )}

      <div className="mt-3">
        <span className="page-title">Nova Solicitação</span>
        <Form
          onSubmit={onSubmit}
          // initialValues={}
          render={({ handleSubmit, values, form }) => (
            <form onSubmit={handleSubmit}>
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
                      <StatefulMultiSelect
                        name="unidades_escolares"
                        options={opcoes}
                        className="form-control"
                        valueRenderer={renderizarLabelUnidadesEscolares}
                        selected={unidadesEscolaresSelecionadas}
                        onSelectedChanged={value => {
                          form.change("unidades_escolares", value);
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
                          // console.log(values);
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
                                      <Field
                                        component={InputText}
                                        label="Nº padrão por unidade educacional"
                                        placeholder="Quantidade de alunos"
                                        name={`unidades_escolares[${idx}].nmr_alunos`}
                                        className="form-control"
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
                                              value="1"
                                              name={`unidades_escolares[${idx}].quantiade_kits`}
                                              onChange={() => {
                                                form.change(
                                                  `unidades_escolares[${idx}].kits_selecionados`,
                                                  []
                                                );
                                                form.change(
                                                  `unidades_escolares[${idx}].quantiade_kits`,
                                                  "1"
                                                );
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
                                              name={`unidades_escolares[${idx}].quantiade_kits`}
                                              onChange={() => {
                                                form.change(
                                                  `unidades_escolares[${idx}].kits_selecionados`,
                                                  []
                                                );
                                                form.change(
                                                  `unidades_escolares[${idx}].quantiade_kits`,
                                                  "2"
                                                );
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
                                              name={`unidades_escolares[${idx}].quantiade_kits`}
                                              onChange={() => {
                                                form.change(
                                                  `unidades_escolares[${idx}].kits_selecionados`,
                                                  []
                                                );
                                                form.change(
                                                  `unidades_escolares[${idx}].quantiade_kits`,
                                                  "3"
                                                );
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
                                                            ue.quantiade_kits
                                                          ) ||
                                                          (ue.quantiade_kits ===
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
                      <p className="float-right">Total de Kits Lanche: 0</p>
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
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default SolicitacaoUnificada;
