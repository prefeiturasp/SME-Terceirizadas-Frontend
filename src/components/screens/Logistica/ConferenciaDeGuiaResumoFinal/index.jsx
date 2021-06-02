import React, { useEffect, useState } from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { CONFERENCIA_GUIA_COM_OCORRENCIA, LOGISTICA } from "configs/constants";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./styles.scss";

export default () => {
  const [guia, setGuia] = useState({});
  const [valoresForm, setValoresForm] = useState([]);
  const [conferenciaInvalida, setConferenciaInvalida] = useState(false);
  const history = useHistory();

  const onSubmit = async () => {};

  const filtraEmbalagemPorTipo = (embalagens, tipo) => {
    const embalagensFiltradas = embalagens.filter(value => {
      return value.tipo_embalagem.toUpperCase() === tipo;
    });
    if (embalagensFiltradas.length) return embalagensFiltradas[0];
    else return false;
  };

  const getClassStatus = item => {
    switch (item.status) {
      case "Recebido":
        return "green";
      case "Parcial":
        return "red";
      case "Não Recebido":
        return "red";
      default:
        return "";
    }
  };

  const cancelarConferencia = () => {
    let uuid = guia.uuid;
    localStorage.removeItem("valoresConferencia");
    localStorage.removeItem("guiaConferencia");
    history.push(
      `/${LOGISTICA}/${CONFERENCIA_GUIA_COM_OCORRENCIA}/?uuid=${uuid}`
    );
  };

  useEffect(() => {
    let valoresConf = JSON.parse(localStorage.getItem("valoresConferencia"));
    let guiaConf = JSON.parse(localStorage.getItem("guiaConferencia"));
    if (!valoresConf) {
      setConferenciaInvalida(true);
    }
    setGuia(guiaConf);
    setValoresForm(valoresConf);
  }, []);

  return (
    <div className="card mt-3 card-conferencia-guia-resumo-final">
      {!conferenciaInvalida && (
        <div className="card-body conferencia-guia-resumo-final">
          <span className="subtitulo">
            Conferência individual dos itens da guia
          </span>
          <span className="numero-guia float-right">
            Guia número:{" "}
            <strong>
              {parseInt(guia.numero_guia).toLocaleString("pt-BR")}
            </strong>
          </span>
          <hr />

          <div className="mb-2">
            Deseja realizar o registro de conferência dos itens abaixo?
          </div>

          <div className="mb-3">
            <strong>
              <i>
                Data de conferência: {moment(new Date()).format("DD/MM/YYYY")}
              </i>
            </strong>
          </div>

          <table className={`table table-bordered table-resumo-final`}>
            <thead>
              <tr>
                <th scope="col" rowSpan="3" colSpan="2" className="text-center">
                  Nome do Alimento
                </th>
                <th scope="col" colSpan="3" className="text-center">
                  Embalagem Fechada
                </th>
                <th scope="col" colSpan="3" className="text-center">
                  Embalagem Fracionada
                </th>
                <th scope="col" colSpan="2" className="text-center">
                  Recebimento do Alimento
                </th>
              </tr>
              <tr>
                <th scope="col" colSpan="2" className="text-center">
                  Previsto
                </th>
                <th scope="col">Recebido</th>
                <th scope="col" colSpan="2" className="text-center">
                  Previsto
                </th>
                <th scope="col">Recebido</th>
                <th scope="col" rowSpan="2" className="text-center">
                  Status
                </th>
                <th scope="col" rowSpan="2" className="text-center">
                  Data
                </th>
              </tr>
              <tr>
                <th scope="col">Quant.</th>
                <th scope="col">Capac.</th>
                <th scope="col">Quant.</th>
                <th scope="col">Quant.</th>
                <th scope="col">Capac.</th>
                <th scope="col">Quant.</th>
              </tr>
            </thead>
            <tbody>
              {guia.alimentos &&
                guia.alimentos.map((item, index) => {
                  if (!guia.alimentos) return;
                  const embalagens = item.total_embalagens
                    ? item.total_embalagens
                    : item.embalagens;
                  const fracionada = filtraEmbalagemPorTipo(
                    embalagens,
                    "FRACIONADA"
                  );
                  const arquivoExiste = valoresForm[index].arquivo.length > 0;
                  const fechada = filtraEmbalagemPorTipo(embalagens, "FECHADA");
                  return (
                    <>
                      <tr>
                        {arquivoExiste > 0 && (
                          <td className="icone-arquivo">
                            <div className="icon-arquivo">
                              <i className="fas fa-paperclip green" />
                            </div>
                          </td>
                        )}

                        <td
                          colSpan={arquivoExiste ? "1" : "2"}
                          className="nome-alimento"
                        >
                          {item.nome_alimento}
                        </td>
                        <td className="embalagem">
                          {fechada ? fechada.qtd_volume : "--"}
                        </td>
                        <td className="embalagem">
                          {fechada ? (
                            <>
                              {fechada.descricao_embalagem}.{" "}
                              {fechada.capacidade_embalagem}
                              {fechada.unidade_medida}
                            </>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="embalagem">
                          <strong>
                            {valoresForm[index].recebidos_fechada}
                          </strong>
                        </td>
                        <td className="embalagem">
                          {fracionada ? fracionada.qtd_volume : "--"}
                        </td>
                        <td className="embalagem">
                          {fracionada ? (
                            <>
                              {fracionada.descricao_embalagem}.{" "}
                              {fracionada.capacidade_embalagem}
                              {fracionada.unidade_medida}
                            </>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="embalagem">
                          {valoresForm[index].recebidos_fechada}
                        </td>
                        <td
                          className={`recebimento ${getClassStatus(
                            valoresForm[index]
                          )}`}
                        >
                          <strong>{valoresForm[index].status}</strong>
                        </td>
                        <td className="recebimento">
                          {valoresForm[valoresForm.length - 1].data_recebimento}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div>
            <span className="float-right">
              <Botao
                texto="Cancelar"
                className="mr-3"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                onClick={() => {
                  cancelarConferencia();
                }}
              />
              <Botao
                texto="Finalizar Conferência"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN}
                onClick={onSubmit}
              />
            </span>
          </div>
        </div>
      )}
      {conferenciaInvalida && (
        <div className="card-body">
          Não há processo de conferência em andamento, clique em voltar para
          iniciar uma conferência.
        </div>
      )}
    </div>
  );
};
