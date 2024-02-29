import React from "react";
import "./style.scss";

export const SigpaeLogoLoader = () => {
  return (
    <div className="sigpae-logo-loader text-center">
      <img src="/assets/image/sigpae-loader.gif" alt="sigpae-loader" />
      <div>Carregando...</div>
    </div>
  );
};
