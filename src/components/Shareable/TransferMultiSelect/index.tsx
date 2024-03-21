/*
  Wrapper para o componente Transfer da biblioteca Ant Design.

  Documentação: https://ant.design/components/transfer
  Versão base: 5.15.x
*/

import React from "react";
import { Transfer } from "antd";

import Label from "components/Shareable/Label";
import TooltipIcone from "components/Shareable/TooltipIcone";

import { TransferMultiSelectProps } from "./interfaces";

export default ({
  dataSource,
  showSearch,
  filterOption,
  selectedKeys,
  targetKeys,
  onSelectChange,
  onChange,
  onSearch,
  render,
  locale,
  listStyle,
  showSelectAll,
  status,
  oneWay,
  label,
  required,
  tooltipText,
  toggleTouched,
}: TransferMultiSelectProps) => {
  return (
    <>
      <Label content={label} required={required} />
      {tooltipText && <TooltipIcone tooltipText={tooltipText} />}

      <div
        onBlur={() => toggleTouched()}
        className="transfer-multiselect-container"
      >
        <Transfer
          dataSource={dataSource}
          showSearch={showSearch || true}
          filterOption={filterOption}
          selectedKeys={selectedKeys}
          targetKeys={targetKeys}
          onSelectChange={onSelectChange}
          onChange={onChange}
          onSearch={onSearch}
          render={render}
          locale={locale}
          listStyle={listStyle}
          showSelectAll={showSelectAll || true}
          status={status}
          oneWay={oneWay}
        />

        {status === "error" && (
          <div className="error-or-warning-message">
            <div className="error-message">Campo obrigatório</div>
          </div>
        )}
      </div>
    </>
  );
};
