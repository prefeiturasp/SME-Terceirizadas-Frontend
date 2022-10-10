import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";
import { CorpoRelatorio } from "./components/CorpoRelatorio";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { getDietasAtivasInativasPorAluno } from "services/dietaEspecial.service";
import {
  getKitsLanche,
  getSolicitacaoKitLancheCEMEI
} from "services/kitLanche";
import "./style.scss";
import { SolicitacaoAlimentacaoContext } from "context/SolicitacaoAlimentacao";

export const Relatorio = ({ ...props }) => {
  const history = useHistory();
  const [carregando, setCarregando] = useState(true);
  const [kits, setKits] = useState(null);
  const [erro, setErro] = useState(false);
  const [alunosComDietaEspecial, setAlunosComDietaEspecial] = useState(null);

  const solicitacaoAlimentacaoContext = useContext(
    SolicitacaoAlimentacaoContext
  );

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      const response = await getSolicitacaoKitLancheCEMEI(uuid);
      if (response.status === HTTP_STATUS.OK) {
        solicitacaoAlimentacaoContext.updateSolicitacaoAlimentacao(
          response.data
        );
      } else {
        setErro(true);
      }
    }
    setCarregando(false);
  };

  const getKitsAsync = async () => {
    const response = await getKitsLanche();
    if (response.status === HTTP_STATUS.OK) {
      setKits(response.data.results);
    } else {
      setErro(true);
    }
  };

  const getDietasAtivasInativasPorAlunoAsync = async () => {
    const response = await getDietasAtivasInativasPorAluno();
    if (response.status === HTTP_STATUS.OK) {
      setAlunosComDietaEspecial(response.data.solicitacoes);
    } else {
      setErro(true);
    }
  };

  useEffect(() => {
    fetchData();
    getKitsAsync();
    getDietasAtivasInativasPorAlunoAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const solicitacao = solicitacaoAlimentacaoContext.solicitacaoAlimentacao;

  const REQUISICOES_CONCLUIDAS = solicitacao && kits && alunosComDietaEspecial;

  return erro ? (
    <div>Erro ao carregar informações. Tente novamente mais tarde.</div>
  ) : (
    <Spin tip="Carregando..." spinning={carregando}>
      {REQUISICOES_CONCLUIDAS && (
        <>
          <div className="row">
            <div className="col-6">
              <p className="page-title mt-0 pt-2">{`Kit Lanche Passeio - Solicitação # ${
                solicitacao ? solicitacao.id_externo : ""
              }`}</p>
            </div>
            <div className="col-6">
              <Botao
                type={BUTTON_TYPE.BUTTON}
                texto="Voltar"
                style={BUTTON_STYLE.GREEN_OUTLINE}
                icon={BUTTON_ICON.ARROW_LEFT}
                onClick={() => history.push("/painel-gestao-alimentacao")}
                className="mr-2 float-right"
              />
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              {solicitacao && (
                <CorpoRelatorio
                  solicitacaoKitLancheCEMEI={solicitacao}
                  kits={kits}
                  alunosComDietaEspecial={alunosComDietaEspecial}
                  {...props}
                />
              )}
            </div>
          </div>
        </>
      )}
    </Spin>
  );
};
