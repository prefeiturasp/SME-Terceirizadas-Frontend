import React from "react";
import HTTP_STATUS from "http-status-codes";
import { CustomToolbar } from "components/screens/Cadastros/CadastroSobremesaDoce/componentes/CustomToolbar";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {
  getDiasSuspensaoAtividades,
  setDiaSuspensaoAtividades,
} from "services/cadastroDiasSuspensaoAtividades.service";
import { formataComoEventos } from "components/screens/Cadastros/CadastroSobremesaDoce/helpers";
import { Spin } from "antd";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { ModalCadastrarNoCalendario } from "components/screens/Cadastros/CadastroSobremesaDoce/componentes/ModalCadastrarNoCalendario";
import { ModalEditar } from "components/screens/Cadastros/CadastroSobremesaDoce/componentes/ModalEditar";
import { usuarioEhCODAEGestaoAlimentacao } from "helpers/utilities";
import { ModalConfirmarExclusao } from "components/screens/Cadastros/CadastroSobremesaDoce/componentes//ModalConfirmarExclusao";
import "components/screens/Cadastros/CadastroSobremesaDoce/style.scss";
import { getDDMMYYYfromDate, getYYYYMMDDfromDate } from "configs/helper";
import { toastSuccess } from "components/Shareable/Toast/dialogs";
import { deleteDiaSuspensaoAtividades } from "../../../../services/cadastroDiasSuspensaoAtividades.service";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);
export class CadastroSuspensaoAtividades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diasSuspensaoAtividades: undefined,
      loadingDiasCalendario: false,
      tiposUnidades: undefined,
      erroAPI: false,
      showModalCadastrarSuspensaoAtividades: false,
      showModalEditar: false,
      showModalConfirmarExclusao: false,
      currentEvent: undefined,
      mes: moment().month() + 1,
      ano: moment().year(),
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.getDiasSuspensaoAtividadesAsync =
      this.getDiasSuspensaoAtividadesAsync.bind(this);
    this.getTiposUnidadeEscolarAsync =
      this.getTiposUnidadeEscolarAsync.bind(this);
  }

  componentDidMount() {
    this.getDiasSuspensaoAtividadesAsync();
    this.getTiposUnidadeEscolarAsync();
  }

  async getDiasSuspensaoAtividadesAsync(params) {
    const { mes, ano } = this.state;
    this.setState({ loadingDiasCalendario: true });
    const response = await getDiasSuspensaoAtividades(
      params ? { mes: params.mes, ano: params.ano } : { mes, ano }
    );
    if (response.status === HTTP_STATUS.OK) {
      this.setState({
        diasSuspensaoAtividades: formataComoEventos(response.data.results),
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
    const { diasSuspensaoAtividades } = this.state;

    const idx = diasSuspensaoAtividades.indexOf(event);
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

    const nextEvents = [...diasSuspensaoAtividades];
    nextEvents.splice(idx, 1, updatedEvent);

    const payload = {
      tipo_unidades: nextEvents
        .filter((e) => e.data === getDDMMYYYfromDate(event.start))
        .map((e) => e.tipo_unidade.uuid),
      data: getYYYYMMDDfromDate(event.start),
    };

    await setDiaSuspensaoAtividades(payload);

    const payload2 = {
      tipo_unidades: nextEvents
        .filter((e) => e.data === getDDMMYYYfromDate(start))
        .map((e) => e.tipo_unidade.uuid),
      data: getYYYYMMDDfromDate(start),
    };

    const response2 = await setDiaSuspensaoAtividades(payload2);
    if (response2.status === HTTP_STATUS.CREATED) {
      toastSuccess("Dia de sobremesa atualizado com sucesso");
    }

    this.setState({
      diasSuspensaoAtividades: nextEvents,
    });
  }

  handleSelectSlot(event) {
    this.setState({
      currentEvent: event,
      showModalCadastrarSuspensaoAtividades: true,
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
      diasSuspensaoAtividades,
      loadingDiasCalendario,
      tiposUnidades,
      erroAPI,
      currentEvent,
      showModalCadastrarSuspensaoAtividades,
      showModalEditar,
      showModalConfirmarExclusao,
    } = this.state;

    return (
      <div className="card calendario-sobremesa">
        <div className="card-body">
          <Spin
            tip="Carregando calendário..."
            spinning={(!tiposUnidades || !diasSuspensaoAtividades) && !erroAPI}
          >
            {erroAPI && (
              <div>
                Erro ao carregar dados sobre tipos de unidades. Tente novamente
                mais tarde.
              </div>
            )}
            {tiposUnidades && diasSuspensaoAtividades && (
              <>
                <p>
                  Para cadastrar dias de suspensão de atividades, clique sobre o
                  dia desejado e insira as informações de cadastro
                </p>
                <Spin
                  tip="Carregando dias de suspensão de atividades..."
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
                    events={diasSuspensaoAtividades}
                    onSelectEvent={this.handleEvent}
                    onEventDrop={this.moveEvent}
                    onSelectSlot={this.handleSelectSlot}
                    components={{
                      toolbar: CustomToolbar,
                    }}
                    messages={{
                      showMore: (target) => (
                        <span className="ml-2" role="presentation">
                          ...{target} mais
                        </span>
                      ),
                    }}
                    onNavigate={(date) => {
                      this.setState({
                        mes: date.getMonth() + 1,
                        ano: date.getFullYear(),
                      });
                      this.getDiasSuspensaoAtividadesAsync({
                        mes: date.getMonth() + 1,
                        ano: date.getFullYear(),
                      });
                    }}
                    defaultView={Views.MONTH}
                  />
                </Spin>
                {currentEvent && usuarioEhCODAEGestaoAlimentacao() && (
                  <>
                    <ModalCadastrarNoCalendario
                      showModal={showModalCadastrarSuspensaoAtividades}
                      nomeObjetoNoCalendario="Suspensão de Atividades"
                      closeModal={() =>
                        this.setState({
                          showModalCadastrarSuspensaoAtividades: false,
                        })
                      }
                      objetos={diasSuspensaoAtividades}
                      tiposUnidades={tiposUnidades}
                      event={currentEvent}
                      getObjetosAsync={this.getDiasSuspensaoAtividadesAsync}
                      setObjetoAsync={setDiaSuspensaoAtividades}
                    />
                    {showModalEditar && (
                      <ModalEditar
                        showModal={showModalEditar}
                        nomeObjetoNoCalendario="Suspensão de Atividades"
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
                        nomeObjetoNoCalendario="Suspensão de Atividades"
                        closeModal={() =>
                          this.setState({ showModalConfirmarExclusao: false })
                        }
                        event={currentEvent}
                        getObjetosAsync={this.getDiasSuspensaoAtividadesAsync}
                        deleteObjetoAsync={deleteDiaSuspensaoAtividades}
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
