import React from "react";

const InformacoesAdicionaisLeitura = informacoes_adicionais => {
  return (
    <div className="row">
      <div className="col-md-12">
        <p className="mt-3 label">Informações Adicionais</p>
        <div
          className="orientacoes"
          dangerouslySetInnerHTML={{
            __html: informacoes_adicionais.informacoes_adicionais
          }}
        />
      </div>
    </div>
  );
};

export default InformacoesAdicionaisLeitura;
