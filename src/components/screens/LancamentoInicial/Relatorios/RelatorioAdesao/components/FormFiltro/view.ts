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
    setBuscandoOpcoes((prev) => ({
      ...prev,
      buscandoMesesAnos: true,
      buscandoDiretoriasRegionais: true,
      buscandoLotes: true,
      buscandoUnidadesEducacionais: true,
      buscandoPeriodosEscolares: true,
      buscandoTiposAlimentacao: true,
    }));

    getMesesAnosSolicitacoesMedicaoinicial({
      status: "MEDICAO_APROVADA_PELA_CODAE",
    }).then((response) => {
      setMesesAnosOpcoes(
        [{ nome: "Selecione o mês de referência", uuid: "" }].concat(
          response.data.results.map((mesAno) => ({
            nome: `${MESES[parseInt(mesAno.mes) - 1]} - ${mesAno.ano}`,
            uuid: `${mesAno.mes}_${mesAno.ano}`,
          }))
        )
      );
      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoMesesAnos: false,
      }));
    });

    getDiretoriaregionalSimplissima().then((response) => {
      setDiretoriasRegionaisOpcoes(
        [{ nome: "Selecione uma DRE", uuid: "" }].concat(response.data.results)
      );
      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoDiretoriasRegionais: false,
      }));
    });

    getLotesSimples().then((response) => {
      const lotes = response.data.results;

      setLotes(lotes);
      setLotesOpcoes(formatarOpcoesLote(lotes));

      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoLotes: false,
      }));
    });

    getEscolasParaFiltros().then((response) => {
      let escolas = response.results;

      setUnidadesEducacionais(escolas);
      setUnidadesEducacionaisOpcoes(formataUnidadesEducacionaisOpcoes(escolas));

      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoUnidadesEducacionais: false,
      }));
    });

    buscaPeriodosEscolares().then((response) => {
      const periodos = response.data.results.map((periodo) => ({
        label: periodo.nome,
        value: periodo.uuid,
      }));

      setPeriodosEscolares(periodos);
      setPeriodosEscolaresOpcoes(periodos);

      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoPeriodosEscolares: false,
      }));
    });

    getTiposDeAlimentacao().then((data) => {
      const tipos = data.results.map((alimentacao) => ({
        label: alimentacao.nome,
        value: alimentacao.uuid,
      }));

      setTiposAlimentacao(tipos);
      setTiposAlimentacaoOpcoes(tipos);

      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoTiposAlimentacao: false,
      }));
    });
  }, []);

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
    if (lotes.length === 0) {
      setUnidadesEducacionaisOpcoes(
        formataUnidadesEducacionaisOpcoes(unidadesEducacionais)
      );
    } else if (!buscandoOpcoes.buscandoUnidadesEducacionais)
      setUnidadesEducacionaisOpcoes(
        formataUnidadesEducacionaisOpcoes(
          unidadesEducacionais.filter(
            (escola) => escola.lote && lotes.includes(escola.lote.uuid)
          )
        )
      );
  };

  const onChangeUnidadeEducacional = (escolaLabel: string) => {
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

    return hoje <= new Date(Number(anoSelecionado), Number(mesSelecionado), 0)
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
