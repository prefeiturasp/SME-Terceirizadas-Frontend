import React, { ReactNode, useState } from "react";
import "./styles.scss";
import { Form } from "react-final-form";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";

type Props = {
  children: (_values: any) => ReactNode;
  onSubmit: (_values: Record<string, any>) => void;
  onClear: () => void;
};

const CollapseFiltros: React.FC<Props> = ({ children, onSubmit, onClear }) => {
  const id = "collapseFiltros";
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => {
    setCollapse(!collapse);
    const element = document.getElementById("heading");
    element.classList.toggle("open");
  };

  return (
    <div className="accordion accordionFiltros mt-1" id={id}>
      <div className="card mt-3">
        <div className={`card-header card-tipo open`} id={`heading`}>
          <div className="row card-header-content">
            <div className="titulo">
              <i className="fas fa-sort-amount-down"></i>
              <span>Filtrar Cadastros</span>
            </div>

            <div className="flex">
              <div className="col-1 align-self-center">
                <button
                  onClick={() => toggleCollapse()}
                  className="btn btn-link btn-block text-right px-0"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#collapse`}
                  aria-expanded="true"
                  aria-controls={`collapse`}
                >
                  <span className="span-icone-toogle">
                    <i
                      className={
                        collapse ? "fas fa-chevron-up" : "fas fa-chevron-down"
                      }
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id={`collapse`}
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent={`#${id}`}
        >
          <div className="card-body">
            <Form
              onSubmit={onSubmit}
              initialValues={{}}
              render={({ form, handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <div>{children(values)}</div>

                  <div className="pt-4 pb-4 mb-2">
                    <Botao
                      texto="Filtrar"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="float-right ml-3"
                    />

                    <Botao
                      texto="Limpar Filtros"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-right ml-3"
                      onClick={() => {
                        form.reset({});
                        onClear();
                      }}
                    />
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapseFiltros;
