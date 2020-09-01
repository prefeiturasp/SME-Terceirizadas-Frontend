import React, { Fragment } from "react";
import { Modal } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { getRelatorioReclamacao } from "services/relatorios";
import { getConfigCabecario } from "./helpers";
import Reclamacao from "./Reclamacao";

const ModalRelatorioReclamacao = ({
  showModal,
  closeModal,
  produtos,
  filtros
}) => {
  const configCabecario = getConfigCabecario(filtros, produtos);
  return (
    <Modal
      visible={showModal}
      title="Relatório de acompanhamento de reclamação de produto"
      onCancel={closeModal}
      width={"95%"}
      footer={[
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
            getRelatorioReclamacao({
              produtos: produtos,
              config_cabecario: configCabecario
            });
          }}
        />
      ]}
    >
      <div className="body-modal">
        <div className="header-modal">{configCabecario.titulo}</div>
        <div className="section-produtos-itens-relatorio">
          <div className="item-produto-modal">
            <div className="item-header-produto-modal">
              <div className="item-grid-produto">
                <div>Nome do Produto</div>
                <div>Marca</div>
                <div>Fabricante</div>
                <div>Data de cadastro </div>
                <div>Qtde. Reclamações </div>
              </div>

              {produtos !== null &&
                produtos.map((produto, index) => {
                  const ultimaHomologacao =
                    produto.homologacoes[produto.homologacoes.length - 1];
                  const reclamacoes = ultimaHomologacao.reclamacoes;
                  return (
                    <Fragment key={index}>
                      <div className="item-grid-produto item-prod-detalhe">
                        <div>{produto.nome}</div>
                        <div>{produto.marca.nome}</div>
                        <div>{produto.fabricante.nome}</div>
                        <div>{produto.criado_em.split(" ")[0]}</div>
                        <div>{produto.qtde_reclamacoes}</div>
                      </div>
                      {reclamacoes.map((reclamacao, index, arr) => {
                        const deveMostrarBarraHorizontal =
                          index < arr.length - 1;
                        return (
                          <>
                            <Reclamacao key={index} reclamacao={reclamacao} />
                            {deveMostrarBarraHorizontal && <hr />}
                          </>
                        );
                      })}
                      <hr />
                    </Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRelatorioReclamacao;
