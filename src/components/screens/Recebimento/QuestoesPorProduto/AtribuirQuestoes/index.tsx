import { Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

import { RECEBIMENTO, QUESTOES_POR_PRODUTO } from "configs/constants";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import { toastSuccess } from "components/Shareable/Toast/dialogs";
import { getListaFiltradaAutoCompleteSelect } from "helpers/autoCompleteSelect";
import { required } from "helpers/fieldValidators";
import { FichaTecnicaSimples } from "interfaces/pre_recebimento.interface";
import { QuestaoConferencia } from "interfaces/recebimento.interface";
import { formatarNumeroEProdutoFichaTecnica } from "helpers/preRecebimento";
import ModalGenerico, {
  ModalGenericoProps,
} from "components/Shareable/ModalGenerico";
import TransferMultiSelect from "components/Shareable/TransferMultiSelect";
import { TransferOptions } from "components/Shareable/TransferMultiSelect/interfaces";
import { useTransferMultiSelect } from "components/Shareable/TransferMultiSelect/useTransferMultiSelect";
import { getListaFichasTecnicasSimplesSemQuestoesConferencia } from "services/fichaTecnica.service";
import {
  listarQuestoesConferencia,
  atribuirQuestoesPorProduto,
} from "services/recebimento/questoesConferencia.service";

import "./styles.scss";

const labelsTransferPrimarias = [
  <>
    Questões para Atribuir a{" "}
    <span className="lable-destacado-verde">Embalagem Primária</span>
  </>,
  <>
    Questões Atribuídas a{" "}
    <span className="lable-destacado-verde">Embalagem Primária</span>
  </>,
];

const labelsTransferSecundarias = [
  <>
    Questões para Atribuir a{" "}
    <span className="lable-destacado-verde">Embalagem Secundária</span>
  </>,
  <>
    Questões Atribuídas a{" "}
    <span className="lable-destacado-verde">Embalagem Secundária</span>
  </>,
];

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [modalConfig, setModalConfig] = useState({} as ModalGenericoProps);
  const [fichasTecnicas, setFichasTecnicas] = useState<FichaTecnicaSimples[]>(
    []
  );

  const transferConfigPrimarias = useTransferMultiSelect({
    required: true,
  });

  const transferConfigSecundarias = useTransferMultiSelect({
    required: true,
  });

  const navigate = useNavigate();

  const exibirModalConfirmacao = async (values: Record<string, any>) =>
    setModalConfig({
      show: true,
      handleClose: fecharModal,
      handleSim: () => enviarParaAnalise(values),
      titulo: "Salvar Cadastro",
      texto:
        "Deseja salvar a atribuição das questões de conferência para esse produto?",
    });

  const exibirModalCancelar = () =>
    setModalConfig({
      show: true,
      handleClose: fecharModal,
      handleSim: voltarPagina,
      titulo: "Cancelar Cadastro",
      texto:
        "Deseja cancelar a atribuição das questões de conferência para esse produto?",
    });

  const fecharModal = () => setModalConfig({ ...modalConfig, show: false });

  const enviarParaAnalise = async (values: Record<string, any>) => {
    setCarregando(true);

    const payload = formatarPayload(
      values,
      transferConfigPrimarias.targetKeys,
      transferConfigSecundarias.targetKeys
    );

    try {
      const { status } = await atribuirQuestoesPorProduto(payload);

      if (status === 201) {
        voltarPagina();
        toastSuccess("Atribuição Salva com sucesso!");
      }
    } finally {
      setCarregando(false);
    }
  };

  const formatarPayload = (
    values: Record<string, any>,
    questoesPrimarias: string[],
    questoesSecundarias: string[]
  ) => {
    return {
      ficha_tecnica: fichasTecnicas.find(buscarFichaPeloNumero(values))?.uuid,
      questoes_primarias: questoesPrimarias,
      questoes_secundarias: questoesSecundarias,
    };
  };

  const buscarFichaPeloNumero =
    (values: Record<string, any>) =>
    ({ numero }) =>
      numero === values.ficha_tecnica.split("-")[0].trim();

  const voltarPagina = () =>
    navigate(`/${RECEBIMENTO}/${QUESTOES_POR_PRODUTO}`);

  const carregarDados = useCallback(async () => {
    setCarregando(true);

    try {
      const [responseFichasTecnicas, responseQuestoesConferencia] =
        await Promise.all([
          getListaFichasTecnicasSimplesSemQuestoesConferencia(),
          listarQuestoesConferencia(),
        ]);

      setFichasTecnicas(responseFichasTecnicas.data.results);

      transferConfigPrimarias.setDataSource(
        transferDataSource(responseQuestoesConferencia.data.results.primarias)
      );
      transferConfigSecundarias.setDataSource(
        transferDataSource(responseQuestoesConferencia.data.results.secundarias)
      );

      transferConfigPrimarias.setInitialTagetKeys(
        questoesObrigatorias(responseQuestoesConferencia.data.results.primarias)
      );
      transferConfigSecundarias.setInitialTagetKeys(
        questoesObrigatorias(
          responseQuestoesConferencia.data.results.secundarias
        )
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  const questoesObrigatorias = (questoes: QuestaoConferencia[]) =>
    questoes
      ?.filter(({ pergunta_obrigatoria }) => pergunta_obrigatoria)
      .map(({ uuid }) => uuid);

  const optionsFichasTecnicas = (values: Record<string, any>) =>
    getListaFiltradaAutoCompleteSelect(
      fichasTecnicas?.map((e) => formatarNumeroEProdutoFichaTecnica(e)),
      values.ficha_tecnica,
      true
    );

  const transferDataSource = (
    questoes: QuestaoConferencia[]
  ): TransferOptions[] =>
    questoes?.map(({ uuid, questao }) => {
      return { title: questao, key: uuid };
    });

  const botaoSalvar = (values: Record<string, any>) =>
    !values.ficha_tecnica ||
    !transferConfigPrimarias.targetKeys.length ||
    !transferConfigSecundarias.targetKeys.length;

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-atribuir-questoes-conferencia">
        <div className="card-body atribuir-questoes-conferencia">
          <Form
            onSubmit={exibirModalConfirmacao}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col">
                    <Field
                      component={AutoCompleteSelectField}
                      options={optionsFichasTecnicas(values)}
                      label="Ficha Técnica e Produto"
                      name={`ficha_tecnica`}
                      className="input-busca-produto"
                      placeholder="Selecione uma ficha técnica e produto"
                      required
                      validate={required}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <TransferMultiSelect
                      {...transferConfigPrimarias}
                      required
                      labels={labelsTransferPrimarias}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <TransferMultiSelect
                      {...transferConfigSecundarias}
                      required
                      labels={labelsTransferSecundarias}
                    />
                  </div>
                </div>

                <div className="row mt-5 mb-3">
                  <div className="col">
                    <Botao
                      texto="Salvar"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="float-end ms-3"
                      disabled={botaoSalvar(values)}
                      tooltipExterno={
                        botaoSalvar(values) &&
                        "É necessário preencher todos os campos obrigatórios antes de prosseguir."
                      }
                    />

                    <Botao
                      texto="Cancelar"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
                      onClick={exibirModalCancelar}
                    />
                  </div>
                </div>

                <ModalGenerico {...modalConfig} />
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
