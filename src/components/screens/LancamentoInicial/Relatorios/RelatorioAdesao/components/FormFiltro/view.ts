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

import {
  Args,
  SelectOption,
  MultiSelectOption,
  EscolasSimplissimaParams,
  Option,
} from "./types";

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

  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);

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

    buscaPeriodosEscolares().then((response) => {
      setPeriodosEscolaresOpcoes(
        response.data.results.map((periodo) => ({
          label: periodo.nome,
          value: periodo.uuid,
        }))
      );
      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoPeriodosEscolares: false,
      }));
    });

    getTiposDeAlimentacao().then((data) => {
      setTiposAlimentacaoOpcoes(
        data.results.map((alimentacao) => ({
          label: alimentacao.nome,
          value: alimentacao.uuid,
        }))
      );
      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoTiposAlimentacao: false,
      }));
    });
  }, []);

  const onChangeDRE = (e: ChangeEvent<HTMLInputElement>) => {
    form.resetFieldState("lotes");

    if (!e.target.value) {
      form.resetFieldState("unidade_educacional");
      return;
    }

    setBuscandoOpcoes((prev) => ({
      ...prev,
      buscandoLotes: true,
    }));

    getLotesSimples({ diretoria_regional__uuid: e.target.value }).then(
      (response) => {
        setLotesOpcoes(formatarOpcoesLote(response.data.results));
        setBuscandoOpcoes((prev) => ({
          ...prev,
          buscandoLotes: false,
        }));
      }
    );

    buscaUnidadesEducacionais();
  };

  const onChangeLotes = (lotes: Array<string>) => {
    if (!buscandoOpcoes.buscandoUnidadesEducacionais)
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

      setTiposAlimentacaoOpcoes((prev) => {
        return prev.filter((alimentacao) =>
          escola.periodos_escolares.some((p) =>
            p.tipos_alimentacao.some((t) => t.uuid === alimentacao.value)
          )
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
    if (buscandoOpcoes.buscandoUnidadesEducacionais) return;

    setBuscandoOpcoes((prev) => ({
      ...prev,
      buscandoUnidadesEducacionais: true,
    }));

    const params: EscolasSimplissimaParams = {};

    const values = form.getState().values;
    if (values.dre) params.diretoria_regional__uuid = values.dre;
    if (values.lotes && values.lotes.length > 0)
      params.lote__uuid = values.lotes;

    getEscolasParaFiltros(params).then((response) => {
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

      setBuscandoOpcoes((prev) => ({
        ...prev,
        buscandoUnidadesEducacionais: false,
      }));
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
  };
};
