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
import { usuarioEhCODAEGestaoAlimentacao } from "helpers/utilities";

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
  const [loadingDiasCalendario, setLoadingDiasCalendario] = useState(false);
  const [tiposUnidades, setTiposUnidades] = useState(undefined);
  const [erroAPI, setErroAPI] = useState(false);
  const [mes, setMes] = useState(moment().month() + 1);
  const [ano, setAno] = useState(moment().year());

  const localizer = momentLocalizer(moment);
  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, "dddd", culture)
  };

  const getDiasSobremesaDoceAsync = async params => {
    setLoadingDiasCalendario(true);
    const response = await getDiasSobremesaDoce(
      params ? { mes: params.mes, ano: params.ano } : { mes, ano }
    );
    if (response.status === HTTP_STATUS.OK) {
      setDiasSobremesaDoce(formataComoEventos(response.data.results));
    }
    if (response) {
      setLoadingDiasCalendario(false);
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

    getDiasSobremesaDoceAsync({
      mes,
      ano
    });
    getTiposUnidadeEscolarAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          tip="Carregando calendário..."
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
              <Spin
                tip="Carregando dias de sobremesa..."
                spinning={loadingDiasCalendario}
              >
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
                  onNavigate={date => {
                    setMes(date.getMonth() + 1);
                    setAno(date.getFullYear());
                    getDiasSobremesaDoceAsync({
                      mes: date.getMonth() + 1,
                      ano: date.getFullYear()
                    });
                  }}
                />
              </Spin>
              {currentEvent && usuarioEhCODAEGestaoAlimentacao() && (
                <>
                  <ModalCadastrarSobremesa
                    showModal={showModalCadastrarSobremesa}
                    closeModal={() => setShowModalCadastrarSobremesa(false)}
                    diasSobremesaDoce={diasSobremesaDoce}
                    tiposUnidades={tiposUnidades}
                    event={currentEvent}
                    getDiasSobremesaDoceAsync={getDiasSobremesaDoceAsync}
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
