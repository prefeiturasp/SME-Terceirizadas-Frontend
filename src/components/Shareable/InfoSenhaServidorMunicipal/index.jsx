import React from "react";
import "./style.scss";

export const InfoSenhaServidorMunicipal = () => {
  return (
    <div className="box-senha">
      <div className="row d-flex align-items-center w-100">
        <div className="col-md-4 w-100">
          <div className="row w-100 d-flex">
            <div className="col-5 w-100 d-flex align-items-center">
              <i className="fas fa-chalkboard-teacher" />
            </div>
            <div className="col-7 w-100 icon-informacao">
              <div className="w-100">Servidor</div>
              <div>Municipal</div>
            </div>
          </div>
        </div>
        <div className="col-md-8 txt-informacao">
          Lembre-se que <strong>a nova senha cadastrada</strong> será usada
          também em outros sistemas da <strong>SME</strong>, como o SGP, Plateia
          e SIG-Escola.
        </div>
      </div>
    </div>
  );
};

export default InfoSenhaServidorMunicipal;
