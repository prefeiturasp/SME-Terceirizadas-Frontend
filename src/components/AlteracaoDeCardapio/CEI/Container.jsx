import React, { useContext, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { agregarDefault, dataParaUTC } from "helpers/utilities";
import { getMotivosAlteracaoCardapio } from "services/alteracaoDeCardapio";
import { getDiasUteis } from "services/diasUteis.service";
import MeusDadosContext from "context/MeusDadosContext";
import { useEffect } from "react";
import { AlteracaoDoTipoDeAlimentacaoCEI } from ".";
import { Spin } from "antd";

export const Container = () => {
  const { meusDados } = useContext(MeusDadosContext);
  const [motivos, setMotivos] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);
  const [erroAPI, setErroAPI] = useState("");

  const getMotivosAlteracaoCardapioAsync = async () => {
    const response = await getMotivosAlteracaoCardapio();
    if (response.status === HTTP_STATUS.OK) {
      setMotivos(agregarDefault(response.data.results));
    } else {
      setErroAPI(
        "Erro ao carregar motivos de alteração de dia de alimentação."
      );
    }
  };
  const getDiasUteisAsync = async () => {
    const response = await getDiasUteis();
    if (response.status === HTTP_STATUS.OK) {
      setProximosCincoDiasUteis(
        dataParaUTC(new Date(response.data.proximos_cinco_dias_uteis))
      );
      setProximosDoisDiasUteis(
        dataParaUTC(new Date(response.data.proximos_dois_dias_uteis))
      );
    } else {
      setErroAPI("Erro ao carregar dias úteis para a solicitação.");
    }
  };

  useEffect(() => {
    getMotivosAlteracaoCardapioAsync();
    getDiasUteisAsync();
  }, []);

  const LOADING =
    !meusDados || !proximosCincoDiasUteis || !proximosDoisDiasUteis || !motivos;

  return (
    <Spin tip="Carregando..." spinning={LOADING && !erroAPI}>
      {erroAPI && <div>{erroAPI}</div>}
      {!LOADING && !erroAPI && (
        <AlteracaoDoTipoDeAlimentacaoCEI
          meusDados={meusDados}
          motivos={motivos}
          periodos={meusDados.vinculo_atual.instituicao.periodos_escolares.filter(
            periodo => periodo.nome === "INTEGRAL"
          )}
          proximosDoisDiasUteis={proximosDoisDiasUteis}
          proximosCincoDiasUteis={proximosCincoDiasUteis}
        />
      )}
    </Spin>
  );
};

export default Container;
