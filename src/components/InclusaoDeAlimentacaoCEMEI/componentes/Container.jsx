import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { InclusaoDeAlimentacaoCEMEI } from "..";
import { dataParaUTC } from "helpers/utilities";
import { getDiasUteis } from "services/diasUteis.service";
import {
  getMotivosInclusaoContinua,
  getMotivosInclusaoNormal,
} from "services/inclusaoDeAlimentacao";
import { getMeusDados } from "services/perfil.service";
import { getQuantidadeAlunosCEMEIporCEIEMEI } from "services/aluno.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import {
  abstraiPeriodosComAlunosMatriculados,
  formatarPeriodos,
} from "components/InclusaoDeAlimentacao/helper";
import { getQuantidadeAlunosEscola } from "services/escola.service";

export const Container = () => {
  const [dados, setDados] = useState(null);
  const [motivosSimples, setMotivosSimples] = useState(null);
  const [motivosContinuos, setMotivosContinuos] = useState(null);
  const [periodos, setPeriodos] = useState(null);
  const [periodosInclusaoContinua, setPeriodosInclusaoContinua] =
    useState(null);
  const [vinculos, setVinculos] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);

  const [erro, setErro] = useState(false);

  const getQuantidaDeAlunosPorPeriodoEEscolaAsync = async (
    periodos,
    escola_uuid
  ) => {
    const response = await getQuantidadeAlunosEscola(escola_uuid);
    if (response.status === HTTP_STATUS.OK) {
      const periodos_ = abstraiPeriodosComAlunosMatriculados(
        periodos,
        response.data.results,
        false
      );
      const vinculos = await getVinculosTipoAlimentacaoPorEscola(escola_uuid);
      if (vinculos.status === HTTP_STATUS.OK) {
        periodos_.map((periodo) => {
          return (periodo.tipos_alimentacao = vinculos.data.results.find(
            (v) => v.periodo_escolar.nome === periodo.nome
          ).tipos_alimentacao);
        });
        setPeriodosInclusaoContinua(
          abstraiPeriodosComAlunosMatriculados(
            periodos,
            response.data.results,
            false
          )
        );
      }
    }
  };

  const getQuantidadeAlunosCEMEIporCEIEMEIAsync = async (
    escola,
    manha_e_tarde_sempre = null
  ) => {
    const response = await getQuantidadeAlunosCEMEIporCEIEMEI(
      escola.codigo_eol,
      manha_e_tarde_sempre
    );
    if (response.status === HTTP_STATUS.OK) {
      setPeriodos(response.data);
    }
  };
  const getVinculosTipoAlimentacaoPorEscolaAsync = async (escola) => {
    const response = await getVinculosTipoAlimentacaoPorEscola(escola.uuid);
    if (response.status === HTTP_STATUS.OK) {
      setVinculos(response.data.results);
    }
  };

  const getMeusDadosAsync = async () => {
    const response = await getMeusDados();
    if (response.status === HTTP_STATUS.OK) {
      setDados(response.data);
      const escola = response.data.vinculo_atual.instituicao;
      const periodos = formatarPeriodos(
        response.data.vinculo_atual.instituicao.periodos_escolares
      );
      const escola_uuid = response.data.vinculo_atual.instituicao.uuid;
      getQuantidaDeAlunosPorPeriodoEEscolaAsync(periodos, escola_uuid);
      getQuantidadeAlunosCEMEIporCEIEMEIAsync(escola, true);
      getVinculosTipoAlimentacaoPorEscolaAsync(escola);
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

  const getMotivosInclusaoContinuaAsync = async () => {
    const response = await getMotivosInclusaoContinua();
    if (response.status === HTTP_STATUS.OK) {
      setMotivosContinuos(response.data.results);
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
    getMotivosInclusaoNormalAsync();
    getMotivosInclusaoContinuaAsync();
    getDiasUteisAsync();
  }, []);

  const REQUISICOES_CONCLUIDAS =
    dados &&
    motivosSimples &&
    motivosContinuos &&
    vinculos &&
    periodos &&
    periodosInclusaoContinua &&
    proximosDoisDiasUteis &&
    proximosCincoDiasUteis;

  return (
    <div>
      {!REQUISICOES_CONCLUIDAS && !erro && <div>Carregando...</div>}
      {erro && (
        <div>Erro ao carregar informações. Tente novamente mais tarde.</div>
      )}
      {REQUISICOES_CONCLUIDAS && (
        <InclusaoDeAlimentacaoCEMEI
          meusDados={dados}
          motivosSimples={motivosSimples}
          motivosContinuos={motivosContinuos}
          periodos={periodos}
          periodosInclusaoContinua={periodosInclusaoContinua}
          vinculos={vinculos}
          proximosCincoDiasUteis={proximosCincoDiasUteis}
          proximosDoisDiasUteis={proximosDoisDiasUteis}
        />
      )}
    </div>
  );
};

export default Container;
