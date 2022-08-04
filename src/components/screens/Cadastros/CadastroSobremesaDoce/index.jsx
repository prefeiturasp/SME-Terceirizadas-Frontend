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
import { getDiasSobremesaDoce } from "services/medicaoInicial/diaSobremesaDoce.service";
import { formataComoEventos } from "./helpers";
import { ModalEditar } from "./componentes/ModalEditar";
import { ModalConfirmarExclusao } from "./componentes/ModalConfirmarExclusao";

export const CadastroSobremesaDoce = () => {
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const [diasSobremesaDoce, setDiasSobremesaDoce] = useState(undefined);
  const [
    showModalCadastrarSobremesa,
    setShowModalCadastrarSobremesa
  ] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalConfirmarExclusao, setShowModalConfirmarExclusao] = useState(
    false
  );
  const [tiposUnidades, setTiposUnidades] = useState(undefined);
  const [erroAPI, setErroAPI] = useState(false);

  const localizer = momentLocalizer(moment);

  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, "dddd", culture)
  };

  const getDiasSobremesaDoceAsync = async () => {
    const response = await getDiasSobremesaDoce();
    if (response.status === HTTP_STATUS.OK) {
      setDiasSobremesaDoce(formataComoEventos(response.data.results));
    }
  };

  useEffect(() => {
    const getTiposUnidadeEscolarAsync = async () => {
      const response = await getTiposUnidadeEscolar();
      if (response.status === HTTP_STATUS.OK) {
        setTiposUnidades(response.data.results);
      } else {
        setErroAPI(true);
      }
    };

    getDiasSobremesaDoceAsync();
    getTiposUnidadeEscolarAsync();
  }, []);

  const handleSelectSlot = event => {
    setCurrentEvent(event);
    setShowModalCadastrarSobremesa(true);
  };

  const handleEvent = event => {
    setCurrentEvent(event);
    setShowModalEditar(true);
  };

  return (
    <div className="card calendario-sobremesa">
      <div className="card-body">
        <Spin
          tip="Carregando..."
          spinning={(!tiposUnidades || !diasSobremesaDoce) && !erroAPI}
        >
          {erroAPI && (
            <div>
              Erro ao carregar dados sobre tipos de unidades. Tente novamente
              mais tarde.
            </div>
          )}
          {tiposUnidades && diasSobremesaDoce && (
            <>
              <p>
                Para cadastrar sobremesas doces, clique sobre o dia desejado e
                insira as informações de cadastro
              </p>
              <Calendar
                localizer={localizer}
                formats={formats}
                events={diasSobremesaDoce}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 1000 }}
                onSelectEvent={handleEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                resizable
                messages={{
                  next: "Próximo",
                  previous: "Anterior",
                  today: "Hoje",
                  month: "Mês",
                  week: "Semana",
                  day: "Día",
                  showMore: target => (
                    <span className="ml-2" role="presentation">
                      ...{target} mais
                    </span>
                  )
                }}
                components={{
                  toolbar: CustomToolbar
                }}
              />
              {currentEvent && (
                <>
                  <ModalCadastrarSobremesa
                    showModal={showModalCadastrarSobremesa}
                    closeModal={() => setShowModalCadastrarSobremesa(false)}
                    tiposUnidades={tiposUnidades}
                    event={currentEvent}
                    getDiasSobremesaDoceAsync={getDiasSobremesaDoceAsync}
                    setDiasSobremesaDoce={setDiasSobremesaDoce}
                  />
                  {showModalEditar && (
                    <ModalEditar
                      showModal={showModalEditar}
                      closeModal={() => setShowModalEditar(false)}
                      event={currentEvent}
                      setShowModalConfirmarExclusao={
                        setShowModalConfirmarExclusao
                      }
                    />
                  )}
                  {showModalConfirmarExclusao && (
                    <ModalConfirmarExclusao
                      showModal={showModalConfirmarExclusao}
                      closeModal={() => setShowModalConfirmarExclusao(false)}
                      event={currentEvent}
                      getDiasSobremesaDoceAsync={getDiasSobremesaDoceAsync}
                      setDiasSobremesaDoce={setDiasSobremesaDoce}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Spin>
      </div>
    </div>
  );
};
