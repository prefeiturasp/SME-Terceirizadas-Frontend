import React, { useEffect, useState } from "react";
import { meusDados } from "../../services/perfil.service";
import { getDiasUteis } from "../../services/diasUteis.service";
import { getKitLanches } from "../../services/kitLanche";
import { getEscolasTrecTotal } from "../../services/escola.service";
import { dataParaUTC } from "../../helpers/utilities";
import SolicitacaoUnificada from ".";

export default () => {
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [proximosDoisDiasUteis, setProximosDoisDiasUteis] = useState(null);
  const [proximosCincoDiasUteis, setProximosCincoDiasUteis] = useState(null);
  const [escolas, setEscolas] = useState(undefined);
  const [lotes, setLotes] = useState([]);
  const [kits, setKits] = useState([]);

  async function fetchData() {
    meusDados().then(response => {
      setDadosUsuario(response);
      setLotes(response.vinculo_atual.instituicao.lotes);
    });

    getEscolasTrecTotal().then(response => {
      setEscolas(response.data);
    });

    getDiasUteis().then(response => {
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.data.proximos_dois_dias_uteis)
      );
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.data.proximos_cinco_dias_uteis)
      );
      setProximosDoisDiasUteis(proximos_dois_dias_uteis);
      setProximosCincoDiasUteis(proximos_cinco_dias_uteis);
    });

    getKitLanches({ status: "ATIVO" }).then(response => {
      setKits(response.data.results);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return escolas && kits ? (
    <SolicitacaoUnificada
      dadosUsuario={dadosUsuario}
      proximosDoisDiasUteis={proximosDoisDiasUteis}
      proximosCincoDiasUteis={proximosCincoDiasUteis}
      escolas={escolas}
      lotes={lotes}
      kits={kits}
    />
  ) : (
    <p>Loading...</p>
  );
};
