import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Select } from "components/Shareable/Select";
import InputText from "components/Shareable/Input/InputText";
import {
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhEmpresaTerceirizada
} from "helpers/utilities";
import { Spin } from "antd";
import { TIPOS_SOLICITACOES_OPTIONS } from "constants/shared";
import { InputComData } from "./DatePicker";
import { ASelect } from "./MakeField";
import { getNomesUnicosEditais } from "services/produto.service";

const CardBody = props => {
  const [editais, setEditais] = useState([]);
  const ehTerceirizada = usuarioEhEmpresaTerceirizada();
  const ehEscola =
    usuarioEhEscolaTerceirizadaDiretor() || usuarioEhEscolaTerceirizada();
  const { exibirFiltrosDataEventoETipoSolicitacao } = props;
  const ehDashboardGestaoProduto = props.ehDashboardGestaoProduto;
  const filtrosDesabilitados = props.filtrosDesabilitados || false;
  const loadingDietas = props.loadingDietas || false;
  const pathname = window.location.pathname;
  useEffect(() => {
    (async () => {
      try {
        const listaEditais = await getNomesUnicosEditais();
        let listaRsultados = listaEditais.data.results;
        let listaFormatada = listaRsultados.map(element => {
          return { value: element, label: element };
        });
        setEditais(listaFormatada);
      } catch (erro) {
        throw erro;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card mt-3">
      <div className="card-body dash-terc">
        <div className="card-title font-weight-bold dashboard-card-title">
          <Form
            onSubmit={() => {}}
            initialValues={{}}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div
                    className={`${
                      ehTerceirizada && props.listaStatus && props.listaLotes
                        ? "col-3"
                        : ehDashboardGestaoProduto
                        ? "col-12 text-right"
                        : exibirFiltrosDataEventoETipoSolicitacao
                        ? "col-3 px-0"
                        : "col-6"
                    }`}
                  >
                    <span>{props.titulo}</span>
                    <p className="current-date">
                      Data: <span>{props.dataAtual}</span>
                    </p>
                  </div>

                  {ehDashboardGestaoProduto && (
                    <div className="col-4 produtos-edital">
                      {loadingDietas && (
                        <div>
                          <Spin
                            className="carregando-filtro"
                            tip="Carregando Filtro..."
                          />
                        </div>
                      )}
                      <Field
                        component={ASelect}
                        showSearch
                        name="edital"
                        placeholder={loadingDietas ? "" : "Número do Edital"}
                        disabled={loadingDietas || filtrosDesabilitados}
                        options={
                          editais
                            ? [{ label: "Número do Edital", value: "" }].concat(
                                editais
                              )
                            : []
                        }
                      />
                      <OnChange name="edital">
                        {() => {
                          props.onChange(values);
                        }}
                      </OnChange>
                    </div>
                  )}

                  {!ehEscola && (
                    <div
                      className={`${
                        ehTerceirizada && props.listaStatus && props.listaLotes
                          ? "offset-3 col-6"
                          : exibirFiltrosDataEventoETipoSolicitacao
                          ? "col-3"
                          : ehDashboardGestaoProduto
                          ? "col-4"
                          : "offset-3 col-3"
                      }`}
                    >
                      {loadingDietas && (
                        <div>
                          <Spin
                            className="carregando-filtro"
                            tip="Carregando Filtro..."
                          />
                        </div>
                      )}
                      <Field
                        className={
                          exibirFiltrosDataEventoETipoSolicitacao
                            ? "input-com-filtros-adicionais"
                            : ""
                        }
                        component={InputText}
                        name="titulo"
                        placeholder={loadingDietas ? "" : "Pesquisar"}
                        disabled={loadingDietas || filtrosDesabilitados}
                      />
                      <div className="warning-num-charac">
                        * mínimo de 3 caracteres
                      </div>
                      <OnChange name="titulo">
                        {(value, previous) => {
                          props.onChange(values, previous);
                        }}
                      </OnChange>
                    </div>
                  )}
                  {exibirFiltrosDataEventoETipoSolicitacao &&
                    pathname === "/painel-gestao-produto" &&
                    ehTerceirizada && (
                      <>
                        <div
                          className={`${
                            ehEscola ? "offset-3 col-3 pl-0" : "col-3 pl-0"
                          }`}
                        >
                          <Field
                            component={Select}
                            name="tipo_solicitacao"
                            naoDesabilitarPrimeiraOpcao
                            placeholder="Tipo de Solicitação"
                            options={TIPOS_SOLICITACOES_OPTIONS}
                          />
                        </div>
                        <OnChange name="tipo_solicitacao">
                          {() => {
                            props.onChange(values);
                          }}
                        </OnChange>
                        <div className="col-3 pl-0">
                          <Field
                            name="data_evento"
                            minDate={null}
                            component={InputComData}
                            placeholder="Data do evento"
                          />
                          <OnChange name="data_evento">
                            {() => {
                              props.onChange(values);
                            }}
                          </OnChange>
                        </div>
                      </>
                    )}
                  {ehDashboardGestaoProduto && (
                    <div
                      className={`${
                        ehDashboardGestaoProduto ? "col-4" : "col-3"
                      }`}
                    >
                      <Field
                        component={InputText}
                        name="marca"
                        placeholder="Busca da Marca"
                        disabled={filtrosDesabilitados}
                      />
                      <div className="warning-num-charac">
                        * mínimo de 3 caracteres
                      </div>
                      <OnChange name="marca">
                        {() => {
                          props.onChange(values);
                        }}
                      </OnChange>
                    </div>
                  )}
                </div>
                {ehTerceirizada && (
                  <div className="row">
                    {props.listaStatus && (
                      <div className="col-3">
                        <Field
                          component={Select}
                          options={props.listaStatus}
                          name="status"
                          placeholder="Conferência Status"
                          naoDesabilitarPrimeiraOpcao
                        />
                        <OnChange name="status">
                          {() => {
                            props.onChange(values);
                          }}
                        </OnChange>
                      </div>
                    )}
                    {props.listaLotes && (
                      <div className="col-3">
                        <Field
                          component={Select}
                          options={props.listaLotes}
                          name="lote"
                          placeholder="Selecione um Lote"
                          naoDesabilitarPrimeiraOpcao
                        />
                        <OnChange name="lote">
                          {() => {
                            props.onChange(values);
                          }}
                        </OnChange>
                      </div>
                    )}
                    {pathname === "/painel-gestao-alimentacao" && (
                      <>
                        <div className="col-3">
                          <Field
                            component={Select}
                            options={TIPOS_SOLICITACOES_OPTIONS}
                            name="tipo_solicitacao"
                            naoDesabilitarPrimeiraOpcao
                          />
                          <OnChange name="tipo_solicitacao">
                            {() => {
                              props.onChange(values);
                            }}
                          </OnChange>
                        </div>
                        <div className="col-3">
                          <Field
                            name="data_evento"
                            minDate={null}
                            component={InputComData}
                            placeholder="Data do evento"
                          />
                          <OnChange name="data_evento">
                            {() => {
                              props.onChange(values);
                            }}
                          </OnChange>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </form>
            )}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default CardBody;
