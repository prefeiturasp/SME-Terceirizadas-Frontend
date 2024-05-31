import React, { useState } from "react";
import { Field } from "react-final-form";
import { InputComData } from "components/Shareable/DatePicker";
import { InputText } from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";
import Botao from "components/Shareable/Botao";
import { FormApi } from "final-form";

import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON,
} from "components/Shareable/Botao/constants";

type SeletorDeDatasType = {
  titulo: string;
  name: string;
  form: FormApi<any, Partial<any>>;
};

export const SeletorDeDatas = ({ ...props }: SeletorDeDatasType) => {
  const { titulo, name, form } = props;

  const [dateInputs, setDateInput] = useState(1);
  const [dates, setDates] = useState<string[]>([]);

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
    form.change(name, newDates);
  };

  return (
    <>
      {[...Array(dateInputs).keys()].map((_dateinput, _dateinputIndex) => {
        return (
          <div className="col-10 col-md-4" key={_dateinputIndex}>
            <Field
              component={InputComData}
              label={titulo}
              name={`${_dateinputIndex}_${titulo}`}
              showMonthDropdown
              showYearDropdown
              tabindex="-1"
              minDate={null}
              required
              validate={required}
              inputOnChange={(value: any) => {
                handleDateChange(_dateinputIndex, value);
              }}
            />
          </div>
        );
      })}
      <div className="col-2">
        <Botao
          className="pr-3 mt-3"
          icon={BUTTON_ICON.PLUS}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          type={BUTTON_TYPE.BUTTON}
          onClick={() => setDateInput((prev) => prev + 1)}
        />
      </div>
      <Field className="d-none" component={InputText} name={name} />
    </>
  );
};
