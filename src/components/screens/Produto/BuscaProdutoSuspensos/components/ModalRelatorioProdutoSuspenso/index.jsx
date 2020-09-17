import React, { Fragment, useState } from "react";
import { Modal, Spin, Pagination } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { getRelatorioProdutoSuspenso } from "services/relatorios";
import { getProdutosRelatorioSuspenso } from "services/produto.service";
import { gerarParametrosConsulta } from "helpers/utilities";
import { getConfigCabecario } from "./helpers";

const ModalRelatorioProdutoSuspenso = ({
  showModal,
  closeModal,
  produtos,
  setProdutos,
  filtros,
  produtosCount,
  pageSize,
  setPage,
  page
}) => {
  const [carregando, setCarregando] = useState(false);

  const nextPage = page => {
    setCarregando(true);
    setPage(page);
    const params = gerarParametrosConsulta({
      ...filtros,
      page: page,
      page_size: pageSize
    });
    getProdutosRelatorioSuspenso(params).then(response => {
      setProdutos(response.data.results);
      setCarregando(false);
    });
  };
  return (
    <Modal
      visible={showModal}
      title="Relatório de análise de produtos suspensos"
      onCancel={closeModal}
      width={"95%"}
      footer={[
        <Pagination
          key={0}
          current={page}
          total={produtosCount}
          className="float-left"
          showSizeChanger={false}
          onChange={page => {
            nextPage(page);
          }}
          pageSize={pageSize}
        />,
        <Botao
          key={1}
          texto="Voltar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.BLUE_OUTLINE}
          icon={BUTTON_ICON.ARROW_LEFT}
          onClick={closeModal}
        />,
        <Botao
          key={2}
          type={BUTTON_TYPE.BUTTON}
          texto="Imprimir"
          style={BUTTON_STYLE.BLUE}
          icon={BUTTON_ICON.PRINT}
          onClick={() => {
            const params = gerarParametrosConsulta({
              ...filtros,
              ...getConfigCabecario(filtros)
            });
            getRelatorioProdutoSuspenso(params);
          }}
        />
      ]}
    >
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="body-modal">
          <div className="header-modal">Veja os resultados para a busca</div>
          <div className="section-produtos-itens">
            <div className="item-produto-modal">
              <div className="item-header-produto-modal">
                <div className="item-grid-produto">
                  <div>Nome do Produto</div>
                  <div>Marca</div>
                  <div>Fabricante</div>
                  <div>Data de cadastro</div>
                  <div>Data suspensão de produto</div>
                </div>
                {produtos !== null &&
                  produtos.map((produto, index) => {
                    const ultimoLog = produto.ultima_homologacao.ultimo_log;
                    return (
                      <Fragment key={index}>
                        <div className="item-grid-produto item-prod-detalhe">
                          <div>{produto.nome}</div>
                          <div>{produto.marca.nome}</div>
                          <div>{produto.fabricante.nome}</div>
                          <div>{produto.criado_em.split(" ")[0]}</div>
                          <div>{ultimoLog.criado_em.split(" ")[0]}</div>
                        </div>
                        <div className="item-grid-detalhe-produto">
                          <div>
                            <label>Nome</label>
                            <p>{ultimoLog.usuario.nome}</p>
                            <p>RF: {ultimoLog.usuario.registro_funcional}</p>
                          </div>
                          <div>
                            <label>Cargo</label>
                            <p>{ultimoLog.usuario.cargo}</p>
                          </div>
                          <div>
                            <label>Justificativa de suspensão de produto</label>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: ultimoLog.justificativa
                              }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="item-grid-detalhe-produto">
                          <div>
                            <label>Anexo</label>
                            <p>{ultimoLog.anexos.length > 0 ? "Sim" : "Não"}</p>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
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

export default ModalRelatorioProdutoSuspenso;
