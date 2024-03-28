import { TransferItem, TransferProps } from "antd/es/transfer";
import { MutableRefObject, ReactNode } from "react";

export interface TransferOptions extends TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferMultiSelectProps
  extends TransferProps<TransferOptions> {
  labels?: ReactNode[];
  required?: boolean;
  tooltipTexts?: string[];
  transferContainerRef: MutableRefObject<HTMLDivElement>;
}
