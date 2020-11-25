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

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const expandir = key => {
    solicitacoes[key].ativo = !solicitacoes[key].ativo;
    setSolicitacoes(solicitacoes);
    forceUpdate();
  };

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
                    return [
                      <tr key={key}>
                        <td>{solicitacao.numero_solicitacao}</td>
                        <td>{solicitacao.guias.length}</td>
                        <td>{solicitacao.distribuidor_nome}</td>
                        <td>{solicitacao.status}</td>
                        <td>
                          {solicitacao.guias &&
                            solicitacao.guias[0].data_entrega}
                        </td>
                        <td
                          onClick={() => expandir(key)}
                          className={solicitacao.ativo ? "link red" : "link"}
                        >
                          {solicitacao.ativo ? "Ver menos" : "Ver mais"}
                        </td>
                        <td className="link">Enviar</td>
                      </tr>,
                      solicitacao.ativo &&
                        solicitacao.guias.map((guia, keyGuia) => {
                          return [
                            <tr className="guia" key={keyGuia}>
                              <td>
                                Nº da guia <br />
                                <span>{guia.numero_guia}</span>
                              </td>
                              <td />
                              <td>
                                Cód. EOL UE <br />
                                <span>{guia.codigo_unidade}</span>
                              </td>
                              <td colSpan="4">
                                Nome Unidade de Ensino <br />
                                <span>{guia.nome_unidade}</span>
                              </td>
                            </tr>,
                            <tr className="guia-alimento" key={keyGuia}>
                              <td colSpan="2" />
                              <td colSpan="2">
                                Endereço <br />
                                <span>{guia.endereco_unidade}</span>
                              </td>
                              <td colSpan="3">
                                Número <br />
                                <span>{guia.numero_unidade}</span>
                              </td>
                            </tr>,
                            <tr className="guia-alimento" key={keyGuia}>
                              <td colSpan="2" />
                              <td>
                                Bairro <br />
                                <span>{guia.bairro_unidade}</span>
                              </td>
                              <td>
                                CEP <br />
                                <span>{guia.cep_unidade}</span>
                              </td>
                              <td colSpan="2">
                                Estado <br />
                                <span>{guia.estado_unidade}</span>
                              </td>
                            </tr>,
                            <tr className="guia-alimento" key={keyGuia}>
                              <td colSpan="2" />
                              <td>
                                Cidade <br />
                                <span>{guia.cidade_unidade}</span>
                              </td>
                              <td>
                                Contato <br />
                                <span>{guia.contato_unidade}</span>
                              </td>
                              <td colSpan="2">
                                Telefone <br />
                                <span>{guia.telefone_unidade}</span>
                              </td>
                            </tr>,
                            guia.alimentos.map((alimento, keyAlimento) => {
                              return (
                                <tr className="guia-alimento" key={keyAlimento}>
                                  <td colSpan="2" />
                                  <td>
                                    Nome do produto <br />
                                    <span>{alimento.nome_alimento}</span>
                                  </td>
                                  <td>
                                    Qtde. <br />
                                    <span>{alimento.qtd_volume}</span>
                                  </td>
                                  <td colSpan="3">
                                    Unidade <br />
                                    <span>{alimento.embalagem}</span>
                                  </td>
                                </tr>
                              );
                            })
                          ];
                        })
                    ];
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
