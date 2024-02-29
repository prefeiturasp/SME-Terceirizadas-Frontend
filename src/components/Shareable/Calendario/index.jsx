import React from "react";
import HTTP_STATUS from "http-status-codes";
import { CustomToolbar } from "components/Shareable/Calendario/componentes/CustomToolbar";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { formataComoEventos } from "components/Shareable/Calendario/helpers";
import { Spin } from "antd";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { ModalCadastrarNoCalendario } from "components/Shareable/Calendario/componentes/ModalCadastrarNoCalendario";
import { ModalEditar } from "components/Shareable/Calendario/componentes/ModalEditar";
import { ModalConfirmarExclusao } from "components/Shareable/Calendario/componentes//ModalConfirmarExclusao";
import { getDDMMYYYfromDate, getYYYYMMDDfromDate } from "configs/helper";
import { toastSuccess } from "components/Shareable/Toast/dialogs";
import "components/Shareable/Calendario/style.scss";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);
export class Calendario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objetos: undefined,
      loadingDiasCalendario: false,
      tiposUnidades: undefined,
      erroAPI: false,
      showModalCadastrar: false,
      showModalEditar: false,
      showModalConfirmarExclusao: false,
      currentEvent: undefined,
      mes: moment().month() + 1,
      ano: moment().year(),
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.getObjetosAsync = this.getObjetosAsync.bind(this);
    this.getTiposUnidadeEscolarAsync =
      this.getTiposUnidadeEscolarAsync.bind(this);
  }

  componentDidMount() {
    this.getObjetosAsync();
    this.getTiposUnidadeEscolarAsync();
  }

  async getObjetosAsync(params) {
    const { getObjetos } = this.props;
    const { mes, ano } = this.state;
    this.setState({ loadingDiasCalendario: true });
    const response = await getObjetos(
      params ? { mes: params.mes, ano: params.ano } : { mes, ano }
    );
    if (response.status === HTTP_STATUS.OK) {
      this.setState({
        objetos: formataComoEventos(response.data.results),
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
    const { objetos } = this.state;
    const { nomeObjeto, setObjeto, podeEditar } = this.props;
    if (!podeEditar) return;

    const idx = objetos.indexOf(event);
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
      allDay,
    };

    const nextEvents = [...objetos];
    nextEvents.splice(idx, 1, updatedEvent);

    const payload = {
      tipo_unidades: nextEvents
        .filter((e) => e.data === getDDMMYYYfromDate(event.start))
        .map((e) => e.tipo_unidade.uuid),
      data: getYYYYMMDDfromDate(event.start),
    };

    await setObjeto(payload);

    const payload2 = {
      tipo_unidades: nextEvents
        .filter((e) => e.data === getDDMMYYYfromDate(start))
        .map((e) => e.tipo_unidade.uuid),
      data: getYYYYMMDDfromDate(start),
    };

    const response2 = await setObjeto(payload2);
    if (response2.status === HTTP_STATUS.CREATED) {
      toastSuccess(`Dia de ${nomeObjeto} atualizado com sucesso`);
    }

    this.setState({
      objetos: nextEvents,
    });
  }

  handleSelectSlot(event) {
    this.setState({
      currentEvent: event,
      showModalCadastrar: true,
    });
  }

  handleEvent(event) {
    this.setState({
      currentEvent: event,
      showModalEditar: true,
    });
  }

  render() {
    const {
      objetos,
      loadingDiasCalendario,
      tiposUnidades,
      erroAPI,
      currentEvent,
      showModalCadastrar,
      showModalEditar,
      showModalConfirmarExclusao,
    } = this.state;
    const {
      nomeObjeto,
      nomeObjetoMinusculo,
      setObjeto,
      deleteObjeto,
      podeEditar,
    } = this.props;

    return (
      <div className="card calendario-sobremesa mt-3">
        <div className="card-body">
          <Spin
            tip="Carregando calendário..."
            spinning={(!tiposUnidades || !objetos) && !erroAPI}
          >
            {erroAPI && (
              <div>
                Erro ao carregar dados sobre tipos de unidades. Tente novamente
                mais tarde.
              </div>
            )}
            {tiposUnidades && objetos && (
              <>
                <p>
                  Para cadastrar um dia para {nomeObjetoMinusculo}, clique sobre
                  o dia e selecione o tipo de unidade.
                </p>
                <Spin
                  tip={`Carregando dias de ${nomeObjeto}...`}
                  spinning={loadingDiasCalendario}
                >
                  <DragAndDropCalendar
                    style={{ height: 1000 }}
                    formats={{
                      weekdayFormat: (date, culture, localizer) =>
                        localizer.format(date, "dddd", culture),
                    }}
                    selectable
                    resizable={false}
                    localizer={localizer}
                    events={objetos}
                    onSelectEvent={this.handleEvent}
                    onEventDrop={this.moveEvent}
                    onSelectSlot={this.handleSelectSlot}
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
                      this.setState({
                        mes: date.getMonth() + 1,
                        ano: date.getFullYear(),
                      });
                      this.getObjetosAsync({
                        mes: date.getMonth() + 1,
                        ano: date.getFullYear(),
                      });
                    }}
                    defaultView={Views.MONTH}
                  />
                </Spin>
                {currentEvent && podeEditar && (
                  <>
                    <ModalCadastrarNoCalendario
                      showModal={showModalCadastrar}
                      nomeObjetoNoCalendario={nomeObjeto}
                      nomeObjetoNoCalendarioMinusculo={nomeObjetoMinusculo}
                      closeModal={() =>
                        this.setState({
                          showModalCadastrar: false,
                        })
                      }
                      objetos={objetos}
                      tiposUnidades={tiposUnidades}
                      event={currentEvent}
                      getObjetosAsync={this.getObjetosAsync}
                      setObjetoAsync={setObjeto}
                    />
                    {showModalEditar && (
                      <ModalEditar
                        showModal={showModalEditar}
                        nomeObjetoNoCalendario={nomeObjeto}
                        nomeObjetoNoCalendarioMinusculo={nomeObjetoMinusculo}
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
                        nomeObjetoNoCalendario={nomeObjeto}
                        nomeObjetoNoCalendarioMinusculo={nomeObjetoMinusculo}
                        closeModal={() =>
                          this.setState({ showModalConfirmarExclusao: false })
                        }
                        event={currentEvent}
                        getObjetosAsync={this.getObjetosAsync}
                        deleteObjetoAsync={deleteObjeto}
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
