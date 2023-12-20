import React, { useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { CustomToolbar } from "components/Shareable/CalendarioCronograma/componentes/CustomToolbar";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { formataComoEventos } from "components/Shareable/CalendarioCronograma/helpers";
import { Spin } from "antd";
import { ModalCronograma } from "components/Shareable/CalendarioCronograma/componentes/ModalCronograma";
import "components/Shareable/CalendarioCronograma/style.scss";
import { useState } from "react";

const localizer = momentLocalizer(moment);

export const CalendarioCronograma = ({
  getObjetos,
  nomeObjeto,
  nomeObjetoMinusculo,
}) => {
  const [objetos, setObjetos] = useState(undefined);
  const [loadingDiasCalendario, setLoadingDiasCalendario] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const [showModalCronograma, setShowModalCronograma] = useState(false);
  const [mes, setMes] = useState(moment().month() + 1);
  const [ano, setAno] = useState(moment().year());

  useEffect(() => {
    getObjetosAsync();
  });

  const getObjetosAsync = async (params) => {
    this.setState({ loadingDiasCalendario: true });
    const response = await getObjetos(
      params ? { mes: params.mes, ano: params.ano } : { mes, ano }
    );
    if (response.status === HTTP_STATUS.OK) {
      setObjetos(formataComoEventos(response.data.results));
    }
    if (response) {
      setLoadingDiasCalendario(false);
    }
  };

  const handleEvent = (event) => {
    setCurrentEvent(event);
    setShowModalCronograma(true);
  };

  return (
    <div className="card calendario-sobremesa mt-3">
      <div className="card-body">
        <Spin tip="Carregando calendário..." spinning={!objetos}>
          {objetos && (
            <>
              <p>
                Para cadastrar um dia para {nomeObjetoMinusculo}, clique sobre o
                dia e selecione o tipo de unidade.
              </p>
              <Spin
                tip={`Carregando dias de ${nomeObjeto}...`}
                spinning={loadingDiasCalendario}
              >
                <Calendar
                  style={{ height: 1000 }}
                  formats={{
                    weekdayFormat: (date, culture, localizer) =>
                      localizer.format(date, "dddd", culture),
                  }}
                  selectable
                  resizable={false}
                  localizer={localizer}
                  events={objetos}
                  onSelectEvent={handleEvent}
                  components={{
                    toolbar: CustomToolbar,
                  }}
                  messages={{
                    showMore: (target) => (
                      <span className="ms-2" role="presentation">
                        ...{target} mais
                      </span>
                    ),
                  }}
                  onNavigate={(date) => {
                    setMes(date.getMonth() + 1);
                    setAno(date.getFullYear());
                    getObjetosAsync({
                      mes: date.getMonth() + 1,
                      ano: date.getFullYear(),
                    });
                  }}
                  defaultView={Views.MONTH}
                />
              </Spin>
              {showModalCronograma && currentEvent && (
                <ModalCronograma
                  showModal={showModalCronograma}
                  nomeObjetoNoCalendario={nomeObjeto}
                  nomeObjetoNoCalendarioMinusculo={nomeObjetoMinusculo}
                  closeModal={() => setShowModalCronograma(false)}
                  event={currentEvent}
                  setShowModalConfirmarExclusao={() => {}}
                />
              )}
            </>
          )}
        </Spin>
      </div>
    </div>
  );
};
