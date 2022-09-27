import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getYear, format } from "date-fns";
import { Collapse, Input, Select } from "antd";
import Botao from "components/Shareable/Botao";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  BUTTON_ICON,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import {
  getTiposDeContagemAlimentacao,
  setSolicitacaoMedicaoInicial,
  updateSolicitacaoMedicaoInicial
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export default ({
  periodoSelecionado,
  escolaInstituicao,
  nomeTerceirizada,
  solicitacaoMedicaoInicial,
  onClickInfoBasicas
}) => {
  const [tiposDeContagem, setTiposDeContagem] = useState([]);
  const [tipoDeContagemSelecionada, setTipoDeContagemSelecionada] = useState(
    null
  );
  const [responsaveis, setResponsaveis] = useState([
    {
      nome: "",
      rf: ""
    },
    {
      nome: "",
      rf: ""
    },
    {
      nome: "",
      rf: ""
    }
  ]);
  const [emEdicao, setEmEdicao] = useState(false);
  const { Option } = Select;
  const { Panel } = Collapse;

  useEffect(() => {
    async function fetch() {
      const response = await getTiposDeContagemAlimentacao();
      setTiposDeContagem(response.data);
    }
    fetch();

    if (solicitacaoMedicaoInicial) {
      const resps = responsaveis.map((resp, indice) => {
        return solicitacaoMedicaoInicial.responsaveis[indice] || resp;
      });
      setResponsaveis(resps);
      setTipoDeContagemSelecionada(
        solicitacaoMedicaoInicial.tipo_contagem_alimentacoes.uuid
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDefaultValueSelectTipoContagem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solicitacaoMedicaoInicial]);

  const opcoesContagem = tiposDeContagem
    ? tiposDeContagem.map(tipo => {
        return <Option key={tipo.uuid}>{tipo.nome}</Option>;
      })
    : [];

  const setaResponsavel = (input, event, indice) => {
    let responsavel = responsaveis;
    responsavel[indice][input] = event;
    setResponsaveis(responsaveis);
  };

  const renderDadosResponsaveis = () => {
    let component = [];
    for (let responsavel = 0; responsavel <= 2; responsavel++) {
      component.push(
        <div className="row col-12 pr-0 mt-2" key={responsavel}>
          <div className="col-8">
            <Input
              className="mt-2"
              name={`responsavel_nome_${responsavel}`}
              defaultValue={responsaveis[responsavel]["nome"]}
              onChange={event =>
                setaResponsavel("nome", event.target.value, responsavel)
              }
              disabled={!emEdicao}
            />
          </div>
          <div className="col-4 pr-0">
            <Input
              className="mt-2"
              name={`responsavel_rf_${responsavel}`}
              defaultValue={responsaveis[responsavel]["rf"]}
              onChange={event =>
                setaResponsavel("rf", event.target.value, responsavel)
              }
              disabled={!emEdicao}
            />
          </div>
        </div>
      );
    }

    return component;
  };

  const handleChangeTipoContagem = value => {
    setTipoDeContagemSelecionada(value);
  };

  const handleClickEditar = () => {
    setEmEdicao(true);
    !solicitacaoMedicaoInicial &&
      opcoesContagem.length > 0 &&
      setTipoDeContagemSelecionada(tiposDeContagem[0].uuid);
  };

  const handleClickSalvar = async () => {
    if (!responsaveis.some(resp => resp.nome !== "" && resp.rf !== "")) {
      toastError("Preencha no mínimo 1 responsável");
      return;
    }
    const responsaveisPayload = responsaveis.filter(
      resp => resp.nome !== "" && resp.rf !== ""
    );
    const payload = {
      escola: escolaInstituicao.uuid,
      tipo_contagem_alimentacoes: tipoDeContagemSelecionada,
      responsaveis: responsaveisPayload,
      mes: format(new Date(periodoSelecionado), "MM").toString(),
      ano: getYear(new Date(periodoSelecionado)).toString()
    };
    if (solicitacaoMedicaoInicial) {
      const response = await updateSolicitacaoMedicaoInicial(
        solicitacaoMedicaoInicial.uuid,
        payload
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Solicitação de Medição Inicial atualizada com sucesso!");
      } else {
        toastError("Não foi possível salvar as alterações!");
      }
    } else {
      const response = await setSolicitacaoMedicaoInicial(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Solicitação de Medição Inicial criada com sucesso!");
      } else {
        const errorMessage = Object.values(response.data).join("; ");
        toastError(`Erro: ${errorMessage}`);
      }
    }
    setEmEdicao(false);
    onClickInfoBasicas();
  };

  const getDefaultValueSelectTipoContagem = () => {
    if (solicitacaoMedicaoInicial)
      return solicitacaoMedicaoInicial.tipo_contagem_alimentacoes.nome;
    if (opcoesContagem.length) return tiposDeContagem[0].nome;
  };

  return (
    <div className="row mt-4 info-med-inicial collapse-adjustments">
      <div className="col-12 panel-med-inicial">
        <div className="pl-0 label-adjustments">
          <Collapse expandIconPosition="right">
            <Panel header="Informações Básicas da Medição Inicial">
              <div className="row">
                <div className="col-5 info-label select-medicao-inicial">
                  <b className="mb-2">
                    Método de Contagem das Alimentações Servidas
                  </b>
                  {opcoesContagem.length > 0 && (
                    <Select
                      suffixIcon={<CaretDownOutlined />}
                      name="contagem_refeicoes"
                      defaultValue={getDefaultValueSelectTipoContagem()}
                      onChange={value => handleChangeTipoContagem(value)}
                      className="mt-2"
                      disabled={!emEdicao}
                    >
                      {opcoesContagem}
                    </Select>
                  )}
                </div>
                <div className="col-7 info-label">
                  <label className="mt-2 mb-2">
                    Nome da Empresa Responsável pelo Atendimento
                  </label>
                  <p className="value-label">{nomeTerceirizada}</p>
                </div>
              </div>
              <div className="row mt-2 mr-0">
                <div className="col-8">
                  <label>
                    Responsáveis por acompanhar a prestação de serviços
                  </label>
                  <label className="asterisk-label">*</label>
                </div>
                <div className="col-4 pl-0">
                  <label>RF</label>
                  <label className="asterisk-label">*</label>
                </div>
                {renderDadosResponsaveis()}
                <div className="mt-3 pr-2">
                  <Botao
                    texto="Salvar"
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                    onClick={() => handleClickSalvar()}
                    disabled={!emEdicao}
                  />
                  <Botao
                    texto="Editar"
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    icon={BUTTON_ICON.PEN}
                    className="float-right ml-3"
                    onClick={() => handleClickEditar()}
                    disabled={emEdicao}
                  />
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};
