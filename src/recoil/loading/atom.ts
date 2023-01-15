import { atom } from "recoil";

export type LoadingState = {
  isLoading: boolean;
};
const initialState: LoadingState = {
  isLoading: false,
};
const loadingState = atom({
  key: "loadingState",
  default: initialState,
});

export default loadingState;
