import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Select } from "components/Shareable/Select";
import InputText from "components/Shareable/Input/InputText";
import { usuarioEhEmpresaTerceirizada } from "helpers/utilities";
import { Spin } from "antd";
import { TIPOS_SOLICITACOES_OPTIONS } from "constants/shared";
import { InputComData } from "./DatePicker";
import { ASelect } from "./MakeField";
import { getNomesUnicosEditais } from "services/produto.service";
import {
  updateStatusDieta,
  updateTituloDieta,
  updateLoteDieta,
} from "reducers/filtersDietaReducer";
import {
  updateMarcaProduto,
  updateNomeProduto,
  updateEditalProduto,
} from "reducers/filtersProdutoReducer";
import {
  updateDataEventoAlimentacao,
  updateLoteAlimentacao,
  updateStatusAlimentacao,
  updateTipoSolicitacaoAlimentacao,
  updateTituloAlimentacao,
} from "reducers/filtersAlimentacaoReducer";

const CardBody = (props) => {
  const [editais, setEditais] = useState([]);
  const ehTerceirizada = usuarioEhEmpresaTerceirizada();
  const { exibirFiltrosDataEventoETipoSolicitacao } = props;
  const ehDashboardGestaoProduto = props.ehDashboardGestaoProduto;
  const filtrosDesabilitados = props.filtrosDesabilitados || false;
  const loadingDietas = props.loadingDietas || false;
  const pathname = window.location.pathname;
  useEffect(() => {
    (async () => {
      const listaEditais = await getNomesUnicosEditais();
      let listaRsultados = listaEditais.data.results;
      let listaFormatada = listaRsultados.map((element) => {
        return { value: element, label: element };
      });
      setEditais(listaFormatada);
    })();
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
                        ? "col-12 text-end"
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
                        {(edital) => {
                          props.updateEditalProduto(edital);
                          props.onChange(values);
                        }}
                      </OnChange>
                    </div>
                  )}

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
                      <OnChange name="titulo">
                        {(value, previous) => {
                          pathname === "/painel-dieta-especial" &&
                            props.updateTituloDieta(value);
                          pathname === "/painel-gestao-produto" &&
                            props.updateNomeProduto(value);
                          pathname === "/painel-gestao-alimentacao" &&
                            props.updateTituloAlimentacao(value);
                          props.onChange(values, previous);
                        }}
                      </OnChange>
                    </div>
                  </div>
                  {exibirFiltrosDataEventoETipoSolicitacao && (
                    <>
                      <div className={"col-3 ps-0"}>
                        <Field
                          component={Select}
                          name="tipo_solicitacao"
                          naoDesabilitarPrimeiraOpcao
                          placeholder="Tipo de Solicitação"
                          disabled={props.filtrosDesabilitados}
                          options={TIPOS_SOLICITACOES_OPTIONS}
                        />
                      </div>
                      <OnChange name="tipo_solicitacao">
                        {(tipo) => {
                          props.updateTipoSolicitacaoAlimentacao(tipo);
                          props.onChange(values);
                        }}
                      </OnChange>
                      <div className="col-3 ps-0">
                        <Field
                          name="data_evento"
                          minDate={null}
                          component={InputComData}
                          disabled={props.filtrosDesabilitados}
                          placeholder="Data do evento"
                        />
                        <OnChange name="data_evento">
                          {(data) => {
                            props.updateDataEventoAlimentacao(data);
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
                        {(marca) => {
                          props.updateMarcaProduto(marca);
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
                          {(status) => {
                            props.updateStatusAlimentacao(status);
                            props.updateStatusDieta(status);
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
                          {(lote) => {
                            props.updateLoteAlimentacao(lote);
                            props.updateLoteDieta(lote);
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
                            disabled={props.filtrosDesabilitados}
                            naoDesabilitarPrimeiraOpcao
                          />
                          <OnChange name="tipo_solicitacao">
                            {(tipo) => {
                              props.updateTipoSolicitacaoAlimentacao(tipo);
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
                            disabled={props.filtrosDesabilitados}
                          />
                          <OnChange name="data_evento">
                            {(data) => {
                              props.updateDataEventoAlimentacao(data);
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

const mapDispatchToProps = (dispatch) => ({
  updateStatusDieta: (statusDieta) => {
    dispatch(updateStatusDieta(statusDieta));
  },
  updateTituloDieta: (tituloDieta) => {
    dispatch(updateTituloDieta(tituloDieta));
  },
  updateLoteDieta: (loteDieta) => {
    dispatch(updateLoteDieta(loteDieta));
  },
  updateMarcaProduto: (marcaProduto) => {
    dispatch(updateMarcaProduto(marcaProduto));
  },
  updateNomeProduto: (tituloProduto) => {
    dispatch(updateNomeProduto(tituloProduto));
  },
  updateEditalProduto: (editalProduto) => {
    dispatch(updateEditalProduto(editalProduto));
  },
  updateTituloAlimentacao: (tituloAlimentacao) => {
    dispatch(updateTituloAlimentacao(tituloAlimentacao));
  },
  updateLoteAlimentacao: (loteAlimentacao) => {
    dispatch(updateLoteAlimentacao(loteAlimentacao));
  },
  updateStatusAlimentacao: (statusAlimentacao) => {
    dispatch(updateStatusAlimentacao(statusAlimentacao));
  },
  updateTipoSolicitacaoAlimentacao: (tipoSolicitacaoAlimentacao) => {
    dispatch(updateTipoSolicitacaoAlimentacao(tipoSolicitacaoAlimentacao));
  },
  updateDataEventoAlimentacao: (dataEventoAlimentacao) => {
    dispatch(updateDataEventoAlimentacao(dataEventoAlimentacao));
  },
});

export default connect(null, mapDispatchToProps)(CardBody);
