import { toast } from "react-toastify";
import "./style.scss";

let baseConfig = {
  position: toast.POSITION.TOP_CENTER,
  icon: false,
};

export const toastSuccess = (message) => {
  toast.success(message, baseConfig);
};

export const toastError = (message) => {
  toast.error(message, baseConfig);
};

export const toastWarn = (message) => {
  toast.warn(message, baseConfig);
};

export const toastInfo = (message) => {
  toast.info(message, baseConfig);
};

export const toastDefault = (message) => {
  toast(message, baseConfig);
};
