import { useEffect, useState, Dispatch, SetStateAction } from "react";

import { getNumerosEditais } from "services/edital.service";
import { getLotesSimples } from "services/lote.service";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { getFaixasEtarias } from "services/faixaEtaria.service";

import { toastError } from "components/Shareable/Toast/dialogs";

import { TIPOS_UNIDADES_GRUPOS } from "../../const";

import { FormApi } from "final-form";

type SelectOption = {
  uuid: string;
  nome: string;
};

type Props = {
  setTiposAlimentacao: Dispatch<SetStateAction<Array<any>>>;
  setGrupoSelecionado: Dispatch<SetStateAction<string>>;
  setFaixasEtarias: Dispatch<SetStateAction<Array<any>>>;
  form: FormApi<any, any>;
};

export default ({
  setTiposAlimentacao,
  setGrupoSelecionado,
  setFaixasEtarias,
  form,
}: Props) => {
  const [editais, setEditais] = useState<SelectOption[]>([]);
  const [lotes, setLotes] = useState<SelectOption[]>([]);
  const [tiposUnidades, setTiposUnidades] = useState([]);
  const [tiposUnidadesOpcoes, setTiposUnidadesOpcoes] = useState<
    SelectOption[]
  >([]);
  const [carregando, setCarregando] = useState(true);

  const getEditaisAsync = async () => {
    try {
      const { data } = await getNumerosEditais();
      setEditais(
        [{ uuid: "", nome: "Selecione um edital" }].concat(
          data.results.map((edital) => ({
            uuid: edital.uuid,
            nome: edital.numero,
          }))
        )
      );
    } catch (error) {
      toastError("Erro ao carregar editais. Tente novamente mais tarde.");
    }
  };

  const getLotesAsync = async () => {
    try {
      const { data } = await getLotesSimples();
      const lotes = data.results;
      const lotesOrdenados = lotes.sort((loteA, loteB) => {
        return loteA.diretoria_regional.nome < loteB.diretoria_regional.nome;
      });
      setLotes(
        [
          {
            uuid: "",
            nome: "Selecione um lote e uma DRE",
          },
        ].concat(
          lotesOrdenados.map((lote) => ({
            uuid: lote.uuid,
            nome: `${lote.nome} - ${lote.diretoria_regional.nome}`,
          }))
        )
      );
    } catch (error) {
      toastError("Erro ao carregar lotes. Tente novamente mais tarde.");
    }
  };

  const getTiposUnidadeEscolarAsync = async () => {
    const response = await getTiposUnidadeEscolar();
    if (response.status === 200) {
      setTiposUnidades(response.data.results);
      setTiposUnidadesOpcoes(
        [
          {
            uuid: "",
            nome: "Selecione o tipo de unidade",
          },
        ].concat(getGruposTiposUnidades(response.data.results))
      );
    } else {
      toastError(
        "Erro ao carregar tipos de unidades. Tente novamente mais tarde."
      );
    }
  };

  const getFaixasEtariasAsync = async () => {
    try {
      const { data } = await getFaixasEtarias();
      setFaixasEtarias(data.results);
    } catch (error) {
      toastError(
        "Erro ao carregar faixas etárias. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    setCarregando(true);
    Promise.all([
      getEditaisAsync(),
      getLotesAsync(),
      getTiposUnidadeEscolarAsync(),
      setFaixasEtarias && getFaixasEtariasAsync(),
    ]).then(() => {
      setCarregando(false);
    });
  }, []);

  const getGruposTiposUnidades = (tiposUnidades) => {
    const getTipoUnidadeUUID = (tipoUnidade: string): string =>
      tiposUnidades.find((t) => t.iniciais.toUpperCase() === tipoUnidade).uuid;

    return TIPOS_UNIDADES_GRUPOS.map((grupo) => {
      const uuid = grupo.map(getTipoUnidadeUUID).join(",");
      const nome = grupo.join(", ");
      return {
        uuid,
        nome,
      };
    });
  };

  const getGrupoSelecionado = (unidades: string) => {
    let grupoSelecionado = "";

    if (unidades) {
      const unidadesArray = unidades ? unidades.split(",") : [];

      for (let i = 0; i < TIPOS_UNIDADES_GRUPOS.length; i++) {
        const grupo = TIPOS_UNIDADES_GRUPOS[i];
        const todasUnidadesNoGrupo = unidadesArray
          .map(
            (unidade) => tiposUnidades.find((u) => u.uuid === unidade).iniciais
          )
          .every((unidade) => grupo.includes(unidade));

        if (todasUnidadesNoGrupo) {
          grupoSelecionado = `grupo_${i + 1}`;
          break;
        }
      }
    }

    setGrupoSelecionado(grupoSelecionado);
    return grupoSelecionado;
  };

  const onChangeTiposUnidades = (unidades: string) => {
    const tabelas = form.getState().values?.tabelas;
    if (tabelas) {
      form.change("tabelas", {});
    }

    const grupoSelecionado = getGrupoSelecionado(unidades);

    if (
      !(grupoSelecionado === "grupo_3") &&
      !(grupoSelecionado === "grupo_5")
    ) {
      setTiposAlimentacao([]);
      return;
    }

    const unidadesArray = unidades ? unidades.split(",") : [];

    const tiposAlimentacaoUnidades: Array<{
      uuid: string;
      nome: string;
    }> = unidadesArray.reduce((acc, tipoUnidade) => {
      acc.push(
        ...tiposUnidades
          .find((t) => t.uuid === tipoUnidade)
          .periodos_escolares.reduce((acc, periodoEscolar) => {
            acc.push(...periodoEscolar.tipos_alimentacao);
            return acc;
          }, [])
      );
      return acc;
    }, []);

    const tiposAlimentacaoUnicos = {};

    tiposAlimentacaoUnidades.forEach((tipoAlimentacao) => {
      tiposAlimentacaoUnicos[tipoAlimentacao.uuid] = tipoAlimentacao.nome;
    });

    const tiposAlimentacao = Object.entries(tiposAlimentacaoUnicos).map(
      ([uuid, nome]) => ({
        uuid,
        nome,
        grupo: null,
      })
    );

    setTiposAlimentacao(tiposAlimentacao);
  };

  return {
    carregando,
    editais,
    lotes,
    tiposUnidadesOpcoes,
    onChangeTiposUnidades,
  };
};
