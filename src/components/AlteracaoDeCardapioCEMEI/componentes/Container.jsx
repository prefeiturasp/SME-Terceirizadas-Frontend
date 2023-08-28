import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { AlteracaoDeCardapioCEMEI } from "..";
import { backgroundLabelPeriodo } from "../helpers";
import { dataParaUTC } from "helpers/utilities";
import { getMeusDados } from "services/perfil.service";
import { getQuantidadeAlunosCEMEIporCEIEMEI } from "services/aluno.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { getMotivosAlteracaoCardapio } from "services/alteracaoDeCardapio";
import { getDiasUteis, getFeriadosAno } from "services/diasUteis.service";

export const Container = () => {
  const [dados, setDados] = useState(null);
  const [motivos, setMotivos] = useState(null);
  const [periodos, setPeriodos] = useState(null);
  const [vinculos, setVinculos] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);
  const [feriadosAno, setFeriadosAno] = useState(null);

  const [erro, setErro] = useState(false);

  const getQuantidadeAlunosCEMEIporCEIEMEIAsync = async (escola) => {
    const response = await getQuantidadeAlunosCEMEIporCEIEMEI(
      escola.codigo_eol
    );
    if (response.status === HTTP_STATUS.OK) {
      setPeriodos(backgroundLabelPeriodo(response.data));
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
      getQuantidadeAlunosCEMEIporCEIEMEIAsync(escola);
      getVinculosTipoAlimentacaoPorEscolaAsync(escola);
    } else {
      setErro(true);
    }
  };

  const getMotivosAlteracaoCardapioAsync = async () => {
    const response = await getMotivosAlteracaoCardapio();
    if (response.status === HTTP_STATUS.OK) {
      setMotivos(response.data.results);
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

  const getFeriadosAnoAsync = async () => {
    const response = await getFeriadosAno();
    if (response.status === HTTP_STATUS.OK) {
      setFeriadosAno(response.data.results);
    } else {
      setErro("Erro ao carregar feriados.");
    }
  };

  useEffect(() => {
    getMeusDadosAsync();
    getMotivosAlteracaoCardapioAsync();
    getDiasUteisAsync();
    getFeriadosAnoAsync();
  }, []);

  const REQUISICOES_CONCLUIDAS =
    dados &&
    motivos &&
    vinculos &&
    periodos &&
    proximosDoisDiasUteis &&
    proximosCincoDiasUteis &&
    feriadosAno;

  return (
    <div>
      {!REQUISICOES_CONCLUIDAS && !erro && <div>Carregando...</div>}
      {erro && (
        <div>Erro ao carregar informações. Tente novamente mais tarde.</div>
      )}
      {REQUISICOES_CONCLUIDAS && (
        <AlteracaoDeCardapioCEMEI
          meusDados={dados}
          motivos={motivos}
          periodos={periodos}
          vinculos={vinculos}
          proximosDoisDiasUteis={proximosDoisDiasUteis}
          proximosCincoDiasUteis={proximosCincoDiasUteis}
          feriadosAno={feriadosAno}
        />
      )}
    </div>
  );
};

export default Container;
