import React from "react";

export default ({ insucesso }) => {
  return (
    <div className="conferencia-detalhe">
      <div className="titulo-secao">Registro de Insucesso de Entrega</div>

      <div className="relatorio-conferencia">
        <p className="titulo-recebimento">
          <i className="fas fa-exclamation-triangle ocorrencia" />
          Dados do Insucesso
        </p>

        <div className="row">
          <div className="col-6">
            <p>Data do registro do insucesso: </p>
            <p className="dado-conferencia">{insucesso.criado_em}</p>
          </div>
          <div className="col-6">
            <p>Hora da Entrega: </p>
            <p className="dado-conferencia">{insucesso.hora_tentativa}</p>
          </div>

          <div className="col-6">
            <p>Nome do Motorista: </p>
            <p className="dado-conferencia">{insucesso.nome_motorista}</p>
          </div>
          <div className="col-6">
            <p>Placa do Veículo: </p>
            <p className="dado-conferencia">{insucesso.placa_veiculo}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <p>Motivo:</p>
            <p className="dado-conferencia">{insucesso.motivo}</p>
          </div>
          <div className="col-12">
            <p>Justificativa: </p>
            <p className="dado-conferencia">{insucesso.justificativa}</p>
          </div>
          {insucesso.arquivo && (
            <div className="col-12">
              <p>Imagem:</p>
              <img
                className="w-100"
                alt="Imagem descritiva do Insucesso de Entrega"
                src={insucesso.arquivo}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
