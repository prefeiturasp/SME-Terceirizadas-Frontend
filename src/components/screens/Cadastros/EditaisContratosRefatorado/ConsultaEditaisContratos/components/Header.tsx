import {
  BUTTON_ICON,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import InputText from "components/Shareable/Input/InputText";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

export const Header = ({
  getEditaisContratosAsync,
  setLoading,
  page,
  setPage,
}) => {
  const PARAMS = { page };

  let typingTimeout = null;

  const buscaEditalContrato = (value) => {
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
  };

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
          {async (value) => buscaEditalContrato(value)}
        </OnChange>
      </div>
    </div>
  );
};
