import React from "react";
import "./styles.scss";

export default ({ conferencia, reposicaoFlag, guia }) => {
  const filtraEmbalagemPorTipo = (embalagens, tipo) => {
    const embalagensFiltradas = embalagens.filter((value) => {
      return value.tipo_embalagem.toUpperCase() === tipo;
    });
    if (embalagensFiltradas.length) return embalagensFiltradas[0];
    else return false;
  };

  const getClassStatus = (item) => {
    switch (item.status_alimento) {
      case "Recebido":
        return "green";
      case "Parcial":
        return "red";
      case "Não recebido":
        return "red";
      default:
        return "";
    }
  };

  const existeOcorrencia = (conf) =>
    conf.some((item) => item.embalagens[0].ocorrencia);

  const titulo = reposicaoFlag
    ? "Reposição de itens faltantes"
    : "1ª Conferência da guia de remessa";

  return (
    <div className="conferencia-detalhe">
      <div className="titulo-secao">{titulo}</div>
      <table className={`table table-bordered table-detalhe`}>
        <thead>
          <tr>
            <th scope="col" rowSpan="3" className="text-center align-middle">
              Nome do Alimento
            </th>
            <th
              scope="col"
              colSpan={reposicaoFlag ? "2" : "3"}
              className="text-center"
            >
              Embalagem Fechada
            </th>
            <th
              scope="col"
              colSpan={reposicaoFlag ? "2" : "3"}
              className="text-center"
            >
              Embalagem Fracionada
            </th>
            <th scope="col" colSpan="2" className="text-center">
              Recebimento do Produto
            </th>
          </tr>
          <tr>
            {!reposicaoFlag && (
              <th scope="col" colSpan="2" className="text-center">
                Previsto
              </th>
            )}
            <th
              scope="col"
              className="text-center"
              colSpan={reposicaoFlag ? "2" : "1"}
            >
              Recebido
            </th>
            {!reposicaoFlag && (
              <th scope="col" colSpan="2" className="text-center">
                Previsto
              </th>
            )}
            <th
              scope="col"
              className="text-center"
              colSpan={reposicaoFlag ? "2" : "1"}
            >
              Recebido
            </th>
            <th scope="col" rowSpan="2" className="text-center">
              Status
            </th>
            <th scope="col" rowSpan="2" className="text-center">
              Data
            </th>
          </tr>
          <tr>
            {!reposicaoFlag && <th scope="col">Quant.</th>}
            {!reposicaoFlag && <th scope="col">Capac.</th>}
            <th scope="col">Quant.</th>
            {reposicaoFlag && <th scope="col">Capac.</th>}
            {!reposicaoFlag && <th scope="col">Quant.</th>}
            {!reposicaoFlag && <th scope="col">Capac.</th>}
            <th scope="col">Quant.</th>
            {reposicaoFlag && <th scope="col">Capac.</th>}
          </tr>
        </thead>
        <tbody>
          {conferencia.conferencia_dos_alimentos.map((item) => {
            const fracionada = filtraEmbalagemPorTipo(
              item.embalagens,
              "FRACIONADA"
            );
            const fechada = filtraEmbalagemPorTipo(item.embalagens, "FECHADA");
            let celEmbalagem = (embalagem) => (
              <td className="embalagem">
                {embalagem ? <>{embalagem.capacidade_completa}</> : "--"}
              </td>
            );
            return (
              <>
                <tr>
                  <td className="nome-alimento">{item.nome_alimento}</td>
                  {!reposicaoFlag && (
                    <>
                      <td className="embalagem">
                        {fechada ? fechada.qtd_volume : "--"}
                      </td>
                      {celEmbalagem(fechada)}
                    </>
                  )}
                  <td className="embalagem">
                    <strong>{fechada ? fechada.qtd_recebido : "--"}</strong>
                  </td>
                  {reposicaoFlag && celEmbalagem(fechada)}
                  {!reposicaoFlag && (
                    <>
                      <td className="embalagem">
                        {fracionada ? fracionada.qtd_volume : "--"}
                      </td>
                      {celEmbalagem(fracionada)}
                    </>
                  )}
                  <td className="embalagem">
                    <strong>
                      {fracionada ? fracionada.qtd_recebido : "--"}
                    </strong>
                  </td>
                  {reposicaoFlag && celEmbalagem(fracionada)}
                  <td
                    className={`recebimento ${getClassStatus(
                      item.embalagens[0]
                    )}`}
                  >
                    <strong>{item.embalagens[0].status_alimento}</strong>
                  </td>
                  <td className="recebimento">
                    {conferencia.data_recebimento}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <div className="relatorio-conferencia">
        <p className="titulo-recebimento">
          <i className="fas fa-check conferencia" />
          Dados do Recebimento
        </p>

        <div className="row">
          <div className="col-12">
            <p>Nome do responsável pelo recebimento: </p>
            <p className="dado-conferencia">{conferencia.criado_por.nome}</p>
          </div>

          <div className="col-6">
            <p>Data do recebimento pela UE: </p>
            <p className="dado-conferencia">{conferencia.data_recebimento}</p>
          </div>
          <div className="col-6">
            <p>Hora da Entrega: </p>
            <p className="dado-conferencia">{conferencia.hora_recebimento}</p>
          </div>

          <div className="col-6">
            <p>Nome do Motorista: </p>
            <p className="dado-conferencia">{conferencia.nome_motorista}</p>
          </div>
          <div className="col-6">
            <p>Placa do Veículo: </p>
            <p className="dado-conferencia">{conferencia.placa_veiculo}</p>
          </div>

          <div className="col-12">
            <p>Nome da Escola: </p>
            <p className="dado-conferencia">{guia.nome_unidade}</p>
          </div>
        </div>

        {existeOcorrencia(conferencia.conferencia_dos_alimentos) && (
          <p className="titulo-recebimento">
            <i className="fas fa-exclamation-triangle ocorrencia" />
            Ocorrência:
          </p>
        )}

        {conferencia.conferencia_dos_alimentos.map((item) => {
          const conf = item.embalagens[0];

          return conf.ocorrencia ? (
            <>
              <div className="row">
                <div className="col-12">
                  <p className="titulo-alimento">
                    Produto: {conf.nome_alimento}
                  </p>
                </div>
                <div className="col-12">
                  <p>Registro da ocorrência:</p>
                  <p className="dado-conferencia">{conf.ocorrencia}</p>
                </div>
                <div className="col-12">
                  <p>Observação: </p>
                  <p className="dado-conferencia">{conf.observacao}</p>
                </div>
                {conf.arquivo && (
                  <div className="col-6">
                    <p>Imagem da ocorrência:</p>
                    <img
                      className="w-100"
                      alt="Imagem descritiva da Ocorrência"
                      src={conf.arquivo}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
};
