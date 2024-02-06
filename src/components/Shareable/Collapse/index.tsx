import React, { Dispatch, ReactElement, SetStateAction } from "react";
import "./styles.scss";
import { CollapseConfig } from "./interfaces";

export interface CollapseControl {
  [index: number]: boolean;
}

type Props = {
  collapse: CollapseControl;
  setCollapse: Dispatch<SetStateAction<CollapseControl>>;
  titulos?: ReactElement[];
  children: ReactElement[];
  id: string;
  collapseConfigs?: CollapseConfig[];
  state?: Record<string, any>;
};

const Collapse: React.FC<Props> = ({
  collapse,
  setCollapse,
  titulos,
  children,
  id,
  collapseConfigs,
  state,
}) => {
  const toggleCollapse = (index: number) => {
    setCollapse({
      [index]: !collapse[index],
    });
  };

  const gerarConfigsPadrao = () =>
    children.map((): CollapseConfig => {
      return { titulo: "", camposObrigatorios: true };
    });

  const configs =
    collapseConfigs?.length > 0 ? collapseConfigs : gerarConfigsPadrao();

  return (
    collapse && (
      <div className="accordion accordionComponent mt-1" id={id}>
        {children.filter(Boolean).map((el, index) => (
          <>
            <div className="card mt-3">
              <div className={`card-header card-tipo`} id={`heading_${index}`}>
                <div className="row card-header-content">
                  <span className="col-8 titulo">
                    {configs[index]?.titulo || titulos[index]}
                  </span>
                  <div className="col-4 text-end my-auto">
                    {configs[index].camposObrigatorios && (
                      <>
                        <span className="texto-obrigatorio required-asterisk">
                          *
                        </span>
                        <span className="texto-obrigatorio">
                          Campos de Preenchimento Obrigatório
                        </span>
                      </>
                    )}
                    {state && (
                      <div className="batata">
                        {state[el.props.id] === false
                          ? "false"
                          : state[el.props.id] === true
                          ? "true"
                          : "null"}
                      </div>
                    )}
                    <span>
                      <button
                        onClick={() => toggleCollapse(index)}
                        className="btn btn-link text-end px-0 ms-4"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse_${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse_${index}`}
                      >
                        <span className="span-icone-toogle">
                          <i
                            className={
                              collapse[index]
                                ? "fas fa-chevron-up"
                                : "fas fa-chevron-down"
                            }
                          />
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div
                id={`collapse_${index}`}
                className="collapse"
                aria-labelledby="headingOne"
                data-bs-parent={`#${id}`}
              >
                <div className="card-body">{el}</div>
              </div>
            </div>
          </>
        ))}
      </div>
    )
  );
};

export default Collapse;
