import { atom } from "recoil";

export type DeviceState = {
  isInitialized: boolean;
  isMobile: boolean;
  isTouch: boolean;
};
const initialState: DeviceState = {
  isInitialized: false,
  isMobile: false,
  isTouch: false,
};
export default atom({
  key: "deviceState",
  default: initialState,
});
