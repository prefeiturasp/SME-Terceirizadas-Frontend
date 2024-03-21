import { TransferItem, TransferProps } from "antd/es/transfer";

export interface TransferOptions extends TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferMultiSelectProps
  extends TransferProps<TransferOptions> {
  label: string;
  required: boolean;
  tooltipText: string;
  toggleTouched: () => void;
}
