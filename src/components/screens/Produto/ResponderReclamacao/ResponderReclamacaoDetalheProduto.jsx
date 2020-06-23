import React, { useState, useEffect, useCallback } from "react";
import { Spin } from "antd";
import { withRouter } from "react-router-dom";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";
import Botao from "components/Shareable/Botao";
import DetalheDoProduto from "components/Shareable/DetalheDoProduto";
import { getHomologacaoProduto } from "../../../../services/produto.service";
import ModalResponderReclamacao from "./ModalResponderReclamacao";
import { ordenaLogs, getQuestionamentoCodae } from "./helpers";

const { CODAE_PEDIU_ANALISE_RECLAMACAO } = ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS;

const ResponderReclamacaoDetalheProduto = ({ history }) => {
  const [produto, setProduto] = useState(null);
  const [exibirModal, setExibirModal] = useState();
  const [uuid, setUuid] = useState();

  const carregaHomologacao = useCallback(
    _uuid => {
      async function fetchData() {
        setProduto(null);
        setExibirModal(false);
        const response = await getHomologacaoProduto(_uuid || uuid);
        const _produto = response.data.produto;
        const logOrdenado = ordenaLogs(_produto.ultima_homologacao.logs);
        _produto.logOrdenado = logOrdenado;
        setProduto(_produto);
      }
      fetchData();
    },
    [uuid]
  );

  useEffect(() => {
    async function fetchData() {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("id");
      setUuid(uuid);
      carregaHomologacao(uuid);
    }
    fetchData();
  }, []);

  const desabilitarAcao =
    produto &&
    (produto.respondido ||
      produto.ultima_homologacao.status.toLowerCase() !==
        CODAE_PEDIU_ANALISE_RECLAMACAO.toLowerCase());

  return (
    <Spin tip="Carregando..." spinning={!produto}>
      <>
        <ModalResponderReclamacao
          showModal={exibirModal}
          closeModal={() => setExibirModal(false)}
          produto={produto || {}}
          idHomologacao={uuid}
          atualizarDados={() => {
            setProduto({ ...produto, respondido: true });
            setExibirModal(false);
          }}
        />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 text-right">
                <Botao
                  className="mr-3"
                  style={BUTTON_STYLE.BLUE}
                  texto="Voltar"
                  icon={BUTTON_ICON.ARROW_LEFT}
                  onClick={() => history.goBack()}
                  type={BUTTON_TYPE.BUTTON}
                />
                <Botao
                  texto="Responder"
                  className="mr-3"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  disabled={desabilitarAcao}
                  onClick={() => setExibirModal(true)}
                />
              </div>
            </div>
            {!!produto && (
              <>
                <DetalheDoProduto
                  produto={produto}
                  reclamacao={produto.ultima_homologacao.reclamacoes[0]}
                  questionamento={getQuestionamentoCodae(produto.logOrdenado)}
                />
                <div className="row">
                  <div className="col-12 text-right">
                    <Botao
                      className="mr-3"
                      style={BUTTON_STYLE.BLUE}
                      texto="Voltar"
                      icon={BUTTON_ICON.ARROW_LEFT}
                      onClick={() => history.goBack()}
                      type={BUTTON_TYPE.BUTTON}
                    />
                    <Botao
                      texto={"Responder"}
                      className="mr-3"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      disabled={desabilitarAcao}
                      onClick={() => setExibirModal(true)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </Spin>
  );
};
export default withRouter(ResponderReclamacaoDetalheProduto);
