import type { RegisterProps } from "../components/Register";

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import produce from "immer";
import axios from "axios";
import { useRecoilState } from "recoil";

import { loadingState, LoadingState } from "../recoil/loading";
import Register from "../components/Register";
import useModal from "../hooks/useModal";

export type RegisterContainerProps = {
  questions: {
    questions: RegisterProps["questions"];
  };
  info: RegisterProps["info"];
};
export type RegisterContainerState = RegisterProps["state"];

const RegisterContainer = ({
  questions: { questions },
  info,
}: RegisterContainerProps) => {
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

  const [, setLoadingState] = useRecoilState<LoadingState>(loadingState);
  const [state, setState] = useState<RegisterContainerState>(initialState);
  const submitButton = useRef<HTMLButtonElement>(null);

  const { hideModal, showModal } = useModal();

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

  const checkInput = useCallback(() => {
    if (!state.agreement.marketing) {
      showModal({
        focus: () => submitButton.current?.focus(),
        title: "마케팅 수신 동의",
        content: "마케팅 수신 동의가 필요합니다.",
      });
      return false;
    }
    if (!state.agreement.termsAndConditions) {
      showModal({
        focus: () => submitButton.current?.focus(),
        title: "이용 약관 동의",
        content: "이용 약관 동의가 필요합니다.",
      });
      return false;
    }
    for (const [key, value] of Object.entries(state.value).filter(([k]) =>
      isNaN(Number(k))
    )) {
      if (!value.trim()) {
        const input = document.querySelector(
          `input[name=${key}]`
        )! as HTMLInputElement;
        const id = input.id || key;
        showModal({
          focus: () => input?.focus(),
          title: `${id}`,
          content: `${id} 입력은 필수입니다.`,
        });
        return false;
      }
    }
    for (const [key, value] of Object.entries(state.value).filter(
      ([k]) => !isNaN(Number(k))
    )) {
      if (!value.trim()) {
        showModal({
          focus: () => submitButton.current?.focus(),
          title: `다음 질문에 대한 답을 선택해주세요.`,
          content: questions[+key].question,
        });
        return false;
      }
    }
    return true;
  }, [
    state.agreement.marketing,
    state.agreement.termsAndConditions,
    state.value,
    showModal,
    questions,
  ]);
  const checkValidity = useCallback<RegisterProps["checkValidity"]>((e) => {
    const { name, value } = e.target;
    if (name === "name" && value.match(/[^a-zA-Zㅏ-ㅣㄱ-ㅎ가-힣]+/g))
      e.stopPropagation();
    else if (name === "phoneNumber" && value.match(/[^\d]+/g))
      e.stopPropagation();
    else if (name === "email" && value.match(/\u003c|\u003e|\/|\\/g))
      e.stopPropagation();
  }, []);

  const onSubmit = useCallback<RegisterProps["onSubmit"]>(() => {
    const isValid = checkInput();
    if (!isValid) return;
    showModal({
      focus: () => submitButton.current?.focus(),
      title: "제출 하시겠습니까?",
      content: "",
      buttons: [
        {
          text: "확인",
          onClick: async () => {
            setLoadingState({ isLoading: true });
            const message =
              Object.entries(state.value)
                .filter(([key]) => isNaN(Number(key)))
                .reduce(
                  (acc, [key, value]) =>
                    acc +
                    `${info.find((i) => i.name === key)!.title}: ${value}\n`,
                  ""
                ) +
              Object.entries(state.value)
                .filter(([key]) => !isNaN(Number(key)))
                .reduce(
                  (ans, [key, value]) =>
                    ans + `${questions[+key].question}: ${value}\n`,
                  ""
                );
            const data = {
              service_id: process.env.GATSBY_EMAIL_JS_SERVICE_ID,
              template_id: process.env.GATSBY_EMAIL_JS_TEMPLATE_ID,
              user_id: process.env.GATSBY_EMAIL_JS_USER_ID,
              template_params: {
                date: new Date().toLocaleString(),
                message,
              },
            };
            let response;
            try {
              response = await axios.post(
                "https://api.emailjs.com/api/v1.0/email/send",
                data
              );
            } catch (e) {
              // console.log(e);
            }
            setLoadingState({ isLoading: false });
            if (response?.status === 200) {
              setTimeout(() => {
                showModal({
                  focus: () => submitButton.current?.focus(),
                  title: "제출 완료",
                  content: "제출이 완료되었습니다.",
                  buttons: [
                    {
                      text: "메인 페이지로 이동",
                      onClick: () => {
                        typeof window !== undefined &&
                          window.location.replace("/");
                      },
                    },
                  ],
                });
              }, 32);
            } else {
              setTimeout(() => {
                showModal({
                  focus: () => submitButton.current?.focus(),
                  title: "전송 실패",
                  content:
                    "다시 시도해 주세요.\n문제가 지속될 시 관리자에게 문의 바랍니다.",
                });
              }, 32);
            }
          },
        },
        {
          text: "취소",
          onClick: hideModal,
        },
      ],
    });
  }, [
    checkInput,
    showModal,
    setLoadingState,
    state.value,
    info,
    questions,
    hideModal,
  ]);

  const onClick = useCallback<RegisterProps["onClick"]>(
    (title) => {
      const nextState = produce(state, (draft) => {
        draft.agreement[title] = !draft.agreement[title];
      });
      setState(nextState);
    },
    [state, setState]
  );
  return (
    <Register
      info={info}
      state={state}
      questions={questions}
      submitButtonRef={submitButton}
      onChange={onChange}
      onSubmit={onSubmit}
      onClick={onClick}
      checkValidity={checkValidity}
    />
  );
};

export default RegisterContainer;
