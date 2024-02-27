import { ChangeEvent, useEffect, useState } from "react";

import { formatarOpcoesLote } from "helpers/utilities";

import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getLotesSimples } from "services/lote.service";
import {
  getEscolasParaFiltros,
  buscaPeriodosEscolares,
} from "services/escola.service";
import { getTiposDeAlimentacao } from "services/cadastroTipoAlimentacao.service";
import { getMesesAnosSolicitacoesMedicaoinicial } from "services/medicaoInicial/dashboard.service";

import { MESES } from "constants/shared";

import { Args, SelectOption, MultiSelectOption, Option } from "./types";

export default ({ form }: Args) => {
  const [mesesAnosOpcoes, setMesesAnosOpcoes] = useState<Array<SelectOption>>(
    []
  );
  const [diretoriasRegionaisOpcoes, setDiretoriasRegionaisOpcoes] = useState<
    Array<SelectOption>
  >([]);
  const [lotesOpcoes, setLotesOpcoes] = useState<Array<MultiSelectOption>>([]);
  const [unidadesEducacionaisOpcoes, setUnidadesEducacionaisOpcoes] = useState<
    Array<Option>
  >([]);
  const [periodosEscolaresOpcoes, setPeriodosEscolaresOpcoes] = useState<
    Array<MultiSelectOption>
  >([]);
  const [tiposAlimentacaoOpcoes, setTiposAlimentacaoOpcoes] = useState<
    Array<MultiSelectOption>
  >([]);

  const [lotes, setLotes] = useState([]);
  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);
  const [periodosEscolares, setPeriodosEscolares] = useState([]);
  const [tiposAlimentacao, setTiposAlimentacao] = useState([]);

  const [buscandoOpcoes, setBuscandoOpcoes] = useState({
    buscandoMesesAnos: false,
    buscandoDiretoriasRegionais: false,
    buscandoLotes: false,
    buscandoUnidadesEducacionais: false,
    buscandoPeriodosEscolares: false,
    buscandoTiposAlimentacao: false,
  });

  useEffect(() => {
    setBuscandoOpcoes({
      buscandoMesesAnos: true,
      buscandoDiretoriasRegionais: true,
      buscandoLotes: true,
      buscandoUnidadesEducacionais: true,
      buscandoPeriodosEscolares: true,
      buscandoTiposAlimentacao: true,
    });

    Promise.all([
      getMesesAnosSolicitacoesMedicaoinicial({
        status: "MEDICAO_APROVADA_PELA_CODAE",
      }),
      getDiretoriaregionalSimplissima(),
      getLotesSimples(),
      getEscolasParaFiltros(),
      buscaPeriodosEscolares(),
      getTiposDeAlimentacao(),
    ]).then(
      ([
        responseMesesAnos,
        responseDRE,
        responseLotes,
        responseEscolas,
        responsePeriodos,
        responseAlimentacoes,
      ]) => {
        setMesesAnosOpcoes(
          formataMesesAnosOpcoes(responseMesesAnos.data.results)
        );

        setDiretoriasRegionaisOpcoes(
          formataDiretoriasRegionaisOpcoes(responseDRE.data.results)
        );

        const lotes = responseLotes.data.results;
        setLotes(lotes);
        setLotesOpcoes(formatarOpcoesLote(lotes));

        let escolas = responseEscolas.results;
        setUnidadesEducacionais(escolas);
        setUnidadesEducacionaisOpcoes(
          formataUnidadesEducacionaisOpcoes(escolas)
        );

        const periodos = formataPeriodosEscolaresOpcoes(
          responsePeriodos.data.results
        );
        setPeriodosEscolares(periodos);
        setPeriodosEscolaresOpcoes(periodos);

        const tipos = formataTiposAlimentacoesOpcoes(
          responseAlimentacoes.results
        );
        setTiposAlimentacao(tipos);
        setTiposAlimentacaoOpcoes(tipos);

        form.subscribe(
          (values) => {
            if (!values.dirty) {
              setLotesOpcoes(formatarOpcoesLote(lotes));
              setUnidadesEducacionaisOpcoes(
                formataUnidadesEducacionaisOpcoes(escolas)
              );
              setPeriodosEscolaresOpcoes(periodos);
              setTiposAlimentacaoOpcoes(tipos);
            }
          },
          { dirty: true }
        );

        setBuscandoOpcoes({
          buscandoMesesAnos: false,
          buscandoDiretoriasRegionais: false,
          buscandoLotes: false,
          buscandoUnidadesEducacionais: false,
          buscandoPeriodosEscolares: false,
          buscandoTiposAlimentacao: false,
        });
      }
    );
  }, []);

  const formataMesesAnosOpcoes = (mesesAnos) => {
    return [{ nome: "Selecione o mês de referência", uuid: "" }].concat(
      mesesAnos.map((mesAno) => ({
        nome: `${MESES[parseInt(mesAno.mes) - 1]} - ${mesAno.ano}`,
        uuid: `${mesAno.mes}_${mesAno.ano}`,
      }))
    );
  };

  const formataDiretoriasRegionaisOpcoes = (dres) => {
    return [{ nome: "Selecione uma DRE", uuid: "" }].concat(dres);
  };

  const formataPeriodosEscolaresOpcoes = (periodos) => {
    return periodos.map((periodo) => ({
      label: periodo.nome,
      value: periodo.uuid,
    }));
  };

  const formataTiposAlimentacoesOpcoes = (tipos) => {
    return tipos.map((alimentacao) => ({
      label: alimentacao.nome,
      value: alimentacao.uuid,
    }));
  };

  const onChangeDRE = (e: ChangeEvent<HTMLInputElement>) => {
    limpaCampos(["lotes", "unidade_educacional"]);

    const dreUUID = e.target.value;

    if (!dreUUID) {
      setLotesOpcoes(formatarOpcoesLote(lotes));
      setUnidadesEducacionaisOpcoes(
        formataUnidadesEducacionaisOpcoes(unidadesEducacionais)
      );

      return;
    }

    setLotesOpcoes(
      formatarOpcoesLote(
        lotes.filter((lote) => lote.diretoria_regional.uuid === dreUUID)
      )
    );
    setUnidadesEducacionaisOpcoes(
      formataUnidadesEducacionaisOpcoes(
        unidadesEducacionais.filter(
          (escola) => escola.diretoria_regional.uuid === dreUUID
        )
      )
    );
  };

  const onChangeLotes = (lotes: Array<string>) => {
    limpaCampo("unidade_educacional");

    let escolas = unidadesEducacionais;

    const dreUUID = form.getState().values.dre;
    if (dreUUID) {
      escolas = escolas.filter(
        (escola) => escola.diretoria_regional.uuid === dreUUID
      );
    }

    if (lotes.length === 0) {
      setUnidadesEducacionaisOpcoes(formataUnidadesEducacionaisOpcoes(escolas));
    } else {
      setUnidadesEducacionaisOpcoes(
        formataUnidadesEducacionaisOpcoes(
          escolas.filter(
            (escola) => escola.lote && lotes.includes(escola.lote.uuid)
          )
        )
      );
    }
  };

  const onChangeUnidadeEducacional = (escolaLabel: string) => {
    limpaCampos(["periodos", "tipo_alimentacao"]);

    if (!escolaLabel) {
      setPeriodosEscolaresOpcoes(periodosEscolares);
      setTiposAlimentacaoOpcoes(tiposAlimentacao);
      return;
    }

    const escola = unidadesEducacionais.find((escola) =>
      escolaLabel.includes(escola.codigo_eol)
    );

    if (escola) {
      setPeriodosEscolaresOpcoes(
        periodosEscolares.filter((periodo) =>
          escola.periodos_escolares.some((p) => p.uuid === periodo.value)
        )
      );

      setTiposAlimentacaoOpcoes(
        tiposAlimentacao.filter((alimentacao) =>
          escola.tipos_alimentacao.some((t) => t.uuid === alimentacao.value)
        )
      );
    }
  };

  const formataUnidadesEducacionaisOpcoes = (escolas): Array<Option> => {
    return [{ label: "Selecione uma Unidade Educacional", value: "" }].concat(
      escolas.map((escola): Option => {
        const label = `${escola.codigo_eol} - ${escola.nome} - ${
          escola.lote ? escola.lote.nome : ""
        }`;

        return { label, value: label };
      })
    );
  };

  const filtraUnidadesEducacionaisOpcoes = (
    inputValue: string,
    option: Option
  ) => {
    return (
      option.value &&
      option.label.toUpperCase().includes(inputValue.toUpperCase())
    );
  };

  const validaMesAno = (mesAno: string) => {
    if (!mesAno) return;

    const hoje = new Date();
    let [mesSelecionado, anoSelecionado] = mesAno.split("_");

    return new Date(Number(anoSelecionado), Number(mesSelecionado) - 1, 1) >
      hoje
      ? "Não é possível exportar o relatório com mês posterior ao atual"
      : "";
  };

  const limpaCampo = (nomeCampo: string) => {
    form.resetFieldState(nomeCampo);
    form.change(nomeCampo, undefined);
  };

  const limpaCampos = (nomeCampos: Array<string>) => {
    nomeCampos.forEach((nomeCampo) => limpaCampo(nomeCampo));
  };

  return {
    mesesAnosOpcoes,
    diretoriasRegionaisOpcoes,
    lotesOpcoes,
    unidadesEducacionaisOpcoes,
    periodosEscolaresOpcoes,
    tiposAlimentacaoOpcoes,
    onChangeDRE,
    onChangeLotes,
    onChangeUnidadeEducacional,
    filtraUnidadesEducacionaisOpcoes,
    buscandoOpcoes,
    validaMesAno,
  };
};
