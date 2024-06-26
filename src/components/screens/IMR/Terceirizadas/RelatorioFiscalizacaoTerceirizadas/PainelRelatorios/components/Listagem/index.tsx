import React from "react";
import { Tooltip } from "antd";
import { RelatorioVisitaItemListagem } from "interfaces/imr.interface";
import { truncarString } from "helpers/utilities";
import {
  RELATORIO_FISCALIZACAO,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
  SUPERVISAO,
  TERCEIRIZADAS,
  EDITAR,
} from "configs/constants";
import "./styles.scss";
import Botao from "../../../../../../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "../../../../../../../Shareable/Botao/constants";
import { useNavigate } from "react-router-dom";
interface Props {
  objetos: RelatorioVisitaItemListagem[];
  handleEditAction?: (_uuid: any) => void;
  perfilNutriSupervisao: boolean;
}

const TAMANHO_MAXIMO = 40;

export const Listagem: React.FC<Props> = ({
  objetos,
  perfilNutriSupervisao,
}) => {
  const navigate = useNavigate();
  const deParaStatus = (status: string) =>
    ["Enviado para CODAE"].includes(status) && !perfilNutriSupervisao
      ? "Enviado pela Supervisão"
      : status;

  const goToFormularioSupervisao = (uuid) => {
    navigate(
      `/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO}/${uuid}/${EDITAR}`,
      { state: { uuid: uuid } }
    );
  };

  return (
    <div className="listagem-relatorios-visita">
      <div className="titulo-verde mt-5 mb-3">
        Relatórios das Visitas as Unidades Cadastrados
      </div>

      <article>
        <div className="grid-table header-table">
          <div>Diretoria Regional</div>
          <div>Unidade Educacional</div>
          <div>Data da Visita</div>
          <div>Status</div>
          <div>Ações</div>
        </div>

        {objetos.map((objeto) => {
          return (
            <>
              <div key={objeto.uuid} className="grid-table body-table">
                <div>{objeto.diretoria_regional}</div>
                <div>
                  <Tooltip title={objeto.unidade_educacional}>
                    {truncarString(objeto.unidade_educacional, TAMANHO_MAXIMO)}
                  </Tooltip>
                </div>
                <div>{objeto.data}</div>
                <div>{deParaStatus(objeto.status)}</div>
                <div>
                  {objeto.status === "Em Preenchimento" &&
                  perfilNutriSupervisao ? (
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={`${BUTTON_STYLE.GREEN_OUTLINE} no-border`}
                      icon={BUTTON_ICON.EDIT}
                      onClick={() => goToFormularioSupervisao(objeto.uuid)}
                      tooltipExterno="Editar relatório"
                    />
                  ) : null}
                </div>
              </div>
            </>
          );
        })}
      </article>
    </div>
  );
};
