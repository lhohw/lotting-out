import { atom } from "recoil";

export type SliderState = {
  idx: number;
};
const initialState: SliderState = {
  idx: 0,
};
const sliderState = atom({
  key: "sliderState",
  default: initialState,
});

export default sliderState;
