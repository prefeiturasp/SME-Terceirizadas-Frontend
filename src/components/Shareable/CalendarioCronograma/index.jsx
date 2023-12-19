import React from "react";
import HTTP_STATUS from "http-status-codes";
import { CustomToolbar } from "components/Shareable/CalendarioCronograma/componentes/CustomToolbar";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { formataComoEventos } from "components/Shareable/CalendarioCronograma/helpers";
import { Spin } from "antd";
import { ModalCronograma } from "components/Shareable/CalendarioCronograma/componentes/ModalCronograma";
import "components/Shareable/CalendarioCronograma/style.scss";

const localizer = momentLocalizer(moment);
export class CalendarioCronograma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objetos: undefined,
      loadingDiasCalendario: false,
      showModalCadastrar: false,
      showModalCronograma: false,
      showModalConfirmarExclusao: false,
      currentEvent: undefined,
      mes: moment().month() + 1,
      ano: moment().year(),
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.getObjetosAsync = this.getObjetosAsync.bind(this);
  }

  componentDidMount() {
    this.getObjetosAsync();
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

  handleEvent(event) {
    this.setState({
      currentEvent: event,
      showModalCronograma: true,
    });
  }

  render() {
    const {
      objetos,
      loadingDiasCalendario,
      currentEvent,
      showModalCronograma,
    } = this.state;
    const { nomeObjeto, nomeObjetoMinusculo } = this.props;

    return (
      <div className="card calendario-sobremesa mt-3">
        <div className="card-body">
          <Spin tip="Carregando calendário..." spinning={!objetos}>
            {objetos && (
              <>
                <p>
                  Para cadastrar um dia para {nomeObjetoMinusculo}, clique sobre
                  o dia e selecione o tipo de unidade.
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
                    onSelectEvent={this.handleEvent}
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
                {showModalCronograma && currentEvent && (
                  <ModalCronograma
                    showModal={showModalCronograma}
                    nomeObjetoNoCalendario={nomeObjeto}
                    nomeObjetoNoCalendarioMinusculo={nomeObjetoMinusculo}
                    closeModal={() =>
                      this.setState({ showModalCronograma: false })
                    }
                    event={currentEvent}
                    setShowModalConfirmarExclusao={() =>
                      this.setState({ showModalConfirmarExclusao: true })
                    }
                  />
                )}
              </>
            )}
          </Spin>
        </div>
      </div>
    );
  }
}
