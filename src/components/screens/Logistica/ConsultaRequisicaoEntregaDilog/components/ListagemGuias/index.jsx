import React, { useState } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";
import { Checkbox } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { Modal } from "react-bootstrap";

export default ({ solicitacao, situacao, arquivaDesarquivaGuias }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [selecionados, setSelecionados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carregandoModal, setCarregandoModal] = useState(false);

  const guias = solicitacao.guias.filter(x => x.situacao === situacao);

  const textoBotao = situacao === "ATIVA" ? "Arquivar" : "Desarquivar";
  const textoTitulo =
    situacao === "ATIVA" ? "Guia(s) Ativa(s)" : "Guia(s) Arquivada(s)";

  const checkSolicitacao = guia => {
    let newSelecionados = [...selecionados];
    if (guia.checked) {
      guia.checked = false;
      const index = newSelecionados.indexOf(guia);
      if (index > -1) {
        newSelecionados.splice(index, 1);
      }
      setAllChecked(false);
    } else {
      guia.checked = true;
      newSelecionados.push(guia);
      if (newSelecionados.length === guias.length) setAllChecked(true);
    }
    setSelecionados(newSelecionados);
  };

  const checkAll = () => {
    let newSelecionados = [];
    guias.map(guia => {
      guia.checked = !allChecked;
      if (!allChecked) newSelecionados.push(guia);
    });
    setAllChecked(!allChecked);
    setSelecionados(newSelecionados);
  };

  const validaBotao = () => {
    let invalidas = guias.filter(guia =>
      ["Aguardando envio", "Aguardando confirmação"].includes(guia.status)
    );
    return invalidas.length > 0;
  };

  return (
    <>
      {guias.length > 0 && (
        <section className="resultado-busca-detalhe pb-3 pt-3">
          <div className="container-fluid">
            <div className="title-guias">{textoTitulo}</div>
            <div className="grid-table header-table">
              <div>
                <Checkbox checked={allChecked} onChange={() => checkAll()} />
              </div>
              <div>Nº da Guia de Remessa</div>
              <div>Nome da Unidade Educacional</div>
              <div>Status</div>
            </div>
            {guias.map(guia => {
              return (
                <>
                  <div className="grid-table body-table">
                    <div>
                      <Checkbox
                        checked={guia.checked}
                        onChange={() => checkSolicitacao(guia)}
                      />
                    </div>
                    <div>{guia.numero_guia}</div>
                    <div>{guia.nome_unidade}</div>
                    <div>{guia.status}</div>
                  </div>
                </>
              );
            })}
            <div className="button-row mt-3">
              <Botao
                texto={textoBotao}
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
            {situacao === "ATIVA"
              ? `Arquivar Guia(s) de Remessa selecionada(s)?`
              : `Desarquivar Guia(s) de Remessa selecionada(s)`}
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="SIM"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                arquivaDesarquivaGuias(
                  selecionados,
                  solicitacao.numero_solicitacao,
                  situacao,
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
