import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { dataParaUTC } from "helpers/utilities";
import { getDiasUteis } from "services/diasUteis.service";
import { getMeusDados } from "services/perfil.service";
import { SolicitacaoKitLancheCEMEI } from "..";
import { getKitsLanche } from "services/kitLanche";
import { getDietasAtivasInativasPorAluno } from "services/dietaEspecial.service";

export const Container = () => {
  const [dados, setDados] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);
  const [kits, setKits] = useState(null);
  const [erro, setErro] = useState(false);
  const [alunosComDietaEspecial, setAlunosComDietaEspecial] = useState(null);

  const getMeusDadosAsync = async () => {
    const response = await getMeusDados();
    if (response.status === HTTP_STATUS.OK) {
      setDados(response.data);
    } else {
      setErro(true);
    }
  };

  const getDietasAtivasInativasPorAlunoAsync = async () => {
    const response = await getDietasAtivasInativasPorAluno({
      incluir_alteracao_ue: true
    });
    if (response.status === HTTP_STATUS.OK) {
      setAlunosComDietaEspecial(response.data.solicitacoes);
    } else {
      setErro(true);
    }
  };

  const getKitsAsync = async () => {
    const response = await getKitsLanche();
    if (response.status === HTTP_STATUS.OK) {
      setKits(response.data.results);
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
    getDiasUteisAsync();
    getKitsAsync();
    getDietasAtivasInativasPorAlunoAsync();
  }, []);

  const REQUISICOES_CONCLUIDAS =
    dados &&
    proximosDoisDiasUteis &&
    proximosCincoDiasUteis &&
    kits &&
    alunosComDietaEspecial;

  return (
    <div>
      {!REQUISICOES_CONCLUIDAS && !erro && <div>Carregando...</div>}
      {erro && (
        <div>Erro ao carregar informações. Tente novamente mais tarde.</div>
      )}
      {REQUISICOES_CONCLUIDAS && (
        <SolicitacaoKitLancheCEMEI
          meusDados={dados}
          kits={kits}
          alunosComDietaEspecial={alunosComDietaEspecial}
          proximosCincoDiasUteis={proximosCincoDiasUteis}
          proximosDoisDiasUteis={proximosDoisDiasUteis}
        />
      )}
    </div>
  );
};

export default Container;
