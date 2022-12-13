import { atom } from "recoil";

export type HeaderState = {
  isOpen: boolean;
};
const initialState: HeaderState = {
  isOpen: false,
};
const headerState = atom({
  key: "headerState",
  default: initialState,
});

export default headerState;
