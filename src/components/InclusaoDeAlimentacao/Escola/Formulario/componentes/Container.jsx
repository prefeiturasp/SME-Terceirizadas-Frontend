import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import {
  getVinculosTipoAlimentacaoMotivoInclusaoEspecifico,
  getVinculosTipoAlimentacaoPorEscola
} from "services/cadastroTipoAlimentacao.service";
import {
  buscaPeriodosEscolares,
  getQuantidadeAlunosEscola
} from "services/escola.service";
import InclusaoDeAlimentacao from "..";
import {
  dataParaUTC,
  escolaEhCei,
  tiposAlimentacaoETEC
} from "helpers/utilities";
import { getDiasUteis } from "services/diasUteis.service";
import {
  getMotivosInclusaoContinua,
  getMotivosInclusaoNormal
} from "services/inclusaoDeAlimentacao";
import { getMeusDados } from "services/perfil.service";
import {
  abstraiPeriodosComAlunosMatriculados,
  exibeMotivoETEC,
  formatarPeriodos
} from "../../../helper";

export const Container = () => {
  const [dados, setDados] = useState(null);
  const [motivosSimples, setMotivosSimples] = useState(null);
  const [motivosContinuos, setMotivosContinuos] = useState(
    escolaEhCei() ? [] : null
  );
  const [periodos, setPeriodos] = useState(null);
  const [periodosMotivoEspecifico, setPeriodosMotivoEspecifico] = useState(
    null
  );
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);
  const [periodoNoite, setPeriodoNoite] = useState(
    exibeMotivoETEC() ? null : []
  );

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
        periodos_.map(periodo => {
          return (periodo.tipos_alimentacao = vinculos.data.results.find(
            v => v.periodo_escolar.nome === periodo.nome
          ).tipos_alimentacao);
        });
        setPeriodos(
          abstraiPeriodosComAlunosMatriculados(
            periodos,
            response.data.results,
            false
          )
        );
      }
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
      const tipo_unidade_escolar_iniciais =
        response.data.vinculo_atual.instituicao.tipo_unidade_escolar_iniciais;
      const vinculosTipoAlimentacaoMotivoInclusaoEspecifico = await getVinculosTipoAlimentacaoMotivoInclusaoEspecifico(
        { tipo_unidade_escolar_iniciais }
      );
      let periodosMotivoInclusaoEspecifico = [];
      vinculosTipoAlimentacaoMotivoInclusaoEspecifico.data.forEach(vinculo => {
        let periodo = vinculo.periodo_escolar;
        periodo.tipos_alimentacao = vinculo.tipos_alimentacao;
        periodo.maximo_alunos = null;
        periodosMotivoInclusaoEspecifico.push(periodo);
      });
      setPeriodosMotivoEspecifico(
        formatarPeriodos(periodosMotivoInclusaoEspecifico)
      );
    } else {
      setErro(true);
    }
  };

  const getMotivosInclusaoContinuaAsync = async () => {
    const response = await getMotivosInclusaoContinua();
    if (response.status === HTTP_STATUS.OK) {
      if (!exibeMotivoETEC()) {
        response.data.results = response.data.results.filter(
          motivo => motivo.nome !== "ETEC"
        );
      }
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

  const getBuscaPeriodosEscolaresAsync = async () => {
    const response = await buscaPeriodosEscolares({ nome: "NOITE" });
    if (
      response.status === HTTP_STATUS.OK &&
      response.data.results.length > 0
    ) {
      response.data.results[0].tipos_alimentacao = response.data.results[0].tipos_alimentacao.filter(
        tipo_alimentacao =>
          tiposAlimentacaoETEC().includes(tipo_alimentacao.nome)
      );
      setPeriodoNoite(formatarPeriodos(response.data.results));
    } else {
      setErro(true);
    }
  };

  useEffect(() => {
    getMeusDadosAsync();
    !escolaEhCei() && getMotivosInclusaoContinuaAsync();
    getMotivosInclusaoNormalAsync();
    getDiasUteisAsync();
    exibeMotivoETEC() && getBuscaPeriodosEscolaresAsync();
  }, []);

  const REQUISICOES_CONCLUIDAS =
    dados &&
    motivosContinuos &&
    motivosSimples &&
    periodos &&
    proximosDoisDiasUteis &&
    proximosCincoDiasUteis &&
    periodoNoite;

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
          periodoNoite={periodoNoite}
          periodosMotivoEspecifico={periodosMotivoEspecifico}
        />
      )}
    </div>
  );
};

export default Container;
