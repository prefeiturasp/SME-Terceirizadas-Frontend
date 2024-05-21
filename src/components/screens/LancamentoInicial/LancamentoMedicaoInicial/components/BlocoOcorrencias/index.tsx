import React from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

type BlocoOcorrenciasType = {
  comOcorrencias: string;
  setComOcorrencias: (_comOcorrencias: string) => void;
};

export const BlocoOcorrencias = ({ ...props }: BlocoOcorrenciasType) => {
  const { comOcorrencias, setComOcorrencias } = props;

  return (
    <div className="bloco-ocorrencias mb-3">
      <div className="pb-3">
        <b className="section-title">Ocorrências</b>
      </div>
      <div className="box row">
        <div className="col-9 my-auto">
          <span className="me-3">Avaliação do Serviço: </span>
          <input
            name="com_ocorrencias"
            onClick={() => setComOcorrencias("nao")}
            type="radio"
            value="nao"
            id="nao"
            required
          />
          <label className="ms-1" htmlFor="nao">
            Serviço prestado sem ocorrências
          </label>
          <input
            name="com_ocorrencias"
            className="ms-3"
            onClick={() => setComOcorrencias("sim")}
            type="radio"
            value="sim"
            id="sim"
            required
          />
          <label className="ms-1" htmlFor="sim">
            Com ocorrências
          </label>
        </div>
        <div className="col-3 text-end">
          <Botao
            texto="Registrar Ocorrências"
            disabled={comOcorrencias !== "sim"}
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.RED_OUTLINE}
          />
        </div>
      </div>
    </div>
  );
};
