import { meusDados } from "services/perfil.service";
import { getEscolasSimplissimaComDRE, getEscolasSimplissimaComDREUnpaginated, getEscolasSimplissimaPorDiretoriaRegional } from "services/escola.service";
import { getDiretoriaregionalSimplissima, getDiretoriaregionalSimplissimaAxios } from "services/diretoriaRegional.service";

export const formFiltrosObtemDreEEscolas = async (
  setEscolas,
  setDiretoriasRegionais,
  change
) => {
  const dadosUsuario = await meusDados();
  if (dadosUsuario.tipo_usuario === "escola") {
    let { uuid, nome } = dadosUsuario.vinculo_atual.instituicao;
    const dre = dadosUsuario.vinculo_atual.instituicao.diretoria_regional;
    setEscolas([{ uuid, nome, diretoria_regional: dre }]);
    setDiretoriasRegionais([{ uuid: dre.uuid, nome: dre.nome }]);
    change("escola", uuid);
    change("dre", dre.uuid);
  } else {
    if (dadosUsuario.tipo_usuario === "diretoriaregional") {
      const resposta2 = await getEscolasSimplissimaComDRE();
      setEscolas(
        [{ uuid: "", nome: "Todas", diretoria_regional: { uuid: "" } }].concat(
          resposta2.results
        )
      );
      const { uuid, nome } = dadosUsuario.vinculo_atual.instituicao;
      setDiretoriasRegionais([{ uuid, nome }]);
      change("dre", uuid);
    } else {
      const [resposta, resposta2] = await Promise.all(
        getDiretoriaregionalSimplissima(),
        getEscolasSimplissimaComDRE()
      );
      setDiretoriasRegionais(
        [{ uuid: "", nome: "Todas" }].concat(resposta.data.results)
      );
      setEscolas(
        [{ uuid: "", nome: "Todas", diretoria_regional: { uuid: "" } }].concat(
          resposta2.results
        )
      );
    }
  }
};

const formataUuidNomeParaMultiSelect = results =>
  results.map(r => {
    return {
      label: r.nome,
      value: r.uuid,
      dre: r.diretoria_regional
    };
  });

export const formFiltrosObtemDreEEscolasNovo = async (
  setEscolas,
  setDiretoriasRegionais,
  change
) => {
  const dadosUsuario = await meusDados();
  if (dadosUsuario.tipo_usuario === "escola") {
    let { uuid, nome } = dadosUsuario.vinculo_atual.instituicao;
    const dre = dadosUsuario.vinculo_atual.instituicao.diretoria_regional;
    setEscolas([{ uuid, nome, diretoria_regional: dre }]);
    setDiretoriasRegionais([{ uuid: dre.uuid, nome: dre.nome }]);
    change("escola", uuid);
    change("dre", dre.uuid);
  } else {
    if (dadosUsuario.tipo_usuario === "diretoriaregional") {
      const { uuid, nome } = dadosUsuario.vinculo_atual.instituicao;
      const resposta2 = await getEscolasSimplissimaPorDiretoriaRegional(uuid);
      setEscolas(formataUuidNomeParaMultiSelect(resposta2));
      setDiretoriasRegionais([{ value: uuid, label: nome }]);
      change("dre", [uuid]);
    } else {
      console.log('1')
      const respostaDre = await getDiretoriaregionalSimplissimaAxios();
      console.log('5')
      const respostaEscola= await getEscolasSimplissimaComDREUnpaginated();
      // const [respostaDre, respostaEscola] = await Promise.all(
      //   getDiretoriaregionalSimplissimaAxios(),
      //   getEscolasSimplissimaComDREUnpaginated()
      // );
      console.log('2')
      setDiretoriasRegionais(
        formataUuidNomeParaMultiSelect(respostaDre.data.results)
      );
      console.log('3')
      setEscolas(formataUuidNomeParaMultiSelect(respostaEscola.data));
      console.log('4')
    }
  }
};
