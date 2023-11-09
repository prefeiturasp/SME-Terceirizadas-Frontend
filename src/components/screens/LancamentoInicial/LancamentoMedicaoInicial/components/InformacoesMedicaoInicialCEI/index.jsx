import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HTTP_STATUS from "http-status-codes";
import { getYear, format } from "date-fns";
import { Collapse, Input, Checkbox, Modal } from "antd";
import Botao from "components/Shareable/Botao";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { DETALHAMENTO_DO_LANCAMENTO } from "configs/constants";
import {
  getTiposDeContagemAlimentacao,
  setSolicitacaoMedicaoInicial,
  updateSolicitacaoMedicaoInicial,
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { getAlunosListagem } from "services/perfil.service";
import TabelaAlunosParciais from "./TabelaAlunosParciais";
import { ehEscolaTipoCEMEI } from "../../../../../../helpers/utilities";
import StatefulMultiSelect from "@khanacademy/react-multi-select";

export default ({
  periodoSelecionado,
  escolaInstituicao,
  nomeTerceirizada,
  solicitacaoMedicaoInicial,
  onClickInfoBasicas,
}) => {
  const [responsaveis, setResponsaveis] = useState([
    {
      nome: "",
      rf: "",
    },
    {
      nome: "",
      rf: "",
    },
    {
      nome: "",
      rf: "",
    },
  ]);
  const [uePossuiAlunosPeriodoParcial, setUePossuiAlunosPeriodoParcial] =
    useState(undefined);
  const [emEdicao, setEmEdicao] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPesquisaAluno, setShowPesquisaAluno] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [isModalDuplicata, setIsModalDuplicata] = useState(false);
  const [isModalNaoParcial, setIsModalNaoParcial] = useState(false);
  const [alunosAdicionados, setAlunosAdicionados] = useState([]);
  const [tiposDeContagem, setTiposDeContagem] = useState([]);
  const [tipoDeContagemSelecionada, setTipoDeContagemSelecionada] = useState(
    []
  );

  const { Panel } = Collapse;

  const location = useLocation();

  const getAlunos = async () => {
    const response = await getAlunosListagem({
      escola: escolaInstituicao.uuid,
    });
    if (response.status === HTTP_STATUS.OK) {
      setAlunos(response.data.results);
      setLoading(false);
    } else {
      toastError("Houve um erro ao buscar alunos desta escola");
    }
  };

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
        solicitacaoMedicaoInicial.tipos_contagem_alimentacao.map((t) => t.uuid)
      );
      solicitacaoMedicaoInicial?.ue_possui_alunos_periodo_parcial
        ? (setUePossuiAlunosPeriodoParcial("true"),
          setShowPesquisaAluno(true),
          setLoading(true),
          getAlunos(),
          setAlunosAdicionados(
            solicitacaoMedicaoInicial.alunos_periodo_parcial
          ))
        : setUePossuiAlunosPeriodoParcial("false");
    } else {
      setEmEdicao(true);
    }
    setIsOpen(true);
  }, []);

  useEffect(() => {
    getDefaultValueSelectTipoContagem();
  }, []);

  const setaResponsavel = (input, event, indice) => {
    let responsavel = responsaveis;
    responsavel[indice][input] = event;
    setResponsaveis(responsaveis);
  };

  const verificarInput = (event, responsavel) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
    setaResponsavel("rf", event.target.value, responsavel);
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
              onChange={(event) =>
                setaResponsavel("nome", event.target.value, responsavel)
              }
              disabled={!emEdicao}
            />
          </div>
          <div className="col-4 pr-0">
            <Input
              maxLength={7}
              className="mt-2"
              name={`responsavel_rf_${responsavel}`}
              onKeyPress={(event) => verificarInput(event, responsavel)}
              onChange={(event) => verificarInput(event, responsavel)}
              defaultValue={responsaveis[responsavel]["rf"]}
              disabled={!emEdicao}
            />
          </div>
        </div>
      );
    }

    return component;
  };

  const handleClickEditar = () => {
    setEmEdicao(true);
    !solicitacaoMedicaoInicial &&
      opcoesContagem.length > 0 &&
      setTipoDeContagemSelecionada([tiposDeContagem[0].uuid]);
  };

  const handleClickSalvar = async () => {
    if (!uePossuiAlunosPeriodoParcial) {
      toastError("Obrigatório preencher se UE possui aluno no período Parcial");
      return;
    }
    if (
      uePossuiAlunosPeriodoParcial === "true" &&
      alunosAdicionados.length < 1
    ) {
      toastError("Obrigatório adicionar alunos pariciais");
      return;
    }
    if (!responsaveis.some((resp) => resp.nome !== "" && resp.rf !== "")) {
      toastError("Pelo menos um responsável deve ser cadastrado");
      return;
    }
    if (
      responsaveis.some(
        (resp) =>
          (resp.nome !== "" && resp.rf === "") ||
          (resp.nome === "" && resp.rf !== "")
      )
    ) {
      toastError("Responsável com dados incompletos");
      return;
    }
    const responsaveisPayload = responsaveis.filter(
      (resp) => resp.nome !== "" && resp.rf !== ""
    );
    if (responsaveisPayload.some((resp) => resp.rf.length !== 7)) {
      toastError("O campo de RF deve conter 7 números");
      return;
    }
    if (solicitacaoMedicaoInicial) {
      let data = new FormData();
      data.append("escola", String(escolaInstituicao.uuid));
      data.append("responsaveis", JSON.stringify(responsaveisPayload));
      data.append(
        "ue_possui_alunos_periodo_parcial",
        uePossuiAlunosPeriodoParcial === "true"
      );
      if (Array.isArray(alunosAdicionados) && alunosAdicionados.length > 0) {
        const uuidsDosAlunos = alunosAdicionados.map((aluno) => aluno.uuid);
        data.append("alunos_periodo_parcial", JSON.stringify(uuidsDosAlunos));
      }
      const response = await updateSolicitacaoMedicaoInicial(
        solicitacaoMedicaoInicial.uuid,
        data
      );
      if (response.status === HTTP_STATUS.OK) {
        if (
          responsaveisPayload.length ===
          solicitacaoMedicaoInicial.responsaveis.length
        ) {
          let toast = false;
          for (let i = 0; i < responsaveisPayload.length; i++) {
            if (
              JSON.stringify(responsaveisPayload[i]) !==
                JSON.stringify(solicitacaoMedicaoInicial.responsaveis[i]) &&
              !toast
            ) {
              toastSuccess("Responsável atualizado com sucesso");
              toast = true;
            }
          }
          !toast && toastSuccess("Informações atualizadas com sucesso");
        } else if (
          responsaveisPayload.length >
          solicitacaoMedicaoInicial.responsaveis.length
        ) {
          toastSuccess("Responsável adicionado com sucesso");
        } else if (
          responsaveisPayload.length <
          solicitacaoMedicaoInicial.responsaveis.length
        ) {
          toastSuccess("Responsável excluído com sucesso");
        }
      } else {
        toastError("Não foi possível salvar as alterações!");
      }
    } else {
      const payload = {
        escola: escolaInstituicao.uuid,
        tipos_contagem_alimentacao: tipoDeContagemSelecionada,
        responsaveis: responsaveisPayload,
        ue_possui_alunos_periodo_parcial:
          uePossuiAlunosPeriodoParcial === "true",
        mes: format(new Date(periodoSelecionado), "MM").toString(),
        ano: getYear(new Date(periodoSelecionado)).toString(),
      };
      if (alunosAdicionados && alunosAdicionados.length > 0) {
        const uuidsDosAlunos = alunosAdicionados.map((aluno) => ({
          aluno: aluno.uuid,
        }));
        payload.alunos_periodo_parcial = uuidsDosAlunos;
      }
      const response = await setSolicitacaoMedicaoInicial(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Medição Inicial criada com sucesso");
      } else {
        const errorMessage = Object.values(response.data).join("; ");
        toastError(`Erro: ${errorMessage}`);
      }
    }
    setEmEdicao(false);
    onClickInfoBasicas();
  };

  const options = [
    { label: "Sim", value: "true" },
    { label: "Não", value: "false" },
  ];

  const onChange = (e) => {
    setUePossuiAlunosPeriodoParcial(e.target.value);
    if (alunosAdicionados?.length > 0) {
      if (e.target.value === "false") {
        setIsModalNaoParcial(true);
      }
    } else {
      let simCheck = e.target.value === "true";
      if (simCheck && alunos.length === 0) {
        setLoading(true);
        getAlunos();
      }
      setShowPesquisaAluno(simCheck);
    }
  };

  const handleModalClose = () => {
    setIsModalDuplicata(false);
  };

  const handleModalNaoParcialClose = () => {
    setIsModalNaoParcial(false);
  };

  const handleModalNaoParcialDelete = () => {
    setShowPesquisaAluno(false);
    setAlunosAdicionados([]);
    setIsModalNaoParcial(false);
  };

  const opcoesContagem = tiposDeContagem
    ? tiposDeContagem.map((tipo) => {
        return { value: tipo.uuid, label: tipo.nome };
      })
    : [];

  const handleChangeTipoContagem = (values) => {
    setTipoDeContagemSelecionada(values);
  };

  const getDefaultValueSelectTipoContagem = () => {
    if (solicitacaoMedicaoInicial)
      return solicitacaoMedicaoInicial.tipos_contagem_alimentacao.map(
        (t) => t.nome
      );
    if (opcoesContagem.length) return tiposDeContagem[0].nome;
  };

  return (
    <div className="row mt-4 info-med-inicial collapse-adjustments">
      <div className="col-12 panel-med-inicial">
        <div className="pl-0 label-adjustments">
          <Modal
            title="Erro ao adicionar"
            open={isModalDuplicata}
            onCancel={handleModalClose}
            footer={[
              <Botao
                key="ok"
                texto="Ok"
                type={BUTTON_TYPE.BUTTON}
                onClick={handleModalClose}
              />,
            ]}
          >
            <p>Não é possível adicionar o mesmo aluno mais de uma vez.</p>
          </Modal>
          <Modal
            title="Fechar Perído Parcial"
            open={isModalNaoParcial}
            onCancel={handleModalClose}
            footer={[
              <>
                <Botao
                  key="sim"
                  texto="SIM"
                  type={BUTTON_TYPE.BUTTON}
                  onClick={handleModalNaoParcialDelete}
                  className="ml-3"
                />
                <Botao
                  key="nao"
                  texto="NÃO"
                  type={BUTTON_TYPE.BUTTON}
                  onClick={handleModalNaoParcialClose}
                  className="ml-3"
                />
              </>,
            ]}
          >
            <p>Atenção! Você deseja excluir o período parcial?</p>
          </Modal>
          <Collapse
            expandIconPosition="end"
            activeKey={isOpen ? ["1"] : []}
            onChange={() => setIsOpen(!isOpen)}
          >
            <Panel header="Informações Básicas da Medição Inicial" key="1">
              <div className="row">
                {ehEscolaTipoCEMEI(escolaInstituicao) && (
                  <div className="col-5 info-label select-medicao-inicial">
                    <b className="mb-2">
                      Método de Contagem das Alimentações Servidas
                    </b>
                    {opcoesContagem.length > 0 && (
                      <StatefulMultiSelect
                        name="contagem_refeicoes"
                        selected={tipoDeContagemSelecionada}
                        options={opcoesContagem || []}
                        onSelectedChanged={(values) =>
                          handleChangeTipoContagem(values)
                        }
                        hasSelectAll={false}
                        overrideStrings={{
                          selectSomeItems: "Selecione os métodos de contagem",
                          allItemsAreSelected: "Todos os métodos selecionados",
                        }}
                        disabled={!emEdicao}
                      />
                    )}
                  </div>
                )}

                <div className="col-7 info-label">
                  <label className="mt-2 mb-2">
                    Nome da Empresa Responsável pelo Atendimento
                  </label>
                  <p className="value-label">{nomeTerceirizada}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-7 info-label">
                  <label className="asterisk-label">*</label>
                  <label className="value-label mt-2 mb-2 mr-3">
                    A UE possui alunos no período parcial?
                  </label>
                  {options.map((option) => (
                    <Checkbox
                      key={option.value}
                      value={option.value}
                      checked={uePossuiAlunosPeriodoParcial === option.value}
                      onChange={onChange}
                      disabled={!emEdicao}
                    >
                      {option.label}
                    </Checkbox>
                  ))}
                </div>
              </div>
              {showPesquisaAluno && (
                <TabelaAlunosParciais
                  setIsModalDuplicata={setIsModalDuplicata}
                  alunos={alunos}
                  loading={loading}
                  alunosAdicionados={alunosAdicionados}
                  setAlunosAdicionados={setAlunosAdicionados}
                  emEdicao={emEdicao}
                />
              )}

              <div className="row mt-4 mr-0">
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
                {(!location.state ||
                  location.state.status !== "Aprovado pela DRE") &&
                  !location.pathname.includes(DETALHAMENTO_DO_LANCAMENTO) && (
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
                  )}
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};
