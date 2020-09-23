import React, { useState } from "react";
import { Modal, Spin, Pagination } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { imprimeRelatorioDietaEspecial } from "services/relatorios";
import { getSolicitacaoDietaEspecialListagem } from "services/dietaEspecial.service";
import { gerarParametrosConsulta } from "helpers/utilities";
import { getCabecalhoPorFiltros } from "helpers/dietaEspecial";

const ModalRelatorioDietaEspecial = ({
  showModal,
  closeModal,
  dadosRelatorio,
  setDadosRelatorio,
  filtros,
  totalResultados
}) => {
  const [carregando, setCarregando] = useState(false);
  const [page, setPage] = useState(1);

  const nextPage = page => {
    setCarregando(true);
    setPage(page);
    const params = gerarParametrosConsulta({
      ...filtros,
      page: page
    });
    getSolicitacaoDietaEspecialListagem(params).then(response => {
      setDadosRelatorio(response.data.results);
      setCarregando(false);
    });
  };

  const getDataNegacao = (status_titulo, logs) => {
    if (status_titulo === "CODAE negou a solicitação")
      return logs[logs.length - 1].criado_em;
    return null;
  };

  const getUsario = (status_titulo, logs) => {
    if (
      status_titulo === "CODAE negou a solicitação" ||
      status_titulo === "CODAE autorizou"
    )
      return logs[logs.length - 1].usuario;
    return null;
  };

  return (
    <Modal
      visible={showModal}
      title="Relatório de dieta especial"
      onCancel={closeModal}
      width={"95%"}
      footer={[
        <Pagination
          key={0}
          current={page}
          total={totalResultados}
          className="float-left"
          showSizeChanger={false}
          onChange={page => {
            nextPage(page);
          }}
          pageSize={10}
        />,
        <Botao
          key={0}
          texto="Voltar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.BLUE_OUTLINE}
          icon={BUTTON_ICON.ARROW_LEFT}
          onClick={closeModal}
        />,
        <Botao
          key={1}
          type={BUTTON_TYPE.BUTTON}
          texto="Imprimir"
          style={BUTTON_STYLE.BLUE}
          icon={BUTTON_ICON.PRINT}
          onClick={() => {
            const params = gerarParametrosConsulta({ ...filtros });
            imprimeRelatorioDietaEspecial(params);
          }}
        />
      ]}
    >
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="body-modal">
          <div className="header-modal">
            {filtros && getCabecalhoPorFiltros(filtros)}
          </div>
          <div className="section-produtos-itens">
            <div className="item-produto-modal">
              <div className="item-header-produto-modal">
                <div className="item-grid-produto">
                  <div>Diretoria Regional de Educação</div>
                  <div>Unidade escolar</div>
                  <div>Lote</div>
                  <div>Tipo de gestão</div>
                  <div>Data da solicitação</div>
                  <div>Status dieta</div>
                </div>
                {dadosRelatorio.map(dieta => {
                  const dataNegacao = getDataNegacao(
                    dieta.status_titulo,
                    dieta.logs
                  );
                  const usuario = getUsario(dieta.status_titulo, dieta.logs);
                  return (
                    <>
                      <div className="item-grid-produto item-prod-detalhe">
                        <div>{dieta.rastro_escola.diretoria_regional.nome}</div>
                        <div>{dieta.rastro_escola.nome}</div>
                        <div>{dieta.rastro_escola.lote.nome}</div>
                        <div>{dieta.rastro_escola.tipo_gestao.nome}</div>
                        <div>{dieta.criado_em.split(" ")[0]}</div>
                        <div>{dieta.ativo ? "Ativa" : "Inativa"}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-3">
                          <div className="ml-3">
                            <label>Código EOL do aluno</label>
                            <br />
                            <b>{dieta.aluno.codigo_eol}</b>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <label>Nome do Aluno</label>
                          <br />
                          <b>{dieta.aluno.nome}</b>
                        </div>

                        <div className="col-md-2">
                          <label>Data de Nascimento</label>
                          <br />
                          <b>{dieta.aluno.data_nascimento}</b>
                        </div>
                        <div className="col-md-2">
                          <label>Classificação da dieta</label>
                          <br />
                          <b>
                            {dieta.classificacao
                              ? dieta.classificacao.nome
                              : ""}
                          </b>
                        </div>
                      </div>

                      <div className="row mt-3 mb-3">
                        <div className="col-md-3">
                          <div className="ml-3">
                            <label>Diagnóstico</label>
                            <br />
                            {dieta.alergias_intolerancias.map(alergia => {
                              return (
                                <>
                                  <b>{alergia.descricao}</b>
                                </>
                              );
                            })}
                          </div>
                        </div>
                        <div className="col-md-5">
                          <label>Nome do protocolo</label>
                          <br />
                          <b>{dieta.nome_protocolo}</b>
                        </div>
                        <div className="col-md-3">
                          <label>Data de término</label>
                          <br />
                          <b>
                            {dieta.data_termino
                              ? dieta.data_termino
                              : "Sem data de término"}
                          </b>
                        </div>
                      </div>

                      <div className="row mt-3 mb-3">
                        <div className="col-md-3">
                          <div className="ml-3">
                            <label>Motivo da Negação</label>
                            <br />
                            <b
                              dangerouslySetInnerHTML={{
                                __html: dieta.motivo_negacao
                                  ? dieta.motivo_negacao.descricao
                                  : ""
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <label>Justificativa Negação</label>
                          <br />
                          <b>
                            <b
                              dangerouslySetInnerHTML={{
                                __html: dieta.justificativa_negacao
                                  ? dieta.justificativa_negacao
                                  : ""
                              }}
                            />
                          </b>
                        </div>
                        <div className="col-md-3">
                          <label>Data da Negação</label>
                          <br />
                          <b>{dataNegacao ? dataNegacao.split(" ")[0] : ""}</b>
                        </div>
                      </div>

                      <div className="row mt-3 mb-3">
                        <div className="col-md-6">
                          <div className="ml-3">
                            <label>Nome do usuário</label>
                            <br />
                            <b>{usuario ? usuario.nome : ""}</b>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label>RF</label>
                          <br />
                          <b>{usuario ? usuario.registro_funcional : ""}</b>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default ModalRelatorioDietaEspecial;
