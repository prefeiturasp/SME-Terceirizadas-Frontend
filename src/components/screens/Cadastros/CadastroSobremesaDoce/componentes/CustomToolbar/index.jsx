import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import moment from "moment";
import React from "react";

export const CustomToolbar = toolbar => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate("prev");
  };

  const goToMonthView = () => {
    toolbar.onView("month");
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate("next");
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        {date.format("MMMM")} {date.format("YYYY")}
      </span>
    );
  };

  return (
    <div className="row toolbar-container mb-3">
      <div className="col-6">
        <div onClick={goToMonthView} className="mes-tab">
          Mês
        </div>
      </div>
      <div className="col-6 text-right">
        <div className={"back-next-buttons"}>
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            icon={BUTTON_ICON.ARROW_LEFT}
            onClick={goToBack}
          />
          <span className="label-month">{label()}</span>
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            icon={BUTTON_ICON.ARROW_RIGHT}
            onClick={goToNext}
          />
        </div>
      </div>
    </div>
  );
};
