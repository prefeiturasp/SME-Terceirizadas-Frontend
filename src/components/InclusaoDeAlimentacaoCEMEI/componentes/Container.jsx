import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { InclusaoDeAlimentacaoCEMEI } from "..";
import { dataParaUTC } from "helpers/utilities";
import { getDiasUteis } from "services/diasUteis.service";
import { getMotivosInclusaoNormal } from "services/inclusaoDeAlimentacao";
import { getMeusDados } from "services/perfil.service";
import { getQuantidadeAlunosCEMEIporCEIEMEI } from "services/aluno.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";

export const Container = () => {
  const [dados, setDados] = useState(null);
  const [motivosSimples, setMotivosSimples] = useState(null);
  const [periodos, setPeriodos] = useState(null);
  const [vinculos, setVinculos] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);

  const [erro, setErro] = useState(false);

  const getQuantidadeAlunosCEMEIporCEIEMEIAsync = async escola => {
    const response = await getQuantidadeAlunosCEMEIporCEIEMEI(
      escola.codigo_eol
    );
    if (response.status === HTTP_STATUS.OK) {
      setPeriodos(response.data);
    }
  };
  const getVinculosTipoAlimentacaoPorEscolaAsync = async escola => {
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
      getQuantidadeAlunosCEMEIporCEIEMEIAsync(escola);
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
    getDiasUteisAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const REQUISICOES_CONCLUIDAS =
    dados &&
    motivosSimples &&
    vinculos &&
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
        <InclusaoDeAlimentacaoCEMEI
          meusDados={dados}
          motivosSimples={motivosSimples}
          periodos={periodos}
          vinculos={vinculos}
          proximosCincoDiasUteis={proximosCincoDiasUteis}
          proximosDoisDiasUteis={proximosDoisDiasUteis}
        />
      )}
    </div>
  );
};

export default Container;
