import React, { useEffect, useState } from "react";
import { meusDados } from "services/perfil.service";
import FormCadastro from "./components/FormCadastro";
import CardMatriculados from "../../../Shareable/CardMatriculados";

export default () => {
  const [quantidadeAlunos, setQuantidadeAlunos] = useState(0);
  const [solicitacoesVigentes, setSolicitacoesVigentes] = useState(null);
  const [meusDadosEscola, setMeusDadosEscola] = useState({});

  useEffect(() => {
    meusDados().then(meusDados => {
      setQuantidadeAlunos(
        meusDados.vinculo_atual.instituicao.quantidade_alunos
      );
      setMeusDadosEscola(meusDados.vinculo_atual.instituicao);
    });
  }, []);

  return (
    <>
      <CardMatriculados numeroAlunos={quantidadeAlunos} />
      <div className="card card-dieta-alteracao-ue mt-3">
        <div className="card-body ">
          <FormCadastro
            solicitacoesVigentes={solicitacoesVigentes}
            setSolicitacoesVigentes={setSolicitacoesVigentes}
            meusDadosEscola={meusDadosEscola}
          />
        </div>
      </div>
    </>
  );
};
