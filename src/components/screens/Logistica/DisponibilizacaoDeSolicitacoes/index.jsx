import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getSolicitacoesDisponibilizadas } from "services/disponibilizacaoDeSolicitacoes.service";
import "./style.scss";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";

export const DisponibilizacaoDeSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erroAPI, setErroAPI] = useState(false);

  useEffect(() => {
    getSolicitacoesDisponibilizadas()
      .then(response => {
        if (response.status === HTTP_STATUS.OK) {
          setSolicitacoes(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setErroAPI(true);
      });
  }, []);

  return (
    <div className="disponibilizacao-solicitacoes">
      <div className="card">
        <div className="card-body">
          <div className="card-title">Veja solicitações disponibilizadas</div>
          {erroAPI && <div>Erro ao carregar dados de solicitações</div>}
          {!erroAPI && loading && <div>Carregando...</div>}
          {!solicitacoes && !loading && !erroAPI && (
            <div>Não há solicitações.</div>
          )}
          {solicitacoes && (
            <>
              <table className="solicitacoes">
                <thead>
                  <tr>
                    <th>Nº da solicitação</th>
                    <th>Qtde. de guias</th>
                    <th>Distribuidor/Fornecedor</th>
                    <th>Status</th>
                    <th>Data de entrega</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {solicitacoes.map((solicitacao, key) => {
                    return (
                      <tr key={key}>
                        <td>{solicitacao.numero_solicitacao}</td>
                        <td>{solicitacao.guias.length}</td>
                        <td>{solicitacao.distribuidor_nome}</td>
                        <td>{solicitacao.status}</td>
                        <td>
                          {solicitacao.guias &&
                            solicitacao.guias[0].data_entrega}
                        </td>
                        <td className="link">Ver mais</td>
                        <td className="link">Enviar</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="row">
                <div className="col-12 text-right pt-3">
                  <Botao
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    texto="Enviar todos"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
