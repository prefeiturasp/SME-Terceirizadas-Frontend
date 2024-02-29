import { WEEK } from "configs/constants";
import React from "react";
import "./style.scss";

export const Weekly = ({ ...props }) => {
  const { handleWeekly, arrayDiasSemana } = props;
  return (
    <div className={`weekly ${props.classNameArgs || ""}`}>
      {props.label && [
        props.required && <span className="required-asterisk">*</span>,
        <label key={1} htmlFor={props.name} className="col-form-label">
          {props.label}
        </label>,
      ]}
      <div>
        {WEEK.map((day, key) => {
          return (
            <span
              key={key}
              onClick={async () => await handleWeekly(day.value)}
              className={
                arrayDiasSemana && arrayDiasSemana.includes(day.value)
                  ? "week-circle-clicked"
                  : "week-circle"
              }
              data-cy={`dia-${key}`}
              value={day.value}
            >
              {day.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Weekly;
