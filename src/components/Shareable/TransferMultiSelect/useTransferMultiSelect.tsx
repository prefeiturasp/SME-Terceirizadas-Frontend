import { useEffect } from "react";
import { useState } from "react";
import { TransferProps } from "antd";

import { TransferMultiSelectProps, TransferOptions } from "./interfaces";

interface useTransferMultiSelectParams {
  initialSelectedKeys: string[];
  initialTargetKeys: string[];
  required: boolean;
}

export const useTransferMultiSelect = ({
  initialSelectedKeys,
  initialTargetKeys,
  required,
}: useTransferMultiSelectParams) => {
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(initialSelectedKeys);
  const [targetKeys, setTargetKeys] = useState<string[]>(initialTargetKeys);
  const [status, setStatus] = useState<TransferMultiSelectProps["status"]>("");

  const [touched, setTouched] = useState<boolean>(false);

  const defaultHandleSelectChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);

  const defaultHandleChange = (newTargetKeys: string[]) => {
    newTargetKeys.length > targetKeys.length
      ? setTargetKeys([
          ...targetKeys,
          ...newTargetKeys.filter((item) => !targetKeys.includes(item)),
        ])
      : setTargetKeys(newTargetKeys);

    newTargetKeys.length ? setStatus("") : setStatus("error");
  };

  const defaultFilterOption = (inputValue: string, item: TransferOptions) =>
    item.title.toLowerCase().indexOf(inputValue?.toLowerCase()) > -1;

  const defaultRender = (item: TransferOptions) => item.title;

  const clearTransfer = () => {
    setSelectedKeys([]);
    setTargetKeys([]);
    setStatus("");
    setTouched(false);
  };

  const locale: TransferProps["locale"] = {
    itemUnit: "item",
    itemsUnit: "itens",
    notFoundContent: null,
    searchPlaceholder: "Pesquisar",
    selectAll: "Selecionar todos",
    selectInvert: "Inverter seleção",
  };

  const listStyle: TransferProps["listStyle"] = {
    width: "100%",
    minHeight: "300px",
  };

  const setToggleTouchedToItemsClick = () => {
    document
      .querySelectorAll(".ant-transfer-list-content-item")
      .forEach((item) => item.addEventListener("click", () => toggleTouched()));
  };

  const toggleTouched = () => {
    if (!touched) setTouched(true);
  };

  const setTransferValidateRequiredToDocument = () =>
    document.addEventListener("click", handleClickOutsideTransfer);

  const removeTransferValidateRequiredToDocument = () =>
    document.removeEventListener("click", handleClickOutsideTransfer);

  const handleClickOutsideTransfer = (event: MouseEvent) =>
    validateRequired(event, status, targetKeys);

  const validateRequired = (
    event: MouseEvent,
    status: string,
    targetKeys: string[]
  ) => {
    if (!required || !touched) return;

    if (status === "error" && !targetKeys.length) return;

    const transfer = document.querySelector(".transfer-multiselect-container");
    const target = event.target as Element;
    !transfer?.contains(target) && !targetKeys.length
      ? setStatus("error")
      : setStatus("");
  };

  useEffect(() => {
    setToggleTouchedToItemsClick();
    setTransferValidateRequiredToDocument();

    return () => removeTransferValidateRequiredToDocument();
  }, [touched, status, targetKeys]);

  return {
    selectedKeys: selectedKeys,
    targetKeys: targetKeys,
    status: status,
    locale: locale,
    listStyle: listStyle,
    setStatus: setStatus,
    onSelectChange: defaultHandleSelectChange,
    onChange: defaultHandleChange,
    filterOption: defaultFilterOption,
    render: defaultRender,
    clearTransfer: clearTransfer,
    toggleTouched,
  };
};
