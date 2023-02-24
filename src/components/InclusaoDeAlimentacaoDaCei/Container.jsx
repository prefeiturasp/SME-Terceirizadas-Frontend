import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import InclusaoDeAlimentacaoDaCei from ".";
import { backgroundLabelPeriodo } from "./helper";
import { dataParaUTC } from "helpers/utilities";
import { getMeusDados } from "services/perfil.service";
import { getMotivosInclusaoNormal } from "services/inclusaoDeAlimentacao";
import { getDiasUteis } from "services/diasUteis.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";

export const Container = () => {
  const [dados, setDados] = useState(null);
  const [motivos, setMotivos] = useState(null);
  const [periodos, setPeriodos] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);
  const [vinculosAlimentacao, setVinculosAlimentacao] = useState(null);

  const [erro, setErro] = useState(false);

  const getVinculosAlimentacao = async escola_uuid => {
    const response = await getVinculosTipoAlimentacaoPorEscola(escola_uuid);
    if (response.status === HTTP_STATUS.OK) {
      setVinculosAlimentacao(response.data.results);
    } else {
      setErro(true);
    }
  };

  const getMeusDadosAsync = async () => {
    const response = await getMeusDados();
    if (response.status === HTTP_STATUS.OK) {
      setDados(response.data);
      const escola = response.data.vinculo_atual.instituicao;
      const periodosStyle = backgroundLabelPeriodo(escola.periodos_escolares);
      setPeriodos(periodosStyle);
      getVinculosAlimentacao(escola.uuid);
    } else {
      setErro(true);
    }
  };

  const getMotivosInclusaoNormalAsync = async () => {
    const response = await getMotivosInclusaoNormal();
    if (response.status === HTTP_STATUS.OK) {
      setMotivos(response.data.results);
    } else {
      setErro(true);
    }
  };

  const getDiasUteisAsync = async () => {
    const response = await getDiasUteis();
    if (response.status === HTTP_STATUS.OK) {
      setProximosDoisDiasUteis(
        dataParaUTC(new Date(response.data.proximos_dois_dias_uteis))
      );
      setProximosCincoDiasUteis(
        dataParaUTC(new Date(response.data.proximos_cinco_dias_uteis))
      );
    } else {
      setErro(true);
    }
  };

  useEffect(() => {
    getMeusDadosAsync();
    getMotivosInclusaoNormalAsync();
    getDiasUteisAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const REQUISICOES_CONCLUIDAS =
    dados &&
    motivos &&
    periodos &&
    proximosDoisDiasUteis &&
    proximosCincoDiasUteis &&
    vinculosAlimentacao;

  return (
    <div className="mt-3">
      {!REQUISICOES_CONCLUIDAS && !erro && <div>Carregando...</div>}
      {erro && (
        <div>Erro ao carregar informações. Tente novamente mais tarde.</div>
      )}
      {REQUISICOES_CONCLUIDAS && (
        <InclusaoDeAlimentacaoDaCei
          meusDados={dados}
          motivos={motivos}
          periodos={periodos}
          proximosDoisDiasUteis={proximosDoisDiasUteis}
          proximosCincoDiasUteis={proximosCincoDiasUteis}
          vinculosAlimentacao={vinculosAlimentacao}
        />
      )}
    </div>
  );
};

export default Container;
