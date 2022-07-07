import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { getQuantidadeAlunosEscola } from "services/escola.service";
import InclusaoDeAlimentacao from "..";
import { dataParaUTC, escolaEhCei } from "../../../../../helpers/utilities";
import { getDiasUteis } from "../../../../../services/diasUteis.service";
import {
  getMotivosInclusaoContinua,
  getMotivosInclusaoNormal
} from "../../../../../services/inclusaoDeAlimentacao";
import { getMeusDados } from "../../../../../services/perfil.service";
import {
  abstraiPeriodosComAlunosMatriculados,
  formatarPeriodos
} from "../../../helper";

export const Container = () => {
  const [dados, setDados] = useState(null);
  const [motivosSimples, setMotivosSimples] = useState(null);
  const [motivosContinuos, setMotivosContinuos] = useState(
    escolaEhCei() ? [] : null
  );
  const [periodos, setPeriodos] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);
  const [erro, setErro] = useState(false);

  const getQuantidaDeAlunosPorPeriodoEEscolaAsync = async (
    periodos,
    escola_uuid
  ) => {
    const response = await getQuantidadeAlunosEscola(escola_uuid);
    if (response.status === HTTP_STATUS.OK) {
      setPeriodos(
        abstraiPeriodosComAlunosMatriculados(periodos, response.data.results)
      );
    }
  };

  const getMeusDadosAsync = async () => {
    const response = await getMeusDados();
    if (response.status === HTTP_STATUS.OK) {
      setDados(response.data);
      const periodos = formatarPeriodos(
        response.data.vinculo_atual.instituicao.periodos_escolares
      );
      const escola_uuid = response.data.vinculo_atual.instituicao.uuid;
      getQuantidaDeAlunosPorPeriodoEEscolaAsync(periodos, escola_uuid);
    } else {
      setErro(true);
    }
  };

  const getMotivosInclusaoContinuaAsync = async () => {
    const response = await getMotivosInclusaoContinua();
    if (response.status === HTTP_STATUS.OK) {
      setMotivosContinuos(response.data.results);
    } else {
      setErro(true);
    }
  };

  const getMotivosInclusaoNormalAsync = async () => {
    const response = await getMotivosInclusaoNormal();
    if (response.status === HTTP_STATUS.OK) {
      setMotivosSimples(response.data.results);
    } else {
      setErro(true);
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
      setErro(true);
    }
  };

  useEffect(() => {
    getMeusDadosAsync();
    !escolaEhCei() && getMotivosInclusaoContinuaAsync();
    getMotivosInclusaoNormalAsync();
    getDiasUteisAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const REQUISICOES_CONCLUIDAS =
    dados &&
    motivosContinuos &&
    motivosSimples &&
    periodos &&
    proximosDoisDiasUteis &&
    proximosCincoDiasUteis;

  return (
    <div>
      {!REQUISICOES_CONCLUIDAS && !erro && <div>Carregando...</div>}
      {erro && (
        <div>Erro ao carregar informações. Tente novamente mais tarde.</div>
      )}
      {REQUISICOES_CONCLUIDAS && (
        <InclusaoDeAlimentacao
          meusDados={dados}
          motivosSimples={motivosSimples}
          motivosContinuos={motivosContinuos}
          periodos={periodos}
          proximosCincoDiasUteis={proximosCincoDiasUteis}
          proximosDoisDiasUteis={proximosDoisDiasUteis}
        />
      )}
    </div>
  );
};

export default Container;
