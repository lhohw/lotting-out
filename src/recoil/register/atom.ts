import { atom } from "recoil";

export type RegisterState = {
  name: string;
  phoneNumber: string;
  email: string;
  priority: string;
  intention: string;
  purpose: string;
};

const initialState: RegisterState = {
  name: "",
  phoneNumber: "",
  email: "",
  priority: "",
  intention: "",
  purpose: "",
};
const registerState = atom({
  key: "contactState",
  default: initialState,
});

export default registerState;
