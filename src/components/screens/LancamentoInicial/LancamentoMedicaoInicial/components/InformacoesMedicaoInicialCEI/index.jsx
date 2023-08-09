import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HTTP_STATUS from "http-status-codes";
import { getYear, format } from "date-fns";
import { Collapse, Input, Checkbox, Skeleton, AutoComplete, Table } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import Botao from "components/Shareable/Botao";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  BUTTON_ICON,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { DETALHAMENTO_DO_LANCAMENTO } from "configs/constants";
import {
  setSolicitacaoMedicaoInicial,
  updateSolicitacaoMedicaoInicial
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { getAlunosListagem } from "services/perfil.service";

export default ({
  periodoSelecionado,
  escolaInstituicao,
  nomeTerceirizada,
  solicitacaoMedicaoInicial,
  onClickInfoBasicas
}) => {
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
  const [
    uePossuiAlunosPeriodoParcial,
    setUePossuiAlunosPeriodoParcial
  ] = useState(undefined);
  const [emEdicao, setEmEdicao] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPesquisaAluno, setShowPesquisaAluno] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [alunosAdicionados, setAlunosAdicionados] = useState([]);
  const [valorSelecionado, setValorSelecionado] = useState("");

  const { Panel } = Collapse;

  const location = useLocation();

  const getAlunos = async () => {
    const response = await getAlunosListagem({
      escola: escolaInstituicao.uuid
    });
    if (response.status === HTTP_STATUS.OK) {
      console.log("response.data", response.data);
      setAlunos(response.data.results);
      setLoading(false);
    } else {
      toastError("Houve um erro ao buscar alunos desta escola");
    }
  };

  // const { Option } = Select;

  // const opcoesAlunos = alunos?.map(aluno => {
  //     return <Option key={aluno.codigo_eol}>{`${aluno.codigo_eol} - ${aluno.nome}`}</Option>;
  //   }) || [];

  useEffect(() => {
    if (solicitacaoMedicaoInicial) {
      const resps = responsaveis.map((resp, indice) => {
        return solicitacaoMedicaoInicial.responsaveis[indice] || resp;
      });
      setResponsaveis(resps);
      solicitacaoMedicaoInicial?.ue_possui_alunos_periodo_parcial
        ? (setUePossuiAlunosPeriodoParcial("true"),
          setShowPesquisaAluno(true),
          setLoading(true),
          getAlunos())
        : setUePossuiAlunosPeriodoParcial("false");
    }
    setIsOpen(true);
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
              onChange={event =>
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
              onKeyPress={event => verificarInput(event, responsavel)}
              onChange={event => verificarInput(event, responsavel)}
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
  };

  const handleClickSalvar = async () => {
    if (!uePossuiAlunosPeriodoParcial) {
      toastError("Obrigatório preencher se UE possui aluno no período Parcial");
      return;
    }
    if (!responsaveis.some(resp => resp.nome !== "" && resp.rf !== "")) {
      toastError("Pelo menos um responsável deve ser cadastrado");
      return;
    }
    if (
      responsaveis.some(
        resp =>
          (resp.nome !== "" && resp.rf === "") ||
          (resp.nome === "" && resp.rf !== "")
      )
    ) {
      toastError("Responsável com dados incompletos");
      return;
    }
    const responsaveisPayload = responsaveis.filter(
      resp => resp.nome !== "" && resp.rf !== ""
    );
    if (responsaveisPayload.some(resp => resp.rf.length !== 7)) {
      toastError("O campo de RF deve conter 7 números");
      return;
    }
    if (solicitacaoMedicaoInicial) {
      let data = new FormData();
      data.append("escola", String(escolaInstituicao.uuid));
      data.append("responsaveis", JSON.stringify(responsaveisPayload));
      data.append(
        "ue_possui_alunos_periodo_parcial",
        uePossuiAlunosPeriodoParcial === "true" ? true : false
      );
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
        responsaveis: responsaveisPayload,
        ue_possui_alunos_periodo_parcial:
          uePossuiAlunosPeriodoParcial === "true" ? true : false,
        mes: format(new Date(periodoSelecionado), "MM").toString(),
        ano: getYear(new Date(periodoSelecionado)).toString()
      };
      const response = await setSolicitacaoMedicaoInicial(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Informações salvas com sucesso");
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
    { label: "Não", value: "false" }
  ];

  const onChange = e => {
    setUePossuiAlunosPeriodoParcial(e.target.value);
    setShowPesquisaAluno(e.target.value === "true");
  };

  const PesquisaAluno = ({ show }) => {
    if (!show) return null;

    const alunosOptions =
      alunos?.map(aluno => ({
        value: `${aluno.codigo_eol} - ${aluno.nome}`
      })) || [];

    const filterAlunos = (inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

    return loading ? (
      <Skeleton paragraph={false} active />
    ) : (
      <div className="row">
        <div className="col-6 info-label">
          <label className="asterisk-label">*</label>
          <label className="value-label mt-3 mb-2 mr-3">
            Pesquise o Código EOL ou o Nome do Aluno
          </label>
          <div
            className="input-icon-right"
            style={{ display: "flex", alignItems: "center" }}
          >
            <AutoComplete
              options={alunosOptions.map(option => ({
                value: option.value
              }))}
              style={{ width: 400 }}
              filterOption={filterAlunos}
              onChange={setValorSelecionado}
            >
              <Input
                placeholder="Digite o código EOL ou nome"
                suffix={
                  <SearchOutlined
                    style={{
                      cursor: "pointer",
                      transform: "rotateX(180deg)"
                    }}
                  />
                }
              />
            </AutoComplete>
            <Botao
              texto="Adicionar"
              style={BUTTON_STYLE.GREEN}
              className="ml-2"
              onClick={() => {
                const alunoSelecionado = alunos.find(
                  aluno =>
                    `${aluno.codigo_eol} - ${aluno.nome}` === valorSelecionado
                );
                if (alunoSelecionado) {
                  adicionarAluno(alunoSelecionado);
                }
              }}
            />
          </div>
        </div>
        <TabelaAlunos alunos={alunosAdicionados} onExcluir={excluirAluno} />
      </div>
    );
  };

  const adicionarAluno = aluno => {
    setAlunosAdicionados(prev => [...prev, aluno]);
  };

  const excluirAluno = codigo_eol => {
    setAlunosAdicionados(prev =>
      prev.filter(aluno => aluno.codigo_eol !== codigo_eol)
    );
  };

  const TabelaAlunos = ({ alunos, onExcluir }) => {
    const colunas = [
      {
        title: "Alunos em Período Parcial",
        dataIndex: "nome",
        key: "nome"
      },
      {
        title: "",
        key: "acoes",
        render: (texto, registro) => (
          <Botao
            onClick={() => onExcluir(registro.key)}
            suffix={<DeleteOutlined type="delete" />}
          />
        )
      }
    ];

    const dataSource = alunos.map(aluno => ({
      key: aluno.codigo_eol,
      nome: aluno.nome
    }));

    return <Table dataSource={dataSource} columns={colunas} />;
  };

  return (
    <div className="row mt-4 info-med-inicial collapse-adjustments">
      <div className="col-12 panel-med-inicial">
        <div className="pl-0 label-adjustments">
          <Collapse
            expandIconPosition="end"
            activeKey={isOpen ? ["1"] : []}
            onChange={() => setIsOpen(!isOpen)}
          >
            <Panel header="Informações Básicas da Medição Inicial" key="1">
              <div className="row">
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
                  {options.map(option => (
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

              <PesquisaAluno show={showPesquisaAluno} />

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
