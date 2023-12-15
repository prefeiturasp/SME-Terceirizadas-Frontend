import React, { useMemo, useState } from "react";
import { Input, Skeleton, AutoComplete, Table, Modal, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./styles.scss";

export default ({
  setIsModalDuplicata,
  alunos,
  loading,
  alunosAdicionados,
  setAlunosAdicionados,
  emEdicao,
}) => {
  const [valorSelecionado, setValorSelecionado] = useState(null);
  const [isModalExcluir, setIsModalExcluir] = useState(false);
  const [registroCodigoEol, setRegistroCodigoEol] = useState(false);
  const [erro, setErro] = useState(null);

  const alunosOptions = useMemo(
    () =>
      alunos
        ?.sort((a, b) => a.nome.localeCompare(b.nome))
        .map((aluno) => ({
          value: `${aluno.codigo_eol} - ${aluno.nome}`,
        })) || [],
    [alunos]
  );
  const filterAlunos = (inputValue, option) =>
    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  const adicionarAluno = (aluno) => {
    const alunoExiste = alunosAdicionados.some(
      (a) => a.codigo_eol === aluno.codigo_eol
    );

    if (alunoExiste) {
      setIsModalDuplicata(true);
    } else {
      setAlunosAdicionados((prev) => [...prev, aluno]);
    }
    setValorSelecionado("");
  };

  const excluirAluno = (codigo_eol) => {
    setAlunosAdicionados((prev) =>
      prev.filter((aluno) => aluno.codigo_eol !== codigo_eol)
    );
    setIsModalExcluir(false);
  };

  const TabelaAlunos = ({ alunos }) => {
    const colunas = [
      {
        title: "Alunos em Período Parcial",
        dataIndex: "nome",
        key: "nome",
      },
      {
        title: "Excluir",
        key: "acoes",
        width: 100,
        align: "center",
        render: (texto, registro) => (
          <Tooltip title="Excluir aluno">
            <>
              <Botao
                onClick={() => {
                  setIsModalExcluir(true);
                  setRegistroCodigoEol(registro.key);
                }}
                icon={BUTTON_ICON.TRASH}
                disabled={!emEdicao}
              />
            </>
          </Tooltip>
        ),
      },
    ];

    const dataSource = alunos.map((aluno) => ({
      key: aluno.codigo_eol,
      nome: `${aluno.codigo_eol} - ${aluno.nome}`,
    }));

    const contador = `Total: ${dataSource.length.toString().padStart(2, "0")}`;

    return (
      <div
        className={`tabela-alunos-parciais ${
          !emEdicao ? "table-disabled" : ""
        }`}
      >
        <Table
          dataSource={dataSource}
          columns={colunas}
          pagination={false}
          footer={() => contador}
          locale={{ emptyText: () => null }}
        />
      </div>
    );
  };

  const handleModalExcluirClose = () => {
    setIsModalExcluir(false);
  };

  return loading ? (
    <Skeleton paragraph={false} active />
  ) : (
    <div className="row">
      <Modal
        title="Excluir aluno"
        open={isModalExcluir}
        onCancel={handleModalExcluirClose}
        footer={[
          <>
            <Botao
              key="sim"
              texto="SIM"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => excluirAluno(registroCodigoEol)}
              className="ms-3"
            />
            <Botao
              key="nao"
              texto="NÃO"
              type={BUTTON_TYPE.BUTTON}
              onClick={handleModalExcluirClose}
              className="ms-3"
            />
          </>,
        ]}
      >
        <p>
          Deseja realmente excluir esse aluno do lançamento do período parcial?
        </p>
      </Modal>
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
            className={erro ? "input-error" : ""}
            options={alunosOptions.map((option) => ({
              value: option.value,
            }))}
            value={valorSelecionado}
            style={{ width: 400 }}
            filterOption={filterAlunos}
            onChange={(value) => {
              if (valorSelecionado !== value) {
                setValorSelecionado(value);
              }
            }}
            disabled={!emEdicao}
          >
            <Input
              placeholder="Digite o código EOL ou nome"
              suffix={
                <SearchOutlined
                  style={{
                    cursor: "pointer",
                    transform: "rotateX(180deg)",
                  }}
                />
              }
              status={erro ? "error" : ""}
            />
          </AutoComplete>
          <Botao
            texto="Adicionar"
            style={BUTTON_STYLE.GREEN}
            className="ms-2"
            onClick={() => {
              const alunoSelecionado = alunos.find(
                (aluno) =>
                  `${aluno.codigo_eol} - ${aluno.nome}` === valorSelecionado
              );
              if (alunoSelecionado) {
                adicionarAluno(alunoSelecionado);
                setErro(null);
              } else {
                setErro("Selecione uma opção válida");
              }
            }}
          />
        </div>
        {erro && <span style={{ color: "red" }}>{erro}</span>}
      </div>
      <TabelaAlunos alunos={alunosAdicionados} />
    </div>
  );
};
