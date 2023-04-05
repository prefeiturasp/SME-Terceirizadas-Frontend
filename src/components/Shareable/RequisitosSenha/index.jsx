import React from "react";
import "./style.scss";

export const RequisitosSenha = ({ letra, numero, tamanho }) => {
  return (
    <div className="password-requirements">
      <div className="title">Requisitos de segurança da senha:</div>
      <div className="requirements">
        <div className={`${letra ? "accepted" : "denied"}`}>
          Ao menos uma letra
          <i className={`fas fa-${letra ? "check" : "times"} fa-lg`} />
        </div>
        <div className={`${numero ? "accepted" : "denied"}`}>
          Ao menos um número
          <i className={`fas fa-${numero ? "check" : "times"} fa-lg`} />
        </div>
        <div className={`${tamanho ? "accepted" : "denied"}`}>
          Mínimo 8 caracteres
          <i className={`fas fa-${tamanho ? "check" : "times"} fa-lg`} />
        </div>
      </div>
    </div>
  );
};

export default RequisitosSenha;
