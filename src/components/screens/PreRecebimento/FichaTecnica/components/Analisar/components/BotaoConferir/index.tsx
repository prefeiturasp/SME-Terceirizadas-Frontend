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
}

const BotaoConferir: React.FC<Props> = ({ name, aprovaCollapse }) => {
  return (
    <div className="botao-conferir">
      <div className="mt-4">
        <Botao
          texto="Conferido"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="float-end ms-3"
          onClick={() => {
            aprovaCollapse(name);
          }}
        />
      </div>
    </div>
  );
};

export default BotaoConferir;
