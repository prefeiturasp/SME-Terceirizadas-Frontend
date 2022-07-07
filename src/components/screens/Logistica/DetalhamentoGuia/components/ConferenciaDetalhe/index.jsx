import React from "react";
import "./styles.scss";

export default ({ conferencia }) => {
  const filtraEmbalagemPorTipo = (embalagens, tipo) => {
    const embalagensFiltradas = embalagens.filter(value => {
      return value.tipo_embalagem.toUpperCase() === tipo;
    });
    if (embalagensFiltradas.length) return embalagensFiltradas[0];
    else return false;
  };

  const getClassStatus = item => {
    switch (item.status_alimento) {
      case "Recebido":
        return "green";
      case "Parcial":
        return "red";
      case "Não Recebido":
        return "red";
      default:
        return "";
    }
  };

  return (
    <div className="conferencia-detalhe">
      <table className={`table table-bordered table-detalhe`}>
        <thead>
          <tr>
            <th scope="col" rowSpan="3" colSpan="2" className="text-center">
              Nome do Alimento
            </th>
            <th scope="col" colSpan={"3"} className="text-center">
              Embalagem Fechada
            </th>
            <th scope="col" colSpan={"3"} className="text-center">
              Embalagem Fracionada
            </th>
            <th scope="col" colSpan="2" className="text-center">
              Recebimento do Alimento
            </th>
          </tr>
          <tr>
            <th scope="col" colSpan="2" className="text-center">
              Previsto
            </th>
            <th scope="col">Recebido</th>
            <th scope="col" colSpan="2" className="text-center">
              Previsto
            </th>
            <th scope="col">Recebido</th>
            <th scope="col" rowSpan="2" className="text-center">
              Status
            </th>
            <th scope="col" rowSpan="2" className="text-center">
              Data
            </th>
          </tr>
          <tr>
            <th scope="col">Quant.</th>
            <th scope="col">Capac.</th>
            <th scope="col">Quant.</th>
            <th scope="col">Quant.</th>
            <th scope="col">Capac.</th>
            <th scope="col">Quant.</th>
          </tr>
        </thead>
        <tbody>
          {conferencia.conferencia_dos_alimentos.map((item, index) => {
            const embalagens = item.total_embalagens
              ? item.total_embalagens
              : item.embalagens;
            const fracionada = filtraEmbalagemPorTipo(embalagens, "FRACIONADA");
            const arquivoExiste = conferencia.conferencia_dos_alimentos[index]
              .arquivo
              ? conferencia.conferencia_dos_alimentos[index].arquivo.length > 0
              : false;
            const fechada = filtraEmbalagemPorTipo(embalagens, "FECHADA");
            return (
              <>
                <tr>
                  <td className="icone-arquivo">
                    {arquivoExiste > 0 && (
                      <div className="icon-arquivo">
                        <i className="fas fa-paperclip green" />
                      </div>
                    )}
                  </td>

                  <td className="nome-alimento">{item.nome_alimento}</td>
                  <td className="embalagem">
                    {fechada ? fechada.qtd_volume : "--"}
                  </td>
                  <td className="embalagem">
                    {fechada ? (
                      <>
                        {fechada.descricao_embalagem}.{" "}
                        {fechada.capacidade_embalagem}
                        {fechada.unidade_medida}
                      </>
                    ) : (
                      "--"
                    )}
                  </td>
                  <td className="embalagem">
                    <strong>
                      {fechada
                        ? conferencia.conferencia_dos_alimentos[index]
                            .qtd_recebido
                        : "--"}
                    </strong>
                  </td>
                  <td className="embalagem">
                    {fracionada ? fracionada.qtd_volume : "--"}
                  </td>
                  <td className="embalagem">
                    {fracionada ? (
                      <>
                        {fracionada.descricao_embalagem}.{" "}
                        {fracionada.capacidade_embalagem}
                        {fracionada.unidade_medida}
                      </>
                    ) : (
                      "--"
                    )}
                  </td>
                  <td className="embalagem">
                    <strong>
                      {fracionada
                        ? conferencia.conferencia_dos_alimentos[index]
                            .qtd_recebido
                        : "--"}
                    </strong>
                  </td>
                  <td
                    className={`recebimento ${getClassStatus(
                      conferencia.conferencia_dos_alimentos[index]
                    )}`}
                  >
                    <strong>
                      {
                        conferencia.conferencia_dos_alimentos[index]
                          .status_alimento
                      }
                    </strong>
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
    </div>
  );
};
