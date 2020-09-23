import React, { useEffect, useState } from "react";

import InformacoesEscola from "./components/InformacoesEscola";
import PanoramaGeral from "./components/PanoramaGeral";

import * as perfilService from "services/perfil.service";
import { getPanoramaEscola } from "services/dietaEspecial.service";
import SeletorTipoContagem from "./components/SeletorTipoContagem";
import ProgramasAutorizados from "./components/ProgramasAutorizados";
import LancamentoPorPeriodo from "./components/LancamentoPorPeriodo";
import { getEscolaSimples } from "services/escola.service";

export default () => {
  const [meusDados, setMeusDados] = useState({});
  const [panoramaGeral, setPanoramaGeral] = useState();
  const [loading, setLoading] = useState(true);
  const [nomeTerceirizada, setNomeTerceirizada] = useState();

  useEffect(() => {
    async function fetch() {
      const meusDados = await perfilService.meusDados();
      setMeusDados(meusDados);
      const escola =
        meusDados.vinculo_atual && meusDados.vinculo_atual.instituicao;
      const respostaPanorama = await getPanoramaEscola({ escola: escola.uuid });
      const respostaEscolaSimples = await getEscolaSimples(escola.uuid);
      setNomeTerceirizada(
        respostaEscolaSimples.data.lote.terceirizada.nome_fantasia
      );
      setPanoramaGeral(respostaPanorama.data);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <div className="card mt-3">
      <div className="card-body">
        <InformacoesEscola
          meusDados={meusDados}
          nomeTerceirizada={nomeTerceirizada}
        />
        {panoramaGeral && <PanoramaGeral panoramaGeral={panoramaGeral} />}
        <ProgramasAutorizados />
        {!loading && (
          <SeletorTipoContagem escola={meusDados.vinculo_atual.instituicao} />
        )}
        <LancamentoPorPeriodo />
      </div>
    </div>
  );
};
