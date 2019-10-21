import React from "react";
import { MENU_DASHBOARD_TERCEIRIZADAS } from "../../constants";
import IconeGestaoDeAlimentacao from "../../../../Shareable/Icones/IconeGestaoDeAlimentacao";
import CardLogo from "../../../../Shareable/CardLogo/CardLogo";
import IconeDietaEspecial from "../../../../Shareable/Icones/IconeDietaEspecial";
import IconeFinancas from "../../../../Shareable/Icones/IconeFinancas";
import IconePD from "../../../../Shareable/Icones/IconePD";
import IconeSupervisao from "../../../../Shareable/Icones/IconeSupervisao";
import IconePlanejamentoCardapio from "../../../../Shareable/Icones/IconePlanejamentoCardapio";

export const MenuIcones = props => {
  return (
    <div>
      <div className="row mt-3">
        <div
          className="col-4"
          onClick={() =>
            props.renderSecao(
              MENU_DASHBOARD_TERCEIRIZADAS.GESTAO_DE_ALIMENTACAO
            )
          }
        >
          <CardLogo titulo={"Gestão de Alimentação"}>
            <IconeGestaoDeAlimentacao />
          </CardLogo>
        </div>
        <div className="col-4">
          <CardLogo titulo={"Dieta Especial"} disabled>
            <IconeDietaEspecial />
          </CardLogo>
        </div>
        <div className="col-4">
          <CardLogo titulo={"Finanças"} disabled>
            <IconeFinancas />
          </CardLogo>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-4">
          <CardLogo titulo={"Pesquisa e Desenvolvimento P&D"} disabled>
            <IconePD />
          </CardLogo>
        </div>
        <div className="col-4">
          <CardLogo titulo={"Supervisão"} disabled>
            <IconeSupervisao />
          </CardLogo>
        </div>
        <div className="col-4">
          <CardLogo titulo={"Planejamento de Cardápio"} disabled>
            <IconePlanejamentoCardapio />
          </CardLogo>
        </div>
      </div>
    </div>
  );
};
