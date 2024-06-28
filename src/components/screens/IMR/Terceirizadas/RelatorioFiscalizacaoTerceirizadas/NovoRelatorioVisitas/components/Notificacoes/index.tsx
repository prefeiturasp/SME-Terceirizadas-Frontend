import React from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON,
} from "components/Shareable/Botao/constants";

type NotificacoesType = {
  onClickBaixarNotificacoes: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Notificacoes = ({ ...props }: NotificacoesType) => {
  return (
    <>
      <div className="anexos">
        <div className="row">
          <div className="col-12 pb-2">
            <span className="titulo-anexo">NOTIFICAÇÕES</span>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <Botao
              texto="Baixar Notificações"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              icon={BUTTON_ICON.DOWNLOAD}
              iconPosition="right"
              onClick={props.onClickBaixarNotificacoes}
            />
            <Botao
              texto="Anexar Notificações Assinadas"
              className="ms-3"
              type={BUTTON_TYPE.BUTTON}
              icon={BUTTON_ICON.PAPER_CLIP}
              iconPosition="right"
            />
          </div>
        </div>
      </div>
    </>
  );
};
