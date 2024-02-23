import { ChangeEvent, useEffect, useState } from "react";

import { formatarOpcoesLote } from "helpers/utilities";

import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getLotesSimples } from "services/lote.service";
import {
  getEscolasSimplissima,
  buscaPeriodosEscolares,
} from "services/escola.service";

import {
  Args,
  SelectOption,
  MultiSelectOption,
  EscolasSimplissimaParams,
  Option,
} from "./types";

export default ({ form }: Args) => {
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

  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);

  const [buscandoUnidadesEducacionais, setBuscandoUnidadesEducacionais] =
    useState<boolean>(false);

  useEffect(() => {
    getDiretoriaregionalSimplissima().then((response) => {
      setDiretoriasRegionaisOpcoes(
        [{ nome: "Selecione uma DRE", uuid: "" }].concat(response.data.results)
      );
    });

    buscaPeriodosEscolares().then((response) => {
      setPeriodosEscolaresOpcoes(
        response.data.results.map((periodo) => ({
          label: periodo.nome,
          value: periodo.uuid,
        }))
      );
    });
  }, []);

  const onChangeDRE = (e: ChangeEvent<HTMLInputElement>) => {
    form.resetFieldState("lotes");

    if (!e.target.value) {
      form.resetFieldState("unidade_educacional");
      return;
    }

    getLotesSimples({ diretoria_regional__uuid: e.target.value }).then(
      (response) => {
        setLotesOpcoes(formatarOpcoesLote(response.data.results));
      }
    );

    buscaUnidadesEducacionais();
  };

  const onChangeLotes = (lotes: Array<string>) => {
    if (!buscandoUnidadesEducacionais)
      setUnidadesEducacionaisOpcoes(
        formataUnidadesEducacionaisOpcoes(
          unidadesEducacionais.filter(
            (escola) => escola.lote && lotes.includes(escola.lote.uuid)
          )
        )
      );
  };

  const onChangeUnidadeEducacional = (escolaLabel: string) => {
    const escola = unidadesEducacionais.find((escola) =>
      escolaLabel.includes(escola.codigo_eol)
    );

    if (escola) {
      setPeriodosEscolaresOpcoes((prev) => {
        return prev.filter((periodo) =>
          escola.periodos_escolares.some((p) => p.uuid === periodo.value)
        );
      });
    }
  };

  const formataUnidadesEducacionaisOpcoes = (escolas): Array<Option> => {
    return escolas.map((escola): Option => {
      const label = `${escola.codigo_eol} - ${escola.nome} - ${
        escola.lote ? escola.lote.nome : ""
      }`;

      return { label, value: label };
    });
  };

  const buscaUnidadesEducacionais = () => {
    if (buscandoUnidadesEducacionais) return;

    setBuscandoUnidadesEducacionais(true);

    const params: EscolasSimplissimaParams = {};

    const values = form.getState().values;
    if (values.dre) params.diretoria_regional__uuid = values.dre;
    if (values.lotes && values.lotes.length > 0)
      params.lote__uuid = values.lotes;

    getEscolasSimplissima(params).then((response) => {
      let escolas = response.results;

      // caso os lotes sejam selecionados antes de receber a resposta da requisicao da DRE
      const lotes = form.getState().values.lotes;
      if (lotes && lotes.length > 0) {
        escolas = escolas.filter((escola) =>
          lotes.includes(escola.lote && escola.lote.uuid)
        );
      }

      setUnidadesEducacionais(escolas);

      setUnidadesEducacionaisOpcoes(
        [{ label: "Selecione uma Unidade Educacional", value: "" }].concat(
          formataUnidadesEducacionaisOpcoes(escolas)
        )
      );
      setBuscandoUnidadesEducacionais(false);
    });
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

  return {
    diretoriasRegionaisOpcoes,
    lotesOpcoes,
    unidadesEducacionaisOpcoes,
    onChangeDRE,
    onChangeLotes,
    onChangeUnidadeEducacional,
    filtraUnidadesEducacionaisOpcoes,
    periodosEscolaresOpcoes,
  };
};
