import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./style.scss";

const ModalAvisoCoreSSO = ({ meusDados }) => {
  const [showModal, setShowModal] = useState(
    localStorage.getItem("modalCoreSSO") !== "false"
  );
  const nao_servidor = meusDados && meusDados.tipo_usuario === "terceirizada";

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("modalCoreSSO", false);
  };

  return (
    <Modal dialogClassName="modal-coresso" show={showModal} onHide={closeModal}>
      {meusDados && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Olá, {meusDados.nome}!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!nao_servidor && (
              <>
                <div className="row">
                  <div className="col-2">
                    <div className="text-center">
                      <i className="fas fa-calendar-alt green" />
                    </div>
                  </div>
                  <div className="col-10">
                    Em{" "}
                    <span className="green font-weight-bold">
                      Abril de 2023
                    </span>
                    , para fazer o
                    <span className="font-weight-bold">
                      {" "}
                      login no SIGPAE você usará o{" "}
                      <span className="green">número do seu RF</span> e não mais
                      o seu e-mail.{" "}
                    </span>
                    A senha a ser usada será a mesma utilizada em outros
                    sistemas da Secretaria Municipal da Educação de São Paulo
                    como
                    <span className="font-weight-bold"> SGP e Plateia. </span>
                  </div>
                </div>

                <div className="row gray-bg">
                  <div className="col-12 ">
                    Essa mudança visa{" "}
                    <span className="font-weight-bold">
                      facilitar seu acesso
                    </span>
                    , pois essa integração vai conferir mais agilidade e
                    otimizar o uso de senhas nos sistemas da SME.
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    Assim que ocorrer essa mudança,
                    <span className="font-weight-bold">
                      {" "}
                      você receberá um e-mail com as orientações sobre como
                      fazer seu login.{" "}
                    </span>
                    Verifique sua caixa de entrada e se não localizá-lo, procure
                    o administrador do{" "}
                    <span className="font-weight-bold">SIGPAE</span> em sua
                    unidade.
                  </div>
                </div>
              </>
            )}

            {nao_servidor && (
              <>
                <div className="row">
                  <div className="col-2">
                    <div className="text-center">
                      <i className="fas fa-calendar-alt green" />
                    </div>
                  </div>
                  <div className="col-10">
                    Em{" "}
                    <span className="green font-weight-bold">
                      Abril de 2023
                    </span>
                    , para fazer o
                    <span className="font-weight-bold">
                      {" "}
                      login no SIGPAE você usará o{" "}
                      <span className="green">CPF</span> e não mais o seu
                      e-mail.{" "}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    Assim que ocorrer essa mudança,
                    <span className="font-weight-bold">
                      {" "}
                      você receberá um e-mail com as orientações sobre como
                      fazer seu login.{" "}
                    </span>
                    Verifique sua caixa de entrada e se não localizá-lo, procure
                    o administrador do{" "}
                    <span className="font-weight-bold">SIGPAE</span> em sua
                    unidade.
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ModalAvisoCoreSSO;
