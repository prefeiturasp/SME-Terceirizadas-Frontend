import React, { useState } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { Modal } from "react-bootstrap";

export default ({ solicitacao, confirmaCancelamentoGuias }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalGuia, setShowModalGuia] = useState(false);
  const [guiaAtual, setGuiaAtual] = useState({});
  const [carregandoModal, setCarregandoModal] = useState(false);

  const guias = solicitacao.guias;

  const validaBotao = () => {
    let invalidas = guias.filter(guia =>
      ["Aguardando cancelamento"].includes(guia.status)
    );
    return invalidas.length === 0;
  };

  const abrirModalGuia = guia => {
    setGuiaAtual(guia);
    setShowModalGuia(true);
  };

  return (
    <>
      {guias.length > 0 && (
        <section className="resultado-busca-detalhe pb-3 pt-3">
          <div className="container-fluid">
            <div className="grid-table header-table">
              <div>Nº da Guia de Remessa</div>
              <div>Nome da Unidade Educacional</div>
              <div>Status</div>
            </div>
            {guias.map(guia => {
              return (
                <>
                  <div className="grid-table body-table">
                    <div onClick={() => abrirModalGuia(guia)}>
                      {guia.numero_guia}
                    </div>
                    <div onClick={() => abrirModalGuia(guia)}>
                      {guia.nome_unidade}
                    </div>
                    <div onClick={() => abrirModalGuia(guia)}>
                      {guia.status}
                    </div>
                  </div>
                </>
              );
            })}
            <div className="button-row mt-3">
              <Botao
                texto={"Confirmar Cancelamento"}
                type={BUTTON_TYPE.BUTTON}
                onClick={() => {
                  setShowModal(true);
                }}
                style={BUTTON_STYLE.GREEN}
                disabled={validaBotao()}
              />
            </div>
          </div>
        </section>
      )}

      <Modal
        show={showModalGuia}
        onHide={() => {
          setShowModalGuia(false);
        }}
        dialogClassName="modal-guia-remessa-info"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Nº da Guia de Remessa: {guiaAtual.numero_guia}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <section className="resultado-busca-detalhe pb-3 pt-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <b>Cód. CODAE da U.E</b>
                    <br />
                    {guiaAtual.codigo_unidade}
                  </div>
                  <div className="col border-left">
                    <b>Nome Unidade Educacional</b>
                    <br />
                    {guiaAtual.nome_unidade}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <b>Endereço</b>
                    <br />
                    {guiaAtual.endereco_unidade}, {guiaAtual.numero_unidade} -{" "}
                    {guiaAtual.bairro_unidade} - CEP: {guiaAtual.cep_unidade} -{" "}
                    {guiaAtual.cidade_unidade} - {guiaAtual.estado_unidade}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <b>Contato de entrega</b>
                    <br />
                    {guiaAtual.contato_unidade}
                  </div>
                  <div className="col border-left">
                    <b>Telefone</b>
                    <br />
                    {guiaAtual.telefone_unidade}
                  </div>
                </div>

                <hr />

                <b>Lista de Produtos</b>

                <article>
                  <div className="grid-table header-table">
                    <div>Nome do Produto</div>
                    <div>Quantidade</div>
                    <div>Tipo de Embalagem</div>
                    <div>Capacidade</div>
                  </div>

                  {guiaAtual.alimentos &&
                    guiaAtual.alimentos.map(alimento => {
                      return (
                        <>
                          <div className="grid-table body-table">
                            <div>{alimento.nome_alimento}</div>
                            <div>{alimento.embalagens[0].qtd_volume}</div>
                            <div>{alimento.embalagens[0].tipo_embalagem}</div>
                            <div>
                              {alimento.embalagens[0].descricao_embalagem}{" "}
                              {alimento.embalagens[0].capacidade_embalagem}{" "}
                              {alimento.embalagens[0].unidade_medida}
                            </div>
                          </div>
                        </>
                      );
                    })}
                </article>
              </div>
            </section>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Botao
            texto="Fechar"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              setShowModalGuia(false);
            }}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Spin tip="Enviando..." spinning={carregandoModal}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Cancelar a(s) Guia(s) de Remessa? Ao confirmar essa ação, a(s)
            Guia(s) serão canceladas.
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="SIM"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                confirmaCancelamentoGuias(
                  solicitacao,
                  setShowModal,
                  setCarregandoModal
                );
              }}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              disabled={carregandoModal}
            />
            <Botao
              texto="NÃO"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                setShowModal(false);
              }}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
          </Modal.Footer>
        </Spin>
      </Modal>
    </>
  );
};
