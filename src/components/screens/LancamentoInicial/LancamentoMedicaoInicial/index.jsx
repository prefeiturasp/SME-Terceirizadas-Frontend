import React, { useEffect, useState } from "react";

import InformacoesEscola from "./components/InformacoesEscola";
import PanoramaGeral from "./components/PanoramaGeral";

import * as perfilService from "services/perfil.service";
import { getPanoramaEscola } from "services/dietaEspecial.service";
import SeletorTipoContagem from "./components/SeletorTipoContagem";

export default () => {
  const [meusDados, setMeusDados] = useState({});
  const [panoramaGeral, setPanoramaGeral] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const meusDados = await perfilService.meusDados();
      setMeusDados(meusDados);
      const escola =
        meusDados.vinculo_atual && meusDados.vinculo_atual.instituicao;
      const respostaPanorama = await getPanoramaEscola({ escola: escola.uuid });
      setPanoramaGeral(respostaPanorama.data);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <div>
      <InformacoesEscola meusDados={meusDados} />
      {panoramaGeral && <PanoramaGeral panoramaGeral={panoramaGeral} />}
      {!loading && (
        <SeletorTipoContagem escola={meusDados.vinculo_atual.instituicao} />
      )}
    </div>
  );
};
