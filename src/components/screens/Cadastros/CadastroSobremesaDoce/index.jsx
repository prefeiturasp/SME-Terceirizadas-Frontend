import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./style.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

export const CadastroSobremesaDoce = () => {
  const [myEventsList] = useState([
    {
      title: "on DST",
      start: new Date(2022, 7, 3, 10, 0),
      end: new Date(2022, 7, 3, 11, 0),
      allDay: false
    }
  ]);

  const localizer = momentLocalizer(moment);

  const CustomToolbar = toolbar => {
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

  return (
    <div className="card calendario-sobremesa">
      <div className="card-body">
        <p>
          Para cadastrar sobremesas doces, clique sobre o dia desejado e insira
          as informações de cadastro
        </p>
        <div>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 1000 }}
            //onSelectEvent={novoEvento}
            selectable
            resizable
            messages={{
              next: "Próximo",
              previous: "Anterior",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Día"
            }}
            components={{
              toolbar: CustomToolbar
            }}
          />
        </div>
      </div>
    </div>
  );
};
