import React from "react";

import "./styles.scss";
import { OPTIONS_STATUS } from "../../constants";
import { Tooltip } from "antd";
import { saveAs } from "file-saver";

const ListagemPlanilhas = ({
  planilhas,
  filtros,
  buscarPlanilhas,
  page,
  setShowRemocao,
  executarCarga,
}) => {
  const formataNomeArquivo = (url) => {
    return url.split("/").pop();
  };

  const formataStatus = (uuid) => {
    let obj = OPTIONS_STATUS.find((el) => el.uuid === uuid);
    return obj ? obj.nome : "";
  };

  const downloadArquivo = (url) => {
    saveAs(url.replace("http://", "https://"));
  };

  const tituloListagem = (modeloPlanilha) => {
    return {
      SERVIDOR: "Usuários Servidores",
      NAO_SERVIDOR: "Usuários Não Servidores",
      UE_PARCEIRA: "Usuários UEs Parceiras",
    }[modeloPlanilha];
  };

  return (
    <section className="tabela-carga-usuarios">
      <header>{tituloListagem(filtros.modelo)}</header>
      <article>
        <div className="grid-table header-table">
          <div>Nome do Arquivo</div>
          <div>Data de Inserção</div>
          <div>Status</div>
          <div>Última Execução</div>
          <div>Ações</div>
        </div>
        {planilhas.map((planilha, index) => {
          return (
            <div className="grid-table body-table" key={index}>
              <div>{formataNomeArquivo(planilha.conteudo)}</div>
              <div>{planilha.criado_em}</div>
              <div>{formataStatus(planilha.status)}</div>
              <div>
                {planilha.alterado_em !== planilha.criado_em
                  ? planilha.alterado_em
                  : ""}
              </div>
              <div>
                {planilha.status !== OPTIONS_STATUS[5].uuid && (
                  <>
                    {[OPTIONS_STATUS[0].uuid, OPTIONS_STATUS[2].uuid].includes(
                      planilha.status
                    ) && (
                      <Tooltip title="Executar Carga">
                        <button
                          onClick={() => {
                            executarCarga(planilha.uuid);
                          }}
                          className="verde"
                        >
                          <i className="fas fa-play-circle" />
                        </button>
                      </Tooltip>
                    )}
                    {planilha.status === OPTIONS_STATUS[1].uuid && (
                      <Tooltip title="Atualizar Status">
                        <button
                          onClick={() => {
                            buscarPlanilhas(page);
                          }}
                          className="verde"
                        >
                          <i className="fas fa-sync" />
                        </button>
                      </Tooltip>
                    )}
                    {planilha.status === OPTIONS_STATUS[3].uuid && (
                      <Tooltip title="Não foi possível executar o arquivo">
                        <button
                          onClick={() => {
                            buscarPlanilhas(page);
                          }}
                          className="vermelho"
                        >
                          <i className="fas fa-times-circle" />
                        </button>
                      </Tooltip>
                    )}
                    {planilha.status === OPTIONS_STATUS[4].uuid && (
                      <Tooltip title="Arquivo contém erros">
                        <button
                          onClick={() => {
                            downloadArquivo(planilha.resultado);
                          }}
                          className="laranja"
                        >
                          <i className="fas fa-download" />
                        </button>
                      </Tooltip>
                    )}
                    <Tooltip title="Baixar Arquivo">
                      <button
                        disabled={planilha.status === OPTIONS_STATUS[3].uuid}
                        onClick={() => {
                          downloadArquivo(planilha.conteudo);
                        }}
                        className="verde"
                      >
                        <i className="fas fa-download" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Remover Arquivo">
                      <button
                        onClick={() => {
                          setShowRemocao(planilha.uuid);
                        }}
                        className="vermelho"
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemPlanilhas;
