import { Slide, toast } from "react-toastify";
import "./style.scss";

let baseConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide
};

export const toastSuccess = message => {
  toast.success(message, baseConfig);
};

export const toastError = message => {
  toast.error(message, baseConfig);
};

export const toastWarn = message => {
  toast.warn(message, baseConfig);
};

export const toastInfo = message => {
  toast.info(message, baseConfig);
};

export const toastDefault = message => {
  toast(message, baseConfig);
};
