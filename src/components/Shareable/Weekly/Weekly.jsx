import React, { useState } from "react";
import "./style.scss";

export const Weekly = ({ ...props }) => {
  const [clicked, setClicked] = useState([]);

  const handleClick = value => {
    if (clicked.includes(value)) {
      clicked.splice(clicked.indexOf(value), 1);
    } else {
      clicked.push(value);
    }
    setClicked(clicked);

    props.input.onChange(clicked);
  };

  const arrayToUse = props.input.value.length ? props.input.value : clicked;
  const week = [
    {
      label: "D",
      value: "6"
    },
    {
      label: "S",
      value: "0"
    },
    {
      label: "T",
      value: "1"
    },
    {
      label: "Q",
      value: "2"
    },
    {
      label: "Q",
      value: "3"
    },
    {
      label: "S",
      value: "4"
    },
    {
      label: "S",
      value: "5"
    }
  ];
  return (
    <div className={`weekly ${props.classNameArgs || ""}`}>
      {props.label && [
        props.required && <span className="required-asterisk">*</span>,
        <label key={1} htmlFor={props.name} className="col-form-label">
          {props.label}
        </label>
      ]}
      <div>
        {week.map((day, key) => {
          return (
            <span
              key={key}
              onClick={() => handleClick(day.value)}
              className={
                arrayToUse.includes(day.value)
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
