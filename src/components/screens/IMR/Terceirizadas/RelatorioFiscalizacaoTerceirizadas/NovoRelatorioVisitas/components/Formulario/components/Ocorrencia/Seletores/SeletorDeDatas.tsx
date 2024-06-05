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

  const [dates, setDates] = useState<string[]>([""]);

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
    form.change(name, newDates);
  };

  const onClickTrash = (index: number, form: FormApi<any, Partial<any>>) => {
    let newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
    for (let i = index; i < dates.length - 1; i += 1) {
      form.change(
        `${index}_${titulo}`,
        form.getState().values[`${index + 1}_${titulo}`]
      );
    }
    form.change(`${dates.length - 1}_${titulo}`, undefined);
    form.change(name, newDates);
  };

  const adicionarData = () => {
    const newDates = [...dates];
    newDates.push("");
    setDates(newDates);
    form.change(name, newDates);
  };

  return (
    <>
      {Array.from({ length: dates.length }, (_, index) => index).map(
        (_dateinput, _dateinputIndex) => {
          return (
            <div className="col-3" key={_dateinputIndex}>
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
                onClickTrash={onClickTrash}
                indexTrash={_dateinputIndex}
                form={form}
                labelClassName={!_dateinputIndex ? "pb-3" : ""}
                inputOnChange={(value: any) => {
                  handleDateChange(_dateinputIndex, value);
                }}
              />
            </div>
          );
        }
      )}
      <div className="col-2 my-auto">
        <Botao
          className="mt-4"
          icon={BUTTON_ICON.PLUS}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          type={BUTTON_TYPE.BUTTON}
          onClick={() => adicionarData()}
        />
      </div>
      <Field className="d-none" component={InputText} name={name} />
    </>
  );
};
