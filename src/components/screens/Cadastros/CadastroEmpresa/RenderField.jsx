import React from "react";
import "../style.scss";

export const renderTelefone = ({ input, type }) => (
  <div>
    <label className="label">
      <span>* </span>Telefone/Fax
    </label>
    <div>
      <input className="form-control telefone" {...input} type={type} />
    </div>
  </div>
);

export const renderTelefonePlus = ({ input, type }) => (
  <div className="pt-3">
    <div>
      <input className="form-control telefone" {...input} type={type} />
    </div>
  </div>
);

export const renderEmail = ({ input, type }) => (
  <div>
    <label className="label">
      <span>* </span>E-mail
    </label>
    <div>
      <input className="form-control email" {...input} type={type} />
    </div>
  </div>
);

export const renderEmailPlus = ({ input, type }) => (
  <div className="pt-3">
    <div>
      <input className="form-control email" {...input} type={type} />
    </div>
  </div>
);

export const renderEdital = ({ input, type, label }) => (
  <div>
    <label className="label">
      <span>* </span>Edital de Pregão n°
    </label>

    <div>
      <input className="form-control" {...input} type={type} />
    </div>
  </div>
);

export const renderContrato = ({ input, type }) => (
  <div>
    <label className="label">
      <span>* </span>Contrato n°
    </label>
    <input className="form-control" {...input} type={type} />
  </div>
);

export const renderContratoPlus = ({ input, type }) => (
  <div className="pt-3">
    <input className="form-control" {...input} type={type} />
  </div>
);
