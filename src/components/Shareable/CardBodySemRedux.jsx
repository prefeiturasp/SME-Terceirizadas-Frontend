import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Select } from "components/Shareable/Select";
import InputText from "components/Shareable/Input/InputText";
import {
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhEmpresaTerceirizada,
} from "helpers/utilities";
import { Spin } from "antd";
import { TIPOS_SOLICITACOES_OPTIONS } from "constants/shared";
import { InputComData } from "./DatePicker";

// Para usar este componente é necessário remover o redux-form do dashboard

const CardBodySemRedux = (props) => {
  const ehTerceirizada = usuarioEhEmpresaTerceirizada();
  const ehEscola =
    usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor();
  const { exibirFiltrosDataEventoETipoSolicitacao } = props;
  const ehDashboardGestaoProduto = props.ehDashboardGestaoProduto;
  const filtrosDesabilitados = props.filtrosDesabilitados || false;
  const loadingDietas = props.loadingDietas || false;

  return (
    <div className="card mt-3">
      <div className="card-body dash-terc">
        <div className="card-title font-weight-bold dashboard-card-title">
          <div className="row">
            <div
              className={`${
                (ehTerceirizada && props.listaStatus && props.listaLotes) ||
                ehDashboardGestaoProduto
                  ? "col-3"
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
            {!ehEscola && (
              <div
                className={`${
                  ehTerceirizada && props.listaStatus && props.listaLotes
                    ? "offset-3 col-6"
                    : exibirFiltrosDataEventoETipoSolicitacao
                    ? "col-3"
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
                    props.onChange(props.values, previous);
                  }}
                </OnChange>
              </div>
            )}
            {exibirFiltrosDataEventoETipoSolicitacao && (
              <>
                <div
                  className={`${
                    ehEscola ? "offset-3 col-3 ps-0" : "col-3 ps-0"
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
                    props.onChange(props.values);
                  }}
                </OnChange>
                <div className="col-3 ps-0">
                  <Field
                    name="data_evento"
                    minDate={null}
                    component={InputComData}
                    placeholder="Data do evento"
                  />
                  <OnChange name="data_evento">
                    {() => {
                      props.onChange(props.values);
                    }}
                  </OnChange>
                </div>
              </>
            )}
            {ehDashboardGestaoProduto && (
              <div className="col-3">
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
                    props.onChange(props.values);
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
                      props.onChange(props.values);
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
                      props.onChange(props.values);
                    }}
                  </OnChange>
                </div>
              )}
              <div className="col-3">
                <Field
                  component={Select}
                  options={TIPOS_SOLICITACOES_OPTIONS}
                  name="tipo_solicitacao"
                  naoDesabilitarPrimeiraOpcao
                />
                <OnChange name="tipo_solicitacao">
                  {() => {
                    props.onChange(props.values);
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
                    props.onChange(props.values);
                  }}
                </OnChange>
              </div>
            </div>
          )}
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default CardBodySemRedux;
