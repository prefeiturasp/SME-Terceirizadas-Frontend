import React from "react";

export const BlocoOcorrencias = () => {
  return (
    <div className="bloco-ocorrencias mb-3">
      <div className="pb-3">
        <b className="section-title">Ocorrências</b>
      </div>
      <div className="box">
        Avaliação do Serviço:{" "}
        <input
          name="com_ocorrencias"
          type="radio"
          value="nao"
          id="nao"
          required
        />
        <label htmlFor="nao">Serviço prestado sem ocorrências</label>
        <input
          name="com_ocorrencias"
          type="radio"
          value="sim"
          id="sim"
          required
        />
        <label htmlFor="sim">Com ocorrências</label>
      </div>
    </div>
  );
};
