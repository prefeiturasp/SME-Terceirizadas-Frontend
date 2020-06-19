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
import ModalAtivacaoSuspensaoProduto from "./ModalAtivacaoSuspensaoProduto";

const {
  CODAE_HOMOLOGADO,
  ESCOLA_OU_NUTRICIONISTA_RECLAMOU
} = ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS;

const checaStatus = obj =>
  obj.status === CODAE_HOMOLOGADO.toUpperCase() ||
  obj.status === ESCOLA_OU_NUTRICIONISTA_RECLAMOU.toUpperCase();

const AtivacaoSuspensaoDetalheProduto = ({ history }) => {
  const [produto, setProduto] = useState(null);
  const [ativo, setAtivo] = useState(false);
  const [acao, setAcao] = useState();
  const [uuid, setUuid] = useState();

  const carregaHomologacao = useCallback(
    _uuid => {
      async function fetchData() {
        setProduto(null);
        setAcao(null);
        const response = await getHomologacaoProduto(_uuid || uuid);
        setAtivo(checaStatus(response.data));
        setProduto(response.data.produto);
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

  return (
    <Spin tip="Carregando..." spinning={!produto}>
      <>
        <ModalAtivacaoSuspensaoProduto
          showModal={!!acao}
          closeModal={() => setAcao()}
          acao={acao}
          produto={produto || {}}
          idHomologacao={uuid}
          atualizarDados={carregaHomologacao}
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
                  texto={"Ativar"}
                  className="mr-3"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  disabled={ativo}
                  onClick={() => setAcao("ativação")}
                />
                <Botao
                  texto={"Suspender"}
                  className="mr-3"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  disabled={!ativo}
                  onClick={() => setAcao("suspensão")}
                />
              </div>
            </div>
            {!!produto && (
              <>
                <DetalheDoProduto
                  produto={produto}
                  status={ativo ? "ativo" : "suspenso"}
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
                      texto={"Ativar"}
                      className="mr-3"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      disabled={ativo}
                      onClick={() => setAcao("ativação")}
                    />
                    <Botao
                      texto={"Suspender"}
                      className="mr-3"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      disabled={!ativo}
                      onClick={() => setAcao("suspensão")}
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
export default withRouter(AtivacaoSuspensaoDetalheProduto);
