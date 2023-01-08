import { useCallback } from "react";
import produce from "immer";
import { ModalState, modalState as ms } from "../../recoil/modal";
import { useRecoilState } from "recoil";

export type HideModal = () => void;
export type ShowModal = ({
  title,
  content,
  buttons,
}: Omit<ModalState, "isVisible">) => void;

const useModal = () => {
  const [modalState, setModalState] = useRecoilState<ModalState>(ms);
  const hideModal: HideModal = useCallback(() => {
    const nextState = produce(modalState, (draft) => {
      draft.title = "";
      draft.content = "";
      draft.isVisible = false;
      draft.buttons = [];
    });
    setModalState(nextState);
  }, [modalState, setModalState]);
  const showModal: ShowModal = useCallback(
    ({ title, content, buttons }) => {
      const nextState = produce(modalState, (draft) => {
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
