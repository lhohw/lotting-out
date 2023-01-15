import { useCallback } from "react";
import produce from "immer";
import { ModalState, modalState as ms } from "../../recoil/modal";
import { useRecoilState } from "recoil";

export type HideModal = () => void;
export type ShowModal = ({
  focus,
  title,
  content,
  buttons,
}: Omit<ModalState, "isVisible">) => void;

const useModal = () => {
  const [modalState, setModalState] = useRecoilState<ModalState>(ms);

  const hideModal: HideModal = useCallback(() => {
    const { focus } = modalState;
    const nextState = produce(modalState, (draft) => {
      draft.focus = () => null;
      draft.title = "";
      draft.content = "";
      draft.isVisible = false;
      draft.buttons = [{ text: "확인" }];
    });
    setModalState(nextState);
    setTimeout(() => focus(), 32);
  }, [modalState, setModalState]);

  const showModal: ShowModal = useCallback(
    ({ focus, title, content, buttons = [{ text: "확인" }] }) => {
      const nextState = produce(modalState, (draft) => {
        draft.focus = focus;
        draft.title = title;
        draft.content = content;
        draft.isVisible = true;
        draft.buttons = buttons;
      });
      setModalState(nextState);
    },
    [modalState, setModalState]
  );
  return {
    hideModal,
    showModal,
  };
};

export default useModal;
