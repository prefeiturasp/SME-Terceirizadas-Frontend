import React, { Dispatch, ReactNode, SetStateAction } from "react";
import "./styles.scss";

type Props = {
  collapse: Object;
  setCollapse: Dispatch<SetStateAction<Object>>;
  titulos: ReactNode[];
  children: ReactNode[];
  id: string;
};

const Collapse: React.FC<Props> = ({
  collapse,
  setCollapse,
  titulos,
  children,
  id,
}) => {
  const toggleCollapse = (index) => {
    setCollapse({
      [index]: !collapse[index],
    });
  };

  return (
    <div className="accordion accordionComponent mt-1" id={id}>
      {children.map((el, index) => (
        <>
          <div className="card mt-3">
            <div className={`card-header card-tipo`} id={`heading_${index}`}>
              <div className="row card-header-content">
                <span className="titulo">{titulos[index]}</span>

                <div className="flex">
                  <div className="texto-obrigatorio">
                    <span className="required-asterisk font-weight-bold">
                      *
                    </span>
                    Campos de Preenchimento Obrigatório
                  </div>
                  <div className="col-1 align-self-center">
                    <button
                      onClick={() => toggleCollapse(index)}
                      className="btn btn-link btn-block text-end px-0"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#collapse_${index}`}
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
                  </div>
                </div>
              </div>
            </div>

            <div
              id={`collapse_${index}`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent={`#${id}`}
            >
              <div className="card-body">{el}</div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Collapse;
