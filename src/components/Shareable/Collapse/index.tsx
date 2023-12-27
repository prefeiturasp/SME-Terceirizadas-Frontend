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
                <span className="col-8 titulo">{titulos[index]}</span>
                <div className="col-4 text-end my-auto">
                  <span className="texto-obrigatorio required-asterisk">*</span>
                  <span className="texto-obrigatorio">
                    Campos de Preenchimento Obrigatório
                  </span>
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
                {/* <div className="col-1 text-end"></div> */}
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
  );
};

export default Collapse;
