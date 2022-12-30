import { atom } from "recoil";

export type ModalState = {
  title: string;
  content: string;
  isVisible: boolean;
  buttons: string[];
};

const initialState: ModalState = {
  title: "",
  content: "",
  isVisible: false,
  buttons: ["확인", "취소"],
};
const modalState = atom({
  key: "modalState",
  default: initialState,
});

export default modalState;
