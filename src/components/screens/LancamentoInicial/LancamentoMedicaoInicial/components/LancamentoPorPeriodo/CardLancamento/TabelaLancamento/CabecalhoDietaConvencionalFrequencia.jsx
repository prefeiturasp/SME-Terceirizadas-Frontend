import React from "react";
import "./styles.scss";

export default ({ panorama }) => (
  <div className="cabecalho-tabela">
    <div>
      <span>Freq.</span>
    </div>
    {panorama.horas_atendimento !== 5 && (
      <div>
        <span>
          Lanche
          <br />4 h
        </span>
      </div>
    )}
    {panorama.horas_atendimento !== 4 && (
      <div>
        <span>
          Lanche
          <br />5 h
        </span>
      </div>
    )}
    <div>
      <span>
        Refeição
        <br />
        1ª oferta
      </span>
    </div>
    <div>
      <span>
        Repet.
        <br />
        refeição
      </span>
    </div>
    <div>
      <span>
        Sobremesa
        <br />
        1ª oferta
      </span>
    </div>
    <div>
      <span>
        Repet.
        <br />
        sobremesa
      </span>
    </div>
    {panorama.periodo === "INTEGRAL" && (
      <>
        <div>
          <span>
            Refeição
            <br />
            2ª oferta
          </span>
        </div>
        <div>
          <span>
            Repet.
            <br />
            refeição
          </span>
        </div>
        <div>
          <span>
            Sobremesa
            <br />
            2ª oferta
          </span>
        </div>
        <div>
          <span>
            Repet.
            <br />
            sobremesa
          </span>
        </div>
      </>
    )}
    <div>
      <span>
        Observações
        <br />
        diárias
      </span>
    </div>
  </div>
);
