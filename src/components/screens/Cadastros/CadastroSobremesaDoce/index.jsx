import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { CustomToolbar } from "./componentes/CustomToolbar";
import { ModalCadastrarSobremesa } from "./componentes/ModalCadastrarSobremesa";
import HTTP_STATUS from "http-status-codes";
import "./style.scss";
import { Spin } from "antd";

export const CadastroSobremesaDoce = () => {
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const [myEventsList] = useState([]);
  const [
    showModalCadastrarSobremesa,
    setShowModalCadastrarSobremesa
  ] = useState(false);
  const [tiposUnidades, setTiposUnidades] = useState(undefined);
  const [erroAPI, setErroAPI] = useState(false);

  const localizer = momentLocalizer(moment);

  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, "dddd", culture)
  };

  useEffect(() => {
    getTiposUnidadeEscolar().then(response => {
      if (response.status === HTTP_STATUS.OK) {
        setTiposUnidades(response.data.results);
      } else {
        setErroAPI(true);
      }
    });
  }, []);

  const handleSelectSlot = event => {
    setCurrentEvent(event);
    setShowModalCadastrarSobremesa(true);
  };

  /*const handleNewEvent = event => {
    console.log(event);
  };*/

  return (
    <div className="card calendario-sobremesa">
      <div className="card-body">
        <Spin tip="Carregando..." spinning={!tiposUnidades && !erroAPI}>
          {erroAPI && (
            <div>
              Erro ao carregar dados sobre tipos de unidades. Tente novamente
              mais tarde.
            </div>
          )}
          {tiposUnidades && (
            <>
              <p>
                Para cadastrar sobremesas doces, clique sobre o dia desejado e
                insira as informações de cadastro
              </p>
              <Calendar
                localizer={localizer}
                formats={formats}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 1000 }}
                //onSelectEvent={handleNewEvent}
                onSelectSlot={handleSelectSlot}
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
              {currentEvent && (
                <ModalCadastrarSobremesa
                  showModal={showModalCadastrarSobremesa}
                  closeModal={() => setShowModalCadastrarSobremesa(false)}
                  tiposUnidades={tiposUnidades}
                  event={currentEvent}
                />
              )}
            </>
          )}
        </Spin>
      </div>
    </div>
  );
};
