import React from "react";
import HTTP_STATUS from "http-status-codes";
import { CustomToolbar } from "./componentes/CustomToolbar";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {
  getDiasSobremesaDoce,
  setDiaSobremesaDoce
} from "services/medicaoInicial/diaSobremesaDoce.service";
import { formataComoEventos } from "./helpers";
import { Spin } from "antd";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { ModalCadastrarSobremesa } from "./componentes/ModalCadastrarSobremesa";
import { ModalEditar } from "./componentes/ModalEditar";
import { usuarioEhCODAEGestaoAlimentacao } from "helpers/utilities";
import { ModalConfirmarExclusao } from "./componentes/ModalConfirmarExclusao";
import "./style.scss";
import { getDDMMYYYfromDate, getYYYYMMDDfromDate } from "configs/helper";
import { toastSuccess } from "components/Shareable/Toast/dialogs";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);
export class CadastroSobremesaDoce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diasSobremesaDoce: undefined,
      loadingDiasCalendario: false,
      tiposUnidades: undefined,
      erroAPI: false,
      showModalCadastrarSobremesa: false,
      showModalEditar: false,
      showModalConfirmarExclusao: false,
      currentEvent: undefined,
      mes: moment().month() + 1,
      ano: moment().year()
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.getDiasSobremesaDoceAsync = this.getDiasSobremesaDoceAsync.bind(this);
    this.getTiposUnidadeEscolarAsync = this.getTiposUnidadeEscolarAsync.bind(
      this
    );
  }

  componentDidMount() {
    this.getDiasSobremesaDoceAsync();
    this.getTiposUnidadeEscolarAsync();
  }

  async getDiasSobremesaDoceAsync(params) {
    const { mes, ano } = this.state;
    this.setState({ loadingDiasCalendario: true });
    const response = await getDiasSobremesaDoce(
      params ? { mes: params.mes, ano: params.ano } : { mes, ano }
    );
    if (response.status === HTTP_STATUS.OK) {
      this.setState({
        diasSobremesaDoce: formataComoEventos(response.data.results)
      });
    }
    if (response) {
      this.setState({ loadingDiasCalendario: false });
    }
  }

  async getTiposUnidadeEscolarAsync() {
    const response = await getTiposUnidadeEscolar();
    if (response.status === HTTP_STATUS.OK) {
      this.setState({ tiposUnidades: response.data.results });
    } else {
      this.setState({ erroAPI: true });
    }
  }

  async moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { diasSobremesaDoce } = this.state;

    const idx = diasSobremesaDoce.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = {
      ...event,
      data: getDDMMYYYfromDate(start),
      start,
      end,
      allDay
    };

    const nextEvents = [...diasSobremesaDoce];
    nextEvents.splice(idx, 1, updatedEvent);

    const payload = {
      tipo_unidades: nextEvents
        .filter(e => e.data === getDDMMYYYfromDate(event.start))
        .map(e => e.tipo_unidade.uuid),
      data: getYYYYMMDDfromDate(event.start)
    };

    await setDiaSobremesaDoce(payload);

    const payload2 = {
      tipo_unidades: nextEvents
        .filter(e => e.data === getDDMMYYYfromDate(start))
        .map(e => e.tipo_unidade.uuid),
      data: getYYYYMMDDfromDate(start)
    };

    const response2 = await setDiaSobremesaDoce(payload2);
    if (response2.status === HTTP_STATUS.CREATED) {
      toastSuccess("Dia de sobremesa atualizado com sucesso");
    }

    this.setState({
      diasSobremesaDoce: nextEvents
    });
  }

  handleSelectSlot(event) {
    this.setState({
      currentEvent: event,
      showModalCadastrarSobremesa: true
    });
  }

  handleEvent(event) {
    this.setState({
      currentEvent: event,
      showModalEditar: true
    });
  }

  render() {
    const {
      diasSobremesaDoce,
      loadingDiasCalendario,
      tiposUnidades,
      erroAPI,
      currentEvent,
      showModalCadastrarSobremesa,
      showModalEditar,
      showModalConfirmarExclusao
    } = this.state;

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
                  <DragAndDropCalendar
                    style={{ height: 1000 }}
                    formats={{
                      weekdayFormat: (date, culture, localizer) =>
                        localizer.format(date, "dddd", culture)
                    }}
                    selectable
                    resizable={false}
                    localizer={localizer}
                    events={diasSobremesaDoce}
                    onSelectEvent={this.handleEvent}
                    onEventDrop={this.moveEvent}
                    onSelectSlot={this.handleSelectSlot}
                    components={{
                      toolbar: CustomToolbar
                    }}
                    messages={{
                      showMore: target => (
                        <span className="ml-2" role="presentation">
                          ...{target} mais
                        </span>
                      )
                    }}
                    onNavigate={date => {
                      this.setState({
                        mes: date.getMonth() + 1,
                        ano: date.getFullYear()
                      });
                      this.getDiasSobremesaDoceAsync({
                        mes: date.getMonth() + 1,
                        ano: date.getFullYear()
                      });
                    }}
                    defaultView={Views.MONTH}
                  />
                </Spin>
                {currentEvent && usuarioEhCODAEGestaoAlimentacao() && (
                  <>
                    <ModalCadastrarSobremesa
                      showModal={showModalCadastrarSobremesa}
                      closeModal={() =>
                        this.setState({ showModalCadastrarSobremesa: false })
                      }
                      diasSobremesaDoce={diasSobremesaDoce}
                      tiposUnidades={tiposUnidades}
                      event={currentEvent}
                      getDiasSobremesaDoceAsync={this.getDiasSobremesaDoceAsync}
                    />
                    {showModalEditar && (
                      <ModalEditar
                        showModal={showModalEditar}
                        closeModal={() =>
                          this.setState({ showModalEditar: false })
                        }
                        event={currentEvent}
                        setShowModalConfirmarExclusao={() =>
                          this.setState({ showModalConfirmarExclusao: true })
                        }
                      />
                    )}
                    {showModalConfirmarExclusao && (
                      <ModalConfirmarExclusao
                        showModal={showModalConfirmarExclusao}
                        closeModal={() =>
                          this.setState({ showModalConfirmarExclusao: false })
                        }
                        event={currentEvent}
                        getDiasSobremesaDoceAsync={
                          this.getDiasSobremesaDoceAsync
                        }
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
  }
}
