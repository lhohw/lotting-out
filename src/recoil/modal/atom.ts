import { atom } from "recoil";

export type ModalState = {
  focus: () => void;
  title: string;
  content: string;
  isVisible: boolean;
  buttons?: {
    text: string;
    onClick?: () => void;
  }[];
};

const initialState: ModalState = {
  focus: () => null,
  title: "",
  content: "",
  isVisible: false,
  buttons: [
    {
      text: "확인",
    },
  ],
};
const modalState = atom({
  key: "modalState",
  default: initialState,
});

export default modalState;
