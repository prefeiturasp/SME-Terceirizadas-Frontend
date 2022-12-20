import React, { useContext, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { agregarDefault, dataParaUTC } from "helpers/utilities";
import { getMotivosAlteracaoCardapio } from "services/alteracaoDeCardapio";
import { getDiasUteis } from "services/diasUteis.service";
import MeusDadosContext from "context/MeusDadosContext";
import { useEffect } from "react";
import { AlteracaoDoTipoDeAlimentacaoCEI } from ".";
import { Spin } from "antd";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";

export const Container = () => {
  const { meusDados } = useContext(MeusDadosContext);
  const [motivos, setMotivos] = useState(null);
  const [vinculos, setVinculos] = useState(null);
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

  const getVinculosTipoAlimentacaoPorEscolaAsync = async escola_uuid => {
    const response = await getVinculosTipoAlimentacaoPorEscola(escola_uuid);
    if (response.status === HTTP_STATUS.OK) {
      setVinculos(response.data.results);
    } else {
      setErroAPI("Erro ao carregar vínculos de tipo de alimentação.");
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
    meusDados &&
      getVinculosTipoAlimentacaoPorEscolaAsync(
        meusDados.vinculo_atual.instituicao.uuid
      );
  }, [meusDados]);

  const LOADING =
    !meusDados ||
    !proximosCincoDiasUteis ||
    !proximosDoisDiasUteis ||
    !motivos ||
    !vinculos;

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
          vinculos={vinculos.filter(
            vinculo => vinculo.periodo_escolar.nome === "INTEGRAL"
          )}
        />
      )}
    </Spin>
  );
};

export default Container;
