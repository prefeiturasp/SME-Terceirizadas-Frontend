import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getSolicitacoesDisponibilizadas } from "services/disponibilizacaoDeSolicitacoes.service";
import "./style.scss";
import Botao from "components/Shareable/Botao";
import { Spin } from "antd";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { Modal } from "react-bootstrap";
import {
  enviaSolicitacaoRemessa,
  enviaSolicitacoesDaGrade
} from "../../../../services/disponibilizacaoDeSolicitacoes.service";
import {
  toastError,
  toastInfo,
  toastSuccess
} from "components/Shareable/Toast/dialogs";

export const DisponibilizacaoDeSolicitacoes = props => {
  const [solicitacoes, setSolicitacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erroAPI, setErroAPI] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [numeroSolicitacao, setNumeroSolicitacao] = useState(null);
  const [solicitacaoUuid, setSolicitacaoUuid] = useState(null);

  useEffect(() => {
    if (props.requisicoes && props.requisicoes.length > 0) {
      setSolicitacoes(props.requisicoes);
      setLoading(false);
    } else {
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
    }
  }, []);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const expandir = key => {
    solicitacoes[key].ativo = !solicitacoes[key].ativo;
    setSolicitacoes(solicitacoes);
    forceUpdate();
  };

  const exibeToastPeloStatus = status => {
    if (status === HTTP_STATUS.OK && solicitacaoUuid) {
      toastSuccess("Solicitação enviada com sucesso");
    } else if (status === HTTP_STATUS.OK && !solicitacaoUuid) {
      toastSuccess("Solicitações enviadas com sucesso");
    } else if (status === HTTP_STATUS.BAD_REQUEST) {
      toastError("Erro de transição de estado");
    } else {
      toastInfo("Nenhuma solicitação a enviar");
    }
  };

  // const atualizaStatusdaSolicitacoes = dataSolicitacoes => {
  //   let arraySolicitacoes = [];
  //   dataSolicitacoes.forEach(solicit => {
  //     solicitacoes.forEach(solicitacao => {
  //       if (solicit.uuid === solicitacao.uuid) {
  //         arraySolicitacoes = solicitacoes.filter(
  //           item => item.uuid !== solicit.uuid
  //         );
  //       }
  //     });
  //   });
  //   setSolicitacoes(arraySolicitacoes);
  // };

  const enviarSolicitacoes = async () => {
    const arrayUuidSolicitacoes = [];
    solicitacoes.forEach(solicitacao => {
      if (solicitacao.status === "Aguardando envio") {
        arrayUuidSolicitacoes.push(solicitacao.uuid);
      }
    });
    const response = await enviaSolicitacoesDaGrade(arrayUuidSolicitacoes);
    if (response.status === HTTP_STATUS.OK && response.data.length === 0) {
      atualizaStatusdaSolicitacao(response.data);
      setShowModal(false);
      response.status = 500;
    } else if (response.status === HTTP_STATUS.OK && response.data.length > 0) {
      setSolicitacoes(null);
      setShowModal(false);
    } else {
      response.status = 500;
    }
    exibeToastPeloStatus(response.status);
  };

  const atualizaStatusdaSolicitacao = dataSolicitacao => {
    let arraySolicitacoes = [];
    solicitacoes.forEach(solicitacao => {
      if (solicitacao.uuid === dataSolicitacao.uuid) {
        arraySolicitacoes = solicitacoes.filter(
          item => item.uuid !== dataSolicitacao.uuid
        );
      }
    });
    setSolicitacoes(arraySolicitacoes);
  };

  const enviarSolicitacao = async () => {
    const response = await enviaSolicitacaoRemessa(solicitacaoUuid);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacaoUuid(null);
      setNumeroSolicitacao(null);
      atualizaStatusdaSolicitacao(response.data);
      setShowModal(false);
    } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
      setSolicitacaoUuid(null);
      setNumeroSolicitacao(null);
      setShowModal(false);
    } else {
      response.status = 500;
    }
    exibeToastPeloStatus(response.status);
  };

  return (
    <div className="disponibilizacao-solicitacoes">
      {solicitacoes && (
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
                      <th>N° da Requisição de Entrega</th>
                      <th>Qtde. de Guias Remessa</th>
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
                          <td onClick={() => expandir(key)} className="link">
                            {solicitacao.ativo ? "Ver menos" : "Ver mais"}
                          </td>
                          {solicitacao.status === "Aguardando envio" ? (
                            <td
                              className={`${
                                solicitacao.status !== "Aguardando envio"
                                  ? "link-desativo"
                                  : "link"
                              }`}
                              onClick={() => {
                                setShowModal(true);
                                setNumeroSolicitacao(
                                  solicitacao.numero_solicitacao
                                );
                                setSolicitacaoUuid(solicitacao.uuid);
                              }}
                            >
                              Enviar
                            </td>
                          ) : (
                            <td
                              className={`${
                                solicitacao.status !== "Aguardando envio"
                                  ? "link-desativo"
                                  : "link"
                              }`}
                              onClick={() => {}}
                            >
                              Enviar
                            </td>
                          )}
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
                                  <tr
                                    className="guia-alimento"
                                    key={keyAlimento}
                                  >
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
                      onClick={() => {
                        setShowModal(true);
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setNumeroSolicitacao(null);
          setSolicitacaoUuid(null);
        }}
      >
        <Spin tip="Enviando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!numeroSolicitacao
              ? `Deseja enviar todas as Solicitações da Grade ?`
              : `Deseja enviar a Solicitação n° ${numeroSolicitacao} ? `}
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="SIM"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                numeroSolicitacao ? enviarSolicitacao() : enviarSolicitacoes();
                setLoading(true);
              }}
              style={BUTTON_STYLE.BLUE}
              className="ml-3"
              disabled={loading}
            />
            <Botao
              texto="NÃO"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                setShowModal(false);
                setNumeroSolicitacao(null);
                setSolicitacaoUuid(null);
              }}
              style={BUTTON_STYLE.BLUE}
              className="ml-3"
            />
          </Modal.Footer>
        </Spin>
      </Modal>
    </div>
  );
};
