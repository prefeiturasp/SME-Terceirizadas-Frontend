import React, { useContext, useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getDiasUteis } from "services/diasUteis.service";
import { dataParaUTC } from "helpers/utilities";
import InversaoDeDiaDeCardapio from ".";
import { SigpaeLogoLoader } from "components/Shareable/SigpaeLogoLoader";
import { MeusDadosContext } from "context/MeusDadosContext";

export const Container = () => {
  const { meusDados } = useContext(MeusDadosContext);

  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState();
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState();

  const [erro, setErro] = useState("");

  const getDiasUteisAsync = async () => {
    const response = await getDiasUteis({
      escola_uuid: meusDados.vinculo_atual.instituicao.uuid,
    });
    if (response.status === HTTP_STATUS.OK) {
      setProximosDoisDiasUteis(
        dataParaUTC(new Date(response.data.proximos_dois_dias_uteis))
      );
      setProximosCincoDiasUteis(
        dataParaUTC(new Date(response.data.proximos_cinco_dias_uteis))
      );
    } else {
      setErro("Erro ao carregar dias úteis. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    if (meusDados) {
      getDiasUteisAsync();
    }
  }, [meusDados]);

  const LOADING =
    !meusDados || !proximosCincoDiasUteis || !proximosDoisDiasUteis;

  return (
    <>
      {LOADING && !erro && <SigpaeLogoLoader />}
      {!!erro && <div>{erro}</div>}
      {!LOADING && !erro && (
        <InversaoDeDiaDeCardapio
          meusDados={meusDados}
          proximos_dois_dias_uteis={proximosDoisDiasUteis}
          proximos_cinco_dias_uteis={proximosCincoDiasUteis}
        />
      )}
    </>
  );
};
