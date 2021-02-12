import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { getConsolidadoAlimentos } from "services/logistica.service";

export default ({ solicitacao }) => {
  const [alimentosConsolidado, setAlimentosConsolidado] = useState();

  const getAlimentos = () => {
    getConsolidadoAlimentos(solicitacao.requisicao.uuid).then(res => {
      setAlimentosConsolidado(res.data);
    });
  };

  useEffect(() => {
    if (!alimentosConsolidado) {
      getAlimentos();
    }
  }, []);

  const filtraEmbalagemPorTipo = (embalagens, tipo) => {
    const embalagensFiltradas = embalagens.filter(value => {
      return value.tipo_embalagem === tipo;
    });
    if (embalagensFiltradas.length) return embalagensFiltradas[0];
    else return false;
  };

  return (
    <>
      <div className="text-center">
        <Spin tip="Carregando alimentos..." spinning={!alimentosConsolidado} />
      </div>
      {alimentosConsolidado && (
        <table className="table table-sm table-bordered table-consolidado-alimentos mt-3">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col" colSpan="2" className="text-center">
                Embalagem Fechada
              </th>
              <th scope="col" colSpan="2" className="text-center">
                Embalagem Fracionada
              </th>
              <th scope="col" />
            </tr>
            <tr>
              <th scope="col">Alimento</th>
              <th scope="col">Qtde</th>
              <th scope="col">Capacidade</th>
              <th scope="col">Qtde</th>
              <th scope="col">Capacidade</th>
              <th scope="col">Peso total</th>
            </tr>
          </thead>
          <tbody>
            {alimentosConsolidado.map(item => {
              const fracionada = filtraEmbalagemPorTipo(
                item.total_embalagens,
                "FRACIONADA"
              );
              const fechada = filtraEmbalagemPorTipo(
                item.total_embalagens,
                "FECHADA"
              );
              return (
                <>
                  <tr>
                    <td>{item.nome_alimento}</td>
                    <td>{fechada && fechada.qtd_volume}</td>
                    <td>
                      {fechada ? (
                        <>
                          {fechada.descricao_embalagem}.{" "}
                          {fechada.capacidade_embalagem}
                          {fechada.unidade_medida}
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{fracionada && fracionada.qtd_volume}</td>
                    <td>
                      {fracionada ? (
                        <>
                          {fracionada.descricao_embalagem}.{" "}
                          {fracionada.capacidade_embalagem}
                          {fracionada.unidade_medida}
                        </>
                      ) : (
                        ""
                      )}
                    </td>

                    <td>
                      {item.peso_total}
                      {item.total_embalagens[0].unidade_medida}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
