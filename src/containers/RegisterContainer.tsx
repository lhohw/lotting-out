import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import type { RegisterProps } from "../components/Register";
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { graphql, useStaticQuery } from "gatsby";
import Register from "../components/Register";
import produce from "immer";
import { useRecoilState } from "recoil";
import { modalState as ms, ModalState } from "../recoil/modal";

export type RegisterContainerProps = {
  backgroundImage: PreviewCompatibleImageData;
};
export type RegisterContainerState = RegisterProps["state"];
export type RegisterContainerData = {
  settingJson: {
    questions: {
      questions: RegisterProps["questions"];
    };
    info: RegisterProps["info"];
  };
};

const RegisterContainer = ({ backgroundImage }: RegisterContainerProps) => {
  const { settingJson } = useStaticQuery<RegisterContainerData>(graphql`
    {
      settingJson(type: { eq: "questions" }) {
        questions {
          questions {
            question
            answers
          }
        }
        info {
          name
          title
        }
      }
    }
  `);
  const {
    questions: { questions },
    info,
  } = settingJson;
  const initialState: RegisterContainerState = useMemo(
    () => ({
      value: {
        ...info.reduce(
          (d, { name }) => ({ ...d, [name]: "" }),
          {} as RegisterContainerState["value"]
        ),
        ...questions.reduce((d, _, i) => ({ ...d, [i.toString()]: "" }), {}),
      },
      agreement: {
        marketing: false,
        termsAndConditions: false,
      },
    }),
    [info, questions]
  );

  const [state, setState] = useState<RegisterContainerState>(initialState);
  const [modalState, setModalState] = useRecoilState<ModalState>(ms);
  const submitButton = useRef<HTMLButtonElement>(null);

  const hideModal = useCallback(() => {
    const nextState = produce(modalState, (draft) => {
      draft.title = "";
      draft.content = "";
      (draft.isVisible = false), (draft.buttons = []);
    });
    setModalState(nextState);
  }, [modalState, setModalState]);

  const showModal = useCallback(
    ({ title, content, buttons }: Omit<ModalState, "isVisible">) => {
      const nextState = produce(modalState, (draft) => {
        draft.title = title;
        draft.content = content;
        (draft.isVisible = true), (draft.buttons = buttons);
      });
      setModalState(nextState);
    },
    [modalState, setModalState]
  );

  useEffect(() => {
    return () => {
      setState(initialState);
      hideModal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState, setState]);

  const onChange = useCallback<RegisterProps["onChange"]>(
    (e) => {
      const nextState = produce(state, (draft) => {
        draft.value[e.target.name] = e.target.value;
      });
      setState(nextState);
    },
    [state, setState]
  );

  const onSubmit = useCallback(() => {
    if (!state.agreement.marketing) {
      showModal({
        title: "마케팅 수신 동의",
        content: "마케팅 수신 동의가 필요합니다.",
        buttons: ["확인"],
      });
      return;
    }
    if (!state.agreement.termsAndConditions) {
      showModal({
        title: "이용 약관 동의",
        content: "이용 약관 동의가 필요합니다.",
        buttons: ["확인"],
      });
      return;
    }
    const answers = Object.entries(state.value).reduce(
      (ans, [key, value]) => ({
        ...ans,
        [!isNaN(parseInt(key)) ? questions[+key].question : key]: value,
      }),
      {}
    );
    showModal({
      title: "제출 하시겠습니까?",
      content: JSON.stringify(answers),
      buttons: ["확인", "취소"],
    });
  }, [state, questions, showModal]);

  const onClick = useCallback<RegisterProps["onClick"]>(
    (title) => {
      const nextState = produce(state, (draft) => {
        draft.agreement[title] = !draft.agreement[title];
      });
      setState(nextState);
    },
    [state, setState]
  );

  const onModalButtonClick = useCallback<RegisterProps["onModalButtonClick"]>(
    (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "DIALOG" || target.tagName === "BUTTON") {
        if (target.tagName === "BUTTON") {
          const { value } = target as HTMLButtonElement;
          const { marketing, termsAndConditions } = state.agreement;
          if (marketing && termsAndConditions && value === "agree") {
            // Agree
            console.log("Agree");
          } else {
            // Deny or ok
            console.log("Deny");
          }
        }
        hideModal();
        if (submitButton.current) submitButton.current.focus();
      }
    },
    [hideModal, state.agreement]
  );
  const onModalKeyDown = useCallback<RegisterProps["onModalKeyDown"]>(
    (e) => {
      if (e.key === "Tab") {
        const target = e.target as HTMLElement;
        if (e.shiftKey && target.tagName === "DIV") {
          e.preventDefault();
          return;
        }
        if (
          !e.shiftKey &&
          target.tagName === "BUTTON" &&
          target.dataset.idx === (modalState.buttons.length - 1).toString()
        ) {
          e.preventDefault();
          return;
        }
      } else if (e.key === "Escape") {
        hideModal();
        if (submitButton.current) submitButton.current.focus();
      }
    },
    [modalState.buttons.length, hideModal, submitButton]
  );
  return (
    <Register
      info={info}
      state={state}
      questions={questions}
      backgroundImage={backgroundImage}
      submitButtonRef={submitButton}
      onChange={onChange}
      onSubmit={onSubmit}
      onClick={onClick}
      onModalButtonClick={onModalButtonClick}
      onModalKeyDown={onModalKeyDown}
    />
  );
};

export default RegisterContainer;
