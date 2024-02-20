import React from "react";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../../../../Shareable/Botao/constants";
import Botao from "../../../../../../../Shareable/Botao";
import "./styles.scss";

interface Props {
  name: string;
  aprovaCollapse: (_name: string) => void;
  desabilitar?: boolean;
}

const BotaoCiente: React.FC<Props> = ({
  name,
  aprovaCollapse,
  desabilitar = false,
}) => {
  return (
    <div className="botao-ciente">
      <div className="mt-4">
        <Botao
          texto="Ciente"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="float-end ms-3"
          onClick={() => {
            aprovaCollapse(name);
          }}
          disabled={desabilitar}
        />
      </div>
    </div>
  );
};

export default BotaoCiente;
