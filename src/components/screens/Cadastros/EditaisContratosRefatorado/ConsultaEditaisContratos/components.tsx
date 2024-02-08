import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import InputText from "components/Shareable/Input/InputText";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { EditalContratoInterface } from "../interfaces";
import { VIGENCIA_STATUS } from "./constants";
import { ToggleExpandir } from "components/Shareable/ToggleExpandir";
import { Tooltip } from "antd";
import { deepCopy } from "helpers/utilities";

export const Header = ({
  getEditaisContratosAsync,
  setLoading,
  page,
  setPage,
}) => {
  const PARAMS = { page };

  let typingTimeout = null;

  return (
    <div className={`row p-2 pt-3`}>
      <div className="col-3 title">Tipos de contratação</div>
      <div className="col-3 title">Nº do edital</div>
      <div className="col-3 title">Nº do processo administrativo</div>
      <div className="col-3 title">
        <Field
          component={InputText}
          name="buscar"
          placeholder="Pesquisar"
          className={`${BUTTON_STYLE.GRAY}`}
          icone={`${BUTTON_ICON.SEARCH} fa-lg`}
        />
        <OnChange name="buscar">
          {async (value) => {
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(async () => {
              setLoading(true);
              await getEditaisContratosAsync({
                busca: value,
                ...PARAMS,
              });
              setLoading(false);
              setPage(1);
            }, 1000);
          }}
        </OnChange>
      </div>
    </div>
  );
};

export const LinhaEditalContrato = ({
  editalContrato,
  setEditaisContratos,
  editaisContratos,
  index,
}) => {
  const getStatusContrato = (
    editalContrato: EditalContratoInterface
  ): string => {
    let status = "";
    editalContrato.contratos.forEach((contrato) => {
      const vigencia = contrato.vigencias[contrato.vigencias.length - 1];
      if (vigencia.status === VIGENCIA_STATUS.VENCIDO) status = vigencia.status;
      if (status !== "vencido" && vigencia.status === "proximo_ao_vencimento")
        status = vigencia.status;
    });
    return status;
  };

  const ativaContratoEdital = (index: number): void => {
    const editaisContratos_ = deepCopy(editaisContratos);
    editaisContratos_[index].ativo = !editaisContratos_[index].ativo;
    setEditaisContratos(editaisContratos_);
  };

  return (
    <div
      className={`row ${
        getStatusContrato(editalContrato) ===
        VIGENCIA_STATUS.PROXIMO_AO_VENCIMENTO
          ? VIGENCIA_STATUS.PROXIMO_AO_VENCIMENTO
          : ""
      }${
        getStatusContrato(editalContrato) === VIGENCIA_STATUS.VENCIDO
          ? VIGENCIA_STATUS.VENCIDO
          : ""
      }`}
    >
      <div className="col-3">{editalContrato.tipo_contratacao}</div>
      <div className="col-3">{editalContrato.numero}</div>
      <div className="col-3">{editalContrato.processo}</div>
      <div className="col-3 d-flex my-auto">
        {getStatusContrato(editalContrato) ===
          VIGENCIA_STATUS.PROXIMO_AO_VENCIMENTO && (
          <Tooltip
            title={
              "Data de vigência do contrato próxima ao vencimento, verifique se o contrato permanece ativo e adie a vigência"
            }
          >
            <div className="icon me-4 mt-1">
              <span className="fas fa-exclamation" />
            </div>
          </Tooltip>
        )}
        {getStatusContrato(editalContrato) === VIGENCIA_STATUS.VENCIDO && (
          <Tooltip
            title={
              "Data de vigência do contrato expirada, verifique se o contrato permanece ativo e adie a vigência"
            }
          >
            <div className="icon orange me-4 mt-1">
              <span className="fas fa-exclamation" />
            </div>
          </Tooltip>
        )}
        <ToggleExpandir
          onClick={() => ativaContratoEdital(index)}
          ativo={editalContrato.ativo}
          className="me-3"
        />
        <Botao
          type={BUTTON_TYPE.BUTTON}
          style={`${BUTTON_STYLE.GREEN_OUTLINE} no-border`}
          icon={BUTTON_ICON.EDIT}
        />
      </div>
    </div>
  );
};
